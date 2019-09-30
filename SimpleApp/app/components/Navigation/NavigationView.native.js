// this is the PARENT ; all others are Childs
// all react-native-google-signin should be in 1 file
import React, { Component } from 'react'; // required if class components used

import { Button,
         StyleSheet, 
         Text, 
         TextInput, 
         TouchableOpacity,
         TouchableHighlight,
         TouchableNativeFeedback,
         View } from 'react-native';

import { Redirect } from 'react-router-native' // using old mechanism
import { Router, Route, Link } from "../App/router-native"; // new route mechanism
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'; // google-signin also using firebase_ui (not just google-signin)

import TEXT_MESSAGE_PAGE from '../TextMessage';  // will load AND run ALL code in file

import Styles from '../../styles/native';
import * as ROUTES from '../../routes/native';
import * as CONSTANTS from '../../common/constants';

// * can be outside class ;  does not require this 
// * must start with capital letters else error = View config not found 
const PageTest = () => {   
  return (
  <View><Text style={Styles.title}>test</Text></View>
  );
}
 
// og.fixme: believe ternary not working properly with Firebase JS SDK ?
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userInfo: '',
        loginStatus: '',
      };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getCurrentUserInfo = async () => {
    console.log('navigation > getCurrentUserInfo start');
    try {
      const userInfo = await GoogleSignin.signInSilently();
      if(!this.state.userInfo) { 
        console.log('navigation > getCurrentUserInfo - yes userInfo');
        console.log('navigation > User Info --> ', userInfo);
        this.setState({ userInfo: userInfo, loginStatus: 'OUT' }); // OUT to prevent loop
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        //alert('User has not signed in yet');
        console.log('navigation > User has not signed in yet');
        // Add any configuration settings here:
        await GoogleSignin.configure();
        const data = await GoogleSignin.signIn();
        //const data = await AccessToken.getCurrentAccessToken(); // get the access token
        if (!data) {
          throw new Error('Something went wrong obtaining the users access token'); 
        } else {
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        console.log('navigation > yes credential');
        console.log(credential);
        }
      } else {
        //alert("Something went wrong. Unable to get user's info");
        console.log("navigation > Something went wrong. Unable to get user's info"); // 2 ticks because apostrophe ' used
      }
    }
    console.log('navigation > getCurrentUserInfo end');
  }

  isSignedIn = async () => {
    console.log('navigation > isSignedIn start');
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      //alert('User is already signed in');
      console.log('navigation > User is already signed in');
      this.getCurrentUserInfo(); //Get the User details as user is already signed in
    } else {
      //alert("Please Login");
      console.log('navigation > Please Login'); 
    }
    console.log('navigation > isSignedIn end');
  }

  pageBlank = () => {   
    console.log('page blank'); 
    return (
      <View style={Styles.xcontainerBlank}>
        <TEXT_MESSAGE_PAGE textBlock={CONSTANTS.TEXT_CLEAR} />
      </View>
      ) /// end return
  }

  pageClear = () => {   
    console.log('page clear'); 
    if(this.state.loginStatus==='IN') { 
      console.log('page clear > IN'); // TEXT_IN = 'SHOW LOGIN' 
      console.log('page clear > this is the default "login" view for a redirect');
      // og.note: this is the default "login" view for a redirect
      return (
        [ 
        <TEXT_MESSAGE_PAGE textBlock={CONSTANTS.TEXT_IN} textStyle={Styles.xcontainer, Styles.paddingTop}/>,
        <TEXT_MESSAGE_PAGE textBlock={CONSTANTS.TEXT_LOGGED_IN} textStyle={Styles.xcontainer}/>
        ]
        ) /// end return
    } else {
      console.log('page clear > OUT'); // TEXT_OUT = 'SHOW LOGOUT'
      return (
        [
        <TEXT_MESSAGE_PAGE textBlock={CONSTANTS.TEXT_CHOOSE} textStyle={Styles.xcontainer, Styles.paddingTop}/>
        ]
        ) /// end return
    }
  }

  pageLogin = () => {   
    // Google Signin Button does not require TouchableOpacity 
    console.log('render page login'); 
    console.log('render page login > IN'); 
    return (
        <View style={Styles.container, Styles.header}>
        <View style={Styles.navBar}>

        <View style={Styles.navLeft}><Text style={[Styles.textBlack, {fontWeight: 'bold',}]}>{CONSTANTS.TEXT_LOGO_TYPE}</Text></View>
          <GoogleSigninButton style={{width: 122, height: 48, padding: 15, marginRight: 15,}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={() => this.signIn()} />
        </View>

        </View>
        ) /// end return
  }

  pageLogout = () => {   
    console.log('render page logout'); 
    if(this.state.loginStatus==='OUT') { 
        return (
              <View style={Styles.container, Styles.header}>
              <View style={Styles.navBar}>

              <View style={Styles.navLeft}><Text style={[Styles.textBlack, {fontWeight: 'bold',}]}>{CONSTANTS.TEXT_LOGO_TYPE}</Text></View>
 
                <Text style={Styles.blockSpace}> </Text>
                <Link to={{ dataFromParent: this.state.userInfo, pathname: "/add", state: { loginStatus: 'OUT' } }}><Text style={Styles.blockNav}>{CONSTANTS.PAGE_1_LINK}</Text></Link>
                <Link to={{ dataFromParent: this.state.userInfo, pathname: "/list", state: { loginStatus: 'OUT' } }}><Text style={Styles.blockNav}>{CONSTANTS.PAGE_2_LINK}</Text></Link>
                <Link><Text style={[Styles.blockNav, {marginRight: 15,}]} onPress={this.signOut}>{CONSTANTS.PAGE_3_LINK}</Text></Link>

              </View>
            </View>
            ) /// end return
    } else {
        return (
            <TEXT_MESSAGE_PAGE textBlock="logout error" />
            ) /// end return
    }
  }

  // og.fixme: left in in case needed
  reRender = () => {
    console.log('re render'); 
    this.setState({ state: this.state }); // Force render with state change
    //this.forceUpdate(); // Force a render with *out* state change
  }
      
  // Prompts a modal to let the user sign in. Resolved promise returns an userInfo object.
  signIn = async () => {
    console.log('login > signIn start');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('login > a userInfo --> ', this.state.userInfo); 
      this.setState({ userInfo: userInfo, error: null, loginStatus: 'OUT' }); // OUT to prevent loop 
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.error(error);
        this.setState({error,});
      }
      console.log('login > signIn end');
    } finally {
      // This block has no effect on the return value.
      console.log('login > signIn end');
      this.reRender(); // og.fixme: left in in case needed
    } // end finally
  }; // end signIn

  //Remove user session from the device.
  signOut = async () => {
    console.log('logout > signOut start');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null, loginStatus: 'IN' }); // IN to prevent loop
    } catch (error) {
      console.error(error); // some other error happened
      this.setState({error,});
    } finally {
      // This block has no effect on the return value.
      console.log('logout > signOut end');
      this.setState({ state: this.state }); // re render ?
      this.reRender(); // og.fixme: left in in case needed
    } // end finally
  }; // end signOut

//...

  componentDidMount() {
    console.log('navigation > componentDidMount');
    this.isSignedIn();
    GoogleSignin.configure({
    //if used, this will create false positive error = "'Your app is missing support for the following URL schemes: com .googleusercontent.apps.xxx'"
    //iosClientId: 'com.googleusercontent.apps.108096849192-e2of34a0h3aehpcc546cgks2qu4loij8', 
    offlineAccess: false, // true if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceConsentPrompt: true, // true if you want to show the authorization prompt at each login.
   });
  }
    
  render() { 
    console.log('@ navigation render > using component'); 
    const { userInfo, loginStatus, } = this.state
    //console.log('navigation @ render - login status = ' +loginStatus); 
    console.log('navigation @ render - login status = ' +this.state.loginStatus); 
    if(!this.state.userInfo) { 
        console.log('@ navigation render > no userinfo'); 
        // og.note: return multiple elements
        //return ( this.pageLogin() ) // works
        //return ( [ this.pageLogin(), this.pageClear(), this.pageBlank() ]) // works
        return ( [ this.pageLogin(), <Redirect to="/login"/> ]) // works = clears output = does not go to login (it is not defined); goes to default view of this file (which is login)
    } else {
        console.log('@ navigation render > yes userinfo'); 
        // og.note: return multiple elements
        //return ( this.pageLogout() ) // works
        return ( [ this.pageLogout(), this.pageClear() ]) // works
    } // end if else
  } // end render
} // end class

export default Navigation
