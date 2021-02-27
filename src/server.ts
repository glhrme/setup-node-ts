import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import puppeteer from 'puppeteer'
import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

app.listen(3000, () => console.log(new Date()))

const p = 'images/'
const linkedinLogin = 'https://www.linkedin.com/'
const profile = 'https://www.linkedin.com/in/glhrme';

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.emulate({
    userAgent:
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
    viewport: {
      width: 1920,
      height: 5000,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    }
  })
  await page.goto(linkedinLogin)
  await page.screenshot({ path: `${p}1.png` })
  await page.click('.nav__button-secondary')
  await page.screenshot({ path: `${p}2.png` })
  await page.type('input[type="text"]', 'user')
  await page.type('input[type="password"]', 'password')
  await page.screenshot({ path: `${p}3.png` })
  await page.click('button[type=submit]')
  try {
    await page.click('button[type=submit]')
  } catch (error) {
    console.log('2 click')
  }
  await page.screenshot({ path: `${p}4.png` })
  await page.goto(profile)
  await page.screenshot({ path: `${p}5.png` })
  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    deviceScaleFactor: window.devicePixelRatio,
    divs: document.querySelectorAll('h3')
  }))

  console.log('Dimensions:', dimensions)

  console.log('tirada')
  await browser.close()
})()
