const gallery = document.querySelector('.product--gallery');
const galleryCopy = gallery.cloneNode(true);
const galleryParent = gallery.parentNode;
let lightBoxCloser = null;
let lightBoxIsVisible = false;
let windowWidth = document.documentElement.clientWidth;

// Create a template for the lightbox
const lightBoxTemplate = document.createElement('template');
lightBoxTemplate.innerHTML = `
    <div class="lightBox--closer"></div>
`;

const lightBox = document.createElement('div');
lightBox.classList.add('lightBox');
lightBox.appendChild(lightBoxTemplate.content.cloneNode(true));



hero.addEventListener('click', showLightBox);

/**
 * switches the position of the image gallery and its copy
 * closes the cart if it's open
 * @returns
 */
function showLightBox() {

  if( lightBoxIsVisible === true || window.innerWidth <= 760 ) return;

  gallery.parentNode.replaceChild(galleryCopy, gallery);
  lightBox.appendChild(gallery);
  document.body.appendChild(lightBox);
  lightBoxCloser = document.querySelector('.lightBox--closer');
  lightBoxCloser.addEventListener('click', hideLightBox, {once: true});
  pageCover.classList.add('active');
  lightBoxIsVisible = true;

  toggleCart(false);
}
/**
 * hides the lightBox when the lightBox--closer is clicked
 */
function hideLightBox(){
  galleryParent.replaceChild(gallery, galleryCopy);
  document.body.removeChild(lightBox);
  pageCover.classList.remove('active');
  lightBoxIsVisible = false;
  toggleCart(false);
}

/* --------------------------------
--------pop-up shopping cart-------
-----------------------------------
*/


const shoppingCartTemplate = document.createElement('template');

const cart_span = document.querySelector('.icon--cart');
const navigationIcons_div = document.querySelector('.navigation--icons');
let shoppingCart = null;

cart_span.addEventListener('click', toggleCart);
window.addEventListener('resize', handleResize );

let timer = null;


/**
 * if the user resises the browser window the shoppingCart's position should be adjusted
 */
function handleResize(){

  clearTimeout(timer);
  timer = setTimeout( checkCartPosition, 30);
}

/**
 * shows or hides the shoppingCart when the icon is clicked and hides it when the menu , or the easyBox are shown -> this is the purpose of the boolean parameter
 * @param {boolean} bool
 */
function toggleCart(bool= true) {

  if (!shoppingCart && bool ) {

    /* must measure the width of the window BEFORE the cart would extend it to the right! */
      measureWindowWidth()
      .then( ( widthValue ) =>{

        shoppingCartTemplate.innerHTML = setShoppingCartString(piecesInCart, unitPrice);

        navigationIcons_div.appendChild(shoppingCartTemplate.content.cloneNode(true));
        shoppingCart = document.querySelector('.shoppingCart');

        const itemBin = shoppingCart.querySelector('.item--bin');
        itemBin.addEventListener('click', emptyCart);

        /* see if there is enough space for the cart on the page and adjust it, if needed */
        checkCartPosition( widthValue );
        shoppingCart.classList.add('visible');

      })
      .catch( (error) =>{

          console.log("something went wrong!");
      });


  } else {
     shoppingCart.classList.remove('visible');
      shoppingCart.addEventListener('transitionend', () => {
        navigationIcons_div.removeChild(shoppingCart);
        shoppingCart = null;
      }, {once: true});
  }
}

function measureWindowWidth(){
  return new Promise( (resolve, reject) => {
    resolve(document.documentElement.clientWidth);
  })
}

function checkCartPosition( windowWidth = document.documentElement.clientWidth ) {
  if (!shoppingCart) return;


  const defaultLeftValue = '-170px';
  shoppingCart.style.position = 'absolute';
  shoppingCart.style.left = defaultLeftValue;


  const dimensions = shoppingCart.getBoundingClientRect();
  const rightEdge = dimensions.left + dimensions.width;

  if ( rightEdge > windowWidth ) {
      // shoppingCart.style.position = 'fixed';
      shoppingCart.style.left = 'auto';
      shoppingCart.style.right = '10px';
  }
}


