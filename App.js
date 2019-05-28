/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {

  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Text,
  NetInfo,
  ToastAndroid
} from 'react-native';
import RootStack from './Rootstack'
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { i: true }
    console.disableYellowBox = true
   
  }
  componentDidMount() {
    setTimeout(() => this.setState({ i: false }), 2000);
  }
  render() {
    if (this.state.i)
      return (

        <Image style={styles.img} source={require('./src/raw/images/Movie-Guru1.png')} />
      );
    else
      return (
        <RootStack />

      )
  }
}

const styles = StyleSheet.create({
  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }

});
