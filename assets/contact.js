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