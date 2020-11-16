import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Task } from "src/tasks/task.entity";
import { type } from "os";

/*
@Unique => untuk check adapakah value sudah ada di table
ini bawaan dari typeorm, jadi engk perlu hit query lagi (findOne) untuk cek apakah value
sudah terdaftar atau belum
*/

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password
  }
}