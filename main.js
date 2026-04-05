fetch('data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const chart = document.getElementById('chart');
    const today = new Date().toLocaleString('en-us', {weekday: 'short'}).toLowerCase();
    const maxAmount = Math.max(...data.map(function(item) {
      return item.amount;
    }));

    data.forEach(function(item) {
      const barHeight = (item.amount / maxAmount) * 100;

      const group = document.createElement('div');
      group.classList.add('bar-group');

      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = barHeight + '%';

      if (item.day === today) {
        bar.classList.add('today');
      }

      const tooltip = document.createElement('span');
      tooltip.classList.add('tooltip');
      tooltip.textContent = '$' + item.amount;

      const label = document.createElement('span');
      label.classList.add('bar-label');
      label.textContent = item.day;

      bar.appendChild(tooltip);
      group.appendChild(bar);
      group.appendChild(label);
      chart.appendChild(group);
    });
  });

  const toggleBtn = document.getElementById('toggleBtn');
  toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
  });