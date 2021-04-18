import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import Home from './HomeComponent';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeNavegador() {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#015afc' },
                headerTitleStyle: { color: '#fff' }
            }}
        >
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    title: 'Campo Base'
                }}
            />
        </Stack.Navigator>
    );
}

function DrawerNavegador() {
    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#c2d3da'
            }}
            initialRouteName='Home'
        >
            <Drawer.Screen name='Home' component={HomeNavegador} />
            <Drawer.Screen name='Calendario' component={CalendarioNavegador} />
        </Drawer.Navigator>
    )
}

function CalendarioNavegador() {
    return (
        <Stack.Navigator
            initialRouteName='Calendario'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#015afc' },
                headerTitleStyle: { color: '#fff' }
            }}
        >
            <Stack.Screen
                name='Calendario'
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa'
                }}
            />
            <Stack.Screen
                name='DetalleExcursion'
                component={DetalleExcursion}
                options={{
                    title: 'Detalle Excursión'
                }}
            />
        </Stack.Navigator>
    );
}

class Campobase extends Component {

    render() {

        return (
            <NavigationContainer>
                <View 
                    style={{
                        flex: 1,
                        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
                    }}>
                    <DrawerNavegador />
                </View>
            </NavigationContainer>
        );
    }
}

export default Campobase;