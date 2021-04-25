import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { EXCURSIONES } from '../comun/excursiones';
import { baseUrl } from '../comun/comun';

function RenderItem (props) {

    const item = props.item;

    if (item != null) {
        return (
            <Card>
                <Card.Image source={{uri: baseUrl + item.imagen}}></Card.Image>
                <Text style={{
                    top: -150,
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'chocolate'
                }}>
                    {item.nombre}
                </Text>
                <Text style={{
                    margin: 5
                }}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    } else {
        return(
            <View></View>
        );
    }
}

class Home extends Component {

    constructor (props) {
        super(props);
        this.state = {
            cabeceras: CABECERAS,
            actividades: ACTIVIDADES,
            excursiones: EXCURSIONES
        };
    }

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default Home;