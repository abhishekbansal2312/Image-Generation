// File: app/page.js
"use client";

import { useState, useEffect } from "react";

export default function TravelBlog() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Barcelona Retreat",
      description: "Enjoying the city of architecture",
      location: "Barcelona",
      date: "01/12/2024, 13:45:00",
    },
    {
      id: 2,
      title: "Cape Town Adventure",
      description: "Exploring the city of natural beauty",
      location: "Cape Town",
      date: "02/15/2024, 09:30:00",
    },
    {
      id: 3,
      title: "Tokyo Escapade",
      description: "Experiencing the blend of tradition and innovation",
      location: "Tokyo",
      date: "03/22/2024, 16:20:00",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All locations");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogDescription, setNewBlogDescription] = useState("");
  const [newBlogLocation, setNewBlogLocation] = useState("All locations");

  const locations = [
    "All locations",
    "Barcelona",
    "Cape Town",
    "Tokyo",
    "Paris",
    "New York",
    "Bali",
    "Kyoto",
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "All locations" || blog.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const handleCreateBlog = () => {
    if (!newBlogTitle.trim()) return;

    const newBlog = {
      id: Date.now(),
      title: newBlogTitle,
      description: newBlogDescription,
      location: newBlogLocation === "All locations" ? "" : newBlogLocation,
      date: new Date().toLocaleString(),
    };

    setBlogs([newBlog, ...blogs]);
    setNewBlogTitle("");
    setNewBlogDescription("");
    setNewBlogLocation("All locations");
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Travel Blog</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search blogs"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-64">
            <select
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Blog
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Blog title"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={newBlogTitle}
            onChange={(e) => setNewBlogTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your travel story..."
            className="w-full p-2 mb-4 border border-gray-300 rounded-md h-40"
            value={newBlogDescription}
            onChange={(e) => setNewBlogDescription(e.target.value)}
          ></textarea>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <select
              className="w-full md:w-64 p-2 border border-gray-300 rounded-md bg-white"
              value={newBlogLocation}
              onChange={(e) => setNewBlogLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreateBlog}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Blogs</h2>
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500 italic">
            No blogs found. Create your first travel story!
          </p>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {blog.title}
                  </h3>
                  <span className="text-sm text-gray-500">{blog.date}</span>
                </div>
                <p className="text-gray-600 mb-2">{blog.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {blog.location}
                  </span>
                  <div className="space-x-2">
                    <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-300 transition-colors">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
