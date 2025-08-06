import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

const FROM = "onboarding@resend.dev" // Resend sandbox sender
const OWNER = "benevolus436@gmail.com" // your Gmail address

async function sendEmail(payload: unknown) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend API error: ${error}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, company, service, budget, message } = await req.json()

    // Send detailed contact information to your Gmail
    await sendEmail({
      from: FROM,
      to: OWNER,
      subject: `🚀 New Contact Form Submission - ${firstName} ${lastName}`,
      reply_to: email, // You can reply directly from Gmail
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
            <p style="color: #e0e7ff; margin: 5px 0;">Benevolus Website</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Contact Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151; width: 30%;">Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">
                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${
                  phone
                    ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">
                    <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  company
                    ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Company:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">${company}</td>
                </tr>
                `
                    : ""
                }
                ${
                  service
                    ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Service:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">${service}</td>
                </tr>
                `
                    : ""
                }
                ${
                  budget
                    ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Budget:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">${budget}</td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
              <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>Action Required:</strong> Reply to this email to respond to the client inquiry.
              </p>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              This email was sent from your Benevolus website contact form.
            </p>
            <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 12px;">
              Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We will get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "There was an error sending your message. Please try again or contact us directly.",
      },
      { status: 500 },
    )
  }
}
