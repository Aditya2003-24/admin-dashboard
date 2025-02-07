async function dataShow() {
  let mytable = `
       <table id="tab">
         <tr>
         <th>Name</th>
         <th>Room</th>
         <th>Check-in</th>
         <th>Check-out</th>
         <th>Edit</th>
         <th>Delete</th>
         </tr>
      `;

  let url = "http://localhost:3000/customer";

  try {
    let response = await fetch(url);
    let mydata = await response.json();

    mydata.forEach((key) => {
      mytable += `
               <tr>
               <td><input type="text" value="${key.name}" id="nm-${key.id}" readonly></td>
               <td><input type="text" value="${key.room}" id="ro-${key.id}" readonly></td>
               <td><input type="text" value="${key.checkIn}" id="in-${key.id}" readonly></td>
               <td><input type="text" value="${key.checkOut}" id="out-${key.id}" readonly></td>
               <td>
                   <a href="#" onclick="editRow('${key.id}')" id="edit-${key.id}" class="button button-edit">Edit</a>
                   <a href="#" onclick="saveRow('${key.id}')" id="save-${key.id}" class="button button-save" style="display:none">Save</a>
               </td>
               <td>
                   <a href="#" onclick="myrecordRemove('${key.id}')" class="edi">Delete</a>
               </td>
               </tr>
            `;
    });

    mytable += "</table>";
    document.getElementById("demo").innerHTML = mytable;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error loading data!");
  }
}

// Function to enable editing
function editRow(id) {
  document.getElementById(`nm-${id}`).removeAttribute("readonly");
  document.getElementById(`ro-${id}`).removeAttribute("readonly");
  document.getElementById(`in-${id}`).removeAttribute("readonly");
  document.getElementById(`out-${id}`).removeAttribute("readonly");

  document.getElementById(`edit-${id}`).style.display = "none";
  document.getElementById(`save-${id}`).style.display = "inline";
}

// Function to save edited data
async function saveRow(id) {
  let name = document.getElementById(`nm-${id}`).value;
  let ro = document.getElementById(`ro-${id}`).value;
  let int = document.getElementById(`in-${id}`).value;
  let out = document.getElementById(`out-${id}`).value;

  let url = `http://localhost:3000/customer/${id}`;

  try {
    let response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        room: ro,
        checkIn: int,
        checkOut: out,
      }),
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
    });

    if (response.ok) {
      alert("Data updated successfully");
      await dataShow(); 
    } else {
      throw new Error("Error while updating");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to update data!");
  }
}


function myrecordRemove(id) {
  fetch(`http://localhost:3000/customer/${id}`,{

    method: "DELETE" })

    .then(res=>alert("data delete"))

    }

document.getElementById("btn").addEventListener("click", async function () {
  document.getElementById("btn").disabled = true; 
  await dataShow();
  document.getElementById("btn").disabled = false; 
});


dataShow();
