const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    body: { type: String, required: [true, "body is required"] },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
let Article = mongoose.model("Article", articleSchema);
module.exports = Article;
