// JavaScript code for event enrollment and capacities
let database = [
  {
    name: "Tod",
    year: 7,
    events: ["800m", "Heat1_800m", "High Jump", "Heat1_High Jump"], // Pre-determined events for Tod
  },
  {
    name: "John",
    year: 9,
    events: ["400m", "Heat1_400m", "100m", "Heat1_100m"], // Pre-determined events for John
  },
  {
    name: "Alice",
    year: 11,
    events: ["Long Jump", "Heat1_Long Jump", "Novelty", "Heat1_Novelty"], // Pre-determined events for Alice
  },
  {
    name: "Michael",
    year: 8,
    events: [], // Pre-determined events for Michael (empty array means none enrolled)
  },
  {
    name: "Emily",
    year: 12,
    events: ["800m", "Heat1_800m", "High Jump", "Heat1_High Jump", "Long Jump", "Heat1_Long Jump"], // Pre-determined events for Emily
  },
  {
    name: "William",
    year: 10,
    events: [], // Pre-determined events for William (empty array means none enrolled)
  },
];



// Function to enroll a participant for an event
function enrollParticipant(eventName) {
  // Check if there are available slots for the event
  if (eventsDatabase[eventName] > 0) {
    // If there are available slots, decrement the count and return true (success)
    eventsDatabase[eventName]--;
    return true;
  } else {
    // If there are no available slots, return false (failure)
    return false;
  }
}

// Function to unenroll a participant from an event
function unenrollParticipant(eventName) {
  // Check if there are participants already enrolled for the event
  if (eventsDatabase[eventName] < 8) {
    // If there are participants, increment the count and return true (success)
    eventsDatabase[eventName]++;
    return true;
  } else {
    // If there are already 8 participants (full capacity), return false (failure)
    return false;
  }
}

// Function to handle the change of a checkbox (enrolling/unenrolling a participant for an event)
function handleCheckboxChange(event) {
  // Get the event name from the parent element of the checkbox
  const eventName = event.target.parentElement.textContent.trim().slice(0, -1);
  
  // Get the status of the checkbox (checked/unchecked)
  const isChecked = event.target.checked;
  
  // Get the selected name from the dropdown list
  const selectedName = document.getElementById("select-aa5a").value;
  
  // Find the person with the selected name in the database
  const person = database.find((person) => person.name === selectedName);

  // If the selected name is not found in the database, show an alert and exit the function
  if (!person) {
    alert("Please select a valid name from the dropdown.");
    return;
  }

  // If the checkbox is checked (enroll participant)
  if (isChecked) {
    // Attempt to enroll the participant for the event and show a success or failure alert
    if (enrollParticipant(eventName)) {
      alert(`Enrolled in ${eventName}`);
    } else {
      // If enrollment failed (event is full), uncheck the checkbox and show a failure alert
      event.target.checked = false;
      alert(`Sorry, ${eventName} is full.`);
    }
  } else {
    // If the checkbox is unchecked (unenroll participant)
    // Attempt to unenroll the participant from the event and show a success or failure alert
    if (unenrollParticipant(eventName)) {
      alert(`Unenrolled from ${eventName}`);
    } else {
      // If unenrollment failed (no participants to unenroll), check the checkbox again and show a failure alert
      event.target.checked = true;
      alert(`Cannot unenroll from ${eventName}`);
    }
  }
}


// Attach event listeners to the labels surrounding the checkboxes
const labels = document.querySelectorAll("label.u-text-4");
labels.forEach((label) => {
  const checkbox = label.querySelector('input[type="checkbox"]');
  label.addEventListener("click", (event) => {
    checkbox.checked = !checkbox.checked;
    handleCheckboxChange(event);
  });
});

// Function to group names by year from the database
function groupNamesByYear(selectedYear) {
  const groupedNames = {};

  database.forEach((person) => {
    const { name, year } = person;

    if (year === selectedYear) {
      if (groupedNames[year]) {
        groupedNames[year].push(name);
      } else {
        groupedNames[year] = [name];
      }
    }
  });

  return groupedNames;
}

