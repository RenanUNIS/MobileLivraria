import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FDFDFD;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #EEE;
  background-color: #FDFDFD;
`;

/* ESTILOS DA BIBLIOTECA (Favoritos) */

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #1A1A1A;
`;

export const FavoriteCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const BookCover = styled.Image`
  width: 70px;
  height: 100px;
  border-radius: 8px;
  background-color: #EEE;
`;

export const BookInfo = styled.View`
  flex: 1;
  margin-left: 15px;
`;

export const BookTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #1A1A1A;
  margin-bottom: 25px;
  text-align: center;
`;

export const FavoriteBookTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1A1A1A;
`;

export const BookAuthor = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

export const RemoveButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const RemoveButtonText = styled.Text`
  color: #E74C3C;
  font-size: 12px;
  margin-left: 5px;
  font-weight: bold;
`;

/* ESTILOS PARA ESTADO VAZIO */

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #999;
  margin-top: 20px;
  text-align: center;
`;

export const EmptySubText = styled.Text`
  font-size: 14px;
  color: #BBB;
  margin-top: 8px;
  text-align: center;
`;

/* ESTILOS DO MODO LEITURA */

export const ChapterLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #0047AB;
  text-transform: uppercase;
`;

export const Content = styled.View`
  padding: 0 25px;
  margin-top: 20px;
`;

export const Paragraph = styled.Text`
  font-size: 18px;
  line-height: 30px;
  color: #333;
  margin-bottom: 20px;
  text-align: justify;
`;

export const Footer = styled.View`
  padding: 20px;
  background-color: #FFF;
  border-top-width: 1px;
  border-top-color: #EEE;
`;

export const ProgressInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ProgressText = styled.Text`
  font-size: 12px;
  color: #999;
  font-weight: 500;
`;

export const ProgressBar = styled.View`
  height: 6px;
  background-color: #F0F0F0;
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressFill = styled.View<{ width: string }>`
  height: 100%;
  background-color: #0047AB;
  width: ${props => props.width};
`;