import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Send } from "lucide-react";
import { useShellAppBar } from "../InvestorShell";
import {
  CHAT_SUGGESTIONS,
  GUARDRAIL_MESSAGE,
  answerFundQuestion,
  getFund,
  isAdviceSeeking,
} from "../data";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  guardrail?: boolean;
}

export default function ChatScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const fundId = (location.state as { fundId?: string } | null)?.fundId;
  const fund = fundId ? getFund(fundId) : undefined;

  useShellAppBar(
    {
      title: "Ask Nivya",
      subtitle: fund ? fund.name : "Fund Q&A · factual only",
      showBack: true,
      onBack: () => navigate(-1),
      showWatchlist: false,
      showNotifications: false,
    },
    [fund?.id],
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: fund
        ? `Ask me factual questions about ${fund.name}: NAV, expense ratio, returns, risk, or minimums. I won't give buy/sell advice.`
        : "Ask about how Nivya works, Regular vs Direct, ARN/EUIN, or open a fund and ask scheme-specific facts.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw: string) => {
    const question = raw.trim();
    if (!question || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: question }]);
    setTyping(true);

    window.setTimeout(() => {
      const advice = isAdviceSeeking(question);
      const reply = advice ? GUARDRAIL_MESSAGE : answerFundQuestion(fund, question);
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", text: reply, guardrail: advice },
      ]);
      setTyping(false);
    }, 550);
  };

  return (
    <div className="n-page n-chat-wrap">
      {fund && (
        <div className="n-chat-fund-chip">@{fund.name.split(" ").slice(0, 3).join(" ")}</div>
      )}

      <div className="n-chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={`n-chat-bubble ${m.role}${m.guardrail ? " guardrail" : ""}`}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="n-chat-typing">
            <span />
            <span />
            <span />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="n-chat-suggestions">
        {CHAT_SUGGESTIONS.map((s) => (
          <button key={s} type="button" className="n-chat-suggestion" onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="n-chat-inputbar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask a factual question…"
        />
        <button
          type="button"
          className="n-chat-send"
          disabled={!input.trim() || typing}
          onClick={() => send(input)}
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
