# 💬 CharchaHub - Temporary Real-Time Chatrooms

CharchaHub is a lightweight, temporary real-time chatroom platform where rooms and messages automatically disappear after 24 hours. Perfect for quick team discussions, study groups, or casual conversations without the need for permanent accounts.

## ✨ Features

- 🚀 **Real-time messaging** with WebSocket (STOMP)
- ⏰ **Auto-expiring rooms** (24-hour TTL)
- 🖼️ **Image sharing** with inline preview
- 🎨 **Cartoon avatar selection** with beautiful SVG avatars
- 📱 **Responsive design** for desktop and mobile
- 🎯 **Theme switching** (Light/Colorful themes)
- 🔒 **Room key protection** for privacy
- 🚫 **No registration required**

## 🚀 Live Demo

- **Backend**: Deploy to [Render](https://render.com) (Docker-ready)
- **Frontend**: Deploy to [Vercel](https://vercel.com)

## 🛠️ Tech Stack

### Backend
- **Java 17** with Spring Boot 3.3.5
- **MongoDB Atlas** for cloud database
- **WebSocket (STOMP)** for real-time communication
- **GridFS** for image storage
- **Docker** for containerization
- **Maven** for dependency management

### Frontend
- **React 18** with modern hooks
- **SockJS & STOMP** for WebSocket client
- **CSS3** with custom properties for theming
- **Responsive Design** with mobile-first approach

## 🌐 Deployment Configuration

### Environment Variables

#### Backend (Render) - Set these in your Render service:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/charchahub?retryWrites=true&w=majority&appName=Cluster0&ssl=true&authSource=admin&connectTimeoutMS=10000&socketTimeoutMS=10000
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
SERVER_PORT=8080
```

#### Frontend (Vercel) - Set in Vercel dashboard:
```bash
REACT_APP_API_URL=https://your-backend-app.onrender.com/api
```

### Quick Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy CharchaHub"
   git push origin main
   ```

2. **Deploy Backend** (Render):
   - Connect GitHub repo → Select "Web Service"
   - Root Directory: `backend`
   - Dockerfile detected automatically
   - Add environment variables

3. **Deploy Frontend** (Vercel):
   - Connect GitHub repo → Root Directory: `frontend`
   - Add `REACT_APP_API_URL` environment variable
- **MongoDB Atlas** - Cloud database with TTL indexes
- **WebSocket + STOMP** - Real-time messaging
- **Spring Data MongoDB** - Database integration
- **Lombok** - Code generation

### Frontend

- **React 18** - UI framework
- **React Router** - Client-side routing
- **SockJS + StompJS** - WebSocket client
- **PrismJS** - Syntax highlighting
- **Modern CSS** - Responsive styling

## 🚀 Quick Start

### Prerequisites

- **Java 17+** installed
- **Node.js 16+** and npm installed
- **MongoDB Atlas** account (free tier works)

### 1. Setup MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database access (create user with read/write permissions)
4. Get your connection string

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Update MongoDB connection in application.properties
# Replace <username>, <password>, and cluster details
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.mongodb.net/charchahub?retryWrites=true&w=majority

# Run the application
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

The backend will start on **http://localhost:8080**

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on **http://localhost:3000**

## 📖 Usage

### Creating a Room

1. Click **"Create Room"** on the homepage
2. Enter a **Room Name** and unique **Room Key**
3. Share the room key with others
4. You'll be redirected to join the room

### Joining a Room

1. Click **"Join Room"** on the homepage
2. Enter the **Room Key** provided by the room creator
3. Choose your **username** and **avatar**
4. Start chatting!

### Chat Features

- **Text Messages**: Type and press Enter to send
- **Code Snippets**: Wrap code in triple backticks:
  ```javascript
  console.log("Hello, CharchaHub!");
  ```
- **Image Upload**: Click the 📎 button to upload images
- **Multi-line**: Hold Shift+Enter for new lines

## 🔧 Configuration

### Backend Configuration (application.properties)

```properties
# MongoDB Atlas Configuration
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.mongodb.net/charchahub
spring.data.mongodb.database=charchahub

# Server Configuration
server.port=8080

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:3000

# File Upload (10MB max)
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

### Frontend Configuration

Create `.env` file in frontend directory:

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

## 🔄 API Endpoints

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| `POST` | `/api/room/create`        | Create a new room  |
| `POST` | `/api/room/join`          | Join existing room |
| `GET`  | `/api/room/{id}/messages` | Get room messages  |
| `POST` | `/api/upload/image`       | Upload image       |
| `GET`  | `/api/upload/image/{id}`  | Get uploaded image |

## 🌐 WebSocket Events

| Event                   | Description                |
| ----------------------- | -------------------------- |
| `/app/chat.sendMessage` | Send a chat message        |
| `/app/chat.addUser`     | Notify user joined         |
| `/topic/room/{roomId}`  | Subscribe to room messages |

## 🗂️ Database Schema

### Rooms Collection

```javascript
{
  _id: ObjectId,
  roomId: String,
  roomName: String,
  roomKey: String,
  createdAt: Date,
  expiresAt: Date // TTL index - auto-deletes after 24h
}
```

### Messages Collection

```javascript
{
  _id: ObjectId,
  roomId: String,
  username: String,
  avatar: String,
  type: "TEXT" | "IMAGE" | "CODE",
  content: String,
  timestamp: Date,
  expiresAt: Date // TTL index - auto-deletes after 24h
}
```

## 🎨 Customization

### Adding New Avatars

Edit `frontend/src/utils/helpers.js`:

```javascript
export const AVATARS = [
  "🐶",
  "🐱",
  "🐭", // ... add more emojis
];
```

### Changing TTL Duration

Update TTL in model constructors:

```java
this.expiresAt = LocalDateTime.now().plusHours(24); // Change to desired duration
```

## 🚀 Deployment

### Backend Deployment

1. Build the JAR: `./mvnw clean package`
2. Deploy to Heroku, AWS, or any Java hosting platform
3. Set MongoDB connection string in environment variables

### Frontend Deployment

1. Build for production: `npm run build`
2. Deploy to Netlify, Vercel, or any static hosting
3. Set API URL environment variable

## 🐛 Troubleshooting

### Common Issues

**WebSocket Connection Failed**

- Check CORS configuration in `WebSocketConfig.java`
- Ensure backend is running on port 8080
- Verify firewall settings

**Database Connection Issues**

- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Confirm database user permissions

**Images Not Loading**

- Check file size limit (10MB max)
- Verify image format (PNG, JPG, GIF, WebP)
- Check network connectivity

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Ideas for Enhancement

- [ ] User typing indicators
- [ ] Message reactions
- [ ] File sharing (PDFs, documents)
- [ ] Room themes/customization
- [ ] Private messaging
- [ ] Message search
- [ ] Voice messages
- [ ] Screen sharing

---

**Made with ❤️ for temporary conversations that matter**
