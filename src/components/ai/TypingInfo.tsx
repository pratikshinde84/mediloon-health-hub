import { useEffect, useState } from "react";

const TypingInfo = ({ medicine }: { medicine: string }) => {
  const fullText = `${medicine} is commonly used to reduce fever and relieve mild to moderate pain. It works by blocking chemical messengers in the brain that signal pain and regulate body temperature. Always use this medicine as directed by your doctor.`;

  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
    let i = 0;

    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;

      if (i > fullText.length) clearInterval(interval);
    }, 18);

    return () => clearInterval(interval);
  }, [medicine]);

  return (
    <div>
      <h3 className="text-lg font-bold mb-3">{medicine} — AI Info</h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {text}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
};

export default TypingInfo;