import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/entities/user.entity/user.entity';
import { OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 200,
  })
  title!: string;

  @Column('text')
  content!: string;

  @Column({
    unique: true,
  })
  slug!: string;

  @ManyToOne(() => User, (user) => user.posts)
  author!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];
}