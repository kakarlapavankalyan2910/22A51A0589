export function Log(stack, level, pkg, message) {
    return fetch('https://your-test-server.example.com/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stack, level, package: pkg, message })
    })
    .then(res => {
      if (!res.ok) { throw new Error('Log API error'); }
      return res.json();
    })
    .catch(err => { console.error('Log error:', err); });
  }