import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  Container, Header, Left, Body, Right, Icon, Title,
  Card, CardItem, Thumbnail, Text, Button,
} from 'native-base';
import firebase from "firebase"
import { postData, postPath } from "../../store/action/action";
import { connect } from "react-redux";





// let database = firebase.database().ref("/")
class O_nrgetive extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      dialogVisible: false,
      Dashboard: "Dashboard",
      PostView: "PostView"
    }
  }

  

  postData(data) {
    this.props.navigation.navigate(this.state.PostView)
    this.setState({
      PostView: ""
    })
    this.props.postData(data)
    this.props.postPath("O_nrgetive")
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#a10000", }}>
          <Left>
            <Button onPress={() => {
              this.props.navigation.navigate(this.state.Dashboard)
              this.setState({ Dashboard: "" })
            }} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
          </Body>
          <Right>
            <Title>O-</Title>
          </Right>
        </Header>
        <ScrollView>
          <View>
            {this.props.allPost.post.map((val, ind) => {
              return (
                <View key={ind}>
                  {(val.bloodGroup === "O-" && val.currentUserID !== firebase.auth().currentUser.uid) ?
                    <Card key={ind} style={{ marginTop: -5, elevation: 0 }} >
                      <TouchableOpacity
                        onPress={this.postData.bind(this, val)}
                      >
                        <CardItem>
                          <Left>
                            <Thumbnail source={{
                              uri: val.profilePic
                            }} />
                            <Body>
                              <Text>{val.username}</Text>
                              <Text note>{val.Urgency}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                      </TouchableOpacity>
                    </Card>
                    : null}
                </View>
              )
            })}
          </View>
        </ScrollView>
      </Container>
    );
  }
}


const styles = StyleSheet.create({

  Card_container: {
  },
  text_container: {
    marginTop: 4,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "#a10000",
    borderBottomWidth: 2,
    borderRadius: 0,
  },

  Text_title: {
    fontSize: 20,
    width: 110,
    marginLeft: 5,
    color: "#a10000",
    textAlign: "left",



  },
  Text: {
    fontSize: 18,
    width: 330,
    color: "#a10000",
    textAlign: "right",


  },
  Additional_container: {
    marginTop: 7,
    backgroundColor: "#fff",
    padding: 10
  },
  AdditionalText: {
    fontSize: 20,
    padding: 10,
    color: "#a10000",
  },

  AdditionalHeading: {
    fontSize: 25,
    color: "#a10000",
  },
  Image_button: {
    height: 50,
    width: 45
  }
})




const mapStateToProp = (state) => {
  // console.log(state.root)
  return ({
    allPost: state.root,
  });
};
const mapDispatchToProp = (dispatch) => {
  return {
    postData: (data) => {
      dispatch(postData(data))
    },
    postPath: (data) => {
      dispatch(postPath(data))
    }
  };
};


export default connect(mapStateToProp, mapDispatchToProp)(O_nrgetive)