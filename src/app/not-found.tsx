import type { Metadata } from 'next';
import { Paragraph } from '@/components/content';

export const metadata: Metadata = { title: '404 / NOT FOUND' };

export default function NotFoundPage() {
  return (
    <Paragraph>
      Nice Try 1337 H4xx0R! The page you’re trying to get to doesn’t exist. Try
      a different one or just click on links on the left.
    </Paragraph>
  );
}
