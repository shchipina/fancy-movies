import { TV, TVResponse } from "@/types/tv";
import { instance } from "../api"

export const getTrandingTV = async ():Promise<TV[]> => {
  const response = await instance.get<TVResponse>("/trending/tv/day?language=en-US");
  return response.data.result;
}

// export const getDetailsTV = async (id:number) => {
//   const response = await instance.get(``)
// }