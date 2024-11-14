// components/LearnMore.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function LearnMore() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  //   let call = 1;

  //   function refresh() {
  //     return (call += 1);
  //   }

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/getYoutubeVideos");
      setVideos(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch videos");
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Modal component for video playback
  const VideoModal = ({ video, onClose }) => {
    if (!video) return null;

    const videoId = video.snippet.resourceId.videoId;

    return (
      <div className="fixed font-sans inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="relative bg-gray-900 rounded-lg w-full max-w-4xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
          >
            Close
          </button>

          {/* Video player */}
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full rounded-t-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={video.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">
              {video.snippet.title}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="bg-gray-900 text-white py-10 px-4 text-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-900 text-white py-10 px-4 text-center">
        <p>Loading videos...</p>
      </div>
    );
  }

  return (
    <section
      data-aos="fade-up"
      className=" container mx-auto font-sans py-16 px-4"
    >
      <h2 className="text-center text-3xl font-bold mb-4">Learn And Earn</h2>
      <p className="text-center mb-8">
        Watch and earn rewards as you learn about cryptocurrency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className=" rounded-lg cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedVideo(video)}
          >
            {" "}
            {console.log(video)}
            <div className="relative">
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full rounded mb-4"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-black bg-opacity-50 rounded-full p-4">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded mb-2 inline-block">
              LEARN & EARN
            </span>
            <h3 className="text-sm font-semibold">{video.snippet.title}</h3>
            <div className="flex items-center text-sm mt-2">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-400">
                {video.snippet.channelTitle}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      <div className="flex  py-10 justify-center mt-6">
        <button
          onClick={fetchVideos}
          className="border-2 border-gray-300 px-6 py-1 rounded-full hover:bg-gray-600"
        >
          Load more
        </button>
      </div>
    </section>
  );
}

export default LearnMore;
