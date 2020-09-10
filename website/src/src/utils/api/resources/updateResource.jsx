import Axios from "axios";

const updateResource = (obj, setData, url, id, data) => {
  Axios.patch(url + id, data)
    .then((response) => {
      console.log(response.data);
      setData(response.data);
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

export default updateResource;
