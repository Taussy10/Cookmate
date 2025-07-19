import { Link, Tabs, usePathname } from 'expo-router';
import { Text, View, Image, ImageSourcePropType } from 'react-native';
import { icons } from '~/constants/icon';

interface tabBarIconProps {
  color: string;
  title: string;
  focused: boolean;
  inactiveIcon: ImageSourcePropType | undefined;
  activeIcon: ImageSourcePropType | undefined;
}

// Custom components for Tabs's icons
const TabBarIcon = ({ title, focused, inactiveIcon, activeIcon }: tabBarIconProps) => {
  // If tab icon is fouces then return this
  if (focused) {
    return (
      // mt-1 for making tab between the TabBar
      <View className="   mt-1 w-14 flex-1  items-center">
        {/* for some reason you don't have to use require 
      key word if you have already imported */}
        <Image
          source={activeIcon}
          resizeMode="contain"
          className="  size-7"
          tintColor={'#15803d'}
        />
        <Text className=" text-center text-[10px]  font-bold ">{title}</Text>
      </View>
    );
  }

  // By default this will be return
  return (
    <View className="  mt-1 w-14  flex-1 items-center ">
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
        headerShown: false,
        // tabBarActiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: {
                  // do this TabBar shouldn't look square

          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,

          height: 60, // Set your desired height
          paddingTop: 0, // Remove top padding
          paddingBottom: 0, // Remove bottom padding
          marginTop: 0, // Remove any extra top margin
          position: 'absolute',
          bottom: 40,
          backgroundColor: 'white', // change to white
          shadowColor: '#1a1a1a',
          shadowOffset: { height: 2, width: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12, // Optional: smaller text
          marginBottom: 2, // Fine-tune spacing
        },
        tabBarItemStyle: {
          paddingTop: 0, // Prevent extra top padding per item
        },
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
              inactiveIcon={icons.home}
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
              activeIcon={icons.search}
              inactiveIcon={icons.search}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Cookook',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              title="Bookmark"
              color={color}
              focused={focused}
              activeIcon={icons.bookmark}
              inactiveIcon={icons.bookmark}
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
              inactiveIcon={icons.profile}
            />
          ),
        }}
      />
    </Tabs>
  );
}
