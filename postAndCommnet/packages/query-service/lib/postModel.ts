import mongoose from "mongoose";

interface IPost extends mongoose.Document {
  title: string;
}

const postSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
});

export const Post = mongoose.model<IPost>("Post", postSchema);
