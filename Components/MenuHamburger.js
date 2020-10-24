import { useNavigation } from "@react-navigation/native";
import React from "react";
import { IconButton } from "react-native-paper";

export default MenuHamburger = () => {
    const navigation = useNavigation();
    return( 
            <IconButton 
            onPress={() => navigation.openDrawer()} 
            icon="menu"
            size={35}
            />
    )
}