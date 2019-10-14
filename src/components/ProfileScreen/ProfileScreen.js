import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Icon,
} from 'native-base';
import {View} from 'react-native';
import PanelBottom from './../PanelBottom/PanelBottom';
import {GlobalContext} from './../../context/GlobalContext';
import QRCode from 'react-native-qrcode-svg';
import OrderHistory from './OrderHistory/OrderHistory';
import axios from 'axios';

const styles = {
  mainContainer: {margin: 10},
  myDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5dcb74',
  },
  nameText: {fontSize: 16, marginBottom: 3},
  emailText: {fontSize: 16, marginBottom: 10},
  pointsText: {fontSize: 16, marginBottom: 40},
  qrText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5dcb74',
  },
  loginBtn: {
    backgroundColor: '#5dcb74',
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
};

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOrderHistory: false,
      orderHistory: [],
    };
  }

  loadOrderHistory = () => {
    let API_URL = this.context.API_URL;

    axios
      .get(API_URL + '/api/history', {
        headers: {
          Authorization: this.context.token,
          AuthUser: this.context.loogedInUserInfo.token,
        },
      })
      .then(async response => {
        if (response.data) {
          //console.log(['loadOrderHistory', response.data]);

          this.setState({orderHistory: response.data[0]});
        }
      })
      .catch(async error => {
        console.log(error);
      });
  };

  setShowOrderHistory = () => {
    this.loadOrderHistory();
    this.setState({showOrderHistory: !this.state.showOrderHistory});
  };

  componentDidMount = () => {
    this.context.getUserInfo();
  };

  render() {
    const {showOrderHistory, orderHistory} = this.state;
    return (
      <Container>
        <Header>
          <Left>
            {showOrderHistory && (
              <Button transparent onPress={() => this.setShowOrderHistory()}>
                <Icon name="arrow-back" />
              </Button>
            )}
          </Left>
          <Body>
            <Title>Profil</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          {!showOrderHistory ? (
            <View style={styles.mainContainer}>
              <Text style={styles.myDataText}>Moje Dane</Text>
              <Text style={styles.nameText}>
                Nazwa: {this.context.loogedInUserInfo.name}
              </Text>
              <Text style={styles.emailText}>
                Email: {this.context.loogedInUserInfo.email}
              </Text>

              <Text style={styles.pointsText}>
                {this.context.loogedInUserInfo.points} punktów
              </Text>

              <Text style={styles.qrText}>Mój QR Code:</Text>
              <QRCode value={this.context.loogedInUserInfo.email} />
              <View style={{marginTop: 40}}>
                <Button
                  rounded
                  center
                  style={styles.loginBtn}
                  onPress={() => this.setShowOrderHistory()}>
                  <Text>Pokaż historię kuponów</Text>
                </Button>

                <Button rounded center style={styles.loginBtn}>
                  <Text>Zamów odbiór śmieci</Text>
                </Button>

                <Button
                  rounded
                  center
                  style={styles.loginBtn}
                  onPress={() => this.context.logoutUser()}>
                  <Text>Wyloguj</Text>
                </Button>
              </View>
            </View>
          ) : (
            <OrderHistory orderHistory={orderHistory} />
          )}
        </Content>

        <PanelBottom navigation={this.props.navigation} />
      </Container>
    );
  }
}
ProfileScreen.contextType = GlobalContext;
export default ProfileScreen;
