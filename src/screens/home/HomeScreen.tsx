import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {useAppNavigation} from "../../hooks/useAppNavigation";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NestedHomeType} from "../types";
import {Login} from "../login/Login";
import {Registration} from "../registration/Registration";
import {Forgot} from "../forgot/Forgot";

interface HomeScreenProps {
}

const Stack = createNativeStackNavigator<NestedHomeType>()

export const HomeScreen = ({}: HomeScreenProps) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Login'} component={Login}/>
            <Stack.Screen name={'Registration'} component={Registration}/>
            <Stack.Screen name={'Forgot'} component={Forgot}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({})
