import { CATEGORY } from './../../constant/Constant';
const initialState = {
    tree: [],
    openModal: false,
    error: '',
    dbWithUser: ''
};
const curriculumReducer = (state = initialState, action) => {
    switch (action.type) {  
        case CATEGORY.ACTIONS.GET:
            return {                
                ...state,   
                tree: action.category                            
            }
        case 'GET_CURRENT_USER': 
            return {
                ...state,
                uid: action.uid
            }             
        /* case 'CLOSE':
            return {
                ...state,
                openModal: !state.openModal
            }
        case 'OPEN':
            return {
                ...state,
                openModal: !state.openModal
            }        
         */default:
            return state
    }
}
export default curriculumReducer