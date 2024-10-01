import mongoose, { model, Schema } from "mongoose";

const CommentSchema = new Schema({
  movieId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment || model("Comment", CommentSchema);
