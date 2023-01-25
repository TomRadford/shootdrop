const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const { executablePath } = require('puppeteer')

// WILL NOT FIX
// Scraping/Api requests has been made unreliable as a result
// of target site's anti-scraping/anti-bot measures

const startBrowser = async () => {
	let browser
	try {
		browser = await puppeteer.launch({
			headless: false,
			args: ['--disable-setuid-sandbox'],
			ignoreHTTPSErrors: true,
			executablePath: executablePath(),
		})
	} catch (e) {
		throw new Error('Could not create a browser instance: ' + e)
	}
	return browser
}

const getNewGearResults = async (searchTerm) => {
	try {
		const browser = await startBrowser()
		const page = await browser.newPage()
		await page.goto(`https://www.bhphotovideo.com/c/search?q=${searchTerm}`, {
			waitUntil: 'networkidle2',
		})

		// await page.waitForSelector('[data-selenium="miniProductPageDescription"]')
		const listing = await page.$$eval('.sku_UCJ1nUFwhh', (all) => all)
		console.log(listing)
	} catch (e) {
		throw new Error(e)
	}
}

// module.exports = { getNewGearResults }
