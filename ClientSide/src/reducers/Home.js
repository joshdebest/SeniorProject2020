export default function Home(state = [], action) {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {};
    case 'HOME_PAGE_UNLOADED':
      return {};
    default:
      return state;
  }
};