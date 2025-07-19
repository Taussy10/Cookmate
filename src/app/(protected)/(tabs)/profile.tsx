// import {useState } from 'react';
import { AntDesign, Entypo, Feather, FontAwesome6 } from '@expo/vector-icons/';
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
import { getUserRecipe, getUsersDB, logout } from '~/appwrite/appwrite';
import { icons } from '~/constants/icon';
interface propsType {
  id: number;
  title: string;
  press: () => void;
}

const Profile = () => {
  const router = useRouter();
  const [myRecipes, setMyRecipes] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const { loggedIn, user } = useAuthContext();
  useEffect(() => {
    const allRecipes = async () => {
      const result = await getUserRecipe(user?.email);
      setMyRecipes(result);
    };
    allRecipes();
  }, []);

// console.log("EMAIL :",user?.email);

  useEffect(() => {
    const getUser = async () => {
      const result = await getUsersDB(user?.email);
      // Result is an array: then in curly so 
      // you have to access array then object 
      
      setCurrentUser(result);
    };
    getUser();
  }, []);

  // 
  // console.log("Current User", ...currentUser);
  

  // console.log('LoggedIn from profile.tsx :', loggedIn);
  // console.log('user :', user);

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
    <SafeAreaView className="flex-1 bg-primary  px-4  mt-10">

      {/* Custom header navigation: before the scrolling cause navigation shouldn't scroll  */}

      <View className=" flex-row  justify-between ">
        <AntDesign name="left" size={24} color="black"
        onPress={() => router.back()}
        />
        <Text className=" font-pBold  text-xl text-black">Profile</Text>
        <Text>Profile</Text>
      </View>

      {/* Creating 2 sections in screen: name-PFP and options: */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* For image */}
        <View className=" mb-6 mt-10 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            className="  size-10 items-center justify-center 
            rounded-full  bg-[#15803d] p-1"
            style={{
              position: 'absolute',
              right: 110,
              zIndex: 1,
              bottom: 3,
            }}>
            <Image
              source={require('~/../assets/icons/pen.png')}
              className="  size-6    "
              tintColor={'white'}
            />
          </TouchableOpacity>

          <Image
            
            source={{ uri: currentUser[0]?.user_image}}
            className=" size-40 rounded-full"
          />
        </View>
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
              <Image source={icons.profile} className=" size-6" tintColor={'#ffffff'} />
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
              <Feather name="mail" size={24} color="#ffffff" />
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

            className="   flex-row items-center
             justify-center   rounded-3xl border-2 border-red-900
            bg-red-200  p-3
              active:bg-red-900 mb-40">
            <View className=" flex-row  gap-2">
              <Image source={icons.logout} className=" size-7" />
              <Text className="   font-pBold text-xl text-red-700">Logout</Text>
            </View>
          </TouchableOpacity>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
