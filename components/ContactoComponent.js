import React, { Component } from "react";
import { Text } from 'react-native';
import { Card } from "react-native-elements";
import { CONTACTO } from '../comun/contacto';

function RenderContacto (props) {

    const contacto = props.contacto;

    return (
        <Card>
            <Card.Title>{contacto.titulo}</Card.Title>
            <Card.Divider />
            <Text
                style={{
                    margin: 5
                }}
            >
                {contacto.saludo}
                {contacto.texto}
                {contacto.telefono}
                {contacto.email}
            </Text>
        </Card>
    )
} 

class Contacto extends Component {
    constructor (props) {
        super(props);
        this.state = {
            contacto: CONTACTO
        };
    }

    render() {
        return (
            <RenderContacto contacto={this.state.contacto} />
        )
    }
}

export default Contacto;
