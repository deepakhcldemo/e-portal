const initialState = {
  studentModalState: false,
  teacherDetails: {},
  notificationData: {}
};
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        studentModalState: true,
        teacherDetails: action.value
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        studentModalState: false
      };

    case 'GET_NOTIFICATION':
      return {
        ...state,
        notificationData: action.NotificationData
      };

    default:
      return state;
  }
};
export default studentReducer;
