import { Resend } from "resend";
import { formatDate, formatNGN } from "./utils";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

const FROM = "GrandVenice Hotel <reservations@grandvenicenigeria.com>";
const HOTEL_EMAIL = "reservation@grandvenicenigeria.com";

interface BookingEmailParams {
  guestName: string;
  guestEmail: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmountNGN: number;
  reference: string;
}

export async function sendBookingConfirmation(booking: BookingEmailParams) {
  const checkInDate = formatDate(booking.checkIn);
  const checkOutDate = formatDate(booking.checkOut);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmation — GrandVenice Hotel</title>
</head>
<body style="margin:0;padding:0;background:#F9F9F7;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F9F7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:#1B4332;padding:40px;text-align:center;">
          <h1 style="color:#D4AF37;font-family:Georgia,serif;font-size:28px;margin:0;letter-spacing:2px;">GRANDVENICE</h1>
          <p style="color:#74C69D;margin:8px 0 0;font-size:14px;letter-spacing:1px;">HOTEL & SUITES · PORT HARCOURT</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:48px 40px;">
          <h2 style="color:#1B4332;font-size:22px;margin:0 0 8px;">Booking Confirmed!</h2>
          <p style="color:#666;margin:0 0 32px;font-size:15px;">Dear ${booking.guestName}, your reservation has been confirmed.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F9F7;border-radius:8px;padding:24px;margin-bottom:32px;">
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;">
              <span style="color:#999;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Booking Reference</span><br/>
              <strong style="color:#1B4332;font-size:18px;">${booking.reference}</strong>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
              <span style="color:#999;font-size:13px;">Room</span><br/>
              <strong style="color:#1A1A1A;">${booking.roomName}</strong>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
              <span style="color:#999;font-size:13px;">Check-in</span><br/>
              <strong style="color:#1A1A1A;">${checkInDate}</strong>
              <span style="color:#666;font-size:13px;"> (from 14:00)</span>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
              <span style="color:#999;font-size:13px;">Check-out</span><br/>
              <strong style="color:#1A1A1A;">${checkOutDate}</strong>
              <span style="color:#666;font-size:13px;"> (by 12:00)</span>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
              <span style="color:#999;font-size:13px;">Duration</span><br/>
              <strong style="color:#1A1A1A;">${booking.nights} night${booking.nights > 1 ? "s" : ""} · ${booking.guests} guest${booking.guests > 1 ? "s" : ""}</strong>
            </td></tr>
            <tr><td style="padding:12px 0;">
              <span style="color:#999;font-size:13px;">Total Paid</span><br/>
              <strong style="color:#1B4332;font-size:20px;">${formatNGN(booking.totalAmountNGN)}</strong>
            </td></tr>
          </table>

          <div style="background:#1B4332;border-radius:8px;padding:24px;color:#fff;margin-bottom:32px;">
            <h3 style="margin:0 0 12px;color:#D4AF37;font-size:16px;">Hotel Address</h3>
            <p style="margin:0;line-height:1.6;font-size:14px;color:#D8F3DC;">
              Plot 19, Igwe Family Layout Rumuogba<br/>
              Off Ecobank, by Artillery<br/>
              Port Harcourt, Rivers State, Nigeria<br/><br/>
              <strong>Phone:</strong> +234-703-935-0238<br/>
              <strong>Email:</strong> reservation@grandvenicenigeria.com
            </p>
          </div>

          <p style="color:#666;font-size:14px;line-height:1.7;margin:0 0 24px;">
            We look forward to welcoming you. Please present this confirmation email at check-in.
            If you have any questions, don't hesitate to contact us.
          </p>
          <a href="https://grandvenicenigeria.com" style="display:inline-block;background:#D4AF37;color:#1B4332;padding:14px 32px;border-radius:4px;text-decoration:none;font-weight:600;font-size:14px;letter-spacing:1px;">VISIT WEBSITE</a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#1A1A1A;padding:24px 40px;text-align:center;">
          <p style="color:#666;font-size:12px;margin:0;">© ${new Date().getFullYear()} GrandVenice Hotel & Suites Ltd. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return getResend().emails.send({
    from: FROM,
    to: booking.guestEmail,
    subject: `Booking Confirmed — ${booking.roomName} | GrandVenice Hotel`,
    html,
  });
}

export async function sendBookingNotificationToHotel(
  booking: BookingEmailParams
) {
  const html = `
<h2>New Booking — ${booking.reference}</h2>
<p><strong>Guest:</strong> ${booking.guestName} (${booking.guestEmail})</p>
<p><strong>Room:</strong> ${booking.roomName}</p>
<p><strong>Check-in:</strong> ${booking.checkIn}</p>
<p><strong>Check-out:</strong> ${booking.checkOut}</p>
<p><strong>Nights:</strong> ${booking.nights}</p>
<p><strong>Guests:</strong> ${booking.guests}</p>
<p><strong>Amount:</strong> ${formatNGN(booking.totalAmountNGN)}</p>
<p><strong>Reference:</strong> ${booking.reference}</p>
  `;

  return getResend().emails.send({
    from: FROM,
    to: HOTEL_EMAIL,
    subject: `[NEW BOOKING] ${booking.guestName} — ${booking.roomName} — ${booking.checkIn}`,
    html,
  });
}

export async function sendContactAutoReply(params: {
  name: string;
  email: string;
  subject: string;
}) {
  return getResend().emails.send({
    from: FROM,
    to: params.email,
    subject: `We received your message — GrandVenice Hotel`,
    html: `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px;">
  <h1 style="color:#1B4332;">Thank you, ${params.name}!</h1>
  <p>We've received your message regarding "<strong>${params.subject}</strong>" and will get back to you within 24 hours.</p>
  <p>For urgent inquiries, call us directly at <strong>+234-703-935-0238</strong>.</p>
  <p style="color:#666;">Warm regards,<br/>GrandVenice Hotel & Suites Team</p>
</div>`,
  });
}

export async function sendNewsletterWelcome(email: string) {
  return getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to GrandVenice Insider",
    html: `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px;background:#1B4332;color:#fff;border-radius:12px;">
  <h1 style="color:#D4AF37;">Welcome to GrandVenice Insider</h1>
  <p>You're now part of our exclusive community. Expect special offers, early access to promotions, and luxury travel tips.</p>
  <p style="color:#74C69D;">GrandVenice Hotel & Suites — Port Harcourt</p>
</div>`,
  });
}
