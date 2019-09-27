import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Redirect, Router, Route, Link } from "../App/router-native"; // new route mechanism

import ADDPAGE from '../Add';  // will load AND run ALL code in file
import LISTPAGE from '../List';  
import Navigation from '../Navigation';

import Styles from '../../styles/native';
import * as ROUTES from '../../routes/native';
import * as CONSTANTS from '../../common/constants';

console.log('o.log > LayoutView')

// og.note: requires router to be parent component ; everything else must be inside it ; see appview, layoutview, + navigationview
export default () => 
  <Router>
    <View>
      <Navigation />
      <Route path={ROUTES.ADD} component={ADDPAGE} />
      <Route path={ROUTES.LIST} component={LISTPAGE} /> 
    </View>
  </Router>
