const parser = require('./parser');

async function start() {
  try {
    const ads = await parser('https://enter.online/laptopuri/');
    console.log(ads);
  } catch (e) {
    console.log(e);
  }

  process.exit(0);
}

start();
