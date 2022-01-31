const http = require('http');

const city = process.argv[2];
const URL = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${city}`;

http.get(URL, (res) => {
  const { statusCode } = res;
  if (statusCode !== 200) console.error(`Status Code: ${statusCode}`);

  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    const parsedData = JSON.parse(rawData);
    console.log(`${parsedData.location.region}. Температура: ${parsedData.current.temperature}, Ощущается как: ${parsedData.current.feelslike}, Скорость ветра: ${parsedData.current.wind_speed}`);
  });
}).on('error', (err) => console.error(`Got error: ${err.message}`));
