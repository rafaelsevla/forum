import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableHighlight, View, Alert } from 'react-native';
import { Button, Input } from '../../components';
import styles from './styles';
import { loginUser } from './duck';

class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  state = {
    username: '',
    password: ''
  };

  handleSubmitSignIn = () => {
    const {
      navigation: { navigate }
    } = this.props;

    this.props
      .loginUser(this.state)
      .then(resp => navigate('Welcome'))
      .catch(() => {
        Alert.alert('DEU RUIM');
      });
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={styles.container}>
        <Input
          stylesContainer={styles.input}
          label="Email"
          value={this.state.email}
          onChange={value => this.setState({ username: value })}
        />
        <Input
          stylesContainer={styles.input}
          label="Senha"
          security
          value={this.state.password}
          onChange={value => this.setState({ password: value })}
        />
        <TouchableHighlight onPress={() => navigate('SignUp')}>
          <View style={styles.newAccount}>
            <Text>Não tem uma conta?</Text>
            <Text
              style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
            >
              {' '}
              Crie agora.
            </Text>
          </View>
        </TouchableHighlight>

        <Button
          style={styles.button}
          onPress={() => this.handleSubmitSignIn()}
          text="LOGIN"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
