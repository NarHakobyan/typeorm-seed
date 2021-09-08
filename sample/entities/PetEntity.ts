import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from './UserEntity'

@Entity()
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  age: number

  @ManyToOne((type) => UserEntity, (user) => user.pets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
