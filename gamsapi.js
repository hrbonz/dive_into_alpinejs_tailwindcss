"use strict";

const APIbase = "https://api.measureofquality.com/v3";

function gamsAPI(apitoken, apibase) {
  if (typeof apibase === "undefined") {
    apibase = APIbase;
  }

  if (typeof apitoken === "undefined") {
    throw new Error("Provide an API token for authentication");
  }

  function rest(method, url) {

    const headers = {
      "authorization": "Basic " + btoa("_api:" + apitoken),
      "content-type": "application/json",
    };

    return fetch(url, {method: method, headers: headers})
      .then(function(response) {
        return response.json();
      });
  }

  function getTagInfo(uuid) {
    return rest(
        "GET",
        apibase + "/tags/" + uuid,
    );
  }

  function getTagLatest(uuid) {
    return rest(
        "GET",
        apibase + "/tags/" + uuid + "/records/latest",
    );
  }

  return {
    "getTagInfo": getTagInfo,
    "getTagLatest": getTagLatest,
  };
}
// end gamsAPI
