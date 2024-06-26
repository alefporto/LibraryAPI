import mongoose from 'mongoose';

const publisherSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: [true, "O campo nome é obrigatório"]
    },
    country: {
        type: String,
        required: [true, "O campo país é obrigatório"]
    }
}, { versionKey: false });

const publisher = mongoose.model('publishers', publisherSchema);

export default publisher;
