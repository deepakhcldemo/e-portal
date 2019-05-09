import { getBlogsFromDB } from '../../../database/dal/firebase/TeacherBlog';

export const getBlogsList = () => {
    return (dispatch) => {
        getBlogsFromDB(dispatch);
    }
}



