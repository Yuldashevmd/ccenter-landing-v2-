import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

// Base API configuration
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  }),
  endpoints: () => ({}),
});
