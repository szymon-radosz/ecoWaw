import React from 'react';

export const GlobalContext = React.createContext({
  loogedIn: false,
  loogedInUserInfo: [],
  loginUser: () => {},
  renderPath: () => {},
  setActiveBottomItemName: () => {},
  activeBottomItemName: '',
  showMapTags: false,
  setShowMapTags: () => {},
  API_URL: '',
  points: [],
  activeTagList: [],
  loadPointByActiveTags: () => {},
  setCoords: () => {},
  token: '',
  logoutUser: () => {},
  updateUserPoints: () => {},
  getUserInfo: () => {},
});
