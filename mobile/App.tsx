import React from 'react';
import { StatusBar } from 'react-native';

// NLW - Next Level Week
// eColeta

// Utilizaremos React-Native e Expo
// React-Native serve para contrução de Apps de iOS ou Android
// Ele cria uma thread de JS usando o JavaScript Core, e o dispositivo passa a entender o JS como codigo nativo
// Expo serve para não dependermos da SDK do Android ou iOS
// Um app chamado Expo é baixado no celular e ele contem todas as API nativas encapsuladas nele (como geolocalização, bateria, camera, etc)
// Assim evita-se de baixar a SDK do Android ou do iOS e apenas deployar nesse Expo

// Instalando o Expo:
// npm install -g expo-cli 
// O comando a seguir vai criar a pasta com o projeto
// expo init mobile
// OU
// expo init mobile --npm
// Selecione blank(typescript)
// Como eu omiti o --npm, está usando o yarn para instalar as dependencias
// Terminando, vamos rodar:
// cd mobile
// yarn start
// Abrirá no browser o endereço: http://localhost:19002/
// Nele teremos um QR COde
// Metro Bundler, o que junta o codigo, empacota e publica
// Tenha a opção LAN selecionada, e tenha o celular na mesma rede que o computador
// Baixe o aplicativo Expo no seu celular, e escaneie o QR Code
// Alternativa 1, executar com emulador de Android
// Alternativa 2, snack.expo.io

// Abrir o App.tsx no VS Code
// Para qualquer issue conhecido
// http://github.com/Rocketseat/expo-common-issues

// Criar uma pasta src
// Dentro de src, uma pasta pages
// Dentro de pages, uma pasta Home
// Dentro de Home, um arquivo index.tsx

// Não é possivel colocar dois componentes aqui sem nada os encapsulando
// Como o StatusBar e o Home, um abaixo do outro
// Podemos colocar uma View, mas vai gerar um componente em tela
// Ou usar o fragment, colocar ambos entre tags vazias <> </>

// Boas praticas, sempre que vc ou designer do time for fazer uma imagem para o Mobile
// Exportar em 3 tamanhos diferentes, 1x, 2x, 3x. (1x = W: 182, H: 44)
// Fazer isso, pois os dispositivos tem densidades de pixels diferentes

// Expo lançou o Expo Google Fonts
// Vamos usar para carregar as fontes que não são padrão
// No Terminal:
// expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto 

// useFonts pode ser importado de qualquer um dos pacotes
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu';

import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';

import {AppLoading} from 'expo';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <Routes />
    </>
  );
}