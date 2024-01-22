// ====================================
class familyMember {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
const familyMembers = [];

let refreshEntireTableDataPerEdit = false;
const tableRows = [];
const acceptedGenderInputs = [ "Male", "Female", "Other", "Others" ];
// ====================================
// Functions for input validation purposes.
function validateEmptyInput(input, category, suffix = "") {
  if (input === null)
    return null;
  else if (input.trim().length === 0) {
    alert(`The ${category} field cannot be empty${suffix}. Please try again once it is filled.`);
    return null;
  }
  
  return input;
}
// ====================================
// Functions for family data manipulation. (E.g. Add/Modify)
function submitFamilyMemberInfo() {
  // ==================================
  const nameInput = document.getElementById("name");
  const name = nameInput.value;
  if (validateEmptyInput(name, "name", " as it is a required field") === null)
    return;
  // ==================================
  const ageInput = document.getElementById("age");
  if (validateEmptyInput(ageInput.value, "age", " as it is a required field") === null)
    return;
  
  const age = parseInt(ageInput.value);
  if (isNaN(age)) {
    alert("The age input is not a valid number. Please try again.");
    return;
  }
  // ==================================
  const genderInput = document.getElementById("gender");
  let gender = genderInput.value;
  if (validateEmptyInput(gender, "gender", " as it is a required field") === null)
    return;

  gender = gender.slice(0, 1).toUpperCase() + gender.slice(1).toLowerCase();
  if (!acceptedGenderInputs.includes(gender)) {
    alert("The gender field currently only accepts the fields [Male, Female and Others]. Please try again.");
    return;
  }

  // "Other" or "Others" -> Uniform to just "Others".
  if (gender === acceptedGenderInputs[acceptedGenderInputs.length - 2] || 
     gender === acceptedGenderInputs[acceptedGenderInputs.length - 1])
    gender = acceptedGenderInputs[acceptedGenderInputs.length - 1];
  // ==================================
  const newMember = new familyMember(name, age, gender);
  familyMembers.push(newMember);
  // ==================================
  // The Table Rows Refresh Approach. (Based on instructions in slides)
  //refreshEntireTableDataPerEdit = true;
  //reloadFamilyMembers();
  // ==================================
  // The Alternative New Row Insertion Approach.
  refreshEntireTableDataPerEdit = false;
  addNewFamilyMemberRow(newMember);
  // ==================================
}

function addNewFamilyMemberRow(familyMember) {
  const tableElement = document.getElementById("family-members");
  const newRow = tableElement.insertRow();
  tableRows.push(newRow);

  const nameCell = newRow.insertCell();
  nameCell.textContent = familyMember.name;

  const ageCell = newRow.insertCell();
  ageCell.textContent = familyMember.age;

  const genderCell = newRow.insertCell();
  genderCell.textContent = familyMember.gender;

  const actionCell = newRow.insertCell();
  actionCell.innerHTML = `
      <button onclick="changeName(${familyMembers.length - 1})" class="table-buttons">Change Name</button>
      <button onclick="addAge(${familyMembers.length - 1})" class="table-buttons">Add Age</button>
      <button onclick="reduceAge(${familyMembers.length - 1})" class="table-buttons">Reduce Age</button>
      <button onclick="changeGender(${familyMembers.length - 1})" class="table-buttons">Change Gender</button>
  `;
}

function reloadFamilyMembers(index) {
  // The Table Rows Refresh Approach. (Based on instructions in slides)
  if (refreshEntireTableDataPerEdit) {
    const familyList = document.getElementById("family-members").tBodies[0];
    familyList.innerHTML = "";

    for (let i = 0; i < familyMembers.length; ++i) {
      const familyMember = familyMembers[i];
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${familyMember.name}</td>
        <td>${familyMember.age}</td>
        <td>
          <button onclick="changeName(${i})" class="table-buttons">Change Name</button>
          <button onclick="addAge(${i})" class="table-buttons">Add Age</button>
          <button onclick="reduceAge(${i})" class="table-buttons">Reduce Age</button>
          <button onclick="changeGender(${i})" class="table-buttons">Change Gender</button>
        </td>
      `;

      familyList.appendChild(row);
    }
  }
  // The Alternative New Row Insertion Approach.
  else {
    const row = tableRows[index];
    
    row.cells[0].textContent = familyMembers[index].name;
    row.cells[1].textContent = familyMembers[index].age;
    row.cells[2].textContent = familyMembers[index].gender;
  }
}

function changeName(index) {
  const oldName = familyMembers[index].name;
  const name = prompt(`Enter new name for family member [${familyMembers[index].name}]:`);
  if (validateEmptyInput(name, "name") === null)
    return;

  familyMembers[index].name = name;
  reloadFamilyMembers(index);
  alert(`${oldName} has been successfully renamed to ${name}!`);
}

function addAge(index) {
  ++familyMembers[index].age;
  reloadFamilyMembers(index);
}

function reduceAge(index) {
  if (familyMembers[index].age > 1) {
    --familyMembers[index].age;
    reloadFamilyMembers(index);
  }
}

function changeGender(index) {
  let gender = prompt(`Enter new gender for family member [${familyMembers[index].name}]:`);
  if (validateEmptyInput(gender, "gender") === null)
    return;

  gender = gender.slice(0, 1).toUpperCase() + gender.slice(1).toLowerCase();
  if (!acceptedGenderInputs.includes(gender)) {
    alert("The gender field currently only accepts the fields [Male, Female and Others]. Please try again.");
    return;
  }

  // "Other" or "Others" -> Uniform to just "Others".
  if (gender === acceptedGenderInputs[acceptedGenderInputs.length - 2] || 
     gender === acceptedGenderInputs[acceptedGenderInputs.length - 1])
    gender = acceptedGenderInputs[acceptedGenderInputs.length - 1];

  familyMembers[index].gender = gender;
  reloadFamilyMembers(index);
  alert(`[${familyMembers[index].name}]'s gender has been successfully changed to ${gender}!`);
}
// ====================================