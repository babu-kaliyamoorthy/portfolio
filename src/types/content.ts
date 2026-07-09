export type CodeSnippet = {
  title: string;
  language: string;
  code: string;
};

export type InterviewQuestion = {
  question: string;
  answer: string;
  level?: 'senior' | 'lead' | 'architect';
};

export type ContentSection = {
  heading: string;
  body: string[];
};

/**
 * Shared shape for every "hub" content type (Architecture, Design Patterns,
 * SOLID, Security, Performance, ...). One generic list+detail template
 * renders all of them — see src/lib/content.ts.
 */
export type Topic = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  diagram?: string;
  sections: ContentSection[];
  pros?: string[];
  cons?: string[];
  whenToUse?: string[];
  enterpriseExample?: string;
  codeSnippets?: CodeSnippet[];
  interviewQuestions?: InterviewQuestion[];
  tech?: string[];
};

export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};
