/* -------------------------------------------------------------------- */
/* Plugin Name           : Instagram-Reporter                           */
/* Author Name           : rasoul707                                    */
/* File Name             : report.js                                    */
/* -------------------------------------------------------------------- */


const { exit } = require('process');
const puppeteer = require('puppeteer-extra');
const UserAgent = require('user-agents');
const fs = require("fs")

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




const getAccountsForReport = async () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        readline.question(`Enter accounts that you want to report? (without @ and split with space):\n`, data => {
            resolve(data.split(" "))
            readline.close()
        })
    })
}


const getUsers = async () => {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync("data/accounts.csv", { encoding: "utf-8" })
        resolve(data.split("\r\n").map((v => v.split(","))))
    })
}



const doReport = async (page, account) => {
    const accUrl = `https://www.instagram.com/${account}/`
    await page.goto(accUrl, { waitUntil: 'networkidle2', }).catch(e => { throw "NavigateFailed" })
    if (await page.url() === accUrl) {
        await page.waitForSelector('[aria-label="Options"]').catch(e => { throw "OptionsWaitFailed" })
        await page.click('[aria-label="Options"]').catch(e => { throw "OptionsClickFailed" })

        await page.waitForXPath('//button[text()="Report"]').catch(e => { throw "ReportWaitFailed" })
        const [report] = await page.$x('//button[text()="Report"]').catch(e => { throw "ReportGetXFailed" })
        await report.click().catch(e => { throw "ReportClickFailed" })

        await page.waitForXPath('//*[text()="Report Account"]').catch(e => { throw "ReportAccountWaitFailed" })
        const [reportAccount] = await page.$x('//*[text()="Report Account"]').catch(e => { throw "ReportAccountGetXFailed" })
        await reportAccount.click().catch(e => { throw "ReportAccountClickFailed" })

        await page.waitForTimeout(5000)


        // ************** start report type


        // await page.waitForXPath(`//*[text()="${reportTypeList[reportType]}"]`)
        // const [reportTypeItem] = await page.$x(`//*[text()="${reportTypeList[reportType]}"]`)
        // await reportTypeItem.click()


        // if (reportType === 1) {
        //     await page.waitForXPath(`//*[text()="${contentReportTypes[subReport]}"]`)
        //     const [reportContentTypeItem] = await page.$x(`//*[text()="${contentReportTypes[subReport]}"]`)
        //     await reportContentTypeItem.click()
        // }
        // if (reportType === 2) {
        //     await page.waitForXPath(`//*[text()="${someoneElseReportTypes[subReport]}"]`)
        //     const [reportTypeItem] = await page.$x(`//*[text()="${someoneElseReportTypes[reportType]}"]`)
        //     await reportTypeItem.click()
        // }


        // ************** start report type
    }
    else {
        throw "OthersProblem"
    }
}


const doLogin = async (page, username, password) => {
    const url = `https://www.instagram.com/accounts/login/`
    await page.goto(url, { waitUntil: 'networkidle2', }).catch(e => { throw "NavigateFailed" })
    if (await page.url() === url) {
        await page.type('input[name="username"]', username).catch(e => { throw "UsernameTypeFailed" })
        await page.type('input[name="password"]', password).catch(e => { throw "PasswordTypeFailed" })
        await page.click('button[type=submit]').catch(e => { throw "SubmitClickFailed" })
        await page.waitForNavigation().catch(e => { throw "WaitNavigateLoginFailed" })
    } else {
        throw "OthersProblem"
    }
    await page.waitForTimeout(5000)
}



(async () => {
    // get account list for report
    const accountsForReport = await getAccountsForReport()
    // get list of user pass
    const users = await getUsers()


    // browser
    const browser = await openBrowser()
    const page = await newPage(browser)


    // login
    for (let x = 0; x < users.length; x++) {
        try {
            await doLogin(page, users[x][0], users[x][1])
            console.log("LOGIN:", users[x][0], "> Success")
            //  reporting
            for (let i = 0; i < accountsForReport.length; i++) {
                try {
                    await doReport(page, accountsForReport[i])
                    console.log("REPORT:", accountsForReport[i], "> Success")
                }
                catch (err) {
                    console.log("REPORT:", accountsForReport[i], "> Error:", err)
                }
            }
        }
        catch (err) {
            console.log("LOGIN:", users[x][0], "> Error:", err)
        }
    }

    await browser.close()
})()