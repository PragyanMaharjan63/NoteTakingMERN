import axios from "axios";
import { useEffect, useState } from "react";
import { UseBackend } from "../contexts/context";

type Note = {
  _id: string;
  Title: string;
  Description: string;
  userId: string;
};

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { backendURL } = UseBackend();
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
    <div className="flex h-screen w-full gap-5 justify-center items-center">
      {notes.map((note) => (
        <div
          key={note._id}
          className="flex flex-col justify-start items-start gap-2 bg-white p-5 rounded-xl shadow-md w-60 h-70"
        >
          <div className="text-lg font-semibold">{note.Title}</div>
          <div className="w-full h-0.5 bg-black"></div>
          <div className="overflow-hidden text-neutral-600">
            {note.Description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
