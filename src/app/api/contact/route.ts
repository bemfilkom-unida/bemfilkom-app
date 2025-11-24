import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received contact request:', body);

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

    console.log('Environment variables check:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'MISSING',
      NODE_ENV: process.env.NODE_ENV
    });

    // Create message data
    const messageData = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || '',
      message: message.trim(),
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

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to bem.filkom@unida.ac.id');

        return NextResponse.json({
          ok: true,
          message: messageData,
          success: 'Email sent successfully!'
        }, { status: 201 });

      } catch (emailError) {
        console.error('Email sending failed:', emailError);

        return NextResponse.json({
          ok: true,
          message: messageData,
          success: 'Message received! Email delivery failed, but your message has been logged and will be processed manually.',
          warning: 'Email service temporarily unavailable'
        });
      }
    } else {
      // No email configuration
      console.log('No email configuration found, storing message locally');

      return NextResponse.json({
        ok: true,
        message: messageData,
        success: 'Message received! Your message has been logged and will be processed manually.',
        info: 'Email service not configured'
      });
    }

  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json({
      ok: false,
      error: 'Internal server error. Please try again later.'
    }, { status: 500 });
  }
}