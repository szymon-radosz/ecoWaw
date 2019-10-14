import React, {Component} from 'react';
import {
  Container,
  Text,
  Button,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import {Image, View} from 'react-native';
import PanelBottom from './../PanelBottom/PanelBottom';
import {GlobalContext} from './../../context/GlobalContext';
import rubbish from './images/rubbish.jpg';

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
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
};

class ReportScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.disableYellowBox = true;

    return (
      <Container style={styles.container}>
        <View style={{width: '100%'}}>
          <Header>
            <Body>
              <Title>Zgłoś zagrożenie ekologiczne</Title>
            </Body>
          </Header>

          <View style={{width: '90%', marginLeft: '5%', marginRight: '5%'}}>
            <Image
              source={rubbish}
              style={{
                width: null,
                height: 300,
                resizeMode: 'cover',
                marginBottom: 20,
                marginTop: 20,
              }}
            />
          </View>

          <Button rounded center style={styles.loginBtn}>
            <Text>Zgłoś</Text>
          </Button>
        </View>
        <PanelBottom navigation={this.props.navigation} />
      </Container>
    );
  }
}
ReportScreen.contextType = GlobalContext;
export default ReportScreen;
