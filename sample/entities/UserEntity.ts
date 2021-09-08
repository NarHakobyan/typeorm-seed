import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { PetEntity } from './PetEntity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  middleName: string

  @Column()
  email: string

  @OneToMany(() => PetEntity, (petEntity) => petEntity.user)
  pets: PetEntity[]

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }
}
