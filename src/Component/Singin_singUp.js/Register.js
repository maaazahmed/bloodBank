
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Container,  Content, Card,  Button, Text, } from 'native-base';
import * as firebase from "firebase";



var config = {
  apiKey: "AIzaSyCjnOnGjin0ax0pvx_aWPwr3rXyrcwJK4k",
  authDomain: "polling-application-9938a.firebaseapp.com",
  databaseURL: "https://polling-application-9938a.firebaseio.com",
  projectId: "polling-application-9938a",
  storageBucket: "polling-application-9938a.appspot.com",
  messagingSenderId: "1008180650619"
};
firebase.initializeApp(config);

let database = firebase.database().ref("/")
export default class RegisterComponent extends Component {
  constructor() {
    super()
    this.state = {
      SignUpFlage: false,
      errorMsg: "",
      Username: "",
      Email: "",
      Password: "",

    }
  }



  creactAccount() {
    this.setState({
      SignUpFlage: true
    })

    let user = {
      username: this.state.Username,
      email: this.state.Email,
      password: this.state.Password,
    }

    this.setState({
      errorMsg: ""
    })

    setTimeout(() => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res)
          database.child("user/" + res.uid).set(user)
            .then(() => {
              this.props.navigation.navigate("SingInComponent")
              this.setState({
                SignUpFlage: false,
              })
            })
        })
        .catch((error) => {
          var errorMessage = error.message;
          this.setState({
            errorMsg: errorMessage,
            SignUpFlage: false
          })
        });
    }, 1000)

  }


  render() {
    return (
      <Container style={{ backgroundColor: "#e8e1e1" }}>
        <Content style={{ padding: 5 }} >
          <View style={{ paddingTop: 0, paddingBottom: 20, borderRadius: 5 }} >
            {(this.state.errorMsg !== "") ?
              <Card style={{ margin: 5, backgroundColor: "#a10000" }} >
                <Text style={{ color: "#fff", fontSize: 20, textAlign: "center", margin: 10, fontStyle: "italic", borderBottomColor: "#a10000" }} >
                  {this.state.errorMsg}
                </Text>
              </Card>
              : null}

            <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold", color: "#a10000", paddingTop: 20 }} >
              Sign Up
           </Text>
            <View style={{ marginTop: 10 }} >
              <TextInput underlineColorAndroid="transparent"
                onChangeText={(Username) => this.setState({ Username })}
                value={this.state.Username}
                placeholder="Username"
                placeholderTextColor="#a10000"
                
                style={{
                  borderBottomColor: "#a10000",
                  borderBottomWidth: 3, paddingLeft: 5, paddingBottom:0,
                  borderRadius: 3, height: 60, fontSize: 20,
                  color: "#a10000"}}/>
               </View>

            <View style={{ marginTop: 20 }}>
              <TextInput
                value={this.state.Email}
                onChangeText={(Email) => this.setState({ Email })}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="#a10000"
                
                style={{
                  borderBottomColor: "#a10000",
                  borderBottomWidth: 3,  paddingLeft: 5, paddingBottom:0,
                  borderRadius: 3, height: 60, fontSize: 20,
                  color: "#a10000"}}/>
                            </View>

            <View style={{ marginTop: 20 }}>
              <TextInput
                onChangeText={(Password) => this.setState({ Password })}
                value={this.state.Password}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#a10000"                
                style={{
                  borderBottomColor: "#a10000",
                  borderBottomWidth: 3, paddingLeft: 5, paddingBottom:0,
                  borderRadius: 3, height: 60, fontSize: 20,
                  color: "#a10000"
                }} />
            </View>

            {(this.state.SignUpFlage === false) ?
              <View>
                <Button
                  onPress={this.creactAccount.bind(this)}
                  style={{
                    marginTop: 35, backgroundColor: "#a10000",
                    borderRadius: 3, height: 60,
                    elevation:5
                  }} block primary>
                  <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}> Sign up </Text>
                </Button>
                <TouchableOpacity
                  onPress={
                    () => this.props.navigation.navigate("SingInComponent")
                  }
                  style={{
                    marginTop: 20
                  }} >
                  <Text style={{
                    fontSize: 17,
                    color: "#a10000",
                    textAlign: "center",
                    fontSize:15
                  }}>
                    Already have an account
                   </Text>
                </TouchableOpacity>
              </View>
              :
              <View>
                <ActivityIndicator
                  size={70}
                  color="#a10000"
                  style={{ marginTop: 30, marginBottom: 30 }}
                />
              </View>}
          </View>
        </Content>
      </Container>
    );
  }
}
