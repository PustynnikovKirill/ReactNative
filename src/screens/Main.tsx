import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {HomeScreen} from "./home/HomeScreen";
import {MainTabsType} from "./types";
import {DetailsScreen} from "./details/DetailsScreen";
import {SettingsScreen} from "./settings/SettingsScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import createStackNavigator from "react-native-screens/createNativeStackNavigator";
import {ModalScreen} from "./modal/ModalScreen";

interface MainProps {
}

//const Stack = createNativeStackNavigator<MainStackType>()
const Tab = createBottomTabNavigator<MainTabsType>()

export const Main = ({}: MainProps) => {
    return (
        <View style={styles.container}>
            <Tab.Navigator>
                <Tab.Screen name={"Home"} component={HomeScreen}/>
                <Tab.Screen name={"Details"} component={DetailsScreen}/>
                <Tab.Screen name={"Settings"}>{
                    (props) => <SettingsScreen {...props} age={30}/>
                }</Tab.Screen>
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
