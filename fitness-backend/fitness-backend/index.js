import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import multer from "multer";
import { LRUCache } from "lru-cache";




dotenv.config();

const PORT = process.env.PORT || 8081;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("⚠️  Missing OPENAI_API_KEY in environment");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const upload = multer({ storage: multer.memoryStorage() }); // for voice uploads

// ————————————————
// In-memory cache for TTS
// ————————————————
const audioCache = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 60,
});
const defaultMessage = { role: "system", content: `
  You are a virtual Fitness coach.
  You will always reply with a JSON array of messages. With a maximum of 3 messages. each having:
  { text, facialExpression, animation } under response.
  facialExpression ∈ [smile, sad, angry, surprised, funnyFace, default]
  animation        ∈ [Talking_0, Talking_1, Laughing, Idle, Terrified, Angry]
`.trim() }
// ————————————————
// Chat memory (for continuity)
// ————————————————

let chatHistories = {}; // sessionId => history array


// ————————————————
// Utility: Generate mouth-cue data
// ————————————————
function generateMouthCues(duration) {
  const shapes = ["A", "B", "C", "D", "E", "F", "X"];
  const cues = [];
  let t = 0;

  while (t < duration) {
    const segment = Math.random() * 0.15 + 0.05;
    const end = Math.min(duration, t + segment);
    cues.push({
      start: parseFloat(t.toFixed(2)),
      end: parseFloat(end.toFixed(2)),
      value: shapes[Math.floor(Math.random() * shapes.length)],
    });
    t = end;
  }

  return {
    metadata: { duration: parseFloat(duration.toFixed(2)) },
    mouthCues: cues,
  };
}

// ————————————————
// Service: Text → Speech (base64 MP3)
// ————————————————
async function textToSpeech(text) {
  if (audioCache.has(text)) {
    return audioCache.get(text);
  }
  const mp3 = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "nova",
    input: text,
    response_format: "mp3",
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  const base64Audio = buffer.toString("base64");
  audioCache.set(text, base64Audio);
  return base64Audio;
}

// ————————————————
// App setup
// ————————————————
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/", (_req, res) => res.send("👋 Virtual Fitness Coach API"));

/**
 * Core Chat Handler (with Memory)
 */
async function handleChat(userMessage, sessionId) {
  let chatHistory = chatHistories[sessionId];

  chatHistories[sessionId] = chatHistory || [];
  if (!chatHistory) {
    chatHistory = [];
  }

  chatHistory.push({ role: "user", content: userMessage });

  if (chatHistory.length > 5) chatHistory.shift(); // Only keep last 5 chats for efficiency

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 1000,
    temperature: 0.6,
    response_format: { type: "json_object" },
    messages: [defaultMessage, ...chatHistory],
  });

  let raw = completion.choices[0].message.content;
  console.log("Raw GPT response:", raw);

  // Save assistant response into memory
  chatHistory.push({ role: "assistant", content: raw });

  let parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (parsed.response) parsed = parsed.response;
  if (parsed.messages) parsed = parsed.messages;

  if (!Array.isArray(parsed)) {
    console.error("Parsed payload is not an array:", parsed);
    throw new Error("Invalid response format from GPT");
  }

  const messages = parsed;

  // Helper: Estimate duration by word count
  function estimateDuration(text) {
    const words = text.split(/\s+/).length;
    const seconds = words / 2.8; // 2.8 words/sec speaking speed
    return parseFloat(seconds.toFixed(2));
  }

  // Enrich all messages in full parallel
  const enriched = await Promise.all(
    messages.map(({ text, facialExpression, animation }) =>
      (async () => {
        const  start = Date.now();

        const audioBase64 = await textToSpeech(text); // text -> audio base64
        console.log("Audio processing time:", Date.now() - start, "ms");
        
        const duration = estimateDuration(text); // estimate speech duration
        console.log("Duration estimation time:", Date.now() - start, "ms");
        const lipsync = generateMouthCues(duration); // generate mouth animation
        console.log("Lipsync generation time:", Date.now() - start, "ms");

        return {
          text,
          facialExpression,
          animation,
          audio: audioBase64,
          lipsync,
        };
      })()
    )
  );

  return enriched;
}


// ————————————————
// /chat (for text input)
// ————————————————
app.post("/chat", async (req, res, next) => {
  try {
    const userMessage = req.body.message?.trim() || "Hello";
    const sessionId = req.body.sessionId || "default-session"; // Use a default session ID if not provided
    const messages = await handleChat(userMessage,sessionId);
    res.json({ messages });
  } catch (err) {
    next(err);
  }
});

// ————————————————
// /voicechat (for audio input)
// ————————————————
app.post("/voicechat", upload.single("audio"), async (req, res, next) => {
  try {
    if (!req.file) throw new Error("No audio file uploaded.");
  

    const file = new File(
      [req.file.buffer],
      req.file.originalname || "audio.webm",
      {

        type: req.file.mimetype || "audio/webm",
      }
    );
    const sessionId = req.body.sessionId || "default-session"; // Use a default session ID if not provided
    console.log("sessionId", sessionId);
    

    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      response_format: "text",
    });

    const userText = transcription.trim();
    console.log("Transcribed user says:", userText)

    const userMessage = userText || "Hello";
    const messages = await handleChat(userMessage,sessionId);
    res.json({ messages });
  } catch (err) {
    console.error("Error in /voicechat:", err);
    next(err);
  }
});

// ————————————————
// Global error handler
// ————————————————
app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
