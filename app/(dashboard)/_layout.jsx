import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

export default function DashboardLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.navBackground, paddingTop: 10, height: 90 },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
      }}
    >
      <Tabs.Screen 
        name="home"
        options={{ title: "Home", tabBarIcon: ({focused}) => (
            <Ionicons 
            size = {24}
            name = {focused ? "home" : "home-outline"}
            color = {focused ? theme.iconColorFocused : theme.iconColor}
            />
        ) }} 
      />
      <Tabs.Screen 
        name="code"
        options={{ title: "Code", tabBarIcon: ({focused}) => (
            <Ionicons 
            size = {24}
            name = {focused ? "code" : "code-outline"}
            color = {focused ? theme.iconColorFocused : theme.iconColor}
            />
        ) }}  
      />
      <Tabs.Screen 
        name="test"
        options={{ title: "Test", tabBarIcon: ({focused}) => (
            <Ionicons 
            size = {24}
            name = {focused ? "flask" : "flask-outline"}
            color = {focused ? theme.iconColorFocused : theme.iconColor}
            />
        ) }}  
      />
      <Tabs.Screen 
        name="deploy"
        options={{ title: "Deploy", tabBarIcon: ({focused}) => (
            <Ionicons 
            size = {24}
            name = {focused ? "rocket" : "rocket-outline"}
            color = {focused ? theme.iconColorFocused : theme.iconColor}
            />
        ) }}   
      />
      <Tabs.Screen 
        name="security"
        options={{ title: "Security", tabBarIcon: ({focused}) => (
            <Ionicons 
            size = {24}
            name = {focused ? "shield" : "shield-outline"}
            color = {focused ? theme.iconColorFocused : theme.iconColor}
            />
        ) }}   
      />
    </Tabs>
  )
}