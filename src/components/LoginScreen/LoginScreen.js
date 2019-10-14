import React, {Component} from 'react';
import {
  Container,
  Form,
  Header,
  Input,
  Content,
  Item,
  Button,
  Left,
  Icon,
  Body,
  Title,
  Right,
  Text,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GlobalContext} from './../../context/GlobalContext';

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
  formContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    state = {
      email: '',
      password: '',
    };
  }

  onChange(field, value) {
    this.setState({[field]: value});
  }

  loginUser = () => {
    let email = this.state.email;
    let password = this.state.password;

    if (email && password) {
      this.context.loginUser(email, password);
    }
  };

  render() {
    console.disableYellowBox = true;

    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack(null)}>
              <Button transparent>
                <Icon name="arrow-back" />
              </Button>
            </TouchableOpacity>
          </Left>

          <Body>
            <Title>Logowanie</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Form style={styles.formContainer}>
            <Item floatingLabel last>
              <Input
                placeholder="Email"
                onChangeText={e => this.onChange('email', e)}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel last>
              <Input
                placeholder="Hasło"
                onChangeText={e => this.onChange('password', e)}
                autoCapitalize="none"
              />
            </Item>
          </Form>

          <Button
            rounded
            center
            style={styles.loginBtn}
            onPress={() => this.loginUser()}>
            <Text>Logowanie</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

LoginScreen.contextType = GlobalContext;
export default LoginScreen;
