import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Please login first to read the blog!");
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const allBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const foundBlog = allBlogs.find(b => b.id === parseInt(id));
    
    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      alert("Blog not found!");
      navigate('/blogs');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h2 className="text-2xl text-gray-600">Loading Blog...</h2>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h2 className="text-2xl text-gray-600">Blog Not Found</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Back Button */}
      <div className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Back to All Blogs
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-8">
        {/* Blog Image */}
        {blog.image && (
          <div className="mb-10">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-xl"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-gray-600 mb-10 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">By:</span>
            <span className="font-semibold">{blog.author}</span>
          </div>
          <div className="text-sm">
            {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {blog.description.split('\n').map((para, index) => (
            para.trim() && <p key={index} className="mb-6">{para}</p>
          ))}
        </div>

        {/* Optional: Share / More Options */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-center">
          <button
            onClick={() => navigate('/blogs')}
            className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all font-medium"
          >
            Browse More Blogs →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;