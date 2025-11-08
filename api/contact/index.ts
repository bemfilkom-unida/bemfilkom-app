import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields: name, email, message'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid email format'
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'bem.filkom@unida.ac.id',
      subject: `[Contact Form] ${subject || 'Pesan dari ' + name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Pesan Baru dari Website BEM FILKOM
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Detail Pengirim:</h3>
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'Tidak ada subject'}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Pesan:</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
            <p><strong>Waktu:</strong> ${new Date().toLocaleString('id-ID', {
              timeZone: 'Asia/Jakarta',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p><strong>Dikirim dari:</strong> Website BEM FILKOM Universitas Djuanda</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    const messageData = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || '',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({
      ok: true,
      message: messageData,
      success: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);

    // Return generic error to avoid exposing sensitive information
    res.status(500).json({
      ok: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
}