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
    const formData = await req.formData()

    // Extract form fields
    const applicationData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      position: formData.get("position") as string,
      experience: formData.get("experience") as string,
      portfolio: formData.get("portfolio") as string,
      coverLetter: formData.get("coverLetter") as string,
      resume: formData.get("resume") as File,
    }

    // Prepare resume attachment
    const attachments = []
    if (applicationData.resume) {
      const resumeBuffer = Buffer.from(await applicationData.resume.arrayBuffer())
      attachments.push({
        filename: applicationData.resume.name,
        content: resumeBuffer.toString("base64"),
      })
    }

    // Send job application details to your Gmail
    await sendEmail({
      from: FROM,
      to: OWNER,
      subject: `💼 New Job Application - ${applicationData.position} - ${applicationData.firstName} ${applicationData.lastName}`,
      reply_to: applicationData.email, // You can reply directly from Gmail
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Job Application Received</h1>
            <p style="color: #d1fae5; margin: 5px 0;">Position: ${applicationData.position}</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Candidate Information</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151; width: 30%;">Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">${applicationData.firstName} ${applicationData.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">
                    <a href="mailto:${applicationData.email}" style="color: #3b82f6; text-decoration: none;">${applicationData.email}</a>
                  </td>
                </tr>
                ${
                  applicationData.phone
                    ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">
                    <a href="tel:${applicationData.phone}" style="color: #3b82f6; text-decoration: none;">${applicationData.phone}</a>
                  </td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Position:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">
                    <span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${applicationData.position}</span>
                  </td>
                </tr>
                ${
                  applicationData.experience
                    ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Experience:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">${applicationData.experience}</td>
                </tr>
                `
                    : ""
                }
                ${
                  applicationData.portfolio
                    ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Portfolio:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1f2937;">
                    <a href="${applicationData.portfolio}" style="color: #3b82f6; text-decoration: none;" target="_blank">${applicationData.portfolio}</a>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="color: #1e293b; margin-top: 0;">Cover Letter:</h3>
              <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${applicationData.coverLetter}</p>
            </div>

            ${
              applicationData.resume
                ? `
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #166534;">
                <strong>📎 Resume Attached:</strong> ${applicationData.resume.name} (${Math.round(applicationData.resume.size / 1024)} KB)
              </p>
            </div>
            `
                : ""
            }

            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>Action Required:</strong> Reply to this email to contact the candidate directly.
              </p>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              This application was submitted through your Benevolus careers page.
            </p>
            <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 12px;">
              Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </p>
          </div>
        </div>
      `,
      attachments: attachments,
    })

    return NextResponse.json({
      success: true,
      message:
        "Your application has been submitted successfully! We will review it and get back to you within 5-7 business days.",
    })
  } catch (error) {
    console.error("Career application error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "There was an error submitting your application. Please try again or contact us directly.",
      },
      { status: 500 },
    )
  }
}
