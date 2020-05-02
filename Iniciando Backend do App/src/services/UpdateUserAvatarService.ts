import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/Users';

// Estamos pegando o caminho da imagem
interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

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
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
