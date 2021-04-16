import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Campobase from './components/CampobaseComponent';

export default function App() {
  return (
    <View>
      <Campobase />
      <StatusBar style="auto" />
    </View>
  );
}