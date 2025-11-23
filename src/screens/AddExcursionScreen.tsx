import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../../App';
import { Excursion } from '../types';

type AddExcursionNavProp = NativeStackNavigationProp<RootStackParamList, 'AddExcursion'>;
type AddExcursionRouteProp = RouteProp<RootStackParamList, 'AddExcursion'>;

const AddExcursionScreen: React.FC = () => {
  const navigation = useNavigation<AddExcursionNavProp>();
  const route = useRoute<AddExcursionRouteProp>();

  const editingExcursion = route.params?.editExcursion;

  const [nome, setNome] = useState(editingExcursion?.nome || '');
  const [vaga, setVaga] = useState(editingExcursion?.vaga || '');
  const [setor, setSetor] = useState<Excursion['setor']>(editingExcursion?.setor);
  const [tipo, setTipo] = useState<Excursion['tipo']>(editingExcursion?.tipo);
  const [lugar, setLugar] = useState<Excursion['lugar']>(editingExcursion?.lugar || 'Moda Center');

  const setores = ['Amarelo', 'Azul', 'Verde', 'Vermelho', 'Laranja', 'Branco'];
  const tipos = ['Van', 'Ônibus'];
  const lugares = ['Moda Center', 'Calçadão', 'Altas Horas'];

  useEffect(() => {
    if (editingExcursion) {
      navigation.setOptions({ title: 'Editar Excursão' });
    }
  }, [editingExcursion]);

  const handleSave = async () => {
    if (!nome.trim() || !vaga.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o nome e a vaga.');
      return;
    }

    try {
      const stored = await AsyncStorage.getItem('@excursions');
      const excursions: Excursion[] = stored ? JSON.parse(stored) : [];
      let updatedExcursions: Excursion[] = [];

      if (editingExcursion) {
        const updated: Excursion = {
          ...editingExcursion,
          nome,
          vaga,
          setor,
          tipo,
          lugar,
        };

        updatedExcursions = excursions.map(e =>
          e.id === editingExcursion.id ? updated : e
        );

        await AsyncStorage.setItem('@excursions', JSON.stringify(updatedExcursions));
        Alert.alert('✏️ Sucesso', 'Excursão atualizada com sucesso!');
      } else {
        const newExcursion: Excursion = {
          id: uuid.v4() as string,
          nome,
          vaga,
          setor,
          tipo,
          lugar,
        };

        updatedExcursions = [...excursions, newExcursion];
        await AsyncStorage.setItem('@excursions', JSON.stringify(updatedExcursions));
        Alert.alert('✅ Sucesso', 'Excursão adicionada com sucesso!');
      }

      navigation.goBack(); // 🔹 Agora volta corretamente para a Home
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a excursão.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>
        {editingExcursion ? 'Editar Excursão' : 'Adicionar Excursão'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da excursão"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Vaga"
        value={vaga}
        onChangeText={setVaga}
        keyboardType="numeric"
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Setor</Text>
        <Picker
          selectedValue={setor}
          onValueChange={itemValue => setSetor(itemValue as Excursion['setor'])}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o setor" value={undefined} />
          {setores.map(s => (
            <Picker.Item key={s} label={s} value={s} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Tipo</Text>
        <Picker
          selectedValue={tipo}
          onValueChange={itemValue => setTipo(itemValue as Excursion['tipo'])}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o tipo" value={undefined} />
          {tipos.map(t => (
            <Picker.Item key={t} label={t} value={t} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Lugar</Text>
        <Picker
          selectedValue={lugar}
          onValueChange={itemValue => setLugar(itemValue as Excursion['lugar'])}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o lugar" value={undefined} />
          {lugares.map(l => (
            <Picker.Item key={l} label={l} value={l} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>
          {editingExcursion ? 'Salvar Alterações' : 'Salvar Excursão'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddExcursionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#979797',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginVertical: 8,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  pickerLabel: {
    fontWeight: 'bold',
    color: '#555',
    marginTop: 5,
  },
  picker: {
    width: '100%',
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#9900ff',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
