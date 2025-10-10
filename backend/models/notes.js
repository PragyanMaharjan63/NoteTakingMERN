import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  userId: String,
});

const Notes = mongoose.model("Notes", NotesSchema);
export default Notes;
