import React from 'react';
import { StatusBar } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDrawerContent from '~/components/CustomDrawerContent';

import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';

import Profile from '~/pages/App/Profile';
import Design from '~/pages/App/Design';
import Contact from '~/pages/App/Contact';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function createIcon({ color, size }, name) {
  return <Icon name={name} color={color} size={size} />;
}

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#5BAE59" />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </>
  ) : (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        drawerType="front"
        drawerContentOptions={{
          inactiveTintColor: '#fff',
          activeTintColor: '#000',
          activeBackgroundColor: '#fff',
          itemStyle: {
            borderRadius: 0,
            paddingHorizontal: 50,
            left: -10,
            width: '110%',
          },
          labelStyle: {
            marginLeft: -20,
            fontSize: 18,
          },
        }}
        initialRouteName="Design"
      >
        <Drawer.Screen
          name="Design"
          component={Design}
          options={{
            title: 'Home',
            drawerIcon: ({ color, size }) =>
              createIcon({ color, size }, 'person-outline'),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Ver conta',
            drawerIcon: ({ color, size }) =>
              createIcon({ color, size }, 'person-outline'),
          }}
        />
        <Drawer.Screen
          name="Payment"
          component={Design}
          options={{
            title: 'Pagamento',
            drawerIcon: ({ color, size }) =>
              createIcon({ color, size }, 'dashboard'),
          }}
        />
        <Drawer.Screen
          name="Bag"
          component={Design}
          options={{
            title: 'Cesta de compra',
            drawerIcon: ({ color, size }) =>
              createIcon({ color, size }, 'dashboard'),
          }}
        />
        <Drawer.Screen
          name="Purchases"
          component={Design}
          options={{
            title: 'Minhas compras',
            drawerIcon: ({ color, size }) =>
              createIcon({ color, size }, 'dashboard'),
          }}
        />
        <Drawer.Screen
          name="Help"
          component={Contact}
          options={{
            title: 'Ajuda',
            drawerIcon: ({ color, size }) =>
              createIcon({ color, size }, 'shopping-basket'),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
