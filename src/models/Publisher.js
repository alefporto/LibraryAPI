import mongoose from 'mongoose';

const publisherSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        cast: "O campo nome deve receber uma string válida",
        required: [true, "O campo nome é obrigatório"]
    },
    country: {
        type: String,
        cast: "O campo país deve receber uma string válida",
        required: [true, "O campo país é obrigatório"]
    }
}, { versionKey: false });

const publisher = mongoose.model('publishers', publisherSchema);

export default publisher;
