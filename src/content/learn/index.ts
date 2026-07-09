import { createTopicCollection } from '@/lib/content';
import { coroutines } from './coroutines';
import { flow } from './flow';
import { composeFundamentals } from './compose-fundamentals';
import { room } from './room';
import { workmanager } from './workmanager';
import { paging } from './paging';
import { testing } from './testing';
import { animations } from './animations';

const learningTopics = [coroutines, flow, composeFundamentals, room, workmanager, paging, testing, animations];

export const { getAll: getLearningTopics, getBySlug: getLearningTopic, getSlugs: getLearningSlugs } =
  createTopicCollection(learningTopics);
