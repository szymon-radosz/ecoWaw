import React, {useContext} from 'react';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';
import {GlobalContext} from './../../context/GlobalContext';

const PanelBottom = ({navigation}) => {
  const context = useContext(GlobalContext);
  return (
    <Footer>
      <FooterTab tabActiveBgColor="#333">
        {context.activeBottomItemName &&
        context.activeBottomItemName === 'MainMapScreen' ? (
          <Button
            vertical
            active
            onPress={() => {
              context.setActiveBottomItemName('MainMapScreen');
              navigation.navigate('MainMapScreen');
            }}>
            <Icon active name="navigate" />
            <Text>Punkty</Text>
          </Button>
        ) : (
          <Button
            vertical
            onPress={() => {
              context.setActiveBottomItemName('MainMapScreen');
              navigation.navigate('MainMapScreen');
            }}>
            <Icon name="navigate" />
            <Text>Punkty</Text>
          </Button>
        )}

        {context.activeBottomItemName &&
        context.activeBottomItemName === 'CouponScreen' ? (
          <Button
            vertical
            active
            activeTabStyle={{backgroundColor: 'green'}}
            onPress={() => {
              context.setActiveBottomItemName('CouponScreen');
              navigation.navigate('CouponScreen');
            }}>
            <Icon active name="apps" />
            <Text>Kupony</Text>
          </Button>
        ) : (
          <Button
            vertical
            onPress={() => {
              context.setActiveBottomItemName('CouponScreen');
              navigation.navigate('CouponScreen');
            }}>
            <Icon name="apps" />
            <Text>Kupony</Text>
          </Button>
        )}

        {context.activeBottomItemName &&
        context.activeBottomItemName === 'ProfileScreen' ? (
          <Button
            vertical
            active
            onPress={() => {
              context.setActiveBottomItemName('ProfileScreen');
              navigation.navigate('ProfileScreen');
            }}>
            <Icon active name="person" />
            <Text>Profil</Text>
          </Button>
        ) : (
          <Button
            vertical
            onPress={() => {
              context.setActiveBottomItemName('ProfileScreen');
              navigation.navigate('ProfileScreen');
            }}>
            <Icon name="person" />
            <Text>Profil</Text>
          </Button>
        )}

        {context.activeBottomItemName &&
        context.activeBottomItemName === 'ReportScreen' ? (
          <Button
            vertical
            active
            onPress={() => {
              context.setActiveBottomItemName('ReportScreen');
              navigation.navigate('ReportScreen');
            }}>
            <Icon active name="person" />
            <Text>Zgłoś</Text>
          </Button>
        ) : (
          <Button
            vertical
            onPress={() => {
              context.setActiveBottomItemName('ReportScreen');
              navigation.navigate('ReportScreen');
            }}>
            <Icon name="person" />
            <Text>Zgłoś</Text>
          </Button>
        )}
      </FooterTab>
    </Footer>
  );
};

export default PanelBottom;
