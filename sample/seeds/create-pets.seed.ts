import { Connection } from 'typeorm'
import { ISeeder, Factory } from '../../src/types'
import { PetEntity } from '../entities/PetEntity'

export default class CreatePets implements ISeeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(PetEntity)().create()
  }
}
