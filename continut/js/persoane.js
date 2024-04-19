function incarcaPersoane() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      XML2Tabel(this);
    }
  };
  xhttp.open("GET", "resurse/persoane.xml", true);
  xhttp.send();
}
function XML2Tabel(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table =
    "<table><tr><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Studii</th><th>Experienta</th></tr>";
  var x = xmlDoc.getElementsByTagName("persoana");
  for (i = 0; i < x.length; i++) {
    table +=
      "<tr><td>" +
      x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("studii")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("experienta")[0].childNodes[0].nodeValue +
      "</td></tr>";
  }
  table += "</table>";
  document.getElementById("pers").innerHTML = table;
}
