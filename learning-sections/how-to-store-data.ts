// Let's take that detail section to learn how to stor data 

// firstly, if you want to store any data wrap it in array, why ? cause 
// you can use array methods to get each data basically for arrangin data in order 
// and that's provided by array using index and by that you can use loop on each index
// and fetch them aslo put them in object cause they are you will get single variables

// Step-1: [{ }] 

// look for single data: recipe name , desc, Image Prompt(by image prompt we are gonna generate image)
//  step-2: [{recipeName: "Palak Paneer", desc: "A healthy flavorful dish,
//  combining paneer with a creamy spinach gravy. It's mildly spiced and 
// pairs well with roti or paratha", "imagePrompt: "A golden-hued bowl of creamy butter chicken with
//  tender chicken pieces glazed in a silky tomato-cream sauce, garnished with fresh cilantro. Served alongside fluffy basmati rice and 
 // warm garlic naan, with steam rising gently under soft kitchen lighting"}]


// step3: 
// look for similar kinda of data basically 
// a data that can be grouped basically itself a data:  
// why added in array cause those are key vlaue pairs

// that calories, time , serve simillar are grouped data so:  
// [{label: Calories, number:"363", icon:"whatever"},
// {label: Time, number:"30", icon:"whatever",},
// {label: Serve, number:"3", icon:"whatever",} ] 


// that ingredients are can also grouped 
// [{name:"Spinch",icon: "whatever", qty:"2 bunches"},
// {name:"Paneer",icon: "whatever", qty:"2 kg "} ]

// These steps can also be grouped 
// [{stepNum:1,des: "Boil the eggs"},
// {stepNum:2,desc: "Fry the egss"} ]

// now add them all: 

[
    {
      recipeName: "Palak Paneer",
      desc: `A healthy and flavorful dish combining paneer with a creamy spinach gravy. 
      It's mildly spiced and pairs well with roti or paratha.`,
      imagePrompt: `A golden-hued bowl of creamy butter chicken with tender
       chicken pieces glazed in a silky tomato-cream sauce, garnished with fresh cilantro. Served alongside fluffy basmati rice and 
      warm garlic naan, with steam rising gently under soft kitchen lighting`,
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
        { stepNum: 1, desc: "Blanch the spinach for 2–3 mins and transfer to ice water." },
        { stepNum: 2, desc: "Blend the spinach into a smooth puree." },
        { stepNum: 3, desc: "Sauté onions, garlic, and spices, then add spinach puree." }
      ]
    }
  ];
  