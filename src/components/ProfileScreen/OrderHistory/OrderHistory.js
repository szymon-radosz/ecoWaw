import React from 'react';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';
import {View} from 'react-native';

const styles = {
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
};

const OrderHistory = props => {
  return (
    <View>
      <Text style={styles.mainText}>Historia kuponów</Text>

      {props.orderHistory &&
        props.orderHistory.history &&
        props.orderHistory.history.length > 0 &&
        props.orderHistory.history.map((order, i) => {
          return (
            <View
              key={`order-history-${i}`}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#2f313f',
                paddingTop: 5,
                paddingBottom: 5,
                marginBottom: 10,
                marginRight: 10,
                marginLeft: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 8,
                paddingBottom: 8,
              }}>
              <Text style={{fontSize: 16, color: '#2f313f', marginBottom: 5}}>
                {order.history_event}
              </Text>
              <Text style={{fontSize: 12, color: '#2f313f', marginBottom: 8}}>
                {order.created_at}
              </Text>
              <Text style={{fontSize: 13, color: '#2f313f'}}>
                {order.reduce_points} punktów
              </Text>
            </View>
          );
        })}
    </View>
  );
};

export default OrderHistory;
