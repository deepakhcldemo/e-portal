const initialState = {
  openModalForStudent: false,
  taggedStudents: []
};
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return { ...state , 
        openModalForStudent : false
      };
    default:
      return state;
  }
};
export default modalReducer;
