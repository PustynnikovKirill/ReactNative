import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {useAppNavigation} from "../../hooks/useAppNavigation";

interface LoginProps {
}

export const Login = ({}: LoginProps) => {
    const navigation = useAppNavigation()
    return (
        <View>
            <Text>Login</Text>
            <Button title={'Go to Registration'} onPress={() => {
                navigation.navigate('Home', { screen: 'Registration' })
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({})
