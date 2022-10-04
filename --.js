// ###########################################################
// ###########################################################


const defaultChromeOptions = {
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

const defaultBlockedResourceTypes = [
    // 'image',
    'media',
    'font',
    'texttrack',
    'object',
    'beacon',
    'csp_report',
    'imageset',
];

const defaultSkippedResources = [
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



const openBrowser = async (chromeOptions = defaultChromeOptions) => {
    return await puppeteer.launch(chromeOptions)
}


const newPage = async (browser, useRandomUseragent = true, viewport = null, blockedResourceTypes = defaultBlockedResourceTypes, skippedResources = defaultSkippedResources) => {
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0)
    await page.setRequestInterception(true)
    if (useRandomUseragent) {
        const userAgent = new UserAgent({ "deviceCategory": "desktop" })
        const useragent = userAgent.toString()
        await page.setUserAgent(useragent)
    }
    if (viewport) {
        await page.setViewport({
            width: viewport[0],
            height: viewport[1],
        });
    }

    page.on('request', (request) => {
        const requestUrl = request.url().split('?')[0].split('#')[0]
        const blockResType = blockedResourceTypes.indexOf(request.resourceType()) !== -1
        const skipRes = skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
        if (blockResType || skipRes) {
            request.abort()
        } else {
            request.continue()
        }
    })

    return page
}


// ###########################################################
// ###########################################################