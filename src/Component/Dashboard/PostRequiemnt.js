
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Picker,
  MapViewAnnotation,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Container, Header, Title, Left, Body, Content, Card, CardItem, Button, Text, Spinner, ListItem, List, Radio, Right } from 'native-base';
import * as firebase from "firebase"
import { currentUser } from "../../store/action/action"
import { connect } from "react-redux"
import { Dialog } from 'react-native-simple-dialogs';


let database = firebase.database().ref("/")
class PostRequiremntComponent extends Component {
  constructor() {
    super()
    this.state = {
      SignUpFlage: false,
      disableFlage: false,
      bloodGroup: "Blood Group",
      bottols: "Bottols",
      Urgency: "Urgency",
      Hospital: "",
      Location: "",
      ralation: "",
      photo: "",
      contectNumber: "",
      instruction: "",
      Dashboard: "Dashboard",
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      /*******************BLOOD GROUP*/
      O_Negtin: false,
      A_Negtv: false,
      A_Postv: false,
      B_gegetiv: false,
      B_Postv: false,
      AB_ngtive: false,
      AB_Postv: false,
      /*******************BOTTOLS*/
      bottol_1: false,
      bottol_2: false,
      bottol_3: false,
      bottol_4: false,
      bottol_5: false,
      /*******************URGENCY*/
      day_1: false,
      day_2: false,
      day_3: false,
      day_4: false,
      day_5: false,
      day_6: false,
      day_7: false,
      day_8: false,
      day_9: false,
      day_10: false,
    }
  }



  creactPost() {
    this.setState({
      disableFlage: true,
    })
    // let userID = firebase.auth().currentUser.uid;
    // database.child(`user/${userID}`).on("value", (snapshot) => {
    //   let obj = snapshot.val()
    //   obj.id = snapshot.key
    //   snapshot.id = snapshot.key
    //   this.props.currentUser(obj)
    // })

let profilePic = (!this.props.currentUserobj.currentUser.profilePic)?
"https://www.zent.com/images/userProfileIcon_gray.png":
this.props.currentUserobj.currentUser.profilePic

    setTimeout(() => {
      let postData = {
        bloodGroup: this.state.bloodGroup,
        bottols: this.state.bottols,
        Urgency: this.state.Urgency,
        Location: this.state.Location,
        ralation: this.state.ralation,
        contectNumber: this.state.contectNumber,
        instruction: this.state.instruction,
        username: this.props.currentUserobj.currentUser.username,
        email: this.props.currentUserobj.currentUser.email,
        currentUserID: this.props.currentUserobj.currentUser.id,
        profilePic: profilePic,
      }
      database.child("posts").push(postData)
      this.setState({
        disableFlage: false,
        Dashboard: "Dashboard"
      })
    }, 3000)
  }




