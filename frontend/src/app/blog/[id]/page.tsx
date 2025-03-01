import { notFound } from 'next/navigation';
import { postContent } from '../../../content/blog/5-books-that-changed-my-life';
import BlogPostContent from '../../../components/BlogPostContent';
import type { Metadata } from 'next'

async function getBlogPost(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const post = await getBlogPost(resolvedParams.id)

  return {
    title: post.title,
    description: post.content.substring(0, 150), // First 160 characters as description
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
        }
      ],
    },
  }
}

export default async function BlogPost({ params }: { params: { id: string } }) {

  // this makes sure that the promise is resolved before the function is called
  const resolvedParams = await Promise.resolve(params);

  // this is a function that returns a promise
  const post = await getBlogPost(resolvedParams.id);

  if (!post) {
    console.error('Blog post not found');
    notFound();
  }

  return <BlogPostContent post={post} postContent={postContent} />;
}