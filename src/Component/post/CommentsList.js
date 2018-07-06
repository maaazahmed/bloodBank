import React, { Component } from 'react';
import {
   Content, List,
     Left, Body,  Thumbnail, Card, CardItem, Text,
} from 'native-base';
import { View, StyleSheet } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { commentAction } from "../../store/action/action"


let database = firebase.database().ref("/")

class CommentList extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        let postId = this.props.postID;
        database.child(`posts/${postId}/Comments`).on("child_added", (snap) => {
            var obj = snap.val()
            obj.id = snap.key
            this.props.commentAction(obj)
        })
    }


    render() {
        let postId = this.props.postID;
        return (
            <View style={Styles.container} >
                <Content>

                    <List>
                        {this.props.Comments.commentList.map((val, ind) => {
                            return (
                                <Content key={ind}>
                                    {(postId === val.postId) ?
                                        <Card style={{ flex: 0, elevation:0, backgroundColor:"#f2f2f2", marginTop:0 }}>
                                            <CardItem>
                                                <Left>
                                                    <Thumbnail source={{ uri: 'https://www.zent.com/images/userProfileIcon_gray.png' }} />
                                                    <Body>
                                                        <Text>{val.username}</Text>
                                                        <Text note>April 15, 2016</Text>
                                                    </Body>
                                                </Left>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                        {val.comment}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                        : null}
                                </Content>
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
        Comments: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        commentAction: (data) => {
            dispatch(commentAction(data))
        },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(CommentList)