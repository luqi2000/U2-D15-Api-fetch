fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
  .then(body => {
    const start = document.getElementById("todo");
    start.innerHTML = "";
    body.forEach(data => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
      col.innerHTML = `
            <div class="card mt-5">
                <img src="${data.imageUrl}" height="200" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">
                Price: ${data.price} pound
                </p>
            <a href="details.html?id=${data._id}" class="btn btn-primary">Scopri di piu' </a>
            </div>
             </div>`;
      start.appendChild(col);
    });
  })
  .catch(error => console.log(error));
