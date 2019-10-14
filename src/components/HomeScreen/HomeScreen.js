import React, {Component} from 'react';
import {Container, Content, Text, Button} from 'native-base';
import {View, Image} from 'react-native';
import recyclingIcon from './images/recycling.png';

const styles = {
  alignContent: {
    display: 'flex',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: '#5dcb74',
    display: 'flex',
    alignItems: 'center',
  },
  mainText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 46,
    marginBottom: 60,
  },
  subText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  loginBtn: {
    backgroundColor: '#5dcb74',
    borderColor: '#fff',
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  regsiterBtn: {
    backgroundColor: '#fff',
    color: '#5dcb74',
    borderColor: '#5dcb74',
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageContainer: {justifyContent: 'center', alignItems: 'center'},
  imageContent: {
    width: 70,
    height: 70,
    margin: 20,
  },
  btnsContainer: {flexDirection: 'row', width: '100%', marginTop: 80},
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.disableYellowBox = true;

    return (
      <Container style={styles.mainContainer}>
        <Content contentContainerStyle={styles.contentContainer} padder>
          <Text style={styles.mainText}>EcoWaw</Text>
          <Text style={styles.subText}>Czysta Warszawa</Text>
          <View style={styles.imageContainer}>
            <Image source={recyclingIcon} style={styles.imageContent} />
          </View>
          <Text style={styles.subText}>Lepsza Warszawa</Text>
          <View style={styles.btnsContainer}>
            <Button
              rounded
              style={styles.loginBtn}
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text>Logowanie</Text>
            </Button>
            <Button bordered rounded success style={styles.regsiterBtn}>
              <Text>Rejestracja</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
