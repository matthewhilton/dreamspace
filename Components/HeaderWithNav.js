import React from "react"
import MenuHamburger from "./MenuHamburger";
import { SafeAreaView, View } from "react-native"
import { Title } from "react-native-paper";

const HeaderWithNav = ({title=""}) => {

    return(
        <SafeAreaView style={{alignItems: "flex-start", alignSelf: "flex-start", width: "100%"}}>
             <MenuHamburger />
           
            <View style={{marginLeft: 12}}>
                <Title style={{fontWeight: "bold", fontSize: 30}}>{title}</Title>
            </View>
        </SafeAreaView>
    )
}

export default HeaderWithNav;