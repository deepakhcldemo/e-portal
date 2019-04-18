const initialState = {
  teacherDetails: []
};
const searchTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TEACHERS':
      return {
        ...state,
        teacherDetails: action.Teachers
      };

    default:
      return state;
  }
};
export default searchTeacherReducer;
