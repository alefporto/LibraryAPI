import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: [true, "O campo nome é obrigatório"]
    },
    nationality: {
        type: String,
        required: [true, "O campo nacionalidade é obrigatório"]
    }
}, { versionKey: false });

const author = mongoose.model('authors', authorSchema);

export default author;
