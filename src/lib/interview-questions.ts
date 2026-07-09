import { getArchitectureTopics } from '@/content/architecture';
import { getSolidPrinciples } from '@/content/solid';
import { getDesignPatterns } from '@/content/patterns';
import type { InterviewQuestion } from '@/types/content';

export type AggregatedQuestion = InterviewQuestion & {
  topicTitle: string;
  topicHref: string;
};

const sources: Array<{ basePath: string; getTopics: () => { slug: string; title: string; interviewQuestions?: InterviewQuestion[] }[] }> = [
  { basePath: '/architecture', getTopics: getArchitectureTopics },
  { basePath: '/solid', getTopics: getSolidPrinciples },
  { basePath: '/patterns', getTopics: getDesignPatterns },
];

export function getAllInterviewQuestions(): AggregatedQuestion[] {
  return sources.flatMap(({ basePath, getTopics }) =>
    getTopics().flatMap((topic) =>
      (topic.interviewQuestions ?? []).map((q) => ({
        ...q,
        topicTitle: topic.title,
        topicHref: `${basePath}/${topic.slug}`,
      })),
    ),
  );
}

export function getInterviewQuestionsByLevel() {
  const all = getAllInterviewQuestions();
  const levels: Array<NonNullable<InterviewQuestion['level']>> = ['senior', 'lead', 'architect'];
  return levels.map((level) => ({
    level,
    questions: all.filter((q) => q.level === level),
  }));
}
