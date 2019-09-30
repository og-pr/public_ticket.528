import React, { Component } from 'react'; 
import { Button,
         Keyboard, 
         StyleSheet, 
         Text, 
         TextInput, 
    		 TouchableOpacity,
    		 TouchableHighlight,
    		 TouchableNativeFeedback,
         View } from 'react-native';

import TEXT_MESSAGE_PAGE from '../TextMessage';  // will load AND run ALL code in file
import firebase, { auth, provider, database } from '../../common/firebase'; // 1 file ; not folder

import Styles from '../../styles/native';
import * as ROUTES from '../../routes/native';
import * as CONSTANTS from '../../common/constants';

var foodOk = ''; /// let or const only accessible inside block created aka block scope. var accessible anywhere

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        foodName: '',
        error: null,
      };
  }

  checkError = (error) => {
    console.log('addview > check error')
    var uxError; // using var so it can be read outside code block
    if (error.code === CONSTANTS.FB_USER_NOT_FOUND) {
      uxError = 1
      console.log(uxError)
      return ( RE_ROUTE_SIGNUP ) 
    } else {
      return ( <Text style={Styles.textRed}>{"\n"}{error.message}</Text> ) 
    }
  } ///...

  checkInput = event => {
    console.log('@ checkInput - name via prop = ' +this.props.location.dataFromParent.user.givenName); 
    Keyboard.dismiss() /// dismiss keyboard 
    // catch one empty field
    if (this.state.foodName.trim() === '') { 
      this.setState(() => ({ foodError: "  ... Food required ... " }));
      return;
    } else {
      this.setState(() => ({ foodError: null }));
      foodOk = '1';
    }
    // form validation BEFORE onSubmit
    if (foodOk==='1') { console.log('o.log > food ok'); this.onSubmit(event); }
  }

  onChange = (valueA, valueB) => {
      console.log('onChange ' +valueA)
      console.log('onChange ' +valueB)
      //e.preventDefault();
      this.setState({
        valueA
      })
  }

  onSubmit = event => {   
    const { foodName } = this.state; // get data via this flow: textinput > state > (this) function
    console.log('addview > name via prop - ' +this.props.location.dataFromParent.user.givenName)
    console.log('addview > food via state - ' +foodName)
    //let itemRef = this.database.ref('items/' + itemId); // desktop
    this.database = firebase.database(); // mobile
    let itemsRef = this.database.ref('items/'); // db = items
    const item = {
      user: this.props.location.dataFromParent.user.givenName,
      title: foodName
    }
    itemsRef.push(item); // works; will create item with random id
    console.log('addview > form - data pushed')
    this.resetForm(); 
  }

  onTest = () => {
    console.log('addview > test')
  }

  // reset or clear state to avoid duplicates
  resetForm = () => {
      console.log('addview > resetting form')
      this.setState({foodName: '',});
      this.props.location.state.loginStatus = 'DONE' // used @ render to show different UI
      console.log('addview > show clear')
  }

//...

  // placeholder (in case refactor needed)
  componentDidMount() {
    console.log('addview > componentDidMount');
  }

  // og.note: can only do redirect @ render (not in other functions)
  render() {
    const { foodName, error } = this.state
    /* 
    console.log('addview @ render - from link props = ' +this.props.location); // returns [object Object]  
    console.dir(this.props.location); // see console for the "to object" from link
    console.dir(this.props.location.state.loginStatus); // via props (in the "to obj" from link) not via state
    console.dir(this.props.location.dataFromParent.user); 
    console.log('name = ' +this.props.location.dataFromParent.user.givenName); 
    */
    const isInvalid = foodName === '';
    //if(this.state.userInfo) { // requires state from child aka child < > child state
    if(this.props.location.state.loginStatus==='OUT') { 
      console.log('addview > IN'); 
      return (
      <View style={Styles.xcontainerBlank}>

          <Text style={[Styles.textBlack, {padding: 10,}]}>Hi {this.props.location.dataFromParent.user.givenName}</Text>

          <TextInput
              type="text"
              style={Styles.textInput}
              placeholder={CONSTANTS.TEXT_FOOD}
              maxLength={20}
              autoCorrect={false}
              autoCapitalize = 'none'
              value={foodName}
              onChangeText={ (foodName) => this.setState( {foodName} ) }
          />

                {!!this.state.foodError && (
                  <View><Text style={Styles.textRed}>{this.state.foodError}</Text></View>
                 )
                }

              <View style={Styles.viewButton}><Text style={Styles.buttonEnter} onPress={ () => this.checkInput() }>{CONSTANTS.TEXT_ENTER}</Text></View>

              {!!this.state.error && (
                  <View style={Styles.textCenter}>{ this.checkError(this.state.error) }</View>
                )
              }

      </View>

        ) /// end return
    } else {
      console.log('addview > key is !OUT aka NOT out'); // show thanks
      return ( <TEXT_MESSAGE_PAGE textBlock={CONSTANTS.TEXT_THANKS} textStyle={Styles.xcontainerBlank} /> ) // works
      /*
      // og.note: return multiple elements
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

export default AddPage 
