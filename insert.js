

document.getElementById("btn").addEventListener("click", () => {
  // Check karein ki user logged in hai ya nahi
  if (!localStorage.getItem("userLoggedIn")) {
    alert("Please login first!");
    return;
  }

  dataInsert(); // Agar user logged in hai, toh dataInsert() call karein
});

async function dataInsert() {
  let api = "http://localhost:3000/customer";

  // Pehle check karein ki data pehle se hai ya nahi
  const checkResponse = await fetch(api);
  const existingData = await checkResponse.json();

  if (existingData.length > 0) {
    alert("Data already exists! New data cannot be inserted.");
    return; // Function yahin ruk jayega agar data pehle se hai
  }

  // Agar data nahi hai toh naya data insert karein
  let rno = document.getElementById("nm").value;
  let nm = document.getElementById("ro").value;
  let city = document.getElementById("in").value;
  let fees = document.getElementById("out").value;

  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": rno,
      "room": nm,
      "checkin": city,
      "checkout": fees,
    }),
  });

  if (response.ok) {
    alert("Data saved successfully!");
  } else {
    alert("Error saving data!");
  }
}

// Login function
function loginUser() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    // Change credentials as needed
    localStorage.setItem("userLoggedIn", "true"); // Set login status
    alert("Login successful!");
  } else {
    alert("Invalid credentials!");
  }
}

// Logout function
function logoutUser() {
  localStorage.removeItem("userLoggedIn"); // Remove login status
  alert("Logged out successfully!");
  // checkLoginStatus();
}

// function checkLoginStatus() {
//   let isLoggedIn = localStorage.getItem("userLoggedIn");
//   let btn = document.getElementById("btn");

//   if (isLoggedIn) {
//     btn.disabled = false; // Agar logged in hai toh button enable karein
//     btn.style.opacity = "1"; // Normal appearance
//   } else {
//     btn.disabled = true; // Agar logged out hai toh button disable karein
//     btn.style.opacity = "0.5"; // Light appearance to show it's disabled
//   }
// }
