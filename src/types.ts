import { Connection, ObjectType } from 'typeorm';

import { EntityFactory } from './entity-factory';

/**
 * FactoryFunction is the fucntion, which generate a new filled entity
 */
export type FactoryFunction<Entity, Context> = (context?: Context) => Entity;

/**
 * EntityProperty defines an object whose keys and values must be properties of the given Entity.
 */
export type EntityProperty<Entity> = {
  [Property in keyof Entity]?: Entity[Property];
};

/**
 * Factory gets the EntityFactory to the given Entity and pass the context along
 */
export type Factory = <Entity, Context>(
  entity: ObjectType<Entity>,
) => (context?: Context) => EntityFactory<Entity, Context>;

/**
 * Seed are the class to create some data. Those seed are run by the cli.
 */
export interface ISeeder {
  run(factory: Factory, connection: Connection): Promise<void>;
}

/**
 * Constructor of the seed class
 */
export type SeederConstructor = new () => ISeeder;

/**
 * Value of our EntityFactory state
 */
export interface IEntityFactoryDefinition<Entity, Context> {
  entity: ObjectType<Entity>;
  factory: FactoryFunction<Entity, Context>;
}
