import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

const mapStateToProps = state => {
    return {
        cabeceras: state.cabeceras,
        actividades: state.actividades,
        excursiones: state.excursiones
    }
}

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

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);