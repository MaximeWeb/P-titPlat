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

// EVENT LISTENER
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

  filterResult.addEventListener('click', (event) => { // Ferme la div de l'element filtré
    if (event.target.classList.contains('closeFilter')) {
      event.target.parentElement.remove();
    }
    // sectionData.innerHTML = ""
  });

  buttonInput.addEventListener('submit', (event) => { // Envoie les values du formulaire (Grande barre de recherche)
    event.preventDefault(); 
    searchRecipeAndDisplay()
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
    return;
  }

  displayValueList(filteredRecipes)
  cards(filteredRecipes);
}

function filterRecipesByIngredient(ingredient) {  // Va mettres a jour les recettes en fonction de l'ingredient recu
  const filteredRecipes = recipes.filter(recipe => { // On ce prepare a filtrer le tableau avec notre ingredients recu
     const getNewRecipes = recipe.ingredients.some(element =>  element.ingredient.includes(ingredient));
     return getNewRecipes 
  });
  filterResult.innerHTML += `<p class="resultBloc">${ingredient} <span class="closeFilter"> X </span></p>`; // Recupere l'element pour l'afficher
  sectionData.innerHTML = ""; // On vide et on maj
  cards(filteredRecipes);
  displayValueList(filteredRecipes)
}

recupContentIngred.addEventListener('click', (event) => { // Va target le textContent de l'element cliquable pour l'envoyé a notre function filterRecipesByIngredients
    const clickedIngredient = event.target.textContent;
    filterRecipesByIngredient(clickedIngredient);
});

function filterRecipesByAppareil(appliance) { // Va mettres a jour les recettes en fonction de l'appareil recu
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.appliance.includes(appliance);
  });
  filterResult.innerHTML += `<p class="resultBloc">${appliance} <span class="closeFilter"> X </span></p>`;
  sectionData.innerHTML = "";
  cards(filteredRecipes);
  displayValueList(filteredRecipes)
}

recupContentAppareils.addEventListener('click', (event) => { // Va target le textContent de l'element cliquable pour l'envoyé a notre function filterRecipesByAppareils
    const clickedAppareil = event.target.textContent;
    filterRecipesByAppareil(clickedAppareil);
});

function filterRecipesByUstensil(ustensil) { // Va mettres a jour les recettes en fonction de l'ustensile recu
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.ustensils.some(element =>  element.includes(ustensil)); // Ici on va verifié que les ingreds de la recette en minuscule contiennent le resultat de la recherche
  
  });
  filterResult.innerHTML += `<p class="resultBloc">${ustensil} <span class="closeFilter"> X </span></p>`;
  sectionData.innerHTML = "";
  cards(filteredRecipes)
  displayValueList(filteredRecipes)
}

recupContentUstensils.addEventListener('click', (event) => { // Va target le textContent de l'element cliquable pour l'envoyé a notre function filterRecipesByUstensil
    const clickedUstensil = event.target.textContent;
    filterRecipesByUstensil(clickedUstensil);
});


// INIT

 function initialDisplayData() { // Affiche les 10 premieres recette et leurs liste de filtre , initialement.

      const tenRecipes = recipes.slice(0, 10); 

      displayValueList(tenRecipes)
      cards(tenRecipes)
}
initialDisplayData();




// formIngredients.addEventListener('submit', (event) => {
//   event.preventDefault(); 
//   displayByIngredients()
// })

// formAppareils.addEventListener('submit', (event) => {
//   event.preventDefault(); 
//   displayByAppareils()
// })

// formUstensiles.addEventListener('submit', (event) => {
//   event.preventDefault(); 
//   displayByUstensils()
// })




