import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {height} = Dimensions.get('window');

export default class Header extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.row1}>
          <TouchableOpacity onPress={this.props.openDrawer}>
            <Ionicons name="ios-menu" size={25} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>DRESS FOR YOU</Text>
          <View />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Bạn mặc gì hôm nay?"
          underlineColorAndroid="transparent"
          onFocus={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height / 9,
    backgroundColor: '#faaca8',
    padding: height / 80,
    justifyContent: 'space-around',
  },
  row1: {flexDirection: 'row', justifyContent: 'space-between'},
  textInput: {
    height: height / 23,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingVertical: 0,
  },
  titleStyle: {color: '#FFF', fontFamily: 'Avenir', fontSize: height / 35},
});
