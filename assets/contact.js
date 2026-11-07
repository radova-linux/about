/**
 * Tab Switching Logic for Contact Page
 * Updates the hidden category input, UI active states, and toggles subject dropdowns.
 */
function switchTab(category, btnElement) {
  // Update hidden input value
  document.getElementById('category').value = category;

  // Update button styles
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  // Hide all subjects and disable them (so they don't get submitted)
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    content.disabled = true;
  });

  // Show and enable the correct subject dropdown
  let targetId = '';
  if (category === 'Information') targetId = 'subject-info';
  if (category === 'Report Bugs') targetId = 'subject-bug';
  if (category === 'Collaboration') targetId = 'subject-collab';
  
  const activeDropdown = document.getElementById(targetId);
  if (activeDropdown) {
    activeDropdown.classList.add('active');
    activeDropdown.disabled = false;
  }
}

// untuk ngirim data ke sheet
function switchTab(category, btnElement) {
      document.getElementById('category').value = category;

      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      btnElement.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.disabled = true;
      });

      let targetId = '';
      if (category === 'Information') targetId = 'subject-info';
      if (category === 'Report Bugs') targetId = 'subject-bug';
      if (category === 'Collaboration') targetId = 'subject-collab';
      
      const activeDropdown = document.getElementById(targetId);
      if (activeDropdown) {
        activeDropdown.classList.add('active');
        activeDropdown.disabled = false;
      }
    }

    async function sendData(event) {
      event.preventDefault();
      
      const indicator = document.getElementById('loading-indicator');
      const submitBtn = document.getElementById('submit-btn');
      const responseBox = document.getElementById('contact-response');

      indicator.style.display = 'block';
      submitBtn.disabled = true;

      const formData = new URLSearchParams();
      formData.append('name', document.getElementById('name').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('category', document.getElementById('category').value);
      
      const activeSubject = document.querySelector('.tab-content.active');
      formData.append('subject', activeSubject ? activeSubject.value : '');
      formData.append('message', document.getElementById('message').value);

      // Masukkan URL Web App Apps Script kamu di sini
      const scriptURL = 'https://script.google.com/macros/s/AKfycbx_ipxtg9sxpAup2hmxzBN2NROT-j2GAzsbRuZWJ6Sb6pB-eExhYTeyo8AiYgTm1e7ZYw/exec';

      try {
        await fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });

        responseBox.innerHTML = `
          <div style="text-align: center; padding: 2rem 0;">
            <h3 style="color: #00A86B; font-family: var(--font-heading);">Transmission Successful!</h3>
            <p style="color: var(--muted); font-size: 15px;">Your request has been securely delivered to the Radova Linux team. We will respond shortly.</p>
            <button onclick="location.reload()" class="btn btn-outline" style="margin-top: 1rem;">Send Another Message</button>
          </div>
        `;
      } catch (error) {
        responseBox.innerHTML = `
          <div style="text-align: center; padding: 2rem 0; color: var(--red-600);">
            <h3>Transmission Failed</h3>
            <p>${error.toString()}</p>
            <button onclick="location.reload()" class="btn btn-outline" style="margin-top: 1rem;">Try Again</button>
          </div>
        `;
      }
    }