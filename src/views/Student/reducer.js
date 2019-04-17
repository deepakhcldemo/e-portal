const initialState = {
    studentModalState: false,
    teacherDetails : {}
}
const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                studentModalState: true,
                teacherDetails : action.value

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