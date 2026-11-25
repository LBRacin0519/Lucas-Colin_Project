# AI Resale App — Full Project Brief

Nov 25, 2026 · Colin McGuinn & Lucas

> **For humans and AI tools:** this is the full background and reasoning
> behind the project. `PROJECT.md` is the short working spec; this brief
> explains how we got there and why. Attach either one to prompts so every
> AI (Claude, ChatGPT, Codex) works from the same scope. Update both when a
> decision changes.

## Executive summary

Colin and Lucas are building a **personal AI resale app** for flipping clothes. It is not public and not monetized. It covers finding items, pricing them, listing them and tracking every flip from purchase to sale.

The core loop: photograph an item at the bins or a thrift store, have AI identify it, pull comparable prices, calculate profit after each platform's fees and shipping, and get a buy-or-pass verdict. Phase 2 adds a **deal watcher** that checks saved searches across eBay, Depop and Poshmark and flags listings priced below market value.

**Where it stands (Nov 25, 2026):** scope is settled, nothing is coded yet.

- The shared spec (`PROJECT.md`) is written and ready for the repo root.
- The GitHub repo name and owner are not set.
- The first real test is a bins trip over break, logging every item bought.

**Why this shape:** the original plan was a public subscription app. Two findings changed it.

- **Data access.** Depop and Poshmark offer no public market data, and eBay restricts its sold-price API.
- **Market odds.** Roughly 4 in 5 new apps never reach $1,000 a month.

Building for themselves first means Colin and Lucas are the first users, flipping produces real profit now, and every logged sale builds a sold-price database they own. If the tool proves itself, that database is what a public version would need.

**The biggest open items:**

- How to get Depop and Poshmark data (left to the founders).
- Who builds what.
- How costs and profits are split.
- A written founder agreement.

## Founders and how we work

Two founders build in one shared GitHub repo, each working through their own AI tools, with one spec file keeping everyone aligned.

