
const initialState = {
    
    openModalForStudent: false,
    students : []
};
const eventReducer = (state = initialState, action) => {
    switch (action.type) {  
        
        case 'OPEN_MODAL':
        return {
            ...state,
            openModalForStudent: true
        }
        case 'CLOSE_MODAL':
        return {
            ...state,
            openModalForStudent: false
        }

        case 'GET_STUDENTS':
        return {
            ...state,
            students: action.student
        }
        default:
            return state
    }
}
export default eventReducer;