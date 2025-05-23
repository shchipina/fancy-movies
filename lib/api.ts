import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TMDB_TOKEN
  }
})
