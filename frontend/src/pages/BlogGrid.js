'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../css/page.module.css';

const BlogGrid = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(['All']);
    const [filter, setFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/posts');

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data);
                const uniqueCategories = ['All', ...new Set(data.map(post => post.category))];
                setCategory(uniqueCategories);
            } catch (error) {
                setError(error);
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading posts: {error}</div>;

    const filteredPosts = posts.filter(post =>
        filter === 'All' ? true : post.category === filter
    );

    const handleSortChange = (e) => {
        const newSortOrder = e.target.value;
        console.log(newSortOrder);
        setSortOrder(newSortOrder);
    };

    return (
        <div>
            <section className={styles.blogSection}>
                <h2>Blog</h2>
                <p className={styles.blogDescription}>
                    Unveil the latest legal tech tools, IP trends, and bite-sized innovation stories.
                </p>

                <div className={styles.categories}>
                    {category.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`${styles.filterButton} ${filter === category ? styles.active : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                    <div className={styles.sortBy}>
                        <span>Sort by:</span>
                        <select value={sortOrder}
                                onChange={handleSortChange}
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className={styles.blogGrid}>
                {filteredPosts.map((post) => (
                    <Link
                        href={`/blog/${post._id}`} // This matches the [id] folder structure
                        key={post._id}
                        className={styles.blogGridCard}
                    >
                        <div className={styles.cardImage}>
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                width={300}
                                height={200}
                                className={styles.cardImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3>{post.title}</h3>
                            <p>{post.content.substring(0, 150)}...</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogGrid;