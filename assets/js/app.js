const cart = document.querySelector('#cart');
const tbodyCart = document.querySelector('#cart tbody');
const emptyElementCart = document.querySelector('#empty-design');
const cartList = document.querySelector('#cart-list');
const emptyAllCart = document.querySelector('#empty-cart');
const designList = document.querySelector('#design-list');
let articlesCart = [];

loadFunctions();
function loadFunctions(){
    designList.addEventListener('click', addDesign);
    
    cartList.addEventListener('click',deleteDesign);

    emptyAllCart.addEventListener('click',(e)=> {
        e.preventDefault();
        articlesCart = [];
        cleanHTML();
        console.log('Listo');
    });
}

function addDesign(e){
    e.preventDefault();

    if(e.target.classList.contains('add-cart')){
        const selectedDesign = e.target.parentElement.parentElement; 
        infoDesign(selectedDesign);  
    }
}

function infoDesign(d){
    const design = {
        image : d.querySelector('img').src,
        nameDesign : d.querySelector('.info-card h4 a').textContent,
        author: d.querySelector('.info-card p').textContent,
        price : d.querySelector('.info-card .price').textContent,
        id : d.querySelector('a.add-cart').getAttribute('data-id'),
        quantity: 1
    }

    const articles = articlesCart.some( article => article.id == design.id);

    if(articlesCart == ''){
        articlesCart = [...articlesCart, design];
    }else if(articles == true){
        articlesCart.forEach(article => {
            if(design.id == article.id){
                article.quantity = article.quantity + design.quantity;
            }
        });
    }else{
        articlesCart = [...articlesCart, design];
    }

    cartUpdate();
}


function cartUpdate(){

    cleanHTML();

    articlesCart.forEach(disenio => {
        const {image,nameDesign,author,price,id,quantity} = disenio;

        const row = document.createElement('TR');
        row.innerHTML = `
            <td>
                <img src="${image}" alt="${nameDesign}" class="thumbnail">
            </td>
            <td>
                ${nameDesign}
            </td>
            <td>
                ${price}
            </td>
            <td>
                ${quantity}
            </td>
            <td>
                <a href="#" id="empty-design" class="empty-design" data-id="${id}">X</a> 
            </td>
        `;

        tbodyCart.appendChild(row);
    });

    
}

function cleanHTML(){

    while(tbodyCart.firstChild){
        tbodyCart.removeChild(tbodyCart.firstChild);
    }

}


function deleteDesign(e){

    console.log(e.target);
    designId = e.target.getAttribute('data-id');
    articlesCart = articlesCart.filter(article => article.id !== designId);
    console.log(articlesCart);

    cartUpdate();
}