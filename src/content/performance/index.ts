import { createTopicCollection } from '@/lib/content';
import { anr } from './anr';
import { memoryLeaks } from './memory-leaks';
import { composeOptimization } from './compose-optimization';
import { startupTime } from './startup-time';
import { apkSize } from './apk-size';
import { benchmarking } from './benchmarking';

const performanceTopics = [anr, memoryLeaks, composeOptimization, startupTime, apkSize, benchmarking];

export const { getAll: getPerformanceTopics, getBySlug: getPerformanceTopic, getSlugs: getPerformanceSlugs } =
  createTopicCollection(performanceTopics);
