import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        cast: "O campo nome deve receber uma string válida",
        required: [true, "O campo nome é obrigatório"]
    },
    nationality: {
        type: String,
        cast: "O campo nacionalidade deve receber uma string válida",
        required: [true, "O campo nacionalidade é obrigatório"]
    }
}, { versionKey: false });

const author = mongoose.model('authors', authorSchema);

export default author;
