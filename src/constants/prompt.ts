export const prompts = {
  // Why did we use bactick instead of quotes ? 
  // cause quotes doesn't support multiline strings 

  GENERATE_THREE_RECIPE_PROMPT: `
Depend on user instruction create 3 diffrent Recipe variant with Recipe two word Name then 
2 line description and main ingredient list in JSON format with field recipeName, dec,
ingredient(without size) that's it 

Your response should be like this  
[
  {
    "recipeName": "Butter Chicken",
    "desc": "A rich, velvety North Indian favorite with tender chicken in a spiced tomato-cream sauce.",
    "ingredient": ["chicken", "tomato", "butter", "cream", "garam masala", "ginger", "garlic"]
  },
  {
    "recipeName": "Spinach Chicken",
    "desc": "A lighter twist with fresh spinach and coconut milk, retaining the aromatic spices.",
    "ingredient": ["chicken", "spinach", "coconut milk", "tomato", "turmeric", "cumin", "ginger"]
  },
  {
    "recipeName": "Palak Paneer",
    "desc": "Spiced up with extra chili, smoked paprika, and a dash of tangy lemon for heat lovers.",
    "ingredient": ["spinach", "tomato", "paneer", "Cheese","lemon"]
  }
]

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