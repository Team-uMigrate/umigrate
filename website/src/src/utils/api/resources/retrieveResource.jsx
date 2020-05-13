import Axios from "axios";
import { USER_ID } from "../../../constants/misc/localStorageKeys";

const retrieveResource = (obj, setData, url, id) => {
  Axios.get(url + id, { withCredentials: true })
    .then((response) => {
      console.log(response.data);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error.response);
      if(error.response.status === 401){
        localStorage.removeItem(USER_ID);
        obj.context.setAuthenticated(false);
      }
      return error.response;
    });
};

export default retrieveResource;
