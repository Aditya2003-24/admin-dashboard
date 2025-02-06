function saveRow(id){
  let name = document.getElementById(`nm-${id}`).value;
  let ro = document.getElementById(`ro-${id}`).value;
  let int = document.getElementById(`in-${id}`).value;
  let out = document.getElementById(`out-${id}`).value;
  
  let url =`http://localhost:3000/customer/${id}`;
  fetch(url, {
    method: 'PUT',
    body:JSON.stringify({   //object ka data string me conwort karta hai
     "name": name,
      "room": ro,
      "checkIn": int,
      "checkOut": out
    }),
    headers:{
      "Content-type":"application/json;charset=utf-8",
    },
  })
  .then((Response) => {
  
if(Response.ok){
  alert("Data update successfully");
  dataShow();
}else{
  throw new Error("Error while updating");
}
  })
  .catch((error)=>{
    console.log(error);
  }); 
}

function editRow(id){
  document.getElementById(`nm-${id}`).removeAttribute('readonly');
  document.getElementById(`ro-${id}`).removeAttribute('readonly');
  document.getElementById(`in-${id}`).removeAttribute('readonly');
  document.getElementById(`out-${id}`).removeAttribute('readonly');
 
  document.getElementById(`edit-${id}`).style.display="none";
  document.getElementById(`save-${id}`).style.display="inline";
}




function myrecordRemove(id) {
let url = `http://localhost:3000/customer/${id}`;

fetch(url, {
  method: "DELETE",
});
alert("record deleted");
// .then((data) => {
//   console.log(data);
//   return data.json();
// })
// .then((y) => {
//   console.log(y);
//   alert("Record deleted successfully");
// });
}

document.getElementById("btn").addEventListener("click", dataShow);
async function dataShow() {
let mytable = `
   <table id="tab">
     <tr>
     <th>name</th>
     <th>room</th>
     <th>checkin</th>
     <th>checkout</th>
     <th>edit</th>
     <th>delete</th>
     </tr>
  `;

let url = "http://localhost:3000/customer";

let myobj = await fetch(url);
console.log(myobj);

let mydata = await myobj.json();
console.log(mydata);

mydata.map((key) => {
  // eno-c291 , nm-8ae6, city-8ae6,salary-8ae6 ,  myrecremove(8ae6)

  mytable += `
   <tr>
   <td><input type="text" value="${key.name}" id="nm-${key.id}" readonly></td>
   <td><input type="text" value="${key.room}" id="ro-${key.id}" readonly></td>
   <td><input type="text" value="${key.checkin}" id="in-${key.id}" readonly></td>
   <td><input type="text" value="${key.checkout}" id="out-${key.id}" readonly></td>
   <td>

   <a href="#" onclick="editRow('${key.id}')" id="edit-${key.id}" class="button button-edit">Edit</a>
   <a href="#" onclick="saveRow('${key.id}')" id="save-${key.id}" class="button button-save" style="display:none">Save</a>
   </td>
   <td>   <a href="#" onclick="myrecordRemove('${key.id}')" class="edi">Delete</a></td>
   </tr>
  `;
});

mytable += "</table>";
document.getElementById("demo").innerHTML = mytable;
}
dataShow();
