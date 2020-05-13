import Axios from "axios";
import { USER_ID } from "../../../constants/misc/localStorageKeys";
import { LIMIT, OFFSET } from "../../../constants/urls/apiUrls";

const listResource = (obj, setData, url, page = 0) => {
  Axios.get(url + "?" + OFFSET + (page * LIMIT), { withCredentials: true })
    .then((response) => {
      console.log(response.data.results);
      setData(response.data.results);
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

export default listResource;
