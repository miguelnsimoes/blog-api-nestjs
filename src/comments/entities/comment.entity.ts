export class CommentEntity {}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  content!: string;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  author!: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post!: Post;

  @CreateDateColumn()
  createdAt!: Date;
}