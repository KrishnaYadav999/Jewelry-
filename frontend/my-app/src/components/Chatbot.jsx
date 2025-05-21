import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane, FaRobot, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqItems = [
  "What is your return policy?",
  "How do I track my order?",
  "What payment methods do you accept?",
  "How can I contact customer support?",
  "Do you ship internationally?",
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;

    const newMessages = [...messages, { text, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("https://jewelry-backend-gq4y.onrender.com/api/chatbot/chat", { message: text });

      let reply = "Sorry, I couldn't understand your question.";

      if (res.data?.reply) {
        if (typeof res.data.reply === "string") {
          reply = res.data.reply;
        } else if (res.data.reply.parts && Array.isArray(res.data.reply.parts)) {
          reply = res.data.reply.parts.map((part) => part.text).join("");
        }
      } else if (res.data?.candidates?.[0]?.content) {
        const content = res.data.candidates[0].content;
        if (typeof content === "string") {
          reply = content;
        } else if (content.parts && Array.isArray(content.parts)) {
          reply = content.parts.map((part) => part.text).join("");
        } else {
          reply = content.text || reply;
        }
      }

      setMessages((prevMessages) => [...prevMessages, { text: reply, sender: "bot" }]);
    } catch (error) {
      console.error("Chatbot Error:", error.response ? error.response.data : error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong. Please try again later.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg hover:bg-blue-600 transition-all"
          aria-label="Open Chatbot"
        >
          <FaRobot size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-blue-500 text-white flex items-center justify-between px-4 py-3">
            <h3 className="text-lg font-semibold">Ask Meher</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300"
              aria-label="Close Chatbot"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="border-b px-4 py-2 bg-gray-100 flex justify-between items-center cursor-pointer" onClick={() => setShowFAQ(!showFAQ)}>
            <span className="font-medium text-sm text-gray-700">FAQs</span>
            {showFAQ ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          {showFAQ && (
            <div className="px-4 py-2 space-y-1 bg-gray-50 border-b max-h-40 overflow-y-auto">
              {faqItems.map((faq, idx) => (
                <button
                  key={idx}
                  className="text-left text-sm text-blue-600 hover:underline w-full"
                  onClick={() => sendMessage(faq)}
                >
                  {faq}
                </button>
              ))}
            </div>
          )}

          <div ref={chatContainerRef} className="h-60 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span
                  className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
                    msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                  }`}
                >
                  {typeof msg.text === "string" ? msg.text : JSON.stringify(msg.text)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center border-t p-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about orders, delivery..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              onClick={() => sendMessage()}
              className={`bg-blue-500 text-white px-4 rounded-r-lg transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              disabled={loading}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
