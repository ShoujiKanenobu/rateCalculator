const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/times', (req, res) => res.send(showTimes()))
  .post('/getRate', (req, res) => {
    let ren = calculateRate(req);
    res.render('pages/getRate', ren)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function calculateRate(req) {
    let mailType = req.query.mailType;
    let weight = parseInt(req.query.weight);
    let rate = 0;

    switch(mailType)
    {
      case 'LettersStamped':
          if(weight < 1)
          {
              rate = 0.55;
              weight--;
          }
          while(weight < 0)
          {
            rate += 0.15;
            weight--;
          }

      break;
      case 'LettersMetered':
          if(weight < 1)
          {
              rate = 0.5;
              weight--;
          }
          while(weight < 0)
          {
            rate += 0.15;
            weight--;
          }
      break;
      case 'LargeEnvelopes':
        if(weight < 1)
          {
              rate = 1;
              weight--;
          }
          while(weight < 0)
          {
            rate += 0.15;
            weight--;
          }
      break;
      case 'FirstClass':
          if(weight < 5) {
            rate = 3.66;
          } else if (weight < 9) {
            rate = 4.39;
          } else if (weight < 13) {
            rate = 5.19;
          } else {
            rate = 5.71;
          }
      break;
    }
    return { mailType: mailType, weight: weight, rate: rate };
  }
  
  showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
      for (i = 0; i < times; i++) {
        result += i + ' '
      }
  return result;
  }