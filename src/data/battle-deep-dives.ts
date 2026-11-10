// Long-form "in depth" sections for selected comparison pages, keyed by battle
// slug. Rendered by battle-page.tsx as article-style sections (question
// headings feed the page's content; tables stack into cards on phones).
// Facts only: provider facts come from the site's verified data (price index,
// reviews, ro cost guide, October-November 2026); market and trial facts link
// their sources inline.

export interface BattleDeepDive {
  /** Short medical/affiliate note shown under the page intro. */
  disclaimer: string;
  sections: { heading: string; body: string }[];
}

const NOVO_PRICE_GUIDE = "https://www.novocare.com/content/dam/novonordisk/novocare/redesign/pdf/Wegovy_Price_Guide.pdf";
const NOVO_OFFER = "https://www.novocare.com/patient/medicines/wegovy/savings-offer.html";
const STEP1 = "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183";
const SURMOUNT1 = "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038";
const FDA_CONCERNS = "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss";
const FDA_DOSING = "https://www.fda.gov/drugs/human-drug-compounding/fda-alerts-health-care-providers-compounders-and-patients-dosing-errors-associated-compounded";
const SEMA_SHORTAGE = "https://www.mcdermottlaw.com/insights/semaglutide-shortage-resolved/";
const TIRZ_SHORTAGE = "https://www.mcdermottlaw.com/insights/tirzepatide-shortage-resolved/";
const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

