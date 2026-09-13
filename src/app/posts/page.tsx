import type { Metadata } from 'next';
import { PageHeader } from '@/components/content';
import { PostArchive } from '@/components/post-archive';
import { getPosts } from '@/lib/posts';

export const metadata: Metadata = { title: 'Archive' };

export default async function PostsIndex() {
  return (
    <article>
      <PageHeader title="Archive" />
      <PostArchive posts={await getPosts()} />
    </article>
  );
}
