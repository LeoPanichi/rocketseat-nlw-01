import React, { useState, useEffect } from 'react';
import {View, ImageBackground, Image, Text, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';

// Maneira abaixo não funcionou, logo, utilizamos o require na propria tag Image
//import logo from '../../assets/logo.png';

// Instalar react-navigation, será bom para roteamento futuramente na página
// Assim como, para utilizar alguns componentes
// Poderiamos importar algum Touchable do react-native
// Mas estes do navigation são mais estilizados
// npm install @react-navigation/native
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// npm install @react-navigation/stack

import Axios from 'axios';

import {RectButton, TextInput} from 'react-native-gesture-handler';

import {Feather as Icon} from '@expo/vector-icons';

import {useNavigation, useIsFocused} from '@react-navigation/native';

import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse {
  sigla: string
}

interface IBGECidadeResponse {
  nome: string
}

const Home = () => {
    const navigation = useNavigation();

    const [ufs, setUFs] = useState<string[]>([]);

    const [selectedUF, setSelectedUF] = useState('');

    const [cities, setCities] = useState<string[]>([]);

    const [selectedCity, setSelectedCity] = useState('');

    useEffect(()=> {
      Axios.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => {
          const ufInitials = response.data.map((uf) => uf.sigla);
          setUFs(ufInitials);
      })
    },    
    []);

    useEffect(()=> {
        if (selectedUF === ''){
            return;
        }
        Axios.get<IBGECidadeResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
        .then(response => {
            const cityNames = response.data.map((city) => city.nome);
            setCities(cityNames);
        })
    },
    [selectedUF]);

    function handleNavigateToPoints(){
        navigation.navigate('Points', {
          selectedUF,
          selectedCity
        })
    }

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior={ Platform.OS === 'ios' ? 'padding' : undefined }>
        <ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={{width:264, height:368}} >
            <View style={styles.main} >
                <Image source={require('../../assets/logo.png')} />
                <View>
                  <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                  <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                </View>
            </View>

            <View style={styles.footer}>
              {/* <TextInput style={styles.input} placeholder='Digite uma UF...' value={selectedUF} onChangeText={setSelectedUF} maxLength={2} autoCapitalize='characters'/>
              <TextInput style={styles.input} placeholder='Digite uma Cidade...' value={selectedCity} onChangeText={setSelectedCity} autoCorrect={false} /> */}
              <RNPickerSelect 
                onValueChange={data => setSelectedUF(data)}
                items={ufs.map(uf => ({label: uf, value: uf}))}
              />

              <RNPickerSelect 
                onValueChange={data => setSelectedCity(data)}
                items={cities.map(city => ({label: city, value: city}))}
              />

              <RectButton style={styles.button} onPress={handleNavigateToPoints} >
                  <View style={styles.buttonIcon}>
                      <Icon name="arrow-right" color="#FFF" size={16} />
                  </View>
                  <Text style={styles.buttonText}>Entrar</Text>
              </RectButton>
            </View>            
        </ImageBackground>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;