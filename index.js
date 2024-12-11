const buttonIngredient = document.querySelector(".ingredient")
const buttonAppareils = document.querySelector(".appareils")
const buttonUstensiles = document.querySelector(".ustensiles")
const firstFilter = document.querySelector(".firstFilter")
const secondFilter = document.querySelector(".secondFilter")
const thirdFilter = document.querySelector(".thirdFilter")
const firstNameFilter = document.querySelector(".first")
const secondNameFilter = document.querySelector(".second")
const thirdNameFilter = document.querySelector(".third")
const sectionData = document.querySelector(".contentDataSection");
const card = document.querySelector(".card");
const buttonInput = document.querySelector(".divInput");
const buttonInputIngredient = document.querySelector(".flexInput");
const inputResult = document.querySelector(".input");
const inputIngredients = document.getElementById('ingredients');
const inputUstensiles = document.getElementById('ustentiles');
const inputAppareils = document.getElementById('appareils');
const formIngredients = document.getElementById('formIngredients');
const formUstensiles = document.getElementById('formUstensiles');
const formAppareils = document.getElementById('formAppareils');
const recupContentIngred = document.getElementById("recupContentIngredients");
const recupContentAppareils = document.getElementById("recupContentAppareils");
const recupContentUstensils = document.getElementById("recupContentUstensiles");
const filterResult = document.querySelector(".filterResult");
const closeFilter = document.querySelector(".closeFilter");


buttonIngredient.addEventListener('click', () => {
    buttonIngredient.style.display = "none"
      firstFilter.style.display = "Block"
    //   displayNineData();
  });

  firstNameFilter.addEventListener('click', () => {
    firstFilter.style.display = "none"
      buttonIngredient.style.display = "flex"
    //   sectionData.innerHTML = ""
    //   htmlContent = ""
  });

  buttonAppareils.addEventListener('click', () => {
    buttonAppareils.style.display = "none"
      secondFilter.style.display = "Block"
  });

  secondNameFilter.addEventListener('click', () => {
    secondFilter.style.display = "none"
      buttonAppareils.style.display = "flex"
  });

  buttonUstensiles.addEventListener('click', () => {
    buttonUstensiles.style.display = "none"
      thirdFilter.style.display = "Block"
  });

  thirdNameFilter.addEventListener('click', () => {
    thirdFilter.style.display = "none"
      buttonUstensiles.style.display = "flex"
  });

  filterResult.addEventListener('click', (event) => {
    if (event.target.classList.contains('closeFilter')) {
      event.target.parentElement.remove();
    }
  });

 
 const cards = (filter) => {
  filter.forEach(element => {
    const ingredientsList = element.ingredients.map(ingredient => {
        if (ingredient.unit && ingredient.quantity) {
            return `<p><span class="ingredName">${ingredient.ingredient}</span><br> <span class="quantityCard">${ingredient.quantity} ${ingredient.unit}</span></p>`;
        } else if (ingredient.quantity) {
            return `<p><span class="ingredName">${ingredient.ingredient}</span><br> <span class="quantityCard"> ${ingredient.quantity}</span></p>`;
        } else {
            return `<p><span class="ingredName">${ingredient.ingredient}</span></p>`;
        }
    }).join(""); 

  let htmlContent = `
         <div class="card">
            <div class="imageCard">
            <p>${element.time}min</p>
            </div>
            <div class="contentCard">
            <p class="nameCard">${element.name}</p>
            <h2>RECETTE</h2>
            <p class="descriptCard">${element.description}</p>
            <h3>INGRÉDIENTS</h3>
            <div class="ingredCard">
            ${ingredientsList}
            </div>
           </div>
        </div>
    `; sectionData.innerHTML += htmlContent;
});
 }

