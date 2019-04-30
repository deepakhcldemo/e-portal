const initialState = {
  studentModalState: false,
  teacherDetails: {},
  notificationData: {},
  notificationDetailsBasedOnStudent: []
};
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        studentModalState: true,
        teacherDetails: action.value
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        studentModalState: false
      };

    case "GET_NOTIFICATION":
      return {
        ...state,
        notificationData: action.NotificationData
      };

    case "GET_NOTIFICATIONS_STUDENT_ID":
      return {
        ...state,
        notificationData: action.notificationsBasedOnStudent
      };

    default:
      return state;
  }
};
export default studentReducer;
