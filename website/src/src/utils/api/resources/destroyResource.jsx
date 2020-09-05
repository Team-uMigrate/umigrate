import Axios from "axios";

const deleteResource = (obj, url, id) => {
  Axios.delete(url + id)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      if(error.response.status === 401){
        console.log(error.response);
        obj.setAuthenticated(true);
        obj.setRegistered(false);
      }
      return error.response;
    });
};

export default deleteResource;
