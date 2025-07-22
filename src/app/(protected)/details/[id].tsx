import { FlatList, Image, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getRecipe, removeBookmark } from '~/appwrite/appwrite';
import { useAuthContext } from '~/contexts/auth-provider';
import { ID } from 'react-native-appwrite';
import { useBookmarkStore } from '~/store/bookmarkStore';

const RecipeDetails = () => {
  // Intally it will be false: so no Bookmark
  const [bookmark, setBookmark] = useState(false);
  const { user } = useAuthContext();
  const { bookmarks, add, remove } = useBookmarkStore();

  // we got the id of opened recipe
  const { id: recipeId } = useLocalSearchParams();
  const [currentRecipe, setCurrentRecipe] = useState([]);

  useEffect(() => {
    getRecipeById(recipeId);
  }, []);
  useEffect(() => {
    loadBookmarks();
  }, []);
  // It tells wheter that recipeId include in bookmars arrray
  //  Yeah or Naah
  const isBookmarked = bookmarks.includes(currentRecipe.$id);

  console.log('BOOKMARK :', isBookmarked);

  // Add this
  const loadBookmarks = useBookmarkStore((state) => state.load);

  // This is for getting recpie by id
  // id is param that is is passed in getRecipe function
  // value of id in getRecipe is in getRecipe funciton
  // and value getRecipeById is in getRecipeById executor
  const getRecipeById = async (id: string) => {
    try {
      const recipe = await getRecipe(id);
      setCurrentRecipe(recipe);
    } catch (error) {
      console.log('ERROR from getRecipeById function :', error);
    }
  };

  // Handle bookmark:
  // Then we click on icon
  const handleBookmark = () => {
    //  Even after clicking, the bookmark state value will still
    // be the old-value(false) for a moment, so it will run removeBookmark
    // why false ? because React updates state
    //  asynchronously and useState is async function(hooks are function).
    //  So I can't use the updated value immediately
    //  after calling setBookmark. Instead, I need to compute the next
    // value myself (e.g. const nextValue = !bookmark)."

    // const nextValue = !bookmark;

    // Then we check does bookmar truthy value ??
    //    if (isBookmarked) {
    //   remove(recipeId); // It's already bookmarked, so remove it
    // } else {
    //   add(recipeId, user?.email); // It's not bookmarked, so add it
    // }
    if (!currentRecipe?.$id) return;

    if (bookmarks.includes(currentRecipe.$id)) {
      // Already bookmarked, so remove it
      remove(currentRecipe.$id);
    } else {
      // Not bookmarked, so add it
      add(currentRecipe.$id, user?.email);
    }

    // setBookmark(!bookmark);
  };

  // console.log('CurrentRecipe :', currentRecipe.$id);

  return (
    <SafeAreaView className="bg-white-300 flex-1 px-4 ">
      <FlatList
        data={[1]}
        // keyExtractor={({}) =>  }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className=" mb-6 flex-row  justify-between ">
            <AntDesign name="left" size={24} color="black" onPress={() => router.back()} />
            <Text className=" font-pBold text-xl text-black">Recipe Details</Text>
            {/* Spacer to balance the layout so that 
         both items can be occupy header space smoothly */}
            <View style={{ width: 24 }} />
          </View>
        }
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: currentRecipe?.aiImage }}
              className="  mb-3 mt-8  h-52 w-full rounded-2xl"
              resizeMode="cover"
            />
            {/* For title and bookmark */}
            <View className=" mb-3 flex-row items-center justify-between">
              <Text className="  font-pSemibold  text-xl">
                {currentRecipe?.recipeName?.slice(0, 20)}..
              </Text>
              {/* This is intially */}
              <Ionicons
                // If bookmark is true then show add circle else
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={28}
                color={'black'}
                onPress={handleBookmark}
              />
              {/* // onPress={() => isBookmarked ? remove(recipeId) : add(recipeId, user?.email)} */}

              {/* {!bookmark ? (
                <Ionicons
                  name="airplane"
                  size={28}
                  color={'black'}
                  onPress={() => {
                    addBookmark(currentRecipe?.$id, user?.email);
                    setBookmark(bookmark!);
                  }}
                />
              ) : (
                <Ionicons
                  name="add-circle"
                  size={28}
                  color={'red'}
                  onPress={() => {
                    addBookmark(currentRecipe?.$id, user?.email);
                    setBookmark(!bookmark);
                  }}
                />
              )} */}
            </View>

            {/*
    It's time to create extra info
      to create this we need nested layout 
three divs: 1. For container 
2. for leaf 
3. for texts0
*/}

            <View className="mb-6 flex-row gap-6">
              {currentRecipe?.extraInfo?.map((item, id) => (
                <View
                  key={id}
                  className="
      h-20 
      w-28 flex-row items-center gap-1
      rounded-2xl bg-green-300 p-1">
                  <Text className=" size-7">{item.icon}</Text>
                  <View className="flex-col">
                    <Text className="font-pBold  text-action ">{item?.number}</Text>
                    <Text className=" font-pBold  text-black ">{item.label}</Text>
                  </View>
                </View>
              ))}
            </View>
            {/* For desciptions */}
            <View className="mb-3">
              <Text className=" mb-1  font-pBold  text-lg ">Desciption</Text>
              <Text className="  font-pSemibold text-gray-500">{currentRecipe?.description}</Text>
            </View>

            {/* Ingrdient list container */}
            <View>
              {/* Ingredient title container */}
              <View className=" mb-2 flex-row items-center justify-between ">
                <Text className="  font-pBold text-lg">Ingredient</Text>
                <Text className="   font-pSemibold     text-base">
                  {currentRecipe?.ingredients?.length} Items
                </Text>
              </View>

              {/* Container For Recipe Steps */}
              <View>
                {/* Why outside View so that we can flex it cause in map method 
only one ingradent will render so we will make all */}
                <View className=" mb-3">
                  {currentRecipe?.ingredients?.map((item, id) => {
                    // console.log('ITEMSS :', item);

                    return (
                      // container

                      <View key={id} className="  flex-row items-center justify-between">
                        {/* Container for icon   */}
                        <View className=" flex-row items-center   ">
                          <Text className=" size-8">{item?.icon}</Text>
                          <Text className="font-pSemibold">{item?.name}</Text>
                        </View>
                        <Text className=" font-pSemibold text-gray-500">{item?.qty}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Container for Recipe steps */}
            <View className=" mb-10">
              <Text className="mb-3 font-pBold   text-xl">Recipe Steps</Text>

              {/* Container for steps card */}
              <View className="   gap-3">
                {currentRecipe?.steps?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className=" flex-row  
                      items-center gap-2 
                      rounded-xl border bg-action p-2">
                      <View
                        className="  size-10   items-center justify-center
                           rounded-full bg-green-300 p-1">
                        <Text className=" text-center font-pSemibold  text-2xl">{item.step}</Text>
                      </View>

                      <Text
                        // Why flex-1 ? for filling avaible space
                        // oterwise it will only write in few area
                        className=" flex-1 font-pSemibold  text-white "
                        //  numberOfLines={2}
                      >
                        {item.instruction}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default RecipeDetails;
