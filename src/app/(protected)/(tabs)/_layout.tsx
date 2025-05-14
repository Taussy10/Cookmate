import { Link, Tabs } from 'expo-router';
import { Text, View, Image } from 'react-native';
// import images from '~/constants/images';
import images from "~/constants/images";
import Ionicons from '@expo/vector-icons/Ionicons';


interface propsType {
// image: string;
color: string;
title: string;
}

// Custom Icons for Tabs
const TabBarIcon = ({ image, color, title}:propsType) => {
  return (
    <View className='  flex-1 w-full bg-green-500'>
      <Image source={image} className=" h-7 w-7" />
      <Text className=' text-[10px] text-center font-semibold'>{title}</Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          // title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon title="Home" image={images.star} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} image={images.bowl} />,
        }}
      />
      <Tabs.Screen
        name="cookbook"
        options={{
          title: 'Cookook',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} image={images.book} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} image={images.profile} />,
        }}
      />
    </Tabs>
  );
}
