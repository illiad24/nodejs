import express from 'express';
const app = express();
const port = 3000;

const getSeason = (month) => {
  if (month >= 2 && month <= 4) {
    return 'Spring'; 
  } else if (month >= 5 && month <= 7) {
    return 'Summer'; 
  } else if (month >= 8 && month <= 10) {
    return 'Autumn'; 
  } else {
    return 'Winter'; 
  }
};

const getTimeOfDay = (hours) => {
  if (hours >= 5 && hours < 12) {
    return 'Morning'; 
  } else if (hours >= 12 && hours < 17) {
    return 'Afternoon'; 
  } else if (hours >= 17 && hours < 21) {
    return 'Evening'; 
  } else {
    return 'Night'; 
  }
};

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/season', (req, res) => {
  const currentMonth = new Date().getMonth();
  const season = getSeason(currentMonth);
  res.send(season);
});

app.get('/day', (req, res) => {
  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }); 
  res.send(currentDay);
});

app.get('/time', (req, res) => {
  const currentHour = new Date().getHours(); 
  const timeOfDay = getTimeOfDay(currentHour);
  res.send(timeOfDay);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
