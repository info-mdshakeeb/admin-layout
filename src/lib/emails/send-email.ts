
import { env } from "@/env"
import transporter from "../nodemailer"

export function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text: string
}) {
  return transporter.sendMail({
    from: env.NODEMAILER_USER,
    to: to,
    subject: subject,
    html: html,
    text: text,
  })
}
