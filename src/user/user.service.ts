import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import {
  CreateUserDTO,
  UpdateUserDTO,
  UserDTO,
  UserSafeWithNoPasswordDTO,
} from './dto';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateUserDTO): Promise<UserDTO> {
    const userExists = await this.findBySurname(data.username);

    if (userExists) {
      throw new BadRequestException(
        `User with username ${data.username} already exists`,
      );
    }

    if (data.password === '') throw new BadRequestException('Invalid password');

    return this.prisma.user.create({ data });
  }
  async findByIdSafe(id: number): Promise<UserSafeWithNoPasswordDTO | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new BadRequestException(`User with ID ${id} does not exist`);

    const { refreshToken, username, password, ...userSafe } = user;

    return userSafe;
  }

  async doesUserExist(id: number): Promise<boolean | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new BadRequestException(`User with ID ${id} does not exist`);

    return true;
  }

  findBySurname(username: string): Promise<UserDTO | null> {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async update(id: number, data: UpdateUserDTO) {
    await this.doesUserExist(id);

    const { id: _id, username, password, ...filteredData } = data as UserDTO;

    if (password === '') throw new BadRequestException('Invalid password');

    if (password) {
      const hash = await this.authService.hashData(password);

      return this.prisma.user.update({
        data: { ...filteredData, password: hash },
        where: { id },
      });
    }

    return this.prisma.user.update({ data: filteredData, where: { id } });
  }

  async remove(id: number): Promise<UserDTO> {
    await this.prisma.todos.deleteMany({ where: { userId: id } });

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
