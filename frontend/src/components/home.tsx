import axios from "axios";
import { useEffect, useState } from "react";
import { UseBackend } from "../contexts/context";
import { CirclePlus, X } from "lucide-react";
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
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
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
  }, [showPopup]);
  return (
    <div>
      <div className="flex flex-wrap grow h-screen w-full gap-x-5 justify-center items-center  z-5">
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
        <div
          className="flex flex-col justify-center items-center gap-2 bg-white/20 p-5 rounded-xl shadow-md w-60 h-70 border-4 border-dashed cursor-pointer border-neutral-600"
          onClick={() => {
            setShowPopup(true);
          }}
        >
          <div className="overflow-hidden text-neutral-600 flex flex-col justify-center items-center gap-3 translate-y-2">
            <p>
              <CirclePlus className="size-20" />
            </p>
            <p>Add New Note</p>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 grid place-items-center bg-black/40 z-50 overflow-y-auto">
          <div className="relative max-h-[90vh] overflow-y-auto">
            <Popup setShowPopup={setShowPopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
