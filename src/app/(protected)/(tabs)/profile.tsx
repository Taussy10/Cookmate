// import {useState } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons/';
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
    <SafeAreaView className="flex-1  bg-primary px-4 ">
      {/* Creating 2 sections in screen: name-PFP and options: */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Container for userInfo: pfp, name and useremail */}
        <View className=" mb-6 mt-8 items-center justify-center">
          <Image
            source={require('~/../assets/images/icon.png')}
            className=" size-32 rounded-full"
          />
          <Text className="font-poppinsRegular text-2xl font-bold">{user?.name}</Text>
          <Text className=" font-pSemibold text-base text-gray-500 ">{user?.email}</Text>
        </View>

        {/* Here put recipe of this user in scrollable view  */}
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
                  className=" font-poppinsBold font-pSemibold text-[16px]">
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
          {profileOptions.map(({ id, icon, title, press }) => {
            return (
              // {/* View for each options  */}
              // {/* optons one contains two things so create a container:  */}
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
                {/*For group of icon and title  */}
                <View className=" flex-row gap-2">
                  <Image source={icon} className=" h-8 w-8" />
                  <Text className="  font-poppinsSemiBold text-xl">{title}</Text>
                </View>
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>
            );
          })}

          {/* for logout */}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleLogout}
            // onPress={logout}

            className="mb-3 flex-row items-center justify-between  bg-secondary  p-4  active:bg-red-700">
            {/*For group of icon and title  */}
            <View className=" flex-row gap-2">
              {/* <Entypo name="star" size={28} color="yellow" /> */}
              <Image source={icons.logout} className=" size-7" />
              <Text className="  font-poppinsSemiBold text-xl">Logout</Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>

          {/* This one is for testing  */}
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/home')}
            className="flex-row items-center justify-between bg-green-500  p-4">
         
            <View className=" flex-row gap-2">
              <Entypo name="star" size={28} color="yellow" />
              <Text className="  font-poppinsSemiBold text-xl">This button is for testing</Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
