import type { Article } from "../articles";

export const pipelineSectionsB: Article["sections"] = [
  {
    heading: "How much weight do the new drugs help people lose compared with current options?",
    body: `<p><strong>In separate trials, Lilly's investigational retatrutide produced average weight loss of 28.3% at 80 weeks in TRIUMPH-1 under the efficacy estimand (25.0% in the NEJM treatment-regimen analysis), compared with 20.9% for Zepbound (tirzepatide 15 mg) at 72 weeks in SURMOUNT-1 and 14.9% for Wegovy (semaglutide 2.4 mg) at 68 weeks in STEP 1.</strong> These are numbers from different trials with different lengths, populations and analysis methods, so they show the rough size of the gap, not a head-to-head result.</p>
<p>The table below lines up the main results for people without type 2 diabetes, as of October 31, 2026. The efficacy estimand (EE) assumes everyone stayed on the drug, so it is larger. The treatment-regimen or treatment-policy estimand (TRE) counts everyone randomized, including people who stopped, so it is smaller. Where a source did not label the estimand, the table says so.</p>
<h3>People with overweight or obesity, without type 2 diabetes</h3>
<table>
<thead><tr><th>Drug (status, Oct 2026)</th><th>Trial and length</th><th>Dose</th><th>Average weight loss vs placebo</th><th>Estimand</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Wegovy (approved 2021)</td><td>STEP 1, 68 weeks</td><td>2.4 mg weekly</td><td>14.9% vs 2.4%</td><td>Primary treatment-policy analysis</td><td><a href="https://discovery.ucl.ac.uk/10127569/1/nejmoa2032183.pdf" target="_blank" rel="noopener">NEJM 2021</a></td></tr>
<tr><td>Wegovy HD (approved March 2026)</td><td>STEP UP, 72 weeks</td><td>7.2 mg weekly</td><td>18.7% vs 3.9% (Novo cites 20.7%)</td><td>18.7% not labeled in the abstract; 20.7% is very likely EE</td><td><a href="https://www.thelancet.com/journals/landia/article/PIIS2213-8587(25)00226-8/abstract" target="_blank" rel="noopener">Lancet D&amp;E</a></td></tr>
<tr><td>Wegovy pill (approved December 2025)</td><td>OASIS 4, 64 weeks</td><td>25 mg daily</td><td>13.6% vs 2.2% (16.6% vs 2.7% if fully adherent)</td><td>Treatment-policy (EE in brackets)</td><td><a href="https://www.medscape.com/viewarticle/fda-okays-oral-semaglutide-25-mg-weight-management-2025a100104g" target="_blank" rel="noopener">Medscape</a></td></tr>
<tr><td>Foundayo, orforglipron (approved April 2026)</td><td>ATTAIN-1, 72 weeks</td><td>36 mg daily (trial dose)</td><td>11.2% vs 2.1% (Lilly's EE headline: 12.4%)</td><td>TRE (EE in brackets)</td><td><a href="https://mediacenteratypon.nejmgroup-production.org/NEJMoa2511774.pdf" target="_blank" rel="noopener">NEJM 2025</a></td></tr>
<tr><td>Zepbound, tirzepatide (approved 2023)</td><td>SURMOUNT-1, 72 weeks</td><td>15 mg weekly</td><td>20.9% vs 3.1% (EE: 22.5%)</td><td>TRE (EE in brackets)</td><td><a href="https://cm.healio.com/news/endocrinology/20220604/weekly-tirzepatide-confers-substantial-weight-loss-in-obesity-without-diabetes-surmount1" target="_blank" rel="noopener">Healio</a></td></tr>
<tr><td>Retatrutide (investigational)</td><td>TRIUMPH-1, 80 weeks</td><td>12 mg weekly</td><td>25.0% vs 3.9% (TRE); 28.3% vs 2.2% (EE)</td><td>Both shown</td><td><a href="https://www.nejm.org/doi/abs/10.1056/NEJMoa2604169" target="_blank" rel="noopener">NEJM 2026</a>; <a href="https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss" target="_blank" rel="noopener">Lilly</a></td></tr>
<tr><td>CagriSema (investigational; FDA decision pending)</td><td>REDEFINE 1, 68 weeks</td><td>2.4 mg/2.4 mg weekly</td><td>20.4% vs 3.0% (EE: 22.7%)</td><td>Treatment-policy (EE in brackets)</td><td><a href="https://www.biospace.com/press-releases/novo-nordisk-a-s-cagrisema-2-4-mg-2-4-mg-demonstrated-22-7-mean-weight-reduction-in-adults-with-overweight-or-obesity-in-redefine-1-published-in-new-england-journal-of-medicine" target="_blank" rel="noopener">Novo via BioSpace</a></td></tr>
<tr><td>Survodutide (investigational)</td><td>SYNCHRONIZE-1, 76 weeks</td><td>6.0 mg weekly</td><td>Up to 16.6% vs 3.2%</td><td>EE</td><td><a href="https://www.boehringer-ingelheim.com/us/human-health/metabolic-diseases/results-phase-iii-synchronize-1-obesity-trial" target="_blank" rel="noopener">Boehringer</a></td></tr>
<tr><td>CT-388, enicepatide (investigational)</td><td>Phase 2, 48 weeks</td><td>24 mg weekly</td><td>22.5% more than placebo (TRE: 18.3% more)</td><td>EE (TRE in brackets)</td><td><a href="https://www.roche.com/media/releases/med-cor-2026-01-27" target="_blank" rel="noopener">Roche</a></td></tr>
<tr><td>MariTide (investigational)</td><td>Phase 2, 52 weeks</td><td>Monthly or less often</td><td>12.3-16.2% vs 2.5% (EE: 16.3-19.9%)</td><td>TRE (EE in brackets)</td><td><a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2504214" target="_blank" rel="noopener">NEJM 2025</a></td></tr>
<tr><td>Amycretin injection (investigational)</td><td>Phase 1b/2a, 36 weeks, 125 people</td><td>Up to 60 mg weekly</td><td>Up to 24.3% vs 1.1%</td><td>Not stated</td><td><a href="https://www.nasdaq.com/press-release/novo-nordisks-subcutaneous-and-oral-amycretin-data-published-lancet-and-presented-ada" target="_blank" rel="noopener">Novo via Nasdaq</a></td></tr>
<tr><td>Eloralintide (investigational)</td><td>Phase 2, 48 weeks</td><td>Range of doses</td><td>9.5-20.1% vs 0.4%</td><td>EE</td><td><a href="https://lilly.mediaroom.com/2025-11-06-Lillys-selective-amylin-agonist,-eloralintide,-demonstrated-meaningful-weight-loss-and-favorable-tolerability-in-a-Phase-2-study-of-adults-with-obesity-or-overweight" target="_blank" rel="noopener">Lilly</a></td></tr>
<tr><td>Petrelintide (investigational)</td><td>ZUPREME-1, Phase 2, 42 weeks</td><td>Range of doses</td><td>Up to 10.7% vs 1.7%</td><td>EE</td><td><a href="https://www.roche.com/media/releases/med-cor-2026-03-05" target="_blank" rel="noopener">Roche</a></td></tr>
</tbody>
</table>
<h3>People with type 2 diabetes</h3>
<p>People with type 2 diabetes lose less weight on every drug in this class, so their results belong in a separate table. One row here is a true head-to-head: TRANSCEND-T2D-2 randomized people to retatrutide or Ozempic 2 mg in the same trial, and Lilly reported the results on October 28, 2026 (<a href="https://www.statnews.com/2026/10/28/retatrutide-vs-ozempic-lilly-diabetes-study/" target="_blank" rel="noopener">STAT</a>).</p>
<table>
<thead><tr><th>Drug</th><th>Trial and length</th><th>Average weight loss</th><th>Estimand</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Retatrutide vs Ozempic 2 mg</td><td>TRANSCEND-T2D-2, 80 weeks (head-to-head)</td><td>20.9% (12 mg) and 19.5% (9 mg) vs 9.4% with Ozempic</td><td>EE (people who stayed on treatment)</td><td><a href="https://www.healio.com/news/endocrinology/20261028/retatrutide-confers-greater-decreases-in-hba1c-weight-vs-ozempic-in-type-2-diabetes" target="_blank" rel="noopener">Healio</a></td></tr>
<tr><td>Retatrutide vs placebo</td><td>TRIUMPH-2, 80 weeks</td><td>20.8% vs 4.0% (EE); 18.8% vs 5.1% (TRE), 12 mg</td><td>Both shown</td><td><a href="https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-successful-two-additional" target="_blank" rel="noopener">Lilly</a></td></tr>
<tr><td>CagriSema vs placebo</td><td>REDEFINE 2, 68 weeks</td><td>13.7% vs 3.4%</td><td>Treatment-policy</td><td><a href="https://www.hcplive.com/view/cagrisema-yields-nearly-16-weight-loss-in-phase-3-redefine-2-trial" target="_blank" rel="noopener">HCPLive</a></td></tr>
<tr><td>Survodutide vs placebo</td><td>SYNCHRONIZE-2, Phase 3</td><td>Up to 13.1%</td><td>Not stated</td><td><a href="https://www.globenewswire.com/news-release/2026/10/01/3372564/0/en/boehringer-ingelheim-s-survodutide-achieves-up-to-13-1-weight-loss-in-new-phase-iii-trial-alongside-significant-improvements-in-glycemic-control-in-people-with-obesity-and-type-2-d.html" target="_blank" rel="noopener">Boehringer</a></td></tr>
<tr><td>Amycretin injection vs placebo</td><td>Phase 2, 36 weeks</td><td>Up to 14.5% vs 2.6%</td><td>Not stated</td><td><a href="https://www.globenewswire.com/news-release/2025/11/25/3194155/0/en/Novo-Nordisk-phase-2-trial-with-amycretin-reports-significant-weight-loss-and-HbA1c-reduction-in-type-2-diabetes.html" target="_blank" rel="noopener">Novo</a></td></tr>
</tbody>
</table>
<h3>What these numbers mean for you</h3>
<ul>
<li><strong>The top of the range is moving up, not starting over.</strong> Zepbound already reaches about 21% on average in SURMOUNT-1 (TRE). Retatrutide's TRE figure in TRIUMPH-1 is 25.0%, a few points higher in a longer, separate trial.</li>
<li><strong>Not every new drug beats current options.</strong> In REDEFINE 4, the only head-to-head of CagriSema against tirzepatide 15 mg, CagriSema lost 20.2% vs 23.6% (TRE) and failed its non-inferiority goal (<a href="https://www.drugtopics.com/view/cagrisema-did-not-meet-primary-end-point-of-noninferiority-to-tirzepatide" target="_blank" rel="noopener">Drug Topics</a>).</li>
<li><strong>Averages hide a wide spread.</strong> In TRIUMPH-1, 45.3% of people on retatrutide 12 mg lost at least 30% of their body weight under the EE, which also means more than half did not (<a href="https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss" target="_blank" rel="noopener">Lilly</a>).</li>
</ul>`,
  },
  {
    heading: "How should you read headlines about new weight loss drug trials?",
    body: `<p><strong>To read a weight loss drug headline, check six things before the percentage: which estimand it uses, how long the trial ran, what the comparator was, who was enrolled, how many people dropped out, and which dose produced the number.</strong> The same retatrutide arm in TRIUMPH-1 is reported as 28.3% by Lilly and 25.0% by NEJM, and both are correct, because they answer different questions (<a href="https://www.nejm.org/doi/abs/10.1056/NEJMoa2604169" target="_blank" rel="noopener">NEJM</a>; <a href="https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss" target="_blank" rel="noopener">Lilly</a>).</p>
<h3>The headline checklist</h3>
<table>
<thead><tr><th>Check</th><th>What to look for</th><th>Real example</th></tr></thead>
<tbody>
<tr><td>1. Estimand</td><td>Efficacy (everyone stays on drug, bigger number) or treatment-regimen (everyone randomized, smaller number)</td><td>TRIUMPH-1, 12 mg: 28.3% EE vs 25.0% TRE (<a href="https://www.nejm.org/doi/abs/10.1056/NEJMoa2604169" target="_blank" rel="noopener">NEJM</a>)</td></tr>
<tr><td>2. Trial length</td><td>Weight loss keeps growing for a year or more; a 12-week number is not a 72-week number</td><td>Oral amycretin: up to 13.1% at 12 weeks in Phase 1 (<a href="https://www.globenewswire.com/news-release/2025/06/20/3102977/0/en/novo-nordisk-s-subcutaneous-and-oral-amycretin-data-published-in-the-lancet-and-presented-at-ada-2025.html" target="_blank" rel="noopener">Novo</a>)</td></tr>
<tr><td>3. Comparator</td><td>Placebo, or an active drug? Which dose of the active drug?</td><td>TRANSCEND-T2D-2 compared retatrutide with Ozempic 2 mg, a diabetes dose, not Wegovy 2.4 mg (<a href="https://www.statnews.com/2026/10/28/retatrutide-vs-ozempic-lilly-diabetes-study/" target="_blank" rel="noopener">STAT</a>)</td></tr>
<tr><td>4. Population</td><td>With or without type 2 diabetes; any added conditions</td><td>Retatrutide 12 mg: 28.3% in TRIUMPH-1 (no diabetes) vs 20.8% in TRIUMPH-2 (diabetes), both EE (<a href="https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-successful-two-additional" target="_blank" rel="noopener">Lilly</a>)</td></tr>
<tr><td>5. Dropout</td><td>How many stopped, and why</td><td>VK2735 pill: 28% stopped vs 18% on placebo in VENTURE-Oral (<a href="https://www.biopharmadive.com/news/viking-oral-obesity-drug-results-study-discontinuationsdata-dropout/758019/" target="_blank" rel="noopener">BioPharma Dive</a>)</td></tr>
<tr><td>6. Dose and "up to"</td><td>Is the figure from the top dose only? Is that dose the one likely to be approved?</td><td>Foundayo's trial top dose was 36 mg; check the label for approved doses (<a href="https://mediacenteratypon.nejmgroup-production.org/NEJMoa2511774.pdf" target="_blank" rel="noopener">NEJM</a>)</td></tr>
<tr><td>7. Placebo-adjusted or raw</td><td>"22.5% placebo-adjusted" already subtracts the placebo group</td><td>CT-388: 22.5% placebo-adjusted at 48 weeks (<a href="https://www.roche.com/media/releases/med-cor-2026-01-27" target="_blank" rel="noopener">Roche</a>)</td></tr>
</tbody>
</table>
<h3>Worked example: "more than double the weight loss of Ozempic"</h3>
<p>On October 28, 2026, Lilly announced that retatrutide "delivered greater A1C reduction and more than double the weight loss of Ozempic's highest approved dose in head-to-head trial" (<a href="https://www.biospace.com/press-releases/lillys-retatrutide-delivered-greater-a1c-reduction-and-more-than-double-the-weight-loss-of-ozempics-highest-approved-dose-in-head-to-head-trial" target="_blank" rel="noopener">Lilly via BioSpace</a>). Here is how the checklist applies to that headline.</p>
<ul>
<li><strong>Is "more than double" accurate?</strong> Yes, for the 12 mg dose: 20.9% divided by 9.4% is about 2.2 times. For 9 mg, 19.5% divided by 9.4% is about 2.1 times.</li>
<li><strong>Estimand:</strong> STAT notes these analyses covered only people who stayed on treatment, the EE (<a href="https://www.statnews.com/2026/10/28/retatrutide-vs-ozempic-lilly-diabetes-study/" target="_blank" rel="noopener">STAT</a>). Treatment-regimen results were not available in the sources we found, as of October 31, 2026.</li>
<li><strong>Population:</strong> 1,298 adults with type 2 diabetes and a starting A1C of 8.3%, over 80 weeks. People without diabetes usually lose more, so the result does not transfer directly.</li>
<li><strong>Comparator:</strong> Ozempic 2 mg is the top approved Ozempic dose for diabetes. The trial did not test Wegovy HD, Zepbound or Foundayo.</li>
<li><strong>Trade-off:</strong> 7.9% stopped retatrutide 12 mg because of side effects, vs 2.7% on Ozempic (<a href="https://www.biospace.com/press-releases/lillys-retatrutide-delivered-greater-a1c-reduction-and-more-than-double-the-weight-loss-of-ozempics-highest-approved-dose-in-head-to-head-trial" target="_blank" rel="noopener">Lilly via BioSpace</a>).</li>
</ul>
<p>The fair summary: in a true head-to-head trial in type 2 diabetes, retatrutide lowered A1C by 2.2 points vs 1.8 with Ozempic and roughly doubled weight loss among people who stayed on treatment, with more people stopping for side effects. Retatrutide is still not FDA-approved.</p>
`,
  },
  {
    heading: "What side effects have shown up with the new drugs so far?",
    body: `<p><strong>The new drugs mostly show the same gastrointestinal side effects as Wegovy and Zepbound, plus a few new signals: dysesthesia (skin sensitivity or burning) with Lilly's retatrutide, higher dropout at top doses of several candidates, and a liver-injury case that ended Pfizer's danuglipron in April 2025.</strong> Long-term safety, including heart outcomes, is not yet known for any of the investigational drugs as of October 2026.</p>
<p>The table below lists only signals reported in trial releases or journals. Rates come from separate trials and are not directly comparable. "AE discontinuation" means the share of people who stopped the drug because of an adverse event.</p>
<table>
<thead><tr><th>Drug</th><th>Signal</th><th>Rates reported (drug vs placebo or comparator)</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Retatrutide (TRIUMPH-1, 80 weeks)</td><td>Dysesthesia; AE discontinuation</td><td>Dysesthesia 5.1% (4 mg), 12.3% (9 mg), 12.5% (12 mg) vs 0.9%. Stopping for AEs 4.1%, 6.9%, 11.3% vs 4.9%</td><td><a href="https://www.pharmacytimes.com/view/retatrutide-delivers-bariatric-level-weight-loss-pivotal-phase-3-triumph-1-trial" target="_blank" rel="noopener">Pharmacy Times</a></td></tr>
<tr><td>Retatrutide (TRIUMPH-4, knee osteoarthritis)</td><td>Dysesthesia; AE discontinuation</td><td>Dysesthesia 8.8% (9 mg) and 20.9% (12 mg) vs 0.7%. Stopping for AEs 12.2% and 18.2% vs 4.0%</td><td><a href="https://www.fiercebiotech.com/biotech/eli-lillys-obesity-triple-threat-smashes-efficacy-expectations-phase-3-proves-intolerable" target="_blank" rel="noopener">Fierce Biotech</a></td></tr>
<tr><td>Retatrutide (TRANSCEND-T2D-2, vs Ozempic 2 mg)</td><td>GI effects; AE discontinuation</td><td>Diarrhea 28.3% and 32.7% vs 26.4%; nausea 21.2% and 23.8% vs 21.3%. Stopping for AEs 4.8% and 7.9% vs 2.7%</td><td><a href="https://www.biospace.com/press-releases/lillys-retatrutide-delivered-greater-a1c-reduction-and-more-than-double-the-weight-loss-of-ozempics-highest-approved-dose-in-head-to-head-trial" target="_blank" rel="noopener">Lilly via BioSpace</a></td></tr>
<tr><td>Retatrutide (TRANSCEND-T2D-1, 40 weeks)</td><td>Urinary tract infections</td><td>2.2%, 4.5%, 5.1% vs 0.0%</td><td><a href="https://www.medscape.com/viewarticle/retatrutide-data-show-dramatic-weight-loss-other-benefits-2026a1000iz0" target="_blank" rel="noopener">Medscape</a></td></tr>
<tr><td>CagriSema (REDEFINE 1, 68 weeks)</td><td>GI effects; AE discontinuation</td><td>GI events 79.6% vs 39.9%. Stopping for AEs about 6% vs 3.7%</td><td><a href="https://www.hcplive.com/view/cagrisema-achieves-22-7-weight-loss-in-phase-3-redefine-1-trial" target="_blank" rel="noopener">HCPLive</a></td></tr>
<tr><td>MariTide (Phase 2, 52 weeks)</td><td>Vomiting</td><td>24.4% and 22.5% in the two highest-dose arms that used dose escalation; Amgen reported no GI-related discontinuations in those arms</td><td><a href="https://www.amgen.com/newsroom/press-releases/2025/06/results-from-amgens-phase-2-obesity-study-of-monthly-maritide-presented-at-the-american-diabetes-association-85th-scientific-sessions" target="_blank" rel="noopener">Amgen</a></td></tr>
<tr><td>Petrelintide (ZUPREME-1)</td><td>Nausea</td><td>19.6% vs 6.2%; 88-98% reached their target dose</td><td><a href="https://www.globenewswire.com/news-release/2026/09/29/3371443/0/en/zealand-pharma-to-present-additional-data-from-phase-2-zupreme-1-trial-for-petrelintide-at-easd-2026-and-announces-publication-of-trial-results-in-the-lancet-diabetes-endocrinology.html" target="_blank" rel="noopener">Zealand</a></td></tr>
<tr><td>CT-388, enicepatide (Phase 2)</td><td>AE discontinuation</td><td>5.9% vs 1.3%</td><td><a href="https://www.roche.com/media/releases/med-cor-2026-01-27" target="_blank" rel="noopener">Roche</a></td></tr>
<tr><td>VK2735 pill (VENTURE-Oral, 13 weeks)</td><td>Overall discontinuation, mostly GI</td><td>28% vs 18%</td><td><a href="https://www.biopharmadive.com/news/viking-oral-obesity-drug-results-study-discontinuationsdata-dropout/758019/" target="_blank" rel="noopener">BioPharma Dive</a></td></tr>
<tr><td>Aleniglipron (ACCESS, 36 weeks)</td><td>AE discontinuation</td><td>10.4% across active arms (range 7.7-13.3%)</td><td><a href="https://ir.structuretx.com/news-releases/news-release-details/structure-therapeutics-reports-positive-topline-data-access" target="_blank" rel="noopener">Structure</a></td></tr>
<tr><td>Danuglipron (Pfizer; discontinued)</td><td>Possible drug-induced liver injury</td><td>One participant; resolved after stopping; development ended April 2025</td><td><a href="https://www.fiercebiotech.com/biotech/pfizer-axes-oral-glp-1-asset-over-liver-injury-blowing-hole-obesity-plan" target="_blank" rel="noopener">Fierce Biotech</a></td></tr>
</tbody>
</table>
<h3>The dysesthesia question</h3>
<p>Dysesthesia is the new signal people ask about most. Lilly says the events were generally mild to moderate, most resolved during treatment, and most participants kept taking retatrutide. NEJM groups them as "dysesthesia: skin burning sensation and related adverse events", and the mechanism has not been established (<a href="https://www.drugdiscoverytrends.com/lillys-retatrutide-shows-28-3-weight-loss-but-increased-side-effects/" target="_blank" rel="noopener">Drug Discovery Trends</a>). A similar skin-sensation effect has been reported with an approved drug: about 23% on Wegovy HD 7.2 mg vs 6% on 2.4 mg and under 1% on placebo, generally resolving on its own or with a lower dose (<a href="https://thehill.com/policy/healthcare/5792140-novo-nordisk-wegovy-dosage/" target="_blank" rel="noopener">The Hill</a>).</p>
<h3>Heart rate and heart outcomes</h3>
<p>Retatrutide raised resting heart rate in trials, a known effect of this class and of glucagon activity (<a href="https://www.thecrawizard.com/p/retatrutide-part-two-what-triumph" target="_blank" rel="noopener">TRIUMPH-3 commentary</a>). TRIUMPH-3's exploratory heart data were inconclusive: MACE-3 events were 27 on retatrutide vs 23 on placebo (hazard ratio 1.12, confidence interval 0.64-1.96), and the trial was not powered for events. The roughly 10,000-person TRIUMPH-Outcomes trial is the one that will answer it (<a href="https://clinicaltrials.gov/study/NCT06383390" target="_blank" rel="noopener">ClinicalTrials.gov</a>). By contrast, Wegovy already has a proven 20% cut in major cardiovascular events from SELECT (<a href="https://www.acc.org/latest-in-cardiology/clinical-trials/2023/11/09/15/04/select" target="_blank" rel="noopener">ACC</a>).</p>
<p>For the side effects of the drugs you can take today, and how to manage them, see our <a href="/articles/glp1-side-effects-risks-2026">GLP-1 side effects and risks guide</a>.</p>`,
  },
  {
    heading: "How much will the new weight loss drugs cost?",
    body: `<p><strong>No price has been announced for retatrutide, CagriSema, amycretin or MariTide as of October 31, 2026, and none of them is FDA-approved, so any price you see quoted for them is a guess.</strong> The best guide is how recent launches were priced: the Wegovy pill (January 2026) and Foundayo (April 2026) both started at $149 a month for cash payers at the lowest dose, in line with the November 2025 White House pricing deal.</p>
<h3>How 2025-2026 launches were priced</h3>
<table>
<thead><tr><th>Drug</th><th>US launch or approval</th><th>Self-pay price at launch or now</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Wegovy pill</td><td>Launched January 5, 2026</td><td>$149 (1.5 mg), $199 (4 mg), $299 (9 mg and 25 mg) a month</td><td><a href="https://www.cnn.com/2026/01/06/health/wegovy-pill-weight-loss-explained" target="_blank" rel="noopener">CNN</a></td></tr>
<tr><td>Wegovy HD (7.2 mg)</td><td>Approved March 19, 2026</td><td>$399 a month; NovoCare says insurance coverage is not available for 7.2 mg</td><td><a href="https://www.novocare.com/content/dam/novonordisk/novocare/redesign/pdf/Wegovy_Price_Guide.pdf" target="_blank" rel="noopener">NovoCare price guide</a></td></tr>
<tr><td>Foundayo</td><td>Approved April 1, 2026</td><td>From $149 a month; $299 at higher doses if refilled within 45 days</td><td><a href="https://www.lilly.com/lillydirect/foundayo" target="_blank" rel="noopener">LillyDirect</a></td></tr>
<tr><td>Zepbound (KwikPen or vial)</td><td>Self-pay pricing from February 23, 2026</td><td>$299 (2.5 mg), $399 (5 mg), $449 (7.5-15 mg, refilled within 45 days)</td><td><a href="https://www.lilly.com/lillydirect/zepbound" target="_blank" rel="noopener">LillyDirect</a></td></tr>
<tr><td>Wegovy pen</td><td>Self-pay cut November 17, 2025</td><td>$349 a month at every dose from 0.25 mg to 2.4 mg</td><td><a href="https://www.novocare.com/content/dam/novonordisk/novocare/redesign/pdf/Wegovy_Price_Guide.pdf" target="_blank" rel="noopener">NovoCare price guide</a></td></tr>
</tbody>
</table>
<p>Two patterns stand out. First, the newest products did not launch above the older ones. Wegovy HD costs $50 a month more than the standard Wegovy pen ($399 vs $349), and both pills start well below either injection. Second, self-pay prices sit far below list prices: the Wegovy pen's $349 is about 26% of its roughly $1,349 list price per 28-day supply (<a href="https://www.healthsystemtracker.org/brief/how-trumprx-brand-name-drug-prices-compare-to-other-countries/" target="_blank" rel="noopener">Peterson-KFF</a>).</p>
<h3>The policy that may shape new-drug prices</h3>
<p>Under the November 6, 2025 deal with the White House, Lilly and Novo agreed to TrumpRx cash prices of $350 a month for Wegovy and Ozempic and an average of $346 for Zepbound, with starting doses of future approved oral GLP-1s at about $149-$150 a month (<a href="https://www.cnbc.com/2025/11/06/trump-eli-lilly-novo-nordisk-deal-obesity-drug-prices.html" target="_blank" rel="noopener">CNBC</a>). Both companies also committed to "most favored nation" pricing on new medicines they launch (<a href="https://www.pharmacytimes.com/view/eli-lilly-novo-nordisk-strike-mfn-deals-with-trump-administration-to-lower-glp-1-prices" target="_blank" rel="noopener">Pharmacy Times</a>). That would plausibly cover retatrutide and CagriSema, but neither company has confirmed how it applies to them. Lilly CEO Ricks told CNBC on April 1, 2026 that Lilly opposes writing that pricing into law (<a href="https://www.cnbc.com/2026/04/01/eli-lilly-opposes-trump-mfn-drug-pricing-law-ceo-ricks-says.html" target="_blank" rel="noopener">CNBC</a>).</p>
<p>Prices are also falling on existing drugs. Lilly's third-quarter 2026 revenue grew 39% even though realized prices fell 15%, because volume rose 53% (<a href="https://www.sec.gov/Archives/edgar/data/0000059478/000005947826000104/q326lillysalesandearningsp.htm" target="_blank" rel="noopener">Lilly 8-K</a>). Novo will cut the list price of Wegovy, Ozempic and Rybelsus to $675 a month from January 1, 2027, about half the current Wegovy list price, though Novo says self-pay prices do not change (<a href="https://www.prnewswire.com/news-releases/novo-nordisk-announces-significant-reduction-in-us-list-price-for-wegovy-ozempic-and-rybelsus-semaglutide-medicines-building-on-continued-efforts-to-expand-access-302695705.html" target="_blank" rel="noopener">Novo Nordisk</a>).</p>
<h3>What this means for your budget</h3>
<ul>
<li><strong>Plan with today's prices.</strong> A new injectable is unlikely to be cheaper than current self-pay options at launch, but nobody can tell you what it will cost until the company announces a price.</li>
<li><strong>Be wary of "price forecasts".</strong> Third-party sites have published retatrutide price predictions; Lilly has published none. Lilly says no one can legally sell retatrutide for human use (<a href="https://www.lilly.com/news/stories/what-to-know-about-retatrutide" target="_blank" rel="noopener">Lilly</a>).</li>
</ul>
<p>For every current way to pay less, from savings cards to HSA rules, see our <a href="/articles/glp1-cost-2026-how-to-pay-less">GLP-1 cost guide for 2026</a>.</p>`,
  },
  {
    heading: "Will insurance or Medicare cover the new drugs?",
    body: `<p><strong>No insurer or Medicare program covers retatrutide, CagriSema or the other investigational drugs today, because coverage can only follow FDA approval, and none of them is approved as of October 31, 2026.</strong> The Medicare GLP-1 Bridge, which charges eligible Part D enrollees $50 a month, names only Wegovy (injection or pill), the Zepbound KwikPen and Foundayo (<a href="https://www.medicare.gov/publications/12234-medicare-glp-1-bridge-glp-1-drugs-for-50-a-month.pdf" target="_blank" rel="noopener">Medicare.gov</a>).</p>
<h3>Medicare: what is covered now</h3>
<p>Medicare law has generally excluded drugs used for weight loss, which is why obesity coverage needed a special demonstration (<a href="https://www.medicare.gov/coverage/weight-loss-drugs" target="_blank" rel="noopener">Medicare.gov</a>). The Bridge started July 1, 2026 and was extended through December 31, 2027 after CMS delayed the Part D portion of its BALANCE Model (<a href="https://www.kff.org/quick-insights/cms-extends-medicares-short-term-bridge-program-for-glp-1-obesity-drug-coverage/" target="_blank" rel="noopener">KFF</a>; <a href="https://www.aha.org/news/headline/2026-04-22-cms-delays-part-d-portion-balance-model-expansion-glp-1-access" target="_blank" rel="noopener">AHA News</a>).</p>
<table>
<thead><tr><th>Medicare GLP-1 Bridge detail</th><th>As of October 2026</th></tr></thead>
<tbody>
<tr><td>Monthly cost to you</td><td>$50, which does not count toward the Part D deductible or out-of-pocket cap</td></tr>
<tr><td>Drugs on the list</td><td>Wegovy (pen and pill), Zepbound KwikPen, Foundayo</td></tr>
<tr><td>Not on the list</td><td>Ozempic (diabetes use stays under regular Part D); Zepbound vials and single-dose pens; every investigational drug</td></tr>
<tr><td>Eligibility</td><td>BMI 35 or more; or BMI 30 or more with HFpEF, uncontrolled hypertension or CKD stage 3a or higher; or BMI 27 or more with prediabetes, prior heart attack or stroke, or symptomatic peripheral artery disease</td></tr>
<tr><td>End date</td><td>December 31, 2027</td></tr>
</tbody>
</table>
<p>Sources for the table: eligibility from the <a href="https://www.cms.gov/files/document/glp-1-prescribers-c-1.pdf" target="_blank" rel="noopener">CMS prescriber guidance</a>; drug list and cost from <a href="https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge" target="_blank" rel="noopener">CMS</a>. KFF estimates nearly 4 million Medicare beneficiaries met the criteria in 2023 (<a href="https://www.kff.org/medicare/nearly-four-million-medicare-beneficiaries-met-the-eligibility-criteria-in-2023-for-the-medicare-glp-1-bridge/" target="_blank" rel="noopener">KFF</a>). Whether CMS would add a newly approved drug to the Bridge has not been announced.</p>
<p>One route to coverage for new drugs runs through other conditions. People who get a GLP-1 under Part D for type 2 diabetes, sleep apnea or cardiovascular risk reduction use their regular plan, not the Bridge (<a href="https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge/information-part-d-plans" target="_blank" rel="noopener">CMS</a>). Lilly's planned retatrutide filing covers obesity, knee osteoarthritis pain and obstructive sleep apnea (<a href="https://finance.yahoo.com/healthcare/articles/eli-lilly-delays-retatrutide-weight-110921112.html" target="_blank" rel="noopener">Yahoo Finance</a>), so what the FDA eventually approves will matter for coverage.</p>
<h3>Employer plans: the trend is flat to down</h3>
<table>
<thead><tr><th>Survey</th><th>Finding</th><th>Source</th></tr></thead>
<tbody>
<tr><td>KFF Employer Health Benefits Survey (October 22, 2026)</td><td>18% of firms with 200+ workers cover GLP-1s mainly for weight loss; at firms with 5,000+ workers coverage fell from 43% (2025) to 33% (2026)</td><td><a href="https://www.kff.org/health-costs/2026-employer-health-benefits-survey/" target="_blank" rel="noopener">KFF</a></td></tr>
<tr><td>Business Group on Health (completed June 2026)</td><td>Coverage of GLP-1s for obesity among large employers fell from 72% in 2025 to 60% in 2026</td><td><a href="https://www.businessgrouphealth.org/newsroom/news-and-press-releases/press-releases/2027-employer-healthcare-strategy-survey" target="_blank" rel="noopener">BGH</a></td></tr>
<tr><td>Mercer (spring 2026)</td><td>6% of employers with 500+ employees dropped weight-loss GLP-1 coverage in 2026; 5% plan to drop it or are considering it for 2027</td><td><a href="https://www.mercer.com/en-us/about/newsroom/employers-are-shifting-healthcare-costs-to-employees/" target="_blank" rel="noopener">Mercer</a></td></tr>
</tbody>
</table>
<p>New drugs also face a waiting period on formularies. Foundayo was approved April 1, 2026, and CVS Caremark removed its new-to-market block effective June 1, 2026, about two months later (<a href="https://www.managedhealthcareexecutive.com/view/cvs-caremark-to-put-zepbound-back-on-formulary-and-add-foundayo" target="_blank" rel="noopener">Managed Healthcare Executive</a>). A similar lag is possible for any newly approved drug, and remember that employer plans can customize their formularies.</p>
<p>Medicaid coverage of GLP-1s for obesity is a state choice; KFF counted 13 state programs covering them under fee-for-service as of January 2026 (<a href="https://www.kff.org/medicaid/medicaid-coverage-of-and-spending-on-glp-1s/" target="_blank" rel="noopener">KFF</a>). If you are 65 or older, our <a href="/articles/glp1-after-65-medicare">GLP-1 after 65 and Medicare guide</a> walks through the Bridge step by step.</p>`,
  },
  {
    heading: "Can you get retatrutide or other new drugs now?",
    body: `<p><strong>No: retatrutide, CagriSema, amycretin, MariTide and the other investigational drugs are not FDA-approved and cannot be legally prescribed outside a clinical trial, and anything sold online today as retatrutide is an unapproved product.</strong> Lilly states that retatrutide "has not been reviewed or approved by the FDA or any regulatory agency in the world, and no one can legally sell it for human use" (<a href="https://www.lilly.com/news/stories/what-to-know-about-retatrutide" target="_blank" rel="noopener">Lilly</a>).</p>
<h3>Why "research peptide" retatrutide is not a shortcut</h3>
<p>Retatrutide cannot lawfully be compounded. In a September 9, 2025 warning letter, the FDA said it has no USP/NF monograph, is not a component of an approved drug, and is not on the 503A or 503B bulks lists, and the agency has advised consumers not to buy unapproved retatrutide products (<a href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/asn-labs-09092025" target="_blank" rel="noopener">FDA warning letter</a>). A "research use only" label is no defense when the marketing describes weight or metabolic effects (<a href="https://www.frierlevitt.com/articles/lilly-retatrutide-lawsuits-ruo-peptide-sellers/" target="_blank" rel="noopener">Frier Levitt</a>).</p>
<table>
<thead><tr><th>Date</th><th>Action against unapproved sellers</th><th>Source</th></tr></thead>
<tbody>
<tr><td>September 5, 2025</td><td>FDA announces a GLP-1 "green list"; Import Alert 66-80 lets GLP-1 ingredients from unlisted manufacturers be detained at the border</td><td><a href="https://content.govdelivery.com/accounts/USFDA/bulletins/3f14120" target="_blank" rel="noopener">FDA bulletin</a></td></tr>
<tr><td>March 31, 2026</td><td>FDA warning letter to Gram Peptides, which promoted retatrutide and tirzepatide as "research" peptides</td><td><a href="https://www.peptideknow.com/blog/fda-warning-letter-gram-peptides-retatrutide-tirzepatide" target="_blank" rel="noopener">summary of FDA letter</a></td></tr>
<tr><td>August 12, 2026</td><td>Lilly sues six US businesses, including med spas, a compounding pharmacy and online peptide sellers, over alleged retatrutide sales</td><td><a href="https://www.cnbc.com/2026/08/12/lilly-lawsuits-obesity-drug-retatrutide.html" target="_blank" rel="noopener">CNBC</a></td></tr>
<tr><td>August 24, 2026</td><td>Five FDA warning letters to peptide sellers naming retatrutide, semaglutide and tirzepatide sold "for research use"</td><td><a href="https://www.spakinect.com/news/fda-warning-letters-peptide-glp1-products" target="_blank" rel="noopener">tracker of FDA letters</a></td></tr>
</tbody>
</table>
<h3>What people taking gray-market retatrutide report</h3>
<p>A Penn study published in JAMA Network Open on October 14, 2026 used AI to analyze Reddit posts from people who said they were self-injecting gray-market retatrutide (<a href="https://doi.org/10.1001/jamanetworkopen.2026.38929" target="_blank" rel="noopener">JAMA Network Open</a>; <a href="https://www.engineering.upenn.edu/stories/penn-engineers-use-ai-reddit-to-identify-potential-side-effects-of-unapproved-new-glp-1/" target="_blank" rel="noopener">Penn Engineering</a>). The most commonly reported symptom was increased appetite, the opposite of what the drug is meant to do. Sleep problems, a raised heart rate and muscle-related complaints came up more often than in posts about semaglutide or tirzepatide, while GI complaints came up less often (<a href="https://www.medicaldaily.com/reddit-analysis-online-retatrutide-side-effects-480537" target="_blank" rel="noopener">Medical Daily</a>).</p>
<p>The authors are careful about what this shows. Co-author Lyle Ungar said: "We can't say that retatrutide is causing these symptoms, or even that Reddit users are actually taking genuine retatrutide." That uncertainty is the core problem with gray-market products: you cannot know what is in the vial, how much, or how clean it is.</p>
<h3>The legal way to get a new drug early: a clinical trial</h3>
<ol>
<li>Search <a href="https://clinicaltrials.gov/study/NCT06383390" target="_blank" rel="noopener">ClinicalTrials.gov</a> (the registry that lists trials such as TRIUMPH-Outcomes, NCT06383390) for the drug name or "obesity", and filter by "Recruiting" and your state.</li>
<li>Read the eligibility criteria: BMI range, diabetes status, age and medications that rule you out.</li>
<li>Contact the site listed, and ask whether you could be assigned to placebo, how long the trial lasts and what happens when it ends.</li>
</ol>
<p>Trials can assign you to placebo or a lower dose, and access usually ends with the trial. For a full profile of the drug itself, see our <a href="/retatrutide-weight-loss">retatrutide guide</a>.</p>`,
  },
  {
    heading: "Should you wait for a new drug or start treatment now?",
    body: `<p><strong>For most people who qualify for treatment today, starting an approved drug now beats waiting, because the earliest new option, Lilly's retatrutide, has not yet been submitted to the FDA (Lilly plans to file in Q1 2027) and has no approval date, while people who stop or delay treatment lose proven benefits.</strong> Waiting can make sense if your health risks are low, you cannot afford current options, or you have already tried the approved drugs without success, but it should be a deliberate choice with a review date, not a default.</p>
<h3>What waiting actually means on the calendar</h3>
<ul>
<li><strong>Retatrutide:</strong> On July 23, 2026, Lilly said it plans to submit retatrutide to the FDA in Q1 2027, later than its earlier late-2026 expectation, and repeated that timing on September 29, 2026 (<a href="https://finance.yahoo.com/healthcare/articles/eli-lilly-delays-retatrutide-weight-110921112.html" target="_blank" rel="noopener">Yahoo Finance</a>). Approval would come only after FDA review, and no date has been set. A dispute between Lilly and the FDA over whether retatrutide is a biologic or a drug adds legal uncertainty (<a href="https://www.biospace.com/fda/lilly-fda-retatrutide-biologic-dispute-comes-to-a-head-as-submission-nears" target="_blank" rel="noopener">BioSpace</a>).</li>
<li><strong>CagriSema:</strong> Novo filed in December 2025 and says a US decision is expected in Q4 2026; no FDA decision had been reported as of October 31, 2026 (<a href="https://www.sec.gov/Archives/edgar/data/0000353278/000035327826000023/caq22026.htm" target="_blank" rel="noopener">Novo 6-K</a>; <a href="https://www.ad-hoc-news.de/boerse/news/corporate-news/novo-nordisk-stock-enters-november-with-obesity-data-catalyst/70438435" target="_blank" rel="noopener">news report</a>). In its head-to-head trial, it was not non-inferior to tirzepatide, which is already available as Zepbound.</li>
</ul>
<h3>Start now or wait: scenarios</h3>
<table>
<thead><tr><th>Your situation</th><th>What the evidence says</th><th>Reasonable default</th></tr></thead>
<tbody>
<tr><td>Heart disease plus overweight or obesity</td><td>Wegovy cut major cardiovascular events by 20% in SELECT; retatrutide's heart data are inconclusive so far</td><td>Start now; ask about Wegovy</td></tr>
<tr><td>Prediabetes</td><td>Tirzepatide cut progression to type 2 diabetes by 94% over 176 weeks in a SURMOUNT-1 analysis (1.3% vs 13.3%)</td><td>Start now</td></tr>
<tr><td>Type 2 diabetes</td><td>Retatrutide beat Ozempic 2 mg head-to-head, but is not approved; several approved GLP-1s treat diabetes today</td><td>Start or stay on an approved drug; revisit retatrutide after approval</td></tr>
<tr><td>Already on a GLP-1 and doing well</td><td>Stopping leads to regaining about two-thirds of lost weight within a year</td><td>Do not stop to wait; switching later is possible</td></tr>
<tr><td>Plateaued or side effects on Wegovy</td><td>Zepbound and Wegovy HD exist today; Wegovy HD is for people who tolerated 2.4 mg</td><td>Talk about switching or stepping up now</td></tr>
<tr><td>Medicare, Bridge-eligible</td><td>$50 a month for Wegovy, Zepbound KwikPen or Foundayo through December 31, 2027</td><td>Start now; new drugs are not on the Bridge list</td></tr>
<tr><td>Want a pill</td><td>Wegovy pill and Foundayo are approved, from $149 a month self-pay</td><td>Start now; oral amycretin is still in Phase 3 with no filing timeline</td></tr>
<tr><td>Lower BMI, no weight-related conditions, can't afford self-pay</td><td>Untreated adults gain about 0.5-1.8 lb a year on average</td><td>Waiting with a lifestyle plan and a set review date is reasonable</td></tr>
<tr><td>Tried tirzepatide and semaglutide without enough response</td><td>Retatrutide showed larger average losses in separate trials, but is not approved</td><td>Ask about trials on ClinicalTrials.gov; never buy gray-market</td></tr>
</tbody>
</table>
<p>Sources for the scenarios: <a href="https://www.acc.org/latest-in-cardiology/clinical-trials/2023/11/09/15/04/select" target="_blank" rel="noopener">SELECT</a>; <a href="https://www.healio.com/news/endocrinology/20241016/tirzepatide-cuts-risk-for-progression-to-type-2-diabetes-for-adults-with-prediabetes" target="_blank" rel="noopener">SURMOUNT-1 prediabetes analysis</a>; <a href="https://discovery.ucl.ac.uk/id/eprint/10149199/" target="_blank" rel="noopener">STEP 1 extension</a>; <a href="https://www.medicare.gov/publications/12234-medicare-glp-1-bridge-glp-1-drugs-for-50-a-month.pdf" target="_blank" rel="noopener">Medicare Bridge</a>; <a href="https://www.hcplive.com/view/byu-study-details-concerning-10-year-weight-gain-average-among-us-adults" target="_blank" rel="noopener">BYU weight-gain analysis</a>.</p>
<h3>The cost of waiting, in numbers</h3>
<p>Every figure below is computed only from published data. Weight examples use a person who weighs 250 lb, and the trial averages come from separate trials with different lengths, so treat them as illustrations, not predictions.</p>
<table>
<thead><tr><th>Question</th><th>Inputs</th><th>Result</th></tr></thead>
<tbody>
<tr><td>Minimum wait before retatrutide is even filed</td><td>Today (October 31, 2026) to the end of Lilly's Q1 2027 filing window (March 31, 2027)</td><td>5 months, plus an FDA review with no date set</td></tr>
<tr><td>Average weight gain if untreated for a year</td><td>About 17.6 lb per decade (mid-20s to mid-30s) to 4.6 lb per decade (50s to 60s)</td><td>About 0.5-1.8 lb a year</td></tr>
<tr><td>Average loss on Wegovy 2.4 mg, 250 lb person</td><td>14.9% in STEP 1 (68 weeks)</td><td>About 37 lb</td></tr>
<tr><td>Average loss on Zepbound 15 mg, 250 lb person</td><td>20.9% in SURMOUNT-1 (72 weeks, TRE)</td><td>About 52 lb</td></tr>
<tr><td>Average loss on retatrutide 12 mg, 250 lb person</td><td>25.0% in TRIUMPH-1 (80 weeks, TRE)</td><td>About 63 lb (62.5), roughly 10 lb more than the Zepbound example, from a separate, longer trial</td></tr>
<tr><td>Weight regained after stopping semaglutide</td><td>17.3% lost by week 68, 11.6 points regained a year after stopping (STEP 1 extension)</td><td>About two-thirds regained; net loss 5.6%</td></tr>
<tr><td>Weight regained after stopping tirzepatide</td><td>20.9% lost in a 36-week lead-in; placebo group regained 14.0% by week 88 (SURMOUNT-4)</td><td>Those who continued lost a further 5.5%</td></tr>
<tr><td>Diabetes prevention forgone</td><td>Progression 13.3% on placebo vs 1.3% on tirzepatide over 176 weeks</td><td>12 fewer cases per 100 people with prediabetes</td></tr>
<tr><td>Heart events forgone (established heart disease)</td><td>8.0% on placebo vs 6.5% on semaglutide in SELECT</td><td>1.5 fewer major events per 100 people</td></tr>
</tbody>
</table>
<p>Sources for the cost-of-waiting table: <a href="https://finance.yahoo.com/healthcare/articles/eli-lilly-delays-retatrutide-weight-110921112.html" target="_blank" rel="noopener">Lilly filing plan</a>; <a href="https://www.hcplive.com/view/byu-study-details-concerning-10-year-weight-gain-average-among-us-adults" target="_blank" rel="noopener">BYU analysis via HCPLive</a> (cross-sectional, so per-year figures are approximate); <a href="https://discovery.ucl.ac.uk/10127569/1/nejmoa2032183.pdf" target="_blank" rel="noopener">STEP 1</a>; <a href="https://cm.healio.com/news/endocrinology/20220604/weekly-tirzepatide-confers-substantial-weight-loss-in-obesity-without-diabetes-surmount1" target="_blank" rel="noopener">SURMOUNT-1</a>; <a href="https://www.nejm.org/doi/abs/10.1056/NEJMoa2604169" target="_blank" rel="noopener">TRIUMPH-1</a>; <a href="https://discovery.ucl.ac.uk/id/eprint/10149199/" target="_blank" rel="noopener">STEP 1 extension</a>; <a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/12/09/16/51/surmount-4" target="_blank" rel="noopener">SURMOUNT-4</a>; <a href="https://www.healio.com/news/endocrinology/20241016/tirzepatide-cuts-risk-for-progression-to-type-2-diabetes-for-adults-with-prediabetes" target="_blank" rel="noopener">SURMOUNT-1 prediabetes</a>; <a href="https://www.acc.org/latest-in-cardiology/clinical-trials/2023/11/09/15/04/select" target="_blank" rel="noopener">SELECT</a>.</p>
<h3>What starting now costs for 12 months</h3>
<table>
<thead><tr><th>Option (price as of October 2026)</th><th>Monthly</th><th>12 months</th></tr></thead>
<tbody>
<tr><td>Medicare GLP-1 Bridge, if eligible</td><td>$50</td><td>$600</td></tr>
<tr><td>Compounded semaglutide, embody, month-to-month (regular price)</td><td>$79 ($69 sale)</td><td>$948 at the regular price</td></tr>
<tr><td>Compounded tirzepatide, embody, month-to-month (regular price)</td><td>$129 ($119 sale)</td><td>$1,548 at the regular price</td></tr>
<tr><td>Wegovy pill 9 mg or 25 mg, or Foundayo at maintenance doses refilled on time</td><td>$299</td><td>$3,588</td></tr>
<tr><td>Wegovy pen, any dose</td><td>$349</td><td>$4,188</td></tr>
<tr><td>Wegovy HD 7.2 mg</td><td>$399</td><td>$4,788</td></tr>
<tr><td>Zepbound 7.5-15 mg, refilled within 45 days</td><td>$449</td><td>$5,388</td></tr>
</tbody>
</table>
<p>Brand prices are from <a href="https://www.novocare.com/content/dam/novonordisk/novocare/redesign/pdf/Wegovy_Price_Guide.pdf" target="_blank" rel="noopener">NovoCare</a> and <a href="https://www.lilly.com/lillydirect/zepbound" target="_blank" rel="noopener">LillyDirect</a>; starting doses cost less, and Foundayo's 2.5 mg and 5.5 mg doses are temporarily $149 and $199 through December 31, 2026 (<a href="https://foundayo.lilly.com/hcp/savings-coverage" target="_blank" rel="noopener">Lilly</a>). Compounded prices are from our <a href="/cheapest-glp1">GLP-1 price index</a>, verified October 16, 2026; welludr's Pre-Black Friday sale lists compounded semaglutide from $41 and tirzepatide from $71 a month from October 28, 2026. Compounded drugs are not FDA-approved, and the FDA does not review them for safety, effectiveness or quality before marketing (<a href="https://www.fda.gov/news-events/press-announcements/fda-warns-30-telehealth-companies-against-illegal-marketing-compounded-glp-1s" target="_blank" rel="noopener">FDA</a>).</p>
<h3>How to decide in three steps</h3>
<ol>
<li><strong>Check your risk.</strong> If you have heart disease, prediabetes, type 2 diabetes or other weight-related conditions, the evidence favors starting an approved drug now.</li>
<li><strong>Check your budget.</strong> Price the options above against your coverage.</li>
<li><strong>Set a review date.</strong> Put the next milestones (the CagriSema decision and Lilly's retatrutide filing) in your calendar, and revisit the choice then. Starting now does not lock you out of a new drug later, as the next section shows.</li>
</ol>`,
  },
  {
    heading: "If you start a GLP-1 now, can you switch to a newer drug later?",
    body: `<p><strong>Yes: switching between GLP-1 drugs is common, and trials such as Lilly's ATTAIN-MAINTAIN show that people can move from one drug to another and keep most of their weight loss, while stopping treatment altogether leads to substantial regain.</strong> If retatrutide or another new drug is approved later, starting Wegovy, Zepbound or a GLP-1 pill now does not close that door.</p>
<h3>What the switching trials show</h3>
<table>
<thead><tr><th>Trial</th><th>What happened</th><th>Result</th><th>Source</th></tr></thead>
<tbody>
<tr><td>ATTAIN-MAINTAIN (52 weeks)</td><td>People who completed 72 weeks of Wegovy or Zepbound in SURMOUNT-5 were re-randomized to Foundayo (orforglipron) or placebo</td><td>People who switched kept all but about 0.9 kg (from Wegovy) / 5.0 kg (from Zepbound) of their earlier weight loss at week 52, per Lilly (efficacy estimand)</td><td><a href="https://investor.lilly.com/news-releases/news-release-details/lillys-orforglipron-helped-people-maintain-weight-loss-after" target="_blank" rel="noopener">Lilly</a></td></tr>
<tr><td>SURMOUNT-MAINTAIN (52 weeks after a 60-week lead-in)</td><td>378 people on maximum tolerated tirzepatide continued that dose, stepped down to 5 mg, or switched to placebo</td><td>At week 112: 22.4% (continued), 17.0% (5 mg, about 70% of loss kept), 10.1% (placebo)</td><td><a href="https://www.thelancet.com/article/S0140-6736(26)00656-2/abstract" target="_blank" rel="noopener">The Lancet</a></td></tr>
<tr><td>SURMOUNT-4 (to week 88)</td><td>After a 36-week tirzepatide lead-in, people continued or switched to placebo</td><td>Placebo group regained 14.0%; 89.5% of those who continued kept at least 80% of their loss vs 16.6% on placebo</td><td><a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/12/09/16/51/surmount-4" target="_blank" rel="noopener">ACC</a></td></tr>
<tr><td>VK2735 maintenance (Viking, about 180 adults)</td><td>21 weeks of weekly dosing, then 12 weeks of every-other-week or monthly maintenance</td><td>Most of the weight loss kept on maintenance dosing vs 61% kept on placebo (topline, September 22, 2026)</td><td><a href="https://ir.vikingtherapeutics.com/2026-09-22-Viking-Therapeutics-Announces-Positive-Topline-Results-from-Maintenance-Study-of-GLP-1-GIP-Agonist-VK2735-Demonstrating-the-Promise-of-Multiple-Maintenance-Dosing-Regimens" target="_blank" rel="noopener">Viking</a></td></tr>
</tbody>
</table>
<p>Stepping down also matters. In SURMOUNT-MAINTAIN, rescue therapy for people who regained at least half of their lost weight was used by 8% on the continued dose, 25% on 5 mg and 67% on placebo (<a href="https://pubmed.ncbi.nlm.nih.gov/42119587/" target="_blank" rel="noopener">PubMed</a>).</p>
<h3>New-drug trials are already testing switches</h3>
<p>Amgen's MARITIME-SWITCH trial is testing a move from weekly tirzepatide or semaglutide to MariTide every 8 weeks or every quarter (<a href="https://www.sec.gov/Archives/edgar/data/0000318154/000031815426000124/amgn-20260630earningsrelea.htm" target="_blank" rel="noopener">Amgen 8-K</a>). No switching results have been published for retatrutide or CagriSema as of October 31, 2026, so how a switch to them would work is not yet known.</p>
<h3>What a switch usually involves</h3>
<ul>
<li><strong>Re-titration.</strong> Many drugs start low and step up to limit nausea, so expect some weeks before you reach a full dose.</li>
<li><strong>Coverage checks.</strong> A new drug may need a new prior authorization, or may not be covered at first.</li>
<li><strong>Avoid stopping to "wash out".</strong> One year after stopping semaglutide in the STEP 1 extension, people had regained about two-thirds of the weight they lost, and most cardiometabolic improvements reverted toward baseline (<a href="https://discovery.ucl.ac.uk/id/eprint/10149199/" target="_blank" rel="noopener">STEP 1 extension</a>).</li>
</ul>
<p>For what happens to weight, appetite and health markers when people stop, see <a href="/articles/stopping-glp1-medication-what-happens">what happens when you stop a GLP-1</a>.</p>`,
  },
  {
    heading: "Which current drug is closest to what the new drugs offer?",
    body: `<p><strong>For the largest average weight loss available today, Zepbound (tirzepatide) is the closest approved option to the new drugs, with 20.9% at 72 weeks in SURMOUNT-1; for a pill, the Wegovy pill and Foundayo are already approved; and for a lower price, the cheapest approved options are pill starting doses at $149 a month.</strong> No approved drug yet adds glucagon or amylin activity, offers monthly dosing, or protects muscle in a proven way.</p>
<table>
<thead><tr><th>What the new drugs promise</th><th>Closest approved option (October 2026)</th><th>How close it gets</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Maximum weight loss (retatrutide, CagriSema)</td><td>Zepbound 15 mg</td><td>20.9% at 72 weeks (TRE); beat CagriSema in REDEFINE 4 (23.6% vs 20.2%, TRE)</td><td><a href="https://cm.healio.com/news/endocrinology/20220604/weekly-tirzepatide-confers-substantial-weight-loss-in-obesity-without-diabetes-surmount1" target="_blank" rel="noopener">Healio</a>; <a href="https://www.drugtopics.com/view/cagrisema-did-not-meet-primary-end-point-of-noninferiority-to-tirzepatide" target="_blank" rel="noopener">Drug Topics</a></td></tr>
<tr><td>More weight loss while staying on semaglutide</td><td>Wegovy HD 7.2 mg</td><td>18.7% vs 15.6% on 2.4 mg in STEP UP; only for people who tolerated 2.4 mg</td><td><a href="https://www.thelancet.com/journals/landia/article/PIIS2213-8587(25)00226-8/abstract" target="_blank" rel="noopener">Lancet D&amp;E</a></td></tr>
<tr><td>A pill (oral amycretin, aleniglipron, CT-996)</td><td>Wegovy pill 25 mg; Foundayo</td><td>13.6% at 64 weeks (OASIS 4, treatment-policy); 11.2% at 72 weeks on 36 mg (ATTAIN-1, TRE)</td><td><a href="https://www.medscape.com/viewarticle/fda-okays-oral-semaglutide-25-mg-weight-management-2025a100104g" target="_blank" rel="noopener">Medscape</a>; <a href="https://mediacenteratypon.nejmgroup-production.org/NEJMoa2511774.pdf" target="_blank" rel="noopener">NEJM</a></td></tr>
<tr><td>A pill with no food or water rules</td><td>Foundayo</td><td>The only GLP-1 pill that can be taken any time of day without food or water restrictions</td><td><a href="https://www.cnbc.com/2026/04/01/eli-lilly-glp-1-pill-foundayo-approved-for-obesity.html" target="_blank" rel="noopener">CNBC</a></td></tr>
<tr><td>Proven heart protection</td><td>Wegovy</td><td>20% fewer major cardiovascular events in SELECT; no new drug has outcome results yet</td><td><a href="https://www.acc.org/latest-in-cardiology/clinical-trials/2023/11/09/15/04/select" target="_blank" rel="noopener">ACC</a></td></tr>
<tr><td>Monthly dosing (MariTide)</td><td>None; all approved GLP-1s are weekly injections or daily pills</td><td>No approved alternative</td><td><a href="https://www.sec.gov/Archives/edgar/data/0000318154/000031815426000124/amgn-20260630earningsrelea.htm" target="_blank" rel="noopener">Amgen 8-K</a></td></tr>
<tr><td>Muscle protection (bimagrumab)</td><td>None approved</td><td>BELIEVE: lean mass fell 2.9% on the combination vs 7.4% on semaglutide alone (investigational)</td><td><a href="https://www.hcplive.com/view/believe-bimagrumab-semaglutide-combo-yields-substantial-fat-mass-weight-loss-preserves-lean-mass" target="_blank" rel="noopener">HCPLive</a></td></tr>
<tr><td>Lower cost</td><td>Wegovy pill 1.5 mg or Foundayo starting doses; compounded options</td><td>$149 a month for pill starting doses; compounded semaglutide from $41 a month during welludr's Pre-Black Friday sale (from October 28, 2026)</td><td><a href="https://www.cnn.com/2026/01/06/health/wegovy-pill-weight-loss-explained" target="_blank" rel="noopener">CNN</a>; Top Weight Loss price index</td></tr>
</tbody>
</table>
<h3>Caveats on the cheaper route</h3>
<p>Compounded semaglutide and tirzepatide are not FDA-approved and are not generic versions of Wegovy or Zepbound. Since the drug shortages ended, the FDA has warned 30 telehealth companies over misleading claims about compounded GLP-1s (<a href="https://www.fda.gov/news-events/press-announcements/fda-warns-30-telehealth-companies-against-illegal-marketing-compounded-glp-1s" target="_blank" rel="noopener">FDA</a>), and on April 30, 2026 it proposed excluding semaglutide, tirzepatide and liraglutide from the 503B bulks list (<a href="https://www.fda.gov/news-events/press-announcements/fda-proposes-exclude-semaglutide-tirzepatide-and-liraglutide-503b-bulks-list" target="_blank" rel="noopener">FDA</a>). Compounded versions of the new drugs do not exist legally: retatrutide cannot be compounded at all.</p>
<h3>Who each option is not for</h3>
<ul>
<li><strong>Zepbound</strong> is not the right first choice if your plan covers only Wegovy, or if you need the heart-outcome evidence that SELECT gives semaglutide.</li>
<li><strong>Wegovy HD</strong> is not a starting dose; it is for people who have tolerated 2.4 mg and need more weight reduction.</li>
</ul>
<p>For the full head-to-head between today's two leading molecules, read <a href="/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide</a>, and for our ranking across goals and budgets, see the <a href="/articles/best-glp1-for-weight-loss">best GLP-1 for weight loss</a>.</p>`,
  },
  {
    heading: "What questions should you ask your clinician about new weight loss drugs?",
    body: `<p><strong>Ask your clinician whether an approved drug fits your goals now, what you would gain or lose by waiting for retatrutide or CagriSema, and how you would switch later if a new drug is approved.</strong> Bring your weight history, current medicines, insurance details and any side effects you had on earlier GLP-1s.</p>
<h3>Questions about starting or waiting</h3>
<ol>
<li>Given my health conditions, is there a medical reason to start now rather than wait?</li>
<li>Do I qualify for a drug with outcome evidence, such as Wegovy for heart risk reduction (<a href="https://www.acc.org/latest-in-cardiology/clinical-trials/2023/11/09/15/04/select" target="_blank" rel="noopener">SELECT</a>)?</li>
<li>If I wait, what should I do in the meantime, and when should we review the decision?</li>
<li>Which of the new drugs, if any, would be a realistic fit for me, given my diabetes status and other conditions?</li>
</ol>
<h3>Questions about the new drugs themselves</h3>
<ol>
<li>Are the trial results I have read efficacy-estimand or treatment-regimen figures, and from people with or without diabetes?</li>
<li>What are the known side effects, such as dysesthesia with retatrutide, and what would make me a poor candidate?</li>
<li>Is there a clinical trial I could join, and what are the chances of getting placebo?</li>
<li>If I see retatrutide sold online, what are the risks of an unapproved product? (Lilly says no one can legally sell it for human use: <a href="https://www.lilly.com/news/stories/what-to-know-about-retatrutide" target="_blank" rel="noopener">Lilly</a>.)</li>
</ol>
<h3>Questions about cost, coverage and switching</h3>
<ol>
<li>Does my plan cover any GLP-1 for weight loss, and what prior authorization does it need?</li>
<li>If I am on Medicare, do I meet the GLP-1 Bridge criteria for the $50 copay (<a href="https://www.cms.gov/files/document/glp-1-prescribers-c-1.pdf" target="_blank" rel="noopener">CMS</a>)?</li>
<li>Which self-pay option is cheapest at the dose I am likely to need, not just the starting dose?</li>
<li>If a new drug is approved, how would we switch, and would I need to re-titrate?</li>
<li>If I need to cut costs later, would stepping down to a lower dose be safer than stopping? (In SURMOUNT-MAINTAIN, stepping down to tirzepatide 5 mg kept about 70% of the loss: <a href="https://www.thelancet.com/article/S0140-6736(26)00656-2/abstract" target="_blank" rel="noopener">The Lancet</a>.)</li>
</ol>
`,
  },
  {
    heading: "What do doctors and analysts expect from the obesity drug pipeline?",
    body: `<p><strong>Doctors are paying most attention to Lilly's retatrutide: in a Spherix Global Insights survey released October 28, 2026, retatrutide's TRIUMPH-2 results were the most widely recognized pipeline development, and about three in four physicians aware of the Phase 3 data said it would strongly affect their likelihood of prescribing it if approved.</strong> Awareness of other news, including developments involving approved drugs, was low.</p>
<h3>What the Spherix survey found</h3>
<table>
<thead><tr><th>Finding (53 primary care physicians and 49 endocrinologists, October 2026)</th><th>Primary care</th><th>Endocrinologists</th></tr></thead>
<tbody>
<tr><td>Recognized Lilly's TRIUMPH-2 retatrutide results when prompted</td><td>About 32%</td><td>About 49%</td></tr>
<tr><td>Among those aware of Phase 3 retatrutide data, say it would strongly affect their likelihood of prescribing if approved</td><td>76%</td><td>75%</td></tr>
<tr><td>Could recall, unprompted, a recent development involving an approved obesity drug</td><td>Fewer than 15%</td><td>Fewer than 15%</td></tr>
</tbody>
</table>
<p>Source: <a href="https://www.globenewswire.com/news-release/2026/10/28/3390282/0/en/retatrutide-leads-obesity-pipeline-recall-amid-limited-physician-awareness-of-other-treatment-news-spherix-global-insights-finds.html" target="_blank" rel="noopener">Spherix Global Insights via GlobeNewswire</a>. CagriSema ranked second to retatrutide in unaided pipeline recall and is gaining visibility among endocrinologists (<a href="https://www.manilatimes.net/2026/10/28/tmt-newswire/globenewswire/retatrutide-leads-obesity-pipeline-recall-amid-limited-physician-awareness-of-other-treatment-news-spherix-global-insights-finds/2456278" target="_blank" rel="noopener">Spherix release</a>). Spherix itself cautions against comparing figures across different evidence packages. Your clinician may not have seen the latest trial news, so bring the trial name and date.</p>
<h3>What the market numbers show</h3>
<ul>
<li><strong>Demand for approved drugs keeps growing.</strong> Lilly reported third-quarter 2026 revenue of $24.4 billion, up 39%, with Mounjaro plus Zepbound over $16 billion, and raised full-year guidance to $91-92 billion (<a href="https://www.sec.gov/Archives/edgar/data/0000059478/000005947826000104/q326lillysalesandearningsp.htm" target="_blank" rel="noopener">Lilly 8-K</a>).</li>
<li><strong>Pills are catching on.</strong> Foundayo's US sales were $184 million in Q3 2026, up from $98 million in Q2, and Lilly said about 4 in 10 US patients starting an oral obesity drug chose Foundayo (<a href="https://www.cnbc.com/2026/10/29/eli-lilly-lly-earnings-q3-2026.html" target="_blank" rel="noopener">CNBC</a>).</li>
<li><strong>Big companies are still buying in.</strong> Pfizer completed its acquisition of Metsera on November 13, 2025, for about $7.0 billion in enterprise value, up to about $10 billion with contingent payments, one of which depends on FDA approval of MET-097i by December 31, 2029 (<a href="https://www.pfizer.com/news/press-release/press-release-detail/pfizer-completes-acquisition-metsera" target="_blank" rel="noopener">Pfizer</a>).</li>
</ul>
<h3>Where commentators see trade-offs</h3>
<p>Trade press coverage has focused on tolerability and heart data as much as on weight loss. Fierce Biotech headlined TRIUMPH-4 as a Phase 3 that "proves intolerable", citing dropout of up to 18.2% at 12 mg (<a href="https://www.fiercebiotech.com/biotech/eli-lillys-obesity-triple-threat-smashes-efficacy-expectations-phase-3-proves-intolerable" target="_blank" rel="noopener">Fierce Biotech</a>), and said retatrutide's "cardio risk impact disappoints" after TRIUMPH-3 (<a href="https://www.fiercebiotech.com/biotech/lillys-triple-g-drug-hits-226-weight-loss-cardio-risk-impact-disappoints" target="_blank" rel="noopener">Fierce Biotech</a>). CagriSema's 22.7% efficacy result in REDEFINE 1 fell short of Novo's earlier expectation of at least 25% (<a href="https://www.pharmexec.com/view/novo-nordisk-cagrisema-falls-short-25-weight-loss-target-patients-obesity-overweight" target="_blank" rel="noopener">PharmExec</a>).</p>`,
  },
  {
    heading: "Key dates to watch in the next 12 months",
    body: `<p><strong>The next big dates are Novo Nordisk's nine-month results on November 4, 2026, an expected US decision on CagriSema in Q4 2026, and Lilly's planned FDA submission of retatrutide in Q1 2027.</strong> Every date below is a company or government statement, dated and sourced; none is a prediction of approval.</p>
<table>
<thead><tr><th>When</th><th>What to watch</th><th>Who said so</th><th>Source</th></tr></thead>
<tbody>
<tr><td>November 4, 2026</td><td>Novo Nordisk nine-month results, a likely update on CagriSema</td><td>News report, late October 2026</td><td><a href="https://www.ad-hoc-news.de/boerse/news/corporate-news/novo-nordisk-stock-enters-november-with-obesity-data-catalyst/70438435" target="_blank" rel="noopener">report</a></td></tr>
<tr><td>Q4 2026</td><td>US decision on CagriSema for obesity expected</td><td>Novo Nordisk, Q2 2026 materials</td><td><a href="https://www.sec.gov/Archives/edgar/data/0000353278/000035327826000023/caq22026.htm" target="_blank" rel="noopener">Novo 6-K</a></td></tr>
<tr><td>Q4 2026</td><td>FDA action expected on orforglipron for type 2 diabetes</td><td>Lilly, October 29, 2026 call</td><td><a href="https://investor.lilly.com/news-releases/news-release-details/lilly-reports-third-quarter-2026-financial-results-raises-full" target="_blank" rel="noopener">Lilly</a></td></tr>
<tr><td>Q4 2026</td><td>Phase 3 start for the VK2735 pill expected</td><td>Viking, July 29, 2026</td><td><a href="https://ir.vikingtherapeutics.com/2026-07-29-Viking-Therapeutics-Reports-Second-Quarter-2026-Financial-Results-and-Provides-Corporate-Update" target="_blank" rel="noopener">Viking</a></td></tr>
<tr><td>December 31, 2026</td><td>Foundayo's temporary $149 (2.5 mg) and $199 (5.5 mg) self-pay prices end</td><td>Lilly</td><td><a href="https://foundayo.lilly.com/hcp/savings-coverage" target="_blank" rel="noopener">Lilly</a></td></tr>
<tr><td>December 31, 2026</td><td>Wegovy pen $199 introductory offer for new self-pay patients ends</td><td>NovoCare</td><td><a href="https://www.novocare.com/patient/medicines/wegovy/savings-offer.html" target="_blank" rel="noopener">NovoCare</a></td></tr>
<tr><td>January 1, 2027</td><td>Wegovy, Ozempic and Rybelsus list price drops to $675 a month (self-pay prices unchanged)</td><td>Novo Nordisk, February 24, 2026</td><td><a href="https://www.prnewswire.com/news-releases/novo-nordisk-announces-significant-reduction-in-us-list-price-for-wegovy-ozempic-and-rybelsus-semaglutide-medicines-building-on-continued-efforts-to-expand-access-302695705.html" target="_blank" rel="noopener">Novo Nordisk</a></td></tr>
<tr><td>January 1, 2027</td><td>Medicare negotiated price of $274 for semaglutide takes effect (what Medicare pays, not your copay)</td><td>CMS, November 25, 2025</td><td><a href="https://www.biopharmadive.com/news/medicare-price-negotiation-wegovy-ozempic-trelegy-2027/806526/" target="_blank" rel="noopener">BioPharma Dive</a></td></tr>
<tr><td>Q1 2027</td><td>Lilly plans to submit retatrutide to the FDA for obesity, knee osteoarthritis pain and sleep apnea</td><td>Lilly, July 23 and September 29, 2026</td><td><a href="https://finance.yahoo.com/healthcare/articles/eli-lilly-delays-retatrutide-weight-110921112.html" target="_blank" rel="noopener">Yahoo Finance</a></td></tr>
<tr><td>2027</td><td>VK2735 oral maintenance (Part 2) data due</td><td>Viking, September 22, 2026</td><td><a href="https://ir.vikingtherapeutics.com/2026-09-22-Viking-Therapeutics-Announces-Positive-Topline-Results-from-Maintenance-Study-of-GLP-1-GIP-Agonist-VK2735-Demonstrating-the-Promise-of-Multiple-Maintenance-Dosing-Regimens" target="_blank" rel="noopener">Viking</a></td></tr>
<tr><td>December 31, 2027</td><td>Medicare GLP-1 Bridge scheduled to end</td><td>CMS</td><td><a href="https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge" target="_blank" rel="noopener">CMS</a></td></tr>
</tbody>
</table>
<h3>Dates nobody has announced</h3>
<ul>
<li><strong>Retatrutide approval:</strong> no date. Approval would follow FDA review of a filing that Lilly has not yet made.</li>
<li><strong>MariTide Phase 3 results:</strong> no readout date found; MARITIME-1 and MARITIME-2 were still ongoing in Amgen's Q2 2026 report (<a href="https://www.sec.gov/Archives/edgar/data/0000318154/000031815426000124/amgn-20260630earningsrelea.htm" target="_blank" rel="noopener">Amgen 8-K</a>).</li>
<li><strong>Amycretin filing:</strong> no timeline given; the AMAZE Phase 3 program started in early 2026 (<a href="https://www.sec.gov/Archives/edgar/data/353278/000117184326000996/f6k_022326.htm" target="_blank" rel="noopener">Novo 6-K</a>).</li>
</ul>`,
  },
  {
    heading: "Sources and how we researched this guide",
    body: `<p><strong>This guide was researched and fact-checked as of October 31, 2026, using company releases, regulatory filings, peer-reviewed journals, FDA and CMS documents, and major news outlets.</strong> Every number in the article links to its source where it appears.</p>
<h3>How we built it</h3>
<ul>
<li><strong>Primary sources first.</strong> We relied on Lilly, Novo Nordisk, Amgen, Roche, Boehringer Ingelheim, Zealand, Viking and Structure releases; SEC filings; NEJM, The Lancet and other journals; and FDA, CMS and Medicare.gov documents. Where we could only reach a news or trade summary of a primary source, we cite that summary.</li>
<li><strong>Confidence checks.</strong> We graded each fact by source quality and left out anything we could not verify, including third-party price forecasts for unapproved drugs and figures where sources disagreed without explanation.</li>
<li><strong>Estimands labeled.</strong> Where a trial reports both an efficacy-estimand and a treatment-regimen result, we say which one we quote, and we never present results from separate trials as a head-to-head comparison.</li>
<li><strong>No predicted approval dates.</strong> We report only the timelines companies and regulators have stated, with the date they stated them.</li>
<li><strong>Dated prices.</strong> Brand-name prices come from manufacturer and pharmacy pages as of fall 2026. Compounded prices come from our own price index, verified October 16, 2026, with sale prices noted by their start date. Prices change often, so confirm them before you buy.</li>
</ul>
<h3>Important notes</h3>
<p>Retatrutide, CagriSema, amycretin, MariTide, survodutide and the other investigational drugs in this guide are not FDA-approved and cannot be legally prescribed outside a clinical trial. Compounded GLP-1s are not FDA-approved and are not generic drugs.</p>
<p>Top Weight Loss is an independent comparison site. We earn fees from some of the providers listed on our site, which does not change the facts reported here. Our guide is educational and is not medical advice. Talk to a licensed clinician before starting, stopping or switching any medication.</p>
<!--SOURCES-->`,
  },
];