function filterByIngredientsAndName() {
  let inputValue = inputResult.value.trim().toLowerCase();  // Ici on va transformer le text pour effacer les espace et passé en minuscule
  console.log(inputValue);
  inputResult.value = "";
  sectionData.innerHTML = "";

  const filteredRecipes = recipes.filter(recipe => {    // on va filtrer notre tableau pour recuperer les valeurs 
    const nameMatch = recipe.name.toLowerCase().includes(inputValue);  // Ici on va verifié que le nom de la recette en minuscule contient le resultat de la recherche
    const ingredientsMatch = recipe.ingredients.some(ingredient =>  // Ici on va verifié que les ingreds de la recette en minuscule contiennent le resultat de la recherche
      ingredient.ingredient.toLowerCase().includes(inputValue)
    );
    return nameMatch || ingredientsMatch;
  });
  // Vérifier si des résultats ont été trouvés
  if (filteredRecipes.length === 0) {
    sectionData.innerHTML = `<p>Aucune recette trouvée pour "${inputValue}".</p>`;
    return;
  }

 cards(filteredRecipes)
}

 function filterByIngredients() {
  let inputValue = inputIngredients.value.trim().toLowerCase();  
  console.log(inputValue);

recupContentIngred.innerHTML += `<p class="valueRecup">${inputIngredients.value}</p>`
filterResult.innerHTML +=   `<p class="resultBloc">${inputIngredients.value} <span class="closeFilter"> X </span></p>`


  inputIngredients.value = "";
  sectionData.innerHTML = "";

  
  
  const filteredRecipes = recipes.filter(recipe => {   
    const ingredientsMatch = recipe.ingredients.some(ingredient => 
      ingredient.ingredient.toLowerCase().includes(inputValue)
    );
    return  ingredientsMatch;
  });

  if (filteredRecipes.length === 0) {
    sectionData.innerHTML = `<p>Aucune recette trouvée pour "${inputValue}".</p>`;
    return;
  }
  cards(filteredRecipes)
}

function filterByAppareils() {
  let inputValue = inputAppareils.value.trim().toLowerCase();  
  console.log(inputValue);

  recupContentAppareils.innerHTML += `<p class="valueRecup">${inputAppareils.value}</p>`
  filterResult.innerHTML +=   `<p class="resultBloc">${inputAppareils.value} <span class="closeFilter"> X </span> </p>`
  inputAppareils.value = "";
  sectionData.innerHTML = "";
  
  const filteredRecipes = recipes.filter(recipe => {    
    const appareilsMatch = recipe.appliance.toLowerCase().includes(inputValue)
    
    return  appareilsMatch;
  });

  if (filteredRecipes.length === 0) {
    sectionData.innerHTML = `<p>Aucune recette trouvée pour "${inputValue}".</p>`;
    return;
  }
  cards(filteredRecipes)
}

function filterByUstensils() {
  let inputValue = inputUstensiles.value.trim().toLowerCase();  
  console.log(inputValue);
  recupContentUstensils.innerHTML += `<p class="valueRecup">${inputUstensiles.value}</p>`
  filterResult.innerHTML +=   `<p class="resultBloc">${inputUstensiles.value} <span class="closeFilter"> X </span> </p>`
  inputUstensiles.value = "";
  sectionData.innerHTML = "";

  
  const filteredRecipes = recipes.filter(recipe => {   
    const ustensilesMatch = recipe.ustensils.some(ustensil =>  // Ici on va verifié que les ingreds de la recette en minuscule contiennent le resultat de la recherche
    ustensil.toLowerCase().includes(inputValue)
  );

    return  ustensilesMatch;
  });
  if (filteredRecipes.length === 0) {
    sectionData.innerHTML = `<p>Aucune recette trouvée pour "${inputValue}".</p>`;
    return;
  }
  cards(filteredRecipes)
}

 function initialDisplayData() {
      const arrayNineData = recipes.slice(0, 10); 
      cards(arrayNineData)
  }    
  initialDisplayData();

buttonInput.addEventListener('submit', (event) => {
  event.preventDefault(); 
  filterByIngredientsAndName()
});

formIngredients.addEventListener('submit', (event) => {
  event.preventDefault(); 
  filterByIngredients()
})

formAppareils.addEventListener('submit', (event) => {
  event.preventDefault(); 
  filterByAppareils()
})

formUstensiles.addEventListener('submit', (event) => {
  event.preventDefault(); 
  filterByUstensils()
})




