export const closeModalPopUp = () => {
    return {
        type: 'CLOSE_MODAL'
    }
}


export const saveStudent = () => {
    return {
        type: 'SAVE_STUDENTS'
    }
}


export const addStudent = (student) => {    
    return {
        type: 'TAGGED_STUDENTS', 
        taggedStudent : student
    }
}