import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import { Thumbnail, Content, List, ListItem, Left, Body, Right, Switch } from 'native-base';
var ImagePicker = require('react-native-image-picker');
import { connect } from "react-redux"
import { currentUser } from "../../store/action/action"
import firebase from "firebase";
import RNFetchBlob from 'react-native-fetch-blob';


let database = firebase.database().ref("/")
class PrfofileData extends Component {
    constructor() {
        super()
        this.state = {
            avatarSource: "https://www.zent.com/images/userProfileIcon_gray.png",
            videoSource: null
        };
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
                // console.log(source.uri)

                RNFetchBlob.fs
                    .readFile(source.uri, 'base64')
                    .then((data) => {
                        // this.setState({
                        //     avatarSource: `data:image/jpg;base64,${data}`
                        // });
                        database.child(`user/${firebase.auth()
                        .currentUser.uid}/profilePic`).set(`data:image/jpg;base64,${data}`)
                    }).catch((a) => console.warn("errrrrCCC", a));
               
                }
            });
    }
    
    
    render() {
        console.log(this.state.avatarSource,"}}}}}}}}}}}}}}}}}}}}}}}")
        return (
            <View style={styles.container} >
                <View style={styles.prfilePic} >
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
                        <Thumbnail
                            style={{
                                height: 150,
                                width: 150,
                                borderRadius: 100
                            }} large
                            source={{
                                uri: (!this.props.currentUserobj.currentUser.profilePic) ?
                                    "https://www.zent.com/images/userProfileIcon_gray.png"
                                    : this.props.currentUserobj.currentUser.profilePic
                            }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.prfiileDataContainer} >
                    <Content>
                        <List>
                            <ListItem icon>
                                <Left>
                                    <Icon name="user-circle" color="#a10000" />
                                </Left>
                                <Body>
                                    <Text>{this.props.currentUserobj.currentUser.username}</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon name="envelope" color="#a10000" />
                                </Left>
                                <Body>
                                    <Text>{this.props.currentUserobj.currentUser.email}</Text>
                                </Body>
                            </ListItem>
                        </List>
                    </Content>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    prfilePic: {
        backgroundColor: "#a10000",
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
        padding: 5

    },
    prfiileDataContainer: {
        backgroundColor: "#fff",
        flex: 2,
        justifyContent: "center",
    },
    cameraBtn: {
        backgroundColor: "#fff",
        padding: 10,
        justifyContent: "center",
        borderRadius: 50,
        marginTop: -60,
        marginLeft: 150
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
export default connect(mapStateToProp, mapDispatchToProp)(PrfofileData)