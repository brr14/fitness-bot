import { createContext, useContext, useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  // Standard text chat
  const chat = async (text) => {
    setLoading(true);
    const res = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const { messages: newMsgs } = await res.json();
    setMessages((m) => [...m, ...newMsgs]);
    setLoading(false);
  };

  // Audio-based chat (upload blob → whisper+gpt+tts)
  const sendAudio = async (audioBlob) => {
    setLoading(true);

    const form = new FormData();
    form.append("audio", audioBlob, "voicemsg.webm");

    const res = await fetch(`${backendUrl}/audio-chat`, {
      method: "POST",
      body: form,
    });
    // { transcript: "...", reply: "GPT says..." }
    const { transcript, reply } = await res.json();

    // first show the user’s own transcript as a bubble
    setMessages((m) => [
      ...m,
      { text: transcript, isUser: true, facialExpression: "default" },
    ]);

    // then get the TTS-enriched reply from /chat
    await chat(reply);
    setLoading(false);
  };

  // show one message at a time
  useEffect(() => {
    setMessage(messages.length > 0 ? messages[0] : null);
  }, [messages]);

  const onMessagePlayed = () => {
    setMessages((m) => m.slice(1));
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        sendAudio,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be inside ChatProvider");
  return ctx;
};
