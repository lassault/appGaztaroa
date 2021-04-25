import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import Home from './HomeComponent';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';

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
            <Drawer.Screen name='Campo base' component={HomeNavegador} />
            <Drawer.Screen name='Quienes somos' component={QuienesSomosNavegador} />
            <Drawer.Screen name='Calendario' component={CalendarioNavegador} />
            <Drawer.Screen name='Contacto' component={ContactoNavegador} />
        </Drawer.Navigator>
    )
}

function QuienesSomosNavegador() {
    return (
        <Stack.Navigator
            initialRouteName='Quienes somos'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#015afc' },
                headerTitleStyle: { color: '#fff' }
            }}
        >
            <Stack.Screen
                name='Quienes somos'
                component={QuienesSomos}
                options={{
                    title: 'Quienes somos'
                }}
            />
        </Stack.Navigator>
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

function ContactoNavegador() {
    return (
        <Stack.Navigator
            initialRouteName='Contacto'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#015afc' },
                headerTitleStyle: { color: '#fff' }
            }}
        >
            <Stack.Screen
                name='Contacto'
                component={Contacto}
                options={{
                    title: 'Contacto'
                }}
            />
        </Stack.Navigator>
    )
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