import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from 'react-native-whc-loading';
import LinearGradient from 'react-native-linear-gradient';

export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  onSignIn() {
    this.props.goHome();
  }

  loginUser = async () => {
    this.refs.loading.show();
    const {email, password} = this.state;

    let response = await axios({
      url: 'https://mainf-app.herokuapp.com/api/users/signIn',
      method: 'POST',
      data: {
        email: email,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);

    if (response.data.status === 200) {
      try {
        await AsyncStorage.setItem('token', response.data.token);
      } catch (e) {
        // saving error
      }
      this.refs.loading.close();
      this.onSignIn();
    } else {
      Alert.alert('Thông báo', response.data.errors[0].msg);
      this.refs.loading.close();
    }
  };

  render() {
    const {inputStyle, bigButton, buttonText} = styles;
    const {email, password} = this.state;
    return (
      <View>
        <TextInput
          style={inputStyle}
          placeholder="Email"
          keyboardType = 'email-address'
          value={email}
          onChangeText={text => this.setState({email: text})}
        />
        <TextInput
          style={inputStyle}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={text => this.setState({password: text})}
          secureTextEntry
        />
        <TouchableOpacity style={bigButton} onPress={this.loginUser}>
          <LinearGradient style={bigButton} colors={['#faaca8', '#ddd6f3']}>
            <Text style={buttonText}>Đăng Nhập</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Loading ref="loading" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingLeft: 10,
    borderColor: '#faaca8',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  bigButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Avenir',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
