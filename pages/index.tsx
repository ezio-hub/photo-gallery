import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaHeart, FaComment } from 'react-icons/fa';
import React from 'react';
import Footer from '../components/Footer';
import { getUserAndPhotos } from './api/photos';

type Photo = {
  id: number;
  url: string;
  likes: number;
  comments: number;
};

type User = {
  username: string;
  postCount: number;
  avatarUrl: string;
};

export default function Gallery({ initialPhotos, initialUser }: { initialPhotos: Photo[], initialUser: User }) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      console.log('scrollHeight', scrollHeight, 'scrollTop', scrollTop, 'clientHeight', clientHeight);
      console.log("loading", loading, "hasMore", hasMore, "currentPage", currentPage)
      if (scrollTop + clientHeight >= scrollHeight - 1 && !loading && hasMore) { 
        console.log('fetching more photos');
        setLoading(true);
        fetchPhotos(currentPage + 1);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, currentPage, hasMore]); 
  

  const fetchPhotos = async (page: number) => {
    try {
      const response = await fetch(`/api/photos?page=${page}`);
      const data = await response.json();
      setUser(data.user);
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
      setCurrentPage(page);
      setLoading(false);
      if (data.photos.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <div className='bg-white'>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-6">
          <img
            src={user?.avatarUrl}
            alt="User Profile"
            className="w-32 h-32 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{user?.username}</h2>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">{user?.postCount}</span> posts
            </p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
        </div>
        <p className="mb-8">Top Posts</p>
        <div className="grid grid-cols-3 gap-2">
          {photos && photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer"
            >
              <img src={photo.url} alt="" className="w-full h-auto" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-white" size={24} />
                    <span className="text-white">{photo.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaComment className="text-white" size={24} />
                    <span className="text-white">{photo.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && <div>Loading...</div>}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
    
    try {
        const data = await getUserAndPhotos(1);
      return {
        props: {
          initialPhotos: data.photos,
          initialUser: data.user,
        },
      };
    } catch (error) {
      console.error('Error fetching photos:', error);
      return {
        props: {
          initialPhotos: [],
          initialUser: null,
        },
      };
    }
  }
  