import Notes from "../models/notes.js";
import CryptoJS from "crypto-js";
export const getNotes = async (req, res) => {
  try {
    const fetchedNotes = await Notes.find({ userId: req.user._id });
    const decryptedNotes = fetchedNotes.map((note) => ({
      _id: note._id,
      Title: CryptoJS.AES.decrypt(
        note.Title,
        process.env.CRYPTO_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8),
      Description: CryptoJS.AES.decrypt(
        note.Description,
        process.env.CRYPTO_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8),
      userId: note.userId,
      __v: note.__v,
    }));
    res.json({ success: true, decryptedNotes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const setNotss = async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const userId = req.user;
    const cypherTitle = CryptoJS.AES.encrypt(
      Title,
      process.env.CRYPTO_SECRET_KEY
    ).toString();
    const cypherDescription = CryptoJS.AES.encrypt(
      Description,
      process.env.CRYPTO_SECRET_KEY
    ).toString();

    const Note = new Notes({
      Title: cypherTitle,
      Description: cypherDescription,
      userId: userId._id,
    });
    Note.save();

    res.send({ success: true, message: `${Note.Title} added` });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    await Notes.deleteOne({ _id: id });

    res.send({ success: true, message: "deleted" });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Description } = req.body;
    const userId = req.user;
    const cypherTitle = CryptoJS.AES.encrypt(
      Title,
      process.env.CRYPTO_SECRET_KEY
    ).toString();
    const cypherDescription = CryptoJS.AES.encrypt(
      Description,
      process.env.CRYPTO_SECRET_KEY
    ).toString();
    const updateNote = await Notes.findByIdAndUpdate(
      id,
      { Title: cypherTitle, Description: cypherDescription },
      { new: true }
    );
    if (!updateNote) {
      return res.send({ success: false, message: "note not found" });
    }
    return res.send({ success: true, message: updateNote });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
