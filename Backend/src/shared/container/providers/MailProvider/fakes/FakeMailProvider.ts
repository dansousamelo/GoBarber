import IMailProvider from '../models/IMailProvider';
import ISendEMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendEMailDTO[] = [];

  public async sendMail(message: ISendEMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
