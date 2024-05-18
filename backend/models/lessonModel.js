import mongoose from "mongoose";

const posesSchema = new mongoose.Schema({
  pose: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    poses: [posesSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
