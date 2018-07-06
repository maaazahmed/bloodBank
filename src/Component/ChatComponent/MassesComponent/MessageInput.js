import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native"
import Icons from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import { connect } from "react-redux"
// import moment from 'moment';
var ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob';





let database = firebase.database().ref("/")
class MessageInput extends Component {
    constructor() {
        super()
        this.state = {
            messageValue: "",
            isTypeing: true,
            isMessageReade: false,
            uri: ""
        }
        this.onFocusHandler = this.onFocusHandler.bind(this)
        this.onBlurHandler = this.onBlurHandler.bind(this)
    }


    onFocusHandler() {
        let reseverId = this.props.currentUserobj.messegesDAta.posterID
        // this.setState({ isTypeing: true })
        let isTypeing = { isTypeing: true }
        database.child(`rooms/${reseverId}/messages/isTypeing`).set(isTypeing)
    }
    onBlurHandler() {
        let reseverId = this.props.currentUserobj.messegesDAta.posterID
        this.setState({ isTypeing: false })
        let isTypeing = { isTypeing: false }
        database.child(`rooms/${reseverId}/messages/isTypeing`).set(isTypeing)
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                RNFetchBlob.fs
                    .readFile(source.uri, 'base64')
                    .then((data) => {
                        this.setState({
                            uri: `data:image/jpg;base64,${data}`
                        });
                        let obj = {
                            uri: this.state.uri,
                            senderId: this.props.currentUserobj.currentUser.id,
                            reseverId: this.props.currentUserobj.messegesDAta.posterID,
                        }
                        // console.log(obj.uri)
                        database.child(`rooms/${obj.senderId}/messages/${obj.reseverId}/`).push(obj)
                        database.child(`rooms/${obj.reseverId}/messages/${obj.senderId}/`).push(obj)
                  
                  
                    }).catch((a) => {  });




            }
        });
    }

    sendMessage() {
        let obj = {
            messagesValue: this.state.messageValue,
            sendrName: this.props.currentUserobj.currentUser.username,
            senderId: this.props.currentUserobj.currentUser.id,
            reseverId: this.props.currentUserobj.messegesDAta.posterID,
            reseverName: this.props.chatName,
            isMessageReade: this.state.isMessageReade,
        };
        if (obj.messagesValue !== "") {
            database.child(`rooms/${obj.senderId}/messages/${obj.reseverId}/`).push(obj)
            database.child(`rooms/${obj.reseverId}/messages/${obj.senderId}/`).push(obj)
            this.setState({
                messageValue: ""
            })
        }

        else {
            true
            alert("Plese type some text or select image")
        }
    }


    render() {
        return (
            <View style={Styles.container} >
                <View style={Styles.commentContainer} >
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}
                        style={{ marginTop: 9, marginRight: 5 }} >
                        <Icons style={{ color: "#a10000" }}
                            size={30}
                            name="camera" />
                    </TouchableOpacity>
                    <TextInput placeholder="Comment"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#a10000"
                        value={this.state.messageValue}
                        onChangeText={(messageValue) => { this.setState({ messageValue }) }}
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        style={Styles.commentInput} />
                    <TouchableOpacity onPress={this.sendMessage.bind(this)}
                        style={{ marginTop: 5, marginRight: 5 }} >
                        <Icons style={{ color: "#a10000" }}
                            size={35}
                            name="chevron-circle-right" />
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