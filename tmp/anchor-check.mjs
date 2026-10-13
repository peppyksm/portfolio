import {chromium} from 'file:///C:/Users/peppy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
import assert from 'node:assert/strict'
const browser=await chromium.launch({headless:true,channel:'msedge'})
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'})
await page.goto('http://127.0.0.1:5173/#project-frade')
await page.waitForFunction(()=>document.querySelector('#project-frade').getBoundingClientRect().top>=document.querySelector('.header').getBoundingClientRect().bottom)
assert.equal(await page.locator('#project-frade h3').isVisible(),true)
for (const url of ['frade-mypage.png','frade-trading.png','frade-community.png','frade-portfolio-table.png','frade-history-table.png']) {
 const r=await page.request.get('http://127.0.0.1:5173/assets/'+url)
 assert.equal(r.status(),200)
 assert.match(r.headers()['content-type'],/image\/png/)
}
console.log('PASS: direct Frade preview anchor and all five image assets')
await browser.close()
