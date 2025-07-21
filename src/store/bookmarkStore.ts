
// Create method is for creating a centralized place aka store to manage 
// and share state across your React application.

// what does centralized place means?
//  A centralized place (like a Zustand store) is one file or 
// one hook that holds: Your data (e.g. cart items)
// Your functions to change that data (e.g. addToCart, removeFromCart)


// More example: 
// A user profile shown in the sidebar and also used in a settings page.
// methods of dark mode toggle that affects the entire app.

// I think we can do it by useState then why this ? cause in
//  useState doesn't persist on re-rendering and if you want 
// same method data again then we need to pass props and again
//  so create a central place write methods here and use it
//  everywhere in your code 

// it's jut like useContext hook but more powerful

// the useBookmarkStore function is a store.
import {create} from "zustand"
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addBookmark, removeBookmark,getBookmarkedRecipe } from "~/appwrite/appwrite";
// import { addBookmarkToDB, removeBookmarkFromDB, fetchBookmarksFromDB } from '../api/bookmark';
// import { useAuthContext } from '~/contexts/auth-provider';

// const { user} = useAuthContext()

type BookmarkStore = {
    // We are gonna store bookmark in an array
  bookmarks: string[];
  add: (recipeId: string,email: string) => void;
  remove: (recipeId: string) => void;
  load: () => Promise<void>;
}

   // persist is a middleware lets you persist a store's state
    //  across page reloads or application restarts.

// persist? You know what persistence means, right? 
// It means keeping something alive(dream to achive something)
//  — Zustand persist makes sure your 
// state(added data in cart) survives page reloads,
//  re-renders, and app restarts by storing it 
// in localStorage or AsyncStorage.

// Middleware? Think of it as a bridge that connects Zustand's state logic 
// with external systems — like devtools, logging, or persistent storage. 
// It helps in communication and sharing data more efficiently, 
// without messing up your main code.


// Creating a zustand store to track bookmarked recipe Ids, save 
// them persistently using asynstorage and then sync to backend(Appwrite)

// useBookmark is the custom hook created for using Zustand
//  to access the store you defined.

// the what's a store ? a value returned by create method:
// and can i see how does it look.

//store is made by two things: 1. state(array) + actions(functions/methods)
export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    // used the set get method
    // then returned an array that contains keys: bookmarks as an array
    // add as an method etc 

    // set: for updating the store 
    // get: for reading the current Value of store: read the current value of bookmark
    (set, get) => ({
         // it's a state: that stores data
        //This is an array where we 
        // stores recipeId by add method
      bookmarks: [],
    //   this is a action(function)
    // add key contains an anon function that has params: id(recipeId) & email
    // by set method read the current bookmarks adds new value id then
    //  push them in bookmarks array 
      add: (id:string, email:string) => {
        set({ bookmarks: [...get().bookmarks, id] });
        // then push to the appwrite:
        // you can add real values when you call add method in [id](detail screen)
        addBookmark(id,email);
      },
    //remove key takes an anon function having id(recipedId) as param
      remove: (id) => {
        // the push inside bookmark array: what does it push ?
        // get all the bookmark then whichever is not equal to id 
        // it stores that 
        set({ bookmarks: get().bookmarks.filter(r => r !== id) });
        removeBookmark(id);
      },

      // now you have to add ids in the bookmark
      
      load: async () => {
        const ids = await getBookmarkedRecipe(user?.email);
        set({ bookmarks: ids });
      }
    }),
    {
      name: 'bookmarks-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ bookmarks: state.bookmarks })
    }
  )
);