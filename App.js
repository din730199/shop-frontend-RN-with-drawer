import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';

import ListProduct from './screens/home/ListProduct';
import ProductDetail from './screens/home/ProductDetail';
import ProductMain from './screens/home/ProductMain';
import Cart from './screens/cart/Cart';
import Profile from './screens/profile/Profile';
import Search from './screens/search/Search';
import Info from './screens/profile/child/Info';
import ChangePass from './screens/profile/child/ChangePass';
import Bill from './screens/profile/child/Bill';
import Contact from './screens/profile/child/Contact';
import Loading from './screens/AuthLoading';
import Authentication from './screens/authentication/Authentication';

const AuthenticationStack = createStackNavigator({
  Authentication: {screen: Authentication},
});

const HomeStack = createStackNavigator({
  ProductMain: {screen: ProductMain},
  ListProduct: {screen: ListProduct},
  ProductDetail: {screen: ProductDetail},
});
const CartStack = createStackNavigator({
  Cart: {screen: Cart},
  ProductDetail: {screen: ProductDetail},
});
const SearchStack = createStackNavigator({
  Search: {screen: Search},
  ProductDetail: {screen: ProductDetail},
});

const ProfileStack = createStackNavigator({
  Profile: {screen: Profile},
  Info: {screen: Info},
  ChangePass: {screen: ChangePass},
  Bill: {screen: Bill},
  Contact: {screen: Contact},
});

const Bottom = createBottomTabNavigator(
  {
    Home: {screen: HomeStack},
    Cart: {screen: CartStack},
    Search: {screen: SearchStack},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Cart') {
          iconName = `ios-cart`;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#faaca8',
      inactiveTintColor: 'gray',
    },
  },
);

const App = createDrawerNavigator(
  {
    Home: {
      screen: Bottom,
      navigationOptions: {
        drawerLabel: 'Trang chủ',
      },
    },
    Authentication: {
      screen: AuthenticationStack,
      navigationOptions: {
        drawerLabel: 'Đăng nhập',
      },
    },
    Profile: {screen: Profile},
    Info: {screen: Info},
    ChangePass: {screen: ChangePass},
    Bill: {screen: Bill},
    Contact: {screen: Contact},
  },
  {
    contentOptions: {
      activeTintColor: '#faaca8',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
    contentComponent: Profile,
  },
);

export default createAppContainer(App);
