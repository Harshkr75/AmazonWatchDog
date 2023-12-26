import axios from "axios"
import * as cheerio from "cheerio"
import { extractCurrency, extractCurrentPrice , extractOriginalPrice } from "../utils";

export async function scrapeAmazonProduct(url: string){
 
    if(!url) return;
    const username =  String(process.env.BRIGHT_DATA_USERNAME);
    const password =  String(process.env.BRIGHT_DATA_PASSWORD);
    const port =22225;
    const session_id = (1000000*Math.random()) | 0 ;
    const options = {
        auth: {
        username: username + "-session-" + session_id ,
        password,
        },
        host:"brd.superproxy.io",
        port,
        rejectUnauthorized:false,
    }

    try {

        //fetch the product page
        const response = await axios.get(url,options);
        const $ = cheerio.load(response.data);

        //extracting product title
        const title = $("#productTitle").text().trim();
        const currentPrice = extractCurrentPrice(
            $("span.a-price-whole")
        );

        const originalPrice = extractOriginalPrice(
            $("span.a-price.a-text-price"),
            $("span.a-offscreen")
        );

        const outOfStock = $("#availibilty span").text().trim().toLowerCase() === "currently unavailable";

        const images = $("#landingImage").attr("data-a-dynamic-image")|| "{}";
        const imgUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($("span.a-price-symbol"));
        
        const discountPercentage = $("span.savingsPercentage").text().replace(/-/g,"") ;
            
        const productDescription = $("#feature-bullets span.a-list-item").text().trim();

        // console.log({title , originalPrice , currentPrice,outOfStock,imgUrls,currency,discountPercentage ,productDescription})

        //Construct data object with scraped information

        const data = {
            url,
            currency: currency || "$",
            image: imgUrls[0],
            title,
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory:[],
            discountRate:Number(discountPercentage)|| 0,
            category:"category",
            reviewsCount: 100,
            stars:4.5,
            isOutOfStock:outOfStock ,
            description:productDescription,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }

        console.log(data); //to get the output of all the scaped data on the terminal
        return data ;

        

    } catch(error: any){
        throw new Error ("Failed to scrape product: "+ error.message);
    }

}