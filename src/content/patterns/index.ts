import { createTopicCollection } from '@/lib/content';
import { singleton } from './singleton';
import { factory } from './factory';
import { builder } from './builder';
import { observer } from './observer';
import { strategy } from './strategy';

const designPatterns = [singleton, factory, builder, observer, strategy];

export const { getAll: getDesignPatterns, getBySlug: getDesignPattern, getSlugs: getDesignPatternSlugs } =
  createTopicCollection(designPatterns);
