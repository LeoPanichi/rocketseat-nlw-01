import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {Feather as Icon} from '@expo/vector-icons';

// instalar suporte para mapas
// expo install react-native-maps
import MapView, {Marker} from 'react-native-maps';

// instalar Constants, que estão no css
// expo install expo-constants
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';

// Instalar pacote do react-native para interpretar SVG
// expo install react-native-svg
import {SvgUri} from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';

import Api from '../../services/api';

import * as Location from 'expo-location';

interface Items {
    id: number,
    title: string,
    image_url: string
}

interface Point {
    id: number,
    name: string,
    image: string,
    latitude: number,
    longitude: number,
    image_url: string,
}

interface Params {
    selectedUF: string,
    selectedCity: string
}

const Points = () => {
    const navigation = useNavigation();

    const [items, setItems] = useState<Items[]>([]);

    const [points, setPoints] = useState<Point[]>([]);

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0]);

    const Route = useRoute();

    const routeParams = Route.params as Params;

    useEffect(() => {
        Api.get('/points', {
            params: {
                city: routeParams.selectedCity,
                uf: routeParams.selectedUF,
                items: selectedItems
            }
        }).then(response => {
            setPoints(response.data);
        })
    }, [selectedItems])

    useEffect(() => {
        async function loadPosition(){
            const {status} = await Location.requestPermissionsAsync();

            if(status !== 'granted'){
                Alert.alert('Oooooops...', 'Precisamos de sua permissão para acessar sua localização');
                return;
            }

            const {latitude, longitude} = (await Location.getCurrentPositionAsync()).coords;

            setInitialPosition([
                latitude,
                longitude
            ]);
        }

        loadPosition();
    }, [])

    useEffect(() => {
        Api.get('/items').then(response => {
            setItems(response.data);
        })
    }, []);

    function handleSelectedItem(id: number){
        const alreadySelected = selectedItems.findIndex(index => index === id);

        if (alreadySelected >= 0){
            const fileteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(fileteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }        
    }

    function handleNavigateBack(){
        navigation.goBack();
    }

    function handleNavigateToDetail(id: number){
        navigation.navigate('Detail', { point_id: id });
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo.</Text>
                <Icon name="smile" size={24} color="#34cb79" />
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    {/* Condição abaixo é um renderiação condicional, derivado de um IF com resultado true(após o &&), nao tem do false(como o ternário) */}
                    { (initialPosition[0] !== 0 || initialPosition[1] !== 0) && (
                        <MapView style={styles.map} initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                        >
                            {points.map(point => {
                                return(
                                    <Marker key={String(point.id)} onPress={() => handleNavigateToDetail(point.id)} style={styles.mapMarker} coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude,
                                    }}
                                    >
                                        <View style={styles.mapMarkerContainer}>
                                            <Image 
                                                style={styles.mapMarkerImage}
                                                source={{uri: point.image}}
                                            />
                                            <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                        </View>
                                    </Marker>
                                )
                            })}
                        </MapView>
                    ) }
                </View>
            </View>
            <View style={styles.itemsContainer} >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 20
                    }}
                >
                    {items.map(item => {
                        return(
                            <TouchableOpacity key={String(item.id)} 
                                style={[
                                    styles.item,
                                    selectedItems.includes(item.id) ? styles.selectedItem : {}
                                ]} 
                                activeOpacity={0.6}
                                onPress={() => {handleSelectedItem(item.id)}} 
                            >
                                <SvgUri width={42} height={42} uri={item.image_url} />
                                <Text style={styles.itemTitle} >{item.title}</Text>
                            </TouchableOpacity>
                        );
                    })}
                    {/*
                    <TouchableOpacity style={styles.item} onPress={() => {}} >
                        <SvgUri width={42} height={42} uri="http://192.168.0.9:3333/uploads/lampadas.svg" />
                        <Text style={styles.itemTitle} >Lâmpadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}} >
                        <SvgUri width={42} height={42} uri="http://192.168.0.9:3333/uploads/baterias.svg" />
                        <Text style={styles.itemTitle} >Pilhas e Baterias</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}} >
                        <SvgUri width={42} height={42} uri="http://192.168.0.9:3333/uploads/papeis-papelao.svg" />
                        <Text style={styles.itemTitle} >Papéis e Papelão</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}} >
                        <SvgUri width={42} height={42} uri="http://192.168.0.9:3333/uploads/eletronicos.svg" />
                        <Text style={styles.itemTitle} >Resíduos Eletrônicos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}} >
                        <SvgUri width={42} height={42} uri="http://192.168.0.9:3333/uploads/organicos.svg" />
                        <Text style={styles.itemTitle} >Resíduos Orgânicos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {}} >
                        <SvgUri width={42} height={42} uri="http://192.168.0.9:3333/uploads/oleo.svg" />
                        <Text style={styles.itemTitle} >Óleo de Cozinha</Text>
                    </TouchableOpacity>
                    */}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Points;