import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {useAppNavigation} from "../../hooks/useAppNavigation";

interface DetailsScreenProps {
}

export const DetailsScreen = ({}: DetailsScreenProps) => {
    const navigation = useAppNavigation()
    return (
        <View>
            <Text>DetailsScreen </Text>
            <Button title={'Jump to Home screen'} onPress={() => {
                navigation.navigate('Settings', { name: 'SergGrey', myAge: 30, isDoneCourse: false})
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({})
