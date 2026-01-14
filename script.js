function showPanel(id) {
  document.querySelectorAll('.panel').forEach(panel => {
    panel.classList.remove('active');
  });

  document.querySelectorAll('.nav button').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}
