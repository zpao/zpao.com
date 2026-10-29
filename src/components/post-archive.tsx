import * as stylex from '@stylexjs/stylex';
import { Link } from '@/components/content';
import { Markdown } from '@/components/markdown';
import type { Post } from '@/lib/posts';
import { layout, spacing } from '../styles/tokens.stylex';

export function PostArchive({
  posts,
}: {
  posts: Array<Pick<Post, 'displayDate' | 'slug' | 'titleHtml'>>;
}) {
  return (
    <table>
      <tbody>
        {posts.map((post) => (
          <tr key={post.slug}>
            <td {...stylex.props(styles.date)}>
              <time dateTime={post.displayDate}>{post.displayDate}</time>
            </td>
            <td>
              <Link href={post.slug}>
                <Markdown html={post.titleHtml} links={false} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = stylex.create({
  date: {
    width: layout.archiveDateWidth,
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    paddingRight: spacing.medium,
  },
});
