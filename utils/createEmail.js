/* -------------------------------------------------------------------- */
/* Plugin Name           : Instagram-Reporter                           */
/* Author Name           : rasoul707                                    */
/* File Name             : createEmail.js                                    */
/* -------------------------------------------------------------------- */

const puppeteer = require('puppeteer-extra');
const UserAgent = require('user-agents');

// ###########################################################
// ###########################################################


const chromeOptions = {
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: false,
    defaultViewport: null,
    // args: [
    //     "--incognito",
    //     "--no-sandbox",
    //     "--single-process",
    //     "--no-zygote",
    //     "--disable-setuid-sandbox",
    //     "--disable-dev-shm-usage",
    //     "--disable-accelerated-2d-canvas",
    //     "--disable-gpu",
    //     "--window-size=1920x1080",
    // ],
    // userDataDir: "./browser/myPanelData"
};

const blockedResourceTypes = [
    // 'image',
    // 'media',
    // 'font',
    'texttrack',
    'object',
    'beacon',
    'csp_report',
    'imageset',
];

const skippedResources = [
    'quantserve',
    'adzerk',
    'doubleclick',
    'adition',
    'exelator',
    'sharethrough',
    'cdn.api.twitter',
    'google-analytics',
    'googletagmanager',
    'google',
    'fontawesome',
    'facebook',
    'analytics',
    'optimizely',
    'clicktale',
    'mixpanel',
    'zedo',
    'clicksor',
    'tiqcdn',
];



const openBrowser = async () => {
    return await puppeteer.launch(chromeOptions)
}


const newPage = async (browser) => {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setRequestInterception(true);
    const userAgent = new UserAgent({ "deviceCategory": "desktop" })
    useragent = userAgent.toString()
    await page.setUserAgent(useragent);
    // await page.setViewport({
    //     width: 1920,
    //     height: 1080,
    // });
    page.on('request', request => {
        const requestUrl = request.url().split('?')[0].split('#')[0];
        const blockResType = blockedResourceTypes.indexOf(request.resourceType()) !== -1
        const skipRes = skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
        if (blockResType || skipRes) {
            request.abort();
        } else {
            request.continue();
        }
    });
    return page
}


// ###########################################################
// ###########################################################






(async () => {
    const browser = await openBrowser()
    const page = await newPage(browser)
    const authUrl = `https://www.instagram.com/accounts/login/`
    await page.goto(authUrl, { timeout: 100000, waitUntil: 'networkidle2', })
})()