import Notes from "../models/notes.js";

export const getNotes = async (req, res) => {
  try {
    const fetchedNotes = await Notes.find({ userId: req.user._id });
    res.json({ success: true, fetchedNotes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const setNotss = async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const userId = req.user;

    const Note = new Notes({
      Title,
      Description,
      userId: userId._id,
    });
    Note.save();

    res.send({ success: true, message: `${Note.Title} added` });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
