// DOM Elements
const searchInputEl = document.getElementById("search-input")
const mealsContentContainer = document.getElementById("meals-content")
const recipeContainer = document.getElementById("recipe-container")

// APP Initialization
randomMeals()

// || -------------------------------------------- ||
// || ------------------ SEARCH ------------------ ||
// || -------------------------------------------- ||
// getting data from api by term
async function getMealsJson(term) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        const responseData = await response.json()
        return responseData.meals
    } catch (error) {
        console.error("Error fetching meals by search term:", error)
    }
}

// takes value from input, get array of meals from getMealsJson(term) by value from input and stores it in meals, get every meal from meals
async function searchMeals() {
    //clean container
    mealsContentContainer.innerHTML = ""
    hideRecipe()

    const searchValue = searchInputEl.value
    const meals = await getMealsJson(searchValue) //searchValue goes to term in getMealsJson(term)
    if (meals) {
        meals.forEach((meal) => {
            createMealCard(meal)
        })
    }
}

// submit search on enter
searchInputEl.onkeyup = (e) => {
    if (e.key === "Enter") {
        searchMeals()
    }
}

function createMealCard(mealData) {
    const mealCard = document.createElement("div")
    mealCard.classList.add("card", "p-1", "border-0", "meal-header", "meal__card", "shadow")

    // Set meal HTML content
    mealCard.innerHTML = `
                <!-- Meal Image -->
        <img class="card-img-top object-fit-cover rounded position-relative" src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        
                <!-- Meal Title -->
        <div>
            <h5 class="card-title text-wrap flex-grow-1 pt-2 small">${mealData.strMeal}</h5>
        </div>
        
                <!-- Meal Actions -->
        <div class="card-body d-flex align-items-end justify-content-between align-items-center py-1 px-0">
                <!-- Recipe Button -->
            <button             
            type="button" class="recipe__button btn btn-success">Recipe</button>
                
            <!-- Toggle Favorites Button -->
            <button   
                
              
            class="toggle__favorites_btn btn fs-3  ">
                <i class="fas fa-heart"></i>
            </button>
        </div>`

    // Add event listener for Recipe Button
    const recipeButton = mealCard.querySelector(".recipe__button")
    recipeButton.addEventListener("click", () => {
        showRecipe()
    })

    // Add event listener for Toggle Favorites Button
    const toggleFavoritesButton = mealCard.querySelector(".toggle__favorites_btn i")
    toggleFavoritesButton.addEventListener("click", () => {
        const isActivated = toggleFavoritesButton.classList.contains("addedToFavorites")

        if (isActivated) {
            // removeMealLocalStorage(mealData.idMeal)
            toggleFavoritesButton.classList.remove("addedToFavorites")
        } else {
            // addMealLocalStorage(mealData.idMeal)
            toggleFavoritesButton.classList.add("addedToFavorites")
        }

        // fetchFavMeals()
    })

    // Append mealcard with meal to meals content container
    mealsContentContainer.appendChild(mealCard)
}

// || --------------------------------------------- ||
// || ---------------- RANDOM MEAL ---------------- ||
// || --------------------------------------------- ||
async function getRandomMealJson() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        const responseData = await response.json()
        const randomMeal = responseData.meals[0]
        return randomMeal
    } catch (error) {
        console.error("Error fetching random meal:", error)
    }
}

async function randomMeals() {
    //clean container
    mealsContentContainer.innerHTML = ""

    const meal = await getRandomMealJson()

    createMealCard(meal)
    updateRecipeContainer(meal)
    showRecipe()
}

// || ---------------------------------------------- ||
// || ------------------- RECIPE ------------------- ||
// || ---------------------------------------------- ||

// function toggleRecipe() {
//     recipeContainer.classList.toggle("hidden")
// }

function hideRecipe() {
    recipeContainer.classList.add("hidden")
}

function showRecipe() {
    recipeContainer.classList.remove("hidden")
}

function updateRecipeContainer(mealData) {
    // meal title into HTML
    const mealTitle = document.getElementById("meal-title")
    mealTitle.innerHTML = mealData.strMeal

    // meal thumbnail src and alt into HTML
    const mealThumb = document.getElementById("meal-thumb")
    mealThumb.src = mealData.strMealThumb
    mealThumb.alt = mealData.strMeal

    // meal instructions into HTML
    const mealInstructions = document.getElementById("meal-instructions")
    mealInstructions.innerText = mealData.strInstructions

    //get ingredients and measures
    const ingredients = []

    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(`${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]} `)
        } else {
            break
        }
    }

    ingredients.forEach((ingredient) => {
        const ingredientsList = document.getElementById("ingredients-list")

        let liElement = document.createElement("li")
        liElement.classList.add("p-0")
        ingredientsList.append(liElement)
        liElement.innerText = ingredient
    })

    // meal web into HTML
    const mealLink = document.getElementById("meal-source")
    mealLink.href = mealData.strSource
    mealLink.innerText = mealData.strSource

    // meal YT video into HTML
    const mealVideo = document.getElementById("meal-video")
    mealVideo.href = mealData.strYoutube
}
