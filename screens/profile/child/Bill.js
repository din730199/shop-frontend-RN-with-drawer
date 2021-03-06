import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Bill extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    list: null,
    token: '',
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');

    this.setState({token: token});
    this.getListBill();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.list !== this.state.list) {
      const token = await AsyncStorage.getItem('token');

      this.setState({token: token});
      this.getListBill();
    }
  }

  getListBill = async () => {
    var response = await axios({
      url: `https://mainf-app.herokuapp.com/api/bill/getListBillById`,
      headers: {
        'auth-token': this.state.token,
        'Content-Type': 'application/json',
      },
    });
    this.setState({list: response.data.data});
  };

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
  }

  gfg_Run = (today) => {
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
    return today;
  };

  renderItems(item) {
    return (
      <View style={styles.orderRow} key={item._id}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>Mã đơn hàng :</Text>
          <Text style={{color: '#faaca8'}}>{item._id}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>Ngày đặt hàng :</Text>
          <Text style={{color: '#faaca8'}}>{this.gfg_Run(new Date(item.dateOrder))}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>Trạng thái :</Text>
          <Text style={{color: '#faaca8'}}>
            {item.status == 0
              ? 'Chưa thanh toán'
              : item.status == 1
              ? 'Đã thanh toán'
              : 'Đã hủy'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>Tổng tiền :</Text>
          <Text style={{color: '#faaca8', fontWeight: 'bold'}}>
            {this.currencyFormat(item.total)}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapperHeader}>
          <View style={styles.rowHeader}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name={'ios-arrow-back'} size={25} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.titleStyleHeader}> Hóa đơn </Text>
            <View />
          </View>
        </View>
        <View>
          {this.state.list ? (
            <View style={styles.container}>
              <FlatList
                data={this.state.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => this.renderItems(item)}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 10,
                padding: 10,
                borderRadius: 2,
                shadowColor: '#3B5458',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.2,
                justifyContent: 'center',
              }}>
              <Entypo
                name="text-document-inverted"
                color="#faaca8"
                size={350}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapperHeader: {
    height: height / 15,
    backgroundColor: '#faaca8',
    justifyContent: 'space-around',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleStyleHeader: {
    color: '#FFF',
    fontFamily: 'Avenir',
    fontSize: height / 35,
  },
  body: {flex: 10, backgroundColor: '#F6F6F6'},
  orderRow: {
    height: width / 3,
    backgroundColor: '#FFF',
    margin: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around',
  },
});
