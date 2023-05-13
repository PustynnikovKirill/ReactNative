import {NavigationProp, useNavigation} from "@react-navigation/native";
import {MainTabsType} from "../screens/types";

export type NavigationUseType = NavigationProp<MainTabsType>

export const useAppNavigation = () => useNavigation<NavigationUseType>()
