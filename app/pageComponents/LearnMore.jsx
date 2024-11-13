// components/LearnMore.js

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function LearnMore() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/getYoutubeVideos");

        if (!response.data) {
          throw new Error("Couldn't get YouTube videos from the API");
        }

        setVideos(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="bg-gray-900 text-white py-10 px-4">
      <h2 className="text-center text-3xl font-bold mb-4">Learn And Earn</h2>
      <p className="text-center mb-8">
        Watch and earn rewards as you learn about cryptocurrency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-gray-800 p-4 rounded-lg">
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="w-full rounded mb-4"
            />
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded mb-2 inline-block">
              LEARN & EARN
            </span>
            <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
            <div className="flex items-center text-sm mt-2">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>{video.snippet.channelTitle}</span>
              <span className="ml-auto text-gray-400">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button className="bg-white text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300">
          Load more
        </button>
      </div>
    </section>
  );
}

export default LearnMore;
