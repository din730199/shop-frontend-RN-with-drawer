import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from '../header/Header';

export default class Authentication extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => (
        <Header
          openDrawer={() => navigation.openDrawer()}
          navigation={() => navigation.navigate('Search')}
        />
      ),
    };
  };

  state = {isSignIn: true};

  gotoSignIn() {
    this.setState({isSignIn: true});
  }

  signIn() {
    this.setState({isSignIn: true});
  }

  signUp() {
    this.setState({isSignIn: false});
  }

  goHome() {
    this.props.navigation.navigate('Home');
  }
  render() {
    const {isSignIn} = this.state;
    const mainJSX = isSignIn ? (
      <SignIn goHome={this.goHome.bind(this)} />
    ) : (
      <SignUp gotoSignIn={this.gotoSignIn.bind(this)} />
    );
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Xin chào!!!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20,}} >{mainJSX}</ScrollView>
          <View style={styles.controlStyle}>
            <TouchableOpacity
              style={isSignIn ? inactiveStyle : activeStyle}
              onPress={this.signIn.bind(this)}>
              <Text
                style={isSignIn ? styles.activeStyle : styles.inactiveStyle}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={!isSignIn ? inactiveStyle : activeStyle}
              onPress={this.signUp.bind(this)}>
              <Text
                style={!isSignIn ? styles.activeStyle : styles.inactiveStyle}>
                Đăng kí
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faaca8',
  },
  controlStyle: {
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  headerText: {color: '#fff', fontWeight: 'bold', fontSize: 30},
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-around',
  },
  inactiveStyle: {
    color: '#faaca8',
  },
  activeStyle: {
    color: '#fff',
  },
  inactiveStyle2: {
    backgroundColor: '#faaca8',
  },
  activeStyle2: {
    backgroundColor: '#fff',
  },
  signStyle: {
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderColor: '#faaca8',
    borderWidth: 2,
    margin: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
const inactiveStyle = StyleSheet.flatten([
  styles.signStyle,
  styles.inactiveStyle2,
]);
const activeStyle = StyleSheet.flatten([styles.signStyle, styles.activeStyle2]);
