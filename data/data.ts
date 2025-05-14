// import {router} from "expo-router"
// you can't use expo router here caue it's out of the app directory 

export const allImages = [
  require('images/1.jpg'),
  require('images/2.jpg'),
  require('images/3.jpg'),
   require('images/4.jpg'),
   require('images/5.jpg'),
   require('images/6.jpg'),
]


export const exploreData = [
  {
    id: 1,
    name: 'Punjabi Chole',
    img: require('images/1.jpg'),
  },
  {
    id: 2,
    name: 'Spicy Rice water chicken',
    img: require('images/2.jpg'),
  },
  {
    id: 3,
    name: 'Classic Chicken Biryani',
    img: require('images/3.jpg'),
  },
  {
    id: 4,
    name: 'Watermelon Ice Cream',
    img: require('images/4.jpg'),
  }];

export const categoryData = [
  {
    id: 1,
    name: 'Breakfast',
    img: require('images/1.jpg'),
  
  },
  {
    id: 2,
    name: 'Lunch',
    img: require('images/2.jpg'),
  },
  {
    id: 3,
    name: 'Dinner',
    img: require('images/3.jpg'),
  },
  {
    id: 4,
    name: 'Salad',
    img: require('images/4.jpg'),
  },
  {
    id: 5,
    name: 'Dessert',
    img: require('images/5.jpg'),
  },
  {
    id: 6,
    name: 'Fast Food',
    img: require('images/6.jpg'),
  },
  {
    id: 7,
    name: 'Beverages',
    img: require('images/4.jpg'),
  },
];

export const profileOptions = [
  {
    id: 1,
    title: 'Create New recepie',
    icon: require('images/i1.png'),
    press: "/home"
  },

  {
    id: 2,
    title: 'My Recipes',
    icon: require('images/i2.png'),
    press: '/cookbook',
  },
  {
    id: 3,
    title: 'Browse More Recipes',
    icon: require('images/i3.png'),
    press: "/explore"
  }
];
