const axios = require("axios");
const cheerio = require("cheerio");

//amazon products

const getAmznProduct = async (req, res) => {
  const produrl = req.body.product;
  try {
    await fetch(produrl)
      .then((res) => res.text())
      .then((data) => {
        const html = data;
        const $ = cheerio.load(html);
        const syms = [];
        $(".a-price-symbol").each((i, el) => {
          syms[i] = $(el).text();
        });
        const prices = {
          symbol: syms,
          price: $(".a-price-whole").text().split("."),
        };
        const title = $("#productTitle").text().trim();
        const imageurl = $("#landingImage").attr("data-old-hires");
        const rating = $("#acrPopover").find(".a-size-base").text().split(" ");
        const product = {
          price: {
            symbol: prices.symbol[0],
            price: prices.price[0],
          },
          title: title,
          rating: Number(rating[1]),
          imageurl: imageurl,
        };
        res.status(200).json({ product });
      });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};



// flipkart products

const getFktProduct = async (req, res) => {
  const produrl = req.body.product;
  try {
    await fetch(produrl)
      .then((res) => res.text())
      .then((data) => {
        const html = data;
        const $ = cheerio.load(html);

        //price 

        const prices = [];
        $("._30jeq3").each((i, el) => {
          prices[i] = $(el).text().replace("₹", "").replace(",", "");
        });

        // original title
        const title = $(".B_NuCI").text().trim();


        // product rating
        const ratings = [];
        $("._3LWZlK").each((i, el) => {
          ratings[i] = $(el).text();
        });


        // titile without model enclosed in ()
        ft = title.replace(/\([^)]+\)/g, "").trim(); 

        // thumbnail
        const imgsarr = []
        $('._3kidJX').find('img').each((i,el)=>{
          imgsarr.push($(el).attr('src'))
        })

        if(imgsarr.length == 0) {
          $("img").each((i, el) => {
              if ($(el).attr("alt") == ft) { //check the alt and get src (working.........)
                imgsarr.push($(el).attr("src"));
              }
          })
        }
        const product = {
          price: Number(prices[0]),
          title: title,
          rating: Number(ratings[0]),
          imageurl: imgsarr[0],
        };
        res.status(200).json({ product });
      });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAmznProduct,
  getFktProduct,
};
