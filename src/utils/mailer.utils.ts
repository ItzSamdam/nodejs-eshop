import nodemailer, { Transporter } from "nodemailer";
import { config } from "../../src copy/config/config.config";
import { logger } from "./logger.utils";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    // Create a Nodemailer transporter when the service is instantiated
    this.transporter = nodemailer.createTransport({
      host: config.email.smtp.host, // Replace with your SMTP server host
      port: parseInt(config.email.smtp.port), // Replace with your SMTP server port (e.g., 587 for TLS, 465 for SSL)
      secure: false, // Set to true if using SSL
      auth: {
        user: config.email.smtp.auth.username,
        pass: config.email.smtp.auth.password,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // Send mail with the defined transport object
      await this.transporter.sendMail({
        from: `${config.email.emailName} < ${config.email.from}>`,
        to: options.to,
        subject: options.subject,
        text: options.text || "",
        html: options.html || "",
      });

      logger.info("Email sent successfully");
      return true;
    } catch (error) {
      logger.error("Email failed to send", error);
      return false;
    }
  }
}

export default EmailService;
