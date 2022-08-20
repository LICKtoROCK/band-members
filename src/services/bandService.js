import axios from 'axios';

export const postBand = (name, prefectures, members, pr) => axios.post('/bands', {
  name, prefectures, members, pr,
});
