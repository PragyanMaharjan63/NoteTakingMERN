import axios from "axios";
import { useEffect, useState } from "react";
import { UseBackend } from "../contexts/context";
import { CirclePlus } from "lucide-react";
import Popup from "../assets/popup";
import DividerLine from "../assets/divider";

type Note = {
  _id: string;
  Title: string;
  Description: string;
  userId: string;
};

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { backendURL } = UseBackend();
  const [showPopup, setShowPopup] = useState(true);
  // for disabling scrolling the main page
  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showPopup]);

  useEffect(() => {
    const getNotes = async () => {
      const req = await axios.get<{ success: boolean; fetchedNotes: Note[] }>(
        `${backendURL}api/notes/getnotes`,
        {
          withCredentials: true,
        }
      );
      if (req.data.success) {
        setNotes(req.data.fetchedNotes);
      }
    };
    getNotes();
  }, []);
  return (
    <div className="flex flex-wrap h-screen w-full gap-5 justify-center items-center translate-y-18 md:translate-y-0 z-5">
      {notes.map((note) => (
        <div
          key={note._id}
          className="flex flex-col justify-start items-start gap-2 bg-white p-5 rounded-xl shadow-md w-60 h-70 mt-3"
        >
          <div className="text-lg font-semibold">{note.Title}</div>
          <DividerLine />
          <div className="overflow-hidden text-neutral-600">
            {note.Description}
          </div>
        </div>
      ))}
      <div className="flex flex-col justify-center items-center gap-2 bg-white/20 p-5 rounded-xl shadow-md w-60 h-70 border-4 border-dashed cursor-pointer border-neutral-600">
        <div className="overflow-hidden text-neutral-600 flex flex-col justify-center items-center gap-3 translate-y-2">
          <p>
            <CirclePlus className="size-20" />
          </p>
          <p>Add New Note</p>
        </div>
      </div>
      {showPopup && (
        <div className="absolute grid justify-items-center items-center h-screen w-screen bg-black/40 ">
          <Popup />
        </div>
      )}
    </div>
  );
};

export default Home;
