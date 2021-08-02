/**
 * @callback AlterPuppeteerOptions 
 * @property {import('puppeteer').BrowserLaunchArgumentOptions} options
 * 
 * @returns {void}
 */

/**
 * @callback PageAuthenticate 
 * @property {import('puppeteer').Page} page
 * 
 * @returns {void}
 */

/**
 * @typedef {Object} ProxyLogin
 * @property {AlterPuppeteerOptions} alterPuppeteerOptions
 * @property {PageAuthenticate} pageAuthenticate
 */

/**
 * @param {?string} inputProxy
 * 
 * @returns {ProxyLogin} 
 */
export default function proxyLogin(inputProxy) {
    let proxy = null
    let needsAuth = false
    let username = null
    let password = null

    if (inputProxy) {
        const splitProxy = inputProxy.split('@')
        needsAuth = splitProxy.length > 1

        if (needsAuth) {
            const usernameAndPasswordAndMethod = splitProxy[0]
            const methodSeparator = '://'
            const splitUsernameAndPasswordAndMethod = usernameAndPasswordAndMethod.split(methodSeparator)
            const method = splitUsernameAndPasswordAndMethod[0]
            const usernameAndPassword = splitUsernameAndPasswordAndMethod[1]
            const splitUsernameAndPassword = usernameAndPassword.split(':')
            username = splitUsernameAndPassword[0]
            password = splitUsernameAndPassword[1]
            proxy = method + methodSeparator + splitProxy[1]
        } else {
            proxy = inputProxy
        }
    }

    /**
     * @param {import('puppeteer').BrowserLaunchArgumentOptions} options
     * 
     * @returns {void}
     */
    const alterPuppeteerOptions = (options) => {
        if (! proxy) {
            return
        }

        let newArgs = options.args

        if (! newArgs) {
            newArgs = []
        }

        newArgs.push('--proxy-server=' + proxy)

        options.args = newArgs
    }

    /**
     * @param {import('puppeteer').Page}
     * 
     * @returns {void}
     */
    const pageAuthenticate = async (page) => {
        if (! needsAuth) {
            return
        }

        await page.authenticate({username, password})
    }

    return {alterPuppeteerOptions, pageAuthenticate}
}
