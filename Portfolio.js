// Initialize EmailJS
(function() {
  // Replace with your EmailJS public key
  emailjs.init("nE3Vqg9SVAkIVMcEP");
})();

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show loading state
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Get form data
  const templateParams = {
    from_name: this.querySelector('#from_name').value,
    from_email: this.querySelector('#from_email').value,
    message: this.querySelector('#message').value,
    to_name: 'Sanjai Arivu', // Your name
  };

  // Send email using EmailJS
  emailjs.send('service_vw71lus', 'template_tflt5ow', templateParams)
    .then(() => {
      // Show success message
      showFormMessage('Message sent successfully!', 'success');
      // Reset form
      this.reset();
    })
    .catch((error) => {
      // Show error message
      showFormMessage('Failed to send message. Please try again.', 'error');
      console.error('EmailJS Error:', error);
    })
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

// Function to show form messages
function showFormMessage(message, type) {
  // Remove any existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create and show new message
  const messageElement = document.createElement('div');
  messageElement.className = `form-message ${type}`;
  messageElement.textContent = message;
  
  const form = document.getElementById('contact-form');
  form.insertAdjacentElement('afterend', messageElement);

  // Remove message after 5 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}

// ===== Project Filter Script =====
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      const category = card.dataset.category;
      card.style.display = (filter === "all" || category === filter) ? "block" : "none";
    });
  });
});
