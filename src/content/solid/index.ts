import { createTopicCollection } from '@/lib/content';
import { srp } from './srp';
import { ocp } from './ocp';
import { lsp } from './lsp';
import { isp } from './isp';
import { dip } from './dip';

const solidPrinciples = [srp, ocp, lsp, isp, dip];

export const { getAll: getSolidPrinciples, getBySlug: getSolidPrinciple, getSlugs: getSolidSlugs } =
  createTopicCollection(solidPrinciples);
