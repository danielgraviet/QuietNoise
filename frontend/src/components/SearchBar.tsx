'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '@/css/NavBar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 2) {
            try {
                console.log('Searching for:', query);
                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/search?q=${encodeURIComponent(query)}`;
                console.log('Request URL:', url);

                const response = await fetch(url);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Search request failed: ${response.status} ${errorText}`);
                }

                const data = await response.json();
                console.log('Search results:', data);
                console.log('Result count:', data.length);

                if (data.length === 0) {
                    console.log('No results found. Try visiting http://localhost:5001/api/posts/debug/create-test-post to create a test post');
                }

                setSearchResults(data);
                setIsDropdownVisible(true);
            } catch (error) {
                console.error('Error searching:', error);
            }
        } else {
            setSearchResults([]);
            setIsDropdownVisible(false);
        }
    };

    const handleResultClick = (postId: string) => {
        router.push(`/blog/${postId}`);
        setSearchQuery('');
        setIsDropdownVisible(false);
    };

    return (
        <div className={styles.searchContainer} ref={dropdownRef}>
            <input
                type="text"
                placeholder="Search articles..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchResults.length > 0 && setIsDropdownVisible(true)}
            />
            <button className={styles.searchButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>

            {isDropdownVisible && searchResults.length > 0 ? (
                <div className={styles.searchResults}>
                    {searchResults.map((result: any) => (
                        <div
                            key={result._id}
                            className={styles.searchResult}
                            onClick={() => handleResultClick(result._id)}
                        >
                            <div className={styles.resultTitle}>{result.title}</div>
                            <div className={styles.resultAuthor}>by {result.author || 'Unknown'}</div>
                        </div>
                    ))}
                </div>
            ) : searchQuery.length > 2 ? (
                <div className={styles.searchResults}>
                    <div className={styles.searchResult}>
                        <div className={styles.resultTitle}>Searching...</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
} 