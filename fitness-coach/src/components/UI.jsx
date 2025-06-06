import { useRef, useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";

export const UI = ({ hidden }) => {
  const input = useRef();
  const chatContainerRef = useRef();
  const seenMessagesRef = useRef(new Set()); // 🔒 Tracks already shown messages

  const {
    chat,
    loading,
    message,
    messages,
    startRecording,
    stopRecording,
    recording,
  } = useChat();

  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    const text = input.current.value.trim();
    if (!loading && !message && text) {
      const userMsgKey = `user-${text}`;

      // ✅ Add user message only if not already seen
      if (!seenMessagesRef.current.has(userMsgKey)) {
        seenMessagesRef.current.add(userMsgKey);
        setAllMessages((prev) => [...prev, { role: "user", text }]);
      }

      input.current.value = "";
      await chat(text); // Assistant response will be added from useEffect
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const newMessages = messages.filter((msg) => {
        const key = `${msg.role}-${msg.text}`;
        if (seenMessagesRef.current.has(key)) return false;
        seenMessagesRef.current.add(key);
        return true;
      });

      if (newMessages.length > 0) {
        setAllMessages((prev) => [...prev, ...newMessages]);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [allMessages]);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-10 flex flex-col justify-between p-4 pointer-events-none">
      {/* Header */}
      <div className="self-start backdrop-blur-md bg-gradient-to-r from-pink-400 to-pink-600 p-4 rounded-lg text-white shadow-md">
        <h1 className="font-extrabold text-2xl">🏋️ Virtual Fitness Coach</h1>
        <p className="text-sm font-medium">Stay Strong. Stay Healthy! 💪</p>
      </div>

      {/* Chat bubbles */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 mt-4 pointer-events-auto"
      >
        {allMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-lg px-4 py-3 rounded-2xl shadow-md text-sm md:text-base ${
                msg.role === "user"
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center pointer-events-auto w-full max-w-md mx-auto gap-4">
        <input
          ref={input}
          type="text"
          placeholder="Type a message or Record..."
          className="w-full p-4 rounded-xl border-2 border-pink-400 focus:border-pink-600 bg-white bg-opacity-70 backdrop-blur-md placeholder:text-gray-700"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <div className="flex w-full gap-3">
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`flex-1 py-3 rounded-xl font-semibold text-white ${
              loading || message
                ? "bg-pink-300 opacity-40 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            Send
          </button>
          <button
            disabled={loading || message}
            onClick={recording ? stopRecording : startRecording}
            className={`flex-1 py-3 rounded-xl font-semibold text-white ${
              loading || message
                ? "opacity-40 cursor-not-allowed"
                : recording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {recording ? "Stop" : "Record"}
          </button>
        </div>
      </div>
    </div>
  );
};
