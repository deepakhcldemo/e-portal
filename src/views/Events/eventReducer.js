
const initialState = {
    
    openModalForStudent: false
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
        default:
            return state
    }
}
export default eventReducer;