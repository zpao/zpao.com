import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link, PageHeader, Paragraph } from '@/components/content';
import { Markdown } from '@/components/markdown';
import { getPosts, renderPost } from '@/lib/posts';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.name }));
}

const getPost = cache(async (slug: string) => {
  const post = (await getPosts()).find((post) => post.name === slug);
  if (!post) notFound();
  return renderPost(post);
});

type PostPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return {
    title: post.title,
    openGraph: {
      title: post.title,
      type: 'article',
      description: post.excerpt,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.excerpt,
      site: '@zpao',
      creator: '@zpao',
    },
  };
}

export default async function Post({ params }: PostPageProps) {
  const post = await getPost((await params).slug);
  return (
    <article>
      <PageHeader
        title={post.title}
        date={{ dateTime: post.date, label: post.displayDate }}
        description={post.blurb}
      />
      <Markdown html={post.html} />
      {post.type === 'link' && post.source_url && (
        <Paragraph>
          <Link href={post.source_url}>view original &rarr;</Link>
        </Paragraph>
      )}
    </article>
  );
}
