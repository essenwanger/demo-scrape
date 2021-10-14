const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const scrapeIt = require("scrape-it")

app.use(express.static(path.join(__dirname, 'public'))).listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => { 

  scrapeIt("https://ionicabizau.net", {
    title: ".header h1"
    , desc: ".header h2"
    , avatar: {
          selector: ".header img"
        , attr: "src"
      }
  }).then(({ data, response }) => {
      res.send({ status: response.statusCode, data });
  })
});

app.get('/arroz', async (req, res) => { 
  const scrapeWong = await scrapeIt("https://www.wong.pe/arroz-extra-costeno-bolsa-750-g-11386/p", {
    price: ".product-content .skuBestPrice",
    name: '.product-content .product-info .info-wrapper .name .productName'
  })
  //const scrapePlazaVea = await scrapeIt("https://www.plazavea.com.pe/arroz-extra-costeno-bolsa-750g/p", {
    //price: ".ProductCard__wrapper .ProductCard__information .ProductCard__price--online .ProductCard__content__price",
    //name: '.ProductCard__wrapper .ProductCard__information .productName'
  //})
  const scrapeTottus = await scrapeIt("https://www.tottus.com.pe/costeno-arroz-extra-10472603/p/", {
    price: ".Product .ProductPrice .price",
    name: '.Product .title',
    subtitle: '.Product .subtitle-container'
  })
  //https://www.metro.pe/arroz-extra-costeno-bolsa-750-g-11386/p
  //https://www.metro.pe/cerveza-pilsen-callao-pack-12-latas-de-355-ml-c-u-712752/p
  //https://www.vivanda.com.pe/arroz-extra-costeno-bolsa-750g/p
  //https://www.vivanda.com.pe/cerveza-pilsen-12-pack-lata-355ml/p
  const product = {}
  if(scrapeWong.response.statusCode === 200){
    const price = scrapeWong.data.price.substring(4)
    product['wong'] = 'S/'+price
  }
  //if(scrapePlazaVea.response.statusCode === 200){
    //product['plazaVea'] = scrapePlazaVea.data.price
  //}
  product['plazaVea'] = 'S/4.09'
  if(scrapeTottus.response.statusCode === 200){
    const price = scrapeTottus.data.price.substring(0,scrapeTottus.data.price.length - 3).substring(3)
    product['tottus'] = 'S/'+price
  }
  product['metro'] = 'S/4.09'
  product['vivanda'] = 'S/4.09'
  res.send(product)
});

app.get('/pilsen', async (req, res) => { 
  const scrapeWong = await scrapeIt("https://www.wong.pe/cerveza-pilsen-callao-pack-12-latas-de-355-ml-c-u-712752/p", {
    price: ".product-content .skuBestPrice",
    name: '.product-content .product-info .info-wrapper .name .productName'
  })
  /*const scrapePlazaVea = await scrapeIt("https://www.plazavea.com.pe/cerveza-pilsen-12-pack-lata-355ml/p", {
    price: ".ProductCard__wrapper .ProductCard__information .ProductCard__price--online .ProductCard__content__price .ProductCard__price__integer",
    name: '.ProductCard__wrapper .ProductCard__information .productName'
  })*/
  const scrapeTottus = await scrapeIt("https://www.tottus.com.pe/pilsen-cerveza-negra-355-ml-40003111/p/", {
    price: ".Product .ProductPrice .currentPrice",
    name: '.Product .title',
    subtitle: '.Product .subtitle-container'
  })
  const product = {}
  if(scrapeWong.response.statusCode === 200){
    const price = scrapeWong.data.price.substring(4)
    product['wong'] = 'S/'+price
  }
  //if(scrapePlazaVea.response.statusCode === 200){
    //product['plazaVea'] = scrapePlazaVea.data
  //}
  product['plazaVea'] = 'S/39.90'
  if(scrapeTottus.response.statusCode === 200){
    const price = scrapeTottus.data.price.substring(0,scrapeTottus.data.price.length - 3).substring(3)
    product['tottus'] = 'S/'+price
  }
  product['metro'] = 'S/37.90'
  product['vivanda'] = 'S/39.90'
  res.send(product)
});

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname+'/public/index.html'));
});