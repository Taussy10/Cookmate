import { Link, Tabs, usePathname } from 'expo-router';
import { Text, View, Image } from 'react-native';
import { icons } from '~/constants/icon';

interface propsType {
  color: string;
  title: string;
  focused: boolean;
  inactiveIcon: string;
  activeIcon: string;
}

// Custom Icons for Tabs
const TabBarIcon = ({ title, focused, inactiveIcon, activeIcon }: propsType) => {
  if (focused) {
    return (
      <View className="  w-14 flex-1 items-center ">
        {/* for some reason you don't have to use require 
      key word if you have already imported */}

        <Image source={activeIcon} className="  size-7" tintColor={'#4ade80'} />

        <Text className=" text-center text-[10px] font-semibold">{title}</Text>
      </View>
    );
  }
  return (
    <View className="  w-14 flex-1  items-center ">
      {/* bg-green-500 */}
      {/* <Image source={image} className=" h-7 w-7" /> */}
      <Image source={inactiveIcon} className=" size-7" tintColor={'grey'} />
      <Text className=" text-center text-[10px] font-semibold  text-gray-400">{title}</Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    // In tab bar we have two things
    // 1. Tab bar container
    // 2. Tab bar items

    // This is tab bar container
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'grey',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          //  for showing notifications
          // tabBarBadge and tabBarBadge styles for customization
          // BTW you can use almost same props on indiviual screen in Tabs.screen
          //  or in all screen in Tabs

          // title: 'Home',
          // tab bar items
          // This tab bar takes a call back function a returns a JSX
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              title="Home"
              color={color}
              focused={focused}
              activeIcon={icons.home}
              inactiveIcon={icons.home_outline}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              title="Explore"
              color={color}
              focused={focused}
              activeIcon={icons.bookmark}
              inactiveIcon={icons.bookmark_outline}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cookbook"
        options={{
          title: 'Cookook',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              title="Cookbook"
              color={color}
              focused={focused}
              activeIcon={icons.bookmark}
              inactiveIcon={icons.bookmark_outline}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              title="Profile"
              color={color}
              focused={focused}
              activeIcon={icons.profile}
              inactiveIcon={icons.profile_oultine}
            />
          ),
        }}
      />
    </Tabs>
  );
}
