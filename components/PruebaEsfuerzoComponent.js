import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Platform, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';

class PruebaEsfuerzo extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            edad: 18,
            federado: false,
            fecha: new Date(),
            showDate: false,
            showTime: false,
            showModal: false
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            edad: 18,
            federado: false,
            fecha: new Date(),
            showModal: false
        });
    }

    gestionarReserva() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    seleccionarFecha = (event, selectedDate) => {
        if (selectedDate == undefined) {
            selectedDate = new Date();
        }
        this.setState({fecha: selectedDate, showDate: false, showTime: false});
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Edad</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.edad}
                        onValueChange={(itemValue) => this.setState({edad: itemValue})}>
                        <Picker.Item label='< 20' value='< 20' />
                        <Picker.Item label='20 - 30' value='20 - 30' />
                        <Picker.Item label='31 - 40' value='31 - 40' />
                        <Picker.Item label='41 - 50' value='41 - 50' />
                        <Picker.Item label='> 60' value='> 60' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Federado?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.federado}
                        trackColor={colorGaztaroaOscuro}
                        onValueChange={(value) => this.setState({federado: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Día y hora</Text>
                        <Button
                            onPress={() => this.setState({showDate: true})}
                            title='Calendario'
                            color={colorGaztaroaOscuro}
                            accessibilityLabel='Gestionar reserva...'
                        />
                        {this.state.showDate && <DateTimePicker
                            style={{flex: 2, marginRight: 20}}
                            value={this.state.fecha}
                            mode='date'
                            display='default'
                            onChange={this.seleccionarFecha}
                        />}
                        <Button
                            onPress={() => this.setState({showTime: true})}
                            title='Hora'
                            color={colorGaztaroaOscuro}
                            accessibilityLabel='Gestionar reserva...'
                        />
                        {this.state.showTime && <DateTimePicker
                            style={{flex: 2, marginRight: 20}}
                            value={this.state.fecha}
                            mode='time'
                            display='default'
                            onChange={this.seleccionarFecha}
                        />}
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.gestionarReserva()}
                        title='Reservar'
                        color={colorGaztaroaOscuro}
                        accessibilityLabel='Gestionar reserva...'
                    />
                </View>
                <Modal 
                    animationType = {'slide'} 
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm();}}
                    onRequestClose = {() => {this.toggleModal(); this.resetForm();}}
                >
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Detalle de la reserva</Text>
                        <Text style = {styles.modalText}>Edad: {this.state.edad}</Text>
                        <Text style = {styles.modalText}>Federado: {this.state.federado ? 'Si' : 'No'}</Text>
                        <Text style={styles.modalText}>Día y hora: {this.state.fecha.getDate()}/{this.state.fecha.getMonth()+1}/{this.state.fecha.getFullYear()} {this.state.fecha.getHours()}:{this.state.fecha.getMinutes()}:{this.state.fecha.getSeconds()}</Text>
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color={colorGaztaroaOscuro}
                            title='Cerrar'
                        />
                    </View>
                </Modal>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1,
        width: 100,
        height: 30
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default PruebaEsfuerzo;