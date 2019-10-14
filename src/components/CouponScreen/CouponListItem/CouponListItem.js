import React, {useContext} from 'react';
import {GlobalContext} from './../../../context/GlobalContext';
import websiteImage from './../images/internet.png';
import star from './../images/star.png';
import {View, Image, Text, TouchableHighlight, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = {
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#2f313f',
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
  partnerLogo: {width: 70, height: 70, alignItems: 'center', marginLeft: 20},
  couponDesc: {
    color: '#5dcb74',
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 2,
  },
  couponExp: {color: '#2f313f', fontSize: 12, paddingBottom: 5},
  starContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  websiteLinkContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
};
const CouponListItem = props => {
  const context = useContext(GlobalContext);
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        props.setCouponDetailsData(props.coupon.id, true);
      }}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Image
          style={styles.partnerLogo}
          source={{uri: `${context.API_URL}${props.coupon.partner.logo_url}`}}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 20}}>
          <View>
            <Text style={styles.couponDesc}>{props.coupon.name}</Text>
            <Text style={styles.couponExp}>
              Wygasa: {props.coupon.expiry_date}
            </Text>
            <View style={styles.starContainer}>
              <Image
                source={star}
                style={{width: 20, resizeMode: 'contain', marginRight: 7}}
              />
              <Text style={{color: '#2f313f', fontSize: 14}}>
                {props.coupon.points_cost} punktów
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.websiteLinkContainer}>
        <TouchableHighlight
          onPress={() => {
            Linking.openURL(props.coupon.offert_url);
          }}
          underlayColor={'#fff'}>
          <Image style={{width: 25, height: 25}} source={websiteImage} />
        </TouchableHighlight>
      </View>
    </TouchableOpacity>
  );
};

export default CouponListItem;
