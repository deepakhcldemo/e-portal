import {  getTeacherFromDB , getCurriculumFromDB} from '../../database/dal/firebase/homeDal';


export const getCurriculum = () => {
    return (dispatch) => {
        getCurriculumFromDB(dispatch);
    }
}
export const getTeacher = () => {
    return (dispatch) => {
        getTeacherFromDB(dispatch);
    }
}