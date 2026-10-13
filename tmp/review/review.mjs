import {chromium} from 'file:///C:/Users/peppy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
const browser=await chromium.launch({headless:true,channel:'msedge'})
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'})
await page.goto('http://127.0.0.1:5173/')
for(const id of ['home','about','skills','projects']){
 await page.locator('#'+id).scrollIntoViewIfNeeded()
 await page.screenshot({path:'tmp/review/'+id+'.png'})
 console.log(id, await page.locator('#'+id).boundingBox())
}
console.log('total height',await page.evaluate(()=>document.documentElement.scrollHeight))
await browser.close()
