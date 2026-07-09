import { createTopicCollection } from '@/lib/content';
import { cleanArchitecture } from './clean-architecture';
import { mvvm } from './mvvm';
import { dependencyInjection } from './dependency-injection';
import { modularization } from './modularization';
import { offlineFirst } from './offline-first';
import { stateManagement } from './state-management';
import { navigation } from './navigation';

const architectureTopics = [
  cleanArchitecture,
  mvvm,
  dependencyInjection,
  modularization,
  offlineFirst,
  stateManagement,
  navigation,
];

export const { getAll: getArchitectureTopics, getBySlug: getArchitectureTopic, getSlugs: getArchitectureSlugs } =
  createTopicCollection(architectureTopics);
