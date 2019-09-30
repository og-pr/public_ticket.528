import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { Router, Route, Link } from "../App/router-native"; // new route mechanism

import Layout from '../Layout';

// og.note: requires route to be parent component ; everything else must be inside it ; see appview, layoutview, + navigationview
export default () =>
	<Layout />
