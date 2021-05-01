import React, { Component } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones
    }
}

class Calendario extends Component {

    render() {
        const { navigate } = this.props.navigation;

        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                    bottomDivider>
                    <Avatar source={{uri: baseUrl + item.imagen}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }

        return (
            <SafeAreaView>
                <FlatList
                    data={this.props.excursiones.excursiones}
                    renderItem={renderCalendarioItem}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        );
    };
}

export default connect(mapStateToProps)(Calendario);