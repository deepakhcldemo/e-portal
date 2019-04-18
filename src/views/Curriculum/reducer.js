const initialState = {
    openModal: false,
    docRef: '' 
};
const curriculumReducer = (state = initialState, action) => {    
    switch (action.type) {  
        case 'SET_DOC_REF':
            return {
                ...state,
                docRef: action.ref
            }
        case 'SAVE_DOC':
            return {
                ...state,
                docRef: action.ref
            }
        default:
            return state
    }
}
export default curriculumReducer