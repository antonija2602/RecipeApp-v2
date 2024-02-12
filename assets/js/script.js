// DOM Elements
const searchInputEl = document.getElementById("search-input")
const mealsContentContainer = document.getElementById("meals-content")

// APP Initialization
randomMeals()

// || --------------------------------------------- ||
// || ----------------- SEARCH -------------------- ||
// || --------------------------------------------- ||
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

    const recipeButton = mealCard.querySelector(".recipe__button")
    recipeButton.addEventListener("click", () => {
        console.log("recipe__button")
    })

    // // Add event listener for Toggle Favorites Button
    const toggleFavoritesButton = mealCard.querySelector(".toggle__favorites_btn i")
    toggleFavoritesButton.addEventListener("click", () => {
        const isActivated = toggleFavoritesButton.classList.contains("activated")

        if (isActivated) {
            // removeMealLocalStorage(mealData.idMeal)
            toggleFavoritesButton.classList.remove("activated")
        } else {
            // addMealLocalStorage(mealData.idMeal)
            toggleFavoritesButton.classList.add("activated")
        }

        // fetchFavMeals()
    })

    // Append meal to meals content
    mealsContentContainer.appendChild(mealCard)
}

// || --------------------------------------------- ||
// || --------------- RANDOM MEAL ----------------- ||
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

    const meal = await getRandomMealJson() //searchValue goes to term in getMealsJson(term)

    createMealCard(meal)
}
