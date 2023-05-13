import React, {ReactNode} from 'react'
import {View} from 'react-native'

interface VStackPropsType {
    children: ReactNode
}

export const VStack = ({children}: VStackPropsType) => {
    return (
        <View>
            {children}
        </View>
    );
};
