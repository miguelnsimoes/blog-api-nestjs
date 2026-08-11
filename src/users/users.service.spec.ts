import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from './entities/user.entity/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: { findOne: jest.Mock };

  beforeEach(async () => {
    usersRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: usersRepository.findOne,
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by email', async () => {
    const user = { id: 1, email: 'test@example.com' } as User;
    usersRepository.findOne.mockResolvedValue(user);

    await expect(service.findByEmail('test@example.com')).resolves.toEqual(user);
    expect(usersRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
  });
});
