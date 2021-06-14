import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';

const mapStateToProps = state => {
    return {
        comentarios: state.comentarios,
        excursiones: state.excursiones,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

function RenderExcursion (props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Image source={{uri: excursion.imagen}}>
                    <Card.Title style={StyleSheet.cardTitleStyle}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{margin: 10}}>
                    {excursion.descripcion}
                </Text>
                <View 
                    style={{
                        flexDirection: 'row', 
                        justifyContent: 'center' 
                    }}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color={colorGaztaroaOscuro}
                        onPress={() => props.comentarExcursion()}
                    />
                </View>
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
            valoracion: 3,
            autor: [],
            comentario: [],
            showModal: false
        }
    }

    marcarFavorito (excursionId) {
        this.props.postFavorito(excursionId);
    }

    comentarExcursion() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    resetearModal() {
        this.setState({
            valoracion: 3,
            autor: [],
            comentario: [],
            showModal: false
        });
    }

    gestionarComentario (excursionId) {
        console.log(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
        this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
        this.resetearModal();
    }

    render() {
        const {excursionId} = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.some(el => el === excursionId)}
                    comentarExcursion={() => this.comentarExcursion()}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.resetearModal()}}
                    onRequestClose={() => {this.resetearModal()}}
                >
                    <View style={style.modal}>
                        <View>
                            <Rating
                                showRating
                                fractions={1}
                                startingValue={3}
                                onFinishRating={rating => this.setState({ valoracion: rating })}
                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Autor'
                                onChangeText={value => this.setState({ autor: value })}
                                leftIcon={
                                    <Icon name='user-o' type='font-awesome' />
                                }
                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Comentario'
                                onChangeText={value => this.setState({ comentario: value })}
                                leftIcon={
                                    <Icon name='comment-o' type='font-awesome' />
                                }
                            />
                        </View>
                        <View>
                            <Text
                                style={style.modalText}
                                onPress={() => this.gestionarComentario(excursionId)}
                            >ENVIAR</Text>
                            <Text
                                style={style.modalText}
                                onPress={() => this.resetearModal()}
                            >CANCELAR</Text>
                        </View>
                    </View>
                </Modal>
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
    },
    modal: {
        justifyContent: 'center',
        marginTop: 50
    },
    modalText: {
        textAlign: 'center',
        color: colorGaztaroaOscuro,
        fontSize: 18,
        margin: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);