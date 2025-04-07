// Initialize EmailJS with your public key
emailjs.init("VhsxF73kIU4WxMqvS"); // Direct initialization with public key

// Handle form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const submitButton = document.getElementById("submit-btn");
    const statusElement = document.getElementById("status");

    // Basic form validation
    const email = form.email.value;
    const fullname = form.fullname.value;
    const message = form.message.value;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      statusElement.classList.remove("hidden");
      statusElement.textContent = "Please enter a valid email address.";
      return;
    }

    // Validate name and message aren't too short
    if (fullname.length < 2) {
      statusElement.classList.remove("hidden");
      statusElement.textContent = "Please enter your full name.";
      return;
    }

    if (message.length < 10) {
      statusElement.classList.remove("hidden");
      statusElement.textContent =
        "Please enter a message (at least 10 characters).";
      return;
    }

    // Disable button and show sending message
    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";

    statusElement.classList.remove("hidden");
    statusElement.textContent = "Sending your message...";

    // Prepare the template data (match variable names in EmailJS template)
    const templateParams = {
      from_name: fullname,
      reply_to: email,
      message: message,
    };

    // Send the email using the updated sendForm method
    emailjs
      .send("service_e7jfz98", "template_nc7mj03", templateParams)
      .then(function (response) {
        // Success handling
        statusElement.textContent =
          "Message sent successfully! I'll get back to you soon.";
        statusElement.className = "status-success"; // Add success styling
        form.reset();
      })
      .catch(function (error) {
        console.error("EmailJS Error:", error);
        statusElement.textContent =
          "Something went wrong sending your message. Please try again or contact me directly at contact@yousseffjel.com";
        statusElement.className = "status-error"; // Add error styling
      })
      .finally(function () {
        submitButton.disabled = false;
        submitButton.innerHTML = "Send";

        // Hide status message after success (but not after error)
        if (statusElement.className === "status-success") {
          setTimeout(function () {
            statusElement.className = "hidden";
          }, 5000);
        }
      });
  });
