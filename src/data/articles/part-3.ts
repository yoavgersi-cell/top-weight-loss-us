import type { Article } from "../articles";
import { trueCostTable, budgetList } from "@/lib/true-cost";

export const articlesPart3: Article[] = [
  {
    slug: "is-embody-legit",
    // Decoupled from the review's lane (Sep 2026): the title previously said
    // "An Honest Review" and led with cost, competing with /reviews/embody for
    // "embody review" queries - both pages then stalled deep for the "embody"
    // cluster. This owns the legitimacy/safety/trust intent; the review owns
    // "embody reviews / cost / results". They cross-link.
    title: "Is embody Legit? Pharmacy, Certification and Safety Checks (2026)",
    description:
      "Is embody a legitimate GLP-1 provider? We check its LegitScript certification, US 503A pharmacies and clinician review, plus pricing from $69/month.",
    category: "Advice",
    readTime: "6 min read",
    publishedAt: "2026-08-12",
    updatedAt: "2026-09-15",
    heroColor: "#EEF4FB",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "embody passes the three core legitimacy checks: LegitScript certification, US-based 503A compounding pharmacies, and a licensed clinician review before anything is prescribed.",
      "embody publishes flat prices: $69/month for compounded semaglutide and $119/month for compounded tirzepatide, with the clinician review, supplies and shipping built in.",
      "The limits to know: embody sells compounded medication only (compounded drugs are not FDA-approved), offers injections only, and every prescription depends on clinician approval after the online intake.",
    ],
    sections: [
      {
        heading: "What kind of company is embody?",
        body: `embody is a telehealth weight-loss program that prescribes compounded semaglutide and tirzepatide injections entirely online. The process has three steps:<ul><li>You fill in a short health questionnaire.</li><li>A licensed medical practitioner reviews your answers.</li><li>If treatment is appropriate, the medication is shipped to your home.</li></ul>Our <a href="/reviews/embody">full embody review</a> covers the service in more depth.`,
      },
      {
        heading: "Is embody a legitimate GLP-1 provider?",
        body: `Yes. embody meets the three checks that separate a trustworthy online provider from a risky one:<ul><li><strong>Independent certification:</strong> embody is <strong>LegitScript-certified</strong>, a third-party certification for online healthcare businesses.</li><li><strong>Licensed pharmacies:</strong> medication comes from <strong><a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener">US-based 503A compounding pharmacies</a></strong>.</li><li><strong>Clinician oversight:</strong> a <strong>licensed medical review</strong> happens before any prescription is written.</li></ul>A provider missing any one of these is the kind to avoid.`,
      },
      {
        heading: "How much does embody charge per month?",
        body: `embody charges <strong>$69/month</strong> for compounded semaglutide and <strong>$119/month</strong> for compounded tirzepatide. That price covers the medication, the clinician review, injection supplies and shipping. embody does not use insurance and lists no hidden fees. The full price breakdown is in <a href="/articles/embody-cost">our embody cost guide</a>.`,
      },
      {
        heading: "What are the strengths and weaknesses of embody?",
        body: `<strong>Strengths:</strong> low flat pricing, 1-2 day shipping, a process that runs fully online, and LegitScript certification backed by US pharmacies.<br><strong>Weaknesses:</strong> embody offers compounded medication rather than brand-name drugs, injections only, and, as with every GLP-1 provider, an online intake plus clinician approval before treatment starts. Keep in mind that <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">compounded medications are not FDA-approved</a>.`,
      },
      {
        heading: "Our verdict on embody's legitimacy",
        body: `embody is a legitimate and low-cost route into doctor-prescribed GLP-1 treatment, supported by third-party certification and licensed pharmacies. Whether embody is the best choice for you comes down to price and features compared with other providers. See where embody lands in our <a href="/reviews">ranked list of weight-loss providers</a>, or look at similar and cheaper options in <a href="/articles/embody-alternatives">our embody alternatives guide</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "embody-cost",
    title: "embody Cost (2026): $69 Semaglutide, $119 Tirzepatide Explained",
    description:
      "embody costs $69/month for compounded semaglutide and $119/month for tirzepatide. What the price covers, the refund rule, and how embody compares.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-15",
    heroColor: "#F0FAF5",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "embody's monthly price is flat: $69 for compounded semaglutide, $119 for compounded tirzepatide, with no insurance requirement, membership fee or hidden charge.",
      "Each payment covers the medication, the clinician review, injection supplies and shipping, and embody gives a full refund if your prescription is not approved.",
      "At $69 for semaglutide, embody sits near the bottom of the online GLP-1 price range; altRx starts higher at $89 but also offers brand-name drugs.",
    ],
    sections: [
      {
        heading: "What does embody cost per month?",
        body: `embody costs <strong>$69/month</strong> for compounded semaglutide and <strong>$119/month</strong> for compounded tirzepatide. Those are flat prices: no insurance is needed, no membership fee is added on top, and no hidden charges appear later. Our <a href="/reviews/embody">embody review</a> covers the rest of the service.`,
      },
      {
        heading: "What does the embody monthly price include?",
        body: `Some providers bill visits and supplies as separate line items. embody bundles everything into one monthly price:<ul><li>The compounded medication</li><li>The clinician review</li><li>Injection supplies</li><li>Shipping</li></ul>If the clinician does not approve a prescription after your intake, embody refunds you in full, so getting evaluated carries little financial risk.`,
      },
      {
        heading: "Is embody cheaper than other GLP-1 providers?",
        body: `embody's $69/month semaglutide price is one of the lowest GLP-1 options online. Pricing models differ across providers: <a href="/reviews/altrx">altRx</a>, for example, starts at $89/month but also stocks brand-name options. The cheapest headline price is not automatically the best fit, so weigh shipping speed, support and treatment choice alongside cost. Every provider is compared in our <a href="/reviews">provider rankings</a>.`,
      },
      {
        heading: "Is embody good value for the money?",
        body: `For adults who want a low, predictable price on doctor-prescribed GLP-1 treatment, embody's flat pricing and bundled extras are strong value, <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">as long as compounded medication and injections suit you</a>. Still deciding which provider fits your budget? Try <a href="/find-your-match">our matching quiz</a> or read <a href="/articles/is-embody-legit">whether embody is legit</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "embody-alternatives",
    title: "embody Alternatives (2026): GLP-1 Providers Worth Comparing",
    description:
      "Looking past embody? How altRx and other online GLP-1 providers compare on price ($89 vs $69), brand-name access, shipping and medical support.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-08",
    updatedAt: "2026-09-15",
    heroColor: "#FBF3EE",
    author: "Top Weight Loss Staff",
    keyTakeaways: [
      "People usually look beyond embody for three reasons: embody is compounded-only with no brand-name drugs, it offers injections only, and some want a different treatment mix or faster support.",
      "altRx is the nearest alternative if medication choice matters: compounded semaglutide from $89, compounded tirzepatide from $149, plus brand-name Zepbound and Wegovy.",
      "Compare alternatives on what the price includes (labs, supplies, shipping), delivery speed, compounded versus brand-name, and how simple it is to pause or cancel.",
    ],
    sections: [
      {
        heading: "Why would you choose an alternative to embody?",
        body: `embody is a capable, low-cost GLP-1 provider, but it will not suit everyone. The common reasons to look elsewhere:<ul><li>You want brand-name medication (embody sells compounded only).</li><li>You want quicker support.</li><li>You want a different range of treatments.</li></ul>The options below are comparable telehealth GLP-1 providers.`,
      },
      {
        heading: "Is altRx a good alternative to embody?",
        body: `<a href="/reviews/altrx">altRx</a> is the strongest alternative if you want more medication choice. altRx prices compounded semaglutide from $89/month and compounded tirzepatide from $149/month, and it also carries <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management" target="_blank" rel="noopener">brand-name options such as Zepbound and Wegovy</a>. That is a wider shelf than embody's compounded-only range. The two providers go head to head in our <a href="/altrx-vs-embody">altRx vs embody comparison</a>.`,
      },
      {
        heading: "Which other GLP-1 providers compete with embody?",
        body: `Several more providers compete closely with embody on price and service. Our <a href="/reviews">weight-loss provider rankings</a> line them up on shipping speed, what the price includes and treatment options. The best alternative for you depends on which matters most: the lowest price, access to brand-name drugs, or the level of support.`,
      },
      {
        heading: "How should you pick between embody and its alternatives?",
        body: `Use four tests:<ul><li><strong>Inclusions:</strong> does the price cover labs, supplies and shipping?</li><li><strong>Speed:</strong> how quickly does medication arrive?</li><li><strong>Medication type:</strong> do you want compounded or brand-name treatment?</li><li><strong>Flexibility:</strong> how easy is it to pause or cancel?</li></ul>If you are still unsure, <a href="/find-your-match">our matching quiz</a> gives a personalized recommendation, and <a href="/articles/is-embody-legit">our embody legitimacy check</a> is a useful starting point. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "ozempic-face",
    title: "Ozempic Face: Causes, Prevention and Recovery (2026)",
    description:
      "Ozempic face is lost facial fat from fast weight loss, not a direct drug effect. Why it happens on any GLP-1, the 4 levers that soften it, and whether it fades.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-09-15",
    heroColor: "#F6F0EA",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "\"Ozempic face\" describes facial fat lost during rapid weight loss; semaglutide does not chemically change your skin.",
      "The same look appears with any GLP-1, any diet or bariatric surgery, because speed and amount of weight loss drive it, not the brand of drug.",
      "What you can control: a moderate pace of loss, enough protein, resistance training and good hydration.",
      "Facial volume often comes back in part once weight stabilizes; loose skin improves more slowly and depends heavily on age.",
    ],
    sections: [
      {
        heading: "What does Ozempic face mean?",
        body: `Ozempic face is the popular label for the hollow, deflated facial look some people develop after losing a lot of weight quickly. It is <a href="https://www.health.harvard.edu/healthy-aging-and-longevity/glp-1-diabetes-and-weight-loss-drug-side-effects-ozempic-face-and-more" target="_blank" rel="noopener">a genuine effect with a misleading name</a>.<ul><li>Your face holds fat in the cheeks, the temples and around the eyes.</li><li>Fast weight loss takes that fat away just as it does elsewhere in the body.</li><li>The skin on top, particularly older skin with less elastin, may not tighten at the same rate, which looks like sagging.</li></ul>The cause is fast, large weight loss by any route, not a chemical action of semaglutide on the skin.`,
      },
      {
        heading: "Is facial sagging a direct side effect of Ozempic?",
        body: `No, and knowing that changes what you can do about it. <a href="https://www.health.harvard.edu/healthy-aging-and-longevity/how-does-ozempic-work-understanding-glp-1s-for-diabetes-weight-loss-and-beyond" target="_blank" rel="noopener">Semaglutide and tirzepatide work by lowering appetite</a>, and the weight loss that results is what changes the face. People see the same effect after bariatric surgery, very strict diets and big endurance-training changes, wherever a lot of fat disappears fast. GLP-1 drugs took the blame because they made major weight loss common enough for the pattern to get a nickname. The useful consequence: what reduces the effect is how you lose weight, not which drug you use.`,
      },
      {
        heading: "How can you prevent Ozempic face?",
        body: `Four factors are in your hands:<ul><li><strong>Pace.</strong> The facial effect follows speed. A steady, moderate rate gives skin time to adjust, and your prescriber can plan dose increases with that in mind. Losing weight more slowly is a valid clinical choice.</li><li><strong>Protein.</strong> <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13303403/" target="_blank" rel="noopener">Eating enough protein helps preserve lean tissue</a> throughout the body, including the face. Our <a href="/articles/what-to-eat-on-glp1-medication">GLP-1 eating guide</a> sets out targets for when appetite is low.</li><li><strong>Strength training.</strong> Keeping muscle protects overall body composition and the support beneath the skin. See <a href="/articles/exercise-while-on-glp1-medication">training on a GLP-1 without losing muscle</a>.</li><li><strong>Hydration.</strong> Dehydrated skin makes every hollow look deeper.</li></ul>One thing we do not recommend: collagen supplements and "skin elasticity" products aimed at GLP-1 users. The evidence does not back their specific claims, and we will not promote what we cannot verify.`,
      },
      {
        heading: "Will Ozempic face reverse after you stop the medication?",
        body: `In part, depending on which component you mean.<ul><li><strong>Lost fat volume</strong> often softens once weight levels off. If weight comes back, facial fullness returns with it, which is rarely the outcome people want.</li><li><strong>Loose skin</strong> recovers more slowly, and age is the main factor. Younger skin tightens a lot over several months; older skin tightens less.</li></ul>Stabilizing your weight reliably stops the change from getting worse. If established loose skin bothers you, talk to a dermatologist about proven treatments rather than supplement stacks.`,
      },
      {
        heading: "Should worry about Ozempic face keep you from treating obesity?",
        body: `For most people, no. The real trade-off is facial volume against the <a href="https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/health-risks" target="_blank" rel="noopener">health risks that come with excess weight</a>, and medically that is rarely close. The better answer to the worry is to shape treatment rather than skip it: moderate pace, enough protein and strength training, with a provider who monitors you. Our <a href="/">ranked telehealth providers</a> include clinician follow-up in verified $49-$299/month plans, and rate of loss is a good topic for those check-ins. This is not medical advice; follow your clinician's guidance.`,
      },
    ],
  },
  {
    slug: "zepbound-vs-wegovy-vs-ozempic",
    title: "Zepbound vs Wegovy vs Ozempic (2026): Results, Cost, Switching",
    description:
      "Zepbound (tirzepatide) reached up to 22.5% average weight loss in trials vs about 15% for Wegovy; Ozempic is semaglutide's diabetes label. Prices from $49/month.",
    category: "Comparison",
    readTime: "8 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-09-15",
    heroColor: "#EAF1F6",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "Zepbound (tirzepatide) acts on two hormone receptors and reached up to 22.5% average weight loss in trials, compared with about 15% for Wegovy (semaglutide).",
      "Ozempic and Wegovy share one ingredient, semaglutide; Ozempic carries the diabetes label and dosing.",
      "Verified brand cash prices at altRx: Zepbound $1,249/month and Wegovy $1,579; compounded versions cost $49-$299/month.",
      "No dose conversion chart exists between these drugs. Switching means your prescriber restarts titration.",
    ],
    sections: [
      {
        heading: "How are Zepbound, Wegovy and Ozempic different?",
        body: `They are two molecules sold under three FDA labels.<ul><li><strong>Zepbound</strong> is tirzepatide, <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management" target="_blank" rel="noopener">FDA-approved for chronic weight management</a>. It acts on two hormone receptors, GIP and GLP-1.</li><li><strong>Wegovy</strong> is semaglutide at weight-management doses, up to 2.4 mg.</li><li><strong>Ozempic</strong> is the same semaglutide, <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/209637lbl.pdf" target="_blank" rel="noopener">approved for type 2 diabetes at doses up to 2 mg</a>. It is often prescribed off-label for weight loss, but the weight-loss approval belongs to Wegovy.</li></ul>The real choice is tirzepatide versus semaglutide, with Ozempic as semaglutide's diabetes version. Our <a href="/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide comparison</a> goes into the molecules in detail.`,
      },
      {
        heading: "Does Zepbound cause more weight loss than Wegovy?",
        body: `On trial averages, yes. Tirzepatide produced <a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener">up to 22.5% average body-weight loss in its trials</a> at the top dose, compared with <a href="https://pubmed.ncbi.nlm.nih.gov/33567185/" target="_blank" rel="noopener">about 15% for semaglutide</a> in Wegovy's main trial. Three caveats apply:<ul><li>Averages hide wide individual differences.</li><li>Those trials did not test the two drugs against each other.</li><li>Tolerability varies from person to person.</li></ul>Many people do very well on semaglutide, and some tolerate one drug but not the other. Zepbound is stronger on average; which works better for you is found out during titration with a clinician.`,
      },
      {
        heading: "How much do Zepbound, Wegovy and Ozempic cost without insurance?",
        body: `Verified cash prices, not estimates:<ul><li><strong>Brand Zepbound:</strong> $1,249/month at altRx.</li><li><strong>Brand Wegovy:</strong> $1,579/month at altRx.</li><li><strong>Brand Ozempic:</strong> from $1,149/month.</li><li><strong>Zepbound KwikPens at ro:</strong> from $299 the first month, then $399-$449, plus membership.</li></ul>The compounded route is a different price tier: <strong>compounded semaglutide from a verified $49/month</strong> (welludr) and <strong>compounded tirzepatide from $89</strong>. These contain the same active ingredients and are prescribed through licensed telehealth and filled by US state-licensed pharmacies. Our <a href="/cheapest-glp1">cheapest GLP-1 page</a> lists the full price ladder, checked against each provider's own site.`,
      },
      {
        heading: "Are the side effects of Zepbound, Wegovy and Ozempic different?",
        body: `Mostly no. All three share the GLP-1 class profile: digestive effects such as nausea, constipation and diarrhea dominate, especially around dose increases. Trial dropout rates were broadly similar. The differences are personal: some people handle tirzepatide's dual action better, others do better on semaglutide. Managing side effects works the same way for all three, through slow titration, eating habits and hydration, as covered in our <a href="/articles/semaglutide-side-effects-guide">side-effects guide</a>. The rare but serious warnings (pancreatitis, thyroid C-cell warnings) apply across the whole class.`,
      },
      {
        heading: "Can you switch from Ozempic to Zepbound?",
        body: `Yes, and many people do. The critical point that search results often get wrong: <strong>there is no mg-for-mg dose conversion</strong> between semaglutide and tirzepatide. They are different molecules with separate dose ladders. A prescriber normally starts the new drug at or close to its own starting dose and adjusts based on response and tolerability. Never convert doses yourself. If what you really want is to leave brand pricing rather than change molecules, that is a different move, covered in our <a href="/switch-from-ozempic">guide to switching to compounded</a>.`,
      },
      {
        heading: "Should you choose Zepbound, Wegovy or Ozempic?",
        body: `Match the drug to your situation:<ul><li><strong>Highest average results and a brand budget:</strong> Zepbound leads the trial data.</li><li><strong>Insurance covers one of them:</strong> the covered drug usually wins on cost. Check your formulary first.</li><li><strong>Paying cash:</strong> compounded options at $49-$299/month change the whole calculation, which is why we start cash payers there. Compare them in our <a href="/">provider ranking</a>.</li><li><strong>Diabetes plus weight goals:</strong> discuss the Ozempic or Mounjaro labels with your clinician.</li></ul>On any route, you need a prescription, titration takes months, and the quality of your provider's follow-up matters more than the brand on the pen.`,
      },
    ],
  },
  {
    slug: "glp1-with-insurance",
    title: "GLP-1 Insurance Coverage (2026): Prior Auth, Denials, Plan B",
    description:
      "How insurance coverage for GLP-1s works: formularies, prior authorization, why claims get denied, and a verified $49-$299/month self-pay fallback.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-09-15",
    heroColor: "#EDF3EE",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "Whether a GLP-1 is covered depends on your specific plan: diabetes coverage is common, weight-loss-only coverage is much rarer, and only your formulary gives a definite answer.",
      "Plan on prior authorization. The usual gates are a BMI threshold, documented weight-related conditions and sometimes step therapy.",
      "A telehealth prescription can go through insurance as well, because coverage attaches to the drug, not to the type of visit.",
      "If coverage fails, verified self-pay compounded semaglutide starts at $49/month, which is less than many people pay for a brand drug after their deductible.",
    ],
    sections: [
      {
        heading: "Will my insurance pay for a GLP-1 for weight loss?",
        body: `It depends on your plan and on the diagnosis.<ul><li><strong>For diabetes</strong> (Ozempic, Mounjaro), coverage is common.</li><li><strong>For weight loss alone</strong> (Wegovy, Zepbound), coverage is far less consistent. Many employer plans exclude weight-loss drugs entirely, and Medicare broadly does not cover drugs for weight loss.</li></ul>No article can tell you what your plan pays; your formulary can. Call the number on your insurance card, or open your plan's formulary PDF and search for "Wegovy" and "Zepbound". That twenty-minute check decides your whole approach.`,
      },
      {
        heading: "How does prior authorization for GLP-1s work?",
        body: `Prior authorization (PA) is paperwork your prescriber files to show the plan you meet its criteria before it pays. Even drugs listed on a formulary are usually behind a PA. The common requirements:<ul><li><a href="https://www.fda.gov/news-events/press-announcements/fda-approves-new-drug-treatment-chronic-weight-management-first-2014" target="_blank" rel="noopener">A BMI threshold, often 30 or higher, or 27 or higher with a weight-related condition</a></li><li>Documented related health conditions</li><li>Sometimes evidence you tried other approaches first, known as step therapy</li></ul>A prescriber who handles GLP-1 PAs regularly can improve both your odds and your wait time. If the PA is denied, an appeal is worth filing, and appeals succeed often enough, especially with stronger documentation on the second try.`,
      },
      {
        heading: "Can a telehealth provider bill my insurance for a GLP-1?",
        body: `Yes. Who prescribes and who pays are separate questions. When a telehealth clinician prescribes brand Wegovy or Zepbound, the prescription goes to a regular pharmacy and is billed to your insurance like any other, including the PA process. In our coverage, found is built around insurance-based weight-loss care, and any licensed prescriber, online or in an office, can start a PA. Telehealth's advantage is speed: an intake this week instead of months on a specialist waitlist. Our <a href="/articles/how-to-get-ozempic-online">guide to getting a GLP-1 online</a> walks through the process step by step.`,
      },
      {
        heading: "How much will I pay if my GLP-1 is covered?",
        body: `Covered does not mean free. Your actual cost is the copay or coinsurance after your deductible, and for expensive brand drugs that can still be significant until the deductible is met.<ul><li><strong>Manufacturer savings cards</strong> can lower copays considerably for people with commercial insurance; check the manufacturer's website. They usually exclude government plans.</li><li><strong>The real comparison</strong> is your monthly out-of-pocket cost under coverage against the verified <strong>$49-$299/month self-pay compounded route</strong>.</li></ul>Some people whose plans technically cover a GLP-1 still choose compounded treatment purely for a predictable bill.`,
      },
      {
        heading: "What can you do if insurance denies your GLP-1?",
        body: `The fallback this site tracks is <strong><a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">self-pay compounded GLP-1s</a> at verified prices</strong>:<ul><li>Compounded semaglutide from $49/month (welludr), $69 (embody) or $89 (altRx)</li><li>Compounded tirzepatide from $89</li></ul>The clinician visit is included, and there is no PA or formulary to clear. You get the same active ingredients, prescribed after an online evaluation by licensed clinicians and filled by US state-licensed pharmacies. The trade-offs are laid out in <a href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name</a>. Start with the <a href="/cheapest-glp1">verified price ladder</a> or our full <a href="/">ranking</a>. What not to do: turn to gray-market vials or "research peptides". A denial is no reason to leave the licensed system.`,
      },
    ],
  },
  {
    slug: "is-wellmedr-legit",
    title: "Is welludr Legit? Reviews, Complaints and Pricing (2026)",
    description:
      "welludr has a verified 4.6 Trustpilot rating from 2,188 reviews. What customers praise, what they complain about, the $49/$89 pricing terms, and our verdict.",
    category: "Advice",
    readTime: "8 min read",
    publishedAt: "2026-08-30",
    updatedAt: "2026-10-05",
    heroColor: "#EEF4EF",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "welludr has a verified 4.6 Trustpilot rating from 2,188 reviews, tied for the top score among the GLP-1 providers we track.",
      "welludr charges $49/month for compounded semaglutide and $89/month for tirzepatide at every dose, but those prices require a 12-month plan billed monthly.",
      "In the reviews we captured, complaints center on shipping delays and slow support replies, not billing traps or missing orders, and several reviewers raised their scores once support fixed the issue. Individual results differ (one Reddit user reports losing 1 pound in 8 weeks), and the 12-month term is the key condition to read before signing up.",
      "welludr has every legitimacy marker we can check: a licensed-provider review, a prescription requirement, a named US pharmacy and a weight-loss warranty (terms on its site).",
    ],
    sections: [
      {
        heading: "What does welludr offer?",
        body: `welludr is a telehealth weight-loss provider that sells compounded GLP-1 treatment, both semaglutide and tirzepatide. A licensed clinician reviews each patient before prescribing, and every plan includes a Medical Weight-Care Coach. The selling point is price: <strong>$49/month for semaglutide and $89/month for tirzepatide, the same at every dose</strong>, which is the lowest published rate ladder in our <a href="/cheapest-glp1">verified price index</a>. welludr says it has treated more than 1 million patients and employs board-certified weight-loss specialists. Those are the company's own claims, so read them as marketing; the review record below, by contrast, can be checked independently.`,
      },
      {
        heading: "Is welludr a legitimate company?",
        body: `Yes, on every marker we can verify:<ul><li><strong>Clinical review:</strong> a licensed provider reviews your medical intake before prescribing, and approval is not guaranteed.</li><li><strong>Pharmacy:</strong> medication is dispensed by a <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener">regulated US pharmacy</a>, and Reddit users independently identify its Florida pharmacy.</li><li><strong>Reputation:</strong> a <strong>verified 4.6 on Trustpilot from 2,188 reviews</strong>, tied for the highest score among providers in our ranking.</li><li><strong>Warranty:</strong> treatment comes with a weight-loss warranty, with terms published on its site.</li></ul>Legitimate does not mean the medication works the same for everyone. That caveat is covered in the complaints section below.`,
      },
      {
        heading: "What are customers saying in welludr reviews?",
        body: `Two independent sources tell a similar story.<br><strong>Trustpilot (4.6, 2,188 reviews):</strong> the recurring theme is <strong>quick, human customer service</strong>. Reviewers name the staff who helped ("Talked to Shelby... helped me set up exactly what I wanted within 5 minutes," "Marley responded quickly") and describe refill changes and billing questions sorted out within minutes.<br><strong>Reddit:</strong> the presence is at comment level, but recent and consistent. One user: "They are legit with their pharmacy in Florida. I did a ton of research and ended up paying for a whole year at 88 a month... going on my 3rd month and so far they are great." Another: "I received it right away. They kept me on the 15mg of Tirz I was already on. Very responsive customer service."<br>The prices Reddit users report paying on annual plans ($88-$99/month) line up with welludr's published rates, a small but useful consistency check. The complete excerpts are in our <a href="/reviews/wellmedr">welludr review</a>.`,
      },
      {
        heading: "What are the most common welludr complaints?",
        body: `People searching "welludr complaints" deserve a direct answer, so here is every critical point in the material we verified, including both 1-star reviews from our September 2026 capture (shown in full in the carousel above).<br><strong>1. Shipping delays are the top complaint.</strong> A 1-star reviewer (Sep 16) said an order "moved to shipping the same day" yet eight days later still showed "a delay in shipping", adding: "Definitely feeling like a scam." A 4-star reviewer (Sep 20) said it had "been a month" without her medication, and a 3-star reviewer (Sep 20) said her last shipment "sat at the pharmacy for over a week before it shipped out."<br><strong>2. Slow support replies come second.</strong> "Over 24 hours no contact" (1 star, Sep 23); "Took too long to answer my questions" (3 stars, Sep 22); and an August reviewer who got no answer to two emails and cancelled by phone.<br><strong>3. Many complaints were resolved.</strong> Three of those reviewers raised their scores after a named staff member fixed the issue: "Turned a bad review to good!" (4 stars: "Rob (operations manager) reached out to let me know he was replacing the product in question"), "Help did arrive" (up from 1 star to 3: "My medication is on the way... it takes an act of congress to get help"), and "Update !!" (up to 3 stars after a call that "addressed all of my concerns").<br><strong>4. One billing claim we could not confirm.</strong> A 3-star reviewer in August said welludr bills "every 21 days", which would mean more than twelve charges a year. welludr's published schedule is one shipment every 4 weeks. Check the billing schedule in the plan terms at checkout.<br><strong>5. Results vary.</strong> A detailed Reddit account praises fast shipping and responsive support but reports losing only 1 pound after 8 weeks on tirzepatide, after prepaying $1,143 for six months. Response to GLP-1 treatment differs by person, and good service cannot guarantee results.<br><strong>What we did not see:</strong> any pattern of orders never arriving, refunds refused or billing traps. The 4.6 average across 2,188 reviews holds, and these complaints are a minority within it: worth knowing, not disqualifying.<br>The other term to understand is the <strong>commitment</strong>: the $49/$89 prices require a 12-month plan, billed monthly rather than prepaid. Competitors such as embody charge $20-$30 more for month-to-month flexibility.`,
      },
      {
        heading: "How can welludr sell semaglutide for $49?",
        body: `The low price has a structural explanation with three parts.<ul><li><strong>Compounding economics.</strong> The active ingredient is not what makes brand GLP-1s expensive; the brand premium is. Across our whole ranking, compounded semaglutide costs $49-$199/month, so welludr sits at the low end of a normal range rather than outside it.</li><li><strong>Scale.</strong> welludr reports more than one million patients, and volume lets a telehealth company run on thin margins. An operation that size also has too much to lose to risk regulatory trouble over shortcuts.</li><li><strong>Commitment pricing.</strong> The $49 rate is locked on a 12-month plan. The math: $49 x 12 = <strong>$588 for a full year</strong> of semaglutide with a coach included, less than four months at mid-market prices.</li></ul>`,
      },
      {
        heading: "Does welludr raise the price when your dose goes up?",
        body: `No, and this is a pricing detail many first-time buyers overlook. <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener">GLP-1 treatment begins at a low dose and steps up over several months</a>. Providers that price by dose advertise the starting-dose price, so the bill rises just as you settle into treatment. welludr charges <strong>one price at every dose</strong>: $49 for semaglutide and $89 for tirzepatide, whether you are in week two or month eight. Shipments come every 4 weeks in discreet packaging, and plan changes are handled by support (several of the Trustpilot reviews above describe that going smoothly).`,
      },
      {
        heading: "What is welludr's full price list?",
        body: `Published rates at our last content check: <strong>compounded semaglutide $49/month and tirzepatide $89/month on a 12-month plan, billed monthly, with the same price at every dose</strong>. Shipping is free every 4 weeks in discreet packaging, and a weight-loss warranty applies (terms on site).<br>How that compares:<ul><li>embody: $69/month semaglutide, flat, with no commitment</li><li>altRx: $89 with pause-anytime terms</li><li>Medvi: $99 all-inclusive with video visits and coaching</li></ul>Every provider is listed in our <a href="/cheapest-glp1">cheapest GLP-1 index</a>, and the direct matchup is <a href="/embody-vs-wellmedr">embody vs welludr</a>.`,
      },
      {
        heading: "Who should choose welludr?",
        body: `welludr fits a specific buyer: <strong>someone who already knows they want long-term GLP-1 treatment and for whom monthly price is the deciding factor.</strong> A year is a realistic treatment horizon anyway, since <a href="https://pubmed.ncbi.nlm.nih.gov/33567185/" target="_blank" rel="noopener">trials ran 68-72 weeks</a>, so the 12-month plan matches how the medication is normally used. At $588 a year for semaglutide, welludr has the lowest committed total in our ranking.<br>Skip welludr for now if you are unsure. A month-to-month provider (embody at $69, refunded if not approved) is a cheaper way to find out whether treatment suits you, and you can move to a committed rate after your first months.`,
      },
      {
        heading: "Our verdict: is welludr worth trusting?",
        body: `welludr is legitimate on every marker we can verify: one of the strongest Trustpilot records among providers we track (4.6 from 2,188 reviews), a real prescription process, a named pharmacy, published prices that match what buyers say they paid, and a warranty. The two caveats stand: results vary by person regardless of service quality, and the lowest price needs a 12-month commitment. Read the <a href="/reviews/wellmedr">full welludr review</a> for the complete record, or compare it with a no-commitment option in <a href="/embody-vs-wellmedr">embody vs welludr</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "best-tirzepatide-online",
    title: "Best Tirzepatide Online (2026): 8 Providers From $89/Month",
    description:
      "Where to buy tirzepatide online in 2026: 8 licensed telehealth providers with verified compounded prices from $89/month, plus brand-name Zepbound routes.",
    category: "Guide",
    readTime: "9 min read",
    publishedAt: "2026-08-30",
    updatedAt: "2026-10-05",
    heroColor: "#EDF2F8",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "Across the eight licensed providers we track, verified compounded tirzepatide costs $89-$299/month. welludr's $89 (12-month plan) is the lowest; embody's $119 is the lowest with no commitment.",
      "Brand Zepbound online costs $1,249/month cash at altRx, or starts at $299 for the first month (then $399-449) plus membership through ro's KwikPen route, which can cost much less if insurance covers it.",
      "Every legitimate seller requires a prescription after review by a licensed provider. A site offering tirzepatide without one is a warning sign, not a deal.",
      "Tirzepatide reached up to 22.5% average body-weight loss in trials compared with about 15% for semaglutide, which is why it is the pricier molecule.",
    ],
    sections: [
      {
        heading: "Why is tirzepatide in such high demand?",
        body: `Tirzepatide, the active ingredient in Zepbound and Mounjaro, acts on two receptors, GLP-1 and GIP, while semaglutide (Wegovy, Ozempic) acts on GLP-1 only. The trial results drive demand: <strong><a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener">up to 22.5% average body-weight loss with tirzepatide</a> compared with <a href="https://pubmed.ncbi.nlm.nih.gov/33567185/" target="_blank" rel="noopener">about 15% with semaglutide</a></strong>. On the data it is the stronger option, and it is priced that way, so knowing real market prices matters. Below is every price we have verified, lowest first. If you have not picked a molecule yet, read <a href="/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide</a> first.`,
      },
      {
        heading: "Where can you buy the cheapest tirzepatide online?",
        // The price table itself is code-rendered right under this section
        // (TirzepatidePriceTable): live CTAs, review links and verified
        // Trustpilot records per row, with prices from the price index.
        body: `The table below lists the eight licensed telehealth providers in our ranking that publish a compounded tirzepatide price, from lowest to highest. Each row links to our full review of that provider. Every price is the provider's own published rate, with its condition stated: a 12-month lock, a promotion or a flat month-to-month price.`,
      },
      {
        heading: "Can you buy brand-name Zepbound online?",
        body: `Yes, through two verified routes.<ul><li><strong>altRx</strong> sells brand Zepbound for a flat $1,249/month cash next to its compounded plans, with Buy Now, Pay Later available. One price, no membership.</li><li><strong>ro</strong> sells the Zepbound KwikPen from $299 for the first month (then $399-449/month) plus its Body membership ($39 the first month, then $74-$149/month). Because ro bills the medication separately, <strong>insurance can pay where your plan covers it</strong>, which can make ro's route far cheaper than any cash price here.</li></ul>If your plan might cover tirzepatide, check that first using our <a href="/articles/glp1-with-insurance">GLP-1 insurance guide</a>. Every brand route and what it includes is in <a href="/articles/zepbound-price-online">Zepbound price online</a>.`,
      },
      {
        heading: "Is compounded tirzepatide safe and legal?",
        body: `Compounded tirzepatide from the providers above is legal and regulated. Licensed clinicians prescribe it after a medical review, and <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener">US state-licensed compounding pharmacies</a> prepare it. That channel is what makes $89-$299 prices possible.<br>The trade-off: <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener">compounded preparations are not FDA-approved products</a> the way brand Zepbound is. The FDA does not review each pharmacy's output, so you are relying on the pharmacy's standards. That is why we list only providers with licensed-provider review and named, regulated pharmacies.<br>What is not legitimate: "research chemical" and no-prescription peptide sellers. With no clinician, no pharmacy license and no recourse, the discount is not worth the risk.`,
      },
      {
        heading: "Is a prescription required for tirzepatide?",
        body: `Yes, at every legitimate source, including every provider in the table. You complete a medical intake, and a licensed provider decides whether GLP-1 treatment is right for you. Approval is not automatic; embody, for example, refunds in full if you are not approved. Two safety points come up often:<ul><li>Moving from semaglutide to tirzepatide has <strong>no mg-for-mg dose conversion</strong>. Your prescriber restarts titration at tirzepatide's starting dose.</li><li>Dose increases go through your provider, never your own calculation.</li></ul>The prescription step is not an obstacle to get around. It is what separates medicine from the gray market.`,
      },
      {
        heading: "Which tirzepatide provider is right for you?",
        body: `Start from your main constraint:<ul><li><strong>Lowest price, happy to commit for a year:</strong> <a href="/reviews/wellmedr">welludr</a> at $89.</li><li><strong>Lowest price with no commitment:</strong> <a href="/reviews/embody">embody</a> at $119, with 1-2 day shipping.</li><li><strong>Dislike needles:</strong> <a href="/reviews/directmeds">DirectMeds</a>, the only sublingual-drops option, at $147 flat.</li><li><strong>May want brand-name later:</strong> <a href="/reviews/altrx">altRx</a>, at $149 compounded with Zepbound on the same shelf.</li><li><strong>Want a person involved:</strong> <a href="/reviews/medvi">Medvi</a> at $166 all-inclusive, with one of the two largest verified review bases.</li><li><strong>Want something at stake:</strong> <a href="/reviews/shed">SHED</a>'s money-back guarantee.</li></ul>Every provider in this table is legitimate, so the decision is about fit, not safety.`,
      },
      {
        heading: "What is the best place to get tirzepatide online?",
        body: `There is no single best tirzepatide provider in 2026; there is a short list filtered by budget and how long you will commit. The verified lowest price is <strong>$89/month (<a href="/reviews/wellmedr">welludr</a>, 12-month plan)</strong>, the lowest with no strings is <strong>$119 (<a href="/reviews/embody">embody</a>)</strong>, and brand Zepbound costs <strong>$1,249 cash (<a href="/reviews/altrx">altRx</a>)</strong> or possibly much less through <strong><a href="/reviews/ro">ro</a> with insurance</strong>. Whichever you choose, stay in the licensed system: a real prescription, a real pharmacy and a published price. This article is general information, not medical advice; a licensed provider decides whether tirzepatide is appropriate for you.`,
      },
    ],
  },
  {
    slug: "zepbound-price-online",
    title: "Zepbound Price Online (2026): $1,249 Brand, $89 Compounded",
    description:
      "Verified Zepbound prices online: $1,249/month cash at altRx, $1,599 at welludr, ro KwikPens from $299 first month plus membership, compounded from $89.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-05",
    updatedAt: "2026-10-05",
    heroColor: "#EDF2F8",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "Brand Zepbound for cash online costs $1,249/month at altRx (flat, with Buy Now, Pay Later) and $1,599/month at welludr. Both are the providers' own published prices, verified by us.",
      "ro sells Zepbound KwikPens from $299 for the first month, then $399-449/month, plus its Body membership ($39 the first month, then $74-$149/month). ro bills the medication separately, so insurance can pay where your plan covers Zepbound.",
      "Compounded tirzepatide, the same active ingredient prepared by a 503A pharmacy, costs a verified $89-$299/month at eight licensed providers. It is not an FDA-approved product, and that is the trade-off behind the lower price.",
      "All routes need a prescription from a licensed provider. Zepbound is FDA-approved for chronic weight management, and tirzepatide reached up to 22.5% average body-weight loss in the SURMOUNT-1 trial.",
    ],
    sections: [
      {
        heading: "How much does Zepbound cost online? Verified prices by provider",
        body: `Three providers we track sell brand Zepbound online, and eight sell compounded tirzepatide. The figures below are each provider's own published price at our last check. Brand-name rows come from our <a href="/glp1-weight-loss-statistics">price index</a> (verified October 16, 2026); ro's come from its published pricing in August 2026.<table><thead><tr><th>Route</th><th>Provider</th><th>Monthly price</th><th>Inclusions and conditions</th></tr></thead><tbody><tr><td>Brand Zepbound, cash</td><td><a href="/reviews/altrx">altRx</a></td><td><strong>$1,249</strong></td><td>Flat price with no membership; licensed-provider review; Buy Now, Pay Later offered</td></tr><tr><td>Brand Zepbound, cash</td><td><a href="/reviews/wellmedr">welludr</a></td><td><strong>$1,599</strong></td><td>Brand shelf next to its $49/$89 compounded plans; Ozempic also listed at $1,399</td></tr><tr><td>Brand Zepbound, pen</td><td><a href="/reviews/ro">ro</a></td><td><strong>from $299</strong> first month, then $399-449</td><td>Zepbound KwikPen billed apart from the ro Body membership ($39 first month, then $74-$149/month); insurance can pay for the medication where covered</td></tr><tr><td>Compounded tirzepatide</td><td>welludr</td><td><strong>$89</strong></td><td>12-month plan billed monthly; one price at every dose</td></tr><tr><td>Compounded tirzepatide</td><td><a href="/reviews/embody">embody</a></td><td><strong>$119</strong> (regular $129)</td><td>Flat, month to month; 1-2 day shipping; refunded if not approved</td></tr><tr><td>Compounded tirzepatide</td><td>DirectMeds / altRx / Medvi</td><td><strong>$147 / $149 / $166</strong></td><td>Flat (DirectMeds); flat at every dose, regular $299 (altRx); promotional, regular $299, all-inclusive (Medvi)</td></tr><tr><td>Compounded tirzepatide</td><td>Sprout / TrimRx / SHED</td><td><strong>$199 / $259 / $299</strong></td><td>Monthly; no long-term contract (TrimRx); 20% off the first month (SHED)</td></tr></tbody></table>Prices shift as promotions end and plan terms change, so confirm at checkout. The complete compounded ladder, with conditions and Trustpilot records, is in our <a href="/articles/best-tirzepatide-online">best tirzepatide online</a> guide.`,
      },
      {
        heading: "Why does brand Zepbound cost so much more than compounded tirzepatide?",
        body: `Both contain tirzepatide; the difference is product status.<ul><li><strong>Zepbound</strong> is Eli Lilly's FDA-approved product, manufactured, inspected and labelled as a finished drug. That is what <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management" target="_blank" rel="noopener">FDA approval for chronic weight management</a> means.</li><li><strong>Compounded tirzepatide</strong> is made by a <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener">state-licensed 503A pharmacy</a> for one patient's prescription. The channel is legal and regulated, but the FDA does not review each pharmacy's output, so you rely on that pharmacy's standards.</li></ul>The brand premium pays for finished-product status, the manufacturer's quality system and the pen device, not a different molecule. That is why compounded tirzepatide costs about a tenth of the brand price, and why the question to put to any compounded provider is which pharmacy fills the vial. Our <a href="/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name</a> guide covers the trade-offs fully.`,
      },
      {
        heading: "Can insurance lower what you pay for Zepbound?",
        body: `Only on a route that bills the medication on its own. altRx and welludr sell brand Zepbound at a cash price. ro lists the Zepbound KwikPen as a separate line item from its membership, so a plan that covers Zepbound for weight management can pay its share. When that happens, ro's route can cost far less than any cash price on this page. Weight-loss coverage varies by plan, is usually gated by prior authorization (BMI thresholds, documented conditions), and is still excluded by many plans. Check your formulary before picking a route, using our <a href="/articles/glp1-with-insurance">GLP-1 insurance guide</a>.`,
      },
      {
        heading: "How do Zepbound and Wegovy prices compare online?",
        body: `The two brand-name weight-loss injections are priced in parallel ranges at the providers we track:<ul><li>altRx: Zepbound $1,249/month, Wegovy $1,579/month</li><li>Sprout: Wegovy $1,799/month</li><li>ro: the Wegovy pill from $149 the first month, then up to $299, plus membership</li></ul>In trials, tirzepatide (Zepbound) reached up to 22.5% average body-weight loss compared with about 15% for semaglutide (Wegovy), which explains Zepbound's higher demand. For efficacy, dosing and price side by side, read <a href="/articles/zepbound-vs-wegovy">Zepbound vs Wegovy</a>.`,
      },
      {
        heading: "What is the cheapest way to get Zepbound for your situation?",
        body: `Find the line that fits you:<ul><li><strong>Insurance covers Zepbound for weight management:</strong> ro, because the pen is billed separately and your plan can pay its share.</li><li><strong>Paying cash and you want the brand product:</strong> altRx at $1,249 flat, with Buy Now, Pay Later to spread the cost.</li><li><strong>Paying cash and the molecule matters more than the label:</strong> compounded tirzepatide from $89 (welludr, 12-month plan) or $119 flat with no commitment (embody).</li><li><strong>Unsure you will stay on it:</strong> a month-to-month compounded plan is the cheapest way to find out before paying brand prices.</li></ul>Whatever you choose, stay inside the licensed system: a licensed-provider review, a named pharmacy and a published price.`,
      },
      {
        heading: "Zepbound price online: the summary",
        body: `In 2026, brand Zepbound online costs <strong>$1,249/month cash at altRx</strong>, <strong>$1,599 at welludr</strong>, or <strong>from $299 for the first month plus membership at ro</strong>, where insurance can apply. Compounded tirzepatide, with the same active ingredient but without FDA-approved product status, costs <strong>$89-$299/month</strong> through licensed telehealth providers. Every option requires a prescription, and a licensed provider decides whether tirzepatide is appropriate for you. This article is general information, not medical advice.`,
      },
    ],
  },
  // Bridge articles (originally routed toward other verticals). On this
  // site they stay on weight loss only, with no links to other categories.
  {
    slug: "testosterone-and-weight-loss",
    title: "Testosterone and Weight Loss: How Each Affects the Other (2026)",
    description:
      "Excess weight can lower testosterone, and low testosterone makes fat easier to gain. How the loop works, what it means on a GLP-1, and when a blood test helps.",
    category: "Science",
    readTime: "7 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-09-15",
    heroColor: "#EEF2F7",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "The link runs in both directions: significant excess weight is associated with lower testosterone, and low testosterone makes it easier to gain fat and harder to keep muscle.",
      "Substantial weight loss by any method, including GLP-1 treatment, can raise testosterone levels in many men, making it one of the strongest levers that needs no hormone prescription.",
      "The symptoms overlap (tiredness, low drive, stubborn weight), so a blood test is more reliable than guessing.",
      "On a GLP-1, protecting muscle through protein and resistance training supports hormonal health as well as appearance.",
    ],
    sections: [
      {
        heading: "How does body weight affect testosterone, and vice versa?",
        body: `The relationship works in both directions, which is why it can be confusing.<ul><li><strong>Weight to testosterone:</strong> fat tissue is hormonally active and <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11745839/" target="_blank" rel="noopener">converts testosterone into estrogen</a>. The more excess fat a man carries, the more pressure there is on his testosterone level.</li><li><strong>Testosterone to weight:</strong> lower testosterone shifts body composition toward fat and away from muscle, makes workouts feel harder and lowers energy, all of which make weight easier to gain.</li></ul>Neither direction is fixed. The practical takeaway is that the two problems rarely exist apart, and improving one usually helps the other.`,
      },
      {
        heading: "Can losing weight increase testosterone?",
        body: `For many men with significant excess weight, yes, and often noticeably. Losing weight shrinks the fat tissue that converts testosterone to estrogen, and levels commonly improve as weight drops, whatever method produced the loss. That makes weight loss one of the most effective things a man can do for his hormones without a hormone prescription. The caveat: the effect is not universal, its size varies, and men whose low levels have causes unrelated to weight will not resolve them through weight loss alone. That is where testing comes in.`,
      },
      {
        heading: "What does the testosterone link mean if you take a GLP-1?",
        body: `Two things.<ul><li><strong>The good news:</strong> the weight you are losing is probably helping your hormone picture, not hurting it.</li><li><strong>The caution:</strong> <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13303403/" target="_blank" rel="noopener">fast weight loss removes muscle as well as fat</a> unless you protect it, and muscle matters for metabolic and hormonal health.</li></ul>The protection is straightforward: enough protein and regular resistance training throughout the weight loss. Our <a href="/articles/exercise-while-on-glp1-medication">guide to keeping muscle on a GLP-1</a> covers it in depth.`,
      },
      {
        heading: "When should you get your testosterone checked?",
        body: `Consider a test when symptoms persist after your weight is trending down, or when they are severe at any point. The overlap is what makes guessing unreliable: tiredness, low drive, slow recovery and stubborn fat can stem from weight, from low testosterone, or from both. A blood panel answers the question. Ask your doctor or the clinician managing your weight-loss treatment about testing. A licensed provider interprets the results and decides whether any treatment is appropriate, and normal ranges differ by age and by lab.`,
      },
      {
        heading: "Testosterone and weight loss: the takeaway",
        body: `Weight and testosterone work as one system, not two separate problems. If you carry significant excess weight and have low-testosterone symptoms, losing weight is usually the highest-impact first step, and GLP-1 treatment from <a href="/">verified providers starting at $49/month</a> is the most effective tool most people have for it. If symptoms remain as your weight falls, get tested rather than guessing. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "emotional-eating-and-weight-loss",
    title: "Emotional Eating on a GLP-1: Why It Persists and What Helps",
    description:
      "GLP-1s reduce hunger but not the urge to eat for comfort. Why emotional eating continues on medication, how therapy addresses triggers, and combining both.",
    category: "Wellness",
    readTime: "7 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-09-15",
    heroColor: "#F2EFF7",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "GLP-1 drugs turn down hunger signals, but emotional eating is not driven by hunger, so it can continue while you are on medication.",
      "Common triggers are stress, boredom and hard emotions; eating brings brief relief, which is exactly what keeps the habit going.",
      "Medication and therapy do different jobs: the drug handles appetite and therapy works on triggers, and many people benefit from both.",
      "Licensed therapists, including those working online, can help with emotional eating, and many accept insurance.",
    ],
    sections: [
      {
        heading: "Why do you still eat for comfort when a GLP-1 has cut your appetite?",
        body: `Because hunger was only part of the picture. GLP-1 drugs are very effective at what they target: quieting the body's hunger signals and <a href="https://www.health.harvard.edu/mind-and-mood/beyond-appetite-suppression" target="_blank" rel="noopener">food noise</a>. Eating because of stress, boredom, loneliness or a bad day is driven by the feeling, not by hunger, and it gives brief relief, which is why the habit lasts. Many people on GLP-1s describe it the same way: the appetite has gone, yet they still end up in the kitchen at 10pm after a hard day. That is neither a medication failure nor a willpower failure. It is a separate problem that needs a separate tool.`,
      },
      {
        heading: "What works for emotional eating?",
        body: `Working on the triggers, not only on the food, and that is where therapy fits. A therapist can help you:<ul><li>Identify what actually sends you to food.</li><li>Build responses to those moments that do not involve eating.</li><li>Break the cycle of shame after a slip, which often drives the next one.</li></ul>This is practical skills work, and it is an area where structured talk therapy has a clear payoff. Self-help steps also help, such as noticing patterns, delaying and substituting. If the habit is years old, though, working with a professional usually moves faster than working alone.`,
      },
      {
        heading: "Can you combine therapy with GLP-1 medication?",
        body: `Yes, and the two complement each other rather than overlap. The medication lowers biological hunger, and therapy addresses the emotional triggers that medication cannot reach. For many people that pairing is what makes change last: the medication creates room, and therapy fills it with habits that hold up after the pattern is broken. If medication alone has stalled for you and the stall looks emotional rather than physical, that is a strong sign the missing piece is therapy.`,
      },
      {
        heading: "How can you find help for emotional eating?",
        body: `Start with a licensed mental health professional. Many therapists now work by video, phone or messaging, so getting started is easier than it used to be, and many accept insurance. Your primary care doctor or the clinician managing your weight-loss treatment can also point you toward someone who works with eating patterns. If you are in crisis or having thoughts of self-harm, do not wait for an appointment: call or text 988, the Suicide & Crisis Lifeline, which is free and available 24/7.`,
      },
      {
        heading: "Emotional eating and GLP-1s: the takeaway",
        body: `If you eat for reasons other than hunger, medication alone was never going to solve everything, and knowing that early saves months of frustration. Give each tool its job: <a href="/">GLP-1 treatment</a> for the biological side, therapy for the habits, and both together when both problems are present. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "glp1-true-cost-month-1-vs-year-one",
    title: "GLP-1 True Cost (2026): Month 1 vs Year One, by Provider",
    description:
      "What online GLP-1 treatment really costs at verified prices: the first month, the ongoing monthly price, and the year-one total, from $588 at the low end.",
    category: "Guide",
    readTime: "8 min read",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    heroColor: "#EEF3F8",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "The figure that matters is the ongoing price, not the first-month price. Most providers we track charge one flat price at every dose; three show a promotional price next to a higher regular price, and one discounts the first month by 20%.",
      "At prices verified in our index, a year of compounded semaglutide ranges from $588 (welludr's 12-month plan) to roughly $1,800-$2,400 at month-to-month providers. Tirzepatide costs about $500-$1,200 more per year.",
      "The month-2 price jump that shows up in reviews comes from three pricing structures: an introductory price that expires, a membership billed alongside the drug, and a prepaid bundle that renews. All three can be spotted before you pay.",
      "Every figure here comes from our verified price index and is dated. Prices change monthly; the index and its change log are the live record.",
    ],
    sections: [
      {
        heading: "Why is the first-month GLP-1 price misleading?",
        body:
          "The first-month price is accurate for exactly one month. What decides whether you can stay on treatment is the price in month 4, month 9 and month 12, at the dose your clinician settles on. Across the providers we track, that later price is sometimes identical to month 1 and sometimes twice as high. Three pricing structures create the gap:<ul><li>An <strong>introductory price</strong> that ends after the first month or two.</li><li>A <strong>membership or subscription fee</strong> charged alongside the medication, so the drug price shown was never the full bill.</li><li>A <strong>prepaid bundle</strong> that bills the year upfront and then renews.</li></ul>None of these is truly hidden; they are just not the headline figure. This page makes them the headline. Every price below is the provider's own published figure as verified in our <a href=\"/glp1-weight-loss-statistics\">price index</a>, and every logged change is in the <a href=\"/glp1-price-changes\">price-change feed</a>.",
      },
      {
        heading: "How much does compounded semaglutide cost in month 1, ongoing and in year one?",
        body:
          "Rows are sorted by year-one cost, lowest first. \"What you keep paying\" is the provider's published price for every month after the first, at every dose. Where a promotional price sits next to a struck-through regular price, both are shown, because the page we verified gives no end date for the promotion." +
          trueCostTable("semaglutide") +
          "Two rows need explaining. <a href=\"/reviews/wellmedr\">welludr</a>'s $49 is the lowest price on the market and comes on a 12-month plan: the price is locked for the year, which is the benefit, and the plan terms are what to read before signing. <a href=\"/reviews/healthrx\">HealthRx</a>'s $99 is an average: the plan is $1,188 charged at checkout for twelve months, so month 1 costs the whole year and nothing is returned if you stop in month 5. The month-to-month rows (embody, altRx, DirectMeds, TrimRx) are the ones where month 4 really costs the same as month 1.",
      },
      {
        heading: "How much does compounded tirzepatide cost over a year?",
        body:
          "The method and sort order are the same. Tirzepatide costs more at every provider, and each provider's pricing structure matches its semaglutide row." +
          trueCostTable("tirzepatide") +
          "For the clinical choice between the molecules, see <a href=\"/articles/tirzepatide-vs-semaglutide\">tirzepatide vs semaglutide</a>; this page covers only cost. The lowest tirzepatide year at a verified published price is welludr's $1,068 on its 12-month plan. The lowest with no commitment is <a href=\"/reviews/embody\">embody</a>: $1,428 if its $119 sale price lasts all year, or $1,548 at the regular $129.",
      },
      {
        heading: "What causes the price to rise in month 2?",
        body:
          "Across the two tables, the jump comes from three places.<ul><li><strong>Promotions with no published end date.</strong> altRx and Medvi both show a struck-through regular price about double the current one. altRx has extended its promotion repeatedly, and our change log records two extensions in September alone, but extended so far is not permanent. Budget for the regular price and count promo months as savings.</li><li><strong>First-month discounts.</strong> SHED's 20% off covers month one only, which is the $159.20-to-$199 step in the table.</li><li><strong>Membership models.</strong> The providers in this index charge one all-in price, but brand-name routes often do not. <a href=\"/reviews/ro\">ro</a>, for example, sells the Zepbound KwikPen from $299 for the first month, then $399-449, plus a separate Body membership of $39 the first month and $74-$149 afterwards. Both line items rise after month 1. See <a href=\"/articles/zepbound-price-online\">Zepbound prices online</a> for the full brand picture.</li></ul>A simple test before paying: find the sentence that states the month-2 price. If the page has none, ask support and save the answer.",
      },
      {
        heading: "Should you prepay for a GLP-1 plan?",
        body:
          "Prepaying gets the lowest monthly figure in the table and removes the month-2 question, because the price cannot change once paid. It introduces a different risk: the money is spent whether or not shipments arrive and whether or not the medication suits you. Captured reviews across providers show both sides: the good version (a locked price that stayed locked) and the bad (a plan that renewed without warning, or shipments that stopped while charges continued). Before signing any prepaid or 12-month plan, read <a href=\"/articles/before-you-prepay-glp1\">the five questions to ask before you prepay</a>, which quotes those reviews. Our general advice: pay monthly for the first two or three cycles, see whether the provider ships on time and replies to messages, then decide whether a longer plan's discount is worth it.",
      },
      {
        heading: "How should you use these GLP-1 cost figures?",
        body:
          "Choose your drug, find the row whose <em>year one</em> total fits your budget, then check two things price cannot show:<ul><li><strong>Shipping reliability.</strong> The <a href=\"/glp1-shipping-times\">shipping-times page</a> compares each provider's promised delivery with what reviewers report.</li><li><strong>Support.</strong> The <a href=\"/glp1-provider-support\">provider-support comparison</a> measures from the same captured reviews whether someone answers when there is a problem.</li></ul>Our <a href=\"/cheapest-glp1\">cheapest GLP-1 ranking</a> and <a href=\"/how-to-choose-a-glp1-provider\">12-point provider checklist</a> cover everything else. All these treatments need a prescription from a licensed clinician, who decides whether and what to prescribe; this page covers cost, not medical suitability.",
      },
    ],
  },
  {
    slug: "before-you-prepay-glp1",
    title: "Prepaying for a GLP-1 Plan? Ask These 5 Questions First (2026)",
    description:
      "Prepaid and 12-month GLP-1 plans lower the monthly price but commit your money before shipments arrive. Five refund and billing questions to settle first.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    heroColor: "#F6F0EA",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "A prepaid plan gives you a lower monthly price and no month-2 surprise. The cost is that your money is committed before you know whether the provider ships on time or replies to messages.",
      "Complaints in captured Trustpilot reviews fall into five groups: charges before any clinician visit, plans that renewed without warning, cancellations that did not go through, financing companies that kept billing, and refunds that never arrived.",
      "Each of those can be turned into a question before you pay. If a provider will not answer in writing, choose monthly billing instead.",
      "Prepaid examples verified in our index: HealthRx bills $1,188 at checkout for twelve months; welludr's $49 price requires a 12-month plan; SHED's money-back guarantee depends on losing 5% in 120 days.",
    ],
    sections: [
      {
        heading: "Why do prepaid GLP-1 plans need extra scrutiny?",
        body:
          "The lowest prices in our <a href=\"/glp1-weight-loss-statistics\">price index</a> come from longer plans. welludr's $49 semaglutide requires a 12-month plan, and HealthRx's $99 is a $1,188 year paid at checkout. The savings are real. The same structure also produces a particular kind of one-star review, the kind that opens with \"I paid for a year\". So the useful question is not whether prepaying is good or bad, but what to confirm before you do it. Every quote below comes from reviews we captured on providers' claimed Trustpilot profiles, listed with the reviewer's first name, star rating and date; each appears on that provider's review page on this site.",
      },
      {
        heading: "Question 1: When will I be charged, and what will I have received by then?",
        body:
          "The first complaint in the chain is being billed before speaking to a clinician. Tracy, 2 stars, September 21, 2026, on ro: \"I was charged before I even talked to a physician about possible side effects/benefits.\" Deborah D., 1 star, September 11, 2026, on Medvi: \"I signed up for medication and was charged without ever having spoken to a medical professional.\"<br>Neither is unusual in telehealth. Approval often comes from a review of your form, and the charge follows approval. It does mean the first thing your money buys is a prescribing decision, not a consultation.<br><strong>Ask:</strong> is the charge taken at sign-up, at approval or at shipment, and what happens to it if the clinician does not prescribe? Better providers have a clear answer; bmiMD, for example, publishes a money-back guarantee if you are not approved.",
      },
      {
        heading: "Question 2: Is this a prepaid bundle, and what gets refunded if shipments stop?",
        body:
          "This question separates cheap from cheap-if-nothing-goes-wrong. Narine P., 5 stars, September 23, 2026, now a TrimRx customer, describing her previous provider: \"The company I used before charged me every month and never sent anything. Then a separate shipper billed me again for a package that never showed up. I'm still chasing that money.\"<br>On a monthly plan, that experience costs one month. On a prepaid year, it can cost the whole year.<br><strong>Ask in writing:</strong> if a shipment is more than two weeks late, what happens to that month's charge? If I stop treatment on medical advice, what is refunded? Where a guarantee exists, read its conditions; SHED's is \"lose 5% in 120 days or your money back\", which is specific but conditional. Where no refund policy is published, assume none exists.",
      },
      {
        heading: "Question 3: How do I cancel, and will I get confirmation in writing?",
        body:
          "Cancellation is where providers differ most, and the captured reviews show both ends.<br><strong>Done well, at welludr:</strong> adrienne A., 5 stars, October 4, 2026: \"The agent helped me cancel an old plan that was not showing active in my portal but was due to bill on 10/9. He also paused my plan due to a surplus of medication.\" T. H., 5 stars, October 3, 2026: \"Oliver, in customer service, assisted quickly with my request to cancel service.\"<br><strong>Done badly, at Medvi:</strong> Andy W., 1 star, September 22, 2026: \"I called and canceled. But they would not send me a cancellation email.\" Chris W., 4 stars, September 4, 2026, same provider: \"At first had a hard time canceling my monthly subscription, but they did finally get that taken care of.\"<br><strong>The test:</strong> can you cancel yourself inside the portal, and does the provider send a confirmation you can keep? If cancelling is phone-only with no confirmation, you are depending on their records instead of your own.",
      },
      {
        heading: "Question 4: Will the plan renew automatically, and will I be warned first?",
        body:
          "A 12-month plan that silently turns into a 24-month plan is the costliest surprise on this page. Margaret D., 1 star, September 1, 2026, on Medvi: \"Medvi promised GLP 1 medication for $179.00 monthly with a prepaid yearly subscription. Unfortunately the term was not a complete year. After just 11 shipments they renewed my subscription without any advance notice. They did not give me a choice.\"<br>We have not verified Medvi's current plan terms, and the price in that review differs from both the promotional and regular prices on Medvi's page today, so read it as one customer's experience rather than a description of the current plan.<br><strong>Ask any provider:</strong> what is the term, what triggers renewal, how many days' notice do you give, and can I turn off renewal in the portal now, before I need to?",
      },
      {
        heading: "Question 5: Is anyone else billing me, such as a financing company?",
        body:
          "Financing is the part people overlook. Several providers offer Buy Now, Pay Later (altRx lists it on its pricing page), and the financing company is a separate contract. George L., 2 stars, September 23, 2026, on TrimRx: \"The medication was not working for me, so I canceled my prescription but I am still receiving text and emails from Affirm saying they have not received cancellation from trim rx and is trying to continue charging me each month.\"<br>Cancelling the medication does not automatically cancel the loan, and the two companies may not coordinate. If you finance, get two confirmations.<br>If a provider's support is automated, weigh that before prepaying anything. Justin J., 1 star, September 14, 2026, on SHED: \"Continued to charge me for months after I stopped the medication. Exclusively AI customer support so don't expect any help. I was told to not expect a refund so I am having to go through my credit card company.\" Our <a href=\"/glp1-provider-support\">provider-support comparison</a> uses captured reviews to measure which providers respond, and how quickly.",
      },
      {
        heading: "What is the safest way to prepay for a GLP-1?",
        body:
          "Pay monthly for the first two or three cycles. During that time you learn three things no pricing page can tell you:<ul><li>Whether shipments arrive when promised (the <a href=\"/glp1-shipping-times\">shipping-times page</a> shows what reviewers report for each provider).</li><li>Whether a real person replies when you write.</li><li>Whether the medication suits you at all.</li></ul>Then, if the provider has earned it, switch to the longer plan and take the discount. The month-1-to-year-one figures for every provider are in <a href=\"/articles/glp1-true-cost-month-1-vs-year-one\">what you will really pay</a>, and the <a href=\"/how-to-choose-a-glp1-provider\">12-point provider checklist</a> covers everything beyond billing. A licensed clinician decides whether treatment is appropriate; this page is about protecting your money, not your prescription.",
      },
    ],
  },
  {
    slug: "what-100-to-200-a-month-gets-you-glp1",
    title: "GLP-1 on a $100-$200 Monthly Budget: What You Get (2026)",
    description:
      "Every verified GLP-1 option grouped by ongoing monthly price: under $100, $100-$150, $150-$200 and above, plus what each tier adds in shipping and support.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    heroColor: "#EEF5F0",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "At verified published prices, $100 a month covers compounded semaglutide from several licensed providers, $150 covers compounded tirzepatide from the lowest-priced ones, and $200 covers all-inclusive and coaching-led programs.",
      "Above $200 you are in brand-name territory: Lilly's Foundayo pill lists from $149 a month at the lowest dose to $349 at the highest, and brand injections start at roughly $1,150 a month cash at the providers we track.",
      "Within one tier, the same price buys different extras, such as 1-2 day cold-chain shipping, unlimited clinician check-ins, a dietician or a money-back guarantee, so use the tier as a starting filter.",
      "All figures come from our verified price index and are dated. Compounded products are not FDA-approved; brand-name products are.",
    ],
    sections: [
      {
        heading: "How are GLP-1 providers grouped into budget tiers here?",
        body:
          "Each provider is placed by its ongoing price, meaning the maintenance price at the dose you stay on rather than the first-month price, calculated the same way as our <a href=\"/articles/glp1-true-cost-month-1-vs-year-one\">month 1 vs year one</a> page using the <a href=\"/glp1-weight-loss-statistics\">price index</a>.<ul><li>Promotional prices are labelled, with the regular price shown alongside.</li><li>Prepaid plans appear as a monthly average with the checkout total.</li><li>Semaglutide and tirzepatide are listed separately, because one provider usually charges $30-$150 more for tirzepatide.</li></ul>Every option in the tiers is a compounded product: made by a licensed pharmacy from the same active ingredient as the brand drug, but not FDA-approved itself. <a href=\"/articles/compounded-semaglutide-vs-brand-name\">Compounded vs brand-name</a> explains the difference.",
      },
      {
        heading: "Which compounded semaglutide plans fit a $100-$200 monthly budget?",
        body:
          budgetList("semaglutide") +
          "What each tier buys beyond the medication:<ul><li><strong>Under $100:</strong> a choice between the lowest price on a 12-month commitment (welludr), month-to-month billing with 1-2 day cold-chain shipping (embody), a flat price with a brand-name shelf (altRx), and an all-inclusive promotion with dietician and coaching (Medvi, while the promotion lasts).</li><li><strong>$100-$150:</strong> adds DirectMeds' single flat price for either drug and TrimRx's unlimited provider check-ins.</li><li><strong>$150-$200:</strong> coaching-led programs with a money-back guarantee (SHED) and the all-inclusive regular price (Medvi).</li></ul>",
      },
      {
        heading: "Which compounded tirzepatide plans fit a $100-$200 monthly budget?",
        body:
          budgetList("tirzepatide") +
          "Most buyers say tirzepatide is the molecule they would choose if they could choose one, and the tiers move up to match:<ul><li><strong>Under $100:</strong> one option, on a 12-month plan.</li><li><strong>$100-$150:</strong> the real decision is embody's month-to-month price versus the flat-price providers.</li><li><strong>Above $150:</strong> the coaching-led and all-inclusive programs.</li></ul>The clinical case for one molecule over the other is in <a href=\"/articles/tirzepatide-vs-semaglutide\">tirzepatide vs semaglutide</a>, and the full tirzepatide ranking is in <a href=\"/articles/best-tirzepatide-online\">best tirzepatide online</a>.",
      },
      {
        heading: "What GLP-1 options cost more than $200 a month?",
        body:
          "Above the compounded tiers, the options change type as well as price.<ul><li><strong>Brand-name pills.</strong> Eli Lilly's Foundayo (orforglipron), FDA-approved in April 2026, is sold through LillyDirect at published self-pay prices of <a href=\"https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/\" target=\"_blank\" rel=\"noopener\">$149 a month at the lowest dose up to $349 at the highest</a>, or $25 for commercially insured patients using its savings card. ro sells the Wegovy pill from $149 for the first month, then up to $299, plus membership.</li><li><strong>Brand-name injections.</strong> At the providers we track, cash prices for Ozempic, Zepbound and Wegovy run from $1,149 to $1,799 a month; details are in <a href=\"/articles/zepbound-price-online\">Zepbound prices online</a>.</li><li><strong>Insurance and Medicare.</strong> Either can change brand-name costs completely: see <a href=\"/articles/lost-insurance-coverage-zepbound-wegovy\">options if you have, or have lost, coverage</a> and <a href=\"/articles/glp1-after-65-medicare\">Medicare's $50 option for people 65 and over</a>.</li></ul>",
      },
      {
        heading: "What can't any GLP-1 budget buy?",
        body:
          "Two things are off the table at every price on this page.<ul><li><strong>\"Research peptides\"</strong> sold online without a prescription for $10-$35 a month and labelled not for human use. They are not a cheaper tier but a different product category; <a href=\"/retatrutide-weight-loss\">our retatrutide page</a> explains why.</li><li><strong>A guarantee of results.</strong> Outcomes vary, side effects are real, and a licensed clinician decides whether you are a candidate in the first place. <a href=\"/articles/who-qualifies-for-glp1-weight-loss\">Who qualifies</a> covers the criteria.</li></ul>",
      },
      {
        heading: "How do you choose a GLP-1 provider within your budget tier?",
        body:
          "Once the price fits, the factors that decide whether you stay on treatment are ones a price cannot show: whether shipments arrive on time and whether someone answers your messages. We measure both from the same captured reviews on the <a href=\"/glp1-shipping-times\">shipping-times</a> and <a href=\"/glp1-provider-support\">provider-support</a> pages. Check both for the providers in your tier, and if the cheapest option is a longer plan, read the <a href=\"/articles/before-you-prepay-glp1\">five questions to ask before you prepay</a>.",
      },
    ],
  },
  {
    slug: "lost-insurance-coverage-zepbound-wegovy",
    title: "Lost Coverage for Zepbound or Wegovy? 5 Options in 2026",
    description:
      "If your plan stops covering Zepbound or Wegovy, five routes remain: appeal, a maker savings card, Medicare's $50 Bridge, brand cash online, or compounded.",
    category: "Guide",
    readTime: "8 min read",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    heroColor: "#F1EEF6",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "Losing coverage for a weight-loss GLP-1 happens often: many plans cover these drugs for diabetes but not weight management, and prior-authorization denials or formulary changes can arrive mid-treatment.",
      "Five routes are left. Appeal or re-authorize. Use the manufacturer's savings card or direct-pay price (Foundayo lists $149-$349 a month self-pay, or $25 with commercial insurance). On Medicare, the GLP-1 Bridge pilot charges a flat $50 a month for Wegovy, Zepbound KwikPen and Foundayo through December 2027. Pay cash for the brand drug through telehealth ($1,149-$1,799 a month at the providers we track). Or move to a compounded version at $49-$299 a month.",
      "Changing routes does not necessarily mean starting your dose over, but only a licensed clinician can carry a dose across, and compounded products are not FDA-approved.",
      "Prices are the providers' and manufacturers' own published figures at our last check; program rules change, so verify before deciding.",
    ],
    sections: [
      {
        heading: "Was your GLP-1 denied, or dropped from the formulary?",
        body:
          "These are two different problems with different fixes.<ul><li><strong>Prior-authorization denial:</strong> the drug is on your plan, but you did not meet its criteria (BMI thresholds, documented conditions, a prior program). Your prescriber can often appeal with stronger documentation.</li><li><strong>Formulary exclusion:</strong> your plan no longer covers the drug for weight management at all. No appeal fixes that; you need another route.</li><li><strong>A plan change at work or at the new year:</strong> treat it as an exclusion until shown otherwise.</li></ul>Our guide to <a href=\"/articles/glp1-with-insurance\">GLP-1s with insurance</a> covers reading a formulary and filing an appeal. The rest of this page is for when the answer stays no.",
      },
      {
        heading: "Can a manufacturer savings card or direct price replace insurance?",
        body:
          "Sometimes. Both manufacturers sell direct and publish prices. The clearest current example is Eli Lilly's Foundayo (orforglipron), the daily pill FDA-approved in April 2026. Through LillyDirect it lists <a href=\"https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/\" target=\"_blank\" rel=\"noopener\">$149 a month at the 0.8 mg starting dose, $199 at 2.5 mg, $299 at 5.5 and 9 mg, and $349 at 14.5 and 17.2 mg</a>, or $25 a month for commercially insured patients using its savings card, which can apply even when the plan itself refuses to pay. Zepbound and Wegovy also have savings cards with their own eligibility rules; we have not verified their current terms, so check each manufacturer's page. Buying direct still requires a prescription from a licensed clinician.",
      },
      {
        heading: "Can you get Zepbound or Wegovy for $50 on Medicare?",
        body:
          "Possibly, through the biggest change of 2026 for Medicare beneficiaries. The Medicare GLP-1 Bridge is a CMS pilot that <a href=\"https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know\" target=\"_blank\" rel=\"noopener\">runs from July 1, 2026 through December 31, 2027</a>. Eligible beneficiaries pay a flat $50 copay at the pharmacy for covered obesity drugs: the Wegovy pill and injection, the Zepbound KwikPen and Foundayo. The copay stays at $50 as the dose rises. Eligibility depends on clinical criteria and an approval step, and the program is explicitly temporary. Our <a href=\"/articles/glp1-after-65-medicare\">GLP-1s after 65</a> page covers what we could verify and what to ask CMS or your Part D plan.",
      },
      {
        heading: "How much is brand Zepbound or Wegovy for cash online?",
        body:
          "If you want to stay on the exact product you were prescribed, several online providers sell it for cash. At our last check:<ul><li><a href=\"/reviews/altrx\">altRx</a>: Zepbound $1,249 a month, Wegovy $1,579</li><li><a href=\"/reviews/wellmedr\">welludr</a>: Zepbound $1,599</li><li><a href=\"/reviews/sprout\">Sprout</a>: Wegovy $1,799</li><li><a href=\"/reviews/ro\">ro</a>: Zepbound KwikPen from $299 for the first month, then $399-449, plus a membership. Because ro bills the pen as its own line item, a plan that still covers it can pay its share.</li></ul>The full list, with what each route includes, is in <a href=\"/articles/zepbound-price-online\">Zepbound prices online</a>. This is the most expensive route on the page, and the only one where the product stays exactly the same.",
      },
      {
        heading: "Is switching to compounded semaglutide or tirzepatide a good idea?",
        body:
          "It is the route most people take after losing coverage, because the price gap is large: compounded semaglutide costs $49-$199 a month and compounded tirzepatide $89-$299 at the licensed providers in our <a href=\"/glp1-weight-loss-statistics\">price index</a>, against $1,149-$1,799 for the brand drugs. The trade-offs are just as large, and you should know them going in:<ul><li>A compounded product has the same active ingredient but is prepared by a pharmacy rather than manufactured as an approved drug.</li><li>It has no clinical trials of its own.</li><li>Insurance never covers it.</li><li>The FDA sent warning letters to dozens of telehealth companies in 2026 over how these products are marketed.</li></ul><a href=\"/articles/compounded-semaglutide-vs-brand-name\">Compounded vs brand-name</a> sets out the differences, and <a href=\"/articles/503a-vs-503b-pharmacy-28-day-rule\">503A vs 503B and the 28-day rule</a> explains how to check who actually makes the product.",
      },
      {
        heading: "Will you have to restart your dose if you change providers?",
        body:
          "Not necessarily. Restarting at the lowest dose after months of titration is the biggest worry for most people, but it is a clinical decision, not a provider policy. A licensed clinician at the new provider reviews your current dose and history, then decides whether to continue at that dose or step down; most telehealth intake forms ask for it. Bring your current prescription and the date of your last injection. Practical steps, including timing the switch so you do not run out, what to send and what to ask, are in <a href=\"/switch-from-ozempic\">switching from Ozempic or another GLP-1</a>. Do not fill the gap with an unregulated \"research peptide\" bought without a prescription; <a href=\"/retatrutide-weight-loss\">here is why</a>.",
      },
      {
        heading: "Which option should you try first after losing coverage?",
        body:
          "Work through them in order of cost to you:<ol><li>Appeal, if the drug is still on your formulary.</li><li>Check the manufacturer's savings card and direct price.</li><li>If you are on Medicare, apply for the $50 Bridge.</li><li>Choose between brand-name cash and a compounded switch, based on your budget and how you weigh the trade-offs.</li></ol>For the budget side, <a href=\"/articles/what-100-to-200-a-month-gets-you-glp1\">GLP-1 on a $100-$200 budget</a> sorts every verified option by ongoing price. None of this replaces your clinician's judgement about whether to continue treatment at all, and because prices and program rules here change often, every one is dated.",
      },
    ],
  },
  {
    slug: "503a-vs-503b-pharmacy-28-day-rule",
    title: "503A vs 503B Pharmacy and the 28-Day Rule for Compounded GLP-1s",
    description:
      "503A vs 503B pharmacies explained for compounded GLP-1s: what the end of the shortage changed, what the 28-day vial rule means, and 4 questions to vet a provider.",
    category: "Science",
    readTime: "8 min read",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    heroColor: "#EEF2F7",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "A 503A pharmacy compounds for a named patient on a prescription and is overseen by a state pharmacy board; a 503B outsourcing facility registers with and is inspected by the FDA and makes larger batches under manufacturing standards.",
      "Semaglutide and tirzepatide are off the FDA shortage list, which ended the bulk-compounding exemption. A legitimate compounded GLP-1 now comes from a licensed pharmacy filling a patient-specific prescription.",
      "The 28-day rule comes from sterile-compounding standards: an opened multi-dose vial is generally given a 28-day use period. That is why plans ship monthly, and why a vial meant to last much longer is a red flag.",
      "Ask every provider three things: the pharmacy's name and state license, whether it is 503A or 503B, and the vial's beyond-use date. The FDA warned dozens of telehealth companies over marketing claims in 2026; the pharmacy question is how you check the product itself.",
    ],
    sections: [
      {
        heading: "Why does the pharmacy matter more than the provider's website?",
        body:
          "Because the pharmacy decides what is actually in the vial. Every online GLP-1 provider combines three parts under one brand:<ul><li>A website.</li><li>Contracted clinicians who review your intake form.</li><li>A partner pharmacy that makes and ships the medication.</li></ul>The first two decide whether you get a prescription; the third decides the product. Experienced buyers ask about the pharmacy first, using terms like 503A, 503B, beyond-use date and the 28-day rule, which this page explains. You do not need a chemistry background, only the questions that have answers you can check.",
      },
      {
        heading: "What is a 503A compounding pharmacy?",
        body:
          "A 503A pharmacy is a traditional compounding pharmacy covered by Section 503A of the federal Food, Drug and Cosmetic Act. A licensed pharmacist prepares a medication for one named patient on a valid prescription.<ul><li>Licensing and inspection come from the state board of pharmacy.</li><li>It must follow the compounding standards published by the United States Pharmacopeia (USP).</li><li>It cannot make large batches ahead of time for general sale.</li></ul>When a telehealth provider says its medication comes from \"a licensed US 503A pharmacy\", this is what it means. Because each prescription is patient-specific, this model matches how online providers work. <a href=\"/reviews/embody\">embody</a>, for instance, names US-based 503A pharmacies and LegitScript certification on its site, and our <a href=\"/how-to-choose-a-glp1-provider\">12-point checklist</a> treats a named pharmacy as a core check.",
      },
      {
        heading: "What is a 503B outsourcing facility?",
        body:
          "A 503B outsourcing facility is the second category, created by Section 503B in 2013. These facilities register with the FDA, are inspected by the FDA, and must follow current good manufacturing practice, the same quality framework drug manufacturers use. In return they can compound larger batches without a prescription for each patient, usually to supply hospitals and clinics. During the 2022-2024 shortages of semaglutide and tirzepatide, both 503A pharmacies and 503B facilities were allowed to compound these drugs, which is how the compounded GLP-1 market grew so fast. Neither category produces an FDA-approved drug: a 503B product is made to manufacturing standards but remains a compounded product with no trials of its own.",
      },
      {
        heading: "How did the end of the GLP-1 shortage change compounding?",
        body:
          "The FDA removed tirzepatide and then semaglutide from its shortage list between late 2024 and early 2025. That closed the exemption that had allowed compounding of \"essentially a copy\" of a commercially available drug, and the standard rules returned: compounding must be for a specific patient on a valid prescription, with a clinical reason, through a 503A pharmacy, not bulk production of a Wegovy or Zepbound copy.<br>The FDA then turned to marketing. <a href=\"https://www.mondaq.com/unitedstates/healthcare/1814666/fda-takes-aim-at-misleading-online-claims-for-compounded-glp-1-drugs\" target=\"_blank\" rel=\"noopener\">Warning letters sent to telehealth companies in 2026</a> objected to products described as:<ul><li>\"generic\" Ozempic or Wegovy</li><li>containing \"the same active ingredient as\" the brand drug</li><li>coming from an \"FDA-approved pharmacy\" (the FDA approves drugs, not pharmacies)</li></ul>A provider using that language is telling you something about itself, whatever its pharmacy. A balanced explanation is in <a href=\"/articles/compounded-semaglutide-vs-brand-name\">compounded vs brand-name</a>.",
      },
      {
        heading: "What is the 28-day rule for compounded GLP-1 vials?",
        body:
          "The 28-day rule is the conventional limit for using an opened multi-dose vial: 28 days from the first puncture. Compounded GLP-1 injections usually come as a multi-dose vial you draw from each week, and sterile-compounding standards give every such preparation a <strong>beyond-use date</strong>, after which it should not be used. Two practical consequences follow:<ul><li><strong>Monthly shipping.</strong> Legitimate plans ship every four weeks because a one-month vial fits the rule. One captured welludr reviewer titled their complaint \"They charge you every 21 days\"; check that billing cadence and the vial's use period line up before you sign.</li><li><strong>Long-supply vials are a red flag.</strong> A vial sold as a three-month supply to draw from over 90 days is a warning sign, not a deal.</li></ul>The beyond-use date should be on the label. If it is not, ask the pharmacy, not the provider.",
      },
      {
        heading: "Which questions reveal a legitimate compounded GLP-1 provider?",
        body:
          "Four questions, each with an answer you can verify:<ol><li><strong>Which pharmacy fills my prescription, and where is it licensed?</strong> A legitimate provider names it, and you can confirm the license on that state board's website.</li><li><strong>Is the pharmacy 503A or 503B?</strong> Either can be legitimate; dodging the question is the warning sign.</li><li><strong>What is the vial's beyond-use date, and how is it shipped?</strong> Cold-chain shipping with a dated label is the norm. Our <a href=\"/glp1-shipping-times\">shipping-times page</a> records each provider's promise and what reviewers report.</li><li><strong>Who sets my dose?</strong> The right answer is that a licensed clinician reviews your history and prescribes. \"Guaranteed approval\" is the wrong answer.</li></ol>Providers that pass all four appear in our <a href=\"/cheapest-glp1\">verified ranking</a>, and the two we have examined most closely are covered in <a href=\"/articles/is-embody-legit\">is embody legit</a> and <a href=\"/articles/is-wellmedr-legit\">is welludr legit</a>. No pharmacy supplies an unapproved \"research peptide\" sold without a prescription; <a href=\"/retatrutide-weight-loss\">that is a separate market</a>. This article is general information about how compounding is regulated; a licensed clinician decides whether any treatment is appropriate for you.",
      },
    ],
  },
  {
    slug: "glp1-after-65-medicare",
    title: "GLP-1s After 65: Medicare's $50 GLP-1 Bridge Explained (2026)",
    description:
      "Medicare's GLP-1 Bridge pilot sets a flat $50 monthly copay for Wegovy, the Zepbound KwikPen and Foundayo through December 2027. Who qualifies, and cash options.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    heroColor: "#EEF4F1",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "Since July 1, 2026, a CMS pilot called the Medicare GLP-1 Bridge has let eligible beneficiaries get covered obesity drugs for a flat $50 monthly copay: the Wegovy pill and injection, the Zepbound KwikPen and the Foundayo pill. The copay does not change as the dose increases.",
      "The pilot is temporary and ends December 31, 2027; a longer-term program afterwards is possible but not guaranteed. Eligibility depends on clinical criteria and an approval step.",
      "Medicare does not cover compounded GLP-1s. If you do not qualify for the Bridge, your cash options match everyone else's: brand-name direct from the manufacturer or through telehealth, or a compounded version at $49-$299 a month.",
      "Older adults make up a large share of GLP-1 buyers, and muscle and bone concerns grow with age, which is a reason to use a clinician who monitors you rather than a form alone.",
    ],
    sections: [
      {
        heading: "What is the Medicare GLP-1 Bridge program?",
        body:
          "The Medicare GLP-1 Bridge is a pilot from the Centers for Medicare and Medicaid Services that lets eligible beneficiaries pay a flat $50 pharmacy copay for covered obesity drugs. It <a href=\"https://www.wlrn.org/npr-breaking-news/2026-05-06/some-medicare-beneficiaries-can-now-get-popular-obesity-drugs-for-50-a-month\" target=\"_blank\" rel=\"noopener\">began on July 1, 2026 and runs through December 31, 2027</a>.<ul><li><strong>Before 2026:</strong> Medicare Part D could cover a GLP-1 prescribed for diabetes, but not one prescribed for weight loss.</li><li><strong>Under the Bridge:</strong> the $50 does not rise with the dose, which is unusual, because dose increases are where cash prices climb.</li></ul>The name is literal: it is meant to bridge to a longer-term program that may or may not start in 2028.",
      },
      {
        heading: "Which GLP-1 drugs are covered by the Medicare Bridge?",
        body:
          "According to <a href=\"https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know\" target=\"_blank\" rel=\"noopener\">reporting on the program</a>, the pilot covers:<ul><li>The Wegovy pill and injection (semaglutide)</li><li>The Zepbound KwikPen (tirzepatide)</li><li>Foundayo (orforglipron), Eli Lilly's daily pill approved in April 2026</li></ul>It does not cover Ozempic or Mounjaro prescribed for weight loss (those are the diabetes labels of the same molecules), any compounded version of these drugs (Medicare, like every insurer, does not pay for compounded GLP-1s), or, as far as we can verify, any product outside that list. How the brand drugs differ is covered in <a href=\"/articles/zepbound-vs-wegovy-vs-ozempic\">Zepbound vs Wegovy vs Ozempic</a>, and the pill-or-injection choice in <a href=\"/glp1-pills-vs-injections\">GLP-1 pills vs injections</a>.",
      },
      {
        heading: "Who is eligible for the $50 Medicare copay?",
        body:
          "Eligibility is not automatic. The program applies clinical criteria and requires approval before the $50 copay applies at the counter. Published reporting mentions conditions tied to clinical guidelines and to what happens when the pilot ends, but we have not seen the full rules in a form we can verify, so we do not summarize them. CMS's own program page and your Part D plan are the right sources.<br><strong>Ask your Part D plan:</strong><ul><li>Am I eligible for the GLP-1 Bridge?</li><li>Which covered drugs are on your formulary under it?</li><li>What documentation does my prescriber need to submit for approval?</li></ul><strong>Ask your prescriber:</strong> which of the covered drugs suits me? That choice is <a href=\"/articles/who-qualifies-for-glp1-weight-loss\">based on your medical history</a>, not on price.",
      },
      {
        heading: "What can you do if you don't qualify for the Medicare Bridge?",
        body:
          "You use the same cash market as everyone else, which has two tiers.<ul><li><strong>Brand-name.</strong> Foundayo lists self-pay prices of <a href=\"https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/\" target=\"_blank\" rel=\"noopener\">$149 to $349 a month by dose through LillyDirect</a>. Brand injections cost $1,149-$1,799 a month at the telehealth providers we track, detailed in <a href=\"/articles/zepbound-price-online\">Zepbound prices online</a>.</li><li><strong>Compounded.</strong> Semaglutide from $49 and tirzepatide from $89 a month at verified published prices. The trade-offs (not FDA-approved, no trials of its own, never covered by insurance or Medicare) are explained in <a href=\"/articles/compounded-semaglutide-vs-brand-name\">compounded vs brand-name</a>.</li></ul><a href=\"/articles/what-100-to-200-a-month-gets-you-glp1\">GLP-1 on a $100-$200 budget</a> sorts every option by ongoing price.",
      },
      {
        heading: "How is GLP-1 treatment different for adults over 65?",
        body:
          "Two clinical points matter more with age.<ul><li><strong>Muscle and bone.</strong> Weight lost on a GLP-1 includes lean mass as well as fat, and protecting muscle and bone matters more as you get older. That argues for resistance exercise and enough protein from day one, and for a clinician who tracks more than the scale.</li><li><strong>Medication review.</strong> People typically take more medications at 65 than at 45, so interactions and existing conditions need a proper review.</li></ul><a href=\"/articles/glp1-weight-loss-over-40\">GLP-1 weight loss over 40</a> and <a href=\"/articles/exercise-while-on-glp1-medication\">exercise on a GLP-1</a> cover both. For an older adult, a provider offering a real clinician conversation and follow-up is worth more than the lowest row in a price table; our <a href=\"/glp1-provider-support\">provider-support comparison</a> shows from captured reviews which providers actually respond.",
      },
      {
        heading: "GLP-1s on Medicare: what to do first",
        body:
          "If you are on Medicare and considering a GLP-1 for weight, ask your Part D plan about the GLP-1 Bridge before comparing any other prices. $50 a month for a brand-name, FDA-approved drug is the lowest figure on this site for as long as the pilot runs. If you do not qualify, your cash options are the same as anyone's, and the <a href=\"/articles/glp1-true-cost-month-1-vs-year-one\">month 1 vs year one</a> page shows what each truly costs. Program rules and prices change, so everything here is dated and re-verified. A licensed clinician decides whether treatment is right for you; this page is about paying for it.",
      },
    ],
  },
  // Oct 9, 2026: the oral GLP-1 pair. ro's figures are its own published
  // prices (verified August 2026). Manufacturer direct-pay prices are quoted
  // from the dated sources linked inline and labelled as reported - the
  // NovoCare dose tiers in particular come from third-party trackers and are
  // flagged for operator verification, not stated as our own.
  {
    slug: "wegovy-pill-price-online",
    title: "Wegovy Pill Price Online (2026): $149 Month 1, Then $299",
    description:
      "Wegovy pill cost online: $149 the first month, then $299 plus membership at ro, reported NovoCare tiers, a $25 insurance offer and Medicare's $50 copay.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    heroColor: "#EDF2F8",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "The Wegovy pill (oral semaglutide 25 mg) received FDA approval in December 2025 as the first oral GLP-1 for chronic weight management. It needs a prescription, and its price depends on the route: telehealth, the manufacturer's direct-pay pharmacy, insurance or Medicare.",
      "Verified telehealth price: ro charges $149 for the first month of the Wegovy pill, then $299 a month, plus its Body membership ($39 the first month, then $74-$149 a month). ro bills the medication separately, so insurance can pay where your plan covers Wegovy.",
      "Third-party trackers report Novo Nordisk's direct-pay tiers at $149 a month for the starting dose, rising to $299 at the maintenance dose. We have not verified these ourselves; confirm with NovoCare before budgeting.",
      "With commercial insurance that covers Wegovy, the manufacturer's savings offer reportedly brings the pill as low as $25 a month. On Medicare, the GLP-1 Bridge pilot charges a flat $50 copay through December 2027. Compounded semaglutide, a different product that is not FDA-approved, costs $49-$199 a month at verified prices.",
    ],
    sections: [
      {
        heading: "How much is the Wegovy pill online?",
        body:
          'The Wegovy pill costs between $25 and about $1,349 a month depending on the route, with $149 the first month and $299 after at ro. ro\'s price is the only figure in this table we verified ourselves, from its published pricing in August 2026. Manufacturer figures are as reported by the dated sources linked in the last column. Novo Nordisk sells direct through NovoCare Pharmacy, and trackers disagree on one of the middle tiers, so confirm your dose\'s price with NovoCare before committing.<table><thead><tr><th>Route</th><th>Monthly price</th><th>Inclusions and conditions</th></tr></thead><tbody><tr><td><a href="/reviews/ro">ro</a> (telehealth, verified)</td><td><strong>$149</strong> first month, then <strong>$299</strong></td><td>Plus the ro Body membership: $39 the first month, then $74-$149 a month. Medication billed separately, so insurance can apply where covered</td></tr><tr><td>NovoCare Pharmacy self-pay (reported)</td><td><strong>$149</strong> starting dose, <strong>$299</strong> maintenance dose</td><td>According to <a href="https://www.noom.com/blog/weight-management/wegovy-pill-cost-with-and-without-insurance/" target="_blank" rel="noopener">third-party trackers</a>: $149 at 1.5 mg, $199 at 4 mg, $299 at 9 mg and 25 mg. Not verified by us</td></tr><tr><td>Commercial insurance plus savings offer (reported)</td><td><strong>as low as $25</strong></td><td>Your plan must cover Wegovy; maximum savings reported at <a href="https://www.singlecare.com/blog/can-you-really-get-wegovy-for-25/" target="_blank" rel="noopener">$100 per 30-day supply</a>; excludes Medicare, Medicaid and other government plans</td></tr><tr><td>Medicare GLP-1 Bridge</td><td><strong>$50</strong> flat copay</td><td>CMS pilot, <a href="https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know" target="_blank" rel="noopener">July 1, 2026 through December 31, 2027</a>; eligibility and approval through your Part D plan</td></tr><tr><td>Retail pharmacy, no discount (reported)</td><td><strong>about $1,349</strong></td><td>List price reported by third-party trackers; few people pay it, which is why the other routes exist</td></tr></tbody></table>Prices change as introductory offers end and tiers shift, so read every figure as "at our last check" and confirm at checkout.',
      },
      {
        heading: "Why does the Wegovy pill cost more after month 1?",
        body:
          "Because the dose rises. The Wegovy pill is taken once a day, started at a low dose and increased over the first months to the 25 mg maintenance dose used in the trials.<ul><li>The reported NovoCare tiers follow that ladder: the lowest price is for the starting dose, and $299 is for the dose you stay on.</li><li>ro's published structure shows the same pattern in two numbers, $149 for the first month and $299 after, with a membership added.</li></ul><strong>Year-one cost at ro's cash prices:</strong> roughly $4,300-$5,100 depending on membership tier, made up of $3,438 for medication plus $853-$1,678 for membership. Compare that figure with alternatives, not the $149. Our <a href=\"/articles/glp1-true-cost-month-1-vs-year-one\">month 1 vs year one</a> guide runs the same calculation for every provider we track.",
      },
      {
        heading: "Does insurance or Medicare cover the Wegovy pill?",
        body:
          "Often, and for many people these routes matter most.<ul><li><strong>Commercial insurance.</strong> If your plan covers Wegovy for weight management, the manufacturer's savings offer reportedly lowers the copay to as little as $25 a month, capped at $100 in savings per 30-day supply, for commercially insured US adults. Anyone on a government plan is excluded. Coverage itself is the hurdle: many plans still exclude weight-management GLP-1s or require prior authorization, so check your formulary first with <a href=\"/articles/glp1-with-insurance\">our insurance guide</a>. ro's route suits this case because it bills the pill as its own line item that a plan can pay toward.</li><li><strong>Medicare.</strong> Since July 1, 2026, the Medicare GLP-1 Bridge pilot has charged eligible beneficiaries a flat $50 copay for the Wegovy pill and injection, the Zepbound KwikPen and Foundayo, through December 31, 2027. The $50 does not rise with the dose. Eligibility depends on clinical criteria and an approval step through your Part D plan; <a href=\"/articles/glp1-after-65-medicare\">GLP-1s after 65</a> lists what to ask.</li></ul>",
      },
      {
        heading: "Is the Wegovy pill cheaper than the Wegovy injection?",
        body:
          "Not by much. At the maintenance dose, the two are priced closely on the telehealth route we verified.<ul><li><strong>ro:</strong> the Wegovy pen from $199 a month at introductory rates, then $299-$399 a month, against the pill's $149 then $299. The same membership applies to either.</li><li><strong>NovoCare direct-pay:</strong> trackers report the injection at <a href=\"https://www.middlewaynutrition.com/glp-1/novocare-pharmacy-wegovy\" target=\"_blank\" rel=\"noopener\">$349 a month</a>, with a lower introductory price on early fills. This is reported, not verified by us.</li></ul>So the choice is mostly not about price. In OASIS 4, the pill produced <a href=\"https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4\" target=\"_blank\" rel=\"noopener\">13.6% mean weight loss at 64 weeks versus 2.2% on placebo</a> in the analysis counting everyone randomized (16.6% among those who stayed on treatment), which the authors describe as similar to the weekly 2.4 mg injection in its own trial. The real difference is routine: a daily tablet on an empty stomach with a sip of water and a 30-minute wait before eating, versus one injection a week. <a href=\"/glp1-pills-vs-injections\">GLP-1 pills vs injections</a> compares them side by side.",
      },
      {
        heading: "Is the Wegovy pill worth the price compared with compounded semaglutide?",
        body:
          "They are different products, so compare value, not just price.<ul><li><strong>The Wegovy pill</strong> is Novo Nordisk's FDA-approved finished drug, backed by its own trial.</li><li><strong>Compounded semaglutide</strong> is the same molecule made by a licensed 503A pharmacy for an individual prescription. It is a legal, regulated channel, but the FDA does not review its output product by product, it has no trials of its own, and it is almost always an injection rather than a tablet.</li></ul>Verified compounded prices: <strong>$49 a month</strong> at <a href=\"/reviews/wellmedr\">welludr</a> on a 12-month plan, <strong>$69</strong> month to month at <a href=\"/reviews/embody\">embody</a>, <strong>$89</strong> flat at <a href=\"/reviews/altrx\">altRx</a> and <strong>$99</strong> all-inclusive at <a href=\"/reviews/medvi\">Medvi</a>, up to $199. At cash prices the first-year gap against the Wegovy pill is several thousand dollars. If insurance or Medicare applies, though, the brand pill at $25-$50 a month becomes the cheapest FDA-approved option on this site. The trade-offs are covered in <a href=\"/articles/compounded-semaglutide-vs-brand-name\">compounded vs brand-name</a>.",
      },
      {
        heading: "What is the cheapest way for you to get the Wegovy pill?",
        body:
          "Pick the line that matches your situation:<ul><li><strong>Commercial insurance covers Wegovy:</strong> use the savings offer through a route that bills the medication separately, such as ro or your own pharmacy, and expect $25 a month if the reported terms hold.</li><li><strong>On Medicare:</strong> ask your Part D plan about the GLP-1 Bridge before pricing anything else. A flat $50 beats every cash figure here.</li><li><strong>Paying cash for the FDA-approved pill:</strong> compare ro's $149 then $299 plus membership with NovoCare's reported tiers for your dose, and get the month-2 price in writing before paying.</li><li><strong>Paying cash, molecule matters more than label:</strong> compounded semaglutide from $49-$199 a month, with the caveats above.</li><li><strong>Needle-averse and open to a different pill:</strong> Eli Lilly's Foundayo lists $149-$349 a month self-pay and has no food or water timing rules. <a href=\"/articles/foundayo-vs-wegovy-pill\">Foundayo vs the Wegovy pill</a> compares the two.</li></ul>",
      },
      {
        heading: "Wegovy pill price: the summary",
        body:
          "In 2026, the Wegovy pill online costs <strong>$149 for the first month, then $299, plus membership at ro</strong>, the one figure here we verified. Novo Nordisk's direct-pay tiers are reported in the same $149-$299 range, the price can drop <strong>as low as $25 with commercial coverage</strong>, and it is <strong>$50 under Medicare's pilot</strong>. Those last two change the decision most, so check coverage first. Every route needs a prescription, and a licensed clinician decides whether semaglutide is appropriate for you. This article is general information, not medical advice.",
      },
    ],
  },
  {
    slug: "foundayo-vs-wegovy-pill",
    title: "Foundayo vs Wegovy Pill (2026): Weight Loss, Cost, Routine",
    description:
      "The two FDA-approved GLP-1 pills compared: 13.6% vs 11.2% trial weight loss, the empty-stomach rule, prices from $149, $25 insurance offers, Medicare's $50 copay.",
    category: "Guide",
    readTime: "8 min read",
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    heroColor: "#EEF4F1",
    author: "TopWeightLoss Team",
    keyTakeaways: [
      "Both are FDA-approved once-daily pills for chronic weight management: the Wegovy pill (oral semaglutide 25 mg, Novo Nordisk) since December 2025, and Foundayo (orforglipron, Eli Lilly) since April 1, 2026.",
      "In separate trials with no head-to-head comparison, the Wegovy pill produced 13.6% mean weight loss at 64 weeks (OASIS 4) and Foundayo 11.2% at the top dose over 72 weeks (ATTAIN-1), each against about 2% on placebo. Both companies also report higher on-treatment figures (16.6% and 12.4%).",
      "The day-to-day difference is the routine: the Wegovy pill must be taken on an empty stomach with a sip of water and a 30-minute wait before eating, while Foundayo can be taken at any time with no food or water rules.",
      "Price: Foundayo lists $149 to $349 a month self-pay by dose through LillyDirect, or $25 with commercial coverage. The Wegovy pill is $149 the first month then $299 plus membership at ro, with Novo Nordisk's reported direct tiers in a similar range and a $25 commercial savings offer. Both are included in Medicare's $50 GLP-1 Bridge.",
    ],
    sections: [
      {
        heading: "What is the difference between Foundayo and the Wegovy pill?",
        body:
          'Foundayo and the Wegovy pill are the first two GLP-1 pills approved for weight management, and they are different types of molecule.<ul><li><strong>The Wegovy pill</strong> is semaglutide, the same peptide as in the Wegovy and Ozempic injections, as a 25 mg once-daily tablet. The FDA approved it in <a href="https://www.healio.com/news/endocrinology/20260213/fda-approves-wegovy-pill-the-first-oral-glp1-to-treat-obesity" target="_blank" rel="noopener">December 2025</a> to reduce excess body weight and maintain the loss in adults with obesity, or with overweight plus a weight-related condition, and to lower cardiovascular risk in that group. Peptides are poorly absorbed from the gut, so the tablet carries a much higher dose than the 2.4 mg weekly injection and must be taken in a specific way.</li><li><strong>Foundayo</strong> is orforglipron, a small-molecule (non-peptide) GLP-1 receptor agonist from Eli Lilly. It was approved on <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program" target="_blank" rel="noopener">April 1, 2026</a> under the FDA\'s national priority voucher program, 50 days after filing. Being a small molecule is what allows it to be taken without food or water rules.</li></ul>Both need a prescription, and neither is a compounded product.',
      },
      {
        heading: "Does Foundayo or the Wegovy pill cause more weight loss?",
        body:
          'The Wegovy pill has the higher published trial result, but read the caveat first: the two drugs were tested in separate trials of different lengths and populations, and no head-to-head trial exists.<table><thead><tr><th>Trial</th><th>Drug and dose</th><th>Mean weight change</th><th>Lost 20% or more</th></tr></thead><tbody><tr><td><a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4" target="_blank" rel="noopener">OASIS 4</a> (64 weeks, 307 adults)</td><td>Wegovy pill, 25 mg daily</td><td><strong>-13.6%</strong> vs -2.2% placebo</td><td>30% vs 3%</td></tr><tr><td><a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/48/attain-1" target="_blank" rel="noopener">ATTAIN-1</a> (72 weeks, 3,127 adults)</td><td>Foundayo, 36 mg daily (top dose)</td><td><strong>-11.2%</strong> vs -2.1% placebo</td><td>19% vs 3%</td></tr></tbody></table>These figures come from the New England Journal of Medicine papers and count everyone randomized, whether or not they stayed on the drug. Each manufacturer also publishes an on-treatment figure, 16.6% for the Wegovy pill and 12.4% for Foundayo, describing people who took the pill as directed through the end. Both sets of numbers are quoted widely; they answer different questions rather than contradict each other.<br>Two more points of context: the OASIS 4 authors describe the pill\'s effect as similar to the weekly semaglutide injection in its own trial, and injectable tirzepatide (Zepbound) still holds the largest average loss of any GLP-1, up to 22.5% in SURMOUNT-1. <a href="/glp1-pills-vs-injections">Pills vs injections</a> covers that comparison.',
      },
      {
        heading: "How do you take Foundayo compared with the Wegovy pill?",
        body:
          "The daily routine is the difference most people will notice.<ul><li><strong>Wegovy pill:</strong> once daily on an empty stomach with a small sip of water, then about a 30-minute wait before eating, drinking or taking other medicines. The dose steps up over the first months from a 1.5 mg starting tablet to the 25 mg maintenance dose. Breaking the timing reduces absorption, which is why the rule exists.</li><li><strong>Foundayo:</strong> once daily at any time, with or without food or water, stepped up through 6 mg, 12 mg and 36 mg tablets.</li></ul>For anyone who takes morning medication, drinks coffee right after waking or simply does not want a timed routine, that flexibility is Foundayo's main advantage. Both are started low and increased under clinician supervision, and both are long-term treatments: in GLP-1 trials, weight comes back when the drug stops.",
      },
      {
        heading: "How much do Foundayo and the Wegovy pill cost?",
        body:
          'Their entry prices are about the same; the pricing structures differ. ro\'s figures are its own published prices, verified by us in August 2026. Manufacturer prices are as reported by the dated sources linked, and the NovoCare tiers in particular come from third-party trackers that do not fully agree, so confirm with NovoCare before budgeting.<table><thead><tr><th>Route</th><th>Foundayo</th><th>Wegovy pill</th></tr></thead><tbody><tr><td>Manufacturer direct, self-pay</td><td><strong>$149-$349</strong> a month by dose through LillyDirect, as reported by <a href="https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/" target="_blank" rel="noopener">Scientific American</a> from Lilly material</td><td><strong>$149-$299</strong> a month by dose through NovoCare Pharmacy, as reported by <a href="https://www.noom.com/blog/weight-management/wegovy-pill-cost-with-and-without-insurance/" target="_blank" rel="noopener">third-party trackers</a>; not verified by us</td></tr><tr><td>Telehealth (verified)</td><td>Lilly says Foundayo is available through LillyDirect and telehealth providers; no provider we track has published a price we could verify</td><td><a href="/reviews/ro">ro</a>: <strong>$149</strong> first month, then <strong>$299</strong>, plus membership ($39 first month, then $74-$149)</td></tr><tr><td>Commercial insurance with coverage</td><td><strong>$25</strong> a month with Lilly\'s savings card, per <a href="https://www.biospace.com/press-releases/foundayo-orforglipron-lillys-new-oral-glp-1-pill-for-weight-loss-now-available-in-the-u-s" target="_blank" rel="noopener">Lilly\'s April 9, 2026 release</a></td><td><strong>as low as $25</strong> a month with Novo Nordisk\'s savings offer, capped at $100 of savings per 30-day supply (reported)</td></tr><tr><td>Medicare GLP-1 Bridge</td><td><strong>$50</strong> flat copay, July 2026 to December 2027</td><td><strong>$50</strong> flat copay, July 2026 to December 2027</td></tr></tbody></table>The meaningful gap is at the top dose: Foundayo\'s reported ceiling is $349, the Wegovy pill\'s $299. A bigger factor is whether your insurance covers either one, because $25 beats both. <a href="/articles/wegovy-pill-price-online">Wegovy pill price online</a> covers the semaglutide side in full.',
      },
      {
        heading: "Are Foundayo and the Wegovy pill covered by insurance or Medicare?",
        body:
          "Both drugs fall under the same two programs.<ul><li><strong>Commercial insurance.</strong> Each manufacturer has a savings card for commercially insured patients whose plan covers the drug: Lilly's brings Foundayo to $25 a month, and Novo Nordisk's reportedly brings the Wegovy pill as low as $25. Neither card works with Medicare, Medicaid or other government plans. Coverage is the hurdle, since plans still vary widely on weight-management GLP-1s; <a href=\"/articles/glp1-with-insurance\">our insurance guide</a> shows how to check before choosing.</li><li><strong>Medicare.</strong> The Medicare GLP-1 Bridge, a CMS pilot running <a href=\"https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know\" target=\"_blank\" rel=\"noopener\">July 1, 2026 through December 31, 2027</a>, covers the Wegovy pill and injection, the Zepbound KwikPen and Foundayo at a flat $50 copay that does not rise with the dose.</li></ul>If you are on Medicare, whether you qualify for the Bridge matters more than anything else on this page; <a href=\"/articles/glp1-after-65-medicare\">GLP-1s after 65</a> lists what to ask your Part D plan.",
      },
      {
        heading: "What side effects do Foundayo and the Wegovy pill have?",
        body:
          "The same pattern as every GLP-1: mainly digestive, mainly early, and mainly during dose increases.<ul><li><strong>Wegovy pill (OASIS 4):</strong> gastrointestinal adverse events in 74% of participants versus 42% on placebo, led by nausea and diarrhea.</li><li><strong>Foundayo (ATTAIN-1):</strong> gastrointestinal events were also the most common and were typically mild to moderate.</li></ul>Neither trial found a safety signal outside the known class profile, which includes the standard GLP-1 warnings about thyroid C-cell tumors in rodents, pancreatitis and gallbladder disease. The dose and how gradually it is increased matter more than which pill you take, and a clinician managing titration is the biggest single factor in tolerating either. <a href=\"/articles/semaglutide-side-effects-guide\">Our semaglutide side-effects guide</a> covers what helps.",
      },
      {
        heading: "Should you take Foundayo or the Wegovy pill?",
        body:
          "Use the line that fits you:<ul><li><strong>Insurance covers one and not the other:</strong> take the covered one. At $25 a month, the price difference between them hardly matters.</li><li><strong>On Medicare:</strong> both are in the Bridge at $50, so choose on routine and results, not price.</li><li><strong>You want the larger trial result:</strong> the Wegovy pill, on published figures, keeping in mind that the trials are not directly comparable.</li><li><strong>You cannot keep an empty-stomach, 30-minute-wait routine every morning:</strong> Foundayo, which has no timing rules.</li><li><strong>Paying cash and want a verified telehealth route now:</strong> the Wegovy pill through ro is the route we have checked; for Foundayo, LillyDirect's published self-pay price is the benchmark.</li><li><strong>Needle-averse but price-driven:</strong> read <a href=\"/articles/what-100-to-200-a-month-gets-you-glp1\">GLP-1 on a $100-$200 budget</a> first, because compounded injections at $49-$199 cost far less than either pill at cash prices.</li></ul>Whichever you lean toward, the prescriber decides based on your history, not a table.",
      },
      {
        heading: "Foundayo vs the Wegovy pill: the summary",
        body:
          "Foundayo and the Wegovy pill are the two FDA-approved GLP-1 pills for weight management, and they divide neatly: <strong>the Wegovy pill has the larger published trial result</strong> (13.6% vs 11.2%, from different trials), and <strong>Foundayo has the simpler routine</strong> (no food or water timing). Prices overlap: $149 at the starting dose from either manufacturer as reported, $25 with commercial coverage and $50 under Medicare's pilot, with Foundayo's reported top-dose price $50 higher. ro's $149 then $299 plus membership is the one telehealth price here we have verified. Both are prescription medicines, and a licensed clinician decides whether either suits you. This article is general information, not medical advice.",
      },
    ],
  },
];
