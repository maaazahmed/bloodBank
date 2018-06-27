import React, { Component } from 'react';
import { Content, List, Text, } from 'native-base';
import { View, StyleSheet, ScrollView } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { messagesAction } from "../../../store/action/action"


let database = firebase.database().ref("/")

class MessagesList extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {
        let obj = {
            sendrName: this.props.currentUserobj.currentUser.username,
            reseverName: this.props.chatName.chatName,
            senderId: this.props.currentUserobj.currentUser.id,
            reseverId: this.props.currentUserobj.messegesDAta.posterID,
        };
        database.child(`rooms/${firebase.auth().currentUser.uid}/messages/${obj.reseverId}/`).on("child_added", (snap) => {
            // console.log(firebase.auth().currentUser.uid)
            var obj = snap.val()
            obj.id = snap.key
            this.props.messagesAction(obj)
            console.log(snap.val(), "??????????????????")
        })


    }

    onSomeEvent() {
        this.refs.scrollView.scrollTo(0); 
      }

    render() {
        let postId = this.props.postID;
        let posterID = this.props.chatName.posterID;
        let messagesList = this.props.messagesList
        //    console.log(messagesList.messegesDAta.posterID,"??????????????")
        let currentUser = firebase.auth().currentUser.uid;
        // console.log(currentUser, "{}{}{}{}}}}}}", messagesList.currentUser.id)
        return (
            <View style={Styles.container} >
                <Content>
                    <List>
                        {this.props.messagesList.messeges.map((val, ind) => {
                            return (
                                <ScrollView ref="scrollView"  >
                                    <View key={ind}>
                                        <View
                                            style={(val.senderId === currentUser) ?
                                                {
                                                    color: "#fff",
                                                    backgroundColor: "#a10000",
                                                    fontSize: 20,
                                                    marginTop: 10,
                                                    width: 200,
                                                    borderRadius: 25,
                                                    margin: 15,
                                                    padding: 13,
                                                    alignSelf: "flex-end",

                                                }
                                                :
                                                {
                                                    color: "#fff",
                                                    backgroundColor: "#f2f2f2",
                                                    fontSize: 20,
                                                    marginTop: 10,
                                                    width: 200,
                                                    borderRadius: 25,
                                                    margin: 15,
                                                    padding: 13,
                                                    alignSelf: "flex-start"

                                                }} >
                                            <Text
                                                style={(val.senderId === currentUser) ?
                                                    { color: "#fff", fontSize: 20, } :
                                                    { color: "#a10000", fontSize: 20 }}
                                            >{val.messagesValue}</Text>
                                        </View>
                                    </View>
                                </ScrollView>

                            )
                        })}
                    </List>
                </Content>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"

    },
    commentContainer: {
        flex: 2,
        backgroundColor: "green"
    }
})

const mapStateToProp = (state) => {
    return ({
        messagesList: state.root,
        currentUserobj: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        messagesAction: (data) => {
            dispatch(messagesAction(data))
        },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(MessagesList)