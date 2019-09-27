import React, { Component } from 'react'; // required if class components used
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Styles from '../../styles/native';
import * as ROUTES from '../../routes/native';
import * as CONSTANTS from '../../common/constants';

class TextMessagePage extends Component {
  render() {
    return (
        <View style={this.props.textStyle}>
          <Text>{this.props.textBlock}</Text>
        </View>
    );
  }
}

export default TextMessagePage 
