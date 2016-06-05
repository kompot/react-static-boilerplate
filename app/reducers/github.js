const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOP_REPOS_SUCCESS':
      return {
        ...state,
        items: action.payload.items,
      };
    default:
      return state;
  }
};

export {
  initialState,
  reducer,
};
