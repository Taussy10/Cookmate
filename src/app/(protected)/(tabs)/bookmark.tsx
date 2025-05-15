import { Entypo } from '@expo/vector-icons/';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import { getAllRecipes, getBookmarkRecipe, getUserRecipe } from '~/appwrite/appwrite';
import images from "~/constants/images";
import { useAuthContext } from '~/contexts/auth-provider';

// Need to remove my recipe 


const Cookbook = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showMyRecipe, setShowMyRecipe] = useState(true);
  const {user} = useAuthContext()
  // These boolean works truthy falsey values
  // if value is truthy then execute and if it's falsey value
  // then don't execute
  const [refreshing, setRefreshing] = useState(false);

  // I've to refresh to get savedRecipe
  useEffect(() => {
    const allRecipes = async () => {
      const result = await getUserRecipe(user?.email);
      setMyRecipes(result);
    };
    allRecipes();
  }, []);

  useEffect(() => {
    const getSavedRecipes = async () => {
      const result = await getBookmarkRecipe(user?.email);
      setSavedRecipes(result);
    };
    getSavedRecipes();
  }, []);

  // console.log("Recipes from cookbook.tsx :",myRecipes);
  console.log('Saved Recipes from cookbook.tsx :', savedRecipes);

  const onRefresh = () => {
    // in starting start refershing
    setRefreshing(true);
    showMyRecipe ? getAllRecipes() : getBookmarkRecipe();
    // when refreshed just stop refreshing
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="flex-1 px-4 ">
      <Text className="mb-3 mt-2 text-center text-2xl font-bold">Cookbook</Text>

      <View className=" flex-row items-center gap-10">
        <TouchableOpacity
          className="  flex-row items-center gap-0.5"
          onPress={() => setShowMyRecipe(true)}>
          <Entypo name="star" size={28} color="black" />
          <Text className="font-pSemibold text-xl">My Recipe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // activeOpacity={0.5}
          onPress={() => setShowMyRecipe(false)}
          className="  flex-row items-center gap-0.5">
          <Entypo name="bookmark" size={28} color="black" />
          <Text className="font-pSemibold text-xl">Saved</Text>
        </TouchableOpacity>
      </View>

      {showMyRecipe ? (
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={myRecipes}
          // onRefresh={false}
          
          refreshControl={
            // For "basic" refresh you need two two props
            // 1. boolean(whether it should refresh or not )
            // 2. A fucntion that calls that this thing has to refresh for these second
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.8} className=" mx-2 my-2 "
            onPress={() =>
              router.push({
                pathname: '/details/[id]',
                params: item,
              })
            }
            >
              <ImageBackground
                source={{ uri: item?.aiImage }}
                resizeMode="cover"
                className="  h-64 w-44 overflow-hidden rounded-2xl    ">
                <Image
                  source={images.gradient}
                  style={{
                    height: '20%',
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#111827',
                  }}
                />
                <Text
                  style={{ position: 'absolute', bottom: 4, textAlign: 'center', width: '100%' }}
                  numberOfLines={2}
                  className="font-pSemibold text-white">
                  {item?.recipeName.length < 10 ? item?.recipeName : item?.recipeName.slice(0, 15)}
                  ...
                  {/* {item?.recipeName} */}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={savedRecipes}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: '/details/[id]',
                  params: item,
                })
              }
              className=" mx-2 my-2 ">
              <ImageBackground
                source={{ uri: item?.aiImage }}
                resizeMode="cover"
                className="  h-64 w-44 overflow-hidden rounded-2xl    ">
                <Image
                  source={images.gradient}
                  style={{
                    height: '20%',
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#111827',
                  }}
                />
                <Text
                  style={{ position: 'absolute', bottom: 4, textAlign: 'center', width: '100%' }}
                  numberOfLines={2}
                  className="font-pSemibold text-white">
                  {item?.recipeName.length < 10 ? item?.recipeName : item?.recipeName.slice(0, 15)}
                  ...
                  {/* {item?.recipeName} */}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Cookbook;
