import React, { Component } from 'react';
import { View } from 'react-native';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';

class Campobase extends Component {
    constructor (props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            seleccionExcursion: null
        }
    };

    onSeleccionExcursion (excursionId) {
        this.setState({ seleccionExcursion: excursionId })
    }

    render() {

        return (
            <View>
                <DetalleExcursion excursion={this.state.excursiones.filter((excursion) => excursion.id === this.state.seleccionExcursion)[0]} />
                <Calendario excursiones={this.state.excursiones} onPress={(excursionId) => this.onSeleccionExcursion(excursionId)} />
            </View>
        );
    }
}

export default Campobase;