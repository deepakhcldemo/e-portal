const initialState = {
  openModalForStudent: false,
  students: [],
  taggedStudent: []
};
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STUDENTS':
      return {
        ...state,
        students: action.student
      };

    case 'GET_STUDENTS':
      return {
        ...state,
        students: action.student
      };

    case 'TAGGED_STUDENTS_NAMES':
      return {
        ...state,
        taggedStudentNames: action.taggedStudentNames
      };
    case 'TAGGED_STUDENTS':
      return {
        ...state,
        taggedStudent: action.taggedStudent
      };
    default:
      return state;
  }
};
export default eventReducer;