/* empty the cart */

/**
 * called only when the cartBin icon is clicked
 */
function emptyCart() {

  const cartBody = shoppingCart.querySelector('.shoppingCart--body');
  cartBody.innerHTML = 'Your cart is empty.'
  const piecesInCart_span = document.querySelector('.pieces-in-cart');
  piecesInCart_span.classList.remove('visible');
  piecesInCart_span.innerHTML = 0;
  piecesInCart = 0;
  setTimeout(toggleCart, 1000);
}


/* adding items to the shopping cart */

const minus_btn = document.querySelector('.minus');
const plus_btn = document.querySelector('.plus');
let piecesToCartElem = document.querySelector('.number');
let piecesInCartElem = document.querySelector('.pieces-in-cart');

const addToCartButton = document.querySelector('.cart');

minus_btn.addEventListener('click', changePiecesToCart);
plus_btn.addEventListener('click', changePiecesToCart);
addToCartButton.addEventListener('click', changePiecesInCart);


let piecesInCart = 0;
let unitPrice = 125;
let piecesToCart = 0;


function changePiecesToCart(e){
  const button = e.currentTarget;
  const delta = parseInt(button.dataset.delta);
  piecesToCart = piecesToCart + delta;

  if( piecesToCart < 0 ) piecesToCart++;
  piecesToCartElem.innerHTML = piecesToCart;
}

function changePiecesInCart(){
  piecesInCart = piecesToCart;
  piecesInCartElem.innerHTML = piecesToCart;

  if( piecesInCart !== 0 ){
    const piecesInCart_span = document.querySelector('.pieces-in-cart');
    piecesInCart_span.classList.add('visible');
    piecesInCart_span.innerHTML = piecesInCart;
  }

  if( !shoppingCart ) {
    toggleCart();
     return;
  }
  else updateCart();
}
/**
 * when the shopping cart is shown I simply want to update its content
 */
function updateCart(){


























































































































































































































































































































































































































































































































  const priceToPay_span = shoppingCart.querySelector('.priceToPay');
  const priceAndNumber_span = shoppingCart.querySelector('.unitPriceAndNumber');
  const piecesInCart_span = document.querySelector('.pieces-in-cart');
  const total = piecesInCart * unitPrice;

  priceToPay_span.innerHTML = ` $${ total }`;
  priceAndNumber_span.innerHTML = `${unitPrice} x ${piecesInCart}`;

  if( total > 0 ){
    piecesInCart_span.classList.add('visible');
    piecesInCart_span.innerHTML = piecesInCart;
  }
  else{
    piecesInCart_span.innerHTML = 0;
    piecesInCart_span.classList.remove('visible');
  }

}

/**
 * return the shopping cart's innerHTML string
 * @param {number} piecesInCart total number of items in cart
 * @param {number} unitPrice price per unit
 * @returns string
 */
function setShoppingCartString(piecesInCart, unitPrice){

return `
  <article class="shoppingCart">
  <div class="shoppingCart--head">Cart</div>
  <div class="shoppingCart--body">
    <div class="item">
      <img class="item--icon" src="./images/image-product-1-thumbnail.jpg" alt="item preview" height="50">
      <span class="item--info">
        <span class="item--name">Fall Limited Edition Sneakers</span>
        <span class="item--total"><span class="unitPriceAndNumber">${unitPrice} x ${piecesInCart}</span><strong class="priceToPay"> $${unitPrice * piecesInCart}</strong></span>
      </span>
      <span class="item--bin">
        <img src="./images/icon-delete.svg" alt="" height="15">
      </span>
    </div>
    <button class="btn btn-cart">Checkout</button>
  </div>
  </article>
  `;
}





