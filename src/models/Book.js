import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    author: { type: String },
    pages: { type: Number }
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;