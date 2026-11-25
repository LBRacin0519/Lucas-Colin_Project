# Flip Advisor
Private clothing resale decision tool for Lucas and Colin. See [Scope.txt](Scope.txt). Original starter files remain unchanged.

## Run locally
Install Node.js 22.13+ (or current Node LTS). No npm dependencies.
```sh
npm test
npm start
```
Open http://127.0.0.1:3000. Manual research and calculations work without an API key. For AI, copy .env.example to .env (PowerShell: Copy-Item .env.example .env; macOS/Linux: cp .env.example .env), set OPENAI_API_KEY, and restart. API usage is billed separately; use a restricted project key and budget alerts. Optional ENABLE_WEB_RESEARCH=true enables paid web research. Never paste keys into GitHub or browser. Model configurable in .env.

## Launch from your phone (private PWA)
1. Run npm start on a computer that remains awake.
2. Install Tailscale on that computer and both phones. Configure your tailnet/grants so only the intended two users/devices can reach the host. This application has no separate login; the private network is its access boundary.
3. On the host, run `tailscale serve --bg 3000`. Approve HTTPS setup if prompted. Use the HTTPS URL printed by Tailscale. Do not use Funnel or public port forwarding. See https://tailscale.com/docs/reference/tailscale-cli/serve.
4. With Tailscale connected on iPhone, open the HTTPS URL in Safari, Share > Add to Home Screen > Add (enable Open as Web App if shown). Android: Chrome menu > Install app or Add to Home screen.
5. Open the Flip Advisor icon. The host and Tailscale connection must remain available; no offline analysis. Test that the URL is inaccessible with Tailscale disconnected.

## Workflow
Upload up to four photos (full item, tags, defects) or paste notes; identify with AI or manually enter identity and search query. Verify item/condition. Use eBay sold listings or Product Research (https://www.ebay.com/help/selling/selling-tools/product-research?id=4853), Poshmark and Depop research links, or optional AI web search. Web results are leads only; manually enter 3+ recent comparable actual sold prices from target platform. Check actual accepted price; never enter active asks as sold. Enter actual fees and shipping and confirm expenses. Evaluate deal. Adjust price and recalculate.

No database in P0. Reload resets analysis; screenshots are processed in memory and sent to OpenAI only when requested. No automatic scraping, no direct sold-data integration, no subscription, no public deployment. Private resale use does not imply permission to scrape.

## Verification
`npm test` exercises deterministic valuation. Live API requests and phone camera/install require founder testing. This is an implementation candidate; do not rely on it until you verify actual clothing examples. API docs: https://developers.openai.com/api/docs/guides/images-vision and https://developers.openai.com/api/docs/guides/tools-web-search.
