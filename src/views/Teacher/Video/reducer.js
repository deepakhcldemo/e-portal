const initialState = {
    openModal: false,
}

const videoReducer = (state = initialState, action) => {    
    switch (action.type) {  
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