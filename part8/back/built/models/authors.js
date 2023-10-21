"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.mongoose.Schema({
    name: { type: String, required: true, minLength: 3 },
    born: { type: Number, required: false },
    bookCount: { type: Array, required: false },
});
module.exports = schema.model("Author", schema);
