import type { Article } from "./articles";
import { brandClusterPart2 } from "./brand-cluster-articles-2";

// Brand-question clusters (is-X-legit / X-cost / X-alternatives) for every
// weight-loss affiliate provider. House rules for these pieces:
//   - Every fact, price and quote is real - from the provider's published
//     program details or our own config data. Nothing invented, ever.
//   - No shared section skeletons: headings are specific to each provider and
//     each article, never a reusable template.
//   - Dense and useful beats long: concrete numbers, real math, honest
//     trade-offs. Tables only where the data is genuinely tabular.
export const brandClusterArticles: Article[] = [
  // ═════ embody ═════
  {
    slug: "embody-tirzepatide-review",
    title: "embody Tirzepatide Review (2026): $119/Month, No Contract",
    description:
      "embody tirzepatide costs $119/month (regularly $129) at every dose, with no commitment and 1-2 day cold shipping. What starting, titrating and switching look like.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    heroColor: "#F0FAF5",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "embody sells compounded tirzepatide (a GLP-1 + GIP medication) for $119/month at its current rate, regularly $129, month to month. That one price covers the medication, the clinician review, supplies and free 1-2 day cold-chain delivery.",
      "In our ranking only welludr (from $71 in its Pre-Black Friday sale) is cheaper; check its plan terms at checkout. Twelve months on embody comes to $1,428 at $119 or $1,548 at $129.",
      "Verified Reddit posters report approval on the same day, a vial inside a week, a dose step-up at the three-week check-in, and a switcher whose previous 15 mg dose was matched.",
      "The catch is a self-serve program: little live contact, a refill process one user had to ask Reddit about, and a gap between approval and shipping in some accounts. Trustpilot shows 3.8 from 9,604 reviews.",
    ],
    sections: [
      {
        heading: "How much is embody tirzepatide, and what does $119 cover?",
        body: `<div class="qa"><strong>Quick answer</strong>embody tirzepatide is <strong>$119 a month</strong> right now (the regular price is $129), with no contract. Its compounded semaglutide is <strong>$69 a month</strong>. Each price bundles the medication, a review by a licensed practitioner, injection supplies and free shipping that is temperature-controlled, tracked and insured. Orders placed before 2pm CT leave the same day and usually arrive in 1-2 days. embody holds LegitScript certification, uses US-based 503A compounding pharmacies, and gives a full refund if a provider declines to approve you.</div><p>Keep two points in mind when you compare it with anyone else:</p><ul><li><strong>It is compounded, not branded.</strong> This is compounded tirzepatide, not Zepbound or Mounjaro, and it is not an FDA-approved product. The <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">FDA's guidance on compounded GLP-1 drugs</a> applies.</li><li><strong>The price does not move with your dose.</strong> Tirzepatide's label climbs from 2.5 mg to as high as 15 mg a week. Providers that charge per dose bill you the most right when you are deepest into treatment, so a flat price matters more here than it does for semaglutide.</li></ul>`,
      },
      {
        heading: "First weeks on embody: approval, first vial and the 2.5 mg start",
        body: `<p>The clearest picture of embody's process comes from a verified <a href="https://www.reddit.com/r/compoundedtirzepatide/comments/1utd6g7/has_anyone_tried_em_ie_embody_the_price_is_good/" target="_blank" rel="nofollow noopener">r/compoundedtirzepatide thread</a>, where posters describe the steps rather than just giving a rating.</p><p><strong>A brand-new patient.</strong> This user left an earlier provider after a year of stalled progress: "I found embody and their new low price for triz and was okay with starting at the 2.5 (or slightly lower because of the b12). The med check was quick and I was approved same day, got my vial in just one week. Now 3 weeks in they bumped my dose to 5 (or 4.2) and shipped it out already. When I do the check in they will decide if I stick with 5 or go to 7.5 following month. But yeah if I wanted to get 10 from the start that may not have been possible. Everything is on autopilot, that's how they keep costs low."</p><p>Two takeaways from that post: new embody patients begin at the standard <a href="https://medlineplus.gov/druginfo/meds/a622044.html" target="_blank" rel="noopener">2.5 mg starting dose</a> and step up at check-ins, and the compounded formula the poster received includes B12.</p>`,
      },
      {
        heading: "Switching to embody from another tirzepatide provider",
        body: `<p>The same thread includes a switcher's timeline, which is useful if you already take tirzepatide elsewhere: "I just switched to Embody from NativeMed... I placed my order on Monday, dr approved it Tuesday, it shipped today (Thursday) and scheduled to arrive tomorrow. And they matched my last dosage." On what came in the box: "They sent two small vials and 6 needles with alcohol wipes. Everything is ready to go, I just pull 98 units, so almost a full syringe (15mg)." A third poster: "$129 for all levels of tri and no contract and I already moved up my dosages with no issues or kick back."</p><p>Not every account is that smooth:</p><ul><li>One customer was sent three vials at $129 each but waited roughly two weeks between approval and shipment, even though transit itself took one day.</li><li>Another found the pharmacy had added an anti-nausea ingredient without asking first, and the 50-unit doses were bigger than expected. That customer's second-month bill was correct.</li></ul>`,
      },
      {
        heading: "embody vs seven other tirzepatide providers on monthly price",
        body: `<p>Published compounded tirzepatide prices at our most recent check, with the terms attached to each:</p><table><tr><th>Provider</th><th>Tirzepatide per month</th><th>Terms</th></tr><tr><td><a href="/reviews/wellmedr">welludr</a></td><td>From $71</td><td>Pre-Black Friday sale (from October 28, 2026); check plan terms at checkout</td></tr><tr><td><strong>embody</strong></td><td><strong>$119 (reg. $129)</strong></td><td>Month to month, no commitment; 1-2 day shipping</td></tr><tr><td><a href="/reviews/directmeds">DirectMeds</a></td><td>$147</td><td>Flat, no membership; injections or sublingual drops</td></tr><tr><td><a href="/reviews/altrx">altRx</a></td><td>$149 (reg. $299)</td><td>Same price at every dose; pause or cancel anytime</td></tr><tr><td><a href="/reviews/medvi">Medvi</a></td><td>$166 (reg. $299)</td><td>Monthly, all-inclusive with video visits and coaching</td></tr><tr><td><a href="/reviews/sprout">Sprout</a></td><td>$199</td><td>Monthly; $200 off the first month</td></tr><tr><td><a href="/reviews/trimrx">TrimRx</a></td><td>$259</td><td>No long-term contract; unlimited check-ins</td></tr><tr><td><a href="/reviews/shed">SHED</a></td><td>$299</td><td>Monthly; results guarantee</td></tr></table><p>Annual cost on embody tirzepatide: <strong>$1,428</strong> at $119 or <strong>$1,548</strong> at $129. welludr comes in $576 a year lower at its sale price from $71 (check the plan terms at checkout); every other provider in the table costs more than embody. For brand-name pricing and dose-by-dose detail see the <a href="/tirzepatide">tirzepatide provider guide</a>; for embody's semaglutide numbers see the <a href="/articles/embody-cost">embody cost guide</a>.</p>`,
      },
      {
        heading: "embody's 3.8 Trustpilot score: praise and complaints",
        body: `<p>embody sits at <strong>3.8 on Trustpilot from 9,604 reviews</strong>, a big sample that leans positive with plenty of mixed feedback.</p><p><strong>What happy customers mention:</strong> communication and clinician contact. One tirzepatide patient writes that "from my very first inquiry I've had excellent communication... customer service updated me every step". Others describe providers who listen, doses that were adjusted, and an account manager who repaired a broken portal.</p><p><strong>What unhappy customers mention:</strong> a doctor who missed three video appointments and then called four days late, a first dose that took 8 days when 3-5 were promised, a refill three days overdue, and a billing dispute passed between support agents.</p><p>Put next to Reddit, the picture holds together: shipping is quick once an order leaves and the price matches the listing, but embody is designed to run with minimal human contact. The r/compoundedtirzepatide poster summed it up as "Great if you don't need to actually talk to anyone." Our <a href="/articles/is-embody-legit">embody legitimacy audit</a> covers the full record.</p>`,
      },
      {
        heading: "Four limits of embody's self-serve tirzepatide program",
        body: `<ul><li><strong>No high-dose start.</strong> New patients begin at 2.5 mg and move up at check-ins. Unless you are switching with a documented dose, you cannot begin higher.</li><li><strong>Messaging comes first.</strong> One Reddit user could not find the refill option in the dashboard and asked the community instead; another described the replies as AI-generated.</li><li><strong>Timing is inconsistent.</strong> The switcher above went from order to doorstep in four days, while another customer waited around two weeks between approval and shipment. Reorder well before your current supply runs out.</li><li><strong>Medication only.</strong> There is no coaching, no dietician and no brand-name option. If you want a human program around the drug, compare <a href="/articles/medvi-tirzepatide-cost">Medvi's $166 all-inclusive plan</a>.</li></ul>`,
      },
      {
        heading: "Who should choose embody tirzepatide",
        body: `<p><strong>A good fit</strong> if your priority is the lowest no-commitment price on compounded tirzepatide, you want quick cold-chain delivery, and you are fine with a self-serve service that raises your dose on the standard schedule. Switchers who can document their current dose get one of the smoothest transitions we have verified.</p><p><strong>A poor fit</strong> if you want regular live time with a clinician, need to start above 2.5 mg without records, or would rather pay welludr's sale price from $71 than embody's $119 month to month.</p><p class="cta-row"><a href="/reviews/embody">→ Full embody review: both plans and real customer feedback</a></p><p class="cta-row"><a href="/compare/embody-vs-wellmedr">→ embody vs welludr: $119 with no contract vs from $71 on sale</a></p><p>Compounded tirzepatide is not FDA-approved. Prices reflect embody's published rates at our last check and may change, so confirm them on embody's site. This article is general information, not medical advice.</p>`,
      },
    ],
  },
  // ═════ Ro ═════
  {
    slug: "is-ro-legit",
    title: "Is Ro Legit for Weight Loss? Yes, Read the Bill (2026)",
    description:
      "Ro is a legitimate US telehealth company with licensed providers and an in-house pharmacy, rated 3.9 from 7,105 Trustpilot reviews. Here is what the complaints are about.",
    category: "Guide",
    readTime: "8 min read",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    heroColor: "#EEF4FB",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "Ro is legitimate. It is an established US telehealth company, licensed providers review every intake (reviewers mention a video call with an MD), and Ro's own pharmacy fills the prescriptions.",
      "Ro's weight-loss program is built on brand-name medication: the Wegovy pill and pen and Zepbound. The medication is billed apart from a Body membership that costs $39 the first month and then $74-$149/month. Insurance can cover the drug.",
      "Trustpilot shows 3.9 from 7,105 reviews. September 2026 praise centers on speed and thorough providers; complaints center on the $39 fee covering the consultation, a second subscription charge, message-only support with 2-3 day replies, and a late delivery with melted ice packs.",
      "Reddit threads we verified show real results (22 to 60 pounds) and one recurring problem, cost: a highly upvoted member left over price despite a good experience.",
    ],
    sections: [
      {
        heading: "Is Ro a real, licensed weight-loss provider?",
        body: `<div class="qa"><strong>Quick answer</strong>Yes. Ro is among the longest-running telehealth companies in the US. Its weight-loss program uses licensed providers who review a medical intake and are able to turn you down, and prescriptions ship from Ro's in-house pharmacy. Being legitimate does not make Ro the right price model for everyone: the membership and the medication are billed separately, and most negative reviews are about understanding that bill rather than about the drug or the clinicians.</div><p>We judged Ro on the three questions used for every provider in our <a href="/how-to-choose-a-glp1-provider">GLP-1 provider guide</a>:</p><ol><li>Is there a genuine clinical gate before a prescription?</li><li>Do the advertised prices hold up at checkout?</li><li>What do public reviews say once you read the low-star ones first?</li></ol>`,
      },
      {
        heading: "From Ro intake to Wegovy or Zepbound at your door",
        body: `<p>The Ro process runs in four steps:</p><ol><li>You fill out an online medical assessment.</li><li>A qualified provider reviews it. Ro reviewers describe a video call with an MD and follow-up by message.</li><li>The provider decides whether treatment is appropriate and, if so, prescribes.</li><li>Ro's integrated pharmacy dispenses the medication to your home, and the provider adjusts your dose over time.</li></ol><p>A recent 5-star reviewer said it felt "just as if I was in with my primary care physician. They asked all necessary questions about my health and meds I take daily." Another wrote: "I have had a follow up from a doctor who explained the process, the medication and usage."</p><p>Two features set Ro apart from the compounded-first providers we rank:</p><ul><li><strong>Brand-name medication.</strong> Ro's published weight-loss pricing focuses on the <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener">Wegovy</a> pill and pen and the Zepbound KwikPen, not a flat compounded plan.</li><li><strong>Insurance can count.</strong> If your plan covers a GLP-1, Ro may cost much less than any cash price on this site. If it does not, you pay Ro's cash rate on top of the membership.</li></ul>`,
      },
      {
        heading: "Ro's 3.9 Trustpilot rating, read star by star",
        body: `<p>Across the company, Ro holds <strong>3.9 on Trustpilot from 7,105 reviews</strong>. We read the newest reviews at each star level in September 2026 instead of stopping at the average.</p><p><strong>5 stars: fast, and the clinician was good.</strong> "Applying for RO was quick and easy. I got a response within an hour!" "The meeting with the NP was on time. She was very thorough." "They are good to answer questions quickly and not leave you hanging." "All has been convenient and affordable so far."</p><p><strong>2 and 3 stars: three repeating issues.</strong></p><ul><li><strong>Billing.</strong> "I didn't understand that $39 initial fee was for consultation and not the medicine"; "I already saw a second charge for some kind of subscription in addition to the monthly charge"; "Would be nice to know the possible fee for medication before paying the $39."</li><li><strong>Reaching a person.</strong> "I wish you had a phone # for better communication"; "Needed to contact Ro by phone to expedite delivery. Impossible! Video call with MD a mere short formality. Messages returned in 2-3 business days". A 4-star reviewer adds: "I'd like to be able to chat directly with someone. All I can find are FAQ."</li><li><strong>Delivery and dosing.</strong> One order was "delayed for 4 days" and arrived with "all of the ice packs totally melted"; another reviewer "had to choose a medication without any guidance from a physician" and was billed before speaking to one; a third got "the smallest dosage of GLP-1" compared with friends on other platforms.</li></ul><p>None of this points to a sham. It points to a large company whose split billing and message-only support annoy a sizable minority, which is what a 3.9 usually looks like.</p>`,
      },
      {
        heading: "Ro on Reddit: 22 to 60 pounds, and a cost complaint",
        body: `<p>The Ro threads we verified are full of specific numbers:</p><ul><li>"I used Ro for 3 months and dropped 25 lbs... they were seamless throughout the whole process", followed by: "The pricing ended up being the deciding factor for me after those few months, I started with another provider."</li><li>A member since January 2024: "I'm loyal because they delivered what was promised... I've lost 50-60 lbs. I get my Wegovy shots through insurance and Walgreens."</li><li>"I've been on Ro for 3 months and have lost 22 pounds! Extremely happy!"</li></ul><p>On the other side, a Zepbound user two months into the 2.5 mg starter vials "lost 1 pound. Just one... It's been expensive and frustrating," and a would-be customer asked, "Could someone explain the cost breakdown to me? It's somewhat confusing."</p><p>The pattern: Ro's results and service get little criticism, and the membership-plus-medication cost is why people leave. Individual posts are anecdotes; we include them because the theme keeps coming back.</p>`,
      },
      {
        heading: "Three fair criticisms of Ro's weight-loss program",
        body: `<ol><li><strong>You get two charges.</strong> A membership ($39 for month one, then $74 to $149 a month by plan) and the medication at Ro's cash price unless insurance pays. The Wegovy pill starts at $149 for the first month and then runs $299; the Zepbound KwikPen starts at $299 for the first month and then costs more. Every "I didn't understand the fee" review comes back to this. The <a href="/articles/ro-cost">Ro cost guide</a> works through the totals.</li><li><strong>Support is by message.</strong> Several reviewers looked for a phone number and could not find one, and they report replies taking 2-3 business days.</li><li><strong>It is not the low-cost option.</strong> For cash payers, compounded semaglutide at <a href="/reviews/wellmedr">welludr</a> ($41), <a href="/reviews/embody">embody</a> ($69) or <a href="/reviews/altrx">altRx</a> ($89) costs a small fraction of branded medication plus a membership. Ro makes the most sense when insurance covers the drug.</li></ol>`,
      },
      {
        heading: "Verdict: Ro is legit; decide on the pricing model",
        body: `<p>Ro is legitimate: licensed providers who can say no, an in-house pharmacy, FDA-approved brand-name medication, and 7,105 public reviews that read like a big, real company. Most people find it quick and professional; a minority are frustrated by billing and hard-to-reach support.</p><p>The real decision is about the model. With insurance that covers a GLP-1 and a preference for the branded pen through a well-known platform, Ro is a strong choice. Paying cash and chasing the lowest monthly figure, the compounded providers are far cheaper.</p><p class="cta-row"><a href="/reviews/ro">→ Full Ro review: plans and real customer reviews</a></p><p class="cta-row"><a href="/compare/medvi-vs-ro">→ Medvi vs Ro: all-inclusive compounded care vs brand-name plus membership</a></p><p class="cta-row"><a href="/compare/embody-vs-ro">→ embody vs Ro: $69 flat vs a membership model</a></p><p>Prices reflect Ro's published rates at our last check and may change, so confirm them on Ro's site. This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "ro-cost",
    title: "Ro Weight Loss Cost (2026): Membership Plus Medication",
    description:
      "Ro bills a Body membership ($39 month one, then $74-$149) plus medication: Wegovy pill from $149, Zepbound from $299, unless insurance pays. Year-one totals inside.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    heroColor: "#F0FAF5",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "Ro weight loss involves two separate charges: the Body membership ($39 for month one, then $74 to $149 a month, with $74 the 12-month prepaid rate) and the medication itself.",
      "Ro's published cash medication prices: Wegovy pill $149 for the first month then $299; Wegovy pen from $199 at introductory rates then $299-$399; Zepbound KwikPen from $299 for the first month then $399-$449.",
      "A cash-pay first year on the Wegovy pill comes to about $4,300 with a prepaid membership. When insurance covers the drug, you pay the membership plus copays, which can make Ro the cheapest route on this site.",
      "For cash payers, all-inclusive compounded semaglutide at welludr ($41), embody ($69) or altRx ($89) costs far less. Ro's value lies in brand-name medication and the insurance route.",
    ],
    sections: [
      {
        heading: "What are Ro's two weight-loss charges?",
        body: `<div class="qa"><strong>Quick answer</strong>Ro charges for a <strong>Body membership</strong> and, separately, for the <strong>medication</strong>. The membership is $39 for the first month and then $74 to $149 a month depending on plan; $74 is the rate on a 12-month prepaid plan. The medication is paid through your insurance or at Ro's cash price. The $39 covers the consultation and membership, not the drug. That one detail drives most of Ro's low-star reviews, so be clear on it before you pay.</div><p><strong>The membership pays for:</strong> the provider assessment and follow-up, dose adjustments over time, and the pharmacy service.</p><p><strong>The medication is brand-name:</strong> Ro's published weight-loss pricing focuses on the Wegovy pill, the Wegovy pen and the Zepbound KwikPen, not a flat compounded plan. Ro says some plans may qualify for HSA/FSA payment; check your own plan.</p>`,
      },
      {
        heading: "Ro Wegovy and Zepbound cash prices: intro vs ongoing",
        body: `<p>Ro's cash prices at our last check. Each one has a lower introductory price and a higher ongoing price; budget on the ongoing figure.</p><table><tr><th>Medication</th><th>First month</th><th>Ongoing</th></tr><tr><td>Wegovy pill (semaglutide)</td><td>$149</td><td>$299/month</td></tr><tr><td>Wegovy pen (semaglutide)</td><td>from $199</td><td>$299-$399/month</td></tr><tr><td>Zepbound KwikPen (tirzepatide)</td><td>from $299</td><td>$399-$449/month</td></tr></table><p>If insurance covers a GLP-1, your copay replaces the medication line. One Reddit member we verified gets "Wegovy shots through insurance and Walgreens" and has stayed with Ro since January 2024. Without coverage, the prices above apply in addition to the membership.</p>`,
      },
      {
        heading: "Ro's first-year cost in three scenarios",
        body: `<p>Totals use Ro's published rates with the membership included. On the monthly plan we assume $39 for month one and $149 for each month after; the prepaid plan is $74 a month for twelve months.</p><table><tr><th>Scenario</th><th>Membership, year one</th><th>Medication, year one</th><th>Total</th></tr><tr><td>Wegovy pill, cash, monthly membership</td><td>$39 + 11 × $149 = $1,678</td><td>$149 + 11 × $299 = $3,438</td><td>about $5,100</td></tr><tr><td>Wegovy pill, cash, 12-month prepaid membership</td><td>12 × $74 = $888</td><td>$3,438</td><td>about $4,300</td></tr><tr><td>Insurance covers the medication, prepaid membership</td><td>$888</td><td>Your copays</td><td>$888 + copays</td></tr></table><ul><li><strong>With insurance:</strong> Ro is frequently the cheapest way on this site to take brand-name medication under medical supervision.</li><li><strong>Paying cash:</strong> the medication dominates. On the prepaid plan the membership is only about a fifth of the year's bill.</li></ul>`,
      },
      {
        heading: "Ro vs compounded GLP-1 providers: monthly cost by route",
        body: `<p>Comparing Ro fairly means comparing routes. Compounded providers charge one all-inclusive price for compounded medication; Ro charges for brand-name medication plus a membership.</p><table><tr><th>Route</th><th>Semaglutide, monthly</th><th>What is included</th></tr><tr><td><a href="/reviews/wellmedr">welludr</a>, compounded</td><td>From $41 (Pre-Black Friday sale)</td><td>Medication, provider, coach, shipping</td></tr><tr><td><a href="/reviews/embody">embody</a>, compounded</td><td>$69, no commitment</td><td>Medication, provider, shipping</td></tr><tr><td><a href="/reviews/altrx">altRx</a>, compounded</td><td>$89 flat at every dose</td><td>Medication, provider, shipping</td></tr><tr><td><a href="/reviews/altrx">altRx</a>, brand-name Wegovy</td><td>$1,579 cash, flat</td><td>Medication, provider, shipping; no membership</td></tr><tr><td><strong>Ro</strong>, brand-name Wegovy pill</td><td><strong>$299 ongoing + $74-$149 membership</strong></td><td>Provider, in-house pharmacy, dose adjustments</td></tr><tr><td><strong>Ro</strong>, brand-name via insurance</td><td><strong>copay + $74-$149 membership</strong></td><td>As above</td></tr></table><p>How to read it: a cash payer who is open to compounded medication pays several times more each month at Ro than in the value tier, which is the exact complaint in the Reddit threads. Someone who wants the FDA-approved brand pays less at Ro than altRx's flat $1,579, even with the membership added, and the insurance route can beat every option. Our <a href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name guide</a> explains the trade-off.</p>`,
      },
      {
        heading: "Should you pay for Ro? Checks before the $39",
        body: `<p><strong>Ro is worth it</strong> if insurance covers a GLP-1, or if you specifically want brand-name Wegovy or Zepbound from an established company with its own pharmacy and ongoing provider follow-up. The membership is what you pay for that setup.</p><p><strong>Ro is not worth it</strong> if you pay cash and the monthly total is your main concern. Compounded semaglutide, the same molecule, costs $41 to $89 all-in elsewhere, and over twelve months the difference runs to thousands of dollars. One Ro customer said it directly: "the pricing ended up being the deciding factor" after a good three months.</p><p>Before paying the $39:</p><ol><li>Know that it is the consultation fee, not medication.</li><li>Check whether your insurance covers the drug.</li><li>Ask for the ongoing (not introductory) medication price at your maintenance dose.</li></ol><p class="cta-row"><a href="/reviews/ro">→ Full Ro review</a></p><p class="cta-row"><a href="/articles/is-ro-legit">→ Is Ro legit? What 7,105 reviews and Reddit show</a></p><p class="cta-row"><a href="/compare/altrx-vs-ro">→ altRx vs Ro: flat cash prices vs membership plus insurance</a></p><p>Prices reflect Ro's published rates at our last check and may change, so confirm them on Ro's site. Brand-name Wegovy and Zepbound are FDA-approved. This article is general information, not medical advice.</p>`,
      },
    ],
  },
  // ═════ Medvi ═════
  {
    slug: "is-medvi-legit",
    title: "Is Medvi Legit? 4.3 Stars From 14,987 Reviews (2026)",
    description:
      "Yes. Medvi uses licensed providers on video visits and holds 4.3 on Trustpilot from 14,987 reviews. We read the praise and the 1-star renewal and refund complaints.",
    category: "Guide",
    readTime: "9 min read",
    publishedAt: "2026-08-06",
    updatedAt: "2026-09-25",
    heroColor: "#EEF4FB",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "Medvi is legitimate. Licensed providers hold real video visits, the medical intake can end in a decline, and the company holds 4.3 on Trustpilot from 14,987 reviews, a volume that is very hard to fake.",
      "September 2026 reviews still praise named nurses and providers. 4-star reviewers ask for more flexible subscriptions and a dependable video connection; 1-star reviewers describe a renewal without notice, a refused refund and a wrong-dose shipment.",
      "Medvi's pricing is all-inclusive and HSA/FSA-approved: compounded semaglutide at $99/month (reg. $199) and compounded tirzepatide at $166/month (reg. $299), with no price increase as the dose rises.",
      "Fair criticisms: Medvi is not the cheapest (welludr $41, embody $69), it prescribes compounded medication only, it bills monthly only, and whether its support premium pays off is a personal judgment.",
    ],
    sections: [
      {
        heading: "What do 14,987 Trustpilot reviews say about Medvi?",
        body: `<div class="qa"><strong>Quick answer</strong>Medvi is a legitimate telehealth weight-loss provider. Its strongest evidence is public: <strong>4.3 out of 5 on Trustpilot from 14,987 reviews</strong>, a sample far too large to manufacture and big enough that repeated themes carry weight.</div><p>Most legitimacy questions have to be answered with indirect clues. With Medvi you can start with the reviews themselves, and the dominant theme is not price. It is the people. "The phone call was very thorough and everything went smoothly" (Randy). "My provider was very friendly. She answered all my questions very thoughtfully and thoroughly" (Ashley). "She took her time, answered any questions" (Raymond). "Video visit was made very easy and reminders were sent right before my visit" (Martin).</p><p>Thorough calls, patient providers and easy scheduling, repeated across thousands of reviews, are the signature of a working clinical service rather than a checkout page with a physician's name attached.</p>`,
      },
      {
        heading: "Medvi's process: intake, video visit, then monitoring",
        body: `<p>Medvi follows the sequence regulators expect from legitimate telehealth:</p><ol><li><strong>Medical intake.</strong> You report your history, current medications and goals.</li><li><strong>Licensed provider review.</strong> This is a genuine gate. Providers can and do decline patients for whom GLP-1 treatment is not appropriate.</li><li><strong>Free shipping.</strong> If prescribed, medication is shipped to your home at no charge.</li><li><strong>Ongoing monitoring.</strong> Scheduled check-ins, dose changes handled by the provider, and access to your care team between visits.</li></ol><p>Two points stand out. Reviewers describe video visits, so you actually see and talk with your provider, a higher bar than the questionnaire-only intake some competitors use. And every plan includes a <strong>dietician and care coaching</strong>, which is uncommon at this price and clinically useful: GLP-1s change what and how much you eat, and most people do better with guidance through that shift.</p>`,
      },
      {
        heading: "Does Medvi have hidden fees or dose-based price hikes?",
        body: `<p>In this market, legitimacy problems usually show up as pricing tricks rather than fake medicine: teaser rates that jump at higher doses, membership fees layered over the drug, or extra charges at checkout. Medvi avoids all three:</p><table><tr><th>Plan</th><th>Medication</th><th>What you pay</th></tr><tr><td>GLP-1</td><td><a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">Compounded semaglutide, weekly</a></td><td>$99/month promo (reg. $199), all-inclusive</td></tr><tr><td>GLP-1 + GIP</td><td>Compounded tirzepatide, weekly</td><td>$166/month promo (reg. $299), all-inclusive</td></tr></table><p>"All-inclusive" at Medvi means medication, provider consultations, monitoring, the dietician and coaching, and free shipping in a single price. Medvi is also <strong>HSA/FSA approved</strong>, so pre-tax money can pay for it. Full plan detail is in our <a href="/reviews/medvi">Medvi review</a>.</p>`,
      },
      {
        heading: "Medvi reviews from September 2026: 5, 4 and 1 star",
        body: `<p>We reopened Medvi's Trustpilot page on September 25, 2026 and read the latest reviews instead of the headline score.</p><p><strong>5 stars: reviewers name the people who helped them.</strong> "Theresa was thoughtful and explained all of her observations." "Nurse was very informative and pleasant to talk with." "My provider was very helpful. She listened to my concerns and made proper adjustments." "Tomica, the company rep was outstanding." Some carry Trustpilot's "Invited" label, meaning Medvi requested the review after an appointment; others were unprompted. The theme is unchanged from August: customers are rating the clinical contact.</p><p><strong>4 stars: the most practical feedback.</strong> One customer "at first had a hard time canceling my monthly subscription, but they did finally get that taken care of" and would like "an every other month, or just buy as needed" option; Medvi only bills monthly. Another likes the RN, provider and coaching support but wants "a solid audio-video connection to see whom you're speaking with" and to see their credentials. Shorter ones: "Quick, easy, to the point." "Very personal, communicated all needs." Medvi answers these publicly.</p><p><strong>1 star: few, but serious and specific.</strong></p><ul><li>A prepaid annual plan renewed after 11 shipments without notice and was refunded only after BBB, FTC and state attorney-general complaints.</li><li>A charge taken before any clinician contact, then a wrong-dose shipment and a refused refund.</li><li>A transferring patient repeatedly sent a starter dose instead of the maintenance dose.</li><li>Contact that stopped after five months, with no cancellation confirmation across three calls.</li></ul><p>One reviewer also says Medvi's tirzepatide tops out at 11.125 mg, which we have not verified. These complaints are a small slice of 14,987 reviews, but they group around billing, renewals and cancellation. Read the renewal terms before prepaying and get the cancellation route in writing.</p>`,
      },
      {
        heading: "Where Medvi falls short on price, medication and flexibility",
        body: `<ul><li><strong>Not the cheapest semaglutide.</strong> Even at the $99/month promo (regularly $199), <a href="/reviews/wellmedr">welludr</a> sells the same active ingredient from $41 and <a href="/reviews/embody">embody</a> for $69. At the promo price, Medvi's support premium is $30-$58 a month; at the $199 regular price it is $130-$158. Whether that is worth paying is your call.</li><li><strong>Compounded only.</strong> If you want brand-name Ozempic or Zepbound, you need a provider with a brand shelf, such as <a href="/reviews/altrx">altRx</a>.</li><li><strong>A narrower menu.</strong> Medvi offers fewer medications than platforms that also prescribe non-GLP-1 options.</li></ul>`,
      },
      {
        heading: "Verdict: Medvi is legit, with a high-touch price tag",
        body: `<p>Medvi is legitimate and has more public proof than nearly any competitor: licensed providers on real video visits, ongoing monitoring, transparent all-inclusive pricing, HSA/FSA approval, and 14,987 Trustpilot reviews averaging 4.3 that describe the same thorough, personal care again and again.</p><p>Legitimate does not mean perfect. The 1-star reviews about renewals, refunds and cancellation are real, and monthly-only billing is a true limitation for anyone who wants to buy as needed. The real question is whether you want mid-market pricing for high-touch support on a monthly plan. If you do, Medvi is one of the strongest versions of that offer.</p><p class="cta-row"><a href="/reviews/medvi">→ Full Medvi review: pricing and real customer reviews</a></p><p class="cta-row"><a href="/compare/healthrx-vs-medvi">→ Medvi vs HealthRx's $99 prepaid plan, compared</a></p>`,
      },
      {
        heading: "How we checked Medvi, and how to check it yourself",
        body: `<p><strong>Our sources.</strong> Medvi's Trustpilot profile, reread on September 25, 2026: a claimed profile (January 2025) in the Weight Loss Service category, showing 4.3 from 14,987 reviews as of October 12, 2026. We read the newest reviews at every star level, unfiltered, and quote them as written with reviewer names shortened. The prescribing process, video visits, dietician and coaching come from Medvi's published care model and from its reviewers' accounts. Prices come from our verified registry, checked against Medvi's site, and are the published cash-pay rates on that date.</p><p><strong>What we could not confirm.</strong> The material we reviewed does not name the pharmacy that fills Medvi's compounded prescriptions. One reviewer's claim that tirzepatide tops out at 11.125 mg is unconfirmed. We cannot audit medical quality; a Trustpilot score reflects customer experience, not clinical outcomes. We may earn a commission if you sign up through a link here; that does not change what we report.</p><p><strong>A five-minute self-check before you sign up with Medvi:</strong></p><ol><li>Open Medvi's Trustpilot page, sort by newest, and read the 1-star and 4-star reviews before the 5-star ones. Check whether the billing, renewal and cancellation themes are still current.</li><li>Ask support which pharmacy fills the prescription, whether it is a <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener">503A pharmacy or 503B outsourcing facility</a>, and whether it compounds the base form of semaglutide rather than a <a href="https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss" target="_blank" rel="noopener">salt form</a>. A legitimate provider can answer in one sentence.</li><li>During the video visit, ask for the provider's name and licensing state, then look them up on that state's medical or nursing board site. It takes about a minute.</li><li>Read the renewal and cancellation terms before you prepay anything, for the reasons the 1-star reviews show.</li><li>Ask what you will pay at your maintenance dose. Medvi says pricing is all-inclusive with no dose-based increases; get that confirmed in writing before your first charge.</li></ol><p>This article is general information, not medical advice. Compounded medications are not FDA-approved products; ask a licensed clinician whether GLP-1 treatment suits you.</p>`,
      },
    ],
  },
  {
    slug: "medvi-cost",
    title: "Medvi Cost (2026): What $99 a Month Includes",
    description:
      "Medvi costs $99/month promo (reg. $199) for semaglutide and $166 (reg. $299) for tirzepatide, all-inclusive. Year totals, rival prices and when Medvi is worth it.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-08",
    updatedAt: "2026-09-15",
    heroColor: "#F0FAF5",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "Medvi charges $99/month for compounded semaglutide (a promo price, regularly $199) or $166/month for compounded tirzepatide (regularly $299), all-inclusive.",
      "The single price bundles medication, provider consultations, monitoring, a dietician with care coaching, and free shipping. HSA/FSA accepted, and the price does not rise with dose.",
      "Twelve months at promo rates: $1,188 on semaglutide or $1,992 on tirzepatide.",
      "welludr, embody and HealthRx sell the same semaglutide for $41-$99. Medvi's extra cost pays for human support, which is worth it only if support decides whether you succeed.",
    ],
    sections: [
      {
        heading: "How much does Medvi cost per month?",
        body: `<div class="qa"><strong>Quick answer</strong>Medvi is <strong>$99 a month for compounded semaglutide</strong> on its current promotion (regularly $199), or <strong>$166 a month for compounded tirzepatide</strong> (regularly $299). That price includes the medication, provider consultations, regular monitoring, a dietician with care coaching, and free shipping. There is no membership fee, no increase as your dose rises, and nothing added at checkout. You can pay with HSA/FSA funds.</div><p>Bundling is the whole idea. With providers that price each piece separately, the advertised medication price is where the bill starts. With Medvi, the advertised price is the full bill, which makes it one of the easier GLP-1 programs to budget for.</p>`,
      },
      {
        heading: "Medvi semaglutide and tirzepatide: 3, 6 and 12-month totals",
        body: `<p>A GLP-1 is not a one-month purchase. Meaningful results build over months, with <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener">dose titration along the way</a> (our guide to <a href="/articles/first-month-weight-loss-medication">the first month on weight-loss medication</a> covers the start). Budget for it as an ongoing cost:</p><table><tr><th>Timeline</th><th>Semaglutide ($99/mo promo)</th><th>Tirzepatide ($166/mo promo)</th></tr><tr><td>3 months</td><td>$297</td><td>$498</td></tr><tr><td>6 months</td><td>$594</td><td>$996</td></tr><tr><td>12 months</td><td>$1,188</td><td>$1,992</td></tr></table><ul><li><strong>Dose increases are included.</strong> Many competitors charge more as you titrate; Medvi does not.</li><li><strong>HSA/FSA eligible.</strong> Paying with pre-tax dollars effectively lowers these totals by your marginal tax rate.</li></ul><p>The tirzepatide plan gets its own breakdown in our <a href="/articles/medvi-tirzepatide-cost">Medvi tirzepatide cost guide</a>.</p>`,
      },
      {
        heading: "Medvi's $99 next to six other GLP-1 providers",
        body: `<p>Medvi against the rest of our ranking, at each provider's listed price:</p><table><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th><th>Pricing model</th></tr><tr><td>welludr</td><td>from $41/mo</td><td>from $71/mo</td><td>Pre-Black Friday sale; check plan terms</td></tr><tr><td>embody</td><td>$69/mo</td><td>$119/mo</td><td>Flat monthly, no commitment</td></tr><tr><td>altRx</td><td>$89/mo</td><td>$149/mo</td><td>Flat at every dose, BNPL</td></tr><tr><td>HealthRx</td><td>$99/mo</td><td>from $179/mo</td><td>12-month prepaid ($1,188 upfront)</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>$147/mo</td><td>Flat, needle-free option</td></tr><tr><td><strong>Medvi</strong></td><td><strong>$99/mo promo (reg. $199)</strong></td><td><strong>$166/mo promo (reg. $299)</strong></td><td>Monthly all-inclusive + coaching</td></tr><tr><td>SHED</td><td>$199/mo</td><td>$299/mo</td><td>Coaching + money-back guarantee</td></tr></table><p>At its regular $199/$299, Medvi sits near the top of the compounded market. The $99/$166 promotion pulls it into the value tier without dropping the bundle. What any premium buys, according to its 14,987 Trustpilot reviews averaging 4.3, is the human layer: video visits, thorough providers and dietician support. None of the cheaper providers bundle all of that.</p>`,
      },
      {
        heading: "Who gets their money's worth from Medvi?",
        body: `<p><strong>Medvi pays off</strong> when support is what makes or breaks your progress. If medication-only programs have left you stalled, if you want a provider who picks up the call instead of an inbox, or if a dietician guiding your food changes sounds like the missing piece, that is what Medvi actually sells, and its review record says it delivers.</p><p><strong>Medvi does not pay off</strong> if you are self-directed and watching every dollar. <a href="/reviews/wellmedr">welludr</a>, <a href="/reviews/embody">embody</a> and <a href="/reviews/healthrx">HealthRx</a> sell the same semaglutide for $41-$99, a gap that reaches four figures over a year. The medication is the same; the difference is entirely the care around it.</p><p class="cta-row"><a href="/compare/healthrx-vs-medvi">→ HealthRx's $99 prepaid vs Medvi's $99 promo, side by side</a></p><p>This article is general information, not medical advice. Prices are as listed when we wrote this; confirm current pricing on each provider's site.</p>`,
      },
    ],
  },
  {
    slug: "medvi-tirzepatide-cost",
    title: "Medvi Tirzepatide Cost (2026): $166/Month, All-In",
    description:
      "Medvi compounded tirzepatide is $166/month on promo (reg. $299), with video visits, monitoring, coaching and shipping included. Yearly totals and rival prices.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-27",
    heroColor: "#F0FAF5",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "Medvi's compounded tirzepatide (GLP-1 + GIP) costs $166/month at the current promotional price and $299/month at the regular price. It is all-inclusive and stays the same as your dose increases.",
      "Twelve months costs $1,992 at the promo price or $3,588 at the regular price, and both are HSA/FSA-eligible.",
      "Of the nine providers we rank with published compounded tirzepatide prices, Medvi is fifth: welludr from $71, embody $119, DirectMeds $147 and altRx $149 cost less; HealthRx from $179, Sprout $199, TrimRx $259 and SHED $299 cost more.",
      "The extra cost pays for video visits, scheduled monitoring, a dietician and care coaching. Medvi's 4.3 from 14,987 Trustpilot reviews mostly praises that support; its 1-star reviews concern renewals and refunds.",
    ],
    sections: [
      {
        heading: "What is Medvi's tirzepatide price, promo and regular?",
        body: `<div class="qa"><strong>Quick answer</strong>Medvi charges <strong>$166 a month for compounded tirzepatide</strong> on its current promotion and <strong>$299 a month</strong> at the regular rate. The price covers the medication, video visits with a provider, ongoing monitoring, a dietician with care coaching, and free shipping. There is no membership fee and <strong>no increase as your dose climbs</strong>. HSA/FSA funds are accepted.</div><p>The key word is "promotional". The material we reviewed gives no end date for the $166 rate, so if you expect to stay on tirzepatide for a year or longer, budget on $299 and check the live rate on Medvi's site before your first charge. Medvi's semaglutide plan works the same way ($99/month promo, $199 regular); see the <a href="/articles/medvi-cost">Medvi cost guide</a> for that breakdown.</p>`,
      },
      {
        heading: "Medvi tirzepatide over 3, 6 and 12 months",
        body: `<p><a href="https://medlineplus.gov/druginfo/meds/a622044.html" target="_blank" rel="noopener">Tirzepatide</a> is stepped up over several months, and results build on the same timeline, so plan for an ongoing cost:</p><table><tr><th>Timeline</th><th>At $166/mo (promo)</th><th>At $299/mo (regular)</th></tr><tr><td>3 months</td><td>$498</td><td>$897</td></tr><tr><td>6 months</td><td>$996</td><td>$1,794</td></tr><tr><td>12 months</td><td>$1,992</td><td>$3,588</td></tr></table><ul><li><strong>Higher doses cost the same.</strong> This matters more for tirzepatide than semaglutide, because maintenance doses are where per-dose pricing elsewhere rises fastest.</li><li><strong>Pre-tax payment.</strong> HSA/FSA eligibility cuts the effective cost by your marginal tax rate.</li></ul>`,
      },
      {
        heading: "Where Medvi's $166 ranks among nine tirzepatide providers",
        body: `<p>Published compounded tirzepatide prices at our last check, with each provider's terms:</p><table><tr><th>Provider</th><th>Tirzepatide per month</th><th>Terms</th></tr><tr><td><a href="/reviews/wellmedr">welludr</a></td><td>From $71</td><td>Pre-Black Friday sale (from October 28, 2026); check plan terms at checkout</td></tr><tr><td><a href="/reviews/embody">embody</a></td><td>$119 (reg. $129)</td><td>Flat monthly, no commitment</td></tr><tr><td><a href="/reviews/directmeds">DirectMeds</a></td><td>$147</td><td>Flat, no membership; injections or sublingual drops</td></tr><tr><td><a href="/reviews/altrx">altRx</a></td><td>$149 (reg. $299)</td><td>Same price at every dose; pause or cancel anytime; BNPL</td></tr><tr><td><strong>Medvi</strong></td><td><strong>$166 (reg. $299)</strong></td><td>Monthly, all-inclusive with video visits and coaching</td></tr><tr><td><a href="/reviews/healthrx">HealthRx</a></td><td>from $179</td><td>Per month; overnight cold-chain shipping</td></tr><tr><td><a href="/reviews/sprout">Sprout</a></td><td>$199</td><td>Monthly; $200 off the first month</td></tr><tr><td><a href="/reviews/trimrx">TrimRx</a></td><td>$259</td><td>No long-term contract; unlimited check-ins</td></tr><tr><td><a href="/reviews/shed">SHED</a></td><td>$299</td><td>Monthly; 20% off month one; results guarantee</td></tr></table><p>Look at the terms, not just the price. The four cheaper providers run lighter programs: welludr's from-$71 price is a Pre-Black Friday sale rate (check the plan terms at checkout), embody and DirectMeds are self-serve, and altRx's $149 is a promo against the same $299 regular price Medvi has. Medvi costs $17 to $95 a month more than those four, and that difference pays for video visits, scheduled monitoring and a dietician. It is worth paying only if support is what drives your results. For reference, brand-name Zepbound is $1,249/month cash at altRx; the <a href="/tirzepatide">tirzepatide provider guide</a> covers the branded route.</p>`,
      },
      {
        heading: "Medvi tirzepatide patients on support, billing and dose",
        body: `<p>Medvi holds 4.3 on Trustpilot from 14,987 reviews, and the September 2026 reviews we read focus on clinical contact more than price: "My provider was very helpful. She listened to my concerns and made proper adjustments." "Nurse was very informative and pleasant to talk with." A 4-star reviewer on the compounded GLP-1 plan values the RN, provider and coaching support but wants a dependable video connection to see who is on the call, adding: "It cost too much not to receive stellar service."</p><p>Critical reviews from the same month are about money, not the drug: a prepaid annual plan that renewed after 11 shipments without notice, a charge taken before any clinician contact followed by a wrong-dose shipment, and a cancellation that took effort. One reviewer says Medvi's tirzepatide tops out at 11.125 mg; we have not verified this and have asked. On Reddit, a commenter in a verified thread called Medvi "the best triz provider i ever had (changed 3 providers so far)", and year-long write-ups list the ongoing monthly cost as the one drawback. Our <a href="/articles/is-medvi-legit">Medvi legitimacy audit</a> has the full record.</p>`,
      },
      {
        heading: "Should you pay $166 a month for Medvi tirzepatide?",
        body: `<p><strong>Yes</strong> if you want a clinician you actually see, dose changes made inside scheduled monitoring, and a dietician to help with the eating changes tirzepatide brings. At the promo price, the premium over self-serve providers is small enough that the support layer costs very little extra.</p><p><strong>No</strong> if you are self-directed and price-conscious, or if you expect to stay past the promotion at $299. On the same molecule, welludr's sale price from $71 or embody's $119 with no commitment would save you roughly $560 to $2,740 a year depending on which Medvi rate applies. Medvi also bills monthly only; a 4-star reviewer's request for an every-other-month option shows the limit if you want to buy as needed.</p><p class="cta-row"><a href="/reviews/medvi">→ Full Medvi review: both plans and real customer reviews</a></p><p class="cta-row"><a href="/compare/medvi-vs-trimrx">→ Medvi vs TrimRx: $166 vs $259 tirzepatide</a></p><p>Compounded tirzepatide is not an FDA-approved product; see the <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">FDA's guidance on compounded GLP-1 drugs</a>. Prices reflect Medvi's published rates at our last check and may change; confirm on Medvi's site. This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "medvi-alternatives",
    title: "Medvi Alternatives (2026): 6 GLP-1 Options Compared",
    description:
      "Six alternatives to Medvi's all-inclusive GLP-1 program ($99/month promo), from welludr at $41 to SHED's money-back guarantee, with the trade-off for each.",
    category: "Comparison",
    readTime: "7 min read",
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-15",
    heroColor: "#FBF3EE",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "Medvi's $99/month promo (reg. $199) includes video visits, a dietician and coaching. Every alternative gives up part of that support.",
      "For a lower price: welludr ($41/$71, Pre-Black Friday sale prices), embody ($69/$119, no commitment) and HealthRx ($99 on a 12-month prepaid plan, overnight shipping).",
      "For more medication choice or a different format: altRx adds the cheapest brand-name shelf (Ozempic $1,149, Zepbound $1,249, Wegovy $1,579) plus BNPL; DirectMeds charges a flat $147 and offers needle-free drops.",
      "For more support, the only step up is SHED ($199/$299): formal coaching and a guarantee to lose 5% in 120 days or get your money back.",
    ],
    sections: [
      {
        heading: "What you lose when you leave Medvi",
        body: `<p>Every Medvi alternative trades away some of Medvi's support layer. For one all-inclusive price, now $99 a month on promotion (regularly $199), Medvi provides video visits with providers rated 4.3 across 14,987 Trustpilot reviews, plus a bundled dietician and care coaching. At the promo price, few rivals are much cheaper, so know what you are giving up before you switch.</p><p>People who leave Medvi usually fall into one of three groups, and each has a different best match:</p><ul><li><strong>Price shoppers</strong> who realize they are self-directed.</li><li><strong>Shelf shoppers</strong> who want brand-name medication.</li><li><strong>Logistics shoppers</strong> who want faster delivery or a needle-free format.</li></ul>`,
      },
      {
        heading: "Cheaper than Medvi: welludr, embody or HealthRx",
        body: `<p><a href="/reviews/wellmedr">welludr</a> sets the price floor among reliable providers: <strong>from $41 a month for semaglutide and from $71 for tirzepatide</strong> in its Pre-Black Friday sale (from October 28, 2026), with a coach included and a weight-loss warranty. Check the sale plan terms at checkout.</p><p><a href="/reviews/embody">embody</a> charges $69 for semaglutide and $119 for tirzepatide and gives you full freedom in return: flat monthly pricing, no commitment, free 1-2 day shipping, and a full refund if a provider does not approve you.</p><p><a href="/reviews/healthrx">HealthRx</a> charges <strong>$99 a month for semaglutide on a 12-month prepaid plan</strong> ($1,188 at checkout), is LegitScript-certified, and ships free overnight in cold-chain packaging. It matches Medvi's current promo price and sits $100 below Medvi's $199 regular rate, with faster delivery, but you commit a year up front to a newer brand. See the head-to-head in <a href="/compare/healthrx-vs-medvi">HealthRx vs Medvi</a>.</p>`,
      },
      {
        heading: "Brand-name Wegovy or needle-free drops instead of Medvi",
        body: `<p><a href="/reviews/altrx">altRx</a> fits if brand-name medication might be in your future. Next to its $89/$149 compounded plans (flat at every dose), it carries Ozempic at $1,149, Zepbound at $1,249 and Wegovy at $1,579, the lowest brand prices in our ranking, plus Buy Now, Pay Later.</p><p><a href="/reviews/directmeds">DirectMeds</a> covers two gaps: a flat <strong>$147 a month for either medication</strong> (its tirzepatide is $19 below Medvi's $166 promo and $152 below the $299 regular rate) and the only needle-free sublingual drops in this comparison, shipped free in 1-2 days with no membership.</p>`,
      },
      {
        heading: "More support than Medvi: SHED's coaching and guarantee",
        body: `<p>If you want <em>more</em> structure than Medvi, there is one option: <a href="/reviews/shed">SHED</a> at $199/$299 (20% off the first month). Every plan includes formal health coaching, HSA/FSA is accepted, and SHED backs the program with the firmest promise we have found: <strong>lose 5% of your body weight in 120 days or get your money back</strong>. It is the accountability choice, a provider with money riding on your result.</p>`,
      },
      {
        heading: "Medvi alternatives side by side: price and trade-off",
        body: `<table><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th><th>Trade-off vs Medvi</th></tr><tr><td>welludr</td><td>from $41/mo</td><td>from $71/mo</td><td>Lighter support; sale price, check plan terms</td></tr><tr><td>embody</td><td>$69/mo</td><td>$119/mo</td><td>No dietician; quickest start</td></tr><tr><td>altRx</td><td>$89/mo</td><td>$149/mo</td><td>Self-serve; adds brand-name shelf</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>from $179/mo</td><td>$1,188 prepaid; overnight shipping</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>$147/mo</td><td>Medication-first; adds needle-free drops</td></tr><tr><td>SHED</td><td>$199/mo</td><td>$299/mo</td><td>Costs more; adds guarantee and coaching</td></tr></table><p>*12-month prepaid plan. Every provider in the table requires a licensed provider to review you before prescribing; that never changes, and it should not.</p><p class="cta-row"><a href="/find-your-match">→ Get one personalized recommendation in 60 seconds</a></p><p>This article is general information, not medical advice. Prices are as listed when we wrote this.</p>`,
      },
    ],
  },
  // ═════ welludr ═════
  {
    slug: "wellmedr-cost",
    title: "welludr Cost (2026): From $41/Month in Its Pre-Black Friday Sale",
    description:
      "welludr costs from $41/month for semaglutide and from $71 for tirzepatide in its Pre-Black Friday sale: $492 for a full year at $41. Plan terms and brand-name.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-13",
    updatedAt: "2026-09-15",
    heroColor: "#F3EEFB",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "welludr charges from $41/month for compounded semaglutide and from $71/month for compounded tirzepatide in its Pre-Black Friday sale (from October 28, 2026); check the plan terms at checkout. A coach plus provider oversight are included.",
      "Twelve months of semaglutide at $41 costs $492, the lowest in our ranking, compared with $828 at embody, $1,068 at altRx and $1,188 at HealthRx or Medvi.",
      "welludr bills monthly, not as one payment; check the sale plan terms at checkout. If you are still testing the medication, embody's $69 no-commitment plan lets you walk away for $28/month more.",
      "welludr also stocks brand-name Ozempic (from $1,399) and Zepbound (from $1,599), but altRx's brand prices start $250/month lower.",
    ],
    sections: [
      {
        heading: "welludr price list: compounded and brand-name",
        body: `<div class="qa"><strong>Quick answer</strong>welludr costs <strong>from $41 a month for compounded semaglutide</strong> and <strong>from $71 a month for compounded tirzepatide</strong> in its Pre-Black Friday sale (from October 28, 2026). A Medical Weight-Care Coach and provider oversight are included. Check the sale plan terms at checkout. Brand-name options are available too: Ozempic from $1,399 and Zepbound from $1,599.</div><table><tr><th>Plan</th><th>Medication</th><th>Price</th></tr><tr><td>GLP-1</td><td>Compounded semaglutide, weekly injection</td><td>from $41/mo (Pre-Black Friday sale)</td></tr><tr><td>GLP-1/GIP</td><td>Compounded tirzepatide, weekly injection</td><td>from $71/mo (Pre-Black Friday sale)</td></tr><tr><td>Ozempic</td><td>Brand-name semaglutide</td><td>from $1,399/mo</td></tr><tr><td>Zepbound</td><td>Brand-name tirzepatide</td><td>from $1,599/mo</td></tr></table>`,
      },
      {
        heading: "welludr's $492 year vs six other semaglutide providers",
        body: `<p>GLP-1 treatment runs for months, so the yearly total is the fairest comparison. Listed starting prices for semaglutide:</p><table><tr><th>Provider</th><th>Monthly</th><th>12 months</th></tr><tr><td><strong>welludr</strong></td><td><strong>$41</strong></td><td><strong>$492</strong></td></tr><tr><td>embody</td><td>$69</td><td>$828</td></tr><tr><td>altRx</td><td>$89</td><td>$1,068</td></tr><tr><td>HealthRx</td><td>$99 (prepaid)</td><td>$1,188 upfront</td></tr><tr><td>DirectMeds</td><td>$147</td><td>$1,764</td></tr><tr><td>Medvi</td><td>$99 (promo; reg. $199)</td><td>$1,188</td></tr><tr><td>SHED</td><td>$199</td><td>$2,388</td></tr></table><p>welludr has the lowest annual cost at $492 at its sale price. Compare it with <a href="/reviews/healthrx">HealthRx</a>: HealthRx reaches $99 a month only by charging $1,188 at checkout, while welludr bills monthly and does not ask for a lump sum. Check welludr's sale plan terms at checkout.</p>`,
      },
      {
        heading: "Should you commit to welludr at its sale price?",
        body: `<p>Check the plan terms behind the from-$41 sale price at checkout, then treat any commitment as a bet and price it that way.</p><ul><li><strong>Why the bet usually makes sense:</strong> meaningful GLP-1 results build over 3-6+ months, and <a href="https://pubmed.ncbi.nlm.nih.gov/35441470/" target="_blank" rel="noopener">stopping early typically means regaining</a> (see <a href="/articles/stopping-glp1-medication-what-happens">what happens when you stop</a>).</li><li><strong>If you are sure about the year:</strong> the sale gives you the lowest monthly rate in our ranking.</li><li><strong>If you are still experimenting:</strong> avoid a long commitment. <a href="/reviews/embody">embody</a> costs $69 a month, $28 more, and lets you leave at any time. Revisit welludr once you know the medication works for you.</li></ul>`,
      },
      {
        heading: "Ask what welludr charges at your maintenance dose",
        body: `<p>Semaglutide <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener">usually steps through several doses before maintenance</a>. Providers that price by dose raise your bill exactly when stopping feels hardest. welludr's sale is quoted as from $41, so confirm at checkout what you will pay at your maintenance dose and how long the sale price lasts.</p><p>When any provider quotes a low number, ask: "What will I pay at my maintenance dose?" Then compare again. In our checks, dose-flat pricing is worth $20-$60 a month against per-dose rivals by the middle of titration, which is why we count it as a real pricing feature.</p><p>The same thinking applies to brand-name medication. welludr's Ozempic (from $1,399) and Zepbound (from $1,599) are there for patients who need the FDA-approved product. If brand-name is your plan from the start, <a href="/reviews/altrx">altRx's brand shelf</a> begins $250 a month lower, and you can move between lanes there without changing providers later.</p>`,
      },
      {
        heading: "Three ways to pay less at welludr",
        body: `<ol><li><strong>Begin with semaglutide rather than tirzepatide.</strong> The $30 monthly difference at sale prices adds up to $360 a year, and semaglutide is still a first-line choice for most new patients. Your provider will suggest tirzepatide if it fits you better (compare them in <a href="/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide</a>).</li><li><strong>Avoid brand-name unless you need it.</strong> The active ingredient is the same, and welludr's brand-name Ozempic costs more than 30 times its $41 compounded sale price.</li><li><strong>Check your HSA/FSA rules.</strong> Medical weight-loss treatment often qualifies for pre-tax payment, which lowers every figure above by your tax rate.</li></ol><p class="cta-row"><a href="/reviews/wellmedr">→ Full welludr review, including warranty details</a></p><p>This article is general information, not medical advice. Prices are as listed when we wrote this; confirm current pricing on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "wellmedr-alternatives",
    title: "welludr Alternatives (2026): What $41 Doesn't Buy",
    description:
      "No provider undercuts welludr's $41/month GLP-1 sale price, so every alternative wins on something else. Six rivals compared on the one thing each does better.",
    category: "Comparison",
    readTime: "7 min read",
    publishedAt: "2026-08-15",
    updatedAt: "2026-09-15",
    heroColor: "#FBEEF4",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "No provider in our ranking is cheaper than welludr's $41/month semaglutide or $71 tirzepatide, so every alternative competes on something besides price.",
      "embody ($69/$119) is the no-commitment option: flat monthly pricing, free 1-2 day shipping, LegitScript-certified, and a full refund if not approved, for $336 a year more than welludr ($828 vs $492).",
      "HealthRx ($99 on a 12-month prepaid plan) adds overnight cold-chain delivery; altRx ($89/$149) adds the cheapest brand-name shelf and BNPL; DirectMeds ($147 flat) is the only needle-free drops option.",
      "For more support, Medvi ($99/$166 promo) includes video visits and a dietician, and SHED ($199/$299) adds coaching plus a 5%-in-120-days money-back guarantee.",
    ],
    sections: [
      {
        heading: "Is anything cheaper than welludr?",
        body: `<p>No. From $41 a month for semaglutide and $71 for tirzepatide in its Pre-Black Friday sale, <strong>welludr is the cheapest provider in our ranking</strong>. Every legitimate alternative competes on a different point: commitment terms, delivery speed, medication choice, depth of support, or format.</p><p>So the better question is not "what is cheaper than welludr?" but "what would I pay extra for?" The sections below match each answer to one provider.</p>`,
      },
      {
        heading: "No commitment: embody at $69",
        body: `<p>welludr's from-$41 price is a Pre-Black Friday sale rate, so check its plan terms at checkout. <a href="/reviews/embody">embody</a> charges a flat <strong>$69 a month</strong> for semaglutide ($119 for tirzepatide) with no commitment at all. It also ships free in 1-2 days, tracked and insured, holds LegitScript certification, and refunds you in full if a provider does not approve treatment.</p><p>Over a year, that freedom costs $336 ($828 at embody vs $492 at welludr). For anyone not ready to commit, embody is the natural first alternative. The direct comparison is in <a href="/compare/embody-vs-wellmedr">embody vs welludr</a>.</p>`,
      },
      {
        heading: "Overnight delivery: HealthRx's $1,188 prepaid plan",
        body: `<p><a href="/reviews/healthrx">HealthRx</a> asks for 12 months up front, but its selling point is delivery: <strong>free overnight cold-chain shipping</strong>, lot-tracked to your door, at $99 a month for semaglutide, paid as $1,188 at checkout.</p><ul><li><strong>Extra cost vs welludr:</strong> $696 a year ($1,188 vs $492).</li><li><strong>What you get:</strong> overnight fulfillment and LegitScript certification from a newer brand.</li><li><strong>Choose it if</strong> reliable delivery ranks high for you. Skip it if a lump-sum checkout is a problem.</li></ul>`,
      },
      {
        heading: "Brand-name access or needle-free drops: altRx and DirectMeds",
        body: `<p><a href="/reviews/altrx">altRx</a> ($89/$149, flat at every dose) is the choice for keeping options open. It has the lowest brand-name prices in our ranking (Ozempic $1,149, Zepbound $1,249, Wegovy $1,579) and Buy Now, Pay Later, which suits anyone who expects to move to brand-name.</p><p><a href="/reviews/directmeds">DirectMeds</a> is the choice for format. It charges a flat $147 for either medication and is the only provider here offering <strong>needle-free sublingual drops</strong>. If injections are what keep you from starting, no price at welludr solves that; drops might.</p>`,
      },
      {
        heading: "More human support than welludr: Medvi and SHED",
        body: `<p>welludr includes a coach, but it runs a lean model. If support is what makes you succeed:</p><ul><li><a href="/reviews/medvi">Medvi</a> ($99/$166 promotional, all-inclusive) offers video visits with providers rated 4.3 by 14,987 Trustpilot reviewers, plus a dietician on every plan.</li><li><a href="/reviews/shed">SHED</a> ($199/$299, 20% off the first month, HSA/FSA) adds formal coaching and the toughest guarantee we track: lose 5% of your body weight in 120 days or get your money back. That is a stronger promise than welludr's warranty.</li></ul><table><tr><th>Alternative</th><th>Semaglutide</th><th>Where it beats welludr</th></tr><tr><td>embody</td><td>$69/mo</td><td>No commitment, 1-2 day shipping, refund policy</td></tr><tr><td>altRx</td><td>$89/mo</td><td>Brand-name shelf, BNPL</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>Overnight cold-chain delivery</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>Needle-free drops, flat tirzepatide</td></tr><tr><td>Medvi</td><td>$99/mo promo</td><td>Video visits, dietician, 14k-review record</td></tr><tr><td>SHED</td><td>$199/mo</td><td>Coaching + 120-day money-back guarantee</td></tr></table><p>*12-month prepaid. If none of these matters to you, stay with welludr: it is still the lowest price.</p><p class="cta-row"><a href="/find-your-match">→ Weigh your priorities in the quiz and get a personalized match</a></p><p>This article is general information, not medical advice. Prices are as listed when we wrote this.</p>`,
      },
    ],
  },
  // ═════ TrimRx ═════
  {
    slug: "is-trimrx-legit",
    title: "Is TrimRx (Trim Rx) Legit? No-Contract GLP-1 Audit (2026)",
    description:
      "TrimRx (Trim Rx) offers GLP-1 treatment with no long-term contract, rare in this market. We checked its clinical review, $149 dose-flat pricing and who it suits.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-07",
    updatedAt: "2026-09-15",
    heroColor: "#F0FAF5",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "TrimRx never requires a long-term contract. Month-to-month is always an option, and multi-month plans are optional discounts.",
      "TrimRx's clinical gate is real: a licensed clinician reviews an online health assessment and can decline you, then prescribes compounded semaglutide or tirzepatide with support continuing through dose changes.",
      "TrimRx charges $149/month for semaglutide (the same at every dose, with a $140 discount applied) and $259/month for tirzepatide, covering medication, provider consultations and ongoing support. It is self-pay, with no insurance.",
      "Fair criticisms: welludr, embody and HealthRx sell the same semaglutide for $41-$99, TrimRx is compounded-only, and it has no money-back or refund-if-not-approved guarantee.",
    ],
    sections: [
      {
        heading: "Can you leave TrimRx whenever you want?",
        body: `<div class="qa"><strong>Quick answer</strong>Yes. TrimRx (Trim Rx) has <strong>no long-term contract, ever</strong>. You can always stay month to month, and multi-month plans exist only as optional discounts. That exit policy, plus a licensed clinical review, is the core of why we consider TrimRx legitimate.</div><p>A quick way to judge a telehealth weight-loss company is to look at what happens when you try to quit. Businesses that depend on trapping customers bury their terms, auto-renew hard, and turn cancellation into a phone maze. TrimRx does the opposite. A company that lets you go freely is betting that you stay because the treatment works.</p>`,
      },
      {
        heading: "Who reviews your TrimRx assessment before a prescription?",
        body: `<p>TrimRx runs the full clinical sequence a legitimate prescriber needs:</p><ol><li><strong>Online health assessment</strong> covering your history, medications and <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener">contraindications</a>.</li><li><strong>Licensed clinician review</strong> by someone with real authority to decline.</li><li><strong>A prescription, if appropriate,</strong> for <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">compounded semaglutide or tirzepatide</a>.</li><li><strong>Ongoing clinical support</strong> through dose changes.</li></ol><p>Everything happens online with no clinic visit. Support continues after the first consult and through titration, which is when most questions actually come up.</p>`,
      },
      {
        heading: "TrimRx's $149 and $259 plans: what is included",
        body: `<table><tr><th>Plan</th><th>Medication</th><th>Price</th></tr><tr><td>GLP-1</td><td>Compounded semaglutide, weekly</td><td>$149/mo (same at every dose)</td></tr><tr><td>GLP-1 + GIP</td><td>Compounded tirzepatide, weekly</td><td>$259/mo</td></tr></table><p>Each TrimRx plan includes the medication, provider consultations and ongoing support. It is self-pay, and no insurance is needed.</p><ul><li><strong>The $149 already includes a $140 discount</strong> off the list price, and it holds at every dose.</li><li><strong>Multi-month plans lower the monthly price further.</strong> This is TrimRx's only form of commitment pricing, and it is a choice rather than a requirement.</li></ul>`,
      },
      {
        heading: "TrimRx's weak spots: price, brand access and guarantees",
        body: `<ul><li><strong>Cheaper semaglutide exists.</strong> <a href="/reviews/wellmedr">welludr</a>, <a href="/reviews/embody">embody</a> and <a href="/reviews/healthrx">HealthRx</a> sell the same semaglutide for $41-$99, though each asks for a commitment or offers leaner service in return.</li><li><strong>No brand-name medication.</strong> TrimRx is compounded-only; for brand-name, look at <a href="/reviews/altrx">altRx</a>.</li><li><strong>No guarantee.</strong> There is no money-back promise like SHED's and no refund-if-not-approved like embody's. If a safety net is what gets you started, that is a real gap.</li></ul>`,
      },
      {
        heading: "Verdict: TrimRx is legit, and best for flexibility seekers",
        body: `<p>TrimRx is a legitimate mid-market GLP-1 provider with a licensed clinical gate, ongoing support, transparent pricing and the cleanest exit terms in the market. It suits someone who values flexibility enough to pay mid-tier prices and does not need heavy hand-holding or a guarantee.</p><p>If price comes first, the budget tier wins. If support comes first, <a href="/compare/medvi-vs-trimrx">Medvi makes a different offer, and is currently cheaper at its $99 promo</a>; that comparison is the most useful one in TrimRx's price range.</p><p class="cta-row"><a href="/reviews/trimrx">→ Full TrimRx review: plans, discounts and fine print</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "trimrx-cost",
    title: "TrimRx Cost (2026): $149 Semaglutide, No Contract",
    description:
      "TrimRx (Trim Rx) charges $149/month for semaglutide at every dose and $259 for tirzepatide, no contract. How its discounts work and what a year costs ($1,788).",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-09",
    updatedAt: "2026-09-15",
    heroColor: "#EEF4FB",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "TrimRx charges $149/month for compounded semaglutide (with a $140 discount already applied, same price at every dose) and $259/month for tirzepatide. Medication, consultations and clinical support are included.",
      "There is no long-term contract. You pay the listed rate month to month and can stop at any renewal, or choose a multi-month plan for a lower rate, a decision made at each renewal rather than at signup.",
      "A year of month-to-month semaglutide costs $1,788, roughly $1,300 more than welludr's $492 at its sale price. That gap is what flexibility costs.",
      "For tirzepatide, DirectMeds' flat $147 is $112/month below TrimRx's $259, a difference that grows quickly.",
    ],
    sections: [
      {
        heading: "How much does TrimRx cost per month?",
        body: `<div class="qa"><strong>Quick answer</strong>TrimRx (Trim Rx) charges <strong><a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">$149 a month for compounded semaglutide</a></strong>, which already includes a $140 discount and stays the same at every dose, and <strong>$259 a month for tirzepatide</strong>. Both prices include medication, provider consultations and ongoing clinical support. There is no long-term contract, and multi-month plans lower the monthly rate further.</div><p>TrimRx is self-pay, uses no insurance, and runs 100% online. The basic choice: stay month to month at $149 and keep the freedom to stop, or commit several months at once for a lower rate. TrimRx is unusual in letting you make that choice at each renewal instead of only at signup.</p>`,
      },
      {
        heading: "TrimRx vs Medvi and five others at the mid-market price point",
        body: `<p>TrimRx's $149 semaglutide now competes with <a href="/reviews/medvi">Medvi</a>'s $99 promotional price, and the two sell almost opposite things:</p><ul><li><strong>Medvi</strong> spends on high-touch care: video visits, a dietician, coaching, and a 4.3 Trustpilot rating from 14,987 reviews.</li><li><strong>TrimRx</strong> spends on flexibility: no contract, optional discounts and a leaner clinical-support model.</li></ul><p>Which one is better depends on what you value. The full comparison is in <a href="/compare/medvi-vs-trimrx">Medvi vs TrimRx</a>.</p><table><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th><th>Model</th></tr><tr><td>welludr</td><td>from $41/mo</td><td>from $71/mo</td><td>Pre-Black Friday sale</td></tr><tr><td>embody</td><td>$69/mo</td><td>$119/mo</td><td>Flat, no commitment</td></tr><tr><td>altRx</td><td>$89/mo</td><td>$149/mo</td><td>Flat + brand shelf</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>from $179</td><td>12-mo prepaid</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>$147/mo</td><td>Flat, drops option</td></tr><tr><td><strong>TrimRx</strong></td><td><strong>$149/mo</strong></td><td><strong>$259/mo</strong></td><td>No contract, opt-in discounts</td></tr><tr><td>Medvi</td><td>$99/mo promo (reg. $199)</td><td>$166/mo promo (reg. $299)</td><td>All-inclusive high-touch</td></tr></table><p>*prepaid annual. Check the tirzepatide column: DirectMeds is $112 a month cheaper than TrimRx's $259. If tirzepatide is your medication, that gap adds up fast.</p>`,
      },
      {
        heading: "How TrimRx's multi-month discount works at renewal",
        body: `<p>TrimRx rewards commitment without requiring it. Here is how the pricing works:</p><ul><li><strong>Month to month:</strong> you pay the listed $149 or $259 and can stop at any renewal.</li><li><strong>Multi-month plan:</strong> the monthly rate drops below the listed price. Exact rates appear at signup and depend on plan length.</li></ul><p>Most patients miss that you can do both, in order. Start month to month while you and your clinician confirm that the medication and dose suit you; the first 8-12 weeks usually settle that. Then move to a multi-month rate once the uncertainty is gone. You pay a small premium only during the months when flexibility is valuable.</p><p>To estimate when your own uncertainty ends, see the titration timeline in <a href="/articles/how-long-for-semaglutide-to-work">how long semaglutide takes to work</a>.</p>`,
      },
      {
        heading: "Is $1,788 a year at TrimRx worth it?",
        body: `<p>A year of month-to-month semaglutide at TrimRx costs <strong>$1,788</strong>. Against welludr's $492 at its sale price, flexibility costs about $1,300 a year.</p><p><strong>Paying for flexibility makes sense</strong> when your situation might really change: uncertain income, a possible move to brand-name medication, or early months spent confirming the medication works for you.</p><p><strong>It does not make sense forever.</strong> Once you know you are staying, take TrimRx's multi-month discount or move to a cheaper provider. Paying for flexibility you no longer need is money with nothing in return.</p><p class="cta-row"><a href="/reviews/trimrx">→ Current TrimRx plans and multi-month rates</a></p><p>This article is general information, not medical advice. Prices are as listed when we wrote this; confirm current pricing on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "trimrx-alternatives",
    title: "TrimRx Alternatives (2026): Cheaper, Faster or More Support",
    description:
      "Six TrimRx (Trim Rx) alternatives sorted by what you want to change: semaglutide price, the $259 tirzepatide, delivery speed, brand-name access or support.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-12",
    updatedAt: "2026-09-15",
    heroColor: "#FBF3EE",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "People look past TrimRx for four reasons: $149 feels steep, the $259 tirzepatide can be beaten, they want a guarantee or more support, or brand-name medication is now on the table.",
      "Lower-cost semaglutide: welludr from $41 (Pre-Black Friday sale), embody at $69 flat with no commitment (the closest match to TrimRx's approach), and HealthRx at $99 on a $1,188 prepaid plan.",
      "Lower-cost tirzepatide: DirectMeds charges a flat $147 for the same active ingredient, $1,344 less per year, and is the only provider here with needle-free drops.",
      "Switching is easy on paperwork: a 5-10 minute intake at the new provider, no records transfer, and no exit fee because TrimRx has no long-term contract.",
    ],
    sections: [
      {
        heading: "Why people look for a TrimRx alternative",
        body: `<p>TrimRx (Trim Rx) offers a mid-market price, no lock-in and solid clinical support. People who shop around usually have one of four reasons, and each has one best answer:</p><ol><li>The $149 semaglutide feels high for what they use.</li><li>The $259 tirzepatide is clearly beatable.</li><li>They want a guarantee or deeper support.</li><li>Brand-name medication has become an option.</li></ol><p>The sections below take those reasons one by one.</p>`,
      },
      {
        heading: "Semaglutide for less than TrimRx's $149",
        body: `<p>Three reliable providers cost less:</p><ul><li><a href="/reviews/wellmedr">welludr</a>: <strong>from $41 a month</strong> in its Pre-Black Friday sale, with a coach and warranty included. Check: the sale plan terms at checkout.</li><li><a href="/reviews/embody">embody</a>: <strong>$69 flat</strong>, with no commitment, so it keeps TrimRx's flexibility while costing $80 less. You give up: some support depth.</li><li><a href="/reviews/healthrx">HealthRx</a>: <strong>$99 prepaid</strong> ($1,188 upfront) with overnight cold-chain shipping. You give up: paying in one lump sum.</li></ul><p>embody is the closest in spirit to TrimRx; compare them in <a href="/compare/embody-vs-trimrx">embody vs TrimRx</a>.</p>`,
      },
      {
        heading: "Tirzepatide for $147 instead of $259: DirectMeds",
        body: `<p>This is the largest price gap in the comparison. TrimRx charges $259 for tirzepatide; <a href="/reviews/directmeds">DirectMeds</a> charges a flat <strong>$147 for the same active ingredient</strong> at every dose. That is $1,344 less per year, with free 1-2 day shipping and no membership.</p><p>DirectMeds also sells needle-free sublingual drops, which nobody else in this group offers. The trade-off: DirectMeds is medication-first and lacks TrimRx's ongoing clinical-support layer.</p>`,
      },
      {
        heading: "How hard is it to switch from TrimRx?",
        body: `<p>Not hard. Switching GLP-1 telehealth providers involves little paperwork:</p><ol><li>Complete the new provider's medical intake (5-10 minutes).</li><li>Tell them you are currently on a GLP-1 and give your dose.</li><li>Their clinician decides whether to keep you at that dose or change it.</li></ol><p>There is no records transfer to chase. Since TrimRx has no long-term contract, there is no exit fee or buyout. Your only real costs are timing shipments so you do not miss doses and filling out a new intake.</p><p>Low switching friction works both ways: trying a cheaper provider carries little risk, and staying at TrimRx should be an active choice, not habit.</p>`,
      },
      {
        heading: "More support (Medvi, SHED) or brand-name access (altRx)",
        body: `<p><strong>For more support:</strong></p><ul><li><a href="/reviews/medvi">Medvi</a>, now $99 on promotion, trades flexibility for depth: video visits, a dietician, coaching, and 14,987 Trustpilot reviews averaging 4.3.</li><li><a href="/reviews/shed">SHED</a> ($199, 20% off the first month) adds the only hard results promise we track: lose 5% of your body weight in 120 days or get your money back.</li></ul><p><strong>For medication choice:</strong> <a href="/reviews/altrx">altRx</a> ($89/$149 flat) has the cheapest brand shelf here (Ozempic $1,149, Zepbound $1,249, Wegovy $1,579) plus BNPL. See <a href="/compare/altrx-vs-trimrx">altRx vs TrimRx</a>.</p><table><tr><th>If you want...</th><th>Go to</th><th>Price</th><th>You give up</th></tr><tr><td>Lowest price</td><td>welludr</td><td>from $41/mo</td><td>Sale price; check plan terms</td></tr><tr><td>Cheap + no commitment</td><td>embody</td><td>$69/mo</td><td>Leaner support</td></tr><tr><td>Overnight delivery</td><td>HealthRx</td><td>$99/mo*</td><td>$1,188 prepaid</td></tr><tr><td>Cheap tirzepatide / no needles</td><td>DirectMeds</td><td>$147/mo</td><td>Support depth</td></tr><tr><td>High-touch care</td><td>Medvi</td><td>$99/mo promo</td><td>Very little; currently cheaper than TrimRx</td></tr><tr><td>A results guarantee</td><td>SHED</td><td>$199/mo</td><td>$50/mo more</td></tr></table><p>*prepaid annual plan.</p><p class="cta-row"><a href="/find-your-match">→ Answer 6 questions and let the quiz pick your match</a></p><p>This article is general information, not medical advice. Prices are as listed when we wrote this.</p>`,
      },
    ],
  },
  // ═════ altRx ═════
  {
    slug: "is-altrx-legit",
    // On-page H1 + short editorial dek. The keyword-rich meta title/description
    // are preserved separately in ARTICLE_SEO_OVERRIDES so trimming the visible
    // dek never weakens the SERP snippet; the full pricing detail lives in the
    // opening section body below.
    title: "Is altRx Legit? Prescribers, Prices and Trade-Offs (2026)",
    description:
      "How altRx works: who prescribes, what it costs, which medications it carries, and where it falls short.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-08",
    updatedAt: "2026-09-15",
    heroColor: "#EEF7FB",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "altRx is legitimately run. A licensed physician, physician associate or nurse practitioner reviews every intake and can decline treatment, and licensed pharmacies fill the prescriptions.",
      "altRx is the only provider in our ranking with both lanes: compounded semaglutide from $89 and tirzepatide from $149, plus brand-name Ozempic ($1,149), Zepbound ($1,249) and Wegovy ($1,579).",
      "altRx charges the same price at every dose, lets you pause or cancel anytime, and is the only provider we track that offers Buy Now, Pay Later.",
      "The trade-offs: welludr ($41) and embody ($69) are cheaper on compounded plans, altRx is self-serve with no coaching, and there is no money-back guarantee.",
    ],
    sections: [
      {
        heading: "Is altRx a legitimate GLP-1 provider?",
        body: `<div class="qa"><strong>Quick answer</strong>Yes. altRx uses licensed prescribers who can decline treatment, fills prescriptions through licensed pharmacies, and runs two lanes side by side: compounded semaglutide from $89 and tirzepatide from $149, plus brand-name <strong>Ozempic at $1,149, Zepbound at $1,249 and Wegovy at $1,579</strong>.</div><p>Most GLP-1 telehealth companies choose one lane, either cheap compounded plans or brand-name fulfillment. Running both is a trust signal in its own right. A company dispensing <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-new-drug-treatment-chronic-weight-management-first-2014" target="_blank" rel="noopener">FDA-approved brand products</a> carries pharmacy relationships and compliance obligations that fly-by-night compounding shops never deal with. Nobody gets a Wegovy supply chain by cutting corners.</p>`,
      },
      {
        heading: "Who prescribes at altRx?",
        body: `<p>A licensed provider reviews every altRx assessment: a physician, physician associate or nurse practitioner, with authority to decline. Licensed pharmacies fill prescriptions in both lanes.</p><ul><li><strong>The intake is medical:</strong> history, current medications and <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener">contraindications</a>.</li><li><strong>The process is fully online:</strong> no clinic visit, no lock-in, and pause or cancel anytime without a cancellation maze.</li><li><strong>The price is the same at every dose.</strong> The quiet industry markup, a bill that rises as you titrate, does not exist at altRx.</li></ul>`,
      },
      {
        heading: "altRx pricing in both lanes, plus Buy Now, Pay Later",
        body: `<table><tr><th>Lane</th><th>Medication</th><th>Price</th></tr><tr><td>Compounded</td><td>Semaglutide (weekly)</td><td>$89/mo (reg. $199)</td></tr><tr><td>Compounded</td><td>Tirzepatide (weekly)</td><td>$149/mo (reg. $299)</td></tr><tr><td>Brand-name</td><td>Ozempic</td><td>$1,149/mo</td></tr><tr><td>Brand-name</td><td>Zepbound</td><td>$1,249/mo</td></tr><tr><td>Brand-name</td><td>Wegovy</td><td>$1,579/mo</td></tr></table><p>Two payment details set altRx apart:</p><ul><li><strong>Buy Now, Pay Later.</strong> altRx is the only provider in our ranking with BNPL, which splits even the compounded plans into smaller payments.</li><li><strong>Lower brand-name prices.</strong> altRx's Ozempic is $250/month below welludr's starting brand price.</li></ul><p>For the medical difference between the two lanes, read <a href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name semaglutide</a>.</p>`,
      },
      {
        heading: "Three catches to know before joining altRx",
        body: `<ol><li><strong>Not the cheapest compounded plan.</strong> <a href="/reviews/wellmedr">welludr ($41)</a> and <a href="/reviews/embody">embody ($69)</a> both cost less than altRx's $89.</li><li><strong>Self-serve service.</strong> There is no dietician, no coaching and no video-visit culture. You are buying medication access with clinical oversight, not a support program.</li><li><strong>No guarantee.</strong> No money-back promise and no refund-if-not-approved.</li></ol><p>Shoppers focused purely on price or on support have better options. altRx's advantage is <em>choice</em>.</p>`,
      },
      {
        heading: "Verdict: altRx is legit and the most flexible menu",
        body: `<p>altRx meets every legitimacy test we use: a licensed prescriber gate, licensed pharmacies, honest dose-flat pricing and real brand-name supply. It also has the widest medication menu in our ranking.</p><p>Pick altRx when you want room to move: start compounded at $89, keep the option of switching to Zepbound without changing providers, and spread payments with BNPL. No other provider here offers that combination.</p><p class="cta-row"><a href="/reviews/altrx">→ Full altRx review: both lanes and every price</a></p><p class="cta-row"><a href="/compare/altrx-vs-embody">→ Budget-tier matchup: altRx vs embody</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "altrx-cost",
    title: "altRx Cost (2026): $89 Compounded to $1,579 Wegovy",
    description:
      "Every altRx price: $89/$149 compounded GLP-1 plans flat at every dose, plus brand-name Ozempic $1,149, Zepbound $1,249 and Wegovy $1,579, with Buy Now, Pay Later.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-14",
    updatedAt: "2026-09-15",
    heroColor: "#F3EEFB",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "altRx's compounded plans cost $89/month for semaglutide (reg. $199) and $149/month for tirzepatide (reg. $299), the same at every dose.",
      "altRx brand-name prices: Ozempic $1,149, Zepbound $1,249, Wegovy $1,579. That is $250-$350/month below welludr's brand shelf, which does not list Wegovy.",
      "At $89, altRx is the third-cheapest of nine compounded options, after welludr (from $41 in its Pre-Black Friday sale) and embody ($69 flat).",
      "altRx is the only provider in our ranking with Buy Now, Pay Later. You can pause or cancel anytime, and insurance is not involved.",
    ],
    sections: [
      {
        heading: "How much does altRx cost? Every plan in one table",
        body: `<div class="qa"><strong>Quick answer</strong>altRx compounded plans cost <strong>$89 a month for semaglutide</strong> (reg. $199) and <strong>$149 a month for tirzepatide</strong> (reg. $299), the same price at every dose. Brand-name medication costs $1,149 for Ozempic, $1,249 for Zepbound and $1,579 for Wegovy. Buy Now, Pay Later is available, you can pause or cancel anytime, and insurance is not used.</div><table><tr><th>Lane</th><th>Medication</th><th>Monthly price</th></tr><tr><td>Compounded</td><td>Semaglutide</td><td>$89 (reg. $199)</td></tr><tr><td>Compounded</td><td>Tirzepatide</td><td>$149 (reg. $299)</td></tr><tr><td>Brand-name</td><td>Ozempic</td><td>$1,149</td></tr><tr><td>Brand-name</td><td>Zepbound</td><td>$1,249</td></tr><tr><td>Brand-name</td><td>Wegovy</td><td>$1,579</td></tr></table><p>The roughly 10x gap between altRx's two lanes is not unique to altRx. It is the compounded-vs-brand price difference across the whole market, shown inside a single provider. The active ingredients are the same; the brand premium is what you decide to pay or skip.</p>`,
      },
      {
        heading: "What altRx's flat dose pricing saves during titration",
        body: `<p>GLP-1 doses rise during the first months; <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener">semaglutide usually moves through several steps before maintenance</a>. Providers that price by dose quote the starter rate, and the real bill shows up around month three.</p><p>altRx's $89 applies at <em>every</em> step. When you compare quotes, ask each rival: "What will I pay at my maintenance dose?" The ranking often changes. For dose timelines, see <a href="/articles/how-long-for-semaglutide-to-work">how long semaglutide takes to work</a>.</p>`,
      },
      {
        heading: "altRx vs welludr, embody and others: compounded and brand prices",
        body: `<p><strong>Compounded lane.</strong> altRx's $89 is third-cheapest of nine: behind welludr (from $41, Pre-Black Friday sale) and embody ($69 flat), and ahead of Medvi's $99 promo, HealthRx ($99, but $1,188 prepaid), DirectMeds ($147), Sprout and TrimRx ($149) and SHED ($199).</p><p><strong>Brand lane.</strong> altRx's Ozempic is $250 a month cheaper than welludr's, its Zepbound is $350 cheaper, and welludr does not list Wegovy at all.</p><table><tr><th>Brand-name</th><th>altRx</th><th>welludr</th></tr><tr><td>Ozempic</td><td><strong>$1,149</strong></td><td>from $1,399</td></tr><tr><td>Zepbound</td><td><strong>$1,249</strong></td><td>from $1,599</td></tr><tr><td>Wegovy</td><td><strong>$1,579</strong></td><td>-</td></tr></table><p>In practice: if you might want brand-name medication later, starting at altRx lets you change lanes without changing providers, with no new intake and no new provider relationship.</p>`,
      },
      {
        heading: "Paying less at altRx: BNPL and four other levers",
        body: `<ul><li><strong>Use Buy Now, Pay Later.</strong> altRx is the only provider in our ranking offering it, so even the $149 tirzepatide plan can be split into smaller payments.</li><li><strong>Stay compounded.</strong> The $1,060 monthly gap between $89 semaglutide and $1,149 Ozempic outweighs every other decision.</li><li><strong>Start on semaglutide</strong> unless your provider recommends otherwise; it is $60 a month less than tirzepatide.</li><li><strong>Check HSA/FSA eligibility</strong> for pre-tax payment.</li><li><strong>Consider a cheaper provider</strong> if $89 is still a stretch: <a href="/reviews/wellmedr">welludr at $41</a> and <a href="/reviews/embody">embody at $69</a> sell the same molecule for less, without altRx's brand shelf and BNPL.</li></ul><p class="cta-row"><a href="/reviews/altrx">→ Full altRx review with current plan terms</a></p><p>This article is general information, not medical advice. Prices are as listed when we wrote this; confirm current pricing on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "altrx-alternatives",
    title: "altRx Alternatives (2026): 6 Rivals by What They Fix",
    description:
      "The best altRx alternative depends on your complaint: price ($41-$69 rivals), delivery speed, support or a results guarantee. Six options, sorted by problem.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-16",
    updatedAt: "2026-09-15",
    heroColor: "#FBEEF4",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "Only two providers are cheaper than altRx's $89 plan: welludr from $41/month and embody at $69 flat, saving $240-$576 a year but losing the brand shelf and BNPL.",
      "For delivery and format, HealthRx ships overnight cold-chain at $99/month (12-month prepaid, $1,188 at checkout) and DirectMeds charges a flat $147 with needle-free sublingual drops.",
      "For human support, Medvi ($99/$166 promo, all-inclusive with video visits and a dietician) and SHED ($199/$299, with a 5%-in-120-days money-back guarantee) cover altRx's self-serve gap.",
      "No other provider offers financing. If cash flow is the problem, nothing replaces altRx's Buy Now, Pay Later.",
    ],
    sections: [
      {
        heading: "What you give up by leaving altRx",
        body: `<p>Before comparing, list what altRx already does best in our ranking:</p><ul><li>The widest medication menu: compounded plans <em>and</em> the lowest-priced brand shelf (Ozempic $1,149, Zepbound $1,249, Wegovy $1,579).</li><li>Dose-flat pricing at $89/$149.</li><li>Buy Now, Pay Later.</li><li>Pause-anytime terms.</li></ul><p>If you use those features, switching means losing them. Each alternative below beats altRx on one specific point, so match the alternative to your actual complaint.</p>`,
      },
      {
        heading: "Cheaper than altRx's $89: welludr and embody",
        body: `<p>Only two providers cost less than altRx's $89 semaglutide:</p><ul><li><a href="/reviews/wellmedr">welludr</a> from <strong>$41 a month</strong> ($71 tirzepatide) in its Pre-Black Friday sale, with a coach and warranty included; check the sale plan terms at checkout.</li><li><a href="/reviews/embody">embody</a> at <strong>$69 flat</strong>, with free 1-2 day shipping, LegitScript certification and a full refund if not approved.</li></ul><p>Savings against altRx: $240 a year at embody and $576 at welludr. Neither has a brand-name lane or BNPL. Head-to-heads: <a href="/compare/altrx-vs-wellmedr">altRx vs welludr</a> and <a href="/compare/altrx-vs-embody">altRx vs embody</a>.</p>`,
      },
      {
        heading: "Faster shipping or no needles: HealthRx and DirectMeds",
        body: `<p><a href="/reviews/healthrx">HealthRx</a> leads with delivery: free <strong>overnight cold-chain shipping</strong>, lot-tracked, at $99 a month for semaglutide on a 12-month prepaid plan ($1,188 at checkout).</p><p><a href="/reviews/directmeds">DirectMeds</a> covers two angles: a flat <strong>$147 for either medication</strong>, $2 under altRx's tirzepatide, plus the only needle-free sublingual drops in this group, with free 1-2 day shipping and no membership.</p>`,
      },
      {
        heading: "Why no rival replaces altRx's Buy Now, Pay Later",
        body: `<p>Financing has no alternative. altRx is the only provider in our ranking with Buy Now, Pay Later, which turns even the $149 tirzepatide plan into split payments without a credit card's interest rate.</p><p>If cash flow, not total cost, is your real limit, the fair comparison is altRx's BNPL against putting a cheaper rival's bill on a card. At typical card APRs, carrying $89-$149 a month on revolving credit wipes out the budget tier's price edge within months.</p><p>HealthRx sits at the other extreme: its model asks for $1,188 upfront. That makes altRx vs HealthRx the clearest cash-flow choice in the market: installments vs a lump sum, $89 vs $99 effective.</p>`,
      },
      {
        heading: "More human support than altRx: Medvi and SHED",
        body: `<p>Self-serve service is altRx's one weak spot.</p><ul><li><a href="/reviews/medvi">Medvi</a> ($99/$166 promotional, all-inclusive) is altRx's opposite: video visits, a dietician, coaching, and a 4.3 Trustpilot average from 14,987 reviews.</li><li><a href="/reviews/shed">SHED</a> ($199/$299, 20% off the first month, HSA/FSA) makes the strongest promise in the market: <strong>lose 5% of your body weight in 120 days or get your money back</strong>.</li></ul><table><tr><th>Your complaint about altRx</th><th>Best fix</th><th>Price</th></tr><tr><td>"$89 is still too much"</td><td>welludr</td><td>from $41/mo</td></tr><tr><td>"Want cheap without commitment"</td><td>embody</td><td>$69/mo flat</td></tr><tr><td>"Shipping takes too long"</td><td>HealthRx</td><td>$99/mo (prepaid)</td></tr><tr><td>"Tirzepatide / hate needles"</td><td>DirectMeds</td><td>$147/mo flat</td></tr><tr><td>"I need real support"</td><td>Medvi</td><td>$99/mo promo</td></tr><tr><td>"I want a guarantee"</td><td>SHED</td><td>$199/mo</td></tr></table><p>If you have no complaint and just think you might want Zepbound someday, stay with altRx. No one else offers both lanes.</p><p class="cta-row"><a href="/find-your-match">→ Six questions, one recommendation: take the matching quiz</a></p><p>This article is general information, not medical advice. Prices are as listed when we wrote this.</p>`,
      },
    ],
  },
  // ═════ SHED ═════
  ...brandClusterPart2,
];
