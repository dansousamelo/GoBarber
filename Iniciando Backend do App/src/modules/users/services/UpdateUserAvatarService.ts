import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users';

// Estamos pegando o caminho da imagem
interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
  /* Passamos esse construtor pois o service não precisa ter noção se estamos utilizando
  typeorm */
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      // Join une dois caminhos
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Devemos checar se esse arquivo existe e excluí-lo
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
