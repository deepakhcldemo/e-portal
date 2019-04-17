const initialState = {
    studentModalState: false
}
const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                studentModalState: true
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                studentModalState: false
            };

        default:
            return state
    }
}
export default studentReducer;