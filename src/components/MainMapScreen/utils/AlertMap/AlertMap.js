import React from 'react';
import {View, Text} from 'react-native';

const AlertMap = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        position: 'absolute',
        top: 20,
        right: '5%',
        left: '5%',
        borderRadius: 400,
        borderWidth: 2,
        borderColor: '#5dcb74',
        backgroundColor: '#5dcb74',
        width: '90%',
        height: 40,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          color: '#fff',
          fontWeight: 'bold',
        }}>
        Mobilny punkt - 'Gabaryty' - 13.10.2019r. 22:15-22:30 ul. Złota 7
      </Text>
    </View>
  );
};

export default AlertMap;
