import React,{ Component } from "react";
import { View, StyleSheet } from "react-native";
import MessageInput from "./MessageInput";
import MessagesList from "./MessageList"
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { NullUserAction } from "../../../store/action/action"
import { connect } from "react-redux"



 class mainCateComponent extends Component{
    render(){
        let chatName = this.props.postData.messegesDAta; console.log(chatName) 
        return (
            <View style={styles.container} >
                <Header style={{backgroundColor:"#a10000"}} >
                    <Left>
                        <Button onPress={()=>{
                            // this.props.navigation.navigate("")
                            // this.props.NullUserAction([])
                        }} transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{chatName.chatName}</Title>
                    </Body>
                    {/* <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right> */}
                </Header>
                <View style={styles.messageListContainer} >
                    <MessagesList chatName={chatName}  />
                </View>
                <View style={styles.messageInputContainer}>
                    <MessageInput chatName={chatName.chatName} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    messageListContainer:{
        backgroundColor:"#fff",
        flex:1,
    },
    messageInputContainer:{
        height:60
    }
})




const mapStateToProp = (state) => {
    return ({
      postData: state.root,
    })
  }
  const mapDispatchToProp = (dispatch) => {
    return {
        NullUserAction: (data) => {
        dispatch(NullUserAction(data))
      }
    };
  }
  
  
  export default connect(mapStateToProp, mapDispatchToProp)(mainCateComponent)