import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FFFFFF;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #0047AB;
`;

export const UserAvatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  background-color: #EEE;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F5F5F5;
  margin: 0 20px;
  padding: 12px 16px;
  border-radius: 10px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  color: #333;
  font-size: 14px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 25px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1A1A1A;
`;

export const ViewAll = styled.Text`
  font-size: 12px;
  color: #0047AB;
  font-weight: bold;
`;

export const FeaturedScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 20 }
})`
  margin-top: 15px;
`;

export const FeaturedCard = styled.TouchableOpacity`
  margin-right: 15px;
  width: 280px;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
`;

export const FeaturedImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: 15px;
`;

export const CategoryList = styled.View`
  padding: 0 20px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const CategoryItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
`;

export const CategoryName = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

export const TabBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 75px;
  background-color: #FFF;
  border-top-width: 1px;
  border-top-color: #EEE;
  padding-bottom: 15px;
`;

export const TabItem = styled.TouchableOpacity`
  align-items: center;
`;

export const TabText = styled.Text<{ active?: boolean }>`
  font-size: 10px;
  margin-top: 4px;
  font-weight: bold;
  color: ${props => props.active ? '#0047AB' : '#CCC'};
`;