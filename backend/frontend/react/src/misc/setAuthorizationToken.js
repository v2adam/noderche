import axios from 'axios';


// ha van token, akkor hozzáfűzi az axios által használtakhoz
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
