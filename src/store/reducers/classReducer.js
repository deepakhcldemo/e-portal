const classReducer = {
    openModal : false
}

const classReducerState = (state = classReducer, action) => {
    if(action.type === 'close'){
        return {
            ...state,
            openModal : !state.openModal
        }
    }
    if(action.type === 'open'){
        return {
            ...state,
            openModal : !state.openModal
        }
    }
    
    return state;
}

export default classReducerState;