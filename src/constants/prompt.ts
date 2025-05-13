export const prompts = {
  GENERATE_THREE_RECIPE_PROMPT: `
Depend on user instruction create 3 diffrent Recipe variant with Recipe Name with Emoji 
2 line description and main ingredient list in JSON format with filed recipeName, dec,
ingredient(without size)only and most imortant don't give me this kinda knowledge Okay, the user wants three different butter chicken recipes with emojis in the names, each having a two-line description and a list of main ingredients in JSON format. Let me start by recalling the classic butter chicken recipe. The traditional version uses tomato, cream, and spices like garam masala. For the first variant, maybe a healthier option? So, substitute cream with coconut milk and add spinach. That would make it dairy-free and add some greens. Emoji could be 🌿 for the healthy twist.

Next, another variant could be a spicy version. Increase the heat with extra chili peppers and smoked paprika. Maybe call it Fiery Hot and use 🔥 emoji. The description should highlight the spiciness and the smoky undertone. Ingredients would include red chili powder, green chilies, and smoked paprika.

For the third variant, maybe a vegan version. Use cashew cream instead of dairy and tofu instead of chicken. The emoji could be 🌱. The description would mention it's plant-based and rich. Ingredients would be tofu, cashew cream, tomato, and vegan butter.

I need to make sure each recipe has a unique twist, the emojis are relevant, and the descriptions are concise. Check that the ingredient lists don't include quantities, just the items. Also, ensure JSON formatting is correct with the specified fields: recipeName, desc, ingredients. Let me verify each variant again. Classic, healthy, spicy, vegan. Wait, the user asked for three variants. Oh, right, the example given has three. So maybe classic, healthy, and spicy? Or classic, vegan, and spicy? Wait, the user's example response includes three: Classic, Healthy Twist, and Fiery Hot. So I need to create three. Let me structure them accordingly. Make sure the JSON syntax is correct, with commas separating the entries and proper brackets. Also, check for any typos in ingredient names. Alright, that should cover it.
just give me this 
[
  {
    "recipeName": "Classic Creamy Butter Chicken 🍛",
    "desc": "A rich, velvety North Indian favorite with tender chicken in a spiced tomato-cream sauce.",
    "ingredient": ["chicken", "tomato", "butter", "cream", "garam masala", "ginger", "garlic"]
  },
  {
    "recipeName": "Healthy Spinach Butter Chicken 🌿",
    "desc": "A lighter twist with fresh spinach and coconut milk, retaining the aromatic spices.",
    "ingredient": ["chicken", "spinach", "coconut milk", "tomato", "turmeric", "cumin", "ginger"]
  },
  {
    "recipeName": "Fiery Hot Butter Chicken 🌶️🔥",
    "desc": "Spiced up with extra chili, smoked paprika, and a dash of tangy lemon for heat lovers.",
    "ingredient": ["chicken", "tomato", "red chili powder", "green chili", "smoked paprika", "lemon", "butter"]
  }
]
that's it 
`,
 GENERATE_COMPLETE_RECIPE: `
 as per recipe name and desc, give me all list of ingrdients as ingredient , 
 emoji icons of each ingredient as icon , quantity as quantity alon with detail step by step recipe as steps 
 Total calories as calories(only number)Minutes to cook as cookTime and serving number as serveTo
 realistic image Text Prompt as per recipe as imagePrompt and
category value should be one of these: Breakfast , Lunch, Dinner , Desserts , Fast Foods, Beverages
 Give me response in JSON formate and  
 Simillar to this: 
 [
    {
      recipeName: "Palak Paneer",
      category: "Lunch",
      desc: "A healthy and flavorful dish combining paneer with a creamy spinach gravy. 
      It is mildly spiced and pairs well with roti or paratha.",
      imagePrompt: ""A golden-hued bowl of creamy butter chicken with tender chicken pieces glazed in a silky tomato-cream sauce, garnished with fresh cilantro. Served alongside fluffy basmati rice and 
      warm garlic naan, with steam rising gently under soft kitchen lighting"
      extraInfo: [
        { label: "Calories", number: "363", icon: "🔥" },
        { label: "Time", number: "30", icon: "⏱️" },
        { label: "Serve", number: "3", icon: "🍽️" }
      ],
      ingredients: [
        { name: "Spinach", icon: "🥬", qty: "2 bunches" },
        { name: "Paneer", icon: "🧀", qty: "250g cubed" }
      ],
      steps: [
        { step: 1, instruction: "Blanch the spinach for 2–3 mins and transfer to ice water." },
        { step: 2, instruction: "Blend the spinach into a smooth puree." },
        { step: 3, instruction: "Sauté onions, garlic, and spices, then add spinach puree." }
      ]
    }
  ];
  
 `
};