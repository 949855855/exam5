const root = document.querySelector(".row");
const api = "https://restcountries.com/v3.1/all";
const input = document.querySelector(".input");
let data = [];

let modeBtn = document.getElementById("mode-btn");

const filteGyRegion = document.querySelector ('fade-left')

modeBtn.addEventListener("click", function () {
  if (document.body.className != "dark") {
    this.firstElementChild.src = "images/light.svg";
  } else {
    this.firstElementChild.src = "images/dark.svg";
  }
  document.body.classList.toggle("dark");
});

async function fetchApi(url) {
  try {
    let response = await fetch(url);
    if (response.status === 200) {
      data = await response.json();
      renderData(data);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}
fetchApi(api);

function renderData(e) {
  root.textContent = "";
  if (e.length) {
    const fragment = document.createDocumentFragment();
    e.slice(0, 12).forEach((element) => {
      console.log(element);
      const cart = document.createElement("div");
      cart.className = "card";
      cart.innerHTML = `
      <img class='card-img-top' src=${element?.flags.png} alt="njjj"/>
        <div class='card-body'>
        <h1 class="card-title">${element.name.common}</h1>
        <h3>Population: <i>${element.population}</i></h3>
          <h3 class="middle">
          region: <i>${element.region}</i></h3>
          <h3>capital: <i>${element.capital}</i></h3>

        </div>
      `;
      fragment.appendChild(cart);
    });
    root.appendChild(fragment);
  }
}

input.addEventListener("input", (e) => {
  let searchData = data.filter((element) =>
    element.name.common.toLowerCase().includes(input.value.toLowerCase())
  );
  console.log(searchData);
  renderData(searchData);
});



filteGyRegion.addEventListener("change", (e) => {
  e.preventDefault();
  fetch(`https://restcountries.com/v3.1/all/${filteGyRegion.value}`)
  .then((res) => res.json())
  .then((data) => {
    renderCountries (paginate (data, params [1] || limit, params[0] || 1));
  });
});