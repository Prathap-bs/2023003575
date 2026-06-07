# Stage 2

## Database Choice

I would use MongoDB because notifications are simple documents and MongoDB is easy to scale. It also works well with Node.js and Mongoose.

### Schema

```javascript
{
  studentId: String,
  notificationType: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

### Possible Problems

As notifications increase:

* Queries may become slower.
* Storage requirements increase.
* Database load becomes high.

### Solutions

* Add indexes on frequently searched fields.
* Use pagination.
* Archive old notifications.
* Use sharding if data grows significantly.

### Example Query

```javascript
db.notifications.find({
  studentId: "1042",
  isRead: false
});
```

# Stage 3

### Given Query

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

### Why It Is Slow

The query is correct, but with millions of records the database may scan a large amount of data before finding the result.

### Optimization

Create a composite index:

```sql
CREATE INDEX idx_student_read_date
ON notifications(studentID, isRead, createdAt DESC);
```

This helps the database find unread notifications much faster.

### Should We Index Every Column?

No.

Too many indexes increase storage usage and make inserts/updates slower. Only important columns should be indexed.

### Placement Notifications In Last 7 Days

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType='Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;
```

# Stage 4

### Problem

Notifications are fetched whenever a page loads, which increases database traffic.

### Solution 1: Pagination

```http
GET /notifications?page=1&limit=20
```

Loads only a few notifications at a time.

### Solution 2: Redis Cache

Store frequently accessed notifications in cache to reduce database queries.

### Solution 3: Lazy Loading

Load notifications only when the user opens the notification section.

### Solution 4: WebSockets

Send notifications in real time instead of repeatedly checking the database.

These methods reduce database load and improve performance.

# Stage 5

### Notification Sending

When a notification is created:

1. Save it in the database.
2. Send it to the user.
3. Log the action.

### Validation

```javascript
if (!studentName) {
  throw new Error("Student name required");
}

if (!message) {
  throw new Error("Message required");
}
```

### Logging

```javascript
Log(
  "backend",
  "info",
  "handler",
  "Notification sent successfully"
);
```

### Future Improvements

* Email notifications
* SMS notifications
* Push notifications
* Message queues such as RabbitMQ or Kafka
