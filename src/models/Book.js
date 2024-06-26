import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: {
        type: String,
        cast: "O campo título deve receber uma string válida",
        required: [true, "O campo título é obrigatório"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        cast: "O campo autor deve receber um ObjectId válido",
        ref: "authors",
        required: [true, "O campo autor é obrigatório"],
        autopopulate: { select: 'name' }
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        cast: "O campo editora deve receber um ObjectId válido",
        ref: "publishers",
        required: [true, "O campo editora é obrigatório"],
        autopopulate: { select: 'name' }
    },
    edition: {
        type: Number,
        cast: "O campo edição deve receber um número válido",
        required: [true, "O campo edição é obrigatório"]
    },
    pages: {
        type: Number,
        cast: "O campo páginas deve receber um número válido",
        required: [true, "O campo páginas é obrigatório"],
        min: [10, "O valor {VALUE} é menor que o número mínimo permitido de páginas"],
        max: [5000, "O valor {VALUE} é maior que o número máximo permitido de páginas"]
    },
    typeCover: {
        type: String,
        cast: "O campo tipo de capa deve receber uma string válida",
        required: [true, "O campo tipo da capa é obrigatório"],
        enum: {
            values: [ "Capa comum", "Capa dura" ],
            message: "O tipo de capa {VALUE} não é válido. Valores válidos: Capa comum; Capa dura"
        }
    }
}, { versionKey: false });

bookSchema.plugin(autopopulate);

const book = mongoose.model('books', bookSchema);

export default book;
