
const initialState = {
    
    openModalForStudent: false,
    taggedStudents : []
};
const modalReducer = (state = initialState, action) => {
    debugger
    switch (action.type) { 
        case  'TAGGED_STUDENTS': 
        return {...state}
        default:
            return state
    }
}
export default modalReducer;