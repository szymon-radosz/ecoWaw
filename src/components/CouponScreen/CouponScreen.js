import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Header,
  Left,
  Body,
  Title,
  Right,
} from 'native-base';
import {View} from 'react-native';
import PanelBottom from './../PanelBottom/PanelBottom';
import axios from 'axios';
import {GlobalContext} from './../../context/GlobalContext';
import CouponListItem from './CouponListItem/CouponListItem';
import CouponDetails from './CouponDetails/CouponDetails';
import QrCodeCoupon from './QrCodeCoupon/QrCodeCoupon';

const styles = {};

class CouponScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      couponList: [],
      showCouponDetails: false,
      activeCouponDetailsData: [],
      showQrCode: false,
    };
  }

  unlockCoupon = (id, pointAmount) => {
    let API_URL = this.context.API_URL;

    /*console.log([
      'unlockCoupon',
      this.context.API_URL,
      this.context.token,
      this.context.loogedInUserInfo.token,
      id,
      API_URL + `/api/coupons/unlock/${id}`,
    ]);*/

    axios
      .post(
        API_URL + `/api/coupons/unlock/${id}`,
        {},
        {
          headers: {
            Authorization: this.context.token,
            AuthUser: this.context.loogedInUserInfo.token,
          },
        },
      )
      .then(async response => {
        if (response.data) {
          //console.log(['unlockCoupon', response]);

          this.context.getUserInfo();

          this.setCouponDetailsData(id, false);
        }
      })
      .catch(async error => {
        console.log(error.response);
      });
  };

  setShowQrCode = () => {
    //console.log('setShowQrCode');
    this.setState({
      showQrCode: !this.state.showQrCode,
    });
  };

  setShowCouponDetails = () => {
    this.setState({
      showCouponDetails: !this.state.showCouponDetails,
      showQrCode: false,
    });
  };

  setCouponDetailsData = (id, callSetShowCouponDetails) => {
    /*console.log([
      'this.context.loogedInUserInfo.token',
      this.context.loogedInUserInfo.token,
      this.context.API_URL,
      id,
    ]);*/
    let API_URL = this.context.API_URL;

    axios
      .get(API_URL + `/api/coupons/${id}`, {
        headers: {
          Authorization: this.context.token,
          AuthUser: this.context.loogedInUserInfo.token,
        },
      })
      .then(async response => {
        if (response.data) {
          //console.log(['setCouponDetailsData', response]);

          this.setState({activeCouponDetailsData: response.data});

          if (callSetShowCouponDetails) {
            this.setShowCouponDetails();
          }
        }
      })
      .catch(async error => {
        console.log(error);
      });
  };

  loadCouponList = () => {
    axios
      .get(this.context.API_URL + '/api/coupons/list', {
        headers: {Authorization: this.context.token},
      })
      .then(async response => {
        if (response.data) {
          //console.log(['loadCouponList', response.data]);

          this.setState({couponList: response.data});
        }
      })
      .catch(async error => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.loadCouponList();
  };

  setPageTitle = title => {
    this.setState({pageTitle: title});
  };

  render() {
    const {
      couponList,
      showCouponDetails,
      activeCouponDetailsData,
      showQrCode,
    } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            {showCouponDetails && !showQrCode && (
              <Button transparent onPress={() => this.setShowCouponDetails()}>
                <Icon name="arrow-back" />
              </Button>
            )}

            {showQrCode && (
              <Button transparent onPress={() => this.setShowQrCode()}>
                <Icon name="arrow-back" />
              </Button>
            )}
          </Left>

          <Body>
            <Title>Kupony</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <View style={{margin: 10}}>
            {couponList &&
              !showCouponDetails &&
              !showQrCode &&
              couponList.length > 0 &&
              couponList.map((coupon, i) => {
                return (
                  <CouponListItem
                    key={`coupon-${i}`}
                    coupon={coupon}
                    setCouponDetailsData={this.setCouponDetailsData}
                  />
                );
              })}

            {showCouponDetails && !showQrCode && (
              <CouponDetails
                coupon={activeCouponDetailsData}
                API_URL={this.context.API_URL}
                setShowQrCode={this.setShowQrCode}
                unlockCoupon={this.unlockCoupon}
              />
            )}

            {showQrCode && (
              <QrCodeCoupon
                coupon={activeCouponDetailsData}
                setShowQrCode={this.setShowQrCode}
              />
            )}
          </View>
        </Content>

        <PanelBottom navigation={this.props.navigation} />
      </Container>
    );
  }
}

CouponScreen.contextType = GlobalContext;
export default CouponScreen;
