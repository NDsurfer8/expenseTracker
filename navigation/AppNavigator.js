import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ManageExpense from '../src/screens/ManageExpense'
import RecentExpenses from '../src/screens/RecentExpenses'
import AllExpenses from '../src/screens/AllExpenses'
import { GlobalStyles } from '../constants/styles'
import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
    return (
        <Tab.Navigator screenOptions={({navigation})=>({
            headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({tintColor})=>{
                return(
                    <Ionicons name="add" size={24} color={tintColor} onPress={()=>navigation.navigate('ManageExpense')} />
                )
            }
        })}>
            <Tab.Screen name='RecentExpenses' component={RecentExpenses} options={{
                title: 'Recent Expenses',
                tabBarLabel: 'Recent',
                tabBarIcon: ({color, size})=> <Ionicons name='hourglass' size={size} color={color} />
            }} />
            <Tab.Screen name='AllExpenses' component={AllExpenses} options={{
                title: 'All Expenses',
                tabBarLabel: 'All Expenses',
                tabBarIcon: ({color, size})=> <Ionicons name='calendar' size={size} color={color} />
            }}  />
        </Tab.Navigator>
    )
}


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='ExpensesOverview' screenOptions={{
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: 'white'
            }} >
                <Stack.Screen
                    name='ExpensesOverview'
                    component={ExpensesOverview}
                    options={{headerShown:false, presentation:'modal'}}
                />
                <Stack.Screen
                    name='ManageExpense'
                    component={ManageExpense}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator