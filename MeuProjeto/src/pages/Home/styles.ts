import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  padding-top: 50px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 25px;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: #EEE;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F0F2F5;
  margin: 0 20px 25px;
  padding: 12px 15px;
  border-radius: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1C1C1C;
  margin: 0 20px 15px;
`;

/* CATEGORIAS */
export const CategoryScroll = styled.ScrollView`
  padding-left: 20px;
  margin-bottom: 25px;
  max-height: 50px;
`;

export const CategoryBadge = styled.TouchableOpacity<{ active?: boolean }>`
  padding: 0 22px;
  background-color: ${props => props.active ? '#0047AB' : '#F0F2F5'};
  border-radius: 25px;
  margin-right: 12px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const CategoryText = styled.Text<{ active?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.active ? '#FFFFFF' : '#666666'};
`;

/* FAVORITOS */
export const FavoritesScroll = styled.ScrollView`
  padding-left: 20px;
  margin-bottom: 30px;
`;

export const FavoriteCard = styled.TouchableOpacity`
  width: 110px;
  margin-right: 15px;
`;

export const FavoriteCover = styled.Image`
  width: 110px;
  height: 160px;
  border-radius: 12px;
  background-color: #EEE;
`;

export const FavoriteTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
`;

/* GRID DE 2 COLUNAS */
export const BookGridCard = styled.TouchableOpacity`
  width: ${cardWidth}px;
  margin-bottom: 25px;
`;

export const BookGridCover = styled.Image`
  width: 100%;
  height: 220px;
  border-radius: 15px;
  background-color: #EEE;
  margin-bottom: 10px;
`;

export const BookGridTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #1C1C1C;
  line-height: 20px;
`;

export const BookGridAuthor = styled.Text`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`;

/* --- NOVOS ESTILOS PARA O MENU HAMBÚRGUER --- */

export const SideMenu = styled.View`
  width: 75%;
  height: 100%;
  background-color: #FFFFFF;
  padding: 60px 20px 20px;
  /* Shadow para iOS */
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  /* Elevation para Android */
  elevation: 10;
`;

export const MenuHeader = styled.View`
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F2F5;
`;

export const MenuTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #0047AB;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`;

export const MenuItemText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-left: 15px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: #F0F2F5;
  margin: 10px 0;
`;