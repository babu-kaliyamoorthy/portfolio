import { createTopicCollection } from '@/lib/content';
import { cleanArchitecture } from './clean-architecture';

const architectureTopics = [cleanArchitecture];

export const { getAll: getArchitectureTopics, getBySlug: getArchitectureTopic, getSlugs: getArchitectureSlugs } =
  createTopicCollection(architectureTopics);
