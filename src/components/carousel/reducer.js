const initialState = {
    tree: [],
    openModal: false
}
const carouselReducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'GET_CURRICULUM':
            return {                
                ...state,                               
                tree: action.category
            } 
        case 'MANAGE_CATEGORY':
            return {
                ...state,
                tree: action.category
            }                
        default:
            return state
    }
}
export default carouselReducer