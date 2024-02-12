// DOM Elements
const searchInputEl = document.getElementById("search-input")
const mealsContentContainer = document.getElementById("meals-content")

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
    console.clear() // <-------------@@@@@@@@@@@@@

    // const searchValue = searchInputEl.value
    const searchValue = "tomato" // <-------------@@@@@@@@@@@@@
    const meals = await getMealsJson(searchValue) //searchValue goes to term in getMealsJson(term)
    if (meals) {
        meals.forEach((meal) => {
            // console.log(meal) // <-------------@@@@@@@@@@@@@
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
        <div class="card-body d-flex align-items-end justify-content-between py-1 px-0">
                <!-- Recipe Button -->
            <button 
            onclick="showRecipe()"
            type="button" class="modal_button btn btn-success">Recipe</button>
                <!-- Toggle Favorites Button -->
            <button 
           
            class="toggle__favorites_btn btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>`

    // Append meal to meals content
    mealsContentContainer.appendChild(mealCard)
}

// || --------------------------------------------- ||
// || --------------- FILL RECIPE ----------------- ||
// || --------------------------------------------- ||
