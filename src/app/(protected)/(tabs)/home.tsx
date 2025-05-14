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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons/';
// import { categoryData, exploreData } from '~/data/data';
import { categoryData, exploreData } from '~/data/data';
import image from '~/constants/images';
import { useState, useRef, useEffect } from 'react';
// import { prompts } from '~/constants/prompt';
import { prompts } from '~/constants/prompt';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import images from '~/constants/images';
import { generateAiImage, Model } from '~/ai/ai';
import Loading from '~/components/loading-dialogue';
// you can even create whole screen using flatlist cause it provides props like:
// Header, footer component , empty componnet
// import { addRecipe, getLatestRecipes } from '~/appwrite/appwrite';
import { addRecipe, getLatestRecipes } from '~/appwrite/appwrite';
import { jsonrepair } from 'jsonrepair';
import { Redirect, router } from 'expo-router';
import { useAuthContext } from '~/contexts/auth-provider';
import { account } from '~/appwrite/appwrite';
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
  // async function name() {
  //   const use =  await account.get()
  //   console.log("User : ",use);
  // }

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
      // const cleaned =  AiResult.replace(/```json|```/g, '').trim();
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
    <SafeAreaView className="flex-1 bg-blue-300 px-4 ">
      {/* So , in this we have three sections:
1. Name and pfp(don't care about veg option)
2. userInput fiedl 
3. Category 
4. Latest Recipies
*/}

      {/* For creating category*/}
      <FlatList
        data={categoryData}
        showsVerticalScrollIndicator={false}
        numColumns={4}
        ListHeaderComponent={
          // Firstly need a container
          <View className="mb-6">
            <View className=" mb-3 bg-orange-500">
              {/* name-pfp: profile image and name */}
              <View className=" mb-6 mt-3 flex-row items-center gap-2 ">
                {/* If you export default images from files then for some reason you don't need require why know the reason  */}
                <Image source={image.star} className="mb-3 h-14 w-14 rounded-full" />
                {/* <Image source={icons.logout} resizeMode="contain" className="  h-6 w-6" /> */}

                <Text className="font-poppinsRegular text-3xl font-bold">Tausif</Text>
              </View>
            </View>
            <View className="  w-full rounded-2xl  bg-green-300 p-6">
              <Text className=" font-poppinsBold mb-3 text-center   text-xl">
                {' '}
                Let's start cooking
              </Text>
              <TextInput
                className=" mb-6    rounded-2xl bg-white  text-black"
                style={{ height: Math.max(100, inputHeight) }}
                multiline={true}
                numberOfLines={4}
                placeholder="What do you want to create? Add ingredients etc."
                textAlignVertical="top"
                // this for increasing size of input
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
                className=" flex-row items-center justify-center gap-1  rounded-xl bg-green-500 p-3">
                {!loading ? (
                  <View className="  flex-row">
                    <Entypo name="star" size={28} color="yellow" />
                    <Text className="   font-poppinsSemiBold  text-lg text-white ">
                      Generate Recipe
                    </Text>
                  </View>
                ) : (
                  <ActivityIndicator size={'large'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          // this is container
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/category',
                params: item,
              })
            }
            activeOpacity={0.7}
            className="  flex-row bg-orange-500 ">
            {/* For item */}
            <View className="mr-20 justify-center text-center">
              <Image
                source={item.img}
                resizeMode="cover"
                className="  h-14 w-14 overflow-hidden rounded-full    "
              />
              <Text className=" font-poppinsSemiBold   text-center ">{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        // So we have to add something in footer of section
        ListFooterComponent={
          <View className=" mt-6">
           <LatestRecipes data = {latestRecipes} />
          </View>
        }
      />

      <Loading visible={openLoading} text={'Loading...'} />
      <ActionSheet ref={actionSheetRef}>
        <View className=" rounded-lg  px-4 py-2  ">
          <Text className=" font-poppinsBold text-center text-lg">Select your Recipe.</Text>
          {/* <View> */}
          {recipeOptions?.map((item, index) => {
            // console.log("Item from recipeOption :",item.desc);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => generateCompleteRecipe(item)}
                activeOpacity={0.8}
                className=" mt-2  rounded-xl border   bg-green-500 p-2 ">
                <Text className="  font-poppinsBold">{item?.recipeName}</Text>
                <Text className=" font-poppinsRegular">{item?.desc}</Text>
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
