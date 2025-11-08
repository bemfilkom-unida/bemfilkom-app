import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default, { Router } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    // Menggunakan Gmail service untuk email institusi
    auth: {
      user: process.env.EMAIL_USER,
      // Email pengirim (bem.filkom@unida.ac.id)
      pass: process.env.EMAIL_PASS
      // Password
    }
  });
};
const sendContactEmail = async (data) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    // Email pengirim (bem.filkom@unida.ac.id)
    to: "bem.filkom@unida.ac.id",
    // Email tujuan (sama dengan pengirim)
    subject: `[Contact Form] ${data.subject || "Pesan dari " + data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Pesan Baru dari Website BEM FILKOM
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Detail Pengirim:</h3>
          <p><strong>Nama:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject || "Tidak ada subject"}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
          <h3 style="color: #495057; margin-top: 0;">Pesan:</h3>
          <p style="line-height: 1.6; color: #333;">${data.message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
          <p><strong>Waktu:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })}</p>
          <p><strong>Dikirim dari:</strong> Website BEM FILKOM Universitas Djuanda</p>
        </div>
      </div>
    `,
    text: `
Pesan Baru dari Website BEM FILKOM

Detail Pengirim:
- Nama: ${data.name}
- Email: ${data.email}
- Subject: ${data.subject || "Tidak ada subject"}

Pesan:
${data.message}

Waktu: ${(/* @__PURE__ */ new Date()).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
Dikirim dari: Website BEM FILKOM Universitas Djuanda
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email berhasil dikirim ke bem.filkom@unida.ac.id");
  } catch (error) {
    console.error("Error mengirim email:", error);
    throw new Error("Gagal mengirim email. Silakan coba lagi nanti.");
  }
};
const logContactMessage = async (data) => {
  const timestamp = (/* @__PURE__ */ new Date()).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
  const logMessage = `
========================================
PESAN BARU DARI WEBSITE BEM FILKOM
========================================
Waktu: ${timestamp}
Nama: ${data.name}
Email: ${data.email}
Subject: ${data.subject || "Tidak ada subject"}
Pesan:
${data.message}
========================================
`;
  console.log(logMessage);
  const fs = await import("fs");
  const logFile = "contact-messages.log";
  try {
    fs.appendFileSync(logFile, logMessage + "\n");
    console.log(`✅ Pesan tersimpan di ${logFile}`);
  } catch (error) {
    console.error("Error menyimpan log:", error);
  }
};
const contactRouter = Router();
const messages = [];
contactRouter.get("/", (_req, res) => {
  const response = { ok: true, messages };
  res.status(200).json(response);
});
contactRouter.post("/", async (req, res) => {
  const body = req.body ?? {};
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }
  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    subject,
    message,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  messages.unshift(item);
  try {
    await sendContactEmail({ name, email, subject, message });
    console.log("✅ Email berhasil dikirim ke bem.filkom@unida.ac.id");
  } catch (emailError) {
    console.log("❌ Email gagal, menggunakan logging sebagai backup...");
    await logContactMessage({ name, email, subject, message });
  }
  const response = { ok: true, message: item };
  res.status(201).json(response);
});
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.use("/api/contact", contactRouter);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
