
const initialState = {
    core: {
        data: [
            {
                id: 'abc',
                text: 'Root', children: [                    
                ]
            }
        ]
    }
}

const curriculumReducer = (state = initialState, action) => {
    switch (action.type) {        
        case 'ADD_CATEGORY': 
            return {
                ...state,          
                category: action.category
            }                        
        default:
            return state
    }
}
export default curriculumReducer