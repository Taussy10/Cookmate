import { FlatList, Image, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '~/constants/images';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { addBookmark, getRecipe } from '~/appwrite/appwrite';
import { useAuthContext } from '~/contexts/auth-provider';

const RecipeDetails = () => {
  // Intally it will be false 
  const [bookmark, setBookmark] = useState(false);
  const { user } = useAuthContext();
  // console.log('Items from explore in details screen :', item);
  // we got the id of opened recipe
  const { id:recipeId } = useLocalSearchParams();
  const [currentRecipe, setCurrentRecipe] = useState([]);

  useEffect(() => {
    getRecipeById(recipeId);
  }, []);

  // useEffect(() => {
  //   addedBookmark(recipeId, user?.email)
  // }, []);



  // Now we will call the that recipe data:

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

  //  const addedBookmark = async (id: string, email:string) => {
  //   try {
  //     const recipe = await addBookmark(id,email);
  //     console.log("Bookmarked RECIPE :",recipe);
      
  //     // setCurrentRecipe(recipe);
  //   } catch (error) {
  //     console.log('ERROR from getRecipeById function :', error);
  //   }
  // };


  // Handle bookmark: 
  const handleBookmark = () => {
    // Bookmark will be true: if clicked here 
    // It's adding without clicking so have to dos eomthing
    // Working fine make remove bookmark function also 
    //  addBookmark(recipeId, user?.email)

    setBookmark(!bookmark)
       
  }

  console.log('CurrentRecipe :', currentRecipe.$id);

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
                  name= {bookmark?'add-circle': `remove-circle`}
                  size={28}
                  color={'black'}
                  onPress={handleBookmark}
                />

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
