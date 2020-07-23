import Axios from "axios";
import { LIMIT, OFFSET } from "../../../constants/urls/apiUrls";

const listResource = (obj, setData, url, page = 0) => {
  Axios.get(url + "?" + OFFSET + (page * LIMIT), { withCredentials: true })
    .then((response) => {
      console.log(response.data.results);
      setData(response.data.results);
    })
    .catch((error) => {
      console.log(error);
      if(error.response.status === 401){
        console.log(error);
        obj.setAuthenticated(true);
        obj.setRegistered(false);
      }
      return error.response;
    });
};

export default listResource;
