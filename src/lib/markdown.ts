import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export function parseMarkdown(content: string): string {
  if (!content) return '';

  return marked.parse(content) as string;
}

export function parseQuestions(
  markdownContent: string
): Array<{ question: string; answer: string }> {
  const questions: Array<{ question: string; answer: string }> = [];

  const sections = markdownContent.split('## ').slice(1);

  for (const section of sections) {
    const lines = section.split('\n');
    const question = lines[0].trim();
    const answer = lines.slice(1).join('\n').trim();

    if (question && answer) {
      questions.push({
        question,
        answer: parseMarkdown(answer),
      });
    }
  }

  return questions;
}
