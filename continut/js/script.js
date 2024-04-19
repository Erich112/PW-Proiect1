window.onload = (event) => {
  getLanguage();
  getLocation();
  getBrowser();
  mountAlbumTable();
};

function getLanguage() {
  const limba = document.getElementById("limba");
  if (navigator.language)
    limba.innerHTML = "Limba browserului: " + navigator.language;
  else limba.innerHTML = "Limba browserului: Nerecunoscuta.";
}

function getLocation() {
  const locatie = document.getElementById("locatie");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locatie.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  locatie.innerHTML =
    "Locația ta este: <br>" +
    "Latitudine: " +
    position.coords.latitude +
    "<br>Longitudine: " +
    position.coords.longitude;
}
function getBrowser() {
  const brouser = document.getElementById("brouser");
  if (navigator.userAgent)
    brouser.innerHTML = "Browser: " + navigator.userAgent;
  else brouser.innerHTML = "Browser: altul";
}

setInterval(getTime, 1000);

function getTime() {
  const d = new Date();
  document.getElementById("timp").innerHTML =
    "Timpul este: " + d.toLocaleTimeString();
}
let nrApasari = 0;
let x1;
let y1;
let x2;
let y2;
function Draw(event) {
  let canvasElem = document.querySelector("canvas");
  let rect = canvasElem.getBoundingClientRect();

  const myCanvas = document.getElementById("desen");
  const culoareContur = document.getElementById("conturColor");
  const culoareForma = document.getElementById("formaColor");
  const ctx = myCanvas.getContext("2d");

  ctx.strokeStyle = culoareContur.value;
  ctx.fillStyle = culoareForma.value;
  ctx.beginPath();

  if (event.buttons == 0 && nrApasari == 0) {
    x1 = event.clientX - rect.left;
    y1 = event.clientY - rect.top;
    nrApasari = 1;
  } else if (event.buttons == 0 && nrApasari == 1) {
    x2 = event.clientX - rect.left;
    y2 = event.clientY - rect.top;
    nrApasari = 0;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.fill();
  }
}
const albums = [];
function renderTabel() {
  const html = String.raw;
  return html`
    <table class="Albums">
      <caption>
        Albumele tale:
      </caption>
      <thead>
        <tr>
          <th>Artist</th>
          <th colspan="2">Album</th>
        </tr>
      </thead>
      <tbody>
        ${albums.map(
          (album) => html`
            <tr style="background-color:${album.color}">
              <td>${album.singer}</td>
              <td>${album.title}</td>
            </tr>
          `
        )}
      </tbody>
    </table>
  `;
}
function mountAlbumTable() {
  const container = document.getElementById("album-table");
  if (!container) {
    return;
  }
  container.innerHTML = renderTabel();
}
function insertAlbum(index) {
  const albumNameCitit = document.getElementById("nalbum");
  const artistNameCitit = document.getElementById("nartist");
  const culoareCitita = document.getElementById("albumColor");
  index = document.getElementById("index");
  const album = {
    singer: artistNameCitit.value,
    title: albumNameCitit.value,
    color: culoareCitita.value,
  };
  albums.splice(index.value, 0, album);
  mountAlbumTable();
}

function schimbaContinut(resursa, jsFisier, jsFunctie) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("continut").innerHTML = this.responseText;
      if (jsFisier) {
        var elementScript = document.createElement("script");
        elementScript.onload = function () {
          if (jsFunctie) {
            window[jsFunctie]();
          }
        };
        elementScript.src = jsFisier;
        document.head.appendChild(elementScript);
      } else {
        if (jsFunctie) {
          window[jsFunctie]();
        }
      }
    }
  };
  xhttp.open("GET", resursa + ".html", true);
  xhttp.send();
}

async function updateButton() {
  const jsonlink = "resurse/utilizatori.json";
  const request = new Request(jsonlink);

  const response = await fetch(request);
  const users = await response.json();
  var username = document.getElementById("username").value;
  var password = document.getElementById("pwd").value;
  const paragraph = document.getElementById("status");

  if (username == users[0].utilizator && password == users[0].parola) {
    paragraph.innerHTML = "Autentificare reușită!";
  } else {
    paragraph.textContent =
      "Nume de utilizator sau parolă incorecte. Vă rugăm să încercați din nou.";
  }
}
function RegisterUser(event) {
  var username = document.getElementById("fusername").value;
  var password = document.getElementById("fpwd").value;

  event.preventDefault();
}
