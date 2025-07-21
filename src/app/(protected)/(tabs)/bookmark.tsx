import { AntDesign } from '@expo/vector-icons';
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

import { getBookmarkedRecipe } from '~/appwrite/appwrite';
import EmptyList from '~/components/global/Empty-list';
import images from '~/constants/images';
import { useAuthContext } from '~/contexts/auth-provider';

// Need to remove my recipe

const Bookmark = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { user } = useAuthContext();
  // These boolean works truthy falsey values
  // if value is truthy then execute the function/code else
  //  if it's falsey value then don't execute code.
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getSavedRecipes = async () => {
      const result = await getBookmarkedRecipe(user?.email);
      setSavedRecipes(result);
    };
    getSavedRecipes();
  }, []);

  // console.log('Saved Recipes from Bookmark.tsx :', savedRecipes);

  const onRefresh = async () => {
    // in starting start refershing
    setRefreshing(true);
    const result = await getBookmarkedRecipe(user?.email);
    setSavedRecipes(result);
    // when refreshed just stop refreshing
    setRefreshing(false);
  };


  return (
    <SafeAreaView className="mb-28 mt-10 flex-1 bg-white px-4">
      {/* Recipes List */}
      <FlatList
        numColumns={2}
        data={savedRecipes}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        // contentContainerStyle={{ paddingBottom: 80 }}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          // {/* Header */}
          <View className="mb-6 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text className="font-pBold text-2xl text-black">Bookmarks</Text>
            {/* Spacer to balance the layout so that 
         both items can be occupy header space smoothly */}
            <View style={{ width: 24 }} />
          </View>
        }
        // Always add this
        ListEmptyComponent={
          <EmptyList title={'No Items Found'} subTitle={'Make recipies using cookmate.'} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: '/details/[id]',
                params: { id: item.$id },
              })
            }
            // Each item is taking 48%
            className="mb-4 w-[48%]">
            <ImageBackground
              source={{ uri: item?.aiImage }}
              resizeMode="cover"
              className="relative h-64 w-full justify-end overflow-hidden rounded-2xl">
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
                numberOfLines={2}
                className="px-2 pb-2 text-center font-pSemibold text-sm text-white">
                {/* If name is short use full, else slice */}
                {item?.recipeName.length <= 20 ? item?.recipeName : `${item?.recipeName.slice(0, 18)}...`}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
