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

export const Content = styled.View`
  align-items: center;
  padding-bottom: 40px;
  padding-horizontal: 20px;
`;

export const BookCover = styled.Image`
  width: 220px;
  height: 320px;
  border-radius: 12px;
  background-color: #EEE;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #1A1A1A;
  margin-top: 25px;
  text-align: center;
`;

export const Author = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 5px;
`;

/* NOVOS COMPONENTES PARA OS DADOS DA API */

export const InfoRow = styled.View`
  flex-direction: row;
  margin-top: 25px;
  padding: 15px;
  background-color: #F8F9FA;
  border-radius: 12px;
  width: 100%;
  justify-content: space-around;
`;

export const InfoBox = styled.View`
  align-items: center;
`;

export const InfoLabel = styled.Text`
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  font-weight: bold;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #0047AB;
  margin-top: 4px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1A1A1A;
  align-self: flex-start;
  margin-top: 30px;
`;

export const Description = styled.Text`
  font-size: 15px;
  color: #555;
  line-height: 22px;
  margin-top: 10px;
  text-align: justify;
  width: 100%;
`;

/* BOTÕES E FOOTER */

export const Footer = styled.View`
  padding: 20px;
  align-items: center;
`;

export const ButtonPrimary = styled.TouchableOpacity`
  background-color: #0047AB;
  width: 100%;
  padding: 18px;
  border-radius: 10px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
`;

export const ButtonOutline = styled.TouchableOpacity`
  border-width: 1.5px;
  border-color: #0047AB;
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  align-items: center;
  margin-top: 15px;
`;

export const ButtonOutlineText = styled.Text`
  color: #0047AB;
  font-weight: bold;
  font-size: 14px;
`;