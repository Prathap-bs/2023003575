const NotificationSchema = {
  _id: ObjectId,
  studentId: Number,
  notificationType: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
};