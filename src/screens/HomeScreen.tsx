import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Excursion } from '../types';
import { predefinedExcursions } from '../../assets/data/predefinedExcursions';

type HomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavProp>();
  const route = useRoute<HomeScreenRouteProp>();

  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // 🔹 Carrega excursões salvas ou inicializa com as pré-definidas
  useEffect(() => {
    const loadExcursions = async () => {
      try {
        const stored = await AsyncStorage.getItem('@excursions');

        if (!stored) {
          await AsyncStorage.setItem('@excursions', JSON.stringify(predefinedExcursions));
          setExcursions(predefinedExcursions);
          console.log('Excursões pré-carregadas adicionadas ao AsyncStorage.');
        } else {
          setExcursions(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Erro ao carregar excursões', e);
      }
    };
    loadExcursions();
  }, []);

  // 🔁 Recarrega as excursões sempre que voltar para a tela
  useFocusEffect(
    React.useCallback(() => {
      const reloadExcursions = async () => {
        try {
          const stored = await AsyncStorage.getItem('@excursions');
          if (stored) {
            setExcursions(JSON.parse(stored));
            console.log('Excursões atualizadas ao voltar para a Home.');
          }
        } catch (error) {
          console.error('Erro ao recarregar excursões:', error);
        }
      };
      reloadExcursions();
    }, [])
  );

  // 🔸 Excluir excursão
  const handleDelete = (id: string) => {
    Alert.alert(
      'Excluir Excursão',
      'Tem certeza que deseja excluir esta excursão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const updated = excursions.filter(exc => exc.id !== id);
            setExcursions(updated);
            await AsyncStorage.setItem('@excursions', JSON.stringify(updated));
            Alert.alert('🗑️ Excluído', 'Excursão removida com sucesso.');
          },
        },
      ]
    );
  };

  // 🔍 Filtragem
  const filteredExcursions = excursions.filter(excursion => {
    const query = search.toLowerCase();
    return (
      excursion.nome.toLowerCase().includes(query) ||
      excursion.vaga.toLowerCase().includes(query) ||
      excursion.setor?.toLowerCase().includes(query)
    );
  });

  // 🔹 Categorias de setores
  const setores = ['Amarelo', 'Azul', 'Verde', 'Vermelho', 'Laranja', 'Branco'];
  const coresPorSetor: Record<string, string> = {
    Amarelo: '#FFD700',
    Azul: '#1E90FF',
    Verde: '#32CD32',
    Vermelho: '#FF4500',
    Laranja: '#FFA500',
    Branco: '#DCDCDC',
  };

  const renderContent = () => {
    if (!isSearching && excursions.length === 0) {
      return (
        <>
          <TouchableOpacity
            style={styles.setoresButton}
            onPress={() => setIsSearching(true)}
          >
            <Text style={styles.setoresButtonText}>Setores</Text>
          </TouchableOpacity>

          <Image
            source={require('../../assets/inicial/bus_van.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.infoText}>Suas excursões aparecerão aqui!</Text>
          <Text style={styles.infoText}>
            Você pode pesquisar por nome, setor ou vaga.
          </Text>
        </>
      );
    }

    if (isSearching && search === '') {
      return (
        <View style={styles.categoriesContainer}>
          {setores.map(setor => (
            <TouchableOpacity
              key={setor}
              style={[styles.categoryBox, { backgroundColor: coresPorSetor[setor] }]}
              onPress={() => setSearch(setor)}
            >
              <Text style={styles.categoryText}>{setor}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (filteredExcursions.length > 0) {
      return (
        <FlatList
          data={filteredExcursions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => navigation.navigate('AddExcursion', { editExcursion: item })}
              >
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardInfo}>Vaga: {item.vaga}</Text>
                {item.lugar && <Text style={styles.cardInfo}>Lugar: {item.lugar}</Text>}
                {item.setor && <Text style={styles.cardInfo}>Setor: {item.setor}</Text>}
                {item.tipo && <Text style={styles.cardInfo}>Tipo: {item.tipo}</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      );
    }

    return <Text style={styles.infoText}>Nenhuma excursão encontrada...</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise sua excursão aqui"
          placeholderTextColor="#fff"
          value={search}
          onChangeText={setSearch}
          onFocus={() => setIsSearching(true)}
          onBlur={() => {
            if (search === '') setIsSearching(false);
          }}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setIsSearching(true);
            Keyboard.dismiss();
            navigation.navigate('AddExcursion');
          }}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>{renderContent()}</View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#979797ff', alignItems: 'center', paddingTop: 50 },
  searchContainer: {
    width: '100%',
    backgroundColor: '#9900ffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 80,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    fontSize: 16,
  },
  addButton: { width: 50, height: 100, justifyContent: 'center', alignItems: 'center' },
  plus: { fontSize: 70, color: '#fff' },
  mainContent: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  logo: { marginTop: 40, width: 260, height: 260 },
  infoText: { marginTop: 10, fontSize: 16, color: '#fff', textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 20,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#9900ff' },
  cardInfo: { fontSize: 14, color: '#333' },
  deleteButton: { marginLeft: 10, padding: 5 },
  deleteText: { fontSize: 24 },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  categoryBox: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: { fontWeight: 'bold', color: '#000' },
  setoresButton: {
    backgroundColor: '#ffffffcc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: -100,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  setoresButtonText: { color: '#9900ff', fontWeight: 'bold', fontSize: 16 },
});
