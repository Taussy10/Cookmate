import {
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Button,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Entypo } from '@expo/vector-icons/';
// import { categoryData, exploreData } from '~/data/data';
import { categoryData, exploreData } from '~/data/data';
import image from '~/constants/images';
import { useState, useRef, useEffect } from 'react';
// import { prompts } from '~/constants/prompt';
import { prompts } from '~/constants/prompt';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { generateAiImage, Model } from '~/ai/ai';
import Loading from '~/components/loading-dialogue';

import { addRecipe, getLatestRecipes } from '~/appwrite/appwrite';
import { jsonrepair } from 'jsonrepair';
import { router } from 'expo-router';
import { useAuthContext } from '~/contexts/auth-provider';
import LatestRecipes from '~/components/latest-recipes';
const Home = () => {
  // here we go we executing useAuthContext
  // that will return context value such loggedIn , setLoggedIn , user etc ..
  // cause thre are in object(yeah key and values are same)
  // so two ways to get them

  // 1. store it in a variables then by dot method get the each props
  // for example
  // const a= useAuthContext()
  // a.loading

  // 2. Destructure it
  const { user, loggedIn } = useAuthContext();

  console.log('User is me', user, loggedIn);

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [inputHeight, setInputHeight] = useState(0);
  // for storing inputs;
  // intially value will be empty string then will
  // change acc to function
  const [userInput, setuserInput] = useState('');
  // for storing generated recipe
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [compeleteRecipe, setCompeleteRecipe] = useState([]);
  const [latestRecipes, setLatestRecipes] = useState([]);

  useEffect(() => {
    const allLatestRecipes = async () => {
      const result = await getLatestRecipes();
      setLatestRecipes(result);
    };
    allLatestRecipes();
  }, []);
  console.log('LatestRecipesfrom home.tsx :', latestRecipes);

  // console.log("USerEmail :", );

  const generateRecipe = async () => {
    if (userInput.length < 2) {
      Alert.alert('Error', 'Please write your food name');
      // why return ? Return ends the program
      // if you don't use then it will execute below of it's program
      return;
    }
    try {
      setLoading(true);
      console.log('UserInput from Press fun :', userInput);
      const AiResult = await Model(userInput + ' ' + prompts.GENERATE_THREE_RECIPE_PROMPT);
      console.log('AI result from Index.tsx :', AiResult);
      // Clean it cause it's needed to parse in JS object
      // AI gives unwanted things with JSON like this  ```JSON``
      //  that's why need to reapir it
      const cleaned = jsonrepair(AiResult);
      console.log('CleanedResult: ', cleaned);

      // then parse it
      const parsedResult = await JSON.parse(cleaned);
      console.log('Parsed Result from Index.tsx :', parsedResult);
      // and stor it
      setRecipeOptions(parsedResult);
      actionSheetRef.current?.show();
      setLoading(false);
    } catch (error) {
      console.error('Error while parsing:', error);
      Alert.alert('Error', 'AI se valid recipe data nahi mila. Try again later.');
      setLoading(false);
    }
  };

  console.log('recipeOptions from home.tsx :', recipeOptions);
  console.log('userInput from home.tsx :', userInput);

  const generateCompleteRecipe = async (option: any) => {
    try {
      actionSheetRef.current?.hide();
      setOpenLoading(true);
      const prompt = `recipeName: ${option.recipeName} Description: ${option.desc} ${prompts.GENERATE_COMPLETE_RECIPE}`;
      const AiResult = await Model(prompt);
      console.log('AI result for compelete recipe  :', AiResult);
      const cleaned = jsonrepair(AiResult);
      console.log('CleanedResult for compelete recipe: ', cleaned);
      // then parse it
      const parsedResult = await JSON.parse(cleaned);
      console.log('Parsed Result for compelete recipe:', parsedResult);
      // add it in state:
      setCompeleteRecipe(parsedResult);
      //1. Get the image prompt from complete generated Recipe
      // await  generateRecipeImage(parsedResult[0]?.imagePrompt)
      const aiImage = await generateAiImage(parsedResult[0]?.imagePrompt);
      // we send it to parsedResult
      addRecipe(parsedResult, aiImage, user?.email);
      // addRecipe(parsedResult, aiImages)
      setOpenLoading(false);
    } catch (error) {
      console.log('Error from generateCompleteRecipe :', error);
      setOpenLoading(false);
    }
  };

  return (
    // <SafeAreaView className="flex-1 bg-blue-300 px-4 ">
    <SafeAreaView className=" mb-14 flex-1 bg-white px-4      ">
      {/* So , in this we have 4 sections:
1. user salutation
2. userInput fieled  
3. Category 
4. Latest Recipies

// Use Flatlist but the problem with it that with which data ? 
// Most probably category data cause that's in middle 
*/}

      {/* For creating category*/}
      <FlatList
      // why 1? Actually I want to use flatlist here 1 is so that 
      // it only renders ones so only one time everything will show
        data={[1]}
        showsVerticalScrollIndicator={false}

        // For userInfor TextInput
        ListHeaderComponent={
          // Container for user info and input for generating recipies
          <View className="mb-6 mt-4">
              
            {/* Container for userInfo */}
            <View className=" mb-3 ">
              {/* If you export default images from files then for some reason you don't need require why know the reason  */}
              <Text className=" font-pRegular text-xl font-bold ">
                Hi,<Text className=" uppercase"> {user?.name} </Text>
              </Text>
            </View>

{/* Container for generating input */}
            <View className="  w-full rounded-2xl    bg-green-400 p-4" 
            >
              <Text
                className=" text-whitexz  mb-3 
              text-center  font-pBold   text-xl text-white">
                Let's start cooking
              </Text>
              <TextInput
                className=" mb-6   rounded-2xl bg-white  text-black"
                style={{ height: Math.max(100, inputHeight) }}
                multiline={true}
                maxLength={100}
                numberOfLines={4}
                placeholder="What do you want to cook? Add ingredients etc."
                // so that text start from top 
                textAlignVertical="top"
                // this controls what if content size inside input changes then what to do ?
                // calculate the content keep increasing it.
                onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
                // when user change the userInput in TextInput it will
                // store in setInput function then useState
                onChangeText={(text) => setuserInput(text)}
                // why do we use value ? so that can store value of userInput in InputText
                value={userInput}
              />

              <TouchableOpacity
                onPress={generateRecipe}
                // onPress={() => name()}
                activeOpacity={0.7}
                className=" flex-row items-center 
                justify-center gap-1  rounded-xl     bg-action p-3">
                {!loading ? (
                  <View className="  flex-row items-center justify-center gap-2">
                    <Entypo name="star" size={28} color="yellow" />
                    <Text className="  font-pBold  text-lg text-white ">Generate Recipe</Text>
                  </View>
                ) : (
                  <ActivityIndicator size={'large'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={() => (
          // container for categories
          <View>
            <FlatList
              data={categoryData}
              numColumns={3}
              renderItem={({ item }) => (
                <View className=" flex-1 items-center ">
                  {/* For each item */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '/category',
                        params: item,
                      })
                    }
                    activeOpacity={0.8}
                    className="  mb-6  w-24 items-center justify-center rounded-2xl   bg-primary  px-1 ">
                    <Image
                      source={item.img}
                      resizeMode="cover"
                      className="mb-1 size-16 overflow-hidden rounded-full    "
                    />
                    <Text
                      className="    font-pSemibold  "
                      // numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  {/* </TouchableOpacity>   */}
                </View>
              )}
            />
          </View>
        )}
        // So we have to add something in footer of section
        ListFooterComponent={
          <View className=" mb-6 mt-6">
            <LatestRecipes data={latestRecipes} />
          </View>
        }
      />

      <Loading visible={openLoading} text={'Loading...'} />
      <ActionSheet ref={actionSheetRef}>
        <View className=" rounded-lg  px-4 py-2  ">
          <Text className="  text-center font-pBold text-lg">Select your Recipe.</Text>
          {/* <View> */}
          {recipeOptions?.map((item, index) => {
            // console.log("Item from recipeOption :",item.desc);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => generateCompleteRecipe(item)}
                activeOpacity={0.8}
                className=" mt-2  rounded-xl border   bg-green-500 p-2 ">
                <Text className="   font-pBold">{item?.recipeName}</Text>
                <Text className="  font-pRegular">{item?.desc}</Text>
              </TouchableOpacity>
            );
          })}
          {/* </View> */}
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default Home;
