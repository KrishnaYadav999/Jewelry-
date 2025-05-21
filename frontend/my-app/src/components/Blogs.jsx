import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("🔥 Error fetching blogs:", err));
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://jewelry-backend-gq4y.onrender.com/api/blogs/${id}`)
        .then((res) => {
          setBlog(res.data);
          setTitle(res.data.title);
          setContent(res.data.content);
          setImageUrl(res.data.imageUrl);
          setIsEditing(true);
        })
        .catch((err) => console.error("🔥 Error fetching blog:", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !content.trim() || !imageUrl.trim()) {
        alert("All fields are required.");
        return;
      }

      const response = isEditing
        ? await axios.put(`http://localhost:5000/api/blogs/${id}`, { title, content, imageUrl })
        : await axios.post("http://localhost:5000/api/blogs", { title, content, imageUrl });

      console.log("✅ Blog saved:", response.data);
      navigate("/blogs");
      window.location.reload();
    } catch (error) {
      console.error("🔥 Error submitting blog:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to submit blog. Please check your backend.");
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
      console.log("✅ Blog deleted");
      navigate("/blogs");
      window.location.reload();
    } catch (error) {
      console.error("🔥 Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">{isEditing ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <input type="text" className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500" placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500" placeholder="Blog Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input type="text" className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-500" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition-all">
          {isEditing ? "Update Blog" : "Publish Blog"}
        </button>
      </form>
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">All Blogs</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-52 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">{blog.content.slice(0, 100)}...</p>
            <div className="flex justify-between items-center">
              <button onClick={() => navigate(`/blog/${blog._id}`)} className="text-blue-500 font-semibold">Read More</button>
              <div>
                <button onClick={() => navigate(`/edit/${blog._id}`)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(blog._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
