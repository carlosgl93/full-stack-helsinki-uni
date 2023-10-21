import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    title: { type: String, required: true, minLength: 3 },
    published: { type: Number, required: false },
    genres: { type: Array, required: false },
    author: { type: String, required: true },
});
export const BookModel = mongoose.model("Book", schema);
