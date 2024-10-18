const initialState = {
  sidebarShow: false,
  sidebarUnfoldable: false,
};

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case "set":
      return { ...state, sidebarShow: action.sidebarShow };
    default:
      return state;
  }
};
export default changeState;
