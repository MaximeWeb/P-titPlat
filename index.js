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
const closeFilter = filterResult.querySelectorAll(".closeFilter");


// EVENT LISTENER CLICK
buttonIngredient.addEventListener('click', () => {  // Ouvre la liste des ingrédients
    buttonIngredient.style.display = "none"
      firstFilter.style.display = "Block"
  });

  firstNameFilter.addEventListener('click', () => { // Ferme la liste des ingrédients
    firstFilter.style.display = "none"
      buttonIngredient.style.display = "flex"
    //   sectionData.innerHTML = ""
    //   htmlContent = ""
  });

  buttonAppareils.addEventListener('click', () => { // Ouvre la liste des Appareils
    buttonAppareils.style.display = "none"
      secondFilter.style.display = "Block"
  });

  secondNameFilter.addEventListener('click', () => { // Ferme la liste des Appareils
    secondFilter.style.display = "none"
      buttonAppareils.style.display = "flex"
  });

  buttonUstensiles.addEventListener('click', () => { // Ouvre la liste des Ustensiles
    buttonUstensiles.style.display = "none"
      thirdFilter.style.display = "Block"
  });

  thirdNameFilter.addEventListener('click', () => { // Ferme la liste des Ustensiles
    thirdFilter.style.display = "none"
      buttonUstensiles.style.display = "flex"
  });

// Display Recipes function

const displayValueList = (filteredRecipes) => {  // function qui va mettre a jour la liste des filtres et les afficher , prend des recettes filtré en parametre
  const uniqueIngredients = new Set(); // on crée des new set , ca va permettre d'eviter les doublons
  const uniqueAppareils = new Set();
  const uniqueUstensils = new Set();

  filteredRecipes.forEach(recipe => { // pour toutes les recettes recu
    recipe.ingredients.forEach(ingredient => {
      uniqueIngredients.add(ingredient.ingredient); // on ajoute les ingredients dans notre set ingredients
    });
   
    recipe.ustensils.forEach(ustensil => {  // on ajoutes les ustensils dans notre set ustensils
      uniqueUstensils.add(ustensil);
    });

    uniqueAppareils.add(recipe.appliance); // et on ajoute notre unique appareil dans notre set appareils
  });

  // on va changer ces set en array afin de pouvoir trié dans l'ordre alphabétique
  const sortedIngredients = Array.from(uniqueIngredients).sort((a,b) => a.localeCompare(b));
  const sortedAppareils = Array.from(uniqueAppareils).sort((a,b) => a.localeCompare(b));
  const sortedUstensils = Array.from(uniqueUstensils).sort((a,b) => a.localeCompare(b));


  // Vider le contenu des listes , avant d'en envoyé de nouvelles
  recupContentIngred.innerHTML = "";
  recupContentAppareils.innerHTML = "";
  recupContentUstensils.innerHTML = "";

  // Afficher les éléments triés dans les sections correspondantes
  sortedIngredients.forEach(ingredient => {
    recupContentIngred.innerHTML += `<p class="valueRecup">${ingredient}</p>`;
  });

  sortedAppareils.forEach(appareil => {
    recupContentAppareils.innerHTML += `<p class="valueRecup">${appareil}</p>`;
  });

  sortedUstensils.forEach(ustensil => {
    recupContentUstensils.innerHTML += `<p class="valueRecup">${ustensil}</p>`;
  });

};

 const cards = (filteredRecipes) => { // function qui prend en parametre des recettes filtré , et les affiches dans un bloc html
  filteredRecipes.forEach(element => {
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

filterResult.addEventListener('click', (event) => { // Va gerer les bloc filters , fait disparaitre le bloc au click de la croix et tri les recettes
  if (event.target.classList.contains("closeFilter")) {
    event.target.parentElement.remove();  // recupere la classe parent de closefilter et la remove

    //ici je fait un tableau avec nos textContent de nameElement dans ma div filterResult 
    const nameElements = Array.from(filterResult.querySelectorAll('.nameElement')).map(element => element.textContent.trim().toLowerCase()); 

    // si c'est vide on vide + function init
    if (nameElements.length === 0) {
      console.log("Aucun filtre restant. Réinitialisation des recettes.");
      sectionData.innerHTML = "";
      initialDisplayData(); 

    } else {
     // sinon on filtre avec les valeurs des textcontent ,sur mon tableau recipe directement
      sectionData.innerHTML = ""; 
      const filteredRecipes = recipes.filter(recipe => {
        return nameElements.every(element => {
          
          const isIngredientMatch = recipe.ingredients.some(item =>  item.ingredient.toLowerCase().includes(element));
          const isApplianceMatch = recipe.appliance.toLowerCase().includes(element);
          const isUstensilMatch = recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(element));
            
          return isIngredientMatch || isApplianceMatch || isUstensilMatch;
        });
      });

      console.log("Recettes filtrées :", filteredRecipes);

      displayValueList(filteredRecipes);   // on maj
      cards(filteredRecipes); 
    }
  }
});

let currentFilteredRecipes = [];// Tableau qui va recevoir des recettes filtrées 

// Function qui va recuperer la value de l'input, filtrer le tableau pour verifié si la value est présente dans des recettes , si c'est le cas on recupere ces recettes
function searchRecipeAndDisplay() {
  let inputValue = inputResult.value.trim().toLowerCase();
  sectionData.innerHTML = "";

  const filteredRecipes = recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(inputValue);
    const descriptionMatch = recipe.description.toLowerCase().includes(inputValue);
    const ingredientsMatch = recipe.ingredients.some(item =>
      item.ingredient.toLowerCase().includes(inputValue)
    );
    return nameMatch || ingredientsMatch || descriptionMatch;
  });

  if (filteredRecipes.length === 0) {
    sectionData.innerHTML = `<p>Aucune recette trouvée pour "${inputValue}".</p>`;
    recupContentIngred.innerHTML = "";
    recupContentAppareils.innerHTML = "";
    recupContentUstensils.innerHTML = "";
    currentFilteredRecipes = []; 
  }

  displayValueList(filteredRecipes);
  cards(filteredRecipes);
  currentFilteredRecipes = filteredRecipes;
  
  console.log(currentFilteredRecipes)// Met à jour l'état global des recettes filtrées
  // return filteredRecipes;
}

