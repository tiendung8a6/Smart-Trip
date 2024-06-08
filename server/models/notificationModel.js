import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: false },
    pointsDeducted: { type: Number, required: false },
    reason: { type: String, required: false },
  },
  { timestamps: true }
);

const Notifications = mongoose.model("Notifications", notificationSchema);

export default Notifications;
