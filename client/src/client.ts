import { createContext } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";


export const HttpClientContext = createContext<AxiosInstance | null>(
  createClient(null)
);


export function createClient(token: string | null) {
  if (token === null) return null;

  const client = axios.create({
    
  });


  return client;
}

export const X_REQUEST_ID = "x-request-id";
