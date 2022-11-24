import { menuArray } from "./data.js";
let order = [];
alert(' Today is offer : order Beer with Pizza or Hamburger and get 10% discount')
renderMenu(menuArray);

let check = true;

function renderMenu(menu) {
  menu.map((item) => {
    const menuItem = document.createElement("div");
    menuItem.setAttribute("class", "item");
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("class", "container");
    const product = document.createElement("h3");
    product.setAttribute("class", "product");
    product.innerText = item.emoji;
    const productInfo = document.createElement("div");
    const productName = document.createElement("h1");
    productName.innerText = item.name;
    const ingredients = document.createElement("p");
    ingredients.innerText = item.ingredients;
    const productPrice = document.createElement("h2");
    productPrice.innerText = `$${item.price}`;
    const add = document.createElement("i");
    add.setAttribute("class", "fa-solid fa-plus");
    add.setAttribute("data-id", item.id);
    add.setAttribute("data-price", item.price);
    add.setAttribute("data-name", item.name);
    menuItem.appendChild(menuContainer);
    menuContainer.appendChild(product);
    menuContainer.appendChild(productInfo);
    productInfo.appendChild(productName);
    productInfo.appendChild(ingredients);
    productInfo.appendChild(productPrice);
    menuItem.appendChild(add);
    document.querySelector("#menu").appendChild(menuItem);
  });

  printORder();
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-plus")) {
    if (check) {
      createOrder(
        e.target.dataset.price,
        e.target.dataset.name,
        e.target.dataset.id
      );
    }
  } else if (e.target.dataset.delete) {
    removeOrder(e.target.dataset.delete);
  } else if (e.target.classList.contains("close")) {
    togglePay();
  } else if (e.target.classList.contains("Pay")) {
    Review(e);
  }
});

function createOrder(price, name, id) {
  const matchingItem = order.filter(function (item) {
    return item.id.includes(id);
  })[0];
  if (matchingItem) {
    const newPrice = Number(matchingItem.price) + Number(price);
    matchingItem.price = newPrice;
    matchingItem.quantity += 1;
  } else {
    order.push({
      name: name,
      price: price,
      id: id,
      quantity: 1,
    });
  }
  printORder();
}

function printORder() {
  if (order <= 0) {
    document.querySelector(".order").classList.add("hidden");
  } else {
    document.querySelector(".order").classList.remove("hidden");
  }
  document.querySelector(".order-item").innerText = "";
  let total = 0;
  order.map(function (item) {
    total = total + parseInt(item.price);
    const items = document.createElement("div");
    items.setAttribute("class", "items");
    const container = document.createElement("cotainer");
    container.setAttribute("class", "container-order");
    const name = document.createElement("p");
    name.innerText = item.name;
    const amount = document.createElement("p");
    amount.innerText = item.quantity;
    amount.setAttribute("class", "space");
    const deletes = document.createElement("p");
    deletes.innerText = "delete";
    deletes.setAttribute("data-delete", item.id);
    deletes.setAttribute("class", "delete");
    const price = document.createElement("p");
    price.innerText = ` $${item.price}`;
    document.querySelector(".order-item").append(items);
    items.appendChild(container);
    container.appendChild(name);
    container.appendChild(amount);
    container.appendChild(deletes);
    items.appendChild(price);
  });
  discount(total);
}

function removeOrder(id) {
  const newData = order.filter((order) => order.id !== id);
  order = newData;
  printORder();
}

function togglePay() {
  document.querySelector("form").classList.toggle("hidden");
}

function discount(total) {
  let discount = [];
  let discountValue = total / 10;
  order.map((items) => {
    if (items.name === "Beer") {
      discount.push(items.name);
    } else if (items.name === "Pizza") {
      discount.push(items.name);
    } else if (items.name === "Hamburger") {
      discount.push(items.name);
    }
  });

  if (
    (discount.includes("Beer") && discount.includes("Pizza")) ||
    (discount.includes("Beer") && discount.includes("Hamburger"))
  ) {
    document.querySelector(".discount").classList.remove("hide");
    document.querySelector(".discount-value").innerText = discountValue;
    total = total - discountValue;
  }
  document.querySelector(".total").innerText = total;
}

function Review(e) {
   const customer = document.getElementById("input-name").value ;
  if ( document.getElementById("input-name").value &&  document.getElementById("card").value &&  document.getElementById("card").inputMode &&  document.getElementById("ccv").value) {
    check = false;
    e.preventDefault();
    document.querySelector("form").classList.toggle("hidden");
    document.querySelector(".order").classList.add("hidden");
    document.getElementById("input-name").value = "";
    document.getElementById("card").value = "";
    document.getElementById("ccv").value = "";

    const Review = document.createElement("div");
    Review.setAttribute("class", "review");
    const pag = document.createElement("p");
    pag.innerText = `Thanks, ${
     customer
    }! Your order is on its way!`;
    const starContainer = document.createElement("div");
    starContainer.setAttribute("class", "rating");
    const span = document.createElement("span");
    span.setAttribute("class", "rating__result");
    starContainer.appendChild(span);
    for (let i = 0; i < 5; i++) {
      const star = document.createElement("i");
      star.setAttribute("class", "rating__star far fa-star");
      starContainer.appendChild(star);
    }

    document.querySelector("main").appendChild(Review);
    Review.appendChild(pag);
    document.querySelector("main").appendChild(starContainer);

    const ratingStars = [...document.getElementsByClassName("rating__star")];
    const ratingResult = document.querySelector(".rating__result");

    printRatingResult(ratingResult);

    function executeRating(stars, result) {
      const starClassActive = "rating__star fas fa-star";
      const starClassUnactive = "rating__star far fa-star";
      const starsLength = stars.length;
      let i;
      stars.map((star) => {
        star.onclick = () => {
          i = stars.indexOf(star);

          if (star.className.indexOf(starClassUnactive) !== -1) {
            printRatingResult(result, i + 1);
            for (i; i >= 0; --i) stars[i].className = starClassActive;
          } else {
            printRatingResult(result, i);
            for (i; i < starsLength; ++i)
              stars[i].className = starClassUnactive;
          }
        };
      });
    }
    const comment = document.createElement("p");
    comment.setAttribute("class", "comment");
    document.querySelector("main").appendChild(comment);
    function printRatingResult(result, num = 0) {
      result.textContent = `${num}/5`;

      if (num === 1) {
        comment.innerText = "";
        comment.innerText = "you are mean";
      } else if (num === 2) {
        comment.innerText = "";
        comment.innerText = "sad";
      } else if (num === 3) {
        comment.innerText = "";
        comment.innerText = "thanks";
      } else if (num === 4) {
        comment.innerText = "";
        comment.innerText = "amazing";
      } else if (num === 5) {
        comment.innerText = "";
        comment.innerText = "you are awesome";
      }
    }
    executeRating(ratingStars, ratingResult);
}
}
