import axios from 'axios';


const loadGiphy = async (searchTag) => {
  try {
    return axios('/api/v1/util/fetch_random_giphy', { params: { searchTag } });
  } catch (err) {
    return err;
  }
};

export default loadGiphy;
