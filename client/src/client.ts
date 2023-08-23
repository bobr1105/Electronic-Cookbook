import { createContext } from "react";
import axios, { AxiosInstance } from "axios";


export const HttpClientContext = createContext<AxiosInstance | null>(
  createClient()
);

export function createClient() {

  const client = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  });
  return client;
}