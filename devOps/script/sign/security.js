const time_range = require('./timeUtil');
const puppeteer = require('puppeteer');

let browser;
let page;
let checked = false;
async function login() {
    await page.type('#username', '', {
        delay: 0
    });

    await page.type('#password', '', {
        delay: 0
    });

    await page.click('.formsubmit_btn');
    await page.waitForSelector('#clockLink button').then(_ => {
        return Promise.resolve();
    }).catch(_ => {
        return Promise.reject();
    });
}

async function test() {
    if (new Date().getDay() === 0 || new Date().getDay() === 6) {
        return;
    }
    
    if (new Date().getHours() === 8 || new Date().getHours() === 21) {
        checked = false;
    }

    if (checked) {
        return;
    }

    if (!time_range("9:40", "10:20") && !time_range("21:40", "22:20")) {
        return;
    }

    browser = await puppeteer.launch({
        headless: true,
        slowMo: 200,
    });

    page = await browser.newPage();
    page.setViewport({
        width: 1500,
        height: 800,
    });
    
    await page.goto('http://erp.jd.com/', {
        waitUntil: 'networkidle2'
    });

    await login().catch(_ => {
        return login();
    });

    await page.click('#clockLink button').catch(_ => {
    });

    checked = true;
    await browser.close();
}

test();

setInterval(test, 13 * 60 * 1000);
