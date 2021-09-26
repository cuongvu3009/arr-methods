const main = document.getElementById("main");
const container = document.querySelector(".container");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const sumBtn = document.getElementById("calculate-wealth");

let data = [];

const fetchApi = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = {
    name: data.results[0].name.first + " " + data.results[0].name.last,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(user);
};

//  add user to data
function addData(obj) {
  data.push(obj);
  updateUi();
}

//  double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateUi();
}

//  showMillionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateUi();
}

//  sort by richests
function sort() {
  data.sort((a, b) => a.money - b.money);
  updateUi();
}

//  sum money
function sumMoney() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//  updateUi
function updateUi(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//  events
addUserBtn.addEventListener("click", fetchApi);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sort);
sumBtn.addEventListener("click", sumMoney);
