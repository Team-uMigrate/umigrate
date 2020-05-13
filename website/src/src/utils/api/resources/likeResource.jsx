import Axios from "axios";
import { LIKE_EXTENSION } from "../../../constants/urls/apiUrls";
import { USER_ID } from "../../../constants/misc/localStorageKeys";

const likeResource = (obj, setData, url, id) => {
  Axios.get(url + id + LIKE_EXTENSION, {withCredentials : true})
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
      Axios.patch(url + id + LIKE_EXTENSION, data, {withCredentials : true })
        .then((response) => {
          console.log(response);
          setData(data);
        })
        .catch((error) => {
          console.log(error.response);
          if(error.response.status === 401){
            localStorage.removeItem(USER_ID);
            obj.context.setAuthenticated(false);
          }
        });
    })
    .catch((error) => {
      console.log(error.response);
      if(error.response.status === 401){
        localStorage.removeItem(USER_ID);
        obj.context.setAuthenticated(false);
      }
    });
};

export default likeResource;
