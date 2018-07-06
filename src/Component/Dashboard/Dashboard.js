/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import { currentUser } from "../../store/action/action";
import { connect } from "react-redux"
import firebase from "firebase"

let database = firebase.database().ref("/")
 class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      O_Negetive: "O_nrgetive",
      O_posetive: "O_Posetive",
      PostRequiremntComponent: "PostRequiremntComponent",
      A_negetive: "A_negetive",
      A_Posetive: "A_Posetive",
      B_nagetive: "B_nagetive",
      B_posetive: "B_posetive",
      AB_negetive: "AB_negetive",
      AB_Posetive: "AB_Posetive",
      PrfofileData:"PrfofileData"
    }
  }

componentDidMount(){
  let userID = firebase.auth().currentUser;
  database.child(`user/${userID.uid}`).on("value", (snapshot) => {
    let obj = snapshot.val()
    obj.id = snapshot.key
    snapshot.id = snapshot.key
    this.props.currentUser(obj)
  })
}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{ flex: 1, justifyContent: "center", alignItems: "center", width: null, height: null, backgroundColor: "#fff", resizeMode: "stretch" }}
            source={{ uri: "http://www.youngbloods.org.uk/wp-content/uploads/2016/04/47_Blood_Donation_-1024x768.jpg" }}
            resizeMode="stretch"
          >
          </ImageBackground>
        </View>
        <View style={{ flex: 2, backgroundColor: "#a10000" }}>

     


          <View style={{ justifyContent: "space-around", flexDirection: "row", margin: 5, marginTop: 0 }}>
            <TouchableOpacity style={{borderTopLeftRadius:10}} onPress={() => {
              this.props.navigation.navigate(this.state.O_Negetive)
              this.setState({ O_Negetive: "" })
            }} >
              <View style={styles.bloodGroupBtnsLeft} >
                <Text style={{ fontSize: 25, margin: 0, color: "#a10000", fontWeight: "bold" }} >
                  O-
             </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.A_negetive)
              this.setState({ A_negetive: "" })
            }} >
              <View style={styles.bloodGroupBtns} >
                <Text style={{ fontSize: 25, margin: 5, color: "#a10000", fontWeight: "bold" }} >
                  A-
             </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.B_nagetive)
              this.setState({ B_nagetive: "" })
            }}>
              <View style={styles.bloodGroupBtns} >
                <Text style={{ fontSize: 25, margin: 5, color: "#a10000", fontWeight: "bold" }} >
                  B-
             </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.AB_negetive)
              this.setState({ AB_negetive: "" })
            }}>
              <View style={styles.bloodGroupBtns} >
                <Text style={{ fontSize: 25, margin: 5, color: "#a10000", fontWeight: "bold" }} >
                  AB-
             </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* O_Posetive */}
          <View style={{ justifyContent: "space-around", flexDirection: "row", margin: 5, marginTop: 0 }}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.O_posetive);
              this.setState({ O_posetive: "" })
            }} >
              <View style={styles.bloodGroupBtns} >
                <Text style={{ fontSize: 25, margin: 5, color: "#a10000", fontWeight: "bold" }}>
                  O+
             </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.A_Posetive)
              this.setState({ A_Posetive: "" })
            }}>
              <View style={styles.bloodGroupBtns} >
                <Text style={{ fontSize: 25, margin: 5, color: "#a10000", fontWeight: "bold" }}>
                  A+
             </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.B_posetive);
              this.setState({ B_posetive: "" })
            }}>
              <View style={styles.bloodGroupBtns} >
                <Text style={{ fontSize: 25, margin: 5, color: "#a10000", fontWeight: "bold" }} >
                  B+
             </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.AB_Posetive)
              this.setState({ AB_Posetive: "" })
            }}>
              <View style={styles.bloodGroupBtnsright} >
                <Text style={{ fontSize: 25, margin: 5, color: "#a10000", fontWeight: "bold" }}>
                  AB+
             </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "space-around", flexDirection: "row",   }}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.PostRequiremntComponent);
              this.setState({ PostRequiremntComponent: "" })
            }} >
              <View style={{
                backgroundColor: "#fff",
                justifyContent: "center", alignContent: "center", borderRadius: 150
              }}>
                <Image 
                 style={styles.createPostBtn}
                  source={require("./images/download.png")} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(this.state.PrfofileData);
              this.setState({ PrfofileData: "" })
            }} >
              <View style={{
                backgroundColor: "#fff",
                justifyContent: "center", alignContent: "center", borderRadius: 150,
                padding:3,
                marginTop:2
                
              }}>
                  <Icon name="user-circle" size={55} color="#a10000" />
              </View>
            </TouchableOpacity>
          </View>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bloodGroupBtns:{
    backgroundColor: "#fff",
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width /5 , 
    borderRadius: 70,
    justifyContent: "space-around",
    alignItems: "center",
    margin:5
    // borderRadius: 70,
  },
  createPostBtn:{
    width:Dimensions.get("window").width / 6,
    height:Dimensions.get("window").height / 10,
    borderRadius: 50 
  },
  bloodGroupBtnsLeft:{
    backgroundColor: "#fff",
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width / 5 , 
    // borderTopLeftRadius: 3,
    // borderBottomLeftRadius: 3,
    justifyContent: "space-around",
    borderRadius: 70,
    
    alignItems: "center",
    margin:5
    
  },
  bloodGroupBtnsright:{
    backgroundColor: "#fff",
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width / 5 , 
    borderRadius: 70,
    
    // borderTopRightRadius: 3,
    // borderBottomRightRadius: 3,
    justifyContent: "space-around",
    alignItems: "center",
    margin:5
    
  }
})


const mapStateToProp = (state) => {
  return ({
    currentUserobj: state.root
  });
};
const mapDispatchToProp = (dispatch) => {
  return {
    currentUser: (data) => {
      dispatch(currentUser(data))
    }
  };
};
export default connect(mapStateToProp, mapDispatchToProp)(Dashboard)