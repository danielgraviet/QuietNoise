'use client'; // Add this at the top to mark as Client Component

import React from 'react';
import Image from 'next/image';
import styles from '@/css/BlogPost.module.css';
import mountain from '../BlogImages/mountain.jpg';
import render from '../BlogImages/render.jpg';
import { redirect } from 'next/dist/server/api-utils';

interface BlogPost {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    category: string;
    readTime?: string;
    image?: string;
}

interface BlogPostProps {
    post: BlogPost;
    featured?: boolean;
}

export default function BlogPost({ post, featured = false }: BlogPostProps) {
    if (featured) {
        return (
            <article className={styles.featuredArticle}>
                <Image
                    src={mountain}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className={styles.featuredOverlay}>
                    <div className={styles.featuredContent}>
                        <span className={styles.featuredCategory}>{post.category}</span>
                        <h2 className={styles.featuredTitle}>{post.title}</h2>
                        <p className={styles.featuredContent}>{post.content}</p>
                        <div className={styles.featuredMetadata}>
                            <Image
                                src="/images/avatar-placeholder.jpg"
                                alt={post.author}
                                width={32}
                                height={32}
                                className={styles.featuredAvatar}
                            />
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
        <article className={`${styles.article} w-full`}>
            <Image
                src={render}
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
                    <Image
                        src="/avatar-placeholder.jpg"
                        alt={post.author}
                        width={24}
                        height={24}
                        className={styles.avatar}
                    />
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </article>
    );
}
