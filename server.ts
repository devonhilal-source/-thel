import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // In-memory data store (Mocking a database since Firebase is currently unavailable)
  const messages: any[] = [];
  const activeDrafts: Record<string, any> = {};

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Socket.IO Logic
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join-chat", (chatId) => {
      socket.join(`chat-${chatId}`);
    });

    socket.on("send-message", (data) => {
      const message = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
      };
      messages.push(message);
      io.to(`chat-${data.chatId}`).emit("new-message", message);
    });

    socket.on("edit-draft", (data) => {
      activeDrafts[data.draftId] = data.content;
      socket.to(`draft-${data.draftId}`).emit("draft-updated", data.content);
    });

    socket.on("join-draft", (draftId) => {
      socket.join(`draft-${draftId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
