import { useState } from "react";
import Header from "../components/Header";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Simulate bot response
    setTimeout(() => {
      const reply = getMockReply(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 800);

    setInput("");
  };

  const getMockReply = (text: string) => {
    if (text.toLowerCase().includes("diet")) return "You should aim for a 1300-calorie plan rich in protein!";
    if (text.toLowerCase().includes("workout")) return "Try 30 mins of strength training with a 15-min brisk walk.";
    return "Tell me your goals or ask about diet/workout!";
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#6482AD] absolute overflow-auto">
      <Header />
      <div className="pt-32 pb-16 px-4 lg:px-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#F5EDED] mb-6 text-center">Your Fitness Chatbot</h1>
        <div className="bg-[#F5EDED] rounded-2xl p-6 h-[70vh] flex flex-col shadow-lg overflow-hidden">
          <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] p-3 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-[#7FA1C3] self-end text-white"
                    : "bg-[#E2DAD6] self-start text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 rounded-xl border-2 border-[#6482AD] focus:outline-none"
              placeholder="Ask me about diet, workout, or your progress..."
            />
            <button
              onClick={handleSend}
              className="bg-[#2D336B] text-white px-6 py-2 rounded-xl hover:bg-[#7FA1C3] font-semibold transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
