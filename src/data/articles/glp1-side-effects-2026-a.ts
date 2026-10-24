import type { Article } from "../articles";

export const sideEffectsSectionsA: Article["sections"] = [
  {
    heading: "What are the side effects of GLP-1 weight loss drugs?",
    body: `<p>The most common side effects of GLP-1 weight loss drugs such as Wegovy (semaglutide) and Zepbound (tirzepatide) are digestive: nausea, diarrhea, vomiting and constipation. Less common but more serious risks include gallbladder disease, pancreatitis, severe stomach and bowel problems and, very rarely for semaglutide, a type of sudden vision loss called NAION.</p>
<p>That short answer hides a lot of nuance, so it helps to sort the risks into tiers. The tiers below come from the FDA prescribing information for <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy</a> and <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound</a>, from European regulators and from peer-reviewed research. As <a href="https://www.technologyreview.com/2026/10/09/1146094/were-still-figuring-out-the-side-effects-of-glp-1-weight-loss-drugs/" target="_blank" rel="noopener">MIT Technology Review put it in October 2026</a>, researchers are still figuring out the full side effect picture, so the last tier is genuinely open.</p>
<h3>Tier 1: very common, usually manageable</h3>
<ul>
<li><strong>Nausea, diarrhea, vomiting and constipation.</strong> In the Wegovy trials, 73% of people on the drug reported a gastrointestinal reaction, compared with 47% on placebo, according to the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a>. These effects tend to be most common while the dose is being stepped up.</li>
</ul>
<h3>Tier 2: uncommon but serious</h3>
<ul>
<li><strong>Gallstones and acute gallbladder disease</strong>, listed in the warnings on both the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy</a> and <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound</a> labels.</li>
<li><strong>Acute pancreatitis</strong>, rare in trials but serious enough that the Wegovy label says to stop the drug promptly if it is suspected.</li>
<li><strong>Severe gastrointestinal problems</strong>, including ileus (a stalled bowel), which the FDA added to the Ozempic label in 2023, as reported by <a href="https://www.mdedge.com/fedprac/article/265903/obesity/glp-1-agonists-linked-higher-risk-rare-serious-gi-complications" target="_blank" rel="noopener">Federal Practitioner</a>.</li>
<li><strong>Pulmonary aspiration during anesthesia</strong>, added to GLP-1 labels in November 2024 after rare reports, according to <a href="https://www.medscape.com/viewarticle/fda-updates-glp-1-label-pulmonary-aspiration-warning-2024a1000k84" target="_blank" rel="noopener">Medscape</a>.</li>
</ul>
<h3>Tier 3: very rare</h3>
<ul>
<li><strong>NAION</strong>, an optic nerve condition that can cause sudden vision loss. The <a href="https://www.ema.europa.eu/en/news/prac-concludes-eye-condition-naion-very-rare-side-effect-semaglutide-medicines-ozempic-rybelsus-wegovy" target="_blank" rel="noopener">European Medicines Agency</a> classifies it as a very rare side effect of semaglutide, affecting up to 1 in 10,000 people.</li>
</ul>
<h3>Tier 4: open questions</h3>
<ul>
<li><strong>Thyroid cancer</strong>: tumors appeared in rodents, but whether that happens in humans is unknown, and large human studies are mostly reassuring.</li>
<li><strong>Depression and suicidal thoughts</strong>: regulator reviews have not found a causal link, and in January 2026 the FDA asked for the warning to be removed from weight-loss GLP-1 labels.</li>
<li><strong>Hair loss and nail problems</strong>: under investigation, with limited evidence so far, per <a href="https://www.technologyreview.com/2026/10/09/1146094/were-still-figuring-out-the-side-effects-of-glp-1-weight-loss-drugs/" target="_blank" rel="noopener">MIT Technology Review</a>.</li>
</ul>
<h3>Summary table</h3>
<table>
<tr><th>Side effect</th><th>How common</th><th>Source</th></tr>
<tr><td>Nausea</td><td>44% on Wegovy vs 16% placebo; 25% to 29% on Zepbound vs 8% placebo</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a>, <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound label</a></td></tr>
<tr><td>Diarrhea</td><td>30% on Wegovy vs 16% placebo</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a></td></tr>
<tr><td>Vomiting</td><td>24% on Wegovy vs 6% placebo; 8% to 13% on Zepbound vs 2% placebo</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a>, <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound label</a></td></tr>
<tr><td>Constipation</td><td>24% on Wegovy vs 11% placebo</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a></td></tr>
<tr><td>Severe GI reactions</td><td>4.1% on Wegovy vs 0.9% placebo</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a></td></tr>
<tr><td>Gallstones (cholelithiasis)</td><td>1.6% on Wegovy injection vs 0.7% placebo; 1.1% on Zepbound</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy label</a>, <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound label</a></td></tr>
<tr><td>Acute pancreatitis</td><td>0.2 cases per 100 patient-years on Wegovy vs under 0.1 on placebo</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy label</a></td></tr>
<tr><td>Hair loss</td><td>3% on Wegovy vs 1% placebo</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a></td></tr>
<tr><td>NAION (semaglutide)</td><td>Very rare: up to 1 in 10,000 people</td><td><a href="https://www.ema.europa.eu/en/news/prac-concludes-eye-condition-naion-very-rare-side-effect-semaglutide-medicines-ozempic-rybelsus-wegovy" target="_blank" rel="noopener">EMA</a></td></tr>
<tr><td>Pulmonary aspiration under anesthesia</td><td>Rare postmarketing reports</td><td><a href="https://www.medscape.com/viewarticle/fda-updates-glp-1-label-pulmonary-aspiration-warning-2024a1000k84" target="_blank" rel="noopener">Medscape</a></td></tr>
<tr><td>Thyroid C-cell tumors</td><td>Seen in rodents; unknown in humans</td><td><a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound label</a></td></tr>
</table>
<p>For most people, the practical story is the first tier: stomach symptoms that are unpleasant, usually temporary and often manageable. The rest of this guide walks through each tier in order, with the numbers, the quality of the evidence behind them and what you can do. If you take semaglutide specifically, our <a href="/articles/semaglutide-side-effects-guide">semaglutide side effects guide</a> goes deeper on that one drug.</p>`,
  },
  {
    heading: "Why are GLP-1 side effects in the news in October 2026?",
    body: `<p>GLP-1 side effects are in the news in October 2026 because several major reports landed within two weeks of each other: an MIT Technology Review overview of what is still unknown, NPR investigations into lawsuits and the limits of FDA safety data, a University of Pennsylvania study of side effects reported for the unapproved drug retatrutide, and new menopause research. At the same time, more Americans than ever are taking these drugs.</p>
<h3>More people, more side effect reports</h3>
<p>Scale is the backdrop. An October 2026 update from <a href="https://www.aon.com/risk-services/professional-services/october-2026-update-weight-loss-drugs-a-point-of-view-for-professional-service-firms-in-the-us-uk-and-canada" target="_blank" rel="noopener">Aon</a>, citing Gallup, reports that about 11% of US adults said they were currently taking a GLP-1 for weight loss, up from about 3% in 2024. Research from EY-Parthenon reported by <a href="https://www.cbsnews.com/news/glp-1-weight-loss-drug-diabetes-consumption-habits/" target="_blank" rel="noopener">CBS News</a> found that about 54% of semaglutide users take it mainly for weight loss rather than diabetes. The same Aon update notes that a Medicare "GLP-1 Bridge" pilot, running from July 1, 2026, gives eligible beneficiaries access to covered weight-loss GLP-1s for a $50 monthly copay through the end of 2027. When millions of people use a drug, even a rare side effect will show up in thousands of people.</p>
<h3>What still is not known</h3>
<p>On October 9, <a href="https://www.technologyreview.com/2026/10/09/1146094/were-still-figuring-out-the-side-effects-of-glp-1-weight-loss-drugs/" target="_blank" rel="noopener">MIT Technology Review</a> laid out the state of the evidence: the most common side effects are gastrointestinal, the drugs have also been linked to pancreatitis and gallstone disease, research on optic nerve damage is mixed, and hair loss and nail disorders are being investigated with limited evidence so far. The article also noted that dozens of patients are suing Novo Nordisk and Eli Lilly over sudden vision loss, which the companies dispute.</p>
<h3>Lawsuits and the limits of FDA data</h3>
<p>On October 7, <a href="https://www.npr.org/2026/10/07/nx-s1-5850256/some-who-take-glp-1s-are-suffering-serious-side-effects-but-its-unclear-how-often" target="_blank" rel="noopener">NPR</a> reported that some people taking GLP-1s are suffering serious side effects but that it is unclear how often. Two major consolidated lawsuits involve 247 plaintiffs with NAION and more than 4,000 with serious digestive conditions such as pancreatitis or gallstones. NPR also explained a key limitation: the FDA Adverse Event Reporting System (FAERS) is mostly voluntary and unverified, so it cannot tell anyone how often a harm actually happens. Novo Nordisk told NPR that NAION and other serious conditions were exceedingly rare in its trials. NPR returned to the vision-loss question in a <a href="https://www.npr.org/2026/10/10/nx-s1-5996652/glp1-fda-naion-blind-lawsuit-ozempic" target="_blank" rel="noopener">follow-up on October 10</a>.</p>
<h3>Retatrutide and the gray market</h3>
<p>On October 21, the <a href="https://www.engineering.upenn.edu/stories/penn-engineers-use-ai-reddit-to-identify-potential-side-effects-of-unapproved-new-glp-1/" target="_blank" rel="noopener">University of Pennsylvania</a> announced a study, published in JAMA Network Open, that used AI to analyze about 150,000 Reddit posts and comments from roughly 40,000 users discussing retatrutide, an investigational drug that is not approved. The findings are hypothesis-generating because researchers cannot verify what people actually took. We cover that study, and the wider risks of unapproved products, later in this guide.</p>
<h3>Menopause research</h3>
<p>At The Menopause Society's annual meeting in San Diego (October 20 to 24, 2026), a retrospective Mayo Clinic study reported that women on menopause hormone therapy lost more weight on semaglutide than women not on hormone therapy, according to <a href="https://menopause.org/press-releases/hormone-therapy-may-increase-weight-loss-effectiveness-of-glp-1s" target="_blank" rel="noopener">The Menopause Society</a>. The study is not yet peer reviewed.</p>
<p>None of this news means GLP-1 drugs suddenly became more dangerous. It means the evidence is maturing as use grows, and that you deserve a clear, honest read of what the numbers do and do not show.</p>`,
  },
  {
    heading: "How common are nausea, vomiting, diarrhea and constipation on GLP-1s?",
    body: `<p>Nausea, vomiting, diarrhea and constipation are very common on GLP-1 drugs: in the Wegovy trials, 44% of people on semaglutide had nausea, 30% diarrhea, 24% vomiting and 24% constipation. On Zepbound (tirzepatide), 25% to 29% had nausea depending on dose. Placebo groups also reported these symptoms, at lower rates.</p>
<p>The fairest way to read these numbers is to compare the drug group with the placebo group. Some people get nausea or constipation whether they take a drug or not, so the gap between the two columns is the part you can reasonably attribute to the medication.</p>
<h3>Wegovy (semaglutide 2.4 mg) trial data</h3>
<p>The figures below come from pooled STEP trials in adults, as published in the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">FDA prescribing information for Wegovy</a>.</p>
<table>
<tr><th>Side effect</th><th>Wegovy</th><th>Placebo</th></tr>
<tr><td>Nausea</td><td>44%</td><td>16%</td></tr>
<tr><td>Diarrhea</td><td>30%</td><td>16%</td></tr>
<tr><td>Vomiting</td><td>24%</td><td>6%</td></tr>
<tr><td>Constipation</td><td>24%</td><td>11%</td></tr>
<tr><td>Any gastrointestinal reaction</td><td>73%</td><td>47%</td></tr>
<tr><td>Severe gastrointestinal reaction</td><td>4.1%</td><td>0.9%</td></tr>
</table>
<p>Two things stand out. First, nausea is the signature side effect: nearly three times as common as on placebo. Second, almost half of the placebo group reported some gastrointestinal symptom, a reminder that digestive complaints are common in everyday life and in trial populations.</p>
<h3>Zepbound (tirzepatide) trial data</h3>
<p>The <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound prescribing information</a> reports nausea and vomiting by maintenance dose.</p>
<table>
<tr><th>Side effect</th><th>Zepbound 5 mg</th><th>Zepbound 10 mg</th><th>Zepbound 15 mg</th><th>Placebo</th></tr>
<tr><td>Nausea</td><td>25%</td><td>29%</td><td>28%</td><td>8%</td></tr>
<tr><td>Vomiting</td><td colspan="3">8% to 13% across doses</td><td>2%</td></tr>
</table>
<h3>Can you compare Wegovy and Zepbound directly?</h3>
<p>Not cleanly. The numbers come from separate trial programs with different participants, designs and placebo rates, so a side-by-side glance can mislead. Notice, for instance, that the placebo nausea rate was 16% in the Wegovy trials and 8% in the Zepbound trials. That difference reflects how the trials were run and who was in them, not anything about a sugar pill. If you are deciding between the two drugs, our <a href="/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide comparison</a> walks through efficacy and tolerability together.</p>
<h3>What the numbers mean for you</h3>
<ul>
<li><strong>Expect some stomach symptoms.</strong> Most people on these drugs notice at least one digestive change.</li>
<li><strong>Most cases are not severe.</strong> Severe gastrointestinal reactions affected 4.1% of people on Wegovy in the label data, per the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a>.</li>
<li><strong>Your experience is not predetermined.</strong> Trial averages describe groups. Your own response depends on your dose schedule, eating patterns and individual sensitivity.</li>
</ul>
<p>The next two sections explain why these drugs upset the stomach, how long the effects usually last and what you can do to make them easier to live with.</p>`,
  },
  {
    heading: "Why do GLP-1 drugs cause stomach side effects, and how long do they last?",
    body: `<p>GLP-1 drugs cause stomach side effects mainly because they slow how quickly food leaves your stomach and change appetite signaling in the brain, the same actions that help you eat less. The effects are usually most common during dose escalation, the weeks when your dose is being stepped up, and often ease once you settle on a stable dose.</p>
<h3>The mechanism: the benefit and the side effect share a source</h3>
<p>GLP-1 is a gut hormone your body releases after meals. Drugs like semaglutide and tirzepatide mimic it at much higher, longer-lasting levels. Two of their actions matter most for your stomach:</p>
<ul>
<li><strong>Slower gastric emptying.</strong> Food stays in your stomach longer, so you feel full sooner and for longer. If you eat a large or rich meal, that same slowdown can leave you feeling overfull, queasy or bloated, and it can contribute to reflux, vomiting or constipation.</li>
<li><strong>Appetite signaling.</strong> The drugs act on brain pathways that control hunger and fullness. Turning down the hunger signal is the point, but a strong shift in appetite and fullness signals can also feel like queasiness or food aversion.</li>
</ul>
<p>This is why stomach symptoms are not a sign that the drug is "wrong" for you. They are a side effect of the drug doing what it is designed to do, sometimes a little too strongly for your body at that moment.</p>
<h3>Why dose escalation matters</h3>
<p>Both the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy</a> and <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound</a> labels start you on a low dose and step it up gradually. That schedule exists largely because gastrointestinal effects are most common while the dose is rising. Each increase is a new adjustment for your gut, so it is common for symptoms to return or intensify around a step up and then settle.</p>
<p>The labels do not give a single timeline for how long symptoms last, and experiences vary. A reasonable expectation is that symptoms tend to be concentrated in the escalation period rather than lasting at the same intensity for as long as you take the drug. If symptoms are not easing, or are getting worse, that is a reason to talk to your prescriber rather than push through.</p>
<h3>How often the symptoms become serious</h3>
<p>For most people the effects are mild to moderate. In the pooled Wegovy trials, severe gastrointestinal reactions occurred in 4.1% of people on Wegovy compared with 0.9% on placebo, according to the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy prescribing information</a>. Put another way, roughly 4 in 100 people had a severe digestive reaction, versus about 1 in 100 on placebo.</p>
<p>Side effects also cause some people to quit. In the same trials, 6.8% of people on Wegovy permanently stopped treatment because of adverse reactions, compared with 3.2% on placebo, per the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">label</a>. That figure covers all adverse reactions, not only digestive ones, but gastrointestinal effects are the most common reason people struggle with these drugs.</p>
<h3>When stomach symptoms are more than a nuisance</h3>
<p>Ongoing vomiting or diarrhea can dehydrate you, and the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a> links dehydration from these losses to rare kidney problems (covered later in this guide). Severe or persistent abdominal pain can also signal something other than routine side effects, such as gallbladder disease or pancreatitis. Sections 6 to 8 explain those risks and the warning signs to watch for.</p>`,
  },
  {
    heading: "How can you reduce nausea and other GI side effects?",
    body: `<p>You can usually reduce nausea and other GI side effects of GLP-1 drugs by following the gradual dose schedule, eating smaller meals, stopping when you feel full, limiting fatty or greasy foods and staying well hydrated. If symptoms are hard to tolerate, talk to your clinician before your next dose increase rather than escalating on schedule regardless.</p>
<p>None of these steps is a guarantee, and none replaces advice from your own prescriber. They are practical habits that work with the way these drugs slow digestion, rather than against it.</p>
<h3>1. Respect the titration schedule</h3>
<p>The <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy</a> and <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound</a> labels both use step-by-step dose increases because GI effects are most common during escalation. Skipping ahead to a higher dose to speed up weight loss is one of the most reliable ways to make yourself sick. If you are not tolerating a dose, your clinician may keep you there longer before moving up. That is a normal, label-consistent adjustment, not a failure.</p>
<h3>2. Eat smaller meals, more slowly</h3>
<p>Because food leaves your stomach more slowly, a portion that felt normal before treatment can now feel like too much. Smaller plates, eating slowly and pausing partway through a meal give your fullness signals time to register.</p>
<h3>3. Stop eating when you feel full</h3>
<p>This sounds obvious, but many people were raised to finish their plate. On a GLP-1, the "full" signal arrives earlier and is worth listening to. Eating past it is a common trigger for nausea, reflux and vomiting.</p>
<h3>4. Go easy on fatty, greasy and very rich foods</h3>
<p>Heavy, high-fat meals take longer to digest, which compounds the drug's slowing effect. Many people find that fried food or a rich restaurant meal is the most likely to trigger symptoms, especially in the first weeks after a dose increase.</p>
<h3>5. Stay hydrated</h3>
<p>Sip fluids steadily through the day, and pay extra attention if you have vomiting or diarrhea. The <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a> notes that dehydration from GI fluid losses has been linked to kidney injury in postmarketing reports, which is one reason hydration matters more than it might seem.</p>
<h3>6. Plan for constipation as well as nausea</h3>
<p>Constipation affected 24% of people on Wegovy versus 11% on placebo, according to the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">label</a>. Eating less overall can also mean less fiber and fluid. Ask your clinician what they recommend before reaching for any over-the-counter remedy.</p>
<h3>7. Keep your prescriber in the loop</h3>
<p>Tell your clinician if:</p>
<ul>
<li>You cannot keep food or fluids down.</li>
<li>Symptoms are getting worse rather than better after a dose change.</li>
<li>You have severe or persistent abdominal pain, which can signal something more serious than routine side effects.</li>
<li>You notice signs of dehydration, such as passing much less urine.</li>
</ul>
<p>A quick checklist to keep handy:</p>
<table>
<tr><th>Habit</th><th>Why it helps</th></tr>
<tr><td>Follow the dose schedule</td><td>GI effects peak during escalation</td></tr>
<tr><td>Smaller meals</td><td>Your stomach empties more slowly</td></tr>
<tr><td>Stop at full</td><td>Overeating is a common nausea trigger</td></tr>
<tr><td>Limit greasy food</td><td>Rich meals digest slowly</td></tr>
<tr><td>Hydrate</td><td>Protects against dehydration from GI losses</td></tr>
<tr><td>Speak up early</td><td>Your clinician can slow or adjust escalation</td></tr>
</table>
<p>For meal ideas, protein strategies and foods that tend to sit well, see our guide on <a href="/articles/what-to-eat-on-glp1-medication">what to eat on GLP-1 medication</a>.</p>`,
  },
  {
    heading: "Can GLP-1 medications cause gallstones or gallbladder disease?",
    body: `<p>Yes, GLP-1 medications can increase the risk of gallstones and acute gallbladder disease. In Wegovy trials, gallstones (cholelithiasis) occurred in 1.6% of people on the semaglutide injection versus 0.7% on placebo, and the Zepbound label reports gallstones in 1.1% of people in its pooled weight-loss trials. Both labels list gallbladder disease as a warning.</p>
<h3>What the labels say</h3>
<p>The <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">2025 Wegovy prescribing information</a> reports cholelithiasis in 1.6% of people on Wegovy injection compared with 0.7% on placebo, and in 2.5% of people taking the Wegovy tablet. The <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound prescribing information</a> warns of an increased occurrence of acute gallbladder disease and reports cholelithiasis in 1.1% of people in pooled weight-loss trials.</p>
<table>
<tr><th>Drug</th><th>Gallstones on drug</th><th>Gallstones on placebo</th><th>Source</th></tr>
<tr><td>Wegovy injection</td><td>1.6%</td><td>0.7%</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy label</a></td></tr>
<tr><td>Wegovy tablet</td><td>2.5%</td><td>Not shown here</td><td><a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy label</a></td></tr>
<tr><td>Zepbound</td><td>1.1%</td><td>Not shown here</td><td><a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound label</a></td></tr>
</table>
<h3>Relative vs absolute risk</h3>
<p>The Wegovy injection numbers roughly double the gallstone rate compared with placebo. That sounds alarming, but it is a relative comparison. In absolute terms, the difference is about 1 extra case per 100 people (1.6% versus 0.7%). Most people on these drugs in the trials did not develop gallstones.</p>
<h3>Why weight loss drugs affect the gallbladder</h3>
<p>Rapid weight loss itself is a well-known risk factor for gallstones, regardless of how the weight is lost. Because GLP-1 drugs can produce substantial weight loss, some of the extra risk likely comes from the weight loss rather than from the molecule alone. The labels do not attempt to split the two apart, so it is safest to treat gallbladder disease as a real, drug-associated risk.</p>
<h3>Gallbladder problems in the news</h3>
<p>Gallbladder disease is part of the current litigation. <a href="https://www.npr.org/2026/10/07/nx-s1-5850256/some-who-take-glp-1s-are-suffering-serious-side-effects-but-its-unclear-how-often" target="_blank" rel="noopener">NPR reported</a> in October 2026 that one major consolidated lawsuit involves more than 4,000 plaintiffs with serious digestive conditions such as pancreatitis or gallstones. A lawsuit count tells you that harms happen, not how often they happen. With millions of users, the label percentages remain the better guide to your individual odds.</p>
<h3>Warning signs to know</h3>
<p>Gallbladder problems typically show up as:</p>
<ul>
<li>Pain in the upper right side of the abdomen, sometimes after meals</li>
<li>Fever</li>
<li>Yellowing of the skin or the whites of the eyes (jaundice)</li>
<li>Nausea and vomiting that feel different from your usual side effects</li>
</ul>
<p>If you notice these symptoms, contact your clinician promptly, and seek urgent care if the pain is severe or you have fever or jaundice.</p>
<h3>Who should mention gallbladder history</h3>
<p>If you have had gallstones or gallbladder attacks before, tell your prescriber before you start. A past history does not automatically rule out treatment, but it is part of the risk conversation, especially if you are expected to lose weight quickly.</p>`,
  },
  {
    heading: "Do GLP-1 drugs cause pancreatitis?",
    body: `<p>GLP-1 drugs have been linked to acute pancreatitis, but it is rare. In Wegovy trials, adjudicated acute pancreatitis occurred at a rate of 0.2 cases per 100 patient-years on semaglutide versus under 0.1 on placebo, and the Wegovy label advises stopping the drug promptly if pancreatitis is suspected. Research on the size of the risk is inconsistent.</p>
<h3>What the label shows</h3>
<p>According to the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy prescribing information</a>, acute pancreatitis was confirmed by adjudication (an independent expert review of each case) in 4 Wegovy-treated patients, or 0.2 cases per 100 patient-years, compared with 1 patient on placebo, under 0.1 cases per 100 patient-years. "Patient-years" counts each person for every year they were in the study, so 0.2 per 100 patient-years means about 2 cases for every 1,000 years of combined treatment time.</p>
<p>The label instructs that Wegovy be discontinued promptly if pancreatitis is suspected.</p>
<h3>What the wider research says</h3>
<p>Two other lines of evidence point in the same direction but with important caveats.</p>
<ul>
<li><strong>A large meta-analysis.</strong> A pooled analysis of 62 randomized controlled trials with 66,232 patients found a pancreatitis risk ratio of 1.44 (95% CI 1.09 to 1.89) with GLP-1 drugs, according to the <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12457091/" target="_blank" rel="noopener">published review</a>. That is a relative increase of about 44%. The authors found that subgroup results were not significant and that the broader literature is inconsistent.</li>
<li><strong>An observational study.</strong> A 2023 JAMA research letter by Sodhi and colleagues compared people using semaglutide or liraglutide for weight loss with people using bupropion-naltrexone, a different weight loss drug. It reported roughly 9 times the risk of pancreatitis, as covered by <a href="https://www.mdedge.com/fedprac/article/265903/obesity/glp-1-agonists-linked-higher-risk-rare-serious-gi-complications" target="_blank" rel="noopener">Federal Practitioner</a>. The absolute risks were small, and because the study was observational, it shows an association rather than proof of cause.</li>
</ul>
<h3>Why "9 times the risk" is less scary than it sounds</h3>
<p>A ninefold increase is a relative risk. If an event is very rare to begin with, multiplying it still leaves a small number. The Sodhi study's authors and the coverage both stress that absolute risks were small. Observational studies can also be skewed by differences between the groups being compared. The trial data in the Wegovy label, where people were randomly assigned to drug or placebo, show an absolute difference of a fraction of a case per 100 patient-years. Both views agree that pancreatitis is a real signal and that it is uncommon.</p>
<h3>Symptoms to take seriously</h3>
<p>Acute pancreatitis usually causes:</p>
<ul>
<li>Severe, persistent pain in the upper abdomen, which may spread to your back</li>
<li>Pain that does not ease and may come with vomiting</li>
</ul>
<p>This pain is different from the mild queasiness many people feel after an injection. If you have severe abdominal pain that does not go away, get medical care right away and hold off on your next dose until a clinician has assessed you. The <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy label</a> says to discontinue promptly if pancreatitis is suspected.</p>
<h3>If you have had pancreatitis before</h3>
<p>Tell your prescriber about any past episode of pancreatitis before starting a GLP-1, so that your history can be weighed as part of the decision.</p>
<p>Pancreatitis is also one of the conditions named in the consolidated digestive lawsuit of more than 4,000 plaintiffs reported by <a href="https://www.npr.org/2026/10/07/nx-s1-5850256/some-who-take-glp-1s-are-suffering-serious-side-effects-but-its-unclear-how-often" target="_blank" rel="noopener">NPR</a>, which also noted that FDA adverse event reports cannot show how often such harms occur.</p>`,
  },
  {
    heading: "Can GLP-1s cause gastroparesis, ileus or bowel obstruction?",
    body: `<p>GLP-1 drugs have been linked to rare but serious digestive complications, including gastroparesis (stomach paralysis), ileus (a bowel that stops moving) and bowel obstruction. The FDA required an ileus warning on the Ozempic label in 2023, and an observational study found higher relative risks of these conditions with semaglutide or liraglutide, though the absolute risks were small.</p>
<h3>What these conditions are</h3>
<ul>
<li><strong>Gastroparesis</strong> means the stomach empties so slowly that food sits there far longer than it should, causing ongoing nausea, vomiting, fullness and pain.</li>
<li><strong>Ileus</strong> is a temporary loss of the normal muscle movement that pushes contents through the intestines, without a physical blockage.</li>
<li><strong>Bowel obstruction</strong> is a blockage that stops contents from passing through the intestine.</li>
</ul>
<p>Because GLP-1 drugs deliberately slow gastric emptying, it makes biological sense that, in a small number of people, the slowdown could become more severe. The open question is how often that happens.</p>
<h3>The FDA ileus warning</h3>
<p>On September 28, 2023, it was announced that the FDA had required a warning about ileus on the Ozempic label, as reported by <a href="https://www.mdedge.com/fedprac/article/265903/obesity/glp-1-agonists-linked-higher-risk-rare-serious-gi-complications" target="_blank" rel="noopener">Federal Practitioner</a>. A label warning means regulators considered the reports strong enough to inform prescribers and patients, not that ileus is common.</p>
<h3>What the JAMA study found</h3>
<p>The 2023 JAMA research letter by Sodhi and colleagues compared people using semaglutide or liraglutide for weight loss with people using bupropion-naltrexone. As summarized by <a href="https://www.mdedge.com/fedprac/article/265903/obesity/glp-1-agonists-linked-higher-risk-rare-serious-gi-complications" target="_blank" rel="noopener">Federal Practitioner</a>, the GLP-1 users had:</p>
<table>
<tr><th>Complication</th><th>Relative risk vs bupropion-naltrexone</th></tr>
<tr><td>Pancreatitis</td><td>About 9 times higher</td></tr>
<tr><td>Bowel obstruction</td><td>About 4 times higher</td></tr>
<tr><td>Gastroparesis</td><td>About 3.67 times higher (HR 3.67, 95% CI 1.15 to 11.90)</td></tr>
</table>
<p>These are relative risks. The absolute risks were small, meaning the great majority of people in both groups did not develop these conditions. The study was also observational: people were not randomly assigned to their drug, so other differences between the groups could affect the results. The wide confidence interval for gastroparesis, ranging from just over 1 to nearly 12, shows how much uncertainty surrounds the exact size of that risk.</p>
<h3>Why the lawsuits matter, and why they do not settle the question</h3>
<p><a href="https://www.npr.org/2026/10/07/nx-s1-5850256/some-who-take-glp-1s-are-suffering-serious-side-effects-but-its-unclear-how-often" target="_blank" rel="noopener">NPR reported</a> that more than 4,000 plaintiffs in a consolidated lawsuit allege serious digestive conditions. NPR also pointed out that the FDA's adverse event reporting system is mostly voluntary and unverified, so it cannot reveal how often these harms truly occur. Real people are being hurt, and the frequency is still uncertain. Both statements are true at once.</p>
<h3>Symptoms that are not "normal" side effects</h3>
<p>Ordinary GLP-1 nausea tends to come and go, especially around dose increases. Get prompt medical advice if you have:</p>
<ul>
<li>Vomiting that will not stop, or you cannot keep fluids down</li>
<li>Severe bloating with abdominal pain</li>
<li>Being unable to pass stool or gas, especially with pain or swelling</li>
<li>Feeling full for many hours after very small amounts of food, with worsening nausea</li>
</ul>
<p>Severe gastrointestinal reactions occurred in 4.1% of people on Wegovy versus 0.9% on placebo in the <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s015lbl.pdf" target="_blank" rel="noopener">Wegovy label</a> data, so severe symptoms are uncommon but not unheard of. Do not try to treat them on your own, and do not take your next dose until you have spoken with your clinician.</p>`,
  },
  {
    heading: "Why do you need to tell your surgeon or anesthesiologist you take a GLP-1?",
    body: `<p>You need to tell your surgeon or anesthesiologist you take a GLP-1 because these drugs slow stomach emptying, and food can remain in the stomach even after normal fasting. In November 2024, the FDA added pulmonary aspiration (inhaling stomach contents into the lungs) during anesthesia or sedation to the Warnings and Precautions of GLP-1 drug labels, including tirzepatide.</p>
<h3>What the FDA warning says</h3>
<p>According to <a href="https://www.medscape.com/viewarticle/fda-updates-glp-1-label-pulmonary-aspiration-warning-2024a1000k84" target="_blank" rel="noopener">Medscape</a>, the November 2024 label update was based on rare postmarketing reports of pulmonary aspiration in patients who had retained gastric contents despite fasting before a procedure. The FDA said the available data were insufficient to guide specific steps to reduce the risk, and that patients should tell their healthcare providers they take a GLP-1 before any planned procedure.</p>
<p>Aspiration is a concern because, under general anesthesia or deep sedation, your normal reflexes that protect your airway are reduced. If your stomach is not empty, its contents can travel up and into the lungs. That is why standard fasting rules exist, and why a drug that keeps food in the stomach longer changes the calculation.</p>
<h3>What anesthesiologists now recommend</h3>
<p>In 2024, a multisociety group led by the American Society of Anesthesiologists published updated guidance, available through <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11666732/" target="_blank" rel="noopener">PubMed Central</a>. Its key points:</p>
<ul>
<li><strong>Many patients can keep taking the drug.</strong> GLP-1 therapy may be continued before surgery in patients who are not at elevated risk of delayed gastric emptying.</li>
<li><strong>Higher-risk patients may need a liquid diet.</strong> For people at higher risk, clinicians can consider a liquid diet for 24 hours before the procedure.</li>
<li><strong>Holding the drug is still an option.</strong> The original ASA approach, holding daily formulations on the day of surgery and weekly formulations a week before, remains an option.</li>
<li><strong>Decide together, and early.</strong> The guidance emphasizes shared decision-making and assessing risk early, well before the day of surgery.</li>
</ul>
<h3>Who counts as higher risk?</h3>
<p>The guidance asks clinicians to assess each patient's risk of delayed gastric emptying early, as part of planning. Your anesthesiologist cannot make that assessment if they do not know you are on a GLP-1, which is why telling them matters more than any single rule.</p>
<h3>What to do before any procedure</h3>
<ol>
<li><strong>Tell every provider involved</strong>: the surgeon, the anesthesiologist and the person who schedules the procedure. This applies to any procedure with anesthesia or sedation, not only major surgery.</li>
<li><strong>Name the exact drug and dose</strong>, and whether it is daily or weekly, brand-name or compounded.</li>
<li><strong>Mention current GI symptoms</strong>, such as nausea or fullness.</li>
<li><strong>Ask early</strong> what you should do with your dose and your diet before the procedure. Do not stop or change your medication on your own; follow the plan your care team gives you.</li>
<li><strong>Do not hide it</strong> because you worry about being judged for using a weight loss drug. The point is safety.</li>
</ol>
<p>If you are getting your prescription through an online provider, keep a written record of your medication, dose and start date so you can share it easily. If your procedure is unplanned, such as an emergency, tell the team as soon as you can.</p>`,
  },
  {
    heading: "Can semaglutide cause sudden vision loss (NAION)?",
    body: `<p>Semaglutide (Ozempic, Wegovy, Rybelsus) can, very rarely, cause NAION, a condition in which reduced blood flow damages the optic nerve and causes sudden vision loss, usually in one eye. The European Medicines Agency concluded in June 2025 that NAION is a very rare side effect of semaglutide, affecting up to 1 in 10,000 people.</p>
<h3>What NAION is</h3>
<p>NAION stands for non-arteritic anterior ischemic optic neuropathy. "Ischemic" means caused by poor blood supply. Because it affects the nerve that carries signals from the eye to the brain, it is taken seriously despite being rare.</p>
<h3>What European regulators concluded</h3>
<p>In June 2025, the safety committee (PRAC) of the <a href="https://www.ema.europa.eu/en/news/prac-concludes-eye-condition-naion-very-rare-side-effect-semaglutide-medicines-ozempic-rybelsus-wegovy" target="_blank" rel="noopener">European Medicines Agency</a> concluded that NAION is a very rare side effect of semaglutide medicines, occurring in up to 1 in 10,000 people. The EMA said several large epidemiological studies in adults with type 2 diabetes suggest about a 2-fold increased risk, which works out to roughly 1 additional case per 10,000 person-years. The agency advised that semaglutide be stopped if NAION is confirmed, and that patients seek care for sudden vision loss.</p>
<p>The <a href="https://www.who.int/news/item/27-06-2025-27-06-2025-semaglutide-medicines-naion" target="_blank" rel="noopener">World Health Organization issued an information note</a> on semaglutide and NAION on June 27, 2025. EU product information was updated on September 30, 2025, according to the <a href="https://laegemiddelstyrelsen.dk/en/news/2025/prac-assesses-that-naion-could-be-a-very-rare-side-effect-of-ozempic,-rybelsus-and-wegovy/" target="_blank" rel="noopener">Danish Medicines Agency</a>.</p>
<h3>Relative vs absolute risk</h3>
<p>"Twice the risk" is a relative figure. Because NAION is rare to begin with, doubling it adds about 1 case per 10,000 person-years, per the <a href="https://www.ema.europa.eu/en/news/prac-concludes-eye-condition-naion-very-rare-side-effect-semaglutide-medicines-ozempic-rybelsus-wegovy" target="_blank" rel="noopener">EMA</a>. To picture it: if 10,000 people took semaglutide for one year, about one extra person might develop NAION compared with if they had not.</p>
<h3>The evidence is mixed</h3>
<ul>
<li>A <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11657653/" target="_blank" rel="noopener">Danish cohort study of 424,152 people with type 2 diabetes</a> found that once-weekly semaglutide roughly doubled the 5-year risk of NAION.</li>
<li>A consensus statement from the North American Neuro-Ophthalmology Society (NANOS) and the <a href="https://www.aao.org/education/clinical-statement/glucagon-like-peptide-1-receptor-agonists-risk-of-" target="_blank" rel="noopener">American Academy of Ophthalmology</a> says the overall magnitude of NAION risk remains low, and notes that some studies show no correlation.</li>
<li><a href="https://www.technologyreview.com/2026/10/09/1146094/were-still-figuring-out-the-side-effects-of-glp-1-weight-loss-drugs/" target="_blank" rel="noopener">MIT Technology Review</a> described research on optic nerve damage as mixed as of October 2026.</li>
</ul>
<p>Much of the strongest evidence comes from people with type 2 diabetes. How well it applies to people taking semaglutide only for weight loss is less clear.</p>
<h3>US labeling and lawsuits</h3>
<p>As of this writing, NAION is not listed in the US prescribing information for Ozempic or Wegovy, while the EU label lists it, according to <a href="https://www.drugwatch.com/drugs/ozempic/vision-loss/" target="_blank" rel="noopener">Drugwatch</a>. In the US, <a href="https://www.npr.org/2026/10/07/nx-s1-5850256/some-who-take-glp-1s-are-suffering-serious-side-effects-but-its-unclear-how-often" target="_blank" rel="noopener">NPR reported</a> that one consolidated lawsuit involves 247 plaintiffs with NAION. Novo Nordisk told NPR that NAION and other serious conditions were exceedingly rare in its trials, and the companies dispute the claims, per <a href="https://www.technologyreview.com/2026/10/09/1146094/were-still-figuring-out-the-side-effects-of-glp-1-weight-loss-drugs/" target="_blank" rel="noopener">MIT Technology Review</a>. NPR covered the litigation further in an <a href="https://www.npr.org/2026/10/10/nx-s1-5996652/glp1-fda-naion-blind-lawsuit-ozempic" target="_blank" rel="noopener">October 10 follow-up</a>.</p>
<h3>What about tirzepatide?</h3>
<p>The EMA conclusion covers semaglutide medicines. Our fact base for this guide does not include a regulatory conclusion on NAION for tirzepatide (Zepbound, Mounjaro), so we cannot tell you its risk is the same, higher or lower.</p>
<h3>What to do</h3>
<ul>
<li><strong>Sudden vision loss is an emergency.</strong> Seek medical care right away, as the <a href="https://www.ema.europa.eu/en/news/prac-concludes-eye-condition-naion-very-rare-side-effect-semaglutide-medicines-ozempic-rybelsus-wegovy" target="_blank" rel="noopener">EMA</a> advises, and tell the team you take semaglutide.</li>
<li><strong>If NAION is confirmed</strong>, semaglutide should be stopped, per the EMA.</li>
<li><strong>If you already have optic nerve disease</strong> or have had NAION, discuss it with your prescriber and eye doctor before starting.</li>
</ul>`,
  },
  {
    heading: "What other eye changes have been linked to GLP-1s?",
    body: `<p>Beyond NAION, the main eye issue linked to GLP-1 drugs is a warning about diabetic retinopathy complications on the Ozempic and Wegovy labels. People with a history of diabetic retinopathy should be monitored, because rapid improvement in blood sugar is the suspected factor in these complications.</p>
<h3>The diabetic retinopathy warning</h3>
<p>Diabetic retinopathy is damage to the small blood vessels in the retina caused by long-term high blood sugar. The <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy prescribing information</a> includes a warning about diabetic retinopathy complications and says patients with a history of diabetic retinopathy should be monitored. Ozempic carries a similar warning.</p>
<p>The suspected explanation is not that the drug directly damages the retina. Instead, a rapid improvement in blood sugar, which is the goal of diabetes treatment, appears to be a factor in some people with existing retinopathy. The precise mechanism is still uncertain, so it is best treated as a reason for monitoring rather than a reason for alarm.</p>
<h3>Who this applies to</h3>
<ul>
<li><strong>People with type 2 diabetes and known retinopathy.</strong> This group is the focus of the label warning.</li>
<li><strong>People with diabetes who have not had a recent eye exam.</strong> If you do not know whether you have retinopathy, ask your clinician whether you should be checked before or soon after starting.</li>
<li><strong>People without diabetes.</strong> The warning is about complications of existing diabetic retinopathy, so it is less directly relevant if you do not have diabetes. You should still report any change in vision.</li>
</ul>
<h3>International regulators</h3>
<p>Regulators in the UK and Australia have also issued warnings about semaglutide and eye conditions, according to <a href="https://www.drugwatch.com/drugs/ozempic/vision-loss/" target="_blank" rel="noopener">Drugwatch</a>. We have not independently verified the details of those warnings, so we mention them only as reported. The best-documented regulatory conclusion remains the <a href="https://www.ema.europa.eu/en/news/prac-concludes-eye-condition-naion-very-rare-side-effect-semaglutide-medicines-ozempic-rybelsus-wegovy" target="_blank" rel="noopener">European Medicines Agency's 2025 finding on NAION</a>, covered in the previous section.</p>
<h3>Eye symptoms you should report</h3>
<table>
<tr><th>Symptom</th><th>Why it matters</th><th>What to do</th></tr>
<tr><td>Sudden loss of vision, or a dark area in your vision, in one eye</td><td>Possible NAION or another eye emergency</td><td>Seek urgent care the same day</td></tr>
<tr><td>Any change in vision if you have diabetic retinopathy</td><td>Possible retinopathy complications</td><td>Contact your clinician or eye doctor promptly</td></tr>
<tr><td>Any vision change you cannot explain</td><td>Worth checking while on a new medication</td><td>Mention it to your prescriber</td></tr>
</table>
<h3>Questions to ask your clinician</h3>
<ul>
<li>Do I need an eye exam before starting a GLP-1, given my history?</li>
<li>How will you monitor my eyes if I have diabetic retinopathy?</li>
<li>What vision symptoms should make me stop and call you?</li>
</ul>
<h3>Why the evidence is still developing</h3>
<p>Eye side effects are among the areas <a href="https://www.technologyreview.com/2026/10/09/1146094/were-still-figuring-out-the-side-effects-of-glp-1-weight-loss-drugs/" target="_blank" rel="noopener">MIT Technology Review</a> described as still being worked out, with mixed research on optic nerve damage. Expect more studies, and possibly more label changes, as use continues to grow. If you have an eye condition, keeping your eye doctor and your prescriber in contact with each other is one of the most useful steps you can take.</p>`,
  },
  {
    heading: "Do GLP-1 drugs cause thyroid cancer?",
    body: `<p>It is not known whether GLP-1 drugs cause thyroid cancer in humans. Semaglutide and tirzepatide carry a boxed warning because they caused thyroid C-cell tumors in rodents, but large human studies, including a Scandinavian cohort and a 2025 US multi-database study, did not find a significant increase in thyroid cancer. One French study did report an association.</p>
<h3>What the boxed warning says</h3>
<p>The <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">Zepbound</a> and <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf" target="_blank" rel="noopener">Wegovy</a> labels both carry a boxed warning, the FDA's most prominent type of warning. The key points:</p>
<ul>
<li>The drugs caused thyroid C-cell tumors in rodents.</li>
<li>It is unknown whether they cause thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans.</li>
<li>They are contraindicated (should not be used) in people with a personal or family history of MTC or with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).</li>
<li>Patients should be counseled about symptoms such as a lump or swelling in the neck, trouble swallowing, shortness of breath and persistent hoarseness.</li>
<li>Routine monitoring with calcitonin blood tests or thyroid ultrasound is of uncertain value.</li>
</ul>
<p>MTC is a specific, uncommon type of thyroid cancer that arises from C-cells. It is different from the more common thyroid cancers most people have heard of.</p>
<h3>What human studies show</h3>
<table>
<tr><th>Study</th><th>Finding</th><th>Source</th></tr>
<tr><td>Scandinavian cohort (Denmark, Norway, Sweden, 2007 to 2021; BMJ 2024)</td><td>No increased thyroid cancer risk: HR 0.93 (95% CI 0.66 to 1.31) vs DPP-4 inhibitors; HR 1.16 (0.65 to 2.05) vs SGLT2 inhibitors</td><td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11004669/" target="_blank" rel="noopener">PMC</a></td></tr>
<tr><td>French nested case-control study (Bezin et al., Diabetes Care 2023)</td><td>Reported an association with thyroid cancer after 1 to 3 years of use (reported as about a 58% increase)</td><td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10563602/" target="_blank" rel="noopener">Review</a></td></tr>
<tr><td>US multi-database cohort (Diabetes Care 2025)</td><td>No statistically significant increase in thyroid tumors vs SGLT2 inhibitors, DPP-4 inhibitors or sulfonylureas; higher detection in the first year suggests surveillance bias</td><td><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12281980/" target="_blank" rel="noopener">PMC</a></td></tr>
</table>
<h3>How to read these results</h3>
<p>The <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11004669/" target="_blank" rel="noopener">Scandinavian study</a> compared GLP-1 users with people taking other diabetes drugs. A hazard ratio of 0.93 means essentially no difference, and the confidence intervals cross 1, so the results are consistent with no change in risk.</p>
<p>The <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10563602/" target="_blank" rel="noopener">French case-control study</a> is the main study pointing the other way. A reported 58% increase is a relative figure, and thyroid cancer is uncommon, so the absolute difference would be small. Case-control designs are also more prone to certain biases.</p>
<p>The <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12281980/" target="_blank" rel="noopener">2025 US study</a> offers a likely explanation for some early signals: surveillance bias. People starting a new drug see their doctors more and may have more tests, so existing small thyroid tumors are found sooner. A spike in detection in the first year, rather than a steady rise over time, fits that pattern better than a drug causing new cancers.</p>
<h3>What this means for you</h3>
<ul>
<li><strong>If you or a close relative has had MTC, or you have MEN 2</strong>, these drugs are contraindicated. Make sure your prescriber knows your family history.</li>
<li><strong>If you have no such history</strong>, the human evidence so far is largely reassuring, though not final.</li>
<li><strong>Report neck symptoms.</strong> A neck lump, trouble swallowing, shortness of breath or persistent hoarseness should be checked by your clinician, as the <a href="https://pi.lilly.com/us/zepbound-uspi.pdf" target="_blank" rel="noopener">labels</a> advise.</li>
</ul>
<p>Compounded semaglutide and tirzepatide are not FDA-approved and do not come with the same reviewed labeling, but they contain the same active ingredients, so the same thyroid history questions apply. Our guide to <a href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name semaglutide</a> explains the other differences.</p>`,
  },
  {
    heading: "Do GLP-1 drugs cause depression or suicidal thoughts?",
    body: `<p>Current evidence does not show that GLP-1 drugs cause depression or suicidal thoughts. In January 2024, the FDA said its preliminary evaluation found no evidence that GLP-1 receptor agonists cause suicidal thoughts or actions, though it could not definitively rule out a small risk, and in April 2024 the European Medicines Agency concluded the evidence does not support a causal link, as reported by <a href="https://www.statnews.com/2024/04/12/europe-obesity-drugs-suicidal-thoughts/" target="_blank" rel="noopener">STAT</a>.</p>
<h3>How the concern started</h3>
<p>The question gained attention after reports from Iceland prompted the EMA's safety committee (PRAC) to open a review in July 2023, as reported by <a href="https://www.statnews.com/2024/04/12/europe-obesity-drugs-suicidal-thoughts/" target="_blank" rel="noopener">STAT</a>. Individual reports like these are how regulators spot possible signals, but on their own they cannot show whether a drug caused the problem.</p>
<h3>What regulators concluded</h3>
<ul>
<li><strong>FDA, January 2024.</strong> The agency's preliminary evaluation found no evidence that GLP-1 receptor agonists cause suicidal thoughts or actions. The FDA said it could not definitively rule out a small risk (<a href="https://www.fda.gov/drugs/drug-safety-and-availability/update-fdas-ongoing-evaluation-reports-suicidal-thoughts-or-actions-patients-taking-certain-type" target="_blank" rel="noopener">FDA update</a>).</li>
<li><strong>EMA, April 2024.</strong> After its review, the PRAC concluded that the available evidence does not support a causal link between GLP-1 receptor agonists and suicidal thoughts or actions, and that no update to the product information was needed, according to <a href="https://www.statnews.com/2024/04/12/europe-obesity-drugs-suicidal-thoughts/" target="_blank" rel="noopener">STAT</a> and <a href="https://hospitalpharmacyeurope.com/practice/medicines-safety/no-evidence-of-causal-link-between-glp-1-receptor-agonists-and-suicide-says-prac/" target="_blank" rel="noopener">Hospital Pharmacy Europe</a>.</li>
</ul>
<h3>What changed on the US labels in 2026?</h3>
<p>The FDA went a step further in 2026. In a <a href="https://www.fda.gov/media/190557/download" target="_blank" rel="noopener">FDA Drug Safety Communication, January 13, 2026</a>, the agency asked the makers of Wegovy (semaglutide), Zepbound (tirzepatide) and Saxenda (liraglutide) to remove the information about suicidal ideation and behavior from their US labeling, following the reviews described above. That does not mean mood should be ignored: your prescriber should still ask how you are feeling, and you should raise any change in mood, especially if you have a history of depression.</p>
<h3>"No causal link" is not the same as "no mood effects"</h3>
<p>The regulatory reviews looked at suicidal thoughts and actions. They do not mean everyone feels the same on these drugs. Changes in appetite and in your relationship with food, along with the life changes that come with significant weight loss, can stir up complicated feelings. Those experiences are worth discussing even when a drug is not causing a psychiatric condition. Our article on <a href="/articles/glp1-and-mental-health">GLP-1s and mental health</a> covers this in more depth.</p>
<h3>What to do</h3>
<ol>
<li><strong>Tell your prescriber about any history</strong> of depression, anxiety, eating disorders or suicidal thoughts before you start.</li>
<li><strong>Notice changes</strong> in mood, sleep, interest in activities or thoughts about yourself after starting or increasing a dose, and share them.</li>
<li><strong>Do not stop other mental health medications</strong> on your own because you started a GLP-1. Talk to your clinicians first.</li>
<li><strong>Get help right away</strong> if you have thoughts of harming yourself. In the US, you can call or text <strong>988</strong> to reach the 988 Suicide &amp; Crisis Lifeline at any time. If you are in immediate danger, call 911.</li>
</ol>`,
  },
];
