import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTempalateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
