import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        cabeceras: state.cabeceras,
        actividades: state.actividades,
        excursiones: state.excursiones
    }
}

function RenderItem (props) {

    if (props.isLoading) {
        return (
            <IndicadorActividad />
        );
    } else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    } else {
        const item = props.item;

        if (item != null) {
            return (
                <Card>
                    <Card.Image source={{uri: item.imagen}}>
                        <Card.Title style={styles.cardTitleStyle}>{item.nombre}</Card.Title>
                    </Card.Image>
                    <Text style={{margin: 20}}>
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
}

class Home extends Component {

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem
                    item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardTitleStyle: {
        color: 'chocolate',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    }
})

export default connect(mapStateToProps)(Home);