// routes
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"; 
import { Redirect, Router, Route, Link } from "../components/App/router-native"; // new route mechanism

import Styles from '../styles/native';
//import * as SHARED from '../common/shared.js';
import * as CONSTANTS from '../common/constants.js';

export const LANDING = '/';
export const ADD = '/add';
export const LIST = '/list';
//export const TEST = '/test';
export const LOGOUT = '/logout';
export const TEXT_MESSAGE = '/text';

export const REACT_APP_CONFIRMATION_EMAIL_REDIRECT = 'http://localhost:3001/home'; // change as needed
