import { ISeeder, Factory } from '../../src/types'
import { UserEntity } from '../entities/UserEntity'

export default class CreateUsers implements ISeeder {
  public async run(factory: Factory): Promise<void> {
    await factory(UserEntity)({ roles: [] }).createMany(10)
  }
}
