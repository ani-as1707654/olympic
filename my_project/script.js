function updateClock() {
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
  
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatter = new Intl.DateTimeFormat('en-US', {
      ...options,
      timeZone: userTimeZone
    });
  
    const formattedTime = formatter.format(now);
    document.getElementById('local-time').textContent = `${formattedTime} (${userTimeZone})`;
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  