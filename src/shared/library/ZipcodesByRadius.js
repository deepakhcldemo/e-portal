
import jsonp from 'jsonp';

export const zipRequestDispatch = (zipcode) => {
    return (dispatch) => {
        // console.log(zipcode)
        jsonp('https://www.zipcodeapi.com/rest/smSkfHWKkUriOnIvrOfvpwrXKktOzw0r7Zrt3rOGZwTLUmMMyJjdux1FZhpcc3iA/radius.json/' + zipcode + '/5/km', 
            // response => dispatch({type: 'get_jsonp', jsonp: JSON.parse(response.data)})
            response => console.log('---------Data----',response)
        )
            /* if (error) {
                this.setState({
                    error,
                });
            } else {
                this.setState({
                    data: data,
                });
            } */
        // });
    }
}
/* const jsonp = (url, callback) => {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
  
    var script = document.createElement('script');
    script.src =
      url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}; */

/* export const zipRequestDispatch = (zipcode) => {
    return (dispatch) => {
        jsonp(
            'https://www.zipcodeapi.com/rest/smSkfHWKkUriOnIvrOfvpwrXKktOzw0r7Zrt3rOGZwTLUmMMyJjdux1FZhpcc3iA/radius.json/' + zipcode + '/5/km',
            response => dispatch({type: 'get_jsonp', jsonp: JSON.parse(response.data)})
        )
    }
} */
        // fetch('https://www.zipcodeapi.com/rest/smSkfHWKkUriOnIvrOfvpwrXKktOzw0r7Zrt3rOGZwTLUmMMyJjdux1FZhpcc3iA/radius.json/' + zipcode + '/5/km', {
        //     method: "POST",
        //     body: JSON.stringify(zipcode),
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     credentials: "same-origin"
        //   }, 5000) // throw after max 5 seconds timeout error
        // .then((result) => {
        //     // handle result
        //     console.log('--result--',result);
        //     dispatch({type: 'result'})
        // })
        // .catch((err) => {
        //     console.log('--errror Log--', err)
        //     // handle errors and timeout error
        // })




   /*      fetchJsonp('https://www.zipcodeapi.com/rest/smSkfHWKkUriOnIvrOfvpwrXKktOzw0r7Zrt3rOGZwTLUmMMyJjdux1FZhpcc3iA/radius.json/' + zipcode + '/5/km', {timeout: 5000,})
        .then(res => {
            console.log('--result--',res);
            dispatch({type: 'res'});
        })
        .catch(err => {
            console.log('--errror Log--', err)
        })
 */


        /* axios({
            url: 'https://www.zipcodeapi.com/rest/smSkfHWKkUriOnIvrOfvpwrXKktOzw0r7Zrt3rOGZwTLUmMMyJjdux1FZhpcc3iA/radius.json/' + zipcode + '/5/km',
            adapter: jsonpAdapter,
            callbackParamName: 'c' // optional, 'callback' by default
        }).then((res) => {
            console.log(res)
            dispatch({type:'set'})
        }).catch(err => {
            console.error(err)
        }) */
    // }
    /* axios
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
      }); */
//   };
// };

// zipRequestDispatch('85001');
