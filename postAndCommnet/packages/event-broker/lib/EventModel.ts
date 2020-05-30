import mongoose from "mongoose";

interface IEvent extends mongoose.Document {
  type: "POST_CREATED" | "COMMENT_CREATED" | "COMMENT_UPDATED";
  data: Object;
}

const EventSchema = new mongoose.Schema<IEvent>({
  type: {
    type: String,
    required: true,
    enum: ["POST_CREATED", "COMMENT_CREATED", "COMMENT_UPDATED"],
  },
  data: {
    type: Map,
    of: String,
    required: true,
  },
});

export const Event = mongoose.model<IEvent>("Event", EventSchema);
