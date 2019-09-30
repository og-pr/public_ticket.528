import React, { Component } from 'react'; 
import { Button,
         FlatList,
         Keyboard, 
         SafeAreaView,
         ScrollView, 
         StyleSheet, 
         Text, 
         TextInput, 
		 TouchableOpacity,
		 TouchableHighlight,
		 TouchableNativeFeedback,
         View } from 'react-native';

import { Link } from 'react-router-native' // using old mechanism
import TEXT_MESSAGE_PAGE from '../TextMessage';  // will load AND run ALL code in file
import firebase, { auth, provider, database } from '../../common/firebase'; // 1 file ; not folder

import Styles from '../../styles/native';
import * as ROUTES from '../../routes/native';
import * as CONSTANTS from '../../common/constants';

class ListPage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			items: [],
			user: null, 
	        error: null,
	      };
  	}

	ListItems = ({ title, user, id }) => { // use inside class
		//const ListItems = ({ title, user }) => { // use if outside class
		console.log('@ list items')
		console.log(title)
		console.log(user)
		console.log(id)
		console.log('user')
		console.log(this.props.location.dataFromParent.user.givenName)
		console.log('user')

		if (user === this.props.location.dataFromParent.user.givenName) {
			// user items
			return (
			  <Text style={Styles.textList}>
			  	Food: {title}{"\n"}Brought by: {user}{"\n\n"}<Text style={Styles.buttonRemove} onPress={ () => this.RemoveItem(id) }>{CONSTANTS.TEXT_REMOVE}</Text>
			  </Text>
			) /// end return
		} else {
			// other items
			return (
			  <Text style={Styles.textList}>
			  	Food: {title}{"\n"}Brought by: {user}{"\n"}
			  </Text>
			) /// end return
		}
	}

	onTest = (id) => {
	  	console.log('listview > onTest clicked ' +id)
	} 

	RemoveItem = (id) => {
	  	console.log('listview > remove item ' +id)
		//const itemRef = firebase.database().ref(`/items/${itemId}`); // desktop
	    const itemsRef = this.database.ref('/items/'+id); // mobile - works
		itemsRef.remove();
	} 

//...

  	componentDidMount() {
	    console.log('listview > componentDidMount');

	    this.database = firebase.database(); // @ constructor or didMount ?

	    // from Web, file AppView.js
	    //const itemsRef = firebase.database().ref('items'); // web
	    const itemsRef = this.database.ref('items/'); // mobile
	    itemsRef.on('value', (snapshot) => {
	      let items = snapshot.val();
	      let newState = [];
	      for (let item in items) {
	    	console.log('item = ' +item);
	        newState.push({
	          id: item,
	          title: items[item].title,
	          user: items[item].user
	        });
	      }
	      this.setState({
	        items: newState
	      });
	    }); // end itemsRef.on
  	}

//...

  // og.note: can only do redirect @ render (not in other functions)
  render() {
    const { items, error } = this.state;
    /*
    console.log('listview @ render - from link props = ' +this.props.location); // returns [object Object]  
    console.dir(this.props.location.state.loginStatus); // via props (in the "to obj" from link) not via state
    console.log('name = ' +this.props.location.dataFromParent.user.givenName); 
    console.log('items = ' +this.state.items);  // firebase data is array [] @ state
    console.dir(items);  // firebase data is array [] @ state
    */
    if(this.props.location.state.loginStatus==='OUT') { 
      console.log('listview > IN'); 
      return (
	      <View style={Styles.xcontainerList}>
	        <Text style={[Styles.textBlack, {padding: 0, marginBottom: 10,}]}>Hi {this.props.location.dataFromParent.user.givenName}. This is the list...</Text>

		    <ScrollView contentContainerStyle={{paddingBottom: 360}}>
		      <FlatList
		        data={this.state.items}
		        renderItem={({ item }) => <this.ListItems title={item.title} user={item.user} id={item.id} />}
		        keyExtractor={item => item.id}
		      />
		    </ScrollView>

	      </View>
        ) /// end return
    } else {
      console.log('listview > key is !OUT aka NOT out'); // show thanks
      // og.note: return multiple elements
      //return ( <Redirect to='/list' /> ) // works
      return ( <TEXT_MESSAGE_PAGE textBlock={CONSTANTS.AN_ERROR} textStyle={Styles.xcontainerBlank} /> ) // works
      /*
      return (
        [ 
        <TEXT_MESSAGE_PAGE textBlock={CONSTANTS.TEXT_CLEAR} />,
        <TEXT_MESSAGE_PAGE textBlock={CONSTANTS.AN_ERROR} />
        ]
        ) /// end return
      */
    }
  } // end render
} // end class

export default ListPage 
