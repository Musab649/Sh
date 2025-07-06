let users = [{ id: "100", name: "Admin", role: "admin", site: "غياثي" }];
let sites = ["غياثي"];
let animals = ["خروف", "ماعز"];
let cuttings = ["عزيمة"];
let prices = {};
let invoices = [];
let currentUser = null;
let invoiceCounter = 1;

window.onload = () => {
  showSection("splash");
  setTimeout(() => showSection("login"), 2000);
  fillSelects();
  updateClock();
  setInterval(updateClock, 1000);
};

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function updateClock() {
  document.getElementById("clock").innerText = new Date().toLocaleString("ar-EG");
}

function fillSelects() {
  fillSelect("animalType", animals);
  fillSelect("cuttingType", cuttings);
  fillSelect("priceAnimal", animals);
  fillSelect("priceCutting", cuttings);
  fillSelect("animalNumber", Array.from({ length: 20 }, (_, i) => i + 1));
  fillSelect("stickerNumber", Array.from({ length: 50 }, (_, i) => i + 1));
  fillSelect("quantity", Array.from({ length: 20 }, (_, i) => i + 1));
  refreshSites();
}

function fillSelect(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  items.forEach(v => {
    let o = document.createElement("option");
    o.textContent = v; o.value = v; el.appendChild(o);
  });
}

function login() {
  const id = document.getElementById("employeeId").value;
  const user = users.find(u => u.id === id);
  if (!user) return alert("غير موجود");
  currentUser = user;
  document.getElementById("username").innerText = user.name;
  document.getElementById("dataEntrySiteTitle").innerText = user.role === "admin" ? "جميع المواقع" : `الموقع: ${user.site}`;
  updateInvoiceNumber();
  showSection("dashboard");
}

function closeProgram() { alert("شكراً لاستخدامك النظام"); }

function logout() { showSection("login"); }

function addSite() {
  let s = document.getElementById("newSite").value;
  if (s && !sites.includes(s)) sites.push(s);
  refreshSites(); document.getElementById("newSite").value = "";
}

function refreshSites() {
  let list = document.getElementById("sitesList");
  list.innerHTML = "";
  sites.forEach(s => { let li = document.createElement("li"); li.innerText = s; list.appendChild(li); });
  let sel = document.getElementById("newUserSite");
  sel.innerHTML = "";
  sites.forEach(s => { let o = document.createElement("option"); o.value = s; o.innerText = s; sel.appendChild(o); });
}

function addAnimal() {
  let a = document.getElementById("newAnimal").value;
  if (a && !animals.includes(a)) animals.push(a);
  fillSelects();
  document.getElementById("newAnimal").value = "";
}

function addCutting() {
  let c = document.getElementById("newCutting").value;
  if (c && !cuttings.includes(c)) cuttings.push(c);
  fillSelects();
  document.getElementById("newCutting").value = "";
}

function setPrice() {
  let a = document.getElementById("priceAnimal").value;
  let c = document.getElementById("priceCutting").value;
  let p = parseFloat(document.getElementById("priceValue").value);
  prices[`${a}_${c}`] = p;
  alert("تم");
}

function updatePrice() {
  let key = `${document.getElementById("animalType").value}_${document.getElementById("cuttingType").value}`;
  let unit = prices[key] || 0;
  let qty = parseInt(document.getElementById("quantity").value) || 1;
  document.getElementById("unitPrice").value = unit;
  document.getElementById("totalPrice").value = unit * qty;
}

function addUser() {
  let id = document.getElementById("newUserId").value;
  let name = document.getElementById("newUserName").value;
  let role = document.getElementById("newUserRole").value;
  let site = document.getElementById("newUserSite").value;
  users.push({ id, name, role, site });
  refreshUsers();
}

function refreshUsers() {
  let tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";
  users.forEach((u, i) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${u.id}</td><td>${u.name}</td><td>${u.role}</td><td>${u.site}</td><td><button onclick="deleteUser(${i})">حذف</button></td>`;
    tbody.appendChild(tr);
  });
}

function deleteUser(i) { users.splice(i, 1); refreshUsers(); }

function updateInvoiceNumber() {
  document.getElementById("invoiceNumber").value = invoiceCounter++;
}

function saveData() {
  let t = document.querySelector("#reportTable tbody");
  let row = `<tr>
    <td>${currentUser.site}</td>
    <td>${document.getElementById("clientName").value}</td>
    <td>${document.getElementById("phone").value}</td>
    <td>${document.getElementById("invoiceNumber").value}</td>
    <td>${document.getElementById("animalType").value}</td>
    <td>${document.getElementById("cuttingType").value}</td>
    <td>${document.getElementById("quantity").value}</td>
    <td>${document.querySelector("input[name='paymentType']:checked").value}</td>
    <td>${document.getElementById("unitPrice").value}</td>
    <td>${document.getElementById("totalPrice").value}</td>
  </tr>`;
  t.innerHTML += row; updateInvoiceNumber();
}
