import axios from 'axios';


export const fetchComponentType = async () => {
  try {
    const result = await axios('/api/v1/util/fetch_components');
    return result.data;
  } catch (err) {
    return err;
  }
};


export const fetchExistingDashboard = async () => {
  try {
    const result = await axios('/api/v1/util/fetch_existing_dashboard');
    return result.data;
  } catch (err) {
    return err;
  }
};


export const loadGridPosition = async (dashboardId) => {
  try {
    const result = await axios(`/api/v1/util/grid_position/${dashboardId}`);
    return result.data;
  } catch (err) {
    return err;
  }
};


export const saveGridPosition = async (position, id) => {
  try {
    const result = await axios.post('/api/v1/util/grid_position', {
      newPosition: position,
      dashboardId: id
    });
    return result.status;
  } catch (err) {
    return err;
  }
};


export const deleteDashboard = async (dashboardId) => {
  try {
    const result = await axios.delete(`/api/v1/util/grid_position/${dashboardId}`);
    return result.status;
  } catch (err) {
    return err;
  }
};


export const newDashboard = async () => {
  try {
    const result = await axios.put('/api/v1/util/grid_position', {});
    return result;
  } catch (err) {
    return err;
  }
};
