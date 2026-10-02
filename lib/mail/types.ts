export interface OutgoingMail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

export interface MailProvider {
  readonly name: string;
  send(mail: OutgoingMail): Promise<void>;
}
