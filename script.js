if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
var token =false;


  
function start() {
  var removeCartItemButton = document.getElementsByClassName("btn-danger");

  for (var i = 0; i < removeCartItemButton.length; i++) {
    var button = removeCartItemButton[i];
    button.addEventListener("click", removeCartItem);
  }

  var cartQuantityButton = document.getElementsByClassName(
    "cart-quantity-input"
  );
  for (var i = 0; i < cartQuantityButton.length; i++) {
    var input = cartQuantityButton[i];
    input.addEventListener("change", quantityInputChanged);
  }

  var addToCartButton = document.getElementsByClassName("item-cart-button");
  for (var i = 0; i < addToCartButton.length; i++) {
    button = addToCartButton[i];
    button.addEventListener("click", addToCartButtonClicked);
  }

 

}


function buyButtonClicked(){
  var buyBtn = document.getElementsByClassName('buy-button')[0]
  buyBtn.addEventListener('click',(event)=>{
    var buyBTn = event.target
    var info = buyBTn.parentElement.parentElement.getElementsByClassName('cart-info')[0]
    var rows = info.getElementsByClassName("cart-row")
    for (var i = 0; i < rows.length; i++) {
        var row =rows[i]
        var priceEle = row.getElementsByClassName('cart-price')[0]
        var nameEle = row.getElementsByClassName("card-item-title")[0]
       

    }
    var name = nameEle.innerText
    var price = priceEle.innerText


    

  }) 



       
   
}


function addToCartButtonClicked(event) {
  button = event.target;
  var shopItem = button.parentElement;
  var itemTitle = shopItem.getElementsByClassName("item-title")[0].innerText;
  var itemPrice = shopItem
    .getElementsByClassName("item-price")[0]
    .innerText.replace("MRP:", "");
  var imageSrc = shopItem.getElementsByClassName("item-image")[0].src;
  createNEwCart(itemTitle, itemPrice, imageSrc);
  updateCartTotal()
}

function createNEwCart(itemTitle, itemPrice, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add('cart-row')
    var cartInfo = document.getElementsByClassName("cart-info")[0];
  var cartRowContent = `
    <div class="cart-column cart-items">
    <img class="cart-img" src="${imageSrc}" width="100px" height="100px" alt="" />
    <span class="card-item-title">${itemTitle}</span>
  </div>
  <span class="cart-column cart-price cart-item-price ">${itemPrice}</span>
  <div class="cart-column cart-quantity">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn btn-danger cart-quantity-button">REMOVE</button>
  </div>`;
    cartRow.innerHTML = cartRowContent
    cartInfo.append(cartRow)
    cartRow.getElementsByClassName('cart-quantity-button')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityInputChanged)
    
   

}

function removeCartItem(event) {
  var buttonclicked = event.target;
  buttonclicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityInputChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  } else {
    updateCartTotal();
  }
}

function updateCartTotal() {
  var cartItems = document.getElementsByClassName("cart-info")[0];
  var cartRows = cartItems.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 1; i < cartRows.length; i++) {
    var cartRow = cartRows[i];

    var priceElement = cartRow.getElementsByClassName("cart-price")[0];

    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];

    var price = parseFloat(priceElement.innerText.replace("₹", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "₹" + total;
}
