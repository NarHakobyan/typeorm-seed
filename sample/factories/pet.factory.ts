import * as faker from 'faker';
import { define, factory } from '../../src/typeorm-seed'
import { PetEntity } from '../entities/PetEntity'
import { UserEntity } from '../entities/UserEntity'

define(PetEntity, () => {
  const gender = faker.random.number(1)
  const name = faker.name.firstName(gender)

  const pet = new PetEntity()
  pet.name = name
  pet.age = faker.random.number()
  pet.user = factory(UserEntity)({ roles: ['admin'] }) as any
  return pet
})
