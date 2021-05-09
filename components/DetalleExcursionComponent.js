import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

const mapStateToProps = state => {
    return {
        comentarios: state.comentarios,
        excursiones: state.excursiones
    }
}

function RenderExcursion (props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Image source={{uri: baseUrl + excursion.imagen}}>
                    <Card.Title style={StyleSheet.cardTitleStyle}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{margin: 20}}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
                {/*<Card.Title>{excursion.nombre}</Card.Title>
                <Card.Divider />
                <Card.Image source={{uri: baseUrl + excursion.imagen}}></Card.Image>
                <Text 
                    style={{
                        margin: 20
                    }}
                >
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={ props.favorita ? 'heart' : 'heart-o' }
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursion ya se encuentra entre las favoritas') : props.onPress()}
                />*/}
            </Card>
        )
    } else {
        return(
            <View></View>
        );
    }
}

function RenderComentario (props) {

    const comentarios = props.comentarios;

    const renderComentarioItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>
                    {item.comentario}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {item.valoracion} Stars
                </Text>
                <Text style={{ fontSize: 12 }}>
                        {'- ' + item.autor + ', ' + item.dia} 
                </Text>
            </View>
        );
    };

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList
                data={comentarios}
                renderItem={renderComentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DetalleExcursion extends Component {
    constructor (props) {
        super(props);
        this.state = {
            favoritos: []
        };
    }

    marcarFavorito (excursionId) {
        this.setState({favoritos: this.state.favoritos.concat(excursionId)});
    }

    render() {
        const {excursionId} = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    cardTitleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    }
})

export default connect(mapStateToProps)(DetalleExcursion);