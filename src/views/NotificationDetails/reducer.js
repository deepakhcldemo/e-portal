const initialState = {
    openModal : false
}
const notificationAcceptREducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL_FOR_ACCEPT':
            return {
                ...state,
                openModal: true
            };
            case 'CLOSE_NOTIFICATION_POP':
            return {
                ...state,
                openModal: false
            }
        default:
            return state
    }
}
export default notificationAcceptREducer;