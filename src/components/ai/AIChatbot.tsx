import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ShoppingCart } from "lucide-react";
import { medicines } from "@/data/medicines";

interface Props {
  onMedicineFound?: (name: string) => void;
}

const AIChatbot = ({ onMedicineFound }: Props) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Fake AI brain
  const fakeAIResponse = (text: string) => {
    const lower = text.toLowerCase();

    if (lower.includes("paracetamol") || lower.includes("fever")) {
      return {
        text: "I found the best match for you.",
        products: medicines,
        medicineName: "Paracetamol",
      };
    }

    return {
      text: "Please tell me the medicine name.",
      products: [],
      medicineName: null,
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;

    const userMsg = { role: "user", text: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 🔥 AI thinking feel
    setLoading(true);

    setTimeout(() => {
      const ai = fakeAIResponse(userInput);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: ai.text,
          products: ai.products,
        },
      ]);

      // 🚀🚀🚀 MOST IMPORTANT — DASHBOARD TRIGGER
      if (onMedicineFound && ai.medicineName) {
        onMedicineFound(ai.medicineName);
      }

      setLoading(false);
    }, 1200);
  };

  return (
    <>
      {/* ================= FLOAT BUTTON ================= */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl flex items-center justify-center"
      >
        <MessageCircle />
      </button>

      {/* ================= CHAT WINDOW ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <p className="font-semibold">Mediloon AI</p>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i}>
                  <div
                    className={`text-sm p-2 rounded-lg max-w-[80%] ${
                      m.role === "user"
                        ? "ml-auto bg-orange-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* 🔥 PRODUCT CARDS */}
                  {m.products?.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {m.products.map((p: any) => (
                        <div
                          key={p.id}
                          className="border rounded-xl p-2 flex gap-2 items-center"
                        >
                          <img
                            src={p.image}
                            className="w-12 h-12 rounded-lg object-cover"
                            alt={p.name}
                          />
                          <div className="flex-1">
                            <p className="text-xs font-semibold">
                              {p.name}
                            </p>
                            <p className="text-xs text-orange-600 font-bold">
                              ₹{p.price}
                            </p>
                          </div>
                          <button className="p-2 bg-orange-500 text-white rounded-lg">
                            <ShoppingCart size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* 🔥 typing indicator */}
              {loading && (
                <div className="bg-gray-100 text-sm p-2 rounded-lg w-fit animate-pulse">
                  Mediloon AI is typing...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-2 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for medicines..."
                className="flex-1 border rounded-lg px-2 py-1 text-sm outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <button
                onClick={handleSend}
                className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;