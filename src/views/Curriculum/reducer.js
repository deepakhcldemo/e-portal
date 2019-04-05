
const initialState = {
    tree: {
        core: {
            data: [
                {
                    id: "0",
                    text: 'Root', 
                    children: [ ]
                }
            ]
        }
    },
    openModal: false
};
const curriculumReducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'GET_CATEGORY':
            return {                
                ...state,                               
            }      
        case 'ADD_CATEGORY': 
            return {
                ...state,          
                category: action.category
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
export default curriculumReducer