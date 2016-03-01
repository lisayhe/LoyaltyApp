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

var REQUEST_URL = 'http://dev.bruinmobile.com/restaurants.json';

class Root extends Component {
    constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
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
          dataSource: this.state.dataSource.cloneWithRows(responseData.restaurant),
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRestaurant}
        style={styles.listView}/>
    );
  }
 
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading restaurants...
        </Text>
      </View>
    );
  }
 
  renderRestaurant(myrestaurant) {
    return (
      <View style={styles.container}>
       

        <View style={styles.rightContainer}>
          <Text style={styles.title}>{myrestaurant.Name}</Text>
          <Text style={styles.year}>{myrestaurant.Address}</Text>
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
});


AppRegistry.registerComponent('LoyaltyApp', () => LoyaltyApp);

module.exports = Root;