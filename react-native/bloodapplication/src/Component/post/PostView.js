import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {
  Container, Content, Header, Left, Body, Right, Icon, Title,
  Card, CardItem, Thumbnail, Text, Button,
  List, ListItem, Switch, FooterTab, Footer
} from "native-base"
import { Dialog } from 'react-native-simple-dialogs';
import * as firebase from "firebase"
import { connect } from 'react-redux';
import { renderPost, commentNull, sendMessageAction } from "../../store/action/action"
import Icons from "react-native-vector-icons/FontAwesome"
import CommentList from "./CommentsList"
import CommentInput from "./CommentInput"



let database = firebase.database().ref("/")
class PostView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      dialogVisible: false,
      prefie: "",
      postPath: props.postData.postPath,
      bool:"",
      idSArr:[]
    }
    // console.log(this.state)
  }


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  messegRoute(postData) {
    let chatUser = {
      chatName: postData.username,
      posterID: postData.currentUserID,
    }

   this.props.sendMessageAction(chatUser)
    // let currentUser = firebase.auth().currentUser.uid
    // database.child(`chatsRoom/${currentUser}`).on("child_added", (snap) => {
    //   var obj = snap.val()
    //   obj.id = snap.key
    // })
    this.props.navigation.navigate("mainCateComponent")
    // database.child(`chatsRoom/${currentUser}`).push(chatUser)
  }


  render() {
    let postData = this.props.postData.postData;
    const avatar = (
      <View style={{ flexDirection: "row" }} >
      </View>
    )

    return (
      <Container>
        <Header style={{ backgroundColor: "#a10000" }}>
          <Left>
            <Thumbnail small source={{
              uri: (postData.photo === "") ?
                "https://www.zent.com/images/userProfileIcon_gray.png" :
                postData.photo
            }} />
          </Left>
          <Body>
            <Title>{postData.username}</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Left>
                <Text>{postData.bloodGroup}</Text>
              </Left>
              <Right>
                <Icon style={{ color: "#a10000" }} name="arrow-back" />
              </Right>
            </ListItem>
            <ListItem >
              <Left>
                <Text>{postData.bottols}</Text>
              </Left>
              <Right>
                <Icon style={{ color: "#a10000" }} name="arrow-back" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>{postData.Urgency}</Text>
              </Left>
              <Right>
                <Icon style={{ color: "#a10000" }} name="arrow-back" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>{postData.Location}</Text>
              </Left>
              <Right>
                <Icon style={{ color: "#a10000" }} name="arrow-back" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>{postData.ralation}</Text>
              </Left>
              <Right>
                <Icon style={{ color: "#a10000" }} name="arrow-back" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>{postData.contectNumber}</Text>
              </Left>
              <Right>
                <Icon style={{ color: "#a10000" }} name="arrow-back" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>{postData.email}</Text>
              </Left>
              <Right>
                <Icon style={{ color: "#a10000" }} name="arrow-back" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>{postData.instruction}</Text>
              </Left>
              <Right>
                <Icon style={{ color: "#a10000" }} name="arrow-back" />
              </Right>
            </ListItem>
          </List>
          <View style={{ marginTop: 22 }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#efeff4" }} >
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                      this.props.commentNull([])
                    }}>



                    <View style={styles.commenBackBtn} >
                      <Icons name="arrow-circle-left" size={30} color="#fff" />
                    </View>



                  </TouchableHighlight>
                  <CommentList postID={postData.id} />
                </View>
              </View>
              <View style={{ backgroundColor: "#a10000", height: 60 }} >
                <CommentInput postID={postData.id} />
              </View>
            </Modal>
          </View>

        </Content>
        <Footer style={{ backgroundColor: "#a10000" }} >
          <FooterTab style={{ backgroundColor: "#a10000" }}>
            <Button onPress={() => {
              this.props.navigation.navigate(this.state.postPath);
              this.setState({ postPath: "" })
            }}>
              <Icons name="angle-left" size={35} color="#fff" />
            </Button>
            <Button onPress={this.messegRoute.bind(this, postData)} >
              <Icons name="comment" size={28} color="#fff" />
            </Button>
            <Button>
              <Icon name="person" />
            </Button>
            <Button onPress={() => { this.setState({ modalVisible: true }) }} >
              <Icons name="comments" size={28} color="#fff" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>

    )
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
    height: 25,
    width: 30
  },
  commenBackBtn: {
    height: 45,
    backgroundColor: "#a10000",
    justifyContent: "center",
    paddingLeft: 10
  }
})



const mapStateToProp = (state) => {
  return ({
    postData: state.root,
  })
}
const mapDispatchToProp = (dispatch) => {
  return {
    commentNull: (data) => {
      dispatch(commentNull(data))
    },
    sendMessageAction:(data)=>{
      dispatch(sendMessageAction(data))
    }
  };
}


export default connect(mapStateToProp, mapDispatchToProp)(PostView)