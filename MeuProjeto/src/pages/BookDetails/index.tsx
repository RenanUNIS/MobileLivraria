import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import { IBook } from '../../@types/books';
import * as S from './styles';

export function BookDetails() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  
  // Pegando o livro completo que passei pela rota pra evitar tela branca.
  // Deixei o bookId de fallback caso eu precise navegar só pelo ID em algum outro momento.
  const { book: initialBook, bookId } = route.params as { book?: IBook, bookId?: string };
  const currentId = initialBook?.id || bookId;

  // Já inicio o state com os dados da Home pra tela abrir na hora, sem loading chato.
  const [book, setBook] = useState<IBook | null>(initialBook || null);
  
  // Só mostro o loading no meio da tela se realmente não vier nada da tela anterior
  const [loading, setLoading] = useState(!initialBook); 
  const [isFavorite, setIsFavorite] = useState(false);

  async function fetchBookDetails() {
    try {
      if (!book) setLoading(true);
      
      // Tento buscar mais detalhes na API (tipo uma sinopse maior que às vezes não vem na Home)
      const response = await api.get(`volumes/${currentId}`);
      setBook(response.data);
    } catch (error) {
      // O Google costuma bloquear o IP se eu fizer muita requisição rápida (Erro 429).
      // Se isso acontecer mas eu já tiver os dados da Home, eu escondo o alerta pra não estragar a experiência do usuário.
      if (!book) {
        Alert.alert("Erro", "Não foi possível carregar os detalhes do servidor.");
      }
      console.log("Deu erro na API (provavelmente Rate Limit do Google):", error);
    } finally {
      setLoading(false);
    }
  }

  // Checa se o livro já tá na minha lista salva no storage local
  async function checkIsFavorite() {
    if (!currentId) return;
    try {
      const response = await AsyncStorage.getItem('@sanctuary:favorites');
      const favorites: IBook[] = response ? JSON.parse(response) : [];
      setIsFavorite(favorites.some(item => item.id === currentId));
    } catch (error) {
      console.log("Deu ruim ao checar os favoritos", error);
    }
  }

  // Função pra adicionar ou remover o livro dos favoritos
  async function handleToggleFavorite() {
    if (!book) return;
    try {
      const response = await AsyncStorage.getItem('@sanctuary:favorites');
      const favorites: IBook[] = response ? JSON.parse(response) : [];

      if (isFavorite) {
        // Se já é favorito, filtra e tira da lista
        const updated = favorites.filter(item => item.id !== currentId);
        await AsyncStorage.setItem('@sanctuary:favorites', JSON.stringify(updated));
        setIsFavorite(false);
      } else {
        // Se não é, adiciona no final do array
        const updated = [...favorites, book];
        await AsyncStorage.setItem('@sanctuary:favorites', JSON.stringify(updated));
        setIsFavorite(true);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os favoritos.");
    }
  }

  // Roda as buscas assim que a tela abre
  useEffect(() => {
    checkIsFavorite();
    fetchBookDetails();
  }, [currentId]);

  // Se tiver carregando do zero e não tiver dados, segura na tela de loading
  if (loading && !book) {
    return (
      <S.Container style={{ justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0047AB" />
      </S.Container>
    );
  }

  // Separei numa const pra não ficar repetindo código lá embaixo.
  // O optional chaining (?.) salva a vida se a API mandar uns dados faltando.
  const info = book?.volumeInfo;

  return (
    <S.Container>
      <S.Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#0047AB" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Feather 
            name="heart" 
            size={24} 
            color={isFavorite ? "#E74C3C" : "#0047AB"} 
            fill={isFavorite ? "#E74C3C" : "transparent"}
          />
        </TouchableOpacity>
      </S.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Content>
          {/* Forçando HTTPS aqui porque o Android bloqueia imagem HTTP por padrão e a capa não carrega */}
          <S.BookCover 
            source={{ 
              uri: info?.imageLinks?.medium?.replace('http:', 'https:') || 
                   info?.imageLinks?.thumbnail?.replace('http:', 'https:') ||
                   'https://via.placeholder.com/150x220/0047AB/FFFFFF?text=Sem+Capa'
            }} 
          />
          <S.Title>{info?.title}</S.Title>
          <S.Author>{info?.authors?.join(', ') || 'Autor Desconhecido'}</S.Author>
          
          <S.InfoRow>
            <S.InfoBox>
              <S.InfoLabel>Páginas</S.InfoLabel>
              <S.InfoValue>{info?.pageCount || '--'}</S.InfoValue>
            </S.InfoBox>
            <S.InfoBox>
              <S.InfoLabel>Idioma</S.InfoLabel>
              <S.InfoValue>{info?.language?.toUpperCase() || 'PT'}</S.InfoValue>
            </S.InfoBox>
          </S.InfoRow>

          <S.SectionTitle>Sinopse</S.SectionTitle>
          <S.Description>
            {/* Um regex rápido pra limpar as tags HTML nojentas que às vezes vêm na descrição do Google */}
            {info?.description?.replace(/<[^>]*>?/gm, '') || 'Sem descrição disponível.'}
          </S.Description>
        </S.Content>
      </ScrollView>

      <S.Footer>
        <S.ButtonPrimary 
          onPress={() => navigation.navigate('Reading', { 
            bookId: currentId,
            bookTitle: info?.title,
            bookContent: info?.description
          })}
        >
          <S.ButtonText>Começar a Ler</S.ButtonText>
        </S.ButtonPrimary>
      </S.Footer>
    </S.Container>
  );
}