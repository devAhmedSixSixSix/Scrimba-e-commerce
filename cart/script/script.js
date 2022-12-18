const cartId = [];
const getDataFromSessionStorge = () => {
  Object.keys(sessionStorage).map((item) => {
    if (parseInt(item)) {
      cartId.push(parseInt(item));
    }
  });
};

getDataFromSessionStorge();

const getCartData = async () => {
  const data = await Promise.all([
    cartId.map((item) => {
      fetch(`https://dummyjson.com/products/${item}`)
        .then((data) => data.json())
        .then((setData) => printData(setData));
    }),
  ]);
};
getCartData();

const printData = (setData) => {
  const itemDiv = document.querySelector(".items");
  itemDiv.innerHTML += `
  <div class="row d-flex align-items-center gap-4 mb-4 border rounded p-2 ps-4" id="${
    setData.id
  }">      
          <div class="col-sm-12 col-lg-3 ps-0">
              <img src="${
                setData.thumbnail
              }" class="d-block w-100 h-100 rounded" alt="test">
          </div>
          <div class="col-sm-12 col-lg-3 ">
              <h5>${setData.title}</h5>
              <h6 class="text-muted">${setData.brand}</h6>
              <h6 class="text-muted">${setData.category}</h6>
              <h6 class="d-inline price">$${
                Math.round(
                  Math.abs(
                    (setData.price / 100) * setData.discountPercentage -
                      setData.price
                  ) * 100
                ) / 100
              }</h6>
          <p class="text-decoration-line-through d-inline">$${setData.price}</p>
              <button onclick="removeItemFromCart(${
                setData.id
              })" class="btn btn-danger">REMOVE
                  ITEM</button>
      </div>
  </div>
  `;
};

const getItemsPrices = () => {
  const priceArr = [];
  const summaryCard = document.querySelector(".summary-Card");
  const prices = document.querySelectorAll(".price");
  prices.forEach((item) => {
    priceArr.push(parseInt(item.innerHTML.substring(1)));
  });
  if (priceArr.length > 1) {
    priceArr.reduce((a, b) => {
      summaryCard.innerHTML = `
    <p>Sup-total: $${a + b}</p>
    <hr />
    <p>Flat shipping rate: $22</p>
    <hr />
    <p>total: $${a + b + 22}</p>
  `;
    });
  } else {
    summaryCard.innerHTML = `
    <p>Sup-total: $${priceArr[0]}</p>
    <hr />
    <p>Flat shipping rate: $22</p>
    <hr />
    <p>total: $${priceArr[0] + 22}</p>
  `;
  }
};

setTimeout(function () {
  getItemsPrices();
}, 2000);

if (cartId.length <= 0) {
  document.querySelector(".empty").style.display = "block";
  document.querySelector(".cart-items").style.display = "none";
} else {
  document.querySelector(".empty").style.display = "none";
  document.querySelector(".cart-items").style.display = "block";
}

const removeItemFromCart = (id) => {
  const itemId = document.getElementById(`${id}`);
  itemId.parentNode.removeChild(itemId);
  sessionStorage.removeItem(id);
  location.reload();
};