  render() {
    return (
      <View style={{ backgroundColor: "#e8e1e1" }}>
        <ScrollView style={{ paddingTop: 0, paddingBottom: 0, borderRadius: 5, backgroundColor: "#fff" }} >
          <Text
            style={{
              backgroundColor: "#a10000",
              color: "#fff", padding: 4,
              fontSize: 23,
              fontWeight: "bold"
            }}>Create </Text>



          <View style={{ marginTop: 20, }} >
            <View style={{ flex: 1, }} >
              <View style={{ borderColor: "#a10000", borderBottomWidth: 2, width: Dimensions.get("window").width }} >
                <Dialog
                  animationType="fade"
                  visible={this.state.dialogVisible}
                  onTouchOutside={() => this.setState({ dialogVisible: false })} >
                  <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                      <View>
                        <Text
                          style={{
                            color: "#a10000",
                            fontWeight: "bold",
                            fontSize: 20
                          }}
                          onPress={() => { this.setState({ O_Negtin: true, O_Posetv: false, A_Negtv: false, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "O-" }) }}
                        >O-</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000"
                          onPress={() => { this.setState({ O_Negtin: true, O_Posetv: false, A_Negtv: false, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "O-" }) }} selected={this.state.O_Negtin} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text style={{
                          color: "#a10000",
                          fontWeight: "bold",
                          fontSize: 20
                        }}
                          onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: true, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "O+" })}
                        >O+</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: true, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "O+" })} selected={this.state.O_Posetv} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          style={{
                            color: "#a10000",
                            fontWeight: "bold",
                            fontSize: 20
                          }}
                          onPress={() => this.setState({ A_Negtv: true, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "A-" })}
                        >A-</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => this.setState({ A_Negtv: true, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "A-" })} selected={this.state.A_Negtv} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: true, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "A+" })}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>A+</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: true, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "A+" })} selected={this.state.A_Postv} />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: true, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "B-" })}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>B-</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: true, B_Postv: false, AB_ngtive: false, AB_Postv: false, bloodGroup: "B-" })} selected={this.state.B_gegetiv} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: false, B_Postv: true, AB_ngtive: false, AB_Postv: false, bloodGroup: "B+" })}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>B+</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: false, B_Postv: true, AB_ngtive: false, AB_Postv: false, bloodGroup: "B+" })} selected={this.state.B_Postv} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: true, AB_Postv: false, bloodGroup: "AB-" })}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>BA-</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: true, AB_Postv: false, bloodGroup: "AB-" })} selected={this.state.AB_ngtive} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: true, bloodGroup: "AB+" })}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>BA+</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => this.setState({ A_Negtv: false, O_Negtin: false, O_Posetv: false, A_Postv: false, B_gegetiv: false, B_Postv: false, AB_ngtive: false, AB_Postv: true, bloodGroup: "AB+" })} selected={this.state.AB_Postv} />
                      </View>
                    </View>
                  </View>
                </Dialog>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { this.setState({ dialogVisible: true }) }} >
                  <Text style={{ color: "#a10000", fontSize: 20 }} >{this.state.bloodGroup}</Text>
                </TouchableOpacity>

              </View>
            </View>

            <View style={{ flex: 1, marginTop: 25, }} >
              <View style={{ borderColor: "#a10000", borderBottomWidth: 2, width: Dimensions.get("window").width }} >
                <Dialog
                  animationType="fade"
                  visible={this.state.dialogVisible2}
                  onTouchOutside={() => this.setState({ dialogVisible2: false })} >
                  <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              bottol_1: true,
                              bottol_2: false,
                              bottol_3: false,
                              bottol_4: false,
                              bottol_5: false,
                              bottols: "1 Bootol"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }} >1 Bottol</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000"
                          onPress={() => {
                            this.setState({
                              bottol_1: true,
                              bottol_2: false,
                              bottol_3: false,
                              bottol_4: false,
                              bottol_5: false,
                              bottols: "1 Bootol"
                            })
                          }} selected={this.state.bottol_1} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              bottol_1: false,
                              bottol_2: true,
                              bottol_3: false,
                              bottol_4: false,
                              bottol_5: false,
                              bottols: "2 Bootols"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>2 Bottols</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000"
                          onPress={() => {
                            this.setState({
                              bottol_1: false,
                              bottol_2: true,
                              bottol_3: false,
                              bottol_4: false,
                              bottol_5: false,
                              bottols: "2 Bootols"
                            })
                          }} selected={this.state.bottol_2} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              bottol_1: false,
                              bottol_2: false,
                              bottol_3: true,
                              bottol_4: false,
                              bottol_5: false,
                              bottols: "3 Bootols"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>3 Bottols</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000"
                          onPress={() => {
                            this.setState({
                              bottol_1: false,
                              bottol_2: false,
                              bottol_3: true,
                              bottol_4: false,
                              bottol_5: false,
                              bottols: "3 Bootols"
                            })
                          }} selected={this.state.bottol_3} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              bottol_1: false,
                              bottol_2: false,
                              bottol_3: false,
                              bottol_4: true,
                              bottol_5: false,
                              bottols: "4 Bootols"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>4 Bottols</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000"
                          onPress={() => {
                            this.setState({
                              bottol_1: false,
                              bottol_2: false,
                              bottol_3: false,
                              bottol_4: true,
                              bottol_5: false,
                              bottols: "4 Bootols"
                            })
                          }} selected={this.state.bottol_4} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              bottol_1: false,
                              bottol_2: false,
                              bottol_3: false,
                              bottol_4: false,
                              bottol_5: true,
                              bottols: "5 Bootols"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>5 Bottols</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000"
                          onPress={() => {
                            this.setState({
                              bottol_1: false,
                              bottol_2: false,
                              bottol_3: false,
                              bottol_4: false,
                              bottol_5: true,
                              bottols: "5 Bootols"
                            })
                          }} selected={this.state.bottol_5} />
                      </View>
                    </View>

                  </View>
                </Dialog>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { this.setState({ dialogVisible2: true }) }} >
                  <Text style={{ color: "#a10000", fontSize: 20 }} >{this.state.bottols}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 25 }} >
              <View style={{ borderColor: "#a10000", borderBottomWidth: 2, width: Dimensions.get("window").width }} >
                <Dialog
                  animationType="fade"
                  visible={this.state.dialogVisible3}
                  onTouchOutside={() => this.setState({ dialogVisible3: false })} >
                  <View>
                    <View

                      style={{ flexDirection: "row", justifyContent: "space-between" }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: true,
                              day_2: false,
                              day_3: false,
                              day_4: false,
                              day_5: false,
                              day_6: false,
                              day_7: false,
                              day_8: false,
                              day_9: false,
                              day_10: false,
                              Urgency: "1 Day"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }} >1 Day</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: true,
                            day_2: false,
                            day_3: false,
                            day_4: false,
                            day_5: false,
                            day_6: false,
                            day_7: false,
                            day_8: false,
                            day_9: false,
                            day_10: false,
                            Urgency: "1 Day"
                          })
                        }} selected={this.state.day_1} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: true,
                              day_3: false,
                              day_4: false,
                              day_5: false,
                              day_6: false,
                              day_7: false,
                              day_8: false,
                              day_9: false,
                              day_10: false,
                              Urgency: "2 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>2 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: true,
                            day_3: false,
                            day_4: false,
                            day_5: false,
                            day_6: false,
                            day_7: false,
                            day_8: false,
                            day_9: false,
                            day_10: false,
                            Urgency: "2 Days"
                          })
                        }} selected={this.state.day_2} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: false,
                              day_3: true,
                              day_4: false,
                              day_5: false,
                              day_6: false,
                              day_7: false,
                              day_8: false,
                              day_9: false,
                              day_10: false,
                              Urgency: "3 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>3 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: false,
                            day_3: true,
                            day_4: false,
                            day_5: false,
                            day_6: false,
                            day_7: false,
                            day_8: false,
                            day_9: false,
                            day_10: false,
                            Urgency: "3 Days"
                          })
                        }} selected={this.state.day_3} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: false,
                              day_3: false,
                              day_4: true,
                              day_5: false,
                              day_6: false,
                              day_7: false,
                              day_8: false,
                              day_9: false,
                              day_10: false,
                              Urgency: "4 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>4 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: false,
                            day_3: false,
                            day_4: true,
                            day_5: false,
                            day_6: false,
                            day_7: false,
                            day_8: false,
                            day_9: false,
                            day_10: false,
                            Urgency: "4 Days"
                          })
                        }} selected={this.state.day_4} />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: false,
                              day_3: false,
                              day_4: false,
                              day_5: true,
                              day_6: false,
                              day_7: false,
                              day_8: false,
                              day_9: false,
                              day_10: false,
                              Urgency: "5 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>5 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: false,
                            day_3: false,
                            day_4: false,
                            day_5: true,
                            day_6: false,
                            day_7: false,
                            day_8: false,
                            day_9: false,
                            day_10: false,
                            Urgency: "5 Days"
                          })
                        }} selected={this.state.day_5} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: false,
                              day_3: false,
                              day_4: false,
                              day_5: false,
                              day_6: true,
                              day_7: false,
                              day_8: false,
                              day_9: false,
                              day_10: false,
                              Urgency: "6 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>6 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: false,
                            day_3: false,
                            day_4: false,
                            day_5: false,
                            day_6: true,
                            day_7: false,
                            day_8: false,
                            day_9: false,
                            day_10: false,
                            Urgency: "6 Days"
                          })
                        }} selected={this.state.day_6} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: false,
                              day_3: false,
                              day_4: false,
                              day_5: false,
                              day_6: false,
                              day_7: true,
                              day_8: false,
                              day_9: false,
                              day_10: false,
                              Urgency: "7 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>7 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: false,
                            day_3: false,
                            day_4: false,
                            day_5: false,
                            day_6: false,
                            day_7: true,
                            day_8: false,
                            day_9: false,
                            day_10: false,
                            Urgency: "7 Days"
                          })
                        }} selected={this.state.day_7} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: false,
                              day_3: false,
                              day_4: false,
                              day_5: false,
                              day_6: false,
                              day_7: false,
                              day_8: true,
                              day_9: false,
                              day_10: false,
                              Urgency: "8 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>8 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: false,
                            day_3: false,
                            day_4: false,
                            day_5: false,
                            day_6: false,
                            day_7: false,
                            day_8: true,
                            day_9: false,
                            day_10: false,
                            Urgency: "8 Days"
                          })
                        }} selected={this.state.day_8} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: false,
                              day_3: false,
                              day_4: false,
                              day_5: false,
                              day_6: false,
                              day_7: false,
                              day_8: false,
                              day_9: true,
                              day_10: false,
                              Urgency: "9 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>9 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: false,
                            day_3: false,
                            day_4: false,
                            day_5: false,
                            day_6: false,
                            day_7: false,
                            day_8: false,
                            day_9: true,
                            day_10: false,
                            Urgency: "9 Days"
                          })
                        }} selected={this.state.day_9} />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }} >
                      <View>
                        <Text
                          onPress={() => {
                            this.setState({
                              day_1: false,
                              day_2: false,
                              day_3: false,
                              day_4: false,
                              day_5: false,
                              day_6: false,
                              day_7: false,
                              day_8: false,
                              day_9: false,
                              day_10: true,
                              Urgency: "10 Days"
                            })
                          }}
                          style={{ color: "#a10000", fontWeight: "bold", fontSize: 20 }}>10 Days</Text>
                      </View>
                      <View>
                        <Radio selectedColor="#a10000" onPress={() => {
                          this.setState({
                            day_1: false,
                            day_2: false,
                            day_3: false,
                            day_4: false,
                            day_5: false,
                            day_6: false,
                            day_7: false,
                            day_8: false,
                            day_9: false,
                            day_10: true,
                            Urgency: "10 Days"
                          })
                        }} selected={this.state.day_10} />
                      </View>
                    </View>
                  </View>
                </Dialog>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => { this.setState({ dialogVisible3: true }) }} >
                  <Text style={{ color: "#a10000", fontSize: 20 }} >{this.state.Urgency}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 0, margin: 0 }} >
              <View style={{ marginTop: 40, margin: 0 }}>
                <TextInput
                  onChangeText={(Location) => this.setState({ Location })}
                  value={this.state.Location}
                  underlineColorAndroid="transparent"
                  placeholder="Location"
                  placeholderTextColor="#a10000"
                  style={{
                    borderColor: "#a10000",
                    borderBottomWidth: 3, padding: 10,
                    borderRadius: 3, height: 60,
                    fontSize: 20, color: "#a10000",
                    backgroundColor: "#fff",
                  }} />
              </View>
              <View style={{ marginTop: 40, margin: 0 }}>
                <TextInput
                  value={this.state.ralation}
                  onChangeText={(ralation) => this.setState({ ralation })}
                  underlineColorAndroid="transparent"
                  placeholder="ralation with patient"
                  placeholderTextColor="#a10000"
                  style={{ borderColor: "#a10000", borderBottomWidth: 3, padding: 10, borderRadius: 3, height: 60, fontSize: 20, color: "#a10000", backgroundColor: "#fff" }} />
              </View>
              <View style={{ marginTop: 40, margin: 0 }}>
                <TextInput
                  onChangeText={(contectNumber) => this.setState({ contectNumber })}
                  value={this.state.contectNumber}
                  underlineColorAndroid="transparent"
                  placeholder="Contect number"
                  keyboardType="numeric"
                  placeholderTextColor="#a10000"
                  style={{ borderColor: "#a10000", borderBottomWidth: 3, padding: 10, borderRadius: 3, height: 60, fontSize: 20, color: "#a10000", backgroundColor: "#fff" }} />
              </View>
              <View style={{ marginTop: 40, margin: 0 }}>
                <TextInput
                  onChangeText={(instruction) => this.setState({ instruction })}
                  value={this.state.Password}
                  underlineColorAndroid="transparent"
                  placeholder="Additional instruction"
                  placeholderTextColor="#a10000"
                  type={Number}
                  style={{ borderColor: "#a10000", borderBottomWidth: 3, padding: 10, borderRadius: 3, height: 60, fontSize: 20, color: "#a10000", backgroundColor: "#fff" }} />
              </View>
            </View>
            {(this.state.SignUpFlage === false) ?
              <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 25, marginTop: 40 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(
                      (this.state.disableFlage === false) ?
                        this.state.Dashboard : "");
                    this.setState({ Dashboard: "" })
                  }
                  }>
                  <Image
                    source={require("./images/back.png")}
                    resizeMode="stretch"
                    style={this.state.disableFlage === false ? styles.imageBTN : styles.DisableImageBtn}
                  />
                </TouchableOpacity>
                {this.state.disableFlage === true ?
                  <ActivityIndicator
                    size={50}
                    color="#a10000"
                    style={{ marginTop: 0 }} />
                  : null}

                <TouchableOpacity
                  onPress={this.creactPost.bind(this)} >
                  <Image
                    source={require("./images/sed.png")}
                    resizeMode="stretch"
                    style={this.state.disableFlage === false ? styles.imageBTN : styles.DisableImageBtn} />
                </TouchableOpacity>
              </View>
              :
              <View>

              </View>}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBTN: {
    height: 50,
    width: 45
  },
  DisableImageBtn: {
    height: 50,
    width: 45,
    opacity: 0.5

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
export default connect(mapStateToProp, mapDispatchToProp)(PostRequiremntComponent)