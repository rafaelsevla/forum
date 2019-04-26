import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Input } from '../../components';
import styles from './styles';

class Comment extends React.Component {
  static navigationOptions = {
    title: 'Comentar Tópico'
  };

  state = {
    topic: '',
    description: ''
  };
  async componentDidMount() {
    const topic = this.props.navigation.state.params.topic;
    await this.setState({ topic });
  }
  render() {
    const {
      navigation: { navigate, state }
    } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Input
            stylesContainer={styles.input}
            stylesInput={{ height: 150 }}
            label="Comentário"
            multiline={true}
            numberOfLines={4}
            value={this.state.description}
            onChange={value => this.setState({ description: value })}
          />
          <Button
            style={styles.button}
            text="Comentar"
            onClick={() => navigate('Topics')}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Comment;