// Function to populate the name dropdown with options based on the selected year
function populateNameDropdown(selectedYear) {
  const groupedNames = groupNamesByYear(selectedYear);
  const dropdown = document.getElementById("select-aa5a");

  dropdown.innerHTML = ""; // Clear existing options

  if (groupedNames[selectedYear]) {
    groupedNames[selectedYear].forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      dropdown.appendChild(option);
    });
  }
}

// Function to update the year dropdown with the years from the database
function populateYearDropdown() {
  const years = Array.from(new Set(database.map((person) => person.year))); // Get unique years
  const dropdown = document.getElementById("select-e4f9");

  dropdown.innerHTML = ""; // Clear existing options

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `Year ${year}`;
    dropdown.appendChild(option);
  });

  // Trigger the change event manually to populate the name dropdown initially
  const selectedYear = parseInt(dropdown.value); // Convert to a number
  populateNameDropdown(selectedYear);
}

// Call the function to populate the year dropdown initially
populateYearDropdown();

document.getElementById("select-e4f9").addEventListener("change", function () {
  const selectedYear = parseInt(this.value); // Convert to a number
  populateNameDropdown(selectedYear);
});

document.getElementById("enrol-submit").addEventListener("click", function () {
  // Get the value of the input field (student name)
  const studentName = document.getElementById("text-2be8").value;

  if (!studentName.trim()) {
    // Empty name, display an error or do not proceed
    console.error("Please enter a valid name.");
    return;
  }

  // Get the selected option value from the year dropdown (year)
  const dropdown = document.getElementById("select-a4d8");
  const selectedYear = parseInt(dropdown.value); // Convert to a number

  // Add the new student to the existing database
  database.push({
    name: studentName,
    year: selectedYear,
    events: [], // Initially, the student is not enrolled in any events
  });

  // Log the updated database
  console.log(database);
});

document.getElementById("enrolled-events-button").addEventListener("click", function () {
  const selectedName = document.getElementById("select-aa5a").value;
  const person = database.find((person) => person.name === selectedName);

  if (!person) {
    alert("Please select a valid name from the dropdown.");
    return;
  }

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Uncheck all checkboxes first
  checkboxes.forEach((checkbox) => (checkbox.checked = false));

  // Check the checkboxes for enrolled events
  person.events.forEach((eventName) => {
    const checkbox = document.querySelector(`input[type="checkbox"][value="${eventName}"]`);
    if (checkbox) checkbox.checked = true;
  });

  // Update the title to show the selected person's name
  const personEventsTitle = document.getElementById("person-events-title");
  personEventsTitle.textContent = `${person.name}'s Events`;
  function updateParticipantEvents() {
    const selectedName = document.getElementById("select-aa5a").value;
    const person = database.find((person) => person.name === selectedName);
  
    if (!person) {
      alert("Please select a valid name from the dropdown.");
      return;
    }
  
    // Get all the checked checkboxes
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    alert(`Updated events for ${person.name}: ${person.events.join(", ")}`);
    // Extract the event values from the checked checkboxes and update the person's events array
    person.events = Array.from(checkedCheckboxes).map((checkbox) => checkbox.value);
  
    
  }
  
  // Add event listener to the "Add Selected Events" button
  document.getElementById("update-events-button").addEventListener("click", function () {
    updateParticipantEvents();
  });

  
  
  // Call the function to update the HTML when the page loads
  updateEventNames();
  function deleteParticipant() {
  const selectedName = document.getElementById("select-aa5a").value;
  const index = database.findIndex((person) => person.name === selectedName);

  if (index.length = 0) {
    alert("Please select a valid name from the dropdown.");
    return;
  }

  // Remove the participant from the database
  database.splice(index, 1);

  // Clear all checkboxes after deleting
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => (checkbox.checked = false));

  // Display a success message
  alert(`Deleted participant: ${selectedName}`);

  // Repopulate the name dropdown after deletion
  populateNameDropdown(parseInt(document.getElementById("select-e4f9").value));
}

// Add event listener to the "Delete Participant" button
document.getElementById("delete-participant-button").addEventListener("click", function () {
  deleteParticipant();
});
});


