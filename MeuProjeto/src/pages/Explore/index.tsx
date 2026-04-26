import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import * as S from './styles';

export function Explore() {
  const navigation = useNavigation<any>();

  const categories = [
    'Ficção Científica', 'Romance', 'Mistério e Suspense', 
    'Biografia', 'Autoajuda', 'História', 'Tecnologia'
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>Sanctuary</S.Title>
        <S.UserAvatar source={{ uri: 'https://github.com/github.png' }} />
      </S.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <S.SearchContainer>
          <Feather name="search" size={20} color="#999" />
          <S.SearchInput placeholder="Pesquisar livros, autores ou gêneros..." />
        </S.SearchContainer>

        <S.SectionHeader>
          <S.SectionTitle>Em Alta</S.SectionTitle>
          <TouchableOpacity>
            <S.ViewAll>Ver tudo</S.ViewAll>
          </TouchableOpacity>
        </S.SectionHeader>

        <S.FeaturedScroll>
          <S.FeaturedCard>
            <S.FeaturedImage 
              source={{ uri: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=280&h=160&auto=format&fit=crop' }}
              imageStyle={{ borderRadius: 12 }}
            />
          </S.FeaturedCard>
          <S.FeaturedCard>
            <S.FeaturedImage 
              source={{ uri: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=280&h=160&auto=format&fit=crop' }}
              imageStyle={{ borderRadius: 12 }}
            />
          </S.FeaturedCard>
        </S.FeaturedScroll>

        <S.SectionHeader>
          <S.SectionTitle>Gêneros</S.SectionTitle>
        </S.SectionHeader>

        <S.CategoryList>
          {categories.map((category, index) => (
            <S.CategoryItem key={index}>
              <S.CategoryName>{category}</S.CategoryName>
              <Feather name="chevron-right" size={20} color="#CCC" />
            </S.CategoryItem>
          ))}
        </S.CategoryList>
      </ScrollView>

      <S.TabBar>
        <S.TabItem onPress={() => navigation.navigate('Home')}>
          <Feather name="home" size={24} color="#CCC" />
          <S.TabText>HOME</S.TabText>
        </S.TabItem>
        <S.TabItem>
          <Feather name="compass" size={24} color="#0047AB" />
          <S.TabText active>EXPLORE</S.TabText>
        </S.TabItem>
        <S.TabItem>
          <Feather name="book" size={24} color="#CCC" />
          <S.TabText>LIBRARY</S.TabText>
        </S.TabItem>
        <S.TabItem>
          <Feather name="settings" size={24} color="#CCC" />
          <S.TabText>SETTINGS</S.TabText>
        </S.TabItem>
      </S.TabBar>
    </S.Container>
  );
}