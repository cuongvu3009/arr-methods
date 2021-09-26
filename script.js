const main = document.getElementById("main");
const container = document.querySelector(".container");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const sumBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: user.name.title + "." + " " + user.name.first + " " + user.name.last,
    wealth: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//  add new Obj to data array
function addData(obj) {
  data.push(obj);

  updateDom();
}

//  updateDom
function updateDom(providedData = data) {
  //  clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");

    element.innerHTML = `<strong>${item.name}</strong> $ ${formatMoney(
      item.wealth
    )}`;
    main.appendChild(element);
  });
}

//  double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, wealth: user.wealth * 2 };
  });
  updateDom();
}

//  format number as money https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

//  event
doubleBtn.addEventListener("click", (e) => {
  doubleMoney();
});
