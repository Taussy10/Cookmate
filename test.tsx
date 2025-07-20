 {/* For title and bookmark */}
      <View className=" mb-3 flex-row items-center justify-between">
        <Text className="  font-pSemibold  text-xl">
          {currentRecipe?.recipeName?.slice(0, 20)}..
        </Text>
        {/* <Text>{currentRecipe?.recipeName}</Text> */}
        {!bookmark ? (
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
        )}
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
              console.log('ITEMSS :', item);

              return (
                // container

                <View key={id} className="  flex-row items-center justify-between">
                  {/* Container for icon and  */}
                  <View className=" flex-row items-center gap-2">
                    <Text>{item?.icon}</Text>
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
        <Text className="mb-3 font-pBold text-lg">Recipe Steps</Text>

        {/* Container for steps card */}
        <View className="   gap-3">
          {currentRecipe?.steps?.map((item, index) => {
            return (
              <View
                key={index}
                className=" flex-row    items-center gap-2 rounded-xl border bg-orange-300 p-4">
                <View className=" h-10 w-10 flex-col items-center justify-start rounded-xl bg-green-400">
                  <Text className=" text-center font-pSemibold  text-2xl">{item.step}</Text>
                </View>

                <Text
                  // Why flex-1 ? for filling avaible space
                  className=" flex-1   font-pRegular">
                  {item.instruction}
                </Text>
              </View>
            );
          })}
        </View>
      </View>