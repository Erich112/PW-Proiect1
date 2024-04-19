class Produs {
  constructor(name, qty, id) {
    this.name = name;
    this.qty = qty;
    this.id = id;
  }
}
let cart = [];
let nrProduse = 0;
function shopping() {
  var pname = document.getElementById("product-name").value;
  var pqty = document.getElementById("product-qty").value;
  const paragraph = document.getElementById("cos");
  nrProduse++;

  if (window.Worker) {
    const myWorker = new Worker("js/worker.js");

    myWorker.onmessage = function (e) {
      result.textContent = e.data;
      console.log("Message received from worker");
    };
  } else {
    console.log("Your browser doesn't support web workers.");
  }

  const product = new Produs(pname, pqty, nrProduse);
  localStorage.setItem(pname, pqty);
  cart.splice(0, 0, product);
  paragraph.textContent = "";
  for (let i = 0; i < cart.length; i++) {
    paragraph.innerHTML +=
      cart[i].id + ". " + cart[i].name + " : " + cart[i].qty + " bucati<br>";
  }
}
