function showLoginModal() {
    document.getElementById("loginModal").style.display = "block";
  }
  
  function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
  }
  
  function updateOptions() {
    const type = document.getElementById("type").value;
    const dynamicSection = document.getElementById("dynamicSection");
    
    dynamicSection.innerHTML = "";
  
    if (type === "school") {
      const label = document.createElement("label");
      label.textContent = "Standard:";
      dynamicSection.appendChild(label);
  
      const select = document.createElement("select");
      select.name = "standard";
      select.required = true;
  
      const options = ["LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => i + 1)];
      options.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });
  
      dynamicSection.appendChild(select);
    } 
    else if (type === "college") {
      const label = document.createElement("label");
      label.textContent = "Year:";
      dynamicSection.appendChild(label);
  
      const select = document.createElement("select");
      select.name = "year";
      select.required = true;
  
      const years = [1, 2, 3, 4, 5];
      years.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = `Year ${value}`;
        select.appendChild(option);
      });
  
      dynamicSection.appendChild(select);
    }
  }
// Function to update the countdown
function updateCountdown(eventId, eventTime) {
  const countdownElement = document.getElementById(eventId);
  const eventDate = new Date(eventTime);
  
  function calculateTimeRemaining() {
    const now = new Date();
    const timeDiff = eventDate - now;
    
    if (timeDiff <= 0) {
      countdownElement.textContent = "Event Started!";
      clearInterval(interval);
    } else {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      countdownElement.textContent = `${days}d:${hours}h:${minutes}m:${seconds}s`;
    }
  }
  
  calculateTimeRemaining();
  const interval = setInterval(calculateTimeRemaining, 1000);
}

// Initialize countdown for each event
updateCountdown('countdown1', '2025-01-12T09:00:00');
updateCountdown('countdown2', '2025-01-13T10:00:00');

// Add more events with similar logic as needed
