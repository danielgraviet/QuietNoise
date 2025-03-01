'use client';

import Image from 'next/image';
import styles from '../css/blogPost.module.css';
import { JSX } from 'react';

interface BlogPostProps {
  post: {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
    author: string;
    createdAt: string;
    readTime: string;
    content: string;
  };
  postContent: {
    metadata: {
      id: string;
    };
    content: JSX.Element | string;
  };
}

export default function BlogPostContent({ post, postContent }: BlogPostProps) {
  const isCustomPost = post._id === postContent.metadata.id;

  return (
    <article className={styles.blogPost}>
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            className={styles.image}
          />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.category}>{post.category}</span>
          <h1>{post.title}</h1>
          <div className={styles.metadata}>
            <div className={styles.author}>
              <Image
                src="/images/headshot.png"
                alt={post.author}
                width={40}
                height={40}
                className={styles.authorImage}
              />
              <span>{post.author}</span>
            </div>
            <span className={styles.date}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className={styles.readTime}>{post.readTime}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {isCustomPost ? (
          postContent.content
        ) : (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </div>
    </article>
  );
}