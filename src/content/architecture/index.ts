import { createTopicCollection } from '@/lib/content';
import { cleanArchitecture } from './clean-architecture';
import { mvvm } from './mvvm';
import { dependencyInjection } from './dependency-injection';

const architectureTopics = [cleanArchitecture, mvvm, dependencyInjection];

export const { getAll: getArchitectureTopics, getBySlug: getArchitectureTopic, getSlugs: getArchitectureSlugs } =
  createTopicCollection(architectureTopics);
