import axios from "axios";

let getHeros = (onSuccess, onError) => {
  debugger;
  const config = {
    method: "GET",
    url: "/users/foods",
    withCredentials: false,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios(config)
    .then(onSuccess)
    .catch(onError);
};

let postHero = (payload, onSuccess, onError) => {
  const config = {
    method: "POST",
    url: "/users/food",
    data: payload,
    withCredentials: false,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(onSuccess)
    .catch(onError);
};

let deleteHero = (id, onSuccess, onError) => {
  const config = {
    url: "/users/food",
    data: id,
    method: "DELETE",
    withCredentials: false,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(onSuccess)
    .catch(onError);
};

export { getHeros, postHero, deleteHero };
