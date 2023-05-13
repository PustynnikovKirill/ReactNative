import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {useAppNavigation} from "../../hooks/useAppNavigation";

interface RegistrationProps {
}

export const Registration = ({}: RegistrationProps) => {
    const navigation = useAppNavigation()
    return (
        <View>
            <Text>Registration </Text>
            <Button title={'Go to Forgot'} onPress={() => {
                navigation.navigate('Home', { screen: 'Forgot' })
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({})
