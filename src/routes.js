import React from 'react';
import {StatusBar} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import CustomDrawerContent from '~/components/CustomDrawerContent';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';

import Profile from '~/pages/App/Profile';
import Design from '~/pages/App/Design';
import About from '~/pages/App/About';
import Question from '~/pages/App/Question';
import Contact from '~/pages/App/Contact';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function createIcon({color, size}, name) {
  return <Icon name={name} color={color} size={size} />;
}

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#e47858" />
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
        initialRouteName="Design">
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Minha Conta',
            drawerIcon: ({color, size}) =>
              createIcon({color, size}, 'person-outline'),
          }}
        />
        <Drawer.Screen
          name="Design"
          component={Design}
          options={{
            title: 'Criação',
            drawerIcon: ({color, size}) =>
              createIcon({color, size}, 'dashboard'),
          }}
        />
        <Drawer.Screen
          name="Purchase"
          component={Contact}
          options={{
            title: 'Compras',
            drawerIcon: ({color, size}) =>
              createIcon({color, size}, 'shopping-basket'),
          }}
        />
        <Drawer.Screen
          name="About"
          component={About}
          options={{
            title: 'Sobre',
            drawerIcon: ({color, size}) =>
              createIcon({color, size}, 'info-outline'),
          }}
        />
        <Drawer.Screen
          name="Question"
          component={Question}
          options={{
            title: 'Dúvidas',
            drawerIcon: ({color, size}) =>
              createIcon({color, size}, 'help-outline'),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={Contact}
          options={{
            title: 'Contato',
            drawerIcon: ({color, size}) =>
              createIcon({color, size}, 'contacts'),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
