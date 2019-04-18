import { getTeachersFromDBBasedOnCategory } from '../../../database/dal/firebase/studentDal';

export const getTeachersBasedOnCateogy = filterValue => {
  return dispatch => {
    getTeachersFromDBBasedOnCategory(dispatch, filterValue);
  };
};