export const BATTLE_DEEP_DIVES: Record<string, BattleDeepDive> = {
  "embody-vs-ro": {
    disclaimer:
      "This comparison is for general information only and is not medical advice. GLP-1 medications are prescription drugs: a licensed clinician must evaluate you before prescribing, and only they can decide whether a GLP-1, and which dose, is right for you. We may earn a commission from some providers, including embody and ro; this does not change the prices or facts reported here.",
    sections: [
      {
        heading: "How do embody and ro work differently?",
        body: `<p>embody and ro use two different models. embody is a cash-pay compounded GLP-1 provider: one monthly price covers compounded semaglutide or tirzepatide, the clinician review, supplies and shipping, with no membership and no insurance needed. ro is a membership-plus-medication model built around FDA-approved brand-name drugs: you pay a ro Body membership for care, and the medication (Wegovy or Zepbound) is billed separately, either at ro's cash price or through your insurance.</p>
<table><thead><tr><th>How it works</th><th>embody</th><th>ro</th></tr></thead><tbody>
<tr><td>Business model</td><td>All-in monthly price for compounded medication</td><td>Membership for care, plus brand-name medication billed separately</td></tr>
<tr><td>Medication type</td><td>Compounded semaglutide and tirzepatide (not FDA-approved)</td><td>FDA-approved Wegovy pill, Wegovy pen and Zepbound KwikPen</td></tr>
<tr><td>Insurance</td><td>Not used: cash pay only</td><td>Insurance concierge checks coverage and handles prior authorization</td></tr>
<tr><td>Membership fee</td><td>None</td><td>$39 the first month, then $149 a month, or $74 a month on a 12-month prepaid plan</td></tr>
<tr><td>Pharmacy</td><td>US-based 503A compounding pharmacies, LegitScript-certified</td><td>ro's own pharmacy</td></tr>
</tbody></table>
<p>Figures are from embody's and ro's published pricing at our last check (October 2026); see our <a href="/reviews/embody">embody review</a> and our <a href="/articles/ro-cost">ro cost guide</a> for the details behind each line.</p>
<p>The practical difference: with embody you know the whole monthly bill up front, but you are taking a compounded drug. With ro you get an FDA-approved brand, and if your insurance covers it your cost can drop sharply, but you always pay the membership out of pocket because insurance does not cover it.</p>`,
      },
      {
        heading: "How much does embody cost per month compared with ro?",
        body: `<p>embody costs $69 a month for compounded semaglutide and $119 a month for compounded tirzepatide (regular prices $79 and $129), with the clinician review, supplies and shipping included. ro without insurance costs the membership plus ro's cash price for the medication, which works out to about $223 to $598 a month once you are past the first month, depending on the drug and dose, according to our <a href="/articles/ro-cost">ro cost guide</a>.</p>
<h3>embody GLP-1 pricing, monthly</h3>
<table><thead><tr><th>embody medication</th><th>Monthly price</th><th>What is included</th></tr></thead><tbody>
<tr><td>Compounded semaglutide</td><td>$69 (regular $79)</td><td>Medication, clinician review, supplies, shipping</td></tr>
<tr><td>Compounded tirzepatide</td><td>$119 (regular $129)</td><td>Medication, clinician review, supplies, shipping</td></tr>
</tbody></table>
<p>Prices from our <a href="/cheapest-glp1">verified price index</a> (October 2026). embody bills month to month with no contract, and gives a full refund if a provider does not approve you. Before you start, confirm on embody's site whether your price stays the same as your dose rises.</p>
<h3>ro Wegovy cash price without insurance</h3>
<table><thead><tr><th>ro medication (cash)</th><th>Starting price</th><th>Ongoing price</th></tr></thead><tbody>
<tr><td>Wegovy pen (semaglutide)</td><td>$199 for each of the first two starter fills</td><td>$349 a month ($399 for the 7.2 mg Wegovy HD dose)</td></tr>
<tr><td>Wegovy pill (semaglutide)</td><td>$149 (1.5 mg)</td><td>$199 at 4 mg, then $299 at 9 mg and 25 mg</td></tr>
<tr><td>Zepbound KwikPen (tirzepatide)</td><td>$299 (2.5 mg)</td><td>$399 at 5 mg, then $449 at 7.5 mg to 15 mg</td></tr>
</tbody></table>
<p>ro's medication prices are from our <a href="/articles/ro-cost">ro cost guide</a> (October 2026); add the ro Body membership to each. They match the manufacturers' own self-pay prices: Novo Nordisk lists the Wegovy pen at ${ext(NOVO_PRICE_GUIDE, "$349 a month at every dose")}, with ${ext(NOVO_OFFER, "$199 for the first two fills")} for new self-pay patients through December 31, 2026.</p>
<h3>ro Body membership cost</h3>
<p>The ro Body membership is $39 for the first month, then $149 a month month to month, or $74 a month on a 12-month prepaid plan. The membership pays for the provider assessment, follow-up and dose adjustments, not the drug, and insurance does not cover it (<a href="/reviews/ro">ro review</a>).</p>`,
      },
      {
        heading: "What do embody and ro cost over 6 months?",
        body: `<p>Over six monthly payments, embody costs $414 for compounded semaglutide and $714 for compounded tirzepatide at current prices, while ro without insurance costs about $2,328 to $3,278 for brand-name medication plus the month-to-month membership. The table shows the arithmetic, so you can swap in your own numbers.</p>
<table><thead><tr><th>Six-month scenario</th><th>Membership</th><th>Medication</th><th>Six-month total</th></tr></thead><tbody>
<tr><td>embody, compounded semaglutide at $69</td><td>None</td><td>6 x $69</td><td>$414 ($474 at the regular $79)</td></tr>
<tr><td>embody, compounded tirzepatide at $119</td><td>None</td><td>6 x $119</td><td>$714 ($774 at the regular $129)</td></tr>
<tr><td>ro, Wegovy pill, cash</td><td>$39 + 5 x $149 = $784</td><td>$149 + $199 + 4 x $299 = $1,544</td><td>$2,328</td></tr>
<tr><td>ro, Wegovy pen, cash</td><td>$784</td><td>$199 + $199 + 4 x $349 = $1,794</td><td>$2,578</td></tr>
<tr><td>ro, Zepbound KwikPen, cash</td><td>$784</td><td>$299 + $399 + 4 x $449 = $2,494</td><td>$3,278</td></tr>
<tr><td>ro, insurance covers the medication</td><td>$784</td><td>Your copays</td><td>$784 plus copays</td></tr>
</tbody></table>
<p>How we built it: embody prices from our <a href="/cheapest-glp1">price index</a>; ro prices and membership from our <a href="/articles/ro-cost">ro cost guide</a>, with medication following the standard dose steps (one step a month for the pill; two $199 starter fills for the pen; $299, $399, then $449 for Zepbound). Pens and KwikPens are 4-week supplies, so six fills cover about 24 weeks. The $74 prepaid membership would lower ro's membership line, but it commits you to 12 months.</p>
<h3>Hidden fees and surprise costs to check</h3>
<ul><li><strong>ro:</strong> the membership is billed on top of the drug, and that split is the most common complaint in ro's low-star reviews, per our <a href="/articles/ro-cost">ro cost guide</a>. Insurance can lower the drug, never the membership.</li><li><strong>ro:</strong> starter prices step up. The Wegovy pen goes from $199 to $349 after two fills, and Zepbound from $299 to $449 by the 7.5 mg dose.</li><li><strong>embody:</strong> the $69 and $119 prices are below the regular $79 and $129, so check the current price at checkout and whether it changes as your dose rises.</li><li><strong>Both:</strong> read the cancellation terms before you pay. embody says you can cancel anytime; on ro, a prepaid membership is a 12-month commitment.</li></ul>`,
      },
      {
        heading: "Compounded semaglutide vs brand Wegovy: what is the difference?",
        body: `<p>Brand Wegovy is FDA-approved semaglutide made by Novo Nordisk and tested in large clinical trials; compounded semaglutide, like embody's, is made by a compounding pharmacy for an individual patient and is not FDA-approved, so the FDA has not reviewed it for safety, effectiveness or quality. Both contain the same named active ingredient, but they are not interchangeable products.</p>
<table><thead><tr><th>Question</th><th>Compounded (embody)</th><th>Brand-name (ro)</th></tr></thead><tbody>
<tr><td>FDA-approved?</td><td>No</td><td>Yes: Wegovy and Zepbound</td></tr>
<tr><td>Clinical trial evidence</td><td>No trials of compounded products themselves</td><td>Wegovy: 14.9% average loss at 68 weeks in STEP 1; Zepbound: up to 20.9% at 72 weeks in SURMOUNT-1</td></tr>
<tr><td>Who makes it</td><td>US-based 503A compounding pharmacy, prescription by prescription</td><td>Novo Nordisk (Wegovy) or Eli Lilly (Zepbound)</td></tr>
<tr><td>Dose format</td><td>Compounded injections are often supplied in multi-dose vials drawn with a syringe; ask your provider</td><td>Prefilled pen or pill at fixed label doses</td></tr>
<tr><td>Monthly cost here</td><td>$69 semaglutide, $119 tirzepatide</td><td>$149 to $449 for the drug, plus the membership</td></tr>
</tbody></table>
<p>Trial figures: in ${ext(STEP1, "STEP 1")}, adults without diabetes on semaglutide 2.4 mg lost 14.9% of body weight on average at 68 weeks, versus 2.4% on placebo (treatment-policy estimand). In ${ext(SURMOUNT1, "SURMOUNT-1")}, tirzepatide produced 15.0%, 19.5% and 20.9% average loss at 72 weeks on 5, 10 and 15 mg, versus 3.1% on placebo (treatment-regimen estimand). These are separate trials, not a head-to-head comparison, and they tested the brand-name drugs, not compounded versions.</p>
<h3>Why compounded GLP-1s still exist after the shortages ended</h3>
<p>The FDA declared the ${ext(TIRZ_SHORTAGE, "tirzepatide shortage resolved")} in October 2024 (reaffirmed December 19, 2024) and the ${ext(SEMA_SHORTAGE, "semaglutide shortage resolved")} on February 21, 2025, which ended the period when compounders could make copies at scale. 503A pharmacies can still compound for an individual patient when a prescriber documents a clinical reason. The FDA has said it had received 990 adverse event reports tied to compounded semaglutide and more than 730 tied to compounded tirzepatide as of May 31, 2026, and that true numbers are likely higher, per its ${ext(FDA_CONCERNS, "page on unapproved GLP-1s")}. Our guide to <a href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name semaglutide</a> goes further.</p>
<h3>Dose ceilings and titration</h3>
<p>Brand-name pens come in fixed label doses: Wegovy steps up to 2.4 mg (7.2 mg for Wegovy HD) and Zepbound to a 15 mg maximum. At ro, the medication price rises with the dose, as the cost table shows. Compounded doses are written in milligrams but drawn in syringe units, and the FDA has reported overdoses from mixing up milligrams, milliliters and units in its ${ext(FDA_DOSING, "dosing-error alert")}. Whatever you choose, your clinician sets the dose; ask your provider how dose changes are handled and whether they change your price.</p>
<h3>Compounded tirzepatide vs Zepbound cost</h3>
<p>embody's compounded tirzepatide is $119 a month; ro's Zepbound KwikPen is $299 to $449 a month by dose plus the membership. Our <a href="/articles/tirzepatide-cost-2026">tirzepatide cost guide</a> compares every way to pay, from Lilly's self-pay prices to insurance and Medicare.</p>`,
      },
      {
        heading: "How fast can you start with embody or ro?",
        body: `<p>embody is built for speed: a health questionnaire of about 5 minutes, a clinician review that embody says usually happens within 24 hours, and shipping in 1 to 2 days in tracked, insured, temperature-controlled packaging once you are approved. ro also starts online with a provider assessment, but if you use insurance, the start date depends on your plan: the insurance concierge checks coverage first, and plans that need prior authorization add a wait for the insurer's decision.</p>
<table><thead><tr><th>Step</th><th>embody</th><th>ro</th></tr></thead><tbody>
<tr><td>Intake</td><td>Online questionnaire, about 5 minutes</td><td>Online provider assessment</td></tr>
<tr><td>Clinician review</td><td>Usually within 24 hours, often under 5 (embody's figures)</td><td>A licensed provider reviews every plan</td></tr>
<tr><td>Insurance step</td><td>None (cash pay)</td><td>Coverage check, then prior authorization if your plan requires it</td></tr>
<tr><td>Shipping</td><td>1-2 days, cold-chain, tracked and insured</td><td>From ro's own pharmacy</td></tr>
<tr><td>If not approved</td><td>Full refund</td><td>Check ro's terms before you pay</td></tr>
</tbody></table>
<p>Sources: our <a href="/reviews/embody">embody review</a> and <a href="/reviews/ro">ro review</a>. Our reviews do not list a lab requirement for either provider; your clinician may ask for recent labs or health information before prescribing, so have your weight history, current medications and any recent results ready.</p>`,
      },
      {
        heading: "Is a GLP-1 injection or a weight loss pill cheaper?",
        body: `<p>At starting doses, the pills are cheapest: the Wegovy pill begins at $149 a month self-pay, against $199 for the first Wegovy pen fills and $299 for Zepbound 2.5 mg. At maintenance doses the gap narrows: the Wegovy pill is $299 at 9 mg and 25 mg, the Wegovy pen $349 and Zepbound $449 at 7.5 mg and up. Compounded injections, like embody's $69 semaglutide, cost less than any of them, but they are not FDA-approved.</p>
<table><thead><tr><th>Option</th><th>Starting price</th><th>Maintenance price</th></tr></thead><tbody>
<tr><td>Wegovy pill (via ro or other sellers)</td><td>$149 (1.5 mg)</td><td>$299 (9 mg and 25 mg)</td></tr>
<tr><td>Wegovy pen</td><td>$199 (first two fills)</td><td>$349</td></tr>
<tr><td>Zepbound KwikPen</td><td>$299 (2.5 mg)</td><td>$449 (7.5 mg to 15 mg)</td></tr>
<tr><td>embody compounded semaglutide</td><td>$69</td><td>$69 (confirm at checkout)</td></tr>
</tbody></table>
<p>Self-pay prices per Novo Nordisk's ${ext(NOVO_PRICE_GUIDE, "price guide")} and our <a href="/articles/ro-cost">ro cost guide</a>; ro adds its membership to each. For the two newest pills side by side, see <a href="/articles/foundayo-vs-wegovy-pill">Foundayo vs the Wegovy pill</a>.</p>
<h3>How to get a Wegovy pen online in the US</h3>
<p>You need a prescription from a licensed clinician. Online, you can get one through a telehealth provider such as ro, which prescribes and fills brand-name Wegovy from its own pharmacy, or through your own doctor and Novo Nordisk's self-pay pharmacy at ${ext(NOVO_PRICE_GUIDE, "$349 a month")}. Never buy Wegovy without a prescription: the FDA warns about ${ext(FDA_CONCERNS, "unapproved GLP-1 products sold online")}.</p>`,
      },
      {
        heading: "Which is the best online GLP-1 provider in the US for you: embody or ro?",
        body: `<p>Choose embody if you pay cash and want the lowest predictable monthly cost; choose ro if your insurance covers a brand-name GLP-1 or you specifically want an FDA-approved Wegovy or Zepbound with an insurance concierge. The full matchup below scores both on the factors that matter most.</p>
<table><thead><tr><th>Metric</th><th>embody</th><th>ro</th></tr></thead><tbody>
<tr><td>Cheapest monthly price</td><td>$69 semaglutide, $119 tirzepatide</td><td>$149 drug minimum plus membership</td></tr>
<tr><td>Membership fee</td><td>None</td><td>$39, then $149 a month (or $74 prepaid for 12 months)</td></tr>
<tr><td>Medication type</td><td>Compounded, not FDA-approved</td><td>Brand-name, FDA-approved</td></tr>
<tr><td>Price as dose rises</td><td>Published price per medication; confirm at checkout</td><td>Rises by dose (Wegovy pen $199 to $349; Zepbound $299 to $449)</td></tr>
<tr><td>Insurance</td><td>Not accepted</td><td>Coverage check and prior authorization support</td></tr>
<tr><td>Six-month total (cash)</td><td>$414 semaglutide; $714 tirzepatide</td><td>$2,328 to $3,278</td></tr>
<tr><td>Time to ship after approval</td><td>1-2 days</td><td>From ro's pharmacy; insurance can add time</td></tr>
<tr><td>Pharmacy</td><td>503A compounding, LegitScript-certified</td><td>ro's own pharmacy</td></tr>
<tr><td>Cancellation</td><td>Cancel anytime; refund if not approved</td><td>Month-to-month or a 12-month prepaid plan</td></tr>
<tr><td>Trustpilot</td><td>3.9 from 11,494 reviews</td><td>3.9 from 7,572 reviews</td></tr>
</tbody></table>
<p>Prices from our <a href="/cheapest-glp1">price index</a> and <a href="/articles/ro-cost">ro cost guide</a> (October 2026); Trustpilot figures checked November 4, 2026. embody is not for you if you want an FDA-approved brand or to use insurance. ro is not for you if you pay cash and want the lowest monthly bill. For every provider ranked side by side, see our <a href="/glp1-provider-comparison">GLP-1 provider comparison</a>.</p>`,
      },
    ],
  },
};
