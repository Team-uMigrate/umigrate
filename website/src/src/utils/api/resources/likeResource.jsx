import Axios from "axios";
import { LIKE_EXTENSION } from "../../../constants/urls/apiUrls";

const likeResource = (obj, setData, url, id) => {
  Axios.get(url + id + LIKE_EXTENSION)
    .then((response) => {
      console.log(response);
      return response.data.liked;
    })
    .then((liked) => {
      let data;
      if (liked) {
        data = {"liked" : false};
      }
      else {
        data = {"liked" :  true};
      }
      Axios.patch(url + id + LIKE_EXTENSION, data)
        .then((response) => {
          console.log(response);
          setData(data);
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

export default likeResource;
