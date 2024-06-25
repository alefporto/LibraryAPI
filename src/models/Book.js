import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: {
        type: String,
        required: [true, "O campo título é obrigatório"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors",
        required: [true, "O campo autor é obrigatório"],
        autopopulate: { select: "name" }
    },
    publisher: {
        type: String,
        required: [true, "O campo editora é obrigatório"],
    },
    pages: {
        type: Number,
        min: [10, "O valor {VALUE} é menor que o número mínimo permitido de páginas"],
        max: [5000, "O valor {VALUE} é maior que o número máximo permitido de páginas"]
    }
}, { versionKey: false });

bookSchema.plugin(autopopulate);

const book = mongoose.model("books", bookSchema);

export default book;
