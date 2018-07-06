import React, { Component } from 'react';
import { List, Text, } from 'native-base';
import { View, StyleSheet, ScrollView, Image } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { messagesAction } from "../../../store/action/action"


let database = firebase.database().ref("/")

class MessagesList extends Component {
    constructor() {
        super()
        this.state = {
            isTypeing: false,

        }
        setInterval(() => {
            database.child(`rooms/${firebase.auth().currentUser.uid}/messages/isTypeing/`).on("child_added", (snap) => {
                var obj = snap.val()
                console.log(obj)
                this.setState({ isTypeing: obj })
            })
        }, 500)
    }


    componentDidMount() {
        let obj = {
            sendrName: this.props.currentUserobj.currentUser.username,
            reseverName: this.props.chatName.chatName,
            senderId: this.props.currentUserobj.currentUser.id,
            reseverId: this.props.currentUserobj.messegesDAta.posterID,
        };
        database.child(`rooms/${firebase.auth().currentUser.uid}/messages/${obj.reseverId}/`).on("child_added", (snap) => {
            var obj = snap.val()
            obj.id = snap.key
            this.props.messagesAction(obj)
        })
    }




    render() {
        let currentUser = firebase.auth().currentUser.uid;
        return (
            <View style={Styles.container} >
                <ScrollView ref="scrollView"  >
                    <List>
                        {this.props.messagesList.messeges.map((val, ind) => {
                            return (
                                <View key={ind}>
                                    <View >
                                        {!(val.uri) ?
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
                                            :
                                            <Image source={{ uri: val.uri }}
                                                style={(val.senderId === currentUser) ?
                                                    {
                                                        height: 200,
                                                        width: 200,
                                                        borderRadius: 5,
                                                        alignSelf: "flex-end",
                                                        marginTop: 10,
                                                        margin: 15,
                                                    } :
                                                    {
                                                        height: 200,
                                                        width: 200,
                                                        borderRadius: 5,
                                                        alignSelf: "flex-start",
                                                        margin: 15,
                                                    }
                                                } />
                                        }
                                    </View>
                                </View>

                            )
                        })}
                    </List>
                </ScrollView>
                {(this.state.isTypeing) ?
                    <View style={{
                        width: 90
                        , padding: 5, backgroundColor: "#a10000",
                        borderRadius: 30, justifyContent: "center",
                        position: "absolute",
                        bottom: 10,
                        left: 10

                    }} >
                        <Text style={{ color: "#f2f2f2", alignSelf: "center" }} >
                            Typeing...
                    </Text>
                    </View>
                    : null}
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





