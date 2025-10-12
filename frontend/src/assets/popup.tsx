import React, { useRef, useState } from "react";
import Divider from "./divider";

import { X } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UseBackend } from "../contexts/context";

type NoteInput = {
  Title: string;
  Description: string;
};

type prop = {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Popup({ setShowPopup }: prop) {
  const [height, setHeight] = useState("");
  const { backendURL } = UseBackend();
  const { register, handleSubmit, setValue } = useForm<NoteInput>();
  const onSubmit: SubmitHandler<NoteInput> = async (data) => {
    await axios.post(
      `${backendURL}api/notes/setnotes`,
      {
        Title: data.Title,
        Description: data.Description,
      },
      { withCredentials: true }
    );
    setShowPopup(false);
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
      setHeight(`${el.scrollHeight}px`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-white shadow-md z-10 p-6 rounded-lg h-${height}`}
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          className="text-3xl w-[70vw] font-bold outline-none"
          {...register("Title")}
        />
      </div>
      <Divider />
      <div>
        <textarea
          ref={textareaRef}
          onInput={(e) => {
            handleInput(); // auto-resize
            setValue("Description", e.currentTarget.value); // update RHF manually
          }}
          className=" resize-none w-full outline-none"
          placeholder="Notes here"
          rows={4}
        />
      </div>
      <div className="absolute top-7 text-neutral-500 right-5 cursor-pointer">
        <button type="submit">
          <X />
        </button>
      </div>
    </form>
  );
}
