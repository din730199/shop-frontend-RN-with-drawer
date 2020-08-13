import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import Header from '../header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
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

  state = {
    name: '',
    email: '',
    token: '',
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    this.setState({token: token});

    this.getInfo(token);
  }

  async componentDidUpdate(prevProps, prevState) {
    const token = await AsyncStorage.getItem('token');
    if (prevState.token !== token) {
      this.setState({token: token});

      this.getInfo(token);
    }
  }

  getInfo = async token => {
    axios({
      url: `https://mainf-app.herokuapp.com/api/users/getInfoUser`,
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        this.setState({
          name: res.data.data.name,
          email: res.data.data.email,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  logout = async () => {
    await AsyncStorage.removeItem('token');
    this.setState({token: ''});
    this.props.navigation.navigate('Authentication');
  };

  render() {
    const loginJSX = (
      <View style={{flex: 1}}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://previews.123rf.com/images/arhimicrostok/arhimicrostok1709/arhimicrostok170901259/86905920-connection-mark-user-sign-icon-person-symbol-human-avatar-flat-style-.jpg',
                }}
                size={70}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{this.state.name}</Title>
                <Caption style={styles.caption}>{this.state.email}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              icon={({color, size}) => (
                <Ionicons name="md-person" color="#faaca8" size={size} />
              )}
              label="Thông tin cá nhân"
              onPress={() => this.props.navigation.navigate('Info')}
            />
            <Drawer.Item
              icon={({color, size}) => (
                <Ionicons name="md-lock" color="#faaca8" size={size} />
              )}
              label="Đổi mật khẩu"
              onPress={() => this.props.navigation.navigate('ChangePass')}
            />
            <Drawer.Item
              icon={({color, size}) => (
                <Ionicons name="ios-list-box" color="#faaca8" size={size} />
              )}
              label="Hóa đơn"
              onPress={() => this.props.navigation.navigate('Bill')}
            />
            <Drawer.Item
              icon={({color, size}) => (
                <Ionicons
                  name="md-information-circle"
                  color="#faaca8"
                  size={size}
                />
              )}
              label="Thông tin liên hệ"
              onPress={() => this.props.navigation.navigate('Contact')}
            />
          </Drawer.Section>
        </View>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <Drawer.Item
            icon={({color, size}) => (
              <Icon name="exit-to-app" color="#faaca8" size={size} />
            )}
            label="Đăng xuất"
            onPress={this.logout}
          />
        </Drawer.Section>
      </View>
    );
    const logoutJSX = (
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}} />
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <Drawer.Item
            icon={({color, size}) => (
              <Ionicons name="ios-home" color="#faaca8" size={size} />
            )}
            label="Trang chủ"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Drawer.Item
            icon={({color, size}) => (
              <Icon name="login-variant" color="#faaca8" size={size} />
            )}
            label="Đăng nhập"
            onPress={() => this.props.navigation.navigate('Authentication')}
          />
        </Drawer.Section>
      </View>
    );
    const mainJSX = this.state.token ? loginJSX : logoutJSX;
    return <View style={styles.wrapper}>{mainJSX}</View>;
  }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {flex: 1},
  drawerSection: {
    marginTop: 15,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#faaca8',
    borderTopWidth: 1,
    justifyContent: 'flex-end',
  },
  drawerContent: {
    flex: 1,
  },
});
