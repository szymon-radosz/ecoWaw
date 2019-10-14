import React from 'react';
import {View, Image} from 'react-native';
import {Button, Text} from 'native-base';

const styles = {
  loginBtn: {
    backgroundColor: '#5dcb74',
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    justifyContent: 'center',
  },
  partnerLogo: {width: 70, height: 70, alignItems: 'center', marginLeft: 20},
};

const CouponListItem = props => {
  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          marginBottom: 30,
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: '#e5e5e5',
        }}>
        <Image
          style={styles.partnerLogo}
          source={{
            uri: `${props.API_URL}${props.coupon.item.partner.logo_url}`,
          }}
        />
        <View
          style={{
            marginLeft: 30,
            flex: 1,
            justifyContent: 'center',
            //alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#5dcb74'}}>
            {props.coupon.item.partner.name}
          </Text>
          <Text style={{fontSize: 14}}>{props.coupon.item.description}</Text>
        </View>
      </View>
      <View>
        <Image
          style={{
            width: null,
            height: 300,
            resizeMode: 'cover',
            marginBottom: 20,
          }}
          source={{
            uri: `${props.API_URL}${props.coupon.item.img_url}`,
          }}
        />
        <Text style={{marginBottom: 10}}>{props.coupon.item.partner.desc}</Text>
      </View>
      {props.coupon.value.values && props.coupon.value.values.length > 0 ? (
        <Button
          onPress={() => props.setShowQrCode()}
          rounded
          center
          style={styles.loginBtn}>
          <Text>Pokaż kod</Text>
        </Button>
      ) : (
        <Button
          onPress={() =>
            props.unlockCoupon(
              props.coupon.item.id,
              props.coupon.item.points_cost,
            )
          }
          rounded
          center
          style={styles.loginBtn}>
          <Text>Odkryj kod za {props.coupon.item.points_cost} punktów</Text>
        </Button>
      )}
    </React.Fragment>
  );
};

export default CouponListItem;
