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

  const url = "/recipes.json"; 

async function fetchData(url) {   
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error(error.message);
    return null; 
  }
}

let htmlContent = "";

async function displayNineData() {
    const data = await fetchData(url);
    const arrayNineData = data.recipes.slice(0, 10);  // Prendre les 9 premiers éléments du tableau

     // Variable pour accumuler le contenu HTML

    // Créer une carte pour chaque élément dans arrayNineData
    arrayNineData.forEach(element => {
        // Récupérer les ingrédients et les afficher avec leur quantité et unité (si disponible)
        const ingredientsList = element.ingredients.map(ingredient => {
            // Vérifier si 'unit' existe et l'afficher si c'est le cas
            if (ingredient.unit && ingredient.quantity) {
                return `<p><span class="ingredName" >${ingredient.ingredient}</span><br> <span class="quantityCard">${ingredient.quantity} ${ingredient.unit}</span></p>`;
            } else if (ingredient.quantity) {
                return `<p><span class="ingredName" >${ingredient.ingredient}</span><br> <span class="quantityCard"> ${ingredient.quantity}</span></p>`;
            } else {
                return `<p><span class="ingredName" >${ingredient.ingredient}</span></p>`
            }
        }).join("") 

        htmlContent += `
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
        `;
    });

    // Insérer toutes les cartes dans contentDataSection
    sectionData.innerHTML = htmlContent;
}
displayNineData()





