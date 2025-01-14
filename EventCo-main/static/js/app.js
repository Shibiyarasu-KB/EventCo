document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");
  
    document.getElementById("openModalBtn").onclick = () => (modal.style.display = "block");
    document.getElementById("closeModal").onclick = () => (modal.style.display = "none");
  
    document.getElementById("showSignUpBtn").onclick = () => {
      loginForm.style.display = "none";
      signUpForm.style.display = "block";
    };
  
    document.getElementById("showLoginBtn").onclick = () => {
      signUpForm.style.display = "none";
      loginForm.style.display = "block";
    };
  
    document.getElementById("institutionType").addEventListener("change", function () {
      const type = this.value;
      fetch(`/get_form_fields?institutionType=${type}`)
        .then((response) => response.json())
        .then((options) => {
          const dynamicFields = document.getElementById("dynamicFields");
          dynamicFields.innerHTML = "";
  
          if (options.length) {
            const label = document.createElement("label");
            label.textContent = type === "school" ? "Standard/Grade:" : "Year of Study:";
            dynamicFields.appendChild(label);
  
            const select = document.createElement("select");
            select.name = type === "school" ? "standard" : "year";
            select.required = true;
  
            options.forEach((opt) => {
              const option = document.createElement("option");
              option.value = opt;
              option.textContent = opt;
              select.appendChild(option);
            });
  
            dynamicFields.appendChild(select);
          }
        });
    });
  
    function updateCountdown(eventId, eventTime) {
      const countdownElement = document.getElementById(eventId);
  
      function fetchCountdown() {
        fetch(`/get_countdown?eventTime=${eventTime}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.message) {
              countdownElement.textContent = data.message;
              clearInterval(interval);
            } else {
              countdownElement.textContent = `${data.days}d:${data.hours}h:${data.minutes}m:${data.seconds}s`;
            }
          });
      }
  
      fetchCountdown();
      const interval = setInterval(fetchCountdown, 1000);
    }
  
    updateCountdown("countdown1", "2025-01-12T09:00:00");
    updateCountdown("countdown2", "2025-01-15T12:00:00");
  });
  