import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  let ipAddress = "Unknown";
  let userAgent = "Unknown";
  let referrer = "Unknown";

  try {
    const { type, label } = await request.json();

    if (!type || !label) {
      return NextResponse.json(
        { error: "Click type and label are required." },
        { status: 400 }
      );
    }

    // 1. Gather client information from headers
    const headers = request.headers;
    const xForwardedFor = headers.get("x-forwarded-for");
    if (xForwardedFor) {
      ipAddress = xForwardedFor.split(",")[0].trim();
    } else {
      ipAddress = headers.get("x-real-ip") || headers.get("cf-connecting-ip") || "127.0.0.1";
    }

    userAgent = headers.get("user-agent") || "Unknown Browser";
    referrer = headers.get("referer") || "Direct / Unknown";

    console.log(`[Track] Click registered: type=${type}, label=${label}, IP=${ipAddress}`);

    // 2. Save click to PostgreSQL database
    let dbLogged = false;
    try {
      await query(
        `INSERT INTO portfolio_clicks (click_type, ip_address, user_agent, referrer) 
         VALUES ($1, $2, $3, $4)`,
        [type, ipAddress, userAgent, referrer]
      );
      dbLogged = true;
    } catch (dbError) {
      console.error("[Track] Database logging failed:", dbError);
    }

    // 3. Send Email Alert for critical tracking events (e.g. resume or email link clicks)
    const criticalTypes = ["resume", "email_link"];
    let emailSent = false;
    let emailStatus = "Not Critical Event";

    if (criticalTypes.includes(type)) {
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const receiver = process.env.NOTIFICATION_RECEIVER || smtpUser || "subham15331@gmail.com";

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

          let actionDescription = "Clicked on your resume";
          let subjectText = "📄 Resume Activity Alert!";
          let bannerGradient = "linear-gradient(135deg, #f59e0b, #d97706)";
          let primaryColor = "#d97706";

          if (type === "email_link") {
            actionDescription = "Clicked your direct email contact link to ask a question";
            subjectText = "✉️ Contact Email Clicked Alert!";
            bannerGradient = "linear-gradient(135deg, #0ea5e9, #0284c7)";
            primaryColor = "#0284c7";
          }

          // Dynamic premium themed alert email
          const mailOptions = {
            from: `"Portfolio Alerts" <${smtpUser}>`,
            to: receiver,
            subject: subjectText,
            text: `${label} (${type}) clicked on your portfolio!\n\nTime: ${timestamp}\nIP: ${ipAddress}\nBrowser: ${userAgent}\nReferrer: ${referrer}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Portfolio Interaction Alert</title>
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
                      background: ${bannerGradient};
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
                      font-size: 16px;
                      line-height: 1.6;
                      color: #a1a1aa;
                      margin-bottom: 24px;
                      text-align: center;
                    }
                    .metric-card {
                      background-color: #18181b;
                      border: 1px solid #27272a;
                      border-radius: 12px;
                      padding: 20px;
                      margin-bottom: 20px;
                    }
                    .metric-row {
                      display: flex;
                      justify-content: space-between;
                      padding: 12px 0;
                      border-bottom: 1px solid #27272a;
                    }
                    .metric-row:last-child {
                      border-bottom: none;
                    }
                    .metric-label {
                      font-weight: 600;
                      color: ${primaryColor};
                      font-size: 14px;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                    }
                    .metric-value {
                      color: #f4f4f5;
                      font-size: 14px;
                      font-family: "Courier New", Courier, monospace;
                      text-align: right;
                      word-break: break-all;
                      max-width: 70%;
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
                      <h1>Interaction Alert</h1>
                    </div>
                    <div class="content">
                      <p class="intro">
                        Someone just interacted with your portfolio. They: <strong>${actionDescription}</strong>.
                      </p>
                      <div class="metric-card">
                        <div class="metric-row">
                          <span class="metric-label">Item</span>
                          <span class="metric-value" style="font-weight: bold; color: #fbbf24;">${label}</span>
                        </div>
                        <div class="metric-row">
                          <span class="metric-label">Interaction Type</span>
                          <span class="metric-value" style="font-family: monospace;">${type}</span>
                        </div>
                        <div class="metric-row">
                          <span class="metric-label">Timestamp</span>
                          <span class="metric-value">${timestamp}</span>
                        </div>
                        <div class="metric-row">
                          <span class="metric-label">IP Address</span>
                          <span class="metric-value">${ipAddress}</span>
                        </div>
                        <div class="metric-row">
                          <span class="metric-label">Referrer</span>
                          <span class="metric-value">${referrer}</span>
                        </div>
                        <div class="metric-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                          <span class="metric-label">User Agent</span>
                          <span class="metric-value" style="text-align: left; max-width: 100%; font-size: 12px; margin-top: 4px;">${userAgent}</span>
                        </div>
                      </div>
                    </div>
                    <div class="footer">
                      <p>Sent from your personal portfolio tracking service.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          };

          await transporter.sendMail(mailOptions);
          emailSent = true;
          emailStatus = "Success";
          console.log(`[Track API] Notification email successfully sent to ${receiver}`);
        } catch (mailError) {
          emailStatus = "Failed";
          console.error("[Track API] Failed to send email via SMTP:", mailError);
        }
      } else {
        emailStatus = "SMTP Not Configured";
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ipAddress,
        dbLogged,
        emailSent,
        emailStatus,
      },
    });
  } catch (error) {
    console.error("[Track API] Critical tracking error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
