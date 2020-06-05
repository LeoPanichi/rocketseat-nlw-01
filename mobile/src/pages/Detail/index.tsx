import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView,Linking} from 'react-native';
import {Feather as Icon} from '@expo/vector-icons';

import Constants from 'expo-constants';

import { useNavigation, useRoute } from '@react-navigation/native';

import {RectButton} from 'react-native-gesture-handler';

import Api from '../../services/api';

// Para lidar com envio de email usaremos 
// expo add expo-mail-composer
import * as MailComposer from 'expo-mail-composer';

interface Params {
    point_id: number
}

interface Point2Item {
    point: {
        image: string,
        name: string,
        email: string,
        whatsapp: string,
        city: string,
        uf: string
        image_url: string
    },
    items: {
        title: string
    }[]
}

const Detail = () => {
    const navigation = useNavigation();
    const Route = useRoute();

    // Ô typescript, assume pra mim que esse Route.params é do tipo Params.
    const routeParams = Route.params as Params;

    // Normalmente o typescript não aceita que passe um objeto num formato diferente do tipo declarado
    // Porem podemos usar o 'as' para afirmar pra ele que o objeto sim é naquele formato, mesmo inicialmente, não sendo
    const [point2items, setPoints2Items] = useState<Point2Item>({} as Point2Item);

    useEffect(() => {
        Api.get(`/points/${routeParams.point_id}`).then(response => {
            setPoints2Items(response.data);
        })
    }, []);

    function handleNavigateBack(){
        navigation.goBack();
    }

    function handleComposeMail(){
        MailComposer.composeAsync({
            subject: 'Interessa na Coleta de Resíduos',
            recipients: [point2items.point.email],

        });
    }

    function handleWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${point2items.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`);
    }

    if (!point2items.point){
        return null;
    }

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>     
                <Image style={styles.pointImage} 
                    source={{uri: point2items.point.image}}
                />
                <Text style={styles.pointName}>{point2items.point.name}</Text>
                <Text style={styles.pointItems}>
                    {point2items.items.map(item => item.title).join(',')}
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{point2items.point.city} / {point2items.point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsApp} >
                    <Icon name="message-circle" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>WhatsApp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleComposeMail} >
                    <Icon name="mail" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>E-Mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });

export default Detail;