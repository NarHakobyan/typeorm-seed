import {
  useSeeding,
  useRefreshDatabase,
  tearDownDatabase,
  factory,
  setConnectionOptions,
} from '../../src/typeorm-seed'
import { UserEntity } from '../entities/UserEntity'
import { Connection } from 'typeorm'

describe('Sample Integration Test', () => {
  let connection: Connection
  beforeAll(async (done) => {
    setConnectionOptions({
      type: 'sqlite',
      database: ':memory:',
      entities: ['sample/entities/**/*{.ts,.js}'],
    })
    connection = await useRefreshDatabase()
    await useSeeding()
    done()
  })

  afterAll(async (done) => {
    await tearDownDatabase()
  })

  test('Should create a user with the entity factory', async (done) => {
    const createdUser = await factory(UserEntity)().create()
    const user = await connection.getRepository(UserEntity).findOne(createdUser.id)
    expect(createdUser.firstName).toBe(user.firstName)
    done()
  })
})
