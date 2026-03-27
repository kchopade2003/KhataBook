"use client";

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found")
    }else {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;