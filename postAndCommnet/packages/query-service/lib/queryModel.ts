import mongoose from "mongoose";

interface IQuery extends mongoose.Document {
  title: string;
  comments: { content: string; postId: string }[];
}
const querySchema = new mongoose.Schema<IQuery>(
  {
    title: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, _id: false },
);

export const Query = mongoose.model<IQuery>("Post", querySchema);
