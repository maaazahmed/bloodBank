
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
} from 'react-native';

export default class SplashScreen extends Component {

    constructor(){
        super()
        
    }

    componentWillMount(){
        setTimeout(()=>{
            this.props.navigation.navigate("SingInComponent")
        }, 0)
    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                <ImageBackground
                    style={{ flex: 1, justifyContent: "center", alignItems: "center", width: null, height: null, backgroundColor: "rgba(0.0.0.0)", resizeMode: "stretch" }}
                    source={{ uri: "http://www.youngbloods.org.uk/wp-content/uploads/2016/04/47_Blood_Donation_-1024x768.jpg" }}
                    resizeMode="stretch"
                >
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
//    SplashScreen :{ flex: 1,
//      justifyContent:"center",
//       alignItems:"center",
//        width: null,
//       height: null, backgroundColor: "rgba(0.0.0.0)"
//     }
})