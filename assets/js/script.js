let cart = []
let quantityPizzas = 1;
let pizzaKey = 0;


const itemModel = document.querySelector('.pizza-item')
const pizzasContainer = document.querySelector('.pizza-area')
const windowArea = document.querySelector('.pizzaWindowArea')
const c = (item) => document.querySelector(item)

pizzaJson.map((pizza,index) => {
    let pizzaItem = document.createElement('div')
    pizzaItem.classList.add('pizza-item')
    pizzaItem.setAttribute('id-key', index) // definindo o id

    pizzaItem.innerHTML = itemModel.innerHTML // definindo o conteúdo da div

    pizzaItem.children[1].innerHTML = `R$ ${pizza.price.toFixed(2)}` // definindo preço
    pizzaItem.children[2].innerHTML = `${pizza.name}` // definindo o nome
    pizzaItem.children[3].innerHTML = `${pizza.description}` // definindo a descrição
    pizzaItem.children[0].children[0].children[0].setAttribute('src', `${pizza.img}`) // definindo a imagem

    pizzasContainer.appendChild(pizzaItem)

    // adicionando eventos de clique

    pizzaItem.children[0].addEventListener('click', (e) => showWindow(e))
}) 

let sizesDiv = c('.pizzaInfo--sizes')

function showWindow(e) {
    e.preventDefault;
    let key = e.target.closest('.pizza-item').getAttribute('id-key')
    pizzaKey = key


    windowArea.style.opacity = '0'
    windowArea.style.display = 'flex'
    setTimeout(() => {
        windowArea.style.opacity = '1'
    }, 200)


    c('.pizzaBig').children[0].setAttribute('src', `${pizzaJson[key].img}`)
    c('.pizzaInfo').children[0].innerHTML = `${pizzaJson[key].name}`
    c('.pizzaInfo--desc').innerHTML = `${pizzaJson[key].description}`
    c('.pizzaInfo--actualPrice').innerHTML = `${pizzaJson[key].price.toFixed(2)}` 

    for (let i=0; i<3; i++) {
        sizesDiv.children[i].addEventListener('click', (e) => {
            for (let i=0; i<3; i++) {
                sizesDiv.children[i].classList.remove('selected')
            }
            e.target.classList.add('selected')
    })
    sizesDiv.children[i].children[0].innerHTML = `${pizzaJson[key].price.toFixed(2)}`
}
}

// eventos da janela


//aumentando e diminuindo a qunantidade de pizzas

c('.pizzaInfo--qtmenos').addEventListener('click', () => changeQuantity('remove')) 
c('.pizzaInfo--qtmais').addEventListener('click', () => changeQuantity('add'))   

function changeQuantity(info) {
    let quantityDiv = c('.pizzaInfo--qt')

    if (info === 'remove') {
        if (quantity == 1) {
            window.alert('A quantidade mínima é 1.')
        } else if (quantity > 1) {
            quantityPizzas--
            quantityDiv.innerHTML = quantityPizzas
        }
    } else {
        quantityPizzas++
        quantityDiv.innerHTML = quantityPizzas
    }
}

// fechando a janela 

c('.pizzaInfo--cancelButton').addEventListener('click', () => closeWindow())
c('.pizzaInfo--cancelMobileButton').addEventListener('click', () => closeWindow())

function closeWindow() {
    windowArea.style.opacity = '0'
    setTimeout(() => {
        windowArea.style.display = 'none'
    }, 300)
}

// adicionando pizza ao carrinho

c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = 'none'

    for (let i=0; i<3; i++) {
        if(sizesDiv.children[i].classList.contains('selected')) {
            size = sizesDiv.children[i].getAttribute('id')
        }
    }

    let identifier = `${pizzaJson[pizzaKey].id}@${size}`

    let key = cart.findIndex((item) => item.identifier == identifier) // retorna um index

    if (key > -1) {
        cart[key].qt += quantityPizzas
    } else {
        cart.push({
            id: pizzaJson[pizzaKey].id,
            size: size,
            qt: quantityPizzas,
            identifier: identifier
        })
    }

    console.log(cart)

    closeWindow()
})

