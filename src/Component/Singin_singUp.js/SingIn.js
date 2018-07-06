
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Container, Header, Title, Left, Body, Content, Card, CardItem, Button, Spinner } from 'native-base';
import * as firebase from "firebase";
import { renderPost } from "../../store/action/action";
import { connect } from "react-redux"


let database = firebase.database().ref("/")
class SingInComponent extends Component {
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


  componentWillMount(){
    AsyncStorage.getItem('email').then((email)=>{
            console.log(email)
            this.setState({Email:email})
    })
  }



  singin() {
    this.setState({
      SignUpFlage: true
    })

    let user = {
      username: this.state.Username,
      email: this.state.Email,
      password: this.state.Password,
    }
    AsyncStorage.setItem('email', user.email)

    this.setState({
      errorMsg: ""
    })

    setTimeout(() => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((success) => {
          database.child("user/" + success.uid).once("value", (snapshot) => {
            this.props.navigation.navigate("Dashboard")
            this.setState({
              SignUpFlage: false,
            })

            database.child("posts").on("child_added", (snapshot) => {
              let obj = snapshot.val()
              snapshot.id = snapshot.key
              obj.id = snapshot.key
              this.props.renderPost(obj)
            })

          })
            .catch((error) => {
              var errorMessage = error.message;
              this.setState({
                errorMsg: errorMessage,
                SignUpFlage: false
              })
            });

        })
    }, 1000)

  }


  render() {
    return (
      <Container style={{ backgroundColor: "#e8e1e1" }}>
        <Content style={{ padding: 5 }} >
          <View>
            {(this.state.errorMsg !== "") ?
              <Card style={{ margin: 5, backgroundColor: "#a10000" }} >
                <Text style={{ color: "#fff", fontSize: 20, textAlign: "center", margin: 10, fontStyle: "italic", borderBottomColor: "#a10000" }} >
                  {this.state.errorMsg} Heeeeeee
                </Text>
              </Card>
            :null}
            <Text style={{ 
              fontSize: 30,
               textAlign: "center", 
               fontWeight: "bold",
                color: "#a10000",
                 paddingTop: 20}} >
              Sign In
           </Text>


            <View style={{ marginTop: 10, }}>
              <TextInput
                value={this.state.Email}
                onChangeText={(Email) => this.setState({ Email })}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="#a10000"
                style={{
                  borderBottomColor: "#a10000", borderBottomWidth: 3, paddingLeft: 5 , paddingBottom:0 ,
                  borderRadius: 3, height: 60, fontSize: 20, color: "#a10000", 
                }} />
            </View>

            <View style={{ marginTop: 20, margin: 0 }}>
              <TextInput
              
                onChangeText={(Password) => this.setState({ Password })}
                value={this.state.Password}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#a10000"
                style={{
                  borderBottomColor: "#a10000",
                  borderBottomWidth: 3, paddingLeft: 5, paddingBottom:0 ,
                  borderRadius: 3, height: 60,
                  fontSize: 20, color: "#a10000"
                }} />
            </View>

            {(this.state.SignUpFlage === false) ?
              <View>
                <Button
                  onPress={this.singin.bind(this)}
                  style={{
                    marginTop: 35, backgroundColor: "#a10000",
                    borderRadius: 3, height: 60,
                    elevation:5
                  }} block primary>
                  <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}> SIGN IN </Text>
                </Button>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("RegisterComponent")}
                  style={{
                    marginTop: 20
                  }} >
                  <Text style={{
                    fontSize: 17,
                    color: "#a10000",
                    textAlign: "center",
                    fontSize:15
                  }}>
                    Create an account
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


const mapStateToProp = (state) => {
  return ({
    allPost: state.root
  });
};
const mapDispatchToProp = (dispatch) => {
  return {
    renderPost: (data) => {
      dispatch(renderPost(data))
    }
  };
};


export default connect(mapStateToProp, mapDispatchToProp)(SingInComponent)