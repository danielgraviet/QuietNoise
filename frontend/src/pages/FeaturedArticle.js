'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../css/page.module.css';

const FeaturedArticle = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedArticle = async () => {
            try {
                // You can modify this to fetch a specific article by ID
                // or use a query parameter to get the featured article
                const response = await fetch('http://localhost:5001/api/posts/featured');
                if (!response.ok) {
                    throw new Error('Failed to fetch featured article');
                }
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching featured article:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedArticle();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading featured article</div>;
    if (!article) return <div>No featured article found</div>;

    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <span className={styles.tag}>{article.category}</span>
                <h1>{article.title}</h1>
                <p>{article.content.substring(0, 150)}...</p>
                <div className={styles.postMeta}>
                    <Image
                        src="/icons/user.png"
                        alt={article.author}
                        width={32}
                        height={32}
                        className={styles.authorImage}
                    />
                    <span className={styles.author}>{article.author}</span>
                    <span className={styles.date}>
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </span>
                    <span className={styles.readTime}>{article.readTime}</span>
                </div>
            </div>
        </section>
    );
};

export default FeaturedArticle;
