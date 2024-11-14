import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const playlistID = "PLXlwdgXOL3wp2qgZxubPWis_s2EP_6ghR";
  const maxResults = 4;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&maxResults=${maxResults}&key=${apiKey}`
    );

    if (!response) {
      throw new Error("No data received from YouTube API");
    }

    return NextResponse.json(response.data.items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
