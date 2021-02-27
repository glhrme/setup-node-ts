import express from 'express'
import puppeteer from 'puppeteer'

const route = express.Router()

route.get('/', (req, res) => {
  const p = 'images/'
  const linkedinLogin = 'https://www.linkedin.com/';

  (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(linkedinLogin)
    await page.screenshot({ path: `${p}1.png` })
    await page.click('.nav__button-secondary')
    await page.screenshot({ path: `${p}2.png` })
    await page.click('input[type="text"]')
    await page.screenshot({ path: `${p}3.png` })

    await browser.close()
  })()
  return res.json({ message: 'HelloWorld' })
})

export default route
