LoyaltyApp# LoyaltyApp


'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  Text,
  View, 
  ListView,
  DatePickerIOS,
  Date,
} from 'react-native';

var React = require('react-native');
var {
  Navigator,
  ScrollView,
  StyleSheet,
Text,
  TouchableHighlight,
} = React;

REQUEST_URL = ''

class LoyaltyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      loaded: false,
    };
  }
 
  componentDidMount() {
    this.fetchData();
  }
 
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: responseData,
          loaded: true,
        });
      })
      .done();
  }
 
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
 
    return (
      this.renderResaurant(this.state.data)
    );
  }
 
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Restaurants...
        </Text>
      </View>
    );
  }
 
  renderRestaurant(myrestaurant) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'PICTUREURI'}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{myrestaurant.Name}</Text>
          <Text style={styles.year}>{myrestaurant.Address}</Text>
           <Text style={styles.year}>{myrestaurant.Hours}</Text>
            <Text style={styles.year}>{myrestaurant.Category}</Text>
        </View>
      </View>
    );
  }
}
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderLeftWidth: 20,
    borderLeftColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    borderLeftWidth: 50,
    borderLeftColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
    color: 'blue',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },