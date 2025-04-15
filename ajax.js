const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "ABCDEFxy123"; // <-- Cseréld a sajátodra!

function readData() {
  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "read",
      code: CODE
    })
  })
    .then(res => res.json())
    .then(data => {
      let html = "";
      let sum = 0, max = 0;
      data.list.forEach(item => {
        html += `<p>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}</p>`;
        sum += parseInt(item.height);
        max = Math.max(max, parseInt(item.height));
      });
      const avg = data.list.length ? (sum / data.list.length).toFixed(2) : 0;
      html += `<p><strong>Magasság - Összeg:</strong> ${sum}, <strong>Átlag:</strong> ${avg}, <strong>Max:</strong> ${max}</p>`;
      document.getElementById("output").innerHTML = html;
      const updateIdSelect = document.getElementById("update-id");
updateIdSelect.innerHTML = '<option value="">-- válassz ID-t --</option>';
data.list.forEach(record => {
  const option = document.createElement("option");
  option.value = record.id;
  option.textContent = `ID ${record.id} - ${record.name}`;
  updateIdSelect.appendChild(option);
});
    });
}

function createData() {
  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();

  if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
    alert("Minden mezőt ki kell tölteni (max 30 karakter)!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "create",
      name,
      height,
      weight,
      code: ABCDEFxy123
    })
  })
    .then(res => res.text())
    .then(response => alert("Create válasz: " + response));
}

function getDataForId() {
    const id = document.getElementById("update-id").value;
    if (!id) {
      alert("Válassz ki egy ID-t a frissítéshez!");
      return;
    }
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      body: new URLSearchParams({
        op: "read",
        code: ABCDEFxy123
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Bejövő adatok:", data); // segít hibakeresni
  
      const record = data.list.find(r => r.id == id);
      if (record) {
        document.getElementById("name").value = record.name;
        document.getElementById("height").value = record.height;
        document.getElementById("weight").value = record.weight;
        alert("Adatok betöltve!");
      } else {
        alert("Nem található rekord ezzel az ID-vel (vagy nem a te kódodhoz tartozik).");
      }
    })
    .catch(error => {
      console.error("Hiba a lekérdezés során:", error);
      alert("Hiba történt az adatok lekérésekor.");
    });
  }
  

function updateData() {
  const id = document.getElementById("update-id").value.trim();
  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();

  if (!id || !name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
    alert("Minden mezőt ki kell tölteni (max 30 karakter)!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "update",
      id,
      name,
      height,
      weight,
      code: ABCDEFxy123
    })
  })
    .then(res => res.text())
    .then(response => alert("Update válasz: " + response));
}

function deleteData() {
  const id = document.getElementById("delete-id").value.trim();
  if (!id) return alert("Adj meg egy ID-t!");

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "delete",
      id,
      code: ABCDEFxy123
    })
  })
    .then(res => res.text())
    .then(response => alert("Delete válasz: " + response));
}