import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Nave from "./src/Component/index"
import { Provider } from "react-redux"
import store from "./src/store/index"

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store} >
          <Nave />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
