const limits = new Map();

function checkLimit(hostname, limit = 100, interval = 60000) {
  const now = Date.now();
  const hostLimit = limits.get(hostname) || { count: 0, reset: now + interval };

  if (now > hostLimit.reset) {
    hostLimit.count = 1;
    hostLimit.reset = now + interval;
  } else {
    hostLimit.count++;
  }

  limits.set(hostname, hostLimit);
  return hostLimit.count <= limit;
}

module.exports = { checkLimit };