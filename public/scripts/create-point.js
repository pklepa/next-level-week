// Dynamically fetches brazilian states from IBGE's API and populate the UF Select in the form
function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]');

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {
            for( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        } 
    );
}

// Given selected state, fetches relevant cities and populate Cities Select in the form
function getCities(event){
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');

    const ufValue = event.target.value;

    // Register the selected state plain name in a hidden input for future reference
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `;

    citySelect.innerHTML = '<option value="">Selecione a cidade</option>';
    citySelect.disabled = true;

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citySelect.disabled = false;
        } 
    );
}

// As the item is selected, updates the global selectedItems array and the hidden input for future reference
function handleSelectedItem(event){
    const itemLi = event.target;
    const itemId = itemLi.dataset.id;

    itemLi.classList.toggle("selected");


    // Look through global variable selectedItems for the current itemId
    const alreadySelected = selectedItems.findIndex( item => item == itemId );

    if (alreadySelected != -1) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent
        });

        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;
}




// ..:: Main  ::..

// - Event listeners
// Cities Select
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

// Items grid
const itemsToCollect = document.querySelectorAll(".items-grid li");
for( const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

// - Global variables
const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

// Function Calls
populateUFs()

