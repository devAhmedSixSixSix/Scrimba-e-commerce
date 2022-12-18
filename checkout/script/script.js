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
  <div class="row d-flex align-items-center gap-4 mb-4 border rounded p-3 ps-4" id="${setData.id}">      
          <div class="col-sm-12 col-lg-3 ps-0">
              <img src="${setData.thumbnail}" class="d-block w-100 h-100 rounded" alt="test">
          </div>
          <div class="col-sm-12 col-lg-3 ">
              <h5>${setData.title}</h5>
              <h6 class="text-muted">${setData.brand}</h6>
              <h6 class="text-muted">${setData.category}</h6>
              <h6>$${setData.price}</h6>
              <button onclick="removeItemFromCart(${setData.id})" class="btn btn-danger mb-2">REMOVE
                  ITEM</button>
              <button onclick="" class="btn btn-success">ADD TO CART</button>
      </div>
  </div>
  `;
};

const removeItemFromCart = (id) => {
  const itemId = document.getElementById(`${id}`);
  itemId.parentNode.removeChild(itemId);
  sessionStorage.removeItem(id);
};

if (cartId.length <= 0) {
}
