import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import QRCode from 'react-native-qrcode-svg';

const styles = {
  loginBtn: {},
  partnerLogo: {},
};

const QrCodeCoupon = props => {
  return (
    <React.Fragment>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 30,
          }}>
          {props.coupon.item.partner.name} - {props.coupon.item.name}
        </Text>

        <QRCode value={props.coupon.value.values[0].value} />

        <Text
          style={{
            marginTop: 30,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#5dcb74',
          }}>
          Kod: {props.coupon.value.values[0].value}
        </Text>
      </View>
    </React.Fragment>
  );
};

export default QrCodeCoupon;
