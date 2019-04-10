
const initialState = {

    openModalForStudent: false,
    students: [],
    taggedStudent: []
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

        case 'TAGGED_STUDENTS':
            return {
                ...state,
                taggedStudent : action.taggedStudent
            }
        default:
            return state
    }
}
export default eventReducer;