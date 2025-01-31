import BlogPost from '@/components/BlogPost';
import Navigation from '@/components/Navigation';
import styles from '@/css/page.module.css';

async function getPosts() {
  const res = await fetch('http://localhost:5001/api/posts', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {featuredPost && (
          <BlogPost post={{
            ...featuredPost,
            category: 'Destination',
            readTime: '10 min read'
          }} featured />
        )}

        <div className="mt-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Blog</h2>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">All</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Destination</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Culinary</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Lifestyle</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Tips & Hacks</button>
            </div>
            <select className="px-4 py-2 border rounded-lg">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>

          <div className={styles.blogGrid}>
            {otherPosts.map((post: any) => (
              <div key={post._id} className={styles.blogItem}>
                <BlogPost
                  post={{
                    ...post,
                    category: 'Destination'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
