const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = selectedId
  ? "https://striveschool-api.herokuapp.com/api/product/" + selectedId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = selectedId ? "PUT" : "POST";

const handleValidate = () => {
  const form = document.querySelector("form");
  form.classList.add("validated");
};

window.onload = async () => {
  if (selectedId) {
    document.getElementById("subtitle").innerText = " — Modifica appuntamento";
    document.getElementById("delete-btn").classList.remove("d-none");

    try {
      const resp = await fetch(endpoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzY0NGY4MWI0MjAwMTM5YjI4MGEiLCJpYXQiOjE2NzkwNDYyMTMsImV4cCI6MTY4MDI1NTgxM30.RxYeuOk4I_m-InIxjrQLsaiSDyWW2WUotXDfn3VUgkM",
          "Content-Type": "application/json"
        }
      });
      const appointmentData = await resp.json();
      const { name, description, price, brand, imageUrl } = appointmentData;

      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("price").value = price;
      document.getElementById("brand").value = brand;
      document.getElementById("imageUrl").value = imageUrl;

      // modifica aspetto del bottone submit
      const sbmtBtn = document.querySelector("button[type='submit']");
      sbmtBtn.classList.remove("btn-primary");
      sbmtBtn.classList.add("btn-success");
      sbmtBtn.innerText = "Modifica";
    } catch (error) {
      console.log(error);
    }
  }
};

const handleSubmit = async event => {
  event.preventDefault();
  const newAppointment = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,

    brand: document.getElementById("brand").value,

    imageUrl: document.getElementById("imageUrl").value
  };

  console.log("HERE ON SUBMIT", newAppointment);

  try {
    isLoading(true);

    const resp = await fetch(endpoint, {
      method,
      body: JSON.stringify(newAppointment),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzY0NGY4MWI0MjAwMTM5YjI4MGEiLCJpYXQiOjE2NzkwNDYyMTMsImV4cCI6MTY4MDI1NTgxM30.RxYeuOk4I_m-InIxjrQLsaiSDyWW2WUotXDfn3VUgkM",
        "Content-Type": "application/json"
      }
    });

    if (resp.ok) {
      const newAppObj = await resp.json();
      if (selectedId) {
        alert("Risorsa con l'id " + newAppObj._id + ", modificata con successo");
      } else {
        alert("Risorsa con l'id " + newAppObj._id + ", creata con successo");
      }
    } else {
      throw new Error("La richiesta non è andata a buon fine");
    }
  } catch (error) {
    alert(error);
  } finally {
    isLoading(false);
  }
};

//bottone delete visibile solo nel momento in cui vado a fare una modifica
const handleDelete = async () => {
  isLoading(true);
  const hasAccepted = confirm("Sei convinto di voler eliminare il prodotto?");
  if (hasAccepted) {
    try {
      console.log("DELETE");
      const resp = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzY0NGY4MWI0MjAwMTM5YjI4MGEiLCJpYXQiOjE2NzkwNDYyMTMsImV4cCI6MTY4MDI1NTgxM30.RxYeuOk4I_m-InIxjrQLsaiSDyWW2WUotXDfn3VUgkM",
          "Content-Type": "application/json"
        }
      });
      const deletedObj = await resp.json();

      alert("Hai eliminato il prodotto " + deletedObj.name);
      window.location.assign("homepage.html");
    } catch (error) {
      console.log(error);
    } finally {
      isLoading(false);
    }
  }
};

const isLoading = loadingState => {
  const spinner = document.querySelector(".spinner-border");
  if (loadingState) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
