import {createStackNavigator, createAppContainer} from 'react-navigation';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import Welcome from './../components/HomeScreen/HomeScreen';
import LoginScreen from './../components/LoginScreen/LoginScreen';
import MainMapScreen from './../components/MainMapScreen/MainMapScreen';
import CouponScreen from './../components/CouponScreen/CouponScreen';
import ProfileScreen from './../components/ProfileScreen/ProfileScreen';
import ReportScreen from './../components/ReportScreen/ReportScreen';
import {fadeIn} from 'react-navigation-transitions';
import {GlobalContext} from './../context/GlobalContext';
import {Container} from 'native-base';
import NavigationService from './NavigationService';
import axios from 'axios';

const MainStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    MainMapScreen: {
      screen: MainMapScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    CouponScreen: {
      screen: CouponScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    CouponDetailsScreen: {
      screen: CouponScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    ReportScreen: {
      screen: ReportScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Welcome',
    transitionConfig: () => fadeIn(),
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(MainStack);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API_URL: 'http://bzhk09.usermd.net',
      token: 'hdOHFD743d^f#gdfasf$',
      activeBottomItemName: 'MainMapScreen',
      mapTagList: [],
      showMapTags: false,
      points: [],
      loogedIn: false,
      loogedInUserInfo: [],
      latitude: 52.22977,
      longitude: 21.01178,
    };
  }

  setCoords = (lat, lng) => {
    //console.log(['setCoords', lat, lng]);
    this.setState({latitude: lat, longitude: lng});
  };

  renderPath = pathName => {
    NavigationService.navigate(pathName, {});
  };

  setActiveBottomItemName = bottomItemName => {
    this.setState({activeBottomItemName: bottomItemName});
  };

  componentDidMount = () => {
    this.loadPoints();
    this.loadMapTagList();
  };

  loadMapTagsBasedOnActiveTags = () => {
    const activeTagList = [];

    this.state.mapTagList.map((mapTag, i) => {
      if (mapTag.active) {
        activeTagList += mapTag;
        //console.log(['mapTagList', activeTagList]);
      }
    });
  };

  loadMapTagList = () => {
    let API_URL = this.state.API_URL;

    axios
      .get(API_URL + '/api/tags/list', {
        headers: {Authorization: this.state.token},
      })
      .then(async response => {
        if (response.data) {
          //console.log(['tags', response.data]);
          const tagListResponse = response.data;

          const tagListResponseArr = tagListResponse.map((tag, i) => {
            tag.active = true;
            return tag;
          });

          this.setState({mapTagList: tagListResponseArr});
        }
      })
      .catch(async error => {
        console.log(error);
      });
  };

  setTagStatus = id => {
    const mapTagList = this.state.mapTagList;

    mapTagList.map((tag, i) => {
      if (tag.id === id) {
        tag.active = !tag.active;
      }
    });

    this.setState({mapTagList: mapTagList});
  };

  setShowMapTags = () => {
    this.setState({showMapTags: !this.state.showMapTags});
  };

  loadPoints = () => {
    let API_URL = this.state.API_URL;

    axios
      .get(
        API_URL +
          `/api/points?tags=2,3,4,5,6,7,8&position=${this.state.latitude},${this.state.longitude}`,
        {
          headers: {Authorization: this.state.token},
        },
      )
      .then(async response => {
        //console.log(['response', response]);
        if (response.data) {
          this.setState({points: response.data});
        }
      })
      .catch(async error => {
        console.log(error);
      });
  };

  loadPointByActiveTags = () => {
    const activeTagsIds = [];
    const API_URL = this.state.API_URL;

    this.state.mapTagList.map(async (tag, i) => {
      if (tag.active) {
        await activeTagsIds.push(tag.id);
        //console.log(['tag.id', tag.id]);
      }
    });

    let activeTagIdsJoin = activeTagsIds.join();

    //console.log(['activeTagsIds', activeTagIdsJoin]);

    this.setState({points: []});

    axios
      .get(
        API_URL +
          `/api/points?tags=${activeTagIdsJoin}&position=${this.state.latitude},${this.state.longitude}`,
        {
          headers: {Authorization: this.state.token},
        },
      )
      .then(async response => {
        //console.log(['response loadPointByActiveTags', response]);
        if (response.data) {
          this.setState({points: response.data});
        }
      })
      .catch(async error => {
        console.log(error);
      });
  };

  updateUserPoints = pointAmount => {
    let newLoogedInUserInfo = this.state.loogedInUserInfo;

    //console.log(['pointAmount', pointAmount, newLoogedInUserInfo]);

    newLoogedInUserInfo.points = newLoogedInUserInfo.points - pointAmount;

    this.setState({loogedInUserInfo: newLoogedInUserInfo});
  };

  loginUser = (email, password) => {
    let API_URL = this.state.API_URL;

    axios
      .post(
        API_URL + '/api/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {Authorization: this.state.token},
        },
      )
      .then(async response => {
        if (response.data) {
          //console.log(['login', response]);

          this.setState({loogedInUserInfo: response.data, loogedIn: true});

          NavigationService.navigate('MainMapScreen', {});
        }
      })
      .catch(async error => {
        console.log(error);
      });

    NavigationService.navigate('MainMapScreen', {});
  };

  logoutUser = () => {
    this.setState({loogedInUserInfo: false, loogedIn: false});

    NavigationService.navigate('Welcome', {});
  };

  getUserInfo = () => {
    let API_URL = this.state.API_URL;

    axios
      .get(API_URL + '/api/me', {
        headers: {
          Authorization: this.state.token,
          AuthUser: this.state.loogedInUserInfo.token,
        },
      })
      .then(async response => {
        if (response.data) {
          //console.log(['getUserInfo', response.data]);

          this.setState({loogedInUserInfo: response.data});
        }
      })
      .catch(async error => {
        console.log(error);
      });
  };

  render() {
    const {
      activeBottomItemName,
      mapTagList,
      showMapTags,
      API_URL,
      token,
      points,
      loogedIn,
      loogedInUserInfo,
    } = this.state;
    return (
      <GlobalContext.Provider
        value={{
          API_URL: API_URL,
          renderPath: this.renderPath,
          setActiveBottomItemName: this.setActiveBottomItemName,
          activeBottomItemName: activeBottomItemName,
          mapTagList: mapTagList,
          showMapTags: showMapTags,
          setShowMapTags: this.setShowMapTags,
          setTagStatus: this.setTagStatus,
          token: token,
          points: points,
          activeTagList: mapTagList,
          loginUser: this.loginUser,
          loogedIn: loogedIn,
          loogedInUserInfo: loogedInUserInfo,
          NavigationService: NavigationService,
          loadPointByActiveTags: this.loadPointByActiveTags,
          setCoords: this.setCoords,
          logoutUser: this.logoutUser,
          //updateUserPoints: this.updateUserPoints,
          getUserInfo: this.getUserInfo,
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <Container>
            <AppContainer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Container>
        </SafeAreaView>
      </GlobalContext.Provider>
    );
  }
}
