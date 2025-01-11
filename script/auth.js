// Elements
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');
const body = document.body;

// Open Modal and load the login form
openModalBtn.onclick = function() {
  modal.style.display = 'block';
  body.style.filter = 'blur(10%)';  // Apply a 10% blur effect on the body
  loadLoginForm();
}

// Close Modal
closeModal.onclick = function() {
  modal.style.display = 'none';
  body.style.filter = 'none';  // Remove the blur effect
}

// Function to load login content dynamically from login.html
function loadLoginForm() {
  fetch('login.html')
    .then(response => response.text())
    .then(data => {
      modalContent.innerHTML = data;
      // Attach event listener to show signup form
      document.getElementById('showSignUpBtn').addEventListener('click', loadSignUpForm);
    });
}

// Function to load signup content dynamically from signup.html
function loadSignUpForm() {
  fetch('signup.html')
    .then(response => response.text())
    .then(data => {
      modalContent.innerHTML = data;
      // Attach event listener to show login form
      document.getElementById('showLoginBtn').addEventListener('click', loadLoginForm);
    });
}
// Function to update form fields dynamically based on institution type
function updateFormFields() {
  const institutionType = document.getElementById('institutionType').value; // Get selected institution type
  const dynamicFieldsContainer = document.getElementById('dynamicFields');  // Get container to append fields

  // Clear the current dynamic fields
  dynamicFieldsContainer.innerHTML = '';

  if (institutionType === 'school') {
    // If School is selected, show standard/grade input
    const schoolField = document.createElement('div');
    schoolField.innerHTML = `
      <label for="standard">Standard/Grade:</label>
      <select id="standard" name="standard" required>
        <option value="" disabled selected>Select Standard</option>
        <option value="LKG">LKG</option>
        <option value="UKG">UKG</option>
        <option value="1">1st Grade</option>
        <option value="2">2nd Grade</option>
        <option value="3">3rd Grade</option>
        <option value="4">4th Grade</option>
        <option value="5">5th Grade</option>
        <option value="6">6th Grade</option>
        <option value="7">7th Grade</option>
        <option value="8">8th Grade</option>
        <option value="9">9th Grade</option>
        <option value="10">10th Grade</option>
        <option value="11">11th Grade</option>
        <option value="12">12th Grade</option>
      </select>
    `;
    dynamicFieldsContainer.appendChild(schoolField);
  } else if (institutionType === 'college') {
    // If College is selected, show year of study input
    const collegeField = document.createElement('div');
    collegeField.innerHTML = `
      <label for="yearOfStudy">Year of Study:</label>
      <select id="yearOfStudy" name="yearOfStudy" required>
        <option value="" disabled selected>Select Year</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
        <option value="5">5th Year</option>
      </select>
    `;
    dynamicFieldsContainer.appendChild(collegeField);
  }
}

// Adding event listener to trigger the update function on institution type selection change
document.getElementById('institutionType').addEventListener('change', updateFormFields);
