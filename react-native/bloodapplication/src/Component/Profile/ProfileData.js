import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import { Thumbnail, Content, List, ListItem, Left, Body, Right, Switch } from 'native-base';
var ImagePicker = require('react-native-image-picker');
import { connect } from "react-redux"
import { currentUser } from "../../store/action/action"


class PrfofileData extends Component {
    constructor(){
        super()
        this. state = {
            avatarSource: null,
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
          console.log('Response = ', response);
    
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
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source
            });
          }
        });
      }
    

    render() {
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
                            source={{ uri: "https://scontent.fkhi4-1.fna.fbcdn.net/v/t1.0-1/c20.0.160.160/p160x160/16807099_168463856989761_5749670252778263859_n.jpg?_nc_cat=0&_nc_eui2=AeEmxfVUJJBMQi5Fwm_zlrYb_H4NSBIhmeV5YNLSEROf6QG0y4nYBrZtR1dg0cXuz1_zPIUQ1DgdIbcddVC8O_Jt9wJmcSRBqaxsJ7jU9EggYBpl0sM2DykQT4BuBdg0XO8&oh=a1d5ae386837531699242cf68c4ccbf6&oe=5BBC4359" }} />
                    </TouchableOpacity>
                    <View style={styles.cameraBtn} >
                        <TouchableOpacity>
                            <Icon name="camera" size={40} color="#a10000" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.prfiileDataContainer} >
                    <Content>
                        <List>
                            <ListItem icon>
                                <Left>
                                    <Icon name="user-circle"  color="#a10000"/>
                                </Left>
                                <Body>
                                    <Text>{this.props.currentUserobj.currentUser.username}</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon name="envelope"  color="#a10000"/>
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