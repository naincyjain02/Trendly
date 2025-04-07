import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateBlogPage = () => {
const navigate=useNavigate();

    useEffect(()=>{
             const token=localStorage.getItem("Token");
             if(!token){
                navigate("/login");
             }
    },[]);



  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');

  const handleCreateBlog = () => {
    // Logic to handle blog creation can be added here
    console.log('Blog Created:', { heading, content });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a New Blog</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="heading">
          Blog Heading
        </label>
        <input
          type="text"
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your blog heading"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
          Blog Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="10"
          placeholder="Write your blog content here"
        ></textarea>
      </div>
      <button
        onClick={handleCreateBlog}
        className="w-full bg-[#5A639C]   hover:bg-[#7776B3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlogPage;

