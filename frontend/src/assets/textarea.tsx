import { useRef } from "react";

export default function AutoExpandTextArea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      className=" resize-none w-full outline-none"
      placeholder="Notes here"
      rows={4}
    />
  );
}
