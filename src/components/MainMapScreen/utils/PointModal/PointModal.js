import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import closeImg from './images/close.png';
import {TouchableHighlight} from 'react-native-gesture-handler';

const styles = {
  modalContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    width: '90%',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '10%',
    height: 370,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2f313f',
    borderRadius: 10,
  },
  closeBtnContainer: {position: 'absolute', top: -10, right: -10},
  closeImgContainer: {
    width: 35,
    height: 35,
  },
  textContainer: {margin: 15},
  nameText: {fontSize: 18, marginBottom: 7},
  descText: {fontSize: 14, marginBottom: 7},
  addressText: {fontSize: 14},
};

const PointModal = props => {
  useEffect(() => {
    //console.log(['PointModal', props]);
  }, [props]);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.closeBtnContainer}>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => props.setShowPointModal()}>
          <Image source={closeImg} style={styles.closeImgContainer} />
        </TouchableHighlight>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{props.point[0].name}</Text>
        <Text style={styles.descText}>{props.point[0].desc}</Text>

        <Text style={styles.addressText}>{props.point[0].address}</Text>
        <Text style={{fontSize: 14, marginBottom: 25}}>
          Tel: {props.point[0].phone}
        </Text>

        {props.point[0].tags_list && props.point[0].tags_list.length > 0 && (
          <Text style={{textAlign: 'center', marginBottom: 10}}>
            Możesz oddać:
          </Text>
        )}
        {props.point[0].tags_list.map((tag, i) => {
          return (
            <Text
              key={`tag-name-${i}`}
              style={{
                borderWidth: 2,
                borderColor: '#5dcb74',
                borderRadius: 15,
                padding: 5,
                textAlign: 'center',
                width: '100%',
                marginBottom: 10,
              }}>
              {tag.item.name}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default PointModal;
