import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const BigButton = ({children=null, icon=null, color="red", ...props}) => {
    const theme = useTheme()
    return (
        <TouchableOpacity {...props}>
            <View style={{
                backgroundColor: color,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: 15, 
                }}>
        
                    {children}
            </View>
        </TouchableOpacity>
    )
}

export default BigButton
