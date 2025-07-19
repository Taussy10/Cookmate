import { AntDesign, Entypo } from '@expo/vector-icons/';
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
import images from '~/constants/images';
import { useAuthContext } from '~/contexts/auth-provider';

// Need to remove my recipe

const Bookmark = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { user } = useAuthContext();
  // These boolean works truthy falsey values
  // if value is truthy then execute and if it's falsey value
  // then don't execute
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getSavedRecipes = async () => {
      const result = await getBookmarkRecipe(user?.email);
      setSavedRecipes(result);
    };
    getSavedRecipes();
  }, []);

  console.log('Saved Recipes from Bookmark.tsx :', savedRecipes);

  const onRefresh = () => {
    // in starting start refershing
    setRefreshing(true);
    getBookmarkRecipe(user?.email);
    // when refreshed just stop refreshing
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="flex-1 px-4   mt-10  ">
      
      

      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={savedRecipes}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
<View className=" flex-row  justify-between  mb-10">
        <AntDesign name="left" size={24} color="black"
        onPress={() => router.back()}
        />
        <Text className=" font-pBold  text-xl text-black">Bookmark</Text>
        <Text>Profile</Text>
      </View>        }
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
    </SafeAreaView>
  );
};

export default Bookmark;
