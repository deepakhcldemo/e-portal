const initialState = {
    carouselData: [],
    teacherCarouselData: [],
    openModal: false
}
const homeReducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'GET_CURRICULUM':
            return {                
                ...state,                               
                carouselData: action.curriculumData
            }
        case 'GET_TEACHER':
        return {                
            ...state,                               
            teacherCarouselData: action.teacherCurriculumData
        }               
        default:
            return state
    }
}
export default homeReducer