/*
    Função populateUFs criada para buscar no site do ibge
    todos os 27 estados brasileiros,  a partir da função interna
    fetch. Contudo, ela retorna uma promisse, e ai temos que fazer uma
    função anonima para retornar um json e depois com outra função anonima 
    e interando-a pelo laço for conseguimos pegar o estado a partir do seu id que está no json
    (Ex: id=20, state='São Paulo')

*/ 

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")    // função interna busca na web e retrona uma promisse
    .then( res => res.json())                                               // função anonima que retorna um arquivo json
    .then( states => {                                                      // vai armazenar todos os estados e tudo que se dirigem a eles

        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

/*
    Função para buscar as cidades de cada estado selecionado pela função acima 

*/ 
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")  // variavel pega valor da select

    const stateInput = document.querySelector("input[name=state]")  // pega o valor do input

    const ufValue = event.target.value                              // 

    const indexOfSelectedState = event.target.selectedIndex         //

    stateInput.value = event.target.options[indexOfSelectedState].text  //  


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // url correspondente as cidades dos estados

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())                               // função anonima que retorna um arquivo json
    .then( cities => {

        

        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`  // mostra na tela todos as cidades
        }
        
        // desabilita a função imposta no html no select, funcionando após a escolha no primeiro select
        citySelect.disabled = false                              
        
    } )

}

// nessa parte o documento sempre ficará escutando para caso aconteça um evento 

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// items de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(){
    const itemLi = event.target
    
    // add or remove  
    
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id


    // verififcar se tem items selecionados 

    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId // isso será true or false
        return itemFound
    } )

    // se estiver selecionado,tirar da seleção
    if(alreadySelected >= 0){
        // tirar da seleção

        const filteredItens = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItens
        
    }else{
        //se  não estiver selecionado, adicionar a seleção
        // adicionar a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido  com os itens selecionados
    collectedItems.value = selectedItems    

}





