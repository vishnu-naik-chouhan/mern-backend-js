import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, "task name is required"],
      trim: true,
      maxLength: 50,
      minLength: 1,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isCompleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const List = mongoose.model("List", listSchema);
export default List;
