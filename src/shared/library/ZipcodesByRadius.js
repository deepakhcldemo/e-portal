import axios from "axios";

var config = {
    headers: { 
        'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded' 
    }
};

export const zipRequestDispatch = (zipcode) => {
  return (dispatch) => {
    axios
      .post(
        "https://www.zipcodeapi.com/rest/smSkfHWKkUriOnIvrOfvpwrXKktOzw0r7Zrt3rOGZwTLUmMMyJjdux1FZhpcc3iA/radius.json/"+ zipcode + "/5/km",
        config
      )
      .then(postResponse => {
        // store user details in local storage to keep user logged in between page refreshes
        // localStorage.setItem("user", JSON.stringify(postResponse.data));
        console.log("postResponse", postResponse);
      })
      .catch(error => {
        console.log("failure error", error);
        // dispatch(loginFailureAction(error.response.data));
      });
  };
};

// zipRequestDispatch('85001');
