import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Your Name');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/admin-login');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== 'admin') {
      alert("You Cannot Access This Page");
      navigate('/admin-login');
    }
  }, [navigate]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(savedBlogs);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !description || !image) {
      alert("Sab fields fill karo!");
      setLoading(false);
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      author,
      description,
      image: imagePreview,
      date: new Date().toISOString(),
    };

    try {
      const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
      const updatedBlogs = [newBlog, ...existingBlogs];
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

      alert("✅ Blog Successfully Uploaded!");
      setTitle('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
      loadBlogs(); // Refresh list
    } catch (error) {
      alert("Error uploading blog");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Kya aap is blog ko delete karna chahte hain?")) return;

    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    alert("Blog Deleted Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* New Blog Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">New Blog Upload</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Name *</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  required
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="mt-4 w-full h-48 object-cover rounded-xl shadow-sm"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="8"
                  placeholder="Write your blog description here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition-all text-lg"
              >
                {loading ? "Uploading..." : "Upload Blog"}
              </button>
            </form>
          </div>

          {/* Existing Blogs */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
              Existing Blogs 
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {blogs.length}
              </span>
            </h2>

            <div className="space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scroll">
              {blogs.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
                  No blogs yet. Create your first blog!
                </div>
              ) : (
                blogs.map((blog) => (
                  <div key={blog.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                    {blog.image && (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-52 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">By: {blog.author}</p>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-5">
                        {blog.description.substring(0, 120)}...
                      </p>

                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-all"
                      >
                        Delete Blog
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;