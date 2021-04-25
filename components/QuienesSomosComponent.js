import React, { Component } from "react";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { Text } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { ACTIVIDADES } from "../comun/actividades";
import { baseUrl } from "../comun/comun";
import { QUIENESSOMOS } from '../comun/quienessomos';

function Historia (props) {

    const quienessomos = props.quienessomos;

    return (
        <Card>
            <Card.Title>{quienessomos.titulo}</Card.Title>
            <Card.Divider />
            <Text
                style={{
                    margin: 5
                }}
            >
                {quienessomos.texto}
            </Text>
        </Card>
    )
}

class QuienesSomos extends Component {
    constructor (props) {
        super(props);
        this.state = {
            quienessomos: QUIENESSOMOS,
            actividades: ACTIVIDADES
        }
    }

    render() {
        
        const renderActividadItem = ({ item, index }) => {
            return (
                    <ListItem
                        key={index}
                        bottomDivider
                    >
                        <Avatar source={{uri: baseUrl + item.imagen}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
            );
        }

        return (
            <ScrollView>
                <Historia quienessomos={this.state.quienessomos} />
                <Card>
                    <Card.Title>Actividades y recursos</Card.Title>
                    <Card.Divider />
                    <FlatList
                        data={this.state.actividades}
                        renderItem={renderActividadItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        )
    }
}

export default QuienesSomos;