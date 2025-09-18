export const getToursByCountry = async (country: string) => {
  const res = await instance.get(`/tours?country=${encodeURIComponent(country)}`);
  return res.data;
};

import instance from './instance';

export const getTours = async () => {
  const res = await instance.get('/tours');
  return res.data;
};


export const createTour = async (data: any) => {
  const res = await instance.post('/tours', data);
  return res.data;
};

export const updateTour = async (id: string, data: any) => {
  const res = await instance.put(`/tours/${id}`, data);
  return res.data;
};

export const deleteTour = async (id: string) => {
  const res = await instance.delete(`/tours/${id}`);
  return res.data;
};
