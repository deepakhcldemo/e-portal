const initialState = {
    BlogList: []
}
const BlogDetailsREducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BLOGSLIST':
            return {
                ...state,
                BlogList: action.BlogsListData
            };

        default:
            return state
    }
}
export default BlogDetailsREducer;