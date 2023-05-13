import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {useAppNavigation} from "../../hooks/useAppNavigation";

interface ForgotProps {
}

export const Forgot = ({}: ForgotProps) => {
    const navigation = useAppNavigation()
    return (
        <View>
            <Text>Forgot </Text>
            <Button title={'Go to Login'} onPress={() => {
                navigation.navigate('Home', { screen: 'Login' })
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({})
