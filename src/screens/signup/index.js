import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableHighlight, View, Alert } from 'react-native';
import { Button, Input } from '../../components';
import styles from './styles';
import { createUser } from './duck';

class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Criar Conta'
  };

  state = {
    name: '',
    email: '',
    password: '',
    invalid: {
      name: false,
      email: false,
      password: false
    }
  };

  validation = () => {
    let invalid = { name: false, email: false, password: false };
    if (!this.state.name) {
      invalid['name'] = true;
    }
    if (!this.state.email) {
      invalid['email'] = true;
    }
    if (!this.state.password) {
      invalid['password'] = true;
    }
    this.setState({ invalid: { ...this.state.invalid, ...invalid } });

    return 'name' in invalid || 'email' in invalid || 'password' in invalid;
  };

  handleSubmitSignUp = () => {
    const {
      navigation: { navigate }
    } = this.props;

    if (this.validation()) {
      this.props
        .createUser(this.state.name, this.state.email, this.state.password)
        .then(resp => navigate('Topics'))
        .catch(() => {
          Alert.alert('Fire 🔥');
        });
    }
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={styles.container}>
        <Input
          stylesContainer={styles.input}
          label="Nome"
          value={this.state.name}
          onChange={value => this.setState({ name: value })}
          messageInvalid="Nome obrigatório"
          invalid={this.state.invalid.name}
        />
        <Input
          stylesContainer={styles.input}
          label="E-mail"
          value={this.state.email}
          onChange={value => this.setState({ email: value })}
          messageInvalid="Email obrigatório"
          invalid={this.state.invalid.email}
        />
        <Input
          stylesContainer={styles.input}
          label="Senha"
          security
          value={this.state.password}
          onChange={value => this.setState({ password: value })}
          messageInvalid="Senha obrigatório"
          invalid={this.state.invalid.password}
        />

        <Button
          style={styles.button}
          loading={false}
          onPress={() => this.handleSubmitSignUp()}
          text="Criar Conta"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ loading: state.newUser.loading });

const mapDispatchToProps = {
  createUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
