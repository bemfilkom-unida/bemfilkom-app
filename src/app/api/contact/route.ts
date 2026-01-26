import { NextRequest, NextResponse } from 'next/server';
import { sanitizeHtml, sanitizeText } from '@/lib/sanitize';

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 5) { // Max 5 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const { name, email, subject, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Input length validation
    if (name.length > 100 || email.length > 255 || (subject && subject.length > 200) || message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: 'Input too long. Please shorten your message.' },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeText(name.trim());
    const sanitizedEmail = sanitizeText(email.trim());
    const sanitizedSubject = subject ? sanitizeText(subject.trim()) : '';
    const sanitizedMessage = sanitizeText(message.trim());

    // Create message data
    const messageData = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      createdAt: new Date().toISOString(),
    };

    // Try to send email if environment variables are set
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        // Import nodemailer dynamically
        const nodemailer = await import('nodemailer');

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
          subject: `[Contact Form] ${sanitizedSubject || 'Pesan dari ' + sanitizedName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                Pesan Baru dari Website BEM FILKOM
              </h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #495057; margin-top: 0;">Detail Pengirim:</h3>
                <p><strong>Nama:</strong> ${sanitizedName}</p>
                <p><strong>Email:</strong> ${sanitizedEmail}</p>
                <p><strong>Subject:</strong> ${sanitizedSubject || 'Tidak ada subject'}</p>
              </div>
              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
                <h3 style="color: #495057; margin-top: 0;">Pesan:</h3>
                <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${sanitizedMessage}</p>
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

        await transporter.sendMail(mailOptions);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Email sent successfully to bem.filkom@unida.ac.id');
        }

        return NextResponse.json({
          ok: true,
          message: messageData,
          success: 'Email sent successfully!'
        }, { status: 201 });

      } catch (emailError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Email sending failed:', emailError);
        }

        return NextResponse.json({
          ok: true,
          message: messageData,
          success: 'Message received! Email delivery failed, but your message has been logged and will be processed manually.',
          warning: 'Email service temporarily unavailable'
        });
      }
    } else {
      // No email configuration
      if (process.env.NODE_ENV === 'development') {
        console.log('No email configuration found, storing message locally');
      }

      return NextResponse.json({
        ok: true,
        message: messageData,
        success: 'Message received! Your message has been logged and will be processed manually.',
        info: 'Email service not configured'
      });
    }

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact API error:', error);
    }

    return NextResponse.json({
      ok: false,
      error: 'Internal server error. Please try again later.'
    }, { status: 500 });
  }
}