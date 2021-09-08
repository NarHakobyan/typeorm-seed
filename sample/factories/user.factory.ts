import * as faker from 'faker';
import { define } from '../../src/typeorm-seeds'
import { UserEntity } from '../entities/UserEntity'

define(UserEntity, () => {
  const gender = faker.random.number(1)
  const firstName = faker.name.firstName(gender)
  const lastName = faker.name.lastName(gender)
  const email = faker.internet.email(firstName, lastName)

  const user = new UserEntity()
  user.firstName = firstName
  user.lastName = lastName
  user.middleName = null
  user.email = email
  user.password = faker.random.word()
  return user
})