| Founder | Working through | Known strengths so far | Role |
| --- | --- | --- | --- |
| Colin McGuinn | Claude (inside Dublin, Colin's AI workspace) | Business and finance background; built Dublin (scheduled agents, Gmail/Calendar wiring, a mobile networking app) | TBD |
| Lucas | ChatGPT / Codex and Claude | Already built a working image pipeline: QR-code scan, decode the URL, check it is safe | TBD, likely lead coder |

**The shared spec file.** One file, `PROJECT.md`, lives at the root of the repo. It holds what the product is, why, the roadmap, the rules and a decision log. Both founders attach it to every AI prompt, and Codex and Claude read it directly from the repo. That way neither has to re-explain the project and every AI works from the same base.

**Branching.** Build a working base on `main` together first, ideally in one in-person session. After that, each founder works on separate feature branches and merges through pull requests, so they can build apart while back at school.

**AI jury review (planned).** For design decisions and code review:

1. Several AI models each argue a different stance on the idea or the pull request.
2. A final model, the "executioner," reads the whole debate and gives the verdict.
3. The goal is catching mistakes before they reach `main`. Public GitHub repos and tutorials show how to set this up.

**Meetings.** Record the session, have AI summarize it, then update `PROJECT.md` and the decision log so the plan never lives only in someone's head.

**Hardware.** Lucas has spare hardware that could host a server. That is fine for development and personal use. No model training is planned, so no special hardware is needed.

## How we got here

The idea went through five rounds in two days, each narrowing toward something the founders actually want to use and can build.

| Round | What was explored | Why it moved on |
| --- | --- | --- |
| 5. Nov 25: expanded scope | Full personal resale app: bins scanner plus a cross-platform deal watcher | Current plan |
| 4. Nov 25: own tool first | Build the flipping tool for ourselves, start flipping for real | Public app blocked by data access; using it ourselves is cheaper and teaches more |
| 3. Nov 24: flipping assistant | Public B2C app: photo of clothing, resale value, profit, freemium subscription | Depop/Poshmark have no market-data API; eBay sold data is restricted |
| 2. Nov 24: fun consumer apps | Workout RPG with levels and glowing titles, sleep pet, real-life side quests, pet trading cards, group-chat adventure, notes boss fight, cooking judge, habit city | Real numbers showed consumer apps are a long shot; founders converged on flipping |
| 1. Nov 24: business-focused ideas | AI ops for property managers, AI back office for wealth advisors, local AI setup agency, finance recruiting tool, campus food ops | Founders wanted ideas not tied to Colin's finance and real estate background |

**What carried forward from earlier rounds:**

- **Distribution decides consumer apps.** Cal AI grew through influencer marketing, not features.
- **Build where you have an unfair edge.** Here that edge is being active flippers and having Lucas's working image pipeline.
- **Test before building big.** The bins trip is that test.
- **Founder agreement.** Write down ownership and decision rights early, while it is easy.

## Market reality: the numbers behind the decisions

Most consumer apps make almost nothing, and paid ads lose money in fitness-style apps, so any public version must grow through organic reach.

| Measure | Figure | Source |
| --- | --- | --- |
| New subscription apps reaching $1,000/month within 2 years | ~17–19% | [RevenueCat via Sherwood News](https://sherwood.news/tech/data-shows-most-new-apps-dont-just-fail-they-completely-bomb/), [9to5Mac](https://9to5mac.com/2026/03/04/new-report-looks-into-the-sustainability-of-the-subscription-app-market-for-2026/) |
| New subscription apps reaching $10,000/month | ~5% | [RevenueCat 2025](https://www.revenuecat.com/blog/company/the-state-of-subscription-apps-2025-launch) |
| Median time to first $1,000 (for apps that get there) | 60 days | [Sherwood News](https://sherwood.news/tech/data-shows-most-new-apps-dont-just-fail-they-completely-bomb/) |
| Users who return the day after install | ~25% | [UXCam](https://uxcam.com/blog/mobile-app-retention-benchmarks/) |
| Users still active after 30 days | ~4–8% | [Phiture](https://phiture.com/mobilegrowthstack/managing-retention-rate-benchmarks-and-expectations/) |
| Share of players who pay in free games | ~5–10% (vendor estimates) | [SQ Magazine](https://sqmagazine.co.uk/in-game-purchases-statistics/) |
| Health & fitness revenue per install, first 60 days (median) | $0.63 | [RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025) |
| Cost per install from Meta ads, US fitness / wellness | ~$6–20 | [Superads](https://www.superads.ai/facebook-ads-costs/cost-per-app-install/fitness-training-centers/united-states) |
| Apple/Google cut on subscriptions | 15% under $1M/yr, else 30% | Small-developer programs |

**What the numbers mean for us:**

- **Paid ads don't pay back.** An install costing $6–20 against $0.63 of revenue loses money on every user bought.
- **Growth has to be organic:** TikTok, creator content, reseller communities, word of mouth.
- **Four in five apps never reach $1,000 a month.** Building for personal use first avoids betting on those odds before the tool is proven.

**The outlier everyone cites: Cal AI.** High schoolers built a photo-based calorie counter.

- **Growth:** about $28K in month one, about $115K in month two, then roughly $2M a month and $30M+ a year.
- **Exit:** MyFitnessPal bought it in December 2025.
- **Caveats:**
  - The revenue figures are the founders' own claims. TechCrunch could not verify them.
  - Growth came from heavy influencer marketing.
  - It is survivorship bias: thousands of similar apps make nothing.
- **The lesson:** distribution is the business, and the app is what gets distributed.

## The original idea: a public flipping assistant

The first version was a subscription app for resellers. It is parked, not dropped, and comes back only if the personal tool proves itself (Phase 3).

**The pitch.** Snap a photo of a clothing item. The app shows:

- what the item is
- what it cost new and whether it is on sale now
- what it sells for used
- profit per platform after fees and shipping
- a buy-or-pass verdict

**Who would pay:**

- **Active flippers**, who already spend on their business and value their time.
- **Not casual thrift shoppers**, who mostly stay free.
- Lucas's argument: someone flipping a warehouse of stock will pay $5 a month to save hours of price lookups.

**The "blurred profit" paywall.** Free users see everything except their profit, which is blurred with an upgrade button. They know exactly what they are paying for. It is a standard, honest freemium tactic.

**Draft tiers (never finalized):**

| Tier | Price | Scans | Profit shown |
| --- | --- | --- | --- |
| Free | $0 | 3 per week | Blurred |
| Pro | ~$5/month | 10–14 per week (undecided) | Yes |
| Unlimited | ~$12–15/month | Unlimited, fair-use cap, batch scanning | Yes |

**The math the founders started with, corrected:**

- **Revenue:** 100 Pro users at $5 is $500 a month gross.
  - Through Apple or Google in-app purchase (15%): ~$425.
  - Through Stripe on the web (~3% + $0.30 per charge): ~$455.
- **AI cost was underestimated.** The talk assumed "max $50 a month." 100 users at 14 scans a week is about 5,600 scans a month, roughly $55–170 at $0.01–0.03 per scan. These are estimates to check against real usage.
- **Unlimited plans need a cap.** One heavy user can cost more than they pay.
- **Market data was the real unknown.** It could be free or hundreds a month (see the next section).

**The long-term vision from that talk:**

- A constantly updated database of resale prices.
- A deal finder that surfaces underpriced listings.
- Eventually a marketplace that takes a cut of each sale, the way Depop earns several dollars on a $15 shirt.
- Lucas flagged that buying through the app gets close to dropshipping. Both agreed it is an end goal, not a starting point.

## The data access problem

The product depends on knowing what items actually sold for. That is the hardest data to get: only eBay offers an official route, and its sold-price route is restricted.

| Source | What it gives | Access | Notes |
| --- | --- | --- | --- |
| [eBay Browse API](https://developer.ebay.com/develop/get-started/get-started-on-a-buying-application) | Active listings and asking prices; search by keyword, category, price | Free developer signup | The legal, automatable core for eBay |
| [eBay Marketplace Insights API](https://www.developer.ebay.com/api-docs/buy/marketplace-insights/overview.html) | Sold-item history, last 90 days | Limited release, approved partners only | Forum posts show small developers being declined |
| [Depop Selling API](https://partnerapi.depop.com/api-docs/) | Manage your own shop: listings, orders, offers | Invite-only for enterprise partners | Gives no market prices. Public search endpoint was deprecated (HTTP 410) |
| Poshmark | Nothing official | No public API | Sold listings visible on the site when browsing |
| Paid scraper services (e.g. [Apify](https://apify.com/bovi/depop-scraper.md)) | Depop/eBay listings including sold | Pay per result | Still scraping; terms-of-service risk moves to the vendor |
| Our own logged sales | Real sold prices for what we flip | Ours | Grows with every sale; long-term moat |

**What we learned about scraping Depop and Poshmark:**

- **The law is gray, not clearly illegal.** US courts have mostly held that scraping public, logged-out pages is not hacking ([hiQ v. LinkedIn](https://en.wikipedia.org/wiki/HiQ_Labs_v._LinkedIn), Meta v. Bright Data). hiQ still lost in the end for breaking LinkedIn's terms, and logged-in scraping breaks terms you agreed to.
- **It breaks the platforms' terms either way.** Personal use mainly lowers the chance anyone pursues it. The realistic consequence is getting blocked or banned, not a lawsuit.
- **The biggest practical risk is the seller accounts.** Anything linked to the accounts used to sell flips can get them banned.
- **It is fragile.** Any site redesign or tighter bot blocking breaks it overnight.
- **No model training is needed.** The "AI reading the screen" idea from the conversation does not need a custom model or a powerful PC. Existing vision models read screenshots, and browser automation tools already exist. The problem is permission, not capability.

**The legal fallback that gets most of the value: one-tap sold-search links.**

- The tool builds pre-filled sold searches for Depop, Poshmark and eBay from the item it identified.
- A founder taps each one and sees real sold comps in about 10 seconds, browsing normally with no ban risk.
- The founder types in the prices seen.

**Current decision (Nov 25):**

- eBay goes through the official API.
- How Depop and Poshmark data is collected is left to Colin and Lucas.
- Whatever they choose must never touch the seller accounts.

## The two pivots

The plan changed twice on Nov 25: first from a public app to a personal tool, then from a simple tool to a full personal resale app.

**Pivot 1: build it for ourselves and start flipping.**

- **Trigger:** no Depop or Poshmark data, and "it would just make it harder." The screen-reading bot looked too complicated, and training a model was ruled out ("too much strain on my PC").
- **Decision:** stop building an app for the public and build a tool for our own flipping. Then go to the bins over break ("go mad early") and start flipping for real.
- **Why it is the stronger move:**
  - The founders are the first users, so they learn what flippers need firsthand.
  - Flipping produces real money now instead of waiting on subscribers.
  - Every logged sale builds a sold-price database no competitor has, which is the exact asset the public app lacked.
  - Collaboration stays the same: GitHub, with Colin working through Claude.

**Alternatives considered at that point:**

- **AI listing assistant.** A photo becomes a finished listing for any platform. It needs no market data from us.
- **Flipper profit tracker.** Runs entirely on the user's own data, so it is sticky. It is also less exciting and harder to make spread.
- **Both were folded into the plan** rather than chosen instead of it: listing drafts are Phase 2, and the tracker is Phase 1.

**Pivot 2: "what if this idea is bigger".**

- **The ask:** an entire resale app for the two of us that collects data from eBay, Depop and Poshmark and actively finds the best deals across markets.
- **Concerns raised, and accepted as known trade-offs:**
  - Scraping is fragile and breaks the platforms' terms.
  - Online-to-online margins are thin (see the economics section).
  - Fast deals get taken by experienced flippers already running alerts.
- **Founders' answer:** it is personal and not monetized, so the risk is acceptable to them. They will work out the Depop and Poshmark side themselves.
- **Resulting design: a watcher, not a crawler.**
  - A few saved searches (brand or item plus a maximum price) are checked every 15–30 minutes.
  - It flags only *new* listings priced below market value.
  - It shows profit after fees and sends an alert.
  - That is dozens of page loads an hour, not thousands, and it is more useful, because new underpriced listings are the only deals that matter.

## Product spec

The app runs one loop per item, scan to sold, and every completed loop adds a real sold price to our database.

**Bins scanner workflow:**

1. **Scan.** Photo of the item plus its brand tag.
2. **Identify.** A vision model returns brand, item type, material, rough era, size and condition notes, with a confidence level.
3. **Comps.**
   - Current eBay asking prices (Browse API).
   - One-tap sold searches on Depop, Poshmark and eBay, with prices typed in.
   - Our own past sales of similar items.
4. **Profit.** Purchase price, minus each platform's fees, payment processing and estimated shipping, gives net profit and ROI on Depop, Poshmark and eBay. The best platform is highlighted.
5. **Verdict.** BUY or PASS, plus a suggested list price.
6. **List.** AI drafts the title, description and tags from the photo.
7. **Track.** The item moves bought → listed → sold, recording the real sold price, platform, days to sell and real profit.

**Deal watcher workflow (Phase 2):**

1. Saved searches, each a brand or item plus a maximum price.
2. Checked on a schedule (every 15–30 minutes) across eBay and the agreed Depop/Poshmark method.
3. New listings since the last check are scored against our market value estimate.
4. Profit after fees is calculated.
5. Alert if it clears the profit threshold.

**Data we keep for every item:**

| Field group | Fields |
| --- | --- |
| Identity | Photo, AI identification, brand, category, size, condition |
| Purchase | Where bought, date, cost, which bins trip |
| Listing | Platforms, list price, date listed |
| Sale | Sold price, platform, date sold, fees, shipping, net profit |

**Dashboard roll-ups:**

- Profit per item, per bins trip and per month.
- Best and worst brands and categories.
- Average days to sell.
- Dead stock (listed 30+ days without selling).
- Year-end totals for taxes.

## Economics of flipping

The money is in buying offline cheaply. Buying online to resell online usually nets only $3–10 an item once fees and double shipping are paid.

**Example: buy online, resell online** (illustrative, approximate):

| Step | Amount |
| --- | --- |
| Buy a jacket on Depop | $20 |
| Shipping to us | ~$7 |
| Sell it on eBay | $45 |
| eBay fees (~13–15%) | ~–$6 |
| Ship to the buyer | ~–$8 |
| **Profit** | **~$4**, before time spent photographing, listing and shipping |

**Example: buy at the bins, resell online** (illustrative, approximate):

| Step | Amount |
| --- | --- |
| Bins price (most charge by the pound) | ~$1–3 for a light piece |
| Sell on Depop, Poshmark or eBay | $25–45 |
| Fees + shipping | ~–$10–15 |
| **Profit** | **~$10–30** |

**Platform fees to keep in config (verify before relying on them):**

- **Poshmark:** 20% on sales over $15, a flat fee under $15.
- **eBay:** roughly 13–15% for most clothing.
- **Depop:** changed its US fee structure recently. Check the current rate.

**Why online deals are hard:**

- Truly mispriced items, like underpriced Arc'teryx or rare vintage, get bought within minutes by experienced flippers running alerts.
- Speed is the whole game, and that is why the deal watcher alerts on *new* listings.

**Bins playbook for the first trip:**

- **Go early.** Call ahead for rotation times, since fresh bins are when the good items appear.
- **Bring** gloves, a big bag and a phone charger.
- **Pay by the pound.** Light pieces with strong brands give the best margin. Heavy denim and coats cost more.
- **Look for:** vintage band and graphic tees (single-stitch hems signal vintage), Carhartt, Patagonia, Arc'teryx, older made-in-USA Levi's, Ralph Lauren, workwear, Y2K.
- **Check condition before buying:** stains, holes, broken zippers, pilling.
- **Set a budget and log every item,** including the losers, so profit per trip is real.
- **Keep records for taxes.** Resale income is taxable.

## Roadmap

There are three phases, and each is gated by a real-world test, not a date.

| Phase | What gets built | Done when |
| --- | --- | --- |
| 1. Bins scanner | Photo identification; one-tap sold-search links; manual comp entry; per-platform profit calculator; buy/pass verdict; inventory log (bought/listed/sold) | We use it on a real bins trip and log every item bought |
| 2. Deal watcher + polish | Saved-search watcher across eBay/Depop/Poshmark with alerts; eBay Browse API prices; AI listing drafts; profit dashboard; our own sales used as comps | The watcher surfaces at least one profitable deal we act on, and our own sales start informing prices |
| 3. Decide on going public | Only if the tool clearly makes us money and saves time: open to other flippers, freemium with blurred profit | Profitable flips logged over a few months, plus a sold-price database big enough to be an edge |

## Tech plan

The stack is a phone-friendly web app on a small backend, using existing AI vision models. There is no model training and no App Store.

| Layer | Choice | Why |
| --- | --- | --- |
| Client | Mobile web app (PWA) | The phone camera works in the browser; no App Store review or 15–30% cut; used on the phone at the bins |
| Identification | Existing vision model (Claude or GPT) via API | No training, no special hardware; roughly a cent or less per scan (estimate) |
| Model access | One internal interface wrapping the model | Swap Claude and GPT without rewriting the app |
| Backend | Small API server | Handles scans, comps, profit math, the watcher schedule |
| Database | Items, trips, comps, sales, saved searches | Owns the sold-price history, the long-term asset |
| eBay data | eBay Browse API | Official, free; active listings and asking prices |
| Depop / Poshmark | TBD by founders; one-tap sold-search links as baseline | See the data access section |
| Alerts | Push, email or chat notification | The deal watcher has to reach us fast |
| Fee tables | Config file, not hard-coded | Platforms change fees often |
| Hosting | Lucas's spare hardware or a local machine | Fine while only the two of us use it; containerize so a move to the cloud is easy |
| Secrets | `.env` file, git-ignored | API keys never go in the repo |

**Already proven:** Lucas's QR-code pipeline works: image in, decode, look up, judge. The resale scanner is the same pattern with a clothing photo instead of a QR code.

**Accuracy tactics for identification:**

- Ask for a second photo of the brand tag.
- Ask one or two condition questions.
- Always show a confidence level, so a guess never looks like a fact.

**Build hygiene:**

- **Fail safely.** If one site's page format changes, skip that site and report it, rather than crashing the whole watcher.
- **Log everything.** Every AI call and every comp source, so a wrong price can be traced.

## Risks and rules

The top risk is losing the seller accounts, so every rule below protects them first.

| Risk | What could happen | Mitigation |
| --- | --- | --- |
| Seller account bans | Depop/Poshmark ban the accounts we sell from | Nothing automated ever uses or is linked to those accounts |
| Watcher gets blocked or breaks | Sites change layout or tighten bot blocking | Low request rate; fail safely per site; one-tap links as fallback |
| Wrong identification or price | We overpay at the bins or underprice a listing | Tag photo, confidence level, our own sales as comps |
| Thin online margins | Online deals net $3–10 after fees and shipping | Treat bins sourcing as the main profit; watcher alerts only above a profit threshold |
| Competition | eBay photo listing, Google Lens, WorthPoint, small resale-scanner apps | Doesn't matter while personal; edge if public = cross-platform profit + verdict + our data |
| Founder friction | Disagreement over money, ownership, effort | Written founder agreement and an agreed split of costs and profits |
| Taxes | Resale income is taxable | Log every purchase and sale from day one |
| AI cost creep | Heavy scanning adds up | Track cost per scan; cap usage if it grows |

**Project rules (also in `PROJECT.md`):**

1. **Personal use only.** Not public, not monetized. Data is never republished or sold.
2. **eBay through the official API.**
3. **Depop/Poshmark approach is the founders' call,** and whatever is chosen never touches the seller accounts.
4. **API keys never go in the repo.**
5. **Log every item,** including losers, or the profit numbers lie.
6. **Every decision goes in the decision log.**

## Open questions and next actions

The next three moves: set up the repo with `PROJECT.md`, sign up for eBay's developer program, and log the first bins trip.

**Next actions:**

- [ ] Create the shared GitHub repo and put `PROJECT.md` and this brief at its root
- [ ] Connect the repo to Codex and Claude so both read the spec
- [ ] Sign up for an eBay developer account (Browse API)
- [ ] Build the Phase 1 base on `main` together in one session
- [ ] Bins trip over break: go early, log every item bought
- [ ] Download and try competitors (eBay photo listing, Google Lens, WorthPoint, resale-scanner apps)
- [ ] Set up the AI jury review for pull requests

**Open questions:**

- [ ] Tool name?
- [ ] Who builds what? Is Lucas lead coder and stack owner?
- [ ] Which AI API (Claude or GPT), and whose account pays?
- [ ] How do we split bins costs and flip profits?
- [ ] How do we collect Depop and Poshmark data?
- [ ] Founder agreement: ownership split, decision rights, what happens if one person leaves
- [ ] Profit threshold for a watcher alert (e.g. only alert above $15 net)?
- [ ] Which brands and items go in the first saved searches?
- [ ] What has to be true after a few months to consider Phase 3 (going public)?

## Decision log

| Date | Decision |
| --- | --- |
| 2026-11-25 | Expanded scope: full personal resale app with a cross-platform deal watcher. Personal use, not monetized. Depop/Poshmark data approach left to the founders; replaces the earlier "no scraping" rule |
| 2026-11-25 | Start flipping for real: first bins trip over break |
| 2026-11-25 | No model training; use existing vision APIs |
| 2026-11-25 | Pivot: our own flipping tool first, not a public app |
| 2026-11-24 | Freemium idea (3 free scans/week, blurred profit, ~$5/mo Pro) parked for a possible public version |
| 2026-11-24 | Building an AI resale/flipping assistant, starting with clothing |

## Sources

- [RevenueCat: State of Subscription Apps 2025](https://www.revenuecat.com/state-of-subscription-apps-2025)
- [RevenueCat 2025 launch post](https://www.revenuecat.com/blog/company/the-state-of-subscription-apps-2025-launch)
- [Sherwood News: most new apps bomb](https://sherwood.news/tech/data-shows-most-new-apps-dont-just-fail-they-completely-bomb/)
- [9to5Mac: subscription app market 2026](https://9to5mac.com/2026/03/04/new-report-looks-into-the-sustainability-of-the-subscription-app-market-for-2026/)
- [UXCam: retention benchmarks](https://uxcam.com/blog/mobile-app-retention-benchmarks/)
- [Phiture: retention benchmarks](https://phiture.com/mobilegrowthstack/managing-retention-rate-benchmarks-and-expectations/)
- [SQ Magazine: in-game purchase stats](https://sqmagazine.co.uk/in-game-purchases-statistics/)
- [Superads: Meta CPI, US fitness](https://www.superads.ai/facebook-ads-costs/cost-per-app-install/fitness-training-centers/united-states)
- [Superframeworks: Cal AI case study](https://superframeworks.com/case-study/cal-ai)
- [Let's Data Science: Cal AI sold to MyFitnessPal](https://letsdatascience.com/news/cal-ai-sells-to-myfitnesspal-after-rapid-growth-f789c949)
- [eBay Marketplace Insights API](https://www.developer.ebay.com/api-docs/buy/marketplace-insights/overview.html)
- [eBay: get started on a buying application](https://developer.ebay.com/develop/get-started/get-started-on-a-buying-application)
- [eBay community: Marketplace Insights access](https://community.ebay.com/t5/eBay-APIs-Talk-to-your-fellow/Marketplace-Insights-API-access/m-p/34838736)
- [Depop Selling API docs](https://partnerapi.depop.com/api-docs/)
- [Apify Depop scraper](https://apify.com/bovi/depop-scraper.md)

Market figures come mostly from vendor reports and secondary coverage; treat them as directional. Fee and margin examples are approximate.
