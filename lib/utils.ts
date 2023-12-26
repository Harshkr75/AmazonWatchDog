// import Product from "../lib/models/product.model";
import { PriceHistoryItem, Product } from "@/types";

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

export function extractCurrentPrice(...elements:any){
    for(const element of elements){
         
        const priceText = element.text().trim();
        
        const numericValue = parseInt(priceText.replace(/,/g, ''), 10);
        
        if(!isNaN(numericValue)) return numericValue ;

    else return "failed";
    }
}


export function extractOriginalPrice(...elements:any){
    for(const element of elements){
       
        const priceText = element.text().trim();
        const match = priceText.match(/₹([\d,]+)/);

        // console.log(match) used to understand the working

if (match!==null) {
    const numericValue = parseInt(match[1].replace(/,/g, ''), 10);
    //console.log(numericValue); used to understand the output
    return (numericValue)?numericValue:""; 
} else {
    return "";
}
}
}

// below functions are taken from utils file from github gist of adrien.

export function extractCurrency(element:any){
    const currencyText = element.text().trim().slice(0,1);

    return currencyText? currencyText: "";
}



export function getHighestPrice(priceList: PriceHistoryItem[]) {
    let highestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price > highestPrice.price) {
        highestPrice = priceList[i];
      }
    }
  
    return highestPrice.price;
  }
  
  export function getLowestPrice(priceList: PriceHistoryItem[]) {
    let lowestPrice = priceList[0];
  
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price < lowestPrice.price) {
        lowestPrice = priceList[i];
      }
    }
  
    return lowestPrice.price;
  }
  
  export function getAveragePrice(priceList: PriceHistoryItem[]) {
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;
  
    return averagePrice;
  }
  
  export const getEmailNotifType = (
    scrapedProduct: Product,
    currentProduct: Product
  ) => {
    const lowestPrice = getLowestPrice(currentProduct.priceHistory);
  
    if (scrapedProduct.currentPrice < lowestPrice) {
      return Notification.LOWEST_PRICE as keyof typeof Notification;
    }
    if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
      return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
    }
    if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
      return Notification.THRESHOLD_MET as keyof typeof Notification;
    }
  
    return null;
  };
  
  export const formatNumber = (num: number = 0) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };


