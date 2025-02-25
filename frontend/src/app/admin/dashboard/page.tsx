'use client';

import styles from '../../../css/adminDashboard.module.css';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
    const router = useRouter();

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <h1>Admin Dashboard</h1>
                <p>Manage your blog content</p>
            </header>

            <section className={styles.actionSection}>
                <h2>Quick Actions</h2>
                <button
                    className={styles.button}
                    onClick={() => router.push('/admin/new-post')}
                >
                    Create New Post
                </button>
            </section>

            <section className={styles.actionSection}>
                <h2>Recent Posts</h2>
                <p>Your recent blog posts will appear here</p>
            </section>
        </div>
    );
};

export default AdminDashboard;