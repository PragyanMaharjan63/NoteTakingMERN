import { X } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UseBackend } from "../contexts/context";
import { useRef, useState } from "react";
import DividerLine from "./divider";

type NoteInput = {
  Title: string;
  Description: string;
};
type Note = {
  _id: string;
  Title: string;
  Description: string;
  userId: string;
};

type prop = {
  setEditNote: React.Dispatch<React.SetStateAction<boolean>>;
  note: Note;
};
export default function EditNote({ setEditNote, note }: prop) {
  const [height, setHeight] = useState("");
  const { backendURL } = UseBackend();
  const { register, handleSubmit } = useForm<NoteInput>({
    defaultValues: {
      Title: note.Title,
      Description: note.Description,
    },
  });

  const onSubmit: SubmitHandler<NoteInput> = async (data) => {
    await axios.put(
      `${backendURL}api/notes/setnotes/${note._id}`,
      {
        Title: data.Title,
        Description: data.Description,
      },
      { withCredentials: true }
    );
    setEditNote(false);
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
    <>
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
        <DividerLine />
        <div>
          <textarea
            {...register("Description")}
            ref={(e) => {
              register("Description").ref(e); // RHF needs its ref
              textareaRef.current = e; // your local ref for auto-resize
            }}
            onInput={handleInput}
            className="resize-none w-full outline-none"
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
    </>
  );
}
