import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion (props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Title>{excursion.nombre}</Card.Title>
                <Card.Divider />
                <Card.Image source={require('../assets/40Años.png')}></Card.Image>
                <Text 
                    style={{
                        margin: 20
                    }}
                >
                    {excursion.descripcion}
                </Text>
            </Card>
        )
    }
}

class DetalleExcursion extends Component {
    constructor (props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render() {
        const {excursionId} = this.props.route.params;
        return (
            <RenderExcursion excursion={this.state.excursiones[+excursionId]} />
        );
    }
}

export default DetalleExcursion;