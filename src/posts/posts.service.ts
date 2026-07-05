import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { User } from '../users/entities/user.entity/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const author = await this.usersRepository.findOne({
      where: {
        id: createPostDto.authorId,
      },
    });

    if (!author) {
      throw new NotFoundException('Autor não encontrado.');
    }

    const post = this.postsRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      slug: createPostDto.slug,
      author,
    });

    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find({
      relations: {
        author: true,
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado.');
    }

    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.findOne(id);

    Object.assign(post, updatePostDto);

    return await this.postsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);

    await this.postsRepository.remove(post);
  }
}