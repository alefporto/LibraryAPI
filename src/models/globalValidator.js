import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: (value) => value.trim() != "",
    message: "O campo {PATH} está vazio"
});