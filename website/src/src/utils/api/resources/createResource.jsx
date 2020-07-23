import Axios from "axios";

const createResource = (obj, url, data) => {
  Axios.post(url, data, { withCredentials: true })
    .then((response) => {
      console.log(response.data);
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

export default createResource;
