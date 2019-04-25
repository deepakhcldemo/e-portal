const initialState = {
    notifications: [],
    openModal: false
}
const notifyTeacherReducer = (state = initialState, action) => {
    switch (action.type) {     
        case 'GET_NOTIFICATION':
            return {                
                ...state,                               
                notifications: action.notifications
            }   
        default:
            return state
    }
}
export default notifyTeacherReducer