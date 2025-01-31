'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/css/BlogPost.module.css';

interface BlogPost {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    category?: string;
    readTime?: string;
}

interface BlogPostProps {
    post: BlogPost;
    featured?: boolean;
}

export default function BlogPost({ post, featured = false }: BlogPostProps) {
    if (featured) {
        return (
            <article className={styles.featuredArticle}>
                <div className={styles.featuredOverlay}>
                    <div className={styles.featuredImageContainer}>
                        <Image
                            src="/BlogImages/taiwan.jpg"
                            alt={post.title}
                            width={1000} // not doing anything
                            height={1000}
                            className={styles.featuredImage}
                            priority
                            quality={100}
                            sizes="100vw"
                        />
                    </div>
                    <div className={styles.featuredContent}>
                        <span className={styles.featuredCategory}>{post.category}</span>
                        <h2 className={styles.featuredTitle}>{post.title}</h2>
                        <p>{post.content}</p>
                        <div className={styles.featuredMetadata}>
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.readTime || '10 min read'}</span>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className={styles.article}>
            <Image
                src="/BlogImages/mountain.jpg"
                alt={post.title}
                width={400}
                height={250}
                className={styles.imageContainer}
            />
            <div className="p-6">
                <span className={styles.category}>{post.category}</span>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.content}>{post.content}</p>
                <div className={styles.metadata}>
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </article>
    );
} 