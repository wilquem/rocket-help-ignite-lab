import { useState } from 'react'
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import firestore from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleNewOrderRegister(){
    if(!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos.')
    }
    setIsLoading(true)

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      createdAt: firestore.FieldValue.serverTimestamp()
    })
    .then(()=> {
      Alert.alert("Solicitação", "Solicitação registrada com sucesso")
      navigation.goBack()
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
      return Alert.alert("Solicitação", "Não foi possível registrar o pedido")
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
        <Header title="Nova solicitação" />

        <Input
            placeholder='Número do Patrimõnio'
            onChangeText={setPatrimony}
        />
        <Input
            placeholder='Descrição do problema'
            marginTop={5}
            flex={1}
            multiline
            textAlignVertical="top"
            onChangeText={setDescription}
        />
        <Button isLoading={isLoading} onPress={handleNewOrderRegister} title='Cadastrar' mt={5}/>
    </VStack>
  );
}