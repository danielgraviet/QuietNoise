import { notFound } from 'next/navigation';
import { postContent } from '../../../content/blog/firstPost';
import BlogPostContent from '../../../components/BlogPostContent';

async function getBlogPost(id: string) {
  try {
    const res = await fetch(`http://localhost:5001/api/posts/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
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