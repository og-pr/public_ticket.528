// styles
// note: web-styles should be similar to native-styles
// note: android entire background color changed to white (not needed for ios) @ root/android/app/src/main/res/values/colors.xml
import React, { 
    Platform, 
    Dimensions, 
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback, 
} from 'react-native'

const win = Dimensions.get('window');

let imageHeight = Math.round( (win.height * 0.65) );
let imageWidth = Math.round( (win.width * 0.65) );

// creating 1 object (Styles) to contain all styles
const Styles = StyleSheet.create({
    blockNav:{
        fontWeight: 'bold',
        backgroundColor: '#fff', // use during development - 4885ed99
        justifyContent: 'space-around',
        //padding: 2, // create button problem = button area off ; creates black touchable area
    },
    blockSpace:{    // used in navBar
        width: 10, 
        height: 10,
        //backgroundColor: 'green', // use during development
        marginRight: Platform.OS === 'ios' ? 0 : 32,  // end is android
    },
    button: { 
        alignItems: 'center',  // use color to make sure button is in same area
        //backgroundColor: '#DDDDDD', // needs to include button area for button to be touchable / clickcable
        padding: 10,
        width: 100,
        //marginTop: 30, // if used on button will displace touchable area
    },
    buttonEnter: {
        height: 25,
        color: 'white',
        backgroundColor: '#FA6900', // orange
        fontSize: 22,
        //textAlign: 'center' // not needed since we are using blank spaces 
    },
    buttonRemove: {
        height: 20,
        color: 'white',
        backgroundColor: '#FA6900', // orange
        fontSize: 22,
        //textAlign: 'center' // not needed since we are using blank spaces 
    },
    container: {
        flex: 1, // og.note: will superceed all other CSS rules = use with caution
        padding: 10, 
        backgroundColor: 'white',
    },
    header: { // was #fff not 103D5D ; https://www.color-hex.com/color/103d5d
        backgroundColor: '#ffffff', 
        height: Platform.OS === 'ios' ? 45 : 40, // end is android
        marginTop: Platform.OS === 'ios' ? 0 : 0,  
    },
    navBar: {
        backgroundColor: '#ffffff', // repo blue 103D5D
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: 80,
        top: Platform.OS === 'ios' ? 45 : 0, // end is android
        marginRight: Platform.OS === 'ios' ? 0 : 5,  
        marginLeft: Platform.OS === 'ios' ? 0 : 5, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLeft: {
        backgroundColor: '#ffffff', 
        width: 150,
        left: Platform.OS === 'ios' ? 11 : 11, // end is android
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    paddingBlock: {
        //top: 50,
        height: 50,
        backgroundColor: 'lime', // use color to find block during design 
    },
    paddingTop: {
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 80 : 40, // end is android
    },
    text: {
        paddingBottom: 5, 
        justifyContent: 'center',
        alignItems: 'center', 
        fontWeight: Platform.OS === 'ios' ? '400' : '400', 
        color: '#000000',
        fontSize: 14,
    },
    textCenter: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    textBlack: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black", 
    },
    textBlock: {
        backgroundColor: 'blue', 
        top: Platform.OS === 'ios' ? 45 : 10, // end is android
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    textInput: {
        borderColor: '#CCCCCC',
        //borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10
    },
    textList: {
        padding: 7,
        borderStyle: 'solid',
        borderWidth: 1,
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'normal',
       //marginBottom: 20, // see List file, ScrollView, paddingBottom: 360
    },
    textRed: {
        color: "red", 
        padding: 2,
    },
    title: {
        borderStyle: 'solid',
        borderWidth: 1,
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    viewButton: {
        /* this button matches a textButton as best as possible - to avoid using TouchableOpacity / TouchableHighlight ; Text is better supported with CSS */
        top: 20,
        width: 90, 
        height: 30, 
        padding: 0, 
        alignItems: 'center', 
        backgroundColor: '#FA6900', 
    },
    xcontainer: {
        //flex: 1, // og.note: will superceed all other CSS rules = use with caution
        height: 40,
        padding: 10,
        backgroundColor: 'lime',
    },
    xcontainerBlank: {
        //flex: 1, // og.note: will superceed all other CSS rules = use with caution
        height: 200, // needs to include button area for button to be touchable / clickcable
        padding: 15,
        backgroundColor: 'white', // use color to make sure button is in same area
        top: -35,
    },
    xcontainerList: {
        //flex: 1, // og.note: will superceed all other CSS rules = use with caution
        //height: 200, // needs to include button area for button to be touchable / clickcable
        padding: 20,
        paddingBottom: 20,
        backgroundColor: 'white', // use color to make sure button is in same area
        top: -35,
    },
})

export default Styles;
