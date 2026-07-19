import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 1. Insert into contact_messages
    const result = await query(
      `INSERT INTO contact_messages (name, email, message) 
       VALUES ($1, $2, $3) 
       RETURNING id, created_at`,
      [name, email, message]
    );

    const savedMessage = result.rows[0];

    // 2. Fetch connection metadata
    const headers = request.headers;
    let ipAddress = "Unknown";
    const xForwardedFor = headers.get("x-forwarded-for");
    if (xForwardedFor) {
      ipAddress = xForwardedFor.split(",")[0].trim();
    } else {
      ipAddress = headers.get("x-real-ip") || headers.get("cf-connecting-ip") || "127.0.0.1";
    }
    const userAgent = headers.get("user-agent") || "Unknown Browser";
    const referrer = headers.get("referer") || "Direct / Unknown";

    // 3. Send Email Notification (if SMTP is configured)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.NOTIFICATION_RECEIVER || smtpUser || "subham15331@gmail.com";

    let emailSent = false;
    let emailStatus = "Not Configured";

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const timestamp = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "long",
        });

        // Elegant contact form HTML layout with orange/amber accents
        const mailOptions = {
          from: `"Portfolio Alerts" <${smtpUser}>`,
          to: receiver,
          subject: `📬 New Message from ${name} on Portfolio`,
          text: `You have received a new contact message from ${name} (${email}):\n\n"${message}"\n\nMetadata:\nTime: ${timestamp}\nIP: ${ipAddress}\nBrowser: ${userAgent}\nReferrer: ${referrer}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>New Contact Message</title>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    background-color: #0b0b0c;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    color: #e4e4e7;
                  }
                  .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: #121214;
                    border: 1px solid #27272a;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                  }
                  .header {
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    padding: 30px 20px;
                    text-align: center;
                  }
                  .header h1 {
                    margin: 0;
                    color: #09090b;
                    font-size: 24px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                  }
                  .content {
                    padding: 30px 24px;
                  }
                  .intro {
                    font-size: 15px;
                    color: #a1a1aa;
                    margin-bottom: 24px;
                  }
                  .message-box {
                    background-color: #18181b;
                    border-left: 4px solid #f59e0b;
                    border-radius: 4px 12px 12px 4px;
                    padding: 20px;
                    margin-bottom: 24px;
                    color: #f4f4f5;
                    font-size: 15px;
                    line-height: 1.6;
                    white-space: pre-wrap;
                  }
                  .sender-info {
                    background-color: #18181b;
                    border: 1px solid #27272a;
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 20px;
                  }
                  .info-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    border-bottom: 1px solid #27272a;
                  }
                  .info-row:last-child {
                    border-bottom: none;
                  }
                  .info-label {
                    font-weight: 600;
                    color: #d97706;
                    font-size: 13px;
                    text-transform: uppercase;
                  }
                  .info-value {
                    color: #f4f4f5;
                    font-size: 13.5px;
                    text-align: right;
                  }
                  .info-value.email {
                    color: #f59e0b;
                  }
                  .footer {
                    background-color: #09090b;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #71717a;
                    border-top: 1px solid #18181b;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>New Message Received</h1>
                  </div>
                  <div class="content">
                    <p class="intro">
                      You have received a new contact message through your portfolio website contact form.
                    </p>
                    
                    <div style="font-weight: 600; color: #a1a1aa; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">
                      Message Content:
                    </div>
                    <div class="message-box">"${message}"</div>

                    <div style="font-weight: 600; color: #a1a1aa; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">
                      Sender Details & Metadata:
                    </div>
                    <div class="sender-info">
                      <div class="info-row">
                        <span class="info-label">Name</span>
                        <span class="info-value" style="font-weight: bold;">${name}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Email</span>
                        <span class="info-value email">${email}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Timestamp</span>
                        <span class="info-value">${timestamp}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">IP Address</span>
                        <span class="info-value" style="font-family: monospace;">${ipAddress}</span>
                      </div>
                      <div class="info-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                        <span class="info-label">User Agent</span>
                        <span class="info-value" style="text-align: left; font-size: 11.5px; font-family: monospace; max-width: 100%; margin-top: 4px;">${userAgent}</span>
                      </div>
                    </div>
                  </div>
                  <div class="footer">
                    <p>Sent from your personal portfolio contact form service.</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        emailStatus = "Success";
        console.log(`[Contact API] Message notification email successfully sent to ${receiver}`);
      } catch (mailError) {
        emailStatus = "Failed";
        console.error("[Contact API] Failed to send email via SMTP:", mailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      data: {
        ...savedMessage,
        emailSent,
        emailStatus,
      },
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
