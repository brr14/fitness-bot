import { createContext, useContext, useEffect, useRef, useState } from "react";

const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8081";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  // date time now with date and hours for session id if token is not available
  const sessionId =  token ? token : new Date().toISOString().slice(0, 19).replace(/[-:]/g, "").replace("T", "_");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [recording, setRecording] = useState(false);

  const mediaRecorder = useRef(null);
  const mediaStream = useRef(null);
  const audioChunks = useRef([]);

  const sendMessage = async (endpoint, payload) => {
    setLoading(true);
    const res = await fetch(`${backendUrl}/${endpoint}`, {
      method: "POST",
      body: payload,
      ...(endpoint === "chat" ? { headers: { "Content-Type": "application/json" } } : {}),
    });

    const { messages: newMessages } = await res.json();
    setMessages((prev) => [...prev, ...newMessages]);
    setLoading(false);
  };

  const chat = async (inputText) => {
    await sendMessage("chat", JSON.stringify({ message: inputText, sessionId: sessionId }));
  };

  const sendAudio = async (blob) => {
    const formData = new FormData();
    formData.append("audio", new File([blob], "audio.webm", { type: "audio/webm" }));
    

    await sendMessage("voicechat", formData);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.current = stream;

    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.current.push(e.data);
      }
    };

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });

      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => track.stop());
        mediaStream.current = null;
      }

      await sendAudio(blob);
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const onMessagePlayed = () => {
    setMessages((prev) => prev.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) setMessage(messages[0]);
    else setMessage(null);
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        messages,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
        startRecording,
        stopRecording,
        recording,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be inside ChatProvider");
  return context;
};
