import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {NavigatorScreenParams} from "@react-navigation/native";

export type MainTabsType = {
    Home: NavigatorScreenParams<NestedHomeType>
    Details: undefined
    Settings: {
        name: string
        myAge: number
        isDoneCourse: boolean
    } | undefined
    Modal: undefined
}

export type NestedHomeType = {
    Login: undefined
    Registration: undefined
    Forgot: undefined
}

export type StackSettingsProps = NativeStackScreenProps<MainTabsType, 'Settings'>
