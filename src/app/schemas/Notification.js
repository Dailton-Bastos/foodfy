import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const NotificationSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    user: {
      type: Number,
      required: true,
    },

    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = model('Notification', NotificationSchema);

export default NotificationModel;
