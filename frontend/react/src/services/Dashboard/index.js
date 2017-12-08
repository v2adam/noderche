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
    const result = await axios('/api/v1/util/load_grid_position');
    return result.data;
  } catch (err) {
    return err;
  }
};

