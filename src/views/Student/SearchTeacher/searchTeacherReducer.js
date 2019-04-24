const initialState = {
  teacherDetails: [],
  jsonp: ''
};
const searchTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TEACHERS':
      return {
        ...state,
        teacherDetails: action.Teachers
      };
    case 'get_jsonp':
      return {
        ...state,
        jsonp: action.jsonp
      }

    default:
      return state;
  }
};
export default searchTeacherReducer;
