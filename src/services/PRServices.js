import axios from "axios";

import StartUrl from "../configs/Url.json";

const GetAllURL = StartUrl?.StartUrl + "/requsition/getAllRequsitions";
const UpdateStatusURL = StartUrl?.StartUrl + "/requsition/getRequsitionByStatus/";
const GetByReqID = StartUrl?.StartUrl + "/requsition/getRequsitionById/";

export async function getReqByID(id) {
  let result;
  await axios
    .get(GetByReqID + id)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}

export async function getAllRequsitions() {
  let result;
  await axios
    .get(GetAllURL)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}

export async function UpdateStatus(id) {
  const alldata = {
    status: "accepted",
  };
  let result;
  await axios
    .put(UpdateStatusURL + id, alldata)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}
