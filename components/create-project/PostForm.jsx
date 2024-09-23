"use client";
// import data from "../../data";
import Skills from "@/data/Skills";
import { useState, useEffect } from "react";

const PostForm = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [inputs, setInputs] = useState({});
  const [skillList, setSkillList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const submitProject = async (e) => {
    console.log(inputs);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("demo-url", inputs["demo-url"]);
    formData.append("figma-url", inputs["figma-url"]);
    formData.append("youtube-url", inputs["youtube-url"]);
    formData.append("github-url", inputs["github-url"]);
    formData.append("portfolio-url", inputs["portfolio-url"]);
    formData.append("thumbnail", thumbnail);
  };

  const onSkillSelect = (skill, isChecked) => {
    if (isChecked) {
      setSkillList((prev) => [...prev, skill]);
    } else {
      setSkillList((prev) => prev.filter((item) => item !== skill));
    }
  };

  useEffect(() => {
    setInputs((prev) => ({ ...prev, skills: skillList }));
  }, [skillList]);

  return (
    <div className="min-h-screen bg-purple-50 flex justify-center items-center p-6">
      <form
        onSubmit={submitProject}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl"
      >
        <h1 className="text-3xl font-bold text-purple-500 mb-8 text-center">
          Add Project
        </h1>

        {/* Thumbnail Image Upload */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Thumbnail Image
          </label>

          <input
            type="file"
            name="thumbnail-image"
            accept="image/*"
            onChange={handleThumbnailChange}
            class="block mb-5 w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400
      "
          />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              className="w-full max-h-[16rem] sm:max-h-[32rem] object-cover rounded-lg"
            />
          )}
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            onChange={handleChange}
            placeholder="Project Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            rows="4"
            name="description"
            required
            onChange={handleChange}
            placeholder="Project Description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>
        </div>

        {/* Skills Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Skills
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Skills.Skills.map((item, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  id="skill"
                  onClick={(e) => onSkillSelect(item.name, e.target.checked)}
                  type="checkbox"
                  className="w-4 h-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded "
                />
                <span className="text-gray-700">{item.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* URL Inputs */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Demo URL
          </label>
          <input
            type="url"
            name="demo-url"
            onChange={handleChange}
            placeholder="https://demo.example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Figma URL
          </label>
          <input
            type="url"
            name="figma-url"
            onChange={handleChange}
            placeholder="https://figma.example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            name="youtube-url"
            onChange={handleChange}
            placeholder="https://youtube.example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="github-url"
            onChange={handleChange}
            placeholder="https://github.example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Portfolio URL
          </label>
          <input
            type="url"
            name="portfolio-url"
            onChange={handleChange}
            placeholder="https://portfolio.example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-300"
          >
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

// PostForm
