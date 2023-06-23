import axios from "axios";

export const API = axios.create({
  baseURL : "https://waysfood.fly.dev/api/v1"  
})

export const APILOC = axios.create({
  baseURL : "https://nominatim.openstreetmap.org"
})