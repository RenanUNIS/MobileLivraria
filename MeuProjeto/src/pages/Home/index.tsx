import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  TextInput, 
  View, 
  Modal, 
  Alert,
  Keyboard,
  PanResponder
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import { IBook } from '../../@types/books';
import * as S from './styles';

// Dicionário pra mapear o nome amigável da categoria pro formato que a API do Google Books pede
const CATEGORY_MAP: { [key: string]: string } = {
  'Todos': 'subject:fiction',
  'Fantasia': 'subject:fantasy',
  'Mistério': 'subject:mystery',
  'Romance': 'subject:romance',
  'Terror': 'subject:horror',
  'Sci-Fi': 'subject:science_fiction',
  'Aventura': 'subject:adventure',
  'Autoajuda': 'subject:self-help',
  'História': 'subject:history'
};

export function Home() {
  // Estados pra controlar toda a bagunça da tela
  const [books, setBooks] = useState<IBook[]>([]);
  const [favorites, setFavorites] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [startIndex, setStartIndex] = useState(0); // Pra controlar a paginação (infinite scroll)
  
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation = useNavigation<any>();

  // --- LÓGICA DO ARRASTE (SWIPE) PRA FECHAR O MENU ---
  // Uso o useRef pra não ficar recriando o PanResponder toda hora que a tela renderizar
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Gambiarra necessária: só ativa o gesto se o cara arrastar na horizontal por mais de 20px. 
        // Se não fizer isso, qualquer clique acidental na tela tenta fechar o menu.
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        // Se puxou pra ESQUERDA (valor negativo) com uma certa força (50px), fecha a modal
        if (gestureState.dx < -50) {
          setMenuVisible(false);
        }
      }
    })
  ).current;

  // Função principal de busca na API
  async function fetchBooks(query = 'subject:fiction', isMore = false) {
    try {
      const safeQuery = query.trim();
      if (!safeQuery) return;

      // Controla qual loading mostrar (o da tela inteira ou a rodinha no final da lista)
      if (isMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setStartIndex(0);
      }

      const currentStart = isMore ? startIndex + 20 : 0;
      
      const response = await api.get(
        `volumes?q=${encodeURIComponent(safeQuery)}&startIndex=${currentStart}&maxResults=20&langRestrict=pt&printType=books`
      );
      
      const newBooks = response.data.items || [];
      
      if (isMore) {
        setBooks(prev => {
          // A API do Google costuma mandar livro repetido na paginação. 
          // Criei esse Set com os IDs pra filtrar as duplicatas e não dar erro de key na FlatList.
          const existingIds = new Set(prev.map(book => book.id));
          const filteredNewBooks = newBooks.filter((book: IBook) => !existingIds.has(book.id));
          return [...prev, ...filteredNewBooks];
        });
        setStartIndex(currentStart);
      } else {
        setBooks(newBooks);
      }
    } catch (error) {
      console.log("Erro ao buscar livros (pode ser o limite do Google):", error);
      // Limpo a tela se não for paginação pra não deixar lixo na interface
      if (!isMore) setBooks([]); 
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  // Troca de aba das categorias
  function handleCategoryPress(categoryName: string) {
    setActiveCategory(categoryName);
    setSearchText('');
    fetchBooks(CATEGORY_MAP[categoryName]);
  }

  // Chama quando o cara chega no final da lista
  function handleLoadMore() {
    if (loadingMore || loading) return; // Trava de segurança pra não fazer 10 requisições de uma vez
    const query = searchText.trim() !== '' ? searchText : CATEGORY_MAP[activeCategory || 'Todos'];
    if (query) {
      fetchBooks(query, true);
    }
  }

  // Puxa os favoritos da memória do celular
  async function loadFavorites() {
    try {
      const response = await AsyncStorage.getItem('@sanctuary:favorites');
      setFavorites(response ? JSON.parse(response) : []);
    } catch (error) {
      console.log("Deu ruim ao carregar favoritos:", error);
    }
  }

  const handleLogout = () => {
    setMenuVisible(false);
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Sair", 
        style: "destructive", 
        onPress: () => {
          console.log("Usuário deslogado");
        } 
      }
    ]);
  };

  // Toda vez que a tela ganha foco, atualiza os favoritos (útil se o cara tirou um favorito lá na tela de detalhes)
  useFocusEffect(useCallback(() => { loadFavorites(); }, []));
  
  // Carrega a home na primeira vez
  useEffect(() => { fetchBooks(CATEGORY_MAP['Todos']); }, []);

  // Joguei o Header inteiro dentro de um useMemo pra melhorar a performance.
  // Assim o app não fica recriando os carrosséis e a barra de busca cada vez que a lista de baixo rolar.
  const ListHeader = useMemo(() => (
    <View>
      <S.SearchContainer>
        <Feather name="search" size={20} color="#999" />
        <TextInput 
          style={{ flex: 1, marginLeft: 10, color: '#333' }}
          placeholder="Buscar livros ou autores..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            const text = searchText.trim();
            if (!text) {
              setActiveCategory('Todos');
              fetchBooks(CATEGORY_MAP['Todos']);
              return;
            }
            setActiveCategory(''); // Tira a seleção da categoria já que tamo buscando texto livre
            fetchBooks(text);
          }}
          returnKeyType="search"
        />
      </S.SearchContainer>

      {/* Só renderiza o carrossel de favoritos se a lista não tiver vazia e não estivermos numa busca textual */}
      {favorites.length > 0 && !searchText && (
        <>
          <S.SectionTitle>Meus Favoritos</S.SectionTitle>
          <S.FavoritesScroll horizontal showsHorizontalScrollIndicator={false}>
            {favorites.map((book) => (
              // Passo o 'book' inteiro como parâmetro pra tela de Detalhes já abrir com a capa e o título na hora
              <S.FavoriteCard key={`fav-${book.id}`} onPress={() => navigation.navigate('BookDetails', { book: book })}>
                <S.FavoriteCover 
                  source={{ 
                    // Troca http por https pra evitar que a imagem falhe de carregar no Android
                    uri: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150x220/0047AB/FFFFFF?text=Sem+Capa' 
                  }} 
                />
                <S.FavoriteTitle numberOfLines={1}>{book.volumeInfo.title}</S.FavoriteTitle>
              </S.FavoriteCard>
            ))}
          </S.FavoritesScroll>
        </>
      )}

      <S.SectionTitle>Explorar Gêneros</S.SectionTitle>
      <S.CategoryScroll horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(CATEGORY_MAP).map(cat => (
          <S.CategoryBadge 
            key={cat}
            active={activeCategory === cat} 
            onPress={() => handleCategoryPress(cat)}
          >
            <S.CategoryText active={activeCategory === cat}>{cat}</S.CategoryText>
          </S.CategoryBadge>
        ))}
      </S.CategoryScroll>

      <S.SectionTitle>
        {searchText.trim() ? `Resultados para "${searchText.trim()}"` : 'Livros para Você'}
      </S.SectionTitle>
    </View>
  ), [searchText, favorites, activeCategory, navigation]);

  return (
    <S.Container>
      <S.Header>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Feather name="menu" size={24} color="#0047AB" />
        </TouchableOpacity>
        
        <S.HeaderRight>
          <S.UserAvatar source={{ uri: 'https://github.com/RenanUNIS.png' }} />
        </S.HeaderRight>
      </S.Header>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          {/* APLICANDO O PANRESPONDER AQUI PARA CAPTURAR O ARRASTE NO MENU */}
          <View style={{ flex: 1 }} {...panResponder.panHandlers}>
            <TouchableOpacity activeOpacity={1}>
              <S.SideMenu>
                <S.MenuHeader>
                  <S.MenuTitle>Configurações</S.MenuTitle>
                </S.MenuHeader>

                <S.MenuItem onPress={() => { setMenuVisible(false); navigation.navigate('Favorites'); }}>
                  <Feather name="heart" size={20} color="#0047AB" />
                  <S.MenuItemText>Favoritos</S.MenuItemText>
                </S.MenuItem>

                <S.MenuItem onPress={() => { /* TODO: Lógica toggle theme dps */ }}>
                  <Feather name="moon" size={20} color="#0047AB" />
                  <S.MenuItemText>Modo Escuro</S.MenuItemText>
                </S.MenuItem>

                <S.MenuItem onPress={() => { setMenuVisible(false); }}>
                  <Feather name="info" size={20} color="#0047AB" />
                  <S.MenuItemText>Sobre</S.MenuItemText>
                </S.MenuItem>

                <S.Separator />

                <S.MenuItem onPress={handleLogout}>
                  <Feather name="log-out" size={20} color="#FF4444" />
                  <S.MenuItemText style={{ color: '#FF4444' }}>Sair</S.MenuItemText>
                </S.MenuItem>
              </S.SideMenu>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color="#0047AB" size="large" />
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => `${item.id}-${index}`} 
          numColumns={2}
          renderItem={({ item }) => (
            // Passo o objeto item (book) completo também pra evitar a tela branca nos detalhes
            <S.BookGridCard onPress={() => navigation.navigate('BookDetails', { book: item })}>
              <S.BookGridCover 
                source={{ 
                  uri: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150x220/0047AB/FFFFFF?text=Sem+Capa' 
                }} 
              />
              <S.BookGridTitle numberOfLines={2}>{item.volumeInfo.title}</S.BookGridTitle>
              <S.BookGridAuthor numberOfLines={1}>{item.volumeInfo.authors?.[0] || 'Autor Desconhecido'}</S.BookGridAuthor>
            </S.BookGridCard>
          )}
          ListHeaderComponent={ListHeader}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator color="#0047AB" style={{ marginVertical: 20 }} /> : null}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </S.Container>
  );
}