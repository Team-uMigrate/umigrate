import Axios from "axios";

const retrieveResource = (obj, setData, url, id) => {
  Axios.get(url + id)
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

export default retrieveResource;
