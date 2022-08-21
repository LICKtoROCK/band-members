import axios from 'axios';

export const getBands = async () => {
  const { data } = await axios.get('/bands');
  return data;
};

export const postBand = (name, prefectures, members, pr) => axios.post('/bands', {
  name, prefectures, members, pr,
});
export const deleteBand = (id) => axios.delete(`/bands/${id}`);
