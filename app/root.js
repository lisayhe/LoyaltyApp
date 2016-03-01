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
  Navigator,
  ScrollView,
  TouchableHighlight,
} from 'react-native';


var REQUEST_URL = 'http://dev.bruinmobile.com/restaurants.json';

class FeedView extends Component {
	onPressFeed() {
        this.props.navigator.push({
            name: 'WelcomeView',
            component: WelcomeView
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this.onPressFeed.bind(this)}>
                    Feed View!
                </Text>
            </View>
        );
    }
}

class Root extends Component {
	 render() {
        return (
            <Navigator
                initialRoute={{name: 'WelcomeView', component: WelcomeView}}
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    // count the number of func calls
                    console.log(route, navigator); 

                    if (route.component) {
                        return React.createElement(route.component, { navigator });
                    }
                }}/>
        );
    }




}

class WelcomeView extends React.Component {
    onPressFeed() {
        this.props.navigator.push({
            name: 'FeedView',
            component: FeedView
        });
    }

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
    	<View style={styles.container}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRestaurant}
        style={styles.listView}/>
        
        	<Text onPress={this.onPressFeed.bind(this)}>
                    Go to feed!
                </Text>
            </View>
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
          <Text style={styles.year}>
          {myrestaurant.Address}</Text>

        </View>
      </View>
    );
  }
/*
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome View!
                </Text>

                <Text onPress={this.onPressFeed.bind(this)}>
                    Go to feed!
                </Text>
            </View>
        );
    }
    */
}

var styles = StyleSheet.create({
	messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
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
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  }
});


AppRegistry.registerComponent('LoyaltyApp', () => LoyaltyApp);

module.exports = Root;

