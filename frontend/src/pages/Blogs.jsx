import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Please login first to view blogs!");
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(savedBlogs);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">All Blogs</h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Discover stories, ideas, and knowledge from our community
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-2xl text-gray-500">No blogs yet.</p>
            <p className="text-gray-400 mt-2">Be the first to publish something amazing!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Blog Image */}
                {blog.image && (
                  <div className="h-56 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    By <span className="font-medium text-gray-700">{blog.author}</span> •{' '}
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>

                  <p className="text-gray-600 line-clamp-4 text-[15px] leading-relaxed mb-6">
                    {blog.description.length > 160
                      ? blog.description.substring(0, 160) + "..."
                      : blog.description}
                  </p>

                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1 group-hover:gap-2">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;