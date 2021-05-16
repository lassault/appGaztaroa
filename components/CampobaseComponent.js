import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { fetchCabeceras, fetchActividades, fetchExcursiones, fetchComentarios } from '../redux/ActionCreators';
import Home from './HomeComponent';
import Calendario from './CalendarioComponent';
import Contacto from './ContactoComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import ExcursionesFavoritas from './VistaFavoritosComponent';
import PruebaEsfuerzo from './PruebaEsfuerzoComponent';
import QuienesSomos from './QuienesSomosComponent';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCabeceras: () => dispatch(fetchCabeceras()),
    fetchActividades: () => dispatch(fetchActividades()),
    fetchExcursiones: () => dispatch(fetchExcursiones()),
    fetchComentarios: () => dispatch(fetchComentarios())
})

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavegador() {
    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: colorGaztaroaClaro
            }}
            initialRouteName='Home'
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name='Campo base' component={HomeNavegador} 
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name='Calendario' component={CalendarioNavegador} 
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name='Excursiones favoritas' component={ExcursionesFavoritasNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='thumbs-up'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name='Prueba de esfuerzo' component={PruebaEsfuerzoNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='heartbeat'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name='Contacto' component={ContactoNavegador} 
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name='Quienes somos' component={QuienesSomosNavegador} 
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

function CustomDrawerContent (props) {
    
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('../assets/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

function HomeNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
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

function QuienesSomosNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Quienes somos'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
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

function CalendarioNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Calendario'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' }
            }}
        >
            <Stack.Screen
                name='Calendario'
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa',
                    headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
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

function ContactoNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Contacto'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
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

function PruebaEsfuerzoNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Prueba de esfuerzo'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
            }}
        >
            <Stack.Screen
                name='Prueba de esfuerzo'
                component={PruebaEsfuerzo}
                options={{
                    title: 'Prueba de esfuerzo'
                }}
            />
        </Stack.Navigator>
    )
}

function ExcursionesFavoritasNavegador ({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='ExcursionesFavoritas'
            headerMode='screen'
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro},
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />)
            }}
        >
            <Stack.Screen
                name='ExcursionesFavoritas'
                component={ExcursionesFavoritas}
                options={{
                    title: 'ExcursionesFavoritas'
                }}
            />
        </Stack.Navigator>
    )
}
class Campobase extends Component {

    componentDidMount() {
        this.props.fetchCabeceras();
        this.props.fetchActividades();
        this.props.fetchExcursiones();
        this.props.fetchComentarios();
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: colorGaztaroaOscuro,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);