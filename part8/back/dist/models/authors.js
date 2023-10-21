import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    name: { type: String, required: true, minLength: 3 },
    born: { type: Number, required: false },
    bookCount: { type: Array, required: false },
});
export const AuthorModel = mongoose.model("Author", schema);
