import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== EMAIL DEBUG TEST ===');
    console.log('Environment variables:');
    console.log('- EMAIL_USER:', process.env.EMAIL_USER);
    console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'MISSING');
    console.log('- NODE_ENV:', process.env.NODE_ENV);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.json({
        status: 'error',
        message: 'Environment variables not set',
        vars: {
          EMAIL_USER: !!process.env.EMAIL_USER,
          EMAIL_PASS: !!process.env.EMAIL_PASS
        }
      });
    }

    // Import nodemailer
    const nodemailer = await import('nodemailer');

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('Testing transporter connection...');

    // Test connection
    await transporter.verify();
    console.log('✅ SMTP connection successful');

    // Send test email
    const testMail = {
      from: process.env.EMAIL_USER,
      to: 'bem.filkom@unida.ac.id',
      subject: '[TEST] Email Configuration Test',
      html: `
        <h2>🧪 Email Configuration Test</h2>
        <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>To:</strong> bem.filkom@unida.ac.id</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        <hr>
        <p>This is a test email to verify SMTP configuration is working correctly.</p>
        <p><strong>If you receive this email, SMTP is configured properly! 🎉</strong></p>
      `,
    };

    const result = await transporter.sendMail(testMail);
    console.log('✅ Test email sent:', result.messageId);

    return res.json({
      status: 'success',
      message: 'Test email sent successfully!',
      messageId: result.messageId,
      timestamp: new Date().toISOString(),
      testDetails: {
        from: process.env.EMAIL_USER,
        to: 'bem.filkom@unida.ac.id',
        smtp: 'gmail'
      }
    });

  } catch (error) {
    console.error('❌ Email test failed:', {
      message: error.message,
      code: error.code,
      command: error.command
    });

    return res.status(500).json({
      status: 'error',
      message: 'Email test failed',
      error: {
        message: error.message,
        code: error.code,
        command: error.command
      },
      troubleshooting: {
        '1. Check 2FA': 'Ensure 2FA is enabled on the Google Account',
        '2. App Password': 'Generate new App Password from https://myaccount.google.com/apppasswords',
        '3. Email Service': 'Make sure the account has Gmail SMTP access',
        '4. Password Format': 'Use 16-character App Password without spaces'
      }
    });
  }
}