import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native"
import Icons from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { connect } from "react-redux"




let database = firebase.database().ref("/")
class MessageInput extends Component {
    constructor() {
        super()
        this.state = {
            messageValue: ""
        }
    }

    sendMessage() {

        let obj = {
            messagesValue: this.state.messageValue,
            sendrName: this.props.currentUserobj.currentUser.username,
            senderId: this.props.currentUserobj.currentUser.id,
            reseverId: this.props.currentUserobj.messegesDAta.posterID,
            reseverName:this.props.chatName
        };
        var num = Math.random()
        database.child(`rooms/${obj.senderId}/messages/${obj.reseverId}/`).push(obj)
        database.child(`rooms/${obj.reseverId}/messages/${obj.senderId}/`).push(obj)
        this.setState({
            messageValue: ""
        })
    }

    render() {
        return (
            <View style={Styles.container} >
                <View style={Styles.commentContainer} >
                    <TextInput placeholder="Comment"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#a10000"
                        value={this.state.messageValue}
                        onChangeText={(messageValue) => { this.setState({ messageValue }) }}
                        style={Styles.commentInput} />
                    <TouchableOpacity onPress={this.sendMessage.bind(this)}
                        style={{ marginTop: 5, marginRight: 5 }} >
                        <Icons style={{ color: "#a10000" }} size={35} name="chevron-circle-right" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    } 
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#efeff4",
    },
    commentContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 2,
        borderBottomColor: "#a10000",
        marginBottom: 4,
        marginLeft: 5,
        marginRight: 5,
    },
    commentInput: {
        fontSize: 20,
        flex: 1,
        marginBottom: -15
    }
})


const mapStateToProp = (state) => {
    return ({
        currentUserobj: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProp, mapDispatchToProp)(MessageInput)