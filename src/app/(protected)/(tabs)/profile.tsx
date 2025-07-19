// import {useState } from 'react';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons/';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { profileOptions } from '~/data/data';
import { useAuthContext } from '~/contexts/auth-provider';
import { FlatList } from 'react-native-actions-sheet';
import { useState, useEffect } from 'react';
import { getUserRecipe, logout } from '~/appwrite/appwrite';
import images from '~/constants/images';
import { icons } from '~/constants/icon';
interface propsType {
  id: number;
  title: string;
  press: () => void;
}

const Profile = () => {
  const router = useRouter();
  const [myRecipes, setMyRecipes] = useState([]);
  const { loggedIn, user } = useAuthContext();
  useEffect(() => {
    const allRecipes = async () => {
      const result = await getUserRecipe(user?.email);
      setMyRecipes(result);
    };
    allRecipes();
  }, []);
  console.log('LoggedIn from profile.tsx :', loggedIn);
  console.log('user :', user);

  // Always write function like this
  // should be verb an action
  const handleLogout = () => {
    try {
      logout();
      router.push('/');
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    // This is design requriements
    <SafeAreaView className="mb-40 mt-10  flex-1 bg-primary  px-4  ">
      {/* Custom top bar navigation: before the scrolling cause navigation shouldn't scroll  */}

      <View className=" flex-row  justify-between ">
        <AntDesign name="left" size={24} color="black" />
        <Text className=" font-pBold  text-xl text-black">Profile</Text>
        <Text>Profile</Text>
      </View>

      {/* Creating 2 sections in screen: name-PFP and options: */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" mb-6 mt-10 items-center justify-center">
          <Image
            source={{ uri: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_21.png' }}
            className=" size-40 rounded-full"
          />
        </View>
        {/* Container for userInfo: pfp, name and useremail 
        <View className=" mb-6 mt-8 items-center justify-center">
          <Image
            source={require('~/../assets/images/icon.png')}
            className=" size-32 rounded-full"
          />
          <Text className=" font-pRegular text-2xl font-bold">{user?.name}</Text>
          <Text className=" font-pSemibold text-base text-gray-500 ">{user?.email}</Text>
        </View>
*/}
        {/* Container for user specific recipe */}
        <View className=" mb-6">
          <Text className=" font-pSemibold text-xl">My Recipes</Text>

          <FlatList
            data={myRecipes}
            horizontal
            // showsVeriScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // keyExtractor={(index) => index.id  }
            renderItem={({ item }) => (
              // this is container
              <TouchableOpacity
                activeOpacity={0.7}
                className="  mx-2  my-2 "
                onPress={() =>
                  router.push({
                    pathname: '/details/[id]',
                    params: item,
                  })
                }>
                <ImageBackground
                  source={{
                    uri: item?.aiImage,
                  }}
                  resizeMode="cover"
                  className="h-48 w-64 overflow-hidden rounded-2xl ">
                  {/* <Image
                source={images.gradient}
                style={{
                  height: '20%',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: '#111827',
                }}
                /> */}
                </ImageBackground>
                <Text
                  // style={{ position: 'absolute', bottom: 4 }}
                  numberOfLines={2}
                  className=" font-pSemibold text-[16px]">
                  {item?.recipeName.length < 10 ? item?.recipeName : item?.recipeName.slice(0, 24)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Containe for Options*/}
        <View
        // className=" bg-green-300"
        >
          {/* For Name */}
          <View className=" mb-5  flex-row gap-2">
            <View
              className="  size-10 items-center justify-center 
            rounded-full  bg-[#15803d] p-1">
              <Image source={icons.profile} className=" size-6" tintColor={'#90EE90'} />
            </View>

            <View>
              <Text className=" font-pSemibold  text-gray-500">Full Name</Text>
              {/* for some reason I'm not getting last name so have to make numberOfLine = 2 */}
              <Text className="  font-pBold  capitalize  " numberOfLines={2}>
                {user?.name}
              </Text>
            </View>
          </View>

          {/* For Email */}
          <View className=" mb-10  flex-row gap-2">
            <View
              className="  size-10  items-center  justify-center  rounded-full 
              bg-[#15803d]  p-1">
              {/* <Image source={images.star} className=" size-8" /> */}
              <Feather name="mail" size={24} color="#90EE90" />
            </View>

            <View>
              <Text className=" font-pSemibold  text-gray-500">Email</Text>
              <Text className="  font-pBold">{user?.email}</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            // onPress={handleLogout}
            // onPress={logout}

            className="mb-3    flex-row items-center
             justify-center   rounded-3xl border-2 border-red-900
            bg-red-200  p-3
              active:bg-red-900">
            <View className=" flex-row  gap-2">
              <Image source={icons.logout} className=" size-7" />
              <Text className="   font-pBold text-xl text-red-700">Logout</Text>
            </View>
          </TouchableOpacity>

          {/*
          {profileOptions.map(({ id, icon, title, press }) => {
            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.6}
                onPress={() => {
                  // checkin if press exist or not
                  if (press) {
                    router.push(press);
                  }
                }}
                className="  mb-5  flex-row items-center justify-between rounded-xl bg-secondary p-5 ">
                <View className=" flex-row gap-2">
                  <Image source={icon} className=" h-8 w-8" />
                  <Text className="  font-pSemibold text-xl">{title}</Text>
                </View>
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>
            );
          })}
*/}
          {/* for logout 
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleLogout}
            // onPress={logout}

            className="mb-3 flex-row items-center justify-between  bg-secondary  p-4  active:bg-red-700">
            <View className=" flex-row gap-2">
              <Image source={icons.logout} className=" size-7" />
              <Text className="  font-pSemibold text-xl">Logout</Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>*/}

          {/* This one is for testing  */}
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/home')}
            className="flex-row items-center justify-between bg-green-500  p-4">
         
            <View className=" flex-row gap-2">
              <Entypo name="star" size={28} color="yellow" />
              <Text className="  font-pSemibold text-xl">This button is for testing</Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
