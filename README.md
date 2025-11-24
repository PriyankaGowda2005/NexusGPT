# NexusGPT

A modern MERN stack-based ChatGPT replica implemented from scratch using OpenAI API. This application provides a beautiful, responsive chat interface similar to ChatGPT with thread management, message history, and persistent storage.

## 🚀 Features

- **Real-time Chat Interface**: Interactive chat experience powered by OpenAI's GPT-4o-mini model
- **Thread Management**: Create, view, and delete multiple conversation threads
- **Message History**: Persistent storage of all conversations in MongoDB
- **Modern UI/UX**: Beautiful, responsive React-based user interface with smooth animations
- **Responsive Design**: Fully responsive design that works seamlessly on desktop, tablet, and mobile devices
- **Sidebar Navigation**: Easy access to previous chat threads with mobile-friendly menu
- **Markdown Support**: Formatted responses with syntax highlighting
- **Dark Theme**: Modern dark theme with gradient accents and glassmorphism effects

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Markdown** - Markdown rendering
- **Rehype Highlight** - Code syntax highlighting
- **React Spinners** - Loading indicators
- **Inter Font** - Modern typography

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **OpenAI API** - AI chat completions
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Either:
  - Local MongoDB installation, or
  - MongoDB Atlas account (cloud database) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **OpenAI API Key** - [Get your API key](https://platform.openai.com/api-keys)

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/PriyankaGowda2005/NexusGPT.git
   cd NexusGPT
   ```

2. **Install Backend Dependencies**:

   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**:

   ```bash
   cd ../Frontend
   npm install
   ```

## ⚙️ Environment Variables Setup

1. **Create a `.env` file** in the `Backend` directory:

   ```bash
   cd Backend
   touch .env
   ```

   On Windows:
   ```bash
   cd Backend
   type nul > .env
   ```

2. **Add the following environment variables** to `Backend/.env`:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```

   **Example for MongoDB Atlas:**

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexusgpt?retryWrites=true&w=majority
   ```

   **Example for Local MongoDB:**

   ```env
   MONGODB_URI=mongodb://localhost:27017/nexusgpt
   ```

   **OpenAI API Key:**

   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## 🚀 Running the Project

You need to run both the backend and frontend servers. Open two separate terminal windows/tabs.

### Terminal 1 - Backend Server

```bash
cd NexusGPT/Backend
node server.js
```

The backend server will start on **http://localhost:8080**

**Alternative:** If you want auto-reload on file changes, you can use nodemon:

```bash
cd NexusGPT/Backend
npx nodemon server.js
```

### Terminal 2 - Frontend Server

```bash
cd NexusGPT/Frontend
npm run dev
```

The frontend will start on **http://localhost:5173** (or another port if 5173 is occupied)

### Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

## 📁 Project Structure

```
NexusGPT/
├── Backend/
│   ├── models/
│   │   └── Thread.js          # MongoDB schema for threads and messages
│   ├── routes/
│   │   └── chat.js            # API routes for chat operations
│   ├── utils/
│   │   └── openai.js          # OpenAI API integration
│   ├── server.js              # Express server setup
│   ├── package.json
│   └── .env                   # Environment variables (create this)
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── ChatWindow.jsx     # Chat interface component
│   │   ├── Chat.jsx           # Chat messages component
│   │   ├── Sidebar.jsx        # Sidebar with thread list
│   │   ├── MyContext.jsx     # React context for state management
│   │   └── assets/            # Images and static assets
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Base URL: `http://localhost:8080/api`

| Method   | Endpoint            | Description                        |
| -------- | ------------------- | ---------------------------------- |
| `GET`    | `/thread`           | Get all conversation threads       |
| `GET`    | `/thread/:threadId` | Get messages for a specific thread |
| `POST`   | `/chat`             | Send a message and get AI response |
| `DELETE` | `/thread/:threadId` | Delete a thread                    |

### Example API Usage

**Send a chat message:**

```bash
POST http://localhost:8080/api/chat
Content-Type: application/json

{
  "threadId": "unique-thread-id",
  "message": "Hello, how are you?"
}
```

**Get all threads:**

```bash
GET http://localhost:8080/api/thread
```

## 🎨 UI/UX Features

- **Modern Design System**: Consistent color palette with CSS variables
- **Smooth Animations**: Transitions and hover effects throughout
- **Gradient Accents**: Beautiful indigo/purple gradient theme
- **Glassmorphism**: Modern blur effects and transparency
- **Responsive Layout**: Mobile-first design with breakpoints for tablet and desktop
- **Custom Scrollbars**: Styled scrollbars matching the theme
- **Loading States**: Beautiful loading indicators with animations

## 🐛 Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**

   - Verify your `MONGODB_URI` in `.env` is correct
   - Ensure MongoDB is running (if using local MongoDB)
   - Check network connectivity (if using MongoDB Atlas)

2. **OpenAI API Error**

   - Verify your `OPENAI_API_KEY` is valid and has credits
   - Check API rate limits

3. **Port Already in Use**
   - Change the `PORT` in `server.js` if 8080 is occupied

### Frontend Issues

1. **Cannot Connect to Backend**

   - Ensure backend server is running on port 8080
   - Check CORS configuration in `server.js`
   - Verify API endpoint URLs in frontend code

2. **Build Errors**
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install` (Linux/Mac) or `rmdir /s node_modules && npm install` (Windows)
   - Clear npm cache: `npm cache clean --force`

3. **Text Not Visible in Input**
   - Clear browser cache and reload
   - Check if CSS variables are loading correctly

## 📝 Available Scripts

### Backend

- `node server.js` - Start the backend server
- `npx nodemon server.js` - Start with auto-reload

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-width layout with sidebar always visible
- **Tablet** (768px - 1024px): Adjusted spacing and font sizes
- **Mobile** (< 768px): Collapsible sidebar with overlay, touch-friendly interface

## 🔒 Security Notes

- **Never commit** your `.env` file to version control
- Keep your OpenAI API key secure and don't share it
- Use environment variables for all sensitive data
- Consider implementing rate limiting for production use

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🔗 Repository

[GitHub Repository](https://github.com/PriyankaGowda2005/NexusGPT)

---

**Happy Chatting! 💬**
