let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = -1;

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    contactList.innerHTML += `
      <tr>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>
          <button onclick="editContact(${index})">Edit</button>
          <button onclick="deleteContact(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addContact() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) return alert("Please enter both name and phone.");

  if (editIndex === -1) {
    contacts.push({ name, phone });
  } else {
    contacts[editIndex] = { name, phone };
    editIndex = -1;
    document.querySelector("button").textContent = "Add Contact";
  }

  saveContacts();
  renderContacts();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
}

function editContact(index) {
  const contact = contacts[index];
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;

  editIndex = index;
  document.querySelector("button").textContent = "Update Contact";
}

function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  }
}

renderContacts();
