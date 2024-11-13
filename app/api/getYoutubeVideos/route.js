// pages/api/getYoutubeVideos.js

import axios from "axios";

export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistID = "PLXlwdgXOL3wp2qgZxubPWis_s2EP_6ghR";
  const maxResults = 5;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&maxResults=${maxResults}&key=${apiKey}`
    );

    if (!response.data) {
      throw new Error("No data received from YouTube API");
    }

    // Send the directly to the client
    res.status(200).json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
