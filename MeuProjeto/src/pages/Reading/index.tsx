import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';

import * as S from './styles';

export function Reading() {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Eu pego os dados passados pela navegação da tela de Detalhes
  const { bookTitle, bookContent } = route.params as { bookTitle: string, bookContent: string } || {};

  // Estado para o progresso (pode ser dinâmico no futuro)
  const [progress] = useState('100%');

  // Eu limpo as tags HTML que a API do Google Books costuma enviar na descrição
  const cleanContent = bookContent?.replace(/<[^>]*>?/gm, '') || "Sinopse não disponível para este exemplar.";

  return (
    <S.Container>
      {/* HEADER FIXO */}
      <S.Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#0047AB" />
        </TouchableOpacity>
        <S.ChapterLabel>Resumo da Obra</S.ChapterLabel>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </S.Header>

      {/* ÁREA DE SCROLL PARA A SINOPSE */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <S.Content>
          <S.BookTitle>{bookTitle || "Leitura"}</S.BookTitle>
          
          <S.Paragraph>
            {cleanContent}
          </S.Paragraph>

          <S.Paragraph style={{ marginTop: 20, fontStyle: 'italic', color: '#666' }}>
            Nota: Este aplicativo exibe a sinopse detalhada fornecida pela biblioteca digital. Para ler a obra completa, verifique a disponibilidade física ou em e-books licenciados.
          </S.Paragraph>
        </S.Content>
      </ScrollView>

      {/* FOOTER FIXO */}
      <S.Footer>
        <S.ProgressInfo>
          <S.ProgressText>Conteúdo Lido</S.ProgressText>
          <S.ProgressText>{progress}</S.ProgressText>
        </S.ProgressInfo>
        
        <S.ProgressBar>
          <S.ProgressFill width={progress} />
        </S.ProgressBar>
      </S.Footer>
    </S.Container>
  );
}