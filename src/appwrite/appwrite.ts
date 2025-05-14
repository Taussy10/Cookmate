import {
  Client,
  Account,
  Databases,
  ID,
  OAuthProvider,
  Query,
  Models,
} from 'react-native-appwrite';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Modal } from 'react-native';
import * as Linking from 'expo-linking';

// Use for handling browser-based authentication.
// basically it will open google's consent-screen(A screen where you can select gmail account for login)
//  by which you can auth
const client = new Client();
export const account = new Account(client);
const database = new Databases(client);

export const config = {
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  recipeCollectionId: process.env.EXPO_PUBLIC_APPWRITE_RECIPE_COLLECTION_ID,
  extraInfoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_EXTRA_INFO_COLLECTION_ID,
  ingredientsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_INGREDIENTS_COLLECTION_ID,
  stepsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_STEPS_COLLECTION_ID,
  bookmarkCollectionId: process.env.EXPO_PUBLIC_APPWRITE_BOOKMARK_COLLECTION_ID,
};

// that ! is for saying to typescrip that these exists
client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!);

// export const createUser = async () => {
//   try {
//     // Firstly create a deep link that works in all Expo enviroments(Basically web , IOS and ,andorid and others)
//     // what is deepLink ? Redirect to other screen/page within the app same as navigations in web
//     // for example: "https://example.com/home" to "https://example.com/home/user"
//     // Btw one diff from web is they can move one to screen to another regardless of path

//     // They are use for two things
//     // 1. For moving within the app
//     // 2. For moving outside app(can open and can open another just by it's scheme)

//     // Ensure localhost is used for the hostname to validation error for success/failure URLs

//     // Firstly get the URI of your project

//     const deepLink = new URL(
//       makeRedirectUri({
//         scheme: 'cookmate',
//         preferLocalhost: true,
//       })
//     );
//     // This will return:  // "exp://localhost:8081" in string

//     // If there are no deepLink then put it as localhost
//     if (!deepLink.hostname) {
//       deepLink.hostname = 'localhost';
//     }
//     // This deepLink.protocol will return schem of it: which is expo:
//     //  so for making it a scheme add // using temeplate literals

//     const scheme = `${deepLink.protocol}//`;

//     // so, for now we created the scheme of it will return: expo://
//     // one thing is that this is for expo for expo build it will diffrent(will app's own scheme)
//     // https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions

//     // start OAuth flow
//     const loginUrl = await account.createOAuth2Token(
//       OAuthProvider.Google,
//       // Success URL:
//       `${deepLink}`,
//       // failure URL
//       `${deepLink}`
//     );

//     // two things will generate: userId and secret key
//     // and that will append in SucceURl
//     console.log('LoginURL :', loginUrl);

//     // Open loginUrl and listen for the scheme redirect
//     // Will return show resutl whether it succed or not :
//     const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);
//     console.log('Result from createUser fun in appwrite.ts :', result);
//     if (result.type !== 'success') throw new Error('Failed to login browser');

//     // Extract credentials from OAuth redirect URL
//     const url = new URL(result.url);
//     console.log('will create result URI :', url);

//     const secret = url.searchParams.get('secret');
//     console.log('will create secret :', secret);
//     const userId = url.searchParams.get('userId');
//     console.log('will create userId :', userId);

//     //Then will create the sesion Create session with OAuth credentials
//     // takes tow thing secret key and userID
//     // userId
//     const session = await account.createSession(userId, secret);
//     // why returned cause we are gonna use if else statemnt for
//     // redirect to home screen so we need something if expression that's why returned it
//     // Redirect as needed
//   } catch (error) {
//     console.log('Error from createuser fun in appwrite.ts:', error);
//     throw new Error('Getting errros while authorizing');
//   }
// };

export const createUser = async () => {
  try {
    // What if everything happens correct ? Go to this URI
    // poining to onboarding screen
    const redirectUri = Linking.createURL('/');
    // Ask OAut token from appwrite using google Provider
    const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

    // If not get Token
    if (!response) throw new Error('Failed to Login');

    // If got token then open a browser for auth asynchronously
    const browserResult = await WebBrowser.openAuthSessionAsync(
      // pass resonse as string
      response.toString(),
      // Also redirectURI
      redirectUri
    );
    // If not browser not able to login then throw error
    if (browserResult.type !== 'success') throw new Error("Browser didn't open");

    // If not browser able to login
    // create a url of it
    const url = new URL(browserResult.url);

    // then extraact secret and  from browserURL
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    // if no secret or userId exist then throw a error
    if (!secret || !userId) throw new Error("Didn't get any secret");

    // if got secret or userId
    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Didn't able to create sessions");

    return session;
  } catch (error) {
    console.log('Error from login in appwrite.ts :', error);
    throw new Error('Error while trying to login ');
  }
};

export const logout = async () => {
  try {
    // only current jo bhi iss id address par hai uska
    await account.deleteSession('current');
  } catch (error) {
    console.log('Error from login in appwrite.ts :', error);
    throw new Error('Error while trying to login ');
  }
};

export const getCurrentUser = async () => {
  try {
    const result = await account.get();
    console.log('Result from getCurrentUser fun in appwrite.ts :', result);
    // if you want to photos of user then you can check in 59 mins
    // if(result.$id){

    // }
    return result;
  } catch (error) {
    // using here log cause I don't want on 
    // user-end get a model for showing error information 
    console.log('Error from getCurrentUser fun in appwrite.ts ', error);
    // that means we didn't get anything
    return null;
  }
};


export const addRecipe = async (parsedRecipe: any, aiImage: string, email: string) => {
  console.log('AIImage from appwrite :', aiImage);
  console.log(
    'ingredients from appwrite :',
    parsedRecipe[0]?.ingredients?.map((item: any) => ({
      item,
    }))
  );

  console.log(
    'extraInfo from appwrite :',
    parsedRecipe[0]?.extraInfo?.map((item: any) => ({
      item,
    }))
  );

  // export const addRecipe = async (parsedRecipe: any, aiImage:string) => {
  try {
    const recipe = parsedRecipe[0]; // assuming 1 recipe at a time
    const recipeDoc = await database.createDocument(
      config.databaseId!,
      config.recipeCollectionId!,
      ID.unique(),
      {
        recipeName: recipe.recipeName,
        description: recipe.desc,
        imagePrompt: recipe.imagePrompt,
        aiImage: aiImage,
        category: recipe.category,
        email: email,

        extraInfo: recipe.extraInfo.map((item: any) => ({
          icon: item.icon,
          label: item.label,
          // sending just number if any problem(not major problems) then it will convert in number
          value: parseInt(item.number),
        })),

        ingredients: recipe.ingredients.map((item: any) => ({
          icon: item.icon,
          name: item.name,
          qty: item.qty,
        })),

        steps: recipe.steps.map((item: any) => ({
          instruction: item.instruction,
          step: item.step,
        })),
      }
    );

    console.log('✅ Recipe created:', recipeDoc);
  } catch (error) {
    console.log('❌  error from storeRecipe function:', error);
    throw new Error('Error while creating documents');
  }
};

export const getAllRecipes = async () => {
  try {
    const promise = await database.listDocuments(
      config.databaseId!, 
      config.recipeCollectionId!,
    [
      // Later increase it but may be not more than 50
      // or add a infinite scrolling the more you scroll the more you get 
      Query.limit(10)
    ]);
    return promise.documents;
  } catch (error) {
    console.log('from getAllRecipes fun in appwrite.ts :', error);
  }
};

export const getUserRecipe = async (email: string) => {
  try {
    const promise = await database.listDocuments(config.databaseId!, config.recipeCollectionId!, [
      Query.equal('email', email),
    ]);

    return promise.documents;
  } catch (error) {
    console.log('from getAllRecipes fun in appwrite.ts :', error);
  }
};

export const getsCategoryBasedRecipe = async (category: string) => {
  try {
    const promise = await database.listDocuments(config.databaseId!, config.recipeCollectionId!, [
      Query.equal('category', category),
    ]);

    return promise.documents;
  } catch (error) {
    console.log('from getAllRecipes fun in appwrite.ts :', error);
  }
};

export const addBookmark = async (id: string, email: string) => {
  // export const addBookmark = async () => {
  try {
    const promise = await database.createDocument(
      config.databaseId!,
      config.bookmarkCollectionId!,
      ID.unique(),
      {
        // email: 't41ausssif02@gmail.com',
        email: email,
        recipeId: id,
        // recipeId: "68034a0e001fd0ec0deb",
      }
    );

    console.log('Added bookmark :', promise);
  } catch (error) {
    console.log('from addBookmark fun in appwrite.ts :', error);
  }
};

export const getBookmarkRecipe = async (email: string) => {
  try {
    const response = await database.listDocuments(
      config.databaseId!,
      config.bookmarkCollectionId!,
      [
        // Query.equal('email', 'tausif01092@gmail.com')
        Query.equal('email', email),
      ]
    );

    // Ab sirf recipeId nikaal lo:
    const recipeIds = response.documents.map((doc) => doc.recipeId);
    console.log('Response :', response);

    console.log('RecipeIds :', recipeIds);

    const promise = await database.listDocuments(config.databaseId!, config.recipeCollectionId!, [
      // Return recipeID
      Query.equal('$id', recipeIds),
    ]);

    return promise.documents;
  } catch (error) {
    console.log('from getBookmarkRecipe fun in appwrite.ts :', error);
  }
};

export const getLatestRecipes = async () => {
  try {
    const response = await database.listDocuments(config.databaseId!, config.recipeCollectionId!, [
      // As a param accept attribute name ? how to know which params pass ? find in return
      // response.documents cause many params are not listed in collections for example @createdAt
      // Descending means 5,4,3,2,1 so it will show latest(5) created data first
      // if you use orderDesc which means 1,3,2, so it will show oldes data according to
      Query.orderDesc('$createdAt'),
      Query.limit(4),
    ]);
    return response.documents;
  } catch (error) {
    console.log('from getBookmarkRecipe fun in appwrite.ts :', error);
  }
};
