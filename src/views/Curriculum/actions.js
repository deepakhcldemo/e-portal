const category = {}
export const addCategory = () => {
    return {
        type: 'ADD_CATEGORY',
        category
    }
}
export const deleteCategory = () => {
    return {
        type: 'DELETE_CATEGORY',

    }
}
export const viewCategory = () => {
    return {
        type: 'VIEW_CATEGORY'
    }
}
