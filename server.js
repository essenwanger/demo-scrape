const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const scrapeIt = require("scrape-it")

app.listen(port, () => console.log(`Listening on port ${port}`));

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

app.get('/wong-test', async (req, res) => { 
  const scrapeWong = await scrapeIt("https://www.wong.pe/arroz-extra-costeno-bolsa-750-g-11386/p", {
    price: ".product-content .skuBestPrice",
    name: '.product-content .product-info .info-wrapper .name .productName'
  })
  const scrapePlazaVea = await scrapeIt("https://www.plazavea.com.pe/arroz-extra-costeno-bolsa-750g/p", {
    price: ".ProductCard__wrapper .ProductCard__information .ProductCard__price--online .ProductCard__content__price",
    name: '.ProductCard__wrapper .ProductCard__information .productName'
  })
  const scrapeTottus = await scrapeIt("https://www.tottus.com.pe/costeno-arroz-extra-10472603/p/", {
    price: ".Product .ProductPrice .price",
    name: '.Product .title',
    subtitle: '.Product .subtitle-container'
  })
  const product = {}
  if(scrapeWong.response.statusCode === 200){
    product['wong'] = scrapeWong.data
  }
  if(scrapePlazaVea.response.statusCode === 200){
    product['plazaVea'] = scrapePlazaVea.data
  }
  if(scrapeTottus.response.statusCode === 200){
    product['tottus'] = scrapeTottus.data
  }
  res.send(product)
});