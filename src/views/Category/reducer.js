const initialState = {
    tree: [],
    openModal: false
}
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'GET_CATEGORY':
            return {                
                ...state,                               
                tree: action.category
            } 
        case 'MANAGE_CATEGORY':
            return {
                ...state,
                tree: action.category
            }
        case 'CLOSE':
            return {
                ...state,
                openModal: !state.openModal
            }
        case 'OPEN':
            return {
                ...state,
                openModal: !state.openModal
            }                           
        default:
            return state
    }
}
export default categoryReducer