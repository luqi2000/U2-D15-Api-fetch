const URLParams = new URLSearchParams(window.location.search);

const selectedId = URLParams.get("id");
console.log("SELECTED ID: ", selectedId);

fetch("https://striveschool-api.herokuapp.com/api/product/" + selectedId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzY0NGY4MWI0MjAwMTM5YjI4MGEiLCJpYXQiOjE2NzkwNDYyMTMsImV4cCI6MTY4MDI1NTgxM30.RxYeuOk4I_m-InIxjrQLsaiSDyWW2WUotXDfn3VUgkM"
  }
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      alert("qualcosa e' andato storto");
      throw new Error("qualcosa e' andato storto");
    }
  })

  .then(Data => {
    const { _id, name, description, brand, imageUrl, price } = Data;
    const start = document.getElementById("todo");
    start.innerHTML = "";

    const col = document.createElement("div");
    col.className = "col d-flex";
    col.innerHTML = `
      <div class="card flex-row">
          <img src="${imageUrl}"  class="card-img-top" alt="..." />
      <div class="card-body">
          <h2 class="bg-light py-3 ps-2">Details</h2>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item ps-2"><strong>Nome:</strong> ${name}</li>
                  <li class="list-group-item ps-2"><strong>Brand:</strong> ${brand}</li>
                  <li class="list-group-item ps-2"><strong>Description:</strong> ${description}</li>
                  <li class="list-group-item ps-2"><strong>Price:</strong> ${price}</li>
              </ul>
          <button class="btn btn-success mt-3" onclick="handleClick()">Modifica</button>
      </div>
      </div>`;
    start.appendChild(col);
  })
  .catch(error => console.log(error));

const handleClick = () => {
  // il metodo .assign() sposta l'utente su un'altra pagina, come fosse un href su un <a>
  window.location.assign("back-office.html?id=" + selectedId);
};
