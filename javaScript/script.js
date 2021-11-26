let imgsData = new XMLHttpRequest();

imgsData.open("GET", "javaScript/imgData.json", true);
imgsData.onload = function () {
  const allData = JSON.parse(imgsData.responseText);
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      if (id === "All") data = allData;
      else data = allData.filter((e) => e.category === id);
      setData(data);
    });
  });
  setData(allData);
};
imgsData.send();

function setData(data) {
  const imgsGallery = document.querySelector(".imgs-gallery");

  imgsGallery.innerHTML = data
    .map((img) => {
      return `<div class="col-6 col-md-4">
      <div class="card mb-4 shadow-sm">
      <a>
        <img class="bd-placeholder-img card-img-top" width="100%" height="100%"  class="card rounded mx-auto d-block" src="${img.src}" />
        <div class="card-body">
          <h6 class="card-text">${img.title}</h6>
        </div>
      </a>
      </div>
    </div>`;
    })
    .join("");

  const main = document.querySelector(".main");
  const imgs = document.querySelectorAll(".card");
  const showImg = document.querySelector(".show-img");
  const showImgContent = document.querySelector(".show-img-content");

  let currentItem = 0;

  function showItem(index) {
    currentItem = index;
    const item = data[currentItem];
    const bName = document.querySelector(".name-burger");
    const sImg = document.querySelector(".s-img");
    const text = document.querySelector(".show-img-content .text");
    const properties = document.querySelector(".properties");
    showImg.classList.add("show");
    bName.innerHTML = item.title;
    sImg.innerHTML = `<img class='gallery-img' src="${item.src}" />`;
    text.innerHTML = item.text;
    properties.innerHTML = `<h6>Price: <span class="green">${item.price}$</span></h6>
                        <h6>Chef: <span class="green">${item.chef}</span></h6>
                        <h6>Category: <span class="green">${item.category}</span></h6>`;
    const height = showImgContent.getBoundingClientRect().height;
    showImg.style.height = `${height}px`;
    main.style.height = `${height}px`;
    main.style.overflow = "hidden";
  }

  imgs.forEach((img, index) => {
    img.addEventListener("click", () => {
      showItem(index);
    });
  });

  const arrowLeft = document.querySelector(".fa-long-arrow-alt-left");
  const arrowRight = document.querySelector(".fa-long-arrow-alt-right");

  arrowRight.addEventListener("click", () => {
    currentItem++;
    if (currentItem === data.length) currentItem = 0;
    showItem(currentItem);
  });

  arrowLeft.addEventListener("click", () => {
    currentItem--;
    if (currentItem < 0) currentItem = data.length - 1;
    showItem(currentItem);
  });

  const closeIcon = document.querySelector(".show-img-content .fa-times");
  closeIcon.addEventListener("click", () => {
    showImg.classList.remove("show");
    main.style.height = "100%";
  });
}

const dateObj = ["days", "hours", "mins", "secs"];

const months = [
  "Junuary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector(".deadline");
const row = document.querySelector(".row");
row.innerHTML = dateObj
  .map((e) => {
    return `<div class="deadline-format pt-2 px-3 ml-3 bg-success ">
          <h6>0</h6>
          <p>${e}</p>
        </div>`;
  })
  .join("");

const futureDate = new Date(2021, 11, 3, 8, 39);
let year = futureDate.getFullYear();
let month = months[futureDate.getMonth()];
let date = futureDate.getDate();
let weekday = weekdays[futureDate.getDay()];
let hours = futureDate.getHours();
let mins = futureDate.getMinutes();

const givaway = document.querySelector(".givaway");
givaway.innerHTML =
  givaway.innerHTML = `Offer ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${mins}`;

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const timeLeft = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  const days = Math.floor(timeLeft / oneDay);
  const hours = Math.floor((timeLeft % oneDay) / oneHour);
  const mins = Math.floor((timeLeft % oneHour) / oneMin);
  const secs = Math.floor((timeLeft % oneMin) / 1000);

  let values = [days, hours, mins, secs];

  function format(item) {
    if (item < 10) {
      return `0${item}`;
    }
    return item;
  }

  const items = document.querySelectorAll(".deadline-format h6");
  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if (timeLeft < 0) {
    clearInterval(contDow);
    deadline.innerHTML = `<h4 class='green'>sorry this givaway are expend</h4>`;
  }
}

const contDow = setInterval(getRemainingTime, 1000);
getRemainingTime();
