import axios from "axios";
export const PAINTINGS_PER_PAGE = 6;

const api = axios.create({
  baseURL: 'https://test-front.framework.team',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchPaintings = async (search: string = "") => {
  try {
    const response = await api.get(`/paintings?q=${search}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchAddInfo = async (authorId: number, locationId: number) => {
  try {
    const [authorResponse, locationResponse] = await Promise.all([
      api.get(`/authors?id=${authorId}`),
      api.get(`/locations?id=${locationId}`),
    ]);
    return {
      authorName: authorResponse.data[0].name,
      location: locationResponse.data[0].location,
    };
  } catch (e) {
    console.log(e);
  }
};

export const fetchPage = async (page: number, search: string = "") => {
  try {
    const response = await api.get(
      `/paintings?q=${search}&_page=${page}&_limit=${PAINTINGS_PER_PAGE}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
