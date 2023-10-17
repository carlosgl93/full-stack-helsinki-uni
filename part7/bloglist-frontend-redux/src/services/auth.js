import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";

const authUrl = "http://localhost:3003/api";
const config = {
  headers: {
    "Content-type": "application/json",
  },
};
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${authUrl}/users`,
        { name, email, password },
        config,
      );
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResult = await axios.post(
        `${authUrl}/login`,
        { email, password },
        config,
      );
      return loginResult;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    method: "POST",
    baseUrl: `${authUrl}/login`,
  }),
  endpoints: (builder) => ({
    login: builder.query({
      query: (token) => {
        return {
          url: `tokenLogin`,
          params: { token },
        };
      },
    }),
  }),
});

export const { useLoginQuery } = authApi;
