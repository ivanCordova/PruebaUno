import React from "react";
import { Image, Text, View } from "react-native";

const ImgInternet = () =>{
    return(
        <View>
            <Image style={{width:300, height:300}} source={{uri: "https://pbs.twimg.com/profile_images/702595113432682496/SWoEMh9k_400x400.jpg"}}></Image>
            <Text style={{fontSize: 30}}>Prueba1</Text>
        </View>
    )
}
export default ImgInternet;