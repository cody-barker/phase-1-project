
document.addEventListener("DOMContentLoaded", initialize)


function initialize () {
    initList()
    formAdd()
    columnSort()
}

function initList() {
    fetch('http://localhost:3000/plantList')
    .then(resp => resp.json())
    .then(plantList => {
        plantList.forEach(plant => renderOnePlant(plant))
        })
}

function renderOnePlant(plantObj) {

    const newRow = document.createElement('tr')

    const tdBinomialName = document.createElement('td')
    const tdCommonName = document.createElement('td')
    const tdType = document.createElement('td')
    const tdHeight = document.createElement('td')
    const tdLightRequirement = document.createElement('td')
    const tdMoistureRequirement = document.createElement('td')

    tdBinomialName.innerText = plantObj.binomialName
    tdBinomialName.style.fontStyle = "italic"
    tdCommonName.innerText = plantObj.commonName
    tdType.innerText = plantObj.type
    tdHeight.innerText = plantObj.height
    tdLightRequirement.innerText = plantObj.lightRequirement
    tdMoistureRequirement.innerText = plantObj.moistureRequirement

    newRow.append(tdBinomialName, tdCommonName, tdType, tdHeight, tdLightRequirement, tdMoistureRequirement)
    document.querySelector('#mainList').append(newRow)

    addHighlightListener(newRow);
}

function addHighlightListener(newRow) {
    newRow.addEventListener('click', (e) => {
        e.target.parentNode.style.backgroundColor = 
        (e.target.parentNode.style.backgroundColor === 'rgb(4, 170, 109)' ) ? ('transparent'):('rgb(4, 170, 109)');
    })
}


function formAdd() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const plantObj = {
            binomialName: e.target.binomialNameInput.value,
            commonName: e.target.commonNameInput.value,
            type: e.target.typeInput.value,
            height: e.target.heightInput.value,
            lightRequirement: e.target.lightRequirementInput.value,
            moistureRequirement: e.target.moistureRequirementInput.value
        }
        addPlant(plantObj)
        form.reset()
    })
}

function addPlant(plantObj) {
    fetch('http://localhost:3000/plantList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantObj)
    })
        .then(resp => resp.json())
        .then((plantObj) => renderOnePlant(plantObj))
        .catch(error => console.log(error))
}




