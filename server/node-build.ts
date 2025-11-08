import path from "path";
import { createServer } from "./index";
import * as express from "express";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

// Serve static files from multiple possible locations
app.use(express.static(distPath));
app.use(express.static(path.join(__dirname, "../spa/assets")));

// Add health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Handle React Router - serve index.html for all non-API routes
app.use((req, res, next) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return next();
  }

  // Skip if it's a static file request
  if (req.path.includes(".")) {
    return next();
  }

  const indexPath = path.join(distPath, "index.html");
  console.log(`Serving index.html from: ${indexPath} for path: ${req.path}`);

  // Serve index.html for all other routes
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
