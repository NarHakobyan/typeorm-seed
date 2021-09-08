import { Connection } from 'typeorm'
import { Seeder, Factory } from '../../src/types'
import { PetEntity } from '../entities/PetEntity'

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(PetEntity)().create()
  }
}
