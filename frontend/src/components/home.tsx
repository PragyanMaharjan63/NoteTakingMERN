import axios from "axios";
import { useEffect, useState } from "react";
import { UseBackend } from "../contexts/context";
import { CirclePlus, Trash } from "lucide-react";
import Popup from "../assets/popup";
import DividerLine from "../assets/divider";
import EditNote from "../assets/editNote";

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
  const [editNote, setEditNote] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Note | null>(null);
  const deleteNote = async (id: string) => {
    try {
      const req = await axios.post(
        `${backendURL}api/notes/deletenote/${id}`,
        null,
        { withCredentials: true }
      );
      setNotes((prev) => prev.filter((note) => note._id !== id));
      console.log(req.data);
    } catch (error) {
      console.log(error);
    }
  };
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
  }, [showPopup, editNote]);
  return (
    <div>
      <div className="flex flex-wrap grow h-screen w-full md:w-[80vw] gap-x-5 justify-center items-center  z-5 translate-y-18">
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex relative flex-col justify-start items-start gap-2 bg-white/70 p-5 rounded-xl shadow-md w-60 h-70 mt-3 cursor-pointer hover:scale-110 transition-all"
            onClick={() => {
              setSelectedItem(note);
              setEditNote(true);
            }}
          >
            <div className="text-lg font-semibold ">{note.Title}</div>
            <DividerLine />
            <div className="overflow-hidden text-neutral-600 w-full break-words">
              {note.Description}
            </div>
            <div
              className="absolute bottom-5 left-4 rounded-full flex justify-center items-center bg-[#FF6B6B] p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note._id);
              }}
            >
              <Trash />
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
        <div className="fixed inset-0 w-full h-screen grid place-items-center bg-black/40 z-50 overflow-y-auto">
          <div className="relative max-h-[90vh] overflow-y-auto">
            <Popup setShowPopup={setShowPopup} />
          </div>
        </div>
      )}
      {editNote && selectedItem && (
        <div className="fixed inset-0 w-full h-screen grid place-items-center bg-black/40 z-50 overflow-y-auto">
          <div className="relative max-h-[90vh] overflow-y-auto">
            <EditNote setEditNote={setEditNote} note={selectedItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
