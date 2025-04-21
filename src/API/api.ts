import axios from "axios";
import { BASE_URL, PAINTINGS_PER_PAGE } from "./constants";

export const fetchPaintings = async (serch: string = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/paintings?q=${serch}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchAddInfo = async (authorId: number, locationId: number) => {
  try {
    const responseAuthor = await axios.get(
      `${BASE_URL}/authors?id=${authorId}`
    );
    const responseLocation = await axios.get(
      `${BASE_URL}/locations?id=${locationId}`
    );
    return {
      authorName: responseAuthor.data[0].name,
      location: responseLocation.data[0].location,
    };
  } catch (e) {
    console.log(e);
  }
};

export const fetchPage = async (page: number, serch: string = "") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/paintings?q=${serch}&_page=${page}&_limit=${PAINTINGS_PER_PAGE}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
