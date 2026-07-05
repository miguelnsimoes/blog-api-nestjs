import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity/user.entity';
import { Post } from '../posts/entities/post.entity';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const author = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!author) {
      throw new NotFoundException('Autor não encontrado.');
    }

    const post = await this.postsRepository.findOne({
      where: {
        id: createCommentDto.postId,
      },
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado.');
    }

    const comment = this.commentsRepository.create({
      content: createCommentDto.content,
      author,
      post,
    });

    return await this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepository.find({
      relations: {
        author: true,
        post: true,
      },
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: {
        author: true,
        post: true,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOne(id);

    Object.assign(comment, updateCommentDto);

    return await this.commentsRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);

    await this.commentsRepository.remove(comment);
  }
}