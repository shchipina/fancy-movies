import { TV, TVResponse, TVShowDetailsResponse } from "@/types/tv";
import { instance } from "../api";

export const getPopularTV = async (): Promise<TV[]> => {
  const response = await instance.get<TVResponse>('/trending/tv/day?language=en-US&page=1');
  return response.data.results;
}

export const getAllTV = async (page: number): Promise<TVResponse> => {
  const response = await instance.get<TVResponse>('/tv/top_rated', {
    params: {
      language: 'en-US',
      page,
    },
  });

  return response.data;
}

export const getTVShowDetails = async (id: number): Promise<TVShowDetailsResponse> => {
  try {
    const [detailsRes, videoRes, creditsRes, reviewRes] = await Promise.all([
      instance.get(`/tv/${id}?language=en-US`),
      instance.get(`/tv/${id}/videos?language=en-US`),
      instance.get(`/tv/${id}/credits`),
      instance.get(`/tv/${id}/reviews`),
    ]);

    return {
      details: detailsRes.data,
      video: videoRes.data,
      credits: creditsRes.data,
      review: reviewRes.data,
    };
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    throw error;
  }
};