import { TV, TVResponse } from "@/types/tv";
import { instance } from "../api";

export const getPopularTV = async (): Promise<TV[]> => {
  const response = await instance.get<TVResponse>('/trending/tv/day?language=en-US&page=1');
  return response.data.results;
}
