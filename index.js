const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const scrapeIt = require("scrape-it")

app.use(express.static(path.join(__dirname, 'public'))).listen(port, () => console.log(`Listening on port ${port}`));

app.get('/arroz', async (req, res) => {
  const product = {}
  product['wong'] = await getPriceScrapeWong("https://www.wong.pe/arroz-extra-costeno-bolsa-750-g-11386/p")
  product['plazaVea'] = await getPriceScrapePlazaVea("https://www.plazavea.com.pe/arroz-extra-costeno-bolsa-750g/p")
  product['tottus'] = await getPriceScrapeTottus("https://www.tottus.com.pe/costeno-arroz-extra-10472603/p/")
  product['metro'] = await getPriceScrapeMetro("https://www.metro.pe/arroz-extra-costeno-bolsa-750-g-11386/p")
  product['vivanda'] = await getPriceScrapeVivanda("https://www.vivanda.com.pe/arroz-extra-costeno-bolsa-750g/p")
  res.send(product)
});

app.get('/pilsen', async (req, res) => { 
  const product = {}
  product['wong'] = await getPriceScrapeWong("https://www.wong.pe/cerveza-pilsen-callao-pack-12-latas-de-355-ml-c-u-712752/p")
  product['plazaVea'] = await getPriceScrapePlazaVea("https://www.plazavea.com.pe/cerveza-pilsen-12-pack-lata-355ml/p")
  product['tottus'] = await getPriceScrapeTottus("https://www.tottus.com.pe/pilsen-cerveza-negra-355-ml-40003111/p/")
  product['metro'] = await getPriceScrapeMetro("https://www.metro.pe/cerveza-pilsen-callao-pack-12-latas-de-355-ml-c-u-712752/p")
  product['vivanda'] = await getPriceScrapeVivanda("https://www.vivanda.com.pe/cerveza-pilsen-12-pack-lata-355ml/p")
  res.send(product)
});

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

const getPriceScrapeWong = async (url) =>{
  const scrapeWong = await scrapeIt(url, {
    price: ".product-content .skuBestPrice",
    name: '.product-content .product-info .info-wrapper .name .productName'
  })
  if(scrapeWong.response.statusCode === 200){
    const price = scrapeWong.data.price.substring(4)
    return 'S/'+price
  }
}

const getPriceScrapePlazaVea = async (url) =>{
  const scrapePlazaVea = await scrapeIt(url, {
    price: {
      selector: "#___rc-p-dv-id" , attr: "value"
    },
    name: '.ProductCard__wrapper .ProductCard__information .productName'
  })
  if(scrapePlazaVea.response.statusCode === 200){
    const price = scrapePlazaVea.data.price.replace(',','.')
    return 'S/'+price
  }
}

const getPriceScrapeTottus = async (url) =>{
  const scrapeTottus = await scrapeIt(url, {
    price: ".Product .ProductPrice .cmrPrice",
    name: '.Product .title',
    subtitle: '.Product .subtitle-container'
  })
  if(scrapeTottus.response.statusCode === 200){
    const price = scrapeTottus.data.price.substring(0,scrapeTottus.data.price.length - 3).substring(3)
    return 'S/'+price
  }
}

const getPriceScrapeMetro = async (url) =>{
  const scrapeMetro = await scrapeIt(url, {
    price: ".product-content .skuBestPrice",
    name: '.product-content .product-info .info-wrapper .name .productName'
  })
  if(scrapeMetro.response.statusCode === 200){
    const price = scrapeMetro.data.price.substring(4)
    return 'S/'+price
  }
}

const getPriceScrapeVivanda = async (url) =>{
  const scrapeVivanda = await scrapeIt(url, {
    price: {
      selector: 'meta[property="product:price:amount"]',
      attr: 'content'
    }
  })
  if(scrapeVivanda.response.statusCode === 200){
    const price = scrapeVivanda.data.price
    return 'S/'+price
  }
}