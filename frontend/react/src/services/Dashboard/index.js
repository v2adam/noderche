import axios from 'axios';


export const fetchComponentType = async () => {
  try {
    const result = await axios('/api/v1/util/fetch_components');
    return result.data;
  } catch (err) {
    return err;
  }
};


export const loadGridPosition = async () => {
  try {
    const result = await axios('/api/v1/util/grid_position');
    return result.data;
  } catch (err) {
    return err;
  }
};


export const saveGridPosition = async (position) => {
  try {
    const result = await axios.post('/api/v1/util/grid_position', { newPosition: position });
    return result.status;
  } catch (err) {
    return err;
  }
};
