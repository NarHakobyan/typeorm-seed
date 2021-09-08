import 'reflect-metadata';

import { Connection, ObjectType } from 'typeorm';

import {
  configureConnection,
  createConnection,
  getConnectionOptions,
  IConfigureOption,
} from './connection';
import { EntityFactory } from './entity-factory';
import {
  Factory,
  FactoryFunction,
  IEntityFactoryDefinition,
  ISeeder,
  SeederConstructor,
} from './types';
import { getNameOfEntity } from './utils/factory.util';
import { importFiles, loadFiles } from './utils/file.util';

// -------------------------------------------------------------------------
// Handy Exports
// -------------------------------------------------------------------------

export * from './importer';
export * from './connection';
export { Factory, ISeeder } from './types';
export { times } from './helpers';

// -------------------------------------------------------------------------
// Types & Variables
// -------------------------------------------------------------------------
(global as any).seeder = {
  entityFactories: new Map<string, IEntityFactoryDefinition<any, any>>(),
};

// -------------------------------------------------------------------------
// Facade functions
// -------------------------------------------------------------------------

export const define = <Entity, Context>(
  entity: ObjectType<Entity>,
  factoryFn: FactoryFunction<Entity, Context>,
) => {
  (global as any).seeder.entityFactories.set(getNameOfEntity(entity), {
    entity,
    factory: factoryFn,
  });
};

export const factory: Factory = <Entity, Context>(
  entity: ObjectType<Entity>,
) => (context?: Context) => {
  const name = getNameOfEntity(entity);
  const entityFactoryObject = (global as any).seeder.entityFactories.get(name);
  return new EntityFactory<Entity, Context>(
    name,
    entity,
    entityFactoryObject.factory,
    context,
  );
};

export const runSeeder = async (clazz: SeederConstructor): Promise<any> => {
  const seeder: ISeeder = new clazz();
  const connection = await createConnection();
  return seeder.run(factory, connection);
};

// -------------------------------------------------------------------------
// Facade functions for testing
// -------------------------------------------------------------------------
export const useRefreshDatabase = async (
  options: IConfigureOption = {},
): Promise<Connection> => {
  configureConnection(options);
  const option = await getConnectionOptions();
  const connection = await createConnection(option);
  if (connection && connection.isConnected) {
    await connection.dropDatabase();
    await connection.synchronize();
  }
  return connection;
};

export const tearDownDatabase = async (): Promise<void> => {
  const connection = await createConnection();
  return connection && connection.isConnected ? connection.close() : undefined;
};

export const useSeeding = async (
  options: IConfigureOption = {},
): Promise<void> => {
  configureConnection(options);
  const option = await getConnectionOptions();
  const factoryFiles = loadFiles(option.factories);
  await importFiles(factoryFiles);
};
