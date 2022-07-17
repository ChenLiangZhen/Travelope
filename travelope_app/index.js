/**
 * @format
 */
import 'intl'
import "react-intl"
import "@formatjs/intl"
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
