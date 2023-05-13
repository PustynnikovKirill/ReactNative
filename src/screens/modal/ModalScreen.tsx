import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {useAppNavigation} from "../../hooks/useAppNavigation";

interface ModalScreenProps {
}

export const ModalScreen = ({}: ModalScreenProps) => {
    const navigation = useAppNavigation()
    return (
        <View>
            <Text>ModalScreen </Text>
            <Button title={'CLOSED MODAL'} onPress={() => {
                navigation.goBack()
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({})