function filterRecipesByIngredient(ingredient) { // Va mettres a jour les recettes en fonction de l'ingredient recu
  const filteredRecipes = currentFilteredRecipes.filter(recipe => {
    return recipe.ingredients.some(element => element.ingredient.toLowerCase().includes(ingredient.toLowerCase()));
  });

  sectionData.innerHTML = "";
  cards(filteredRecipes);
  displayValueList(filteredRecipes);

  currentFilteredRecipes = filteredRecipes; // Met à jour l'état global avec les nouvelles recettes filtrées
  
  console.log(currentFilteredRecipes) 
}

recupContentIngred.addEventListener('click', (event) => { // Va target le textContent de l'element cliquable pour l'envoyé a notre function filterRecipesByIngredient
  if(event.target.classList.contains('valueRecup')) {
     const clickedIngredient = event.target.textContent;
     filterResult.innerHTML += `<div class="resultBloc"><p class="nameElement">${clickedIngredient}</p><span class="closeFilter"> X </span></div>`;
    filterRecipesByIngredient(clickedIngredient);
  } 

});

function filterRecipesByAppareil(appliance) { // Va mettres a jour les recettes en fonction de l'appareil recu
  const filteredRecipes = currentFilteredRecipes.filter(recipe => {
    return recipe.appliance.toLowerCase().includes(appliance.toLowerCase());
  });
 
  sectionData.innerHTML = "";
  cards(filteredRecipes);
  displayValueList(filteredRecipes)
  currentFilteredRecipes = filteredRecipes;
  console.log(currentFilteredRecipes)
}

recupContentAppareils.addEventListener('click', (event) => {// Va target le textContent de l'element cliquable pour l'envoyé a notre function filterRecipesByAppareils
  if(event.target.classList.contains('valueRecup')) {
     const clickedAppareil = event.target.textContent;
     filterResult.innerHTML += `<div class="resultBloc"><p class="nameElement">${clickedAppareil}</p><span class="closeFilter"> X </span></div>`;
    filterRecipesByAppareil(clickedAppareil);
  } 
});

function filterRecipesByUstensil(ustensil) { // Va mettres a jour les recettes en fonction de l'ustensile recu
  const filteredRecipes = currentFilteredRecipes.filter(recipe => {
    return recipe.ustensils.some(element =>  element.toLowerCase().includes(ustensil.toLowerCase())); // Ici on va verifié que les ingreds de la recette en minuscule contiennent le resultat de la recherche
  
  });
  
  sectionData.innerHTML = "";
  cards(filteredRecipes)
  displayValueList(filteredRecipes)
  currentFilteredRecipes = filteredRecipes;
  console.log(currentFilteredRecipes)
}

recupContentUstensils.addEventListener('click', (event) => { // Va target le textContent de l'element cliquable pour l'envoyé a notre function filterRecipesByUstensil
  if(event.target.classList.contains('valueRecup')) {
     const clickedUstensil = event.target.textContent;
     filterResult.innerHTML += `<div class="resultBloc"><p class="nameElement">${clickedUstensil}</p><span class="closeFilter"> X </span></div>`;
    filterRecipesByUstensil(clickedUstensil);
  }
   
});

// INIT

 function initialDisplayData() { // Affiche les 10 premieres recettes et leurs liste de filtre , initialement.

      const tenRecipes = recipes.slice(0, 10); 
      currentFilteredRecipes = tenRecipes
      displayValueList(tenRecipes)
      cards(tenRecipes)
}
initialDisplayData();

// Submit

buttonInput.addEventListener('submit', (event) => { // Envoie les values du formulaire (Grande barre de recherche)
  event.preventDefault(); 
  searchRecipeAndDisplay()
});

formIngredients.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const inputValue = inputIngredients.value.trim().toLowerCase(); 
  console.log(inputValue);

  filterResult.innerHTML += `<div class="resultBloc"><p class="nameElement">${inputValue}</p><span class="closeFilter"> X </span></div>`;
  filterRecipesByIngredient(inputValue);
});

formAppareils.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const inputValue = inputAppareils.value.trim().toLowerCase();
  console.log(inputValue)

  filterResult.innerHTML += `<div class="resultBloc"><p class="nameElement">${inputValue}</p><span class="closeFilter"> X </span></div>`;
  filterRecipesByAppareil(inputValue);
  
})

formUstensiles.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const inputValue = inputUstensiles.value.trim().toLowerCase();
  console.log(inputValue)

  filterResult.innerHTML += `<div class="resultBloc"><p class="nameElement">${inputValue}</p><span class="closeFilter"> X </span></div>`;
  filterRecipesByUstensil(inputValue);
})




