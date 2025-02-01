'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../css/page.module.css';

const BlogGrid = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/posts');

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data);
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
    if (error) return <div>Error loading posts</div>;

    return (
        <div>
            <section className={styles.blogSection}>
                <h2>Blog</h2>
                <p className={styles.blogDescription}>
                    Here, we share travel tips, destination guides, and stories that inspire your next adventure.
                </p>

                <div className={styles.categories}>
                    <button className={styles.active}>All</button>
                    <button>Destination</button>
                    <button>Culinary</button>
                    <button>Lifestyle</button>
                    <button>Tips & Hacks</button>

                    <div className={styles.sortBy}>
                        <span>Sort by:</span>
                        <select defaultValue="newest">
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className={styles.blogGrid}>
                {posts.map((post) => (
                    <div key={post._id} className={styles.blogGridCard}>
                        <div className={styles.cardImage}>
                            <Image 
                                src={post.imageUrl}
                                alt={post.title}
                                width={300} 
                                height={200}
                                objectFit='cover'
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3>{post.title}</h3>
                            <p>{post.content.substring(0, 150)}...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogGrid;