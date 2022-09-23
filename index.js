const  fs  = require("fs");
const puppeteer = require("puppeteer");
const fs = require("fs");
export const list=(async () => {
    let names = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://food.grab.com/ph/en/restaurants", { waitUntil: "networkidle2" });
    
    let loadMore = true;
    while (loadMore) {
        const selector = '.ant-btn-block';

        if ((await page.$(".ant-btn-block")) !== null) {
            // setTimeout(()=>{},3000);
             await page.click(".ant-btn-block");
        } else {
            loadMore = false;
        }
    }

    // let loadMore = true;

    // while (loadMore) {
    //     selector = '.ant-btn-block';

    //     await page.waitForSelector(".ant-btn-block", { timeout: 600 }).then(() => {
    //         page.click(".ant-btn-block");
    //     }).catch(() => {
    //         loadMore = false;
    //     });
    // }

    const Data = await page.evaluate(()=>{
        Array.from(document.querySelectorAll("ant-col-24 RestaurantListCol___1FZ8V")).map(x=>x)
    })
    await fs.writeFile("names.csv", names.join("\n"));
    
    await browser.close();
})
list();


module.exports={
    list
}
