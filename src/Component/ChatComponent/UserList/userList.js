import React, { Component } from 'react';
import {
    Container, Header, Content, Tab, Tabs, List,
    ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Text,
} from 'native-base';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import firebase, { auth } from "firebase";
import { connect } from "react-redux";
import { userListAction } from "../../../store/action/action"


let database = firebase.database().ref("/")

class userListCompponent extends Component {
    constructor() {
        super()
        this.state = {
            idsArr: []
        }
    }

    componentDidMount() {
        let postId = this.props.postID;
        let currentUser = firebase.auth().currentUser.uid
        database.child(`user`).on("child_added", (snap) => {
            var obj = snap.val()
            obj.id = snap.key
            this.props.userListAction(obj)
        })
        database.child(`chatsRoom/${currentUser}`).on("child_added", (snap) => {
            var obj = snap.val()
            obj.id = snap.key
            let idsArr = []
            idsArr.push(obj.posterID)
            this.setState({ idsArr: idsArr })
            console.log(this.state.idsArr)
        })
    }


    render() {

        let postId = this.props.postID;
        let currentUserId = this.props.userID.currentUser.id;
        // console.log(this.state.idsArr,"----------------")
        return (
            <View style={Styles.container} >
                <Content>
                    <List>
                        {this.props.Comments.userList.map((val, ind) => {
                            return (
                                this.state.idsArr.map((valId, indId) => {
                                    // console.log(valId)
                                    console.log(valId === val.id)
                                    return (
                                        <Content key={ind} >
                                            {(valId === val.id) ?
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate("mainCateComponent")} >
                                                    <Card style={{ flex: 0 }}>
                                                        <CardItem>
                                                            <Left>
                                                                <Thumbnail source={{ uri: 'https://www.zent.com/images/userProfileIcon_gray.png' }} />
                                                                <Body>
                                                                    <Text>{val.username}</Text>
                                                                    <Text note>April 15, 2016</Text>
                                                                </Body>
                                                            </Left>
                                                        </CardItem>
                                                    </Card>
                                                </TouchableOpacity>
                                                : null}
                                        </Content>
                                    )
                                })
                            )
                        }
                        )}
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
    // console.log(state.root,"_______ mapStateToProp")
    return ({
        Comments: state.root,
        userID: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        userListAction: (data) => {
            dispatch(userListAction(data))
        },
        messagesAction: (data) => {
            dispatch(messagesAction(data))
        }
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(userListCompponent)