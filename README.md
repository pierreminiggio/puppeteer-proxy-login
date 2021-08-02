# puppeteer-proxy-login

Prérequis :
Ceux de Puppeteer : https://github.com/puppeteer/puppeteer

Installation :
```
npm install pierreminiggio/puppeteer-proxy-login
```

Utilisation : 
```javascript
import proxyLogin from '@pierreminiggio/puppeteer-proxy-login'

const {alterPuppeteerOptions, pageAuthenticate} = proxyLogin(inputProxy)
const options = {}
alterPuppeteerOptions(options)

const browser = await puppeteer.launch(options)
const page = await browser.newPage()
await pageAuthenticate(page)

```
