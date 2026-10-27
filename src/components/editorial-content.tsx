import Link from "next/link";

const tirzVsSemaRows: [string, string, string][] = [
  ["Average weight loss in trials", "About 15.0%-20.9% average loss at 72 weeks (SURMOUNT)", "About 14.9% mean loss at 68 weeks (STEP)"],
  ["FDA approval", "FDA-approved for chronic weight management as Zepbound® and for type 2 diabetes as Mounjaro®", "FDA-approved for chronic weight management as Wegovy® and for type 2 diabetes as Ozempic®"],
  ["Dosing", "Once-weekly injection", "Once-weekly injection"],
  ["Best suited to", "People aiming for the larger average weight loss seen in clinical trials, when clinically appropriate", "People who want an FDA-approved GLP-1 backed by extensive long-term safety and outcomes data"],
  ["Insurance coverage", "Not always covered by insurance yet", "Varies by insurer; may be listed on more formularies"],
];

const wegovyVsOzempicRows: [string, string, string][] = [
  ["Average weight loss in trials", "About 14.9% mean weight loss at 68 weeks in obesity trials (STEP-1)", "5-10% weight loss seen in type 2 diabetes trials, depending on dose"],
  ["FDA approval", "Yes, FDA-approved specifically for weight management", "FDA-approved for type 2 diabetes; use for weight loss is off-label"],
  ["Dosing", "Once-weekly injection", "Once-weekly injection"],
  ["Best suited to", "People who want an FDA-approved medication for long-term weight management", "People with diabetes who may also benefit from losing weight"],
  ["Insurance coverage", "Varies, and coverage for obesity medications is often limited", "Coverage may be broader when prescribed for diabetes"],
];

function ComparisonTable({ colA, colB, rows }: { colA: string; colB: string; rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">Factor</th>
            <th className="px-4 py-3 font-bold text-[#191919]">{colA}</th>
            <th className="px-4 py-3 font-bold text-[#191919]">{colB}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(([k, a, b], i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
              <td className="px-4 py-3 align-top font-medium text-[#191919]">{k}</td>
              <td className="px-4 py-3 align-top text-gray-600">{a}</td>
              <td className="px-4 py-3 align-top text-gray-600">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EditorialContent({ midSlot }: { midSlot?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-800">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Best GLP-1 Weight Loss Programs Online, Compared
      </h2>
      <p className="mb-4">
        The best online weight loss program is the one whose price, prescriber support and plan terms fit your situation; the medication is only one part of the choice. Top Weight Loss compares GLP-1 providers on monthly cost, clinical support, treatment plans, eligibility rules and long-term value, because these differ widely from one provider to the next. For a quick starting point, our{" "}
        <Link href="/find-your-match" className="font-semibold text-[#0C4B75] hover:underline">
          provider matching quiz
        </Link>{" "}
        recommends a program based on your answers.
      </p>
      <p className="mb-4">
        Each program in our ranking is assessed on medication access, affordability, prescriber support, customer experience and overall value. Our{" "}
        <Link href="/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          full provider reviews
        </Link>{" "}
        cover each program in detail, and head-to-heads such as{" "}
        <Link href="/compare/altrx-vs-embody" className="font-semibold text-[#0C4B75] hover:underline">
          altRx vs embody
        </Link>{" "}show two programs side by side. Want the evidence without scores? The{" "}
        <Link href="/glp1-provider-comparison" className="font-semibold text-[#0C4B75] hover:underline">
          GLP-1 provider comparison
        </Link>{" "}
        lines up eight providers on verified prices, Trustpilot patterns, Reddit experiences and cancellation terms, and the{" "}
        <Link href="/glp1-weight-loss-statistics" className="font-semibold text-[#0C4B75] hover:underline">
          GLP-1 price index
        </Link>{" "}
        keeps every verified price together with a public record of each change.
      </p>
      <p className="mb-8">
        The aim is simple: help you find the provider that matches your health goals, your budget and the way you want to be treated.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How Much Do Online GLP-1 Weight Loss Programs Cost in 2026?
      </h2>
      <p className="mb-4">
        Monthly prices in our ranking start at $49 for semaglutide and $89 for tirzepatide, both at
        welludr on its 12-month plan. Each figure below is the price published on the provider&apos;s
        own site, not an estimate. Most plans bundle the prescription, clinician consultations,
        ongoing support and home delivery into a single monthly fee.
      </p>
      <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[600px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-bold text-[#191919]">Provider</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Semaglutide</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Tirzepatide</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Pricing model</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ["welludr", "$49/mo", "$89/mo", "Best rate requires a 12-month plan"],
              ["embody", "$69/mo", "$119/mo", "Flat monthly price, no commitment"],
              ["altRx", "$89/mo", "$149/mo", "Same price at every dose, buy now pay later"],
              ["Medvi", "$99/mo promo (reg. $199)", "$166/mo promo (reg. $299)", "All-inclusive, with a dietitian"],
              ["HealthRx", "$99/mo", "from $179/mo", "Prepaid for 12 months"],
              ["DirectMeds", "$147/mo", "$147/mo", "Flat price, needle-free option"],
              ["Sprout", "$149/mo", "$199/mo", "Brand-name Wegovy also available"],
              ["TrimRx", "$149/mo at every dose", "$259/mo", "No contract"],
              ["SHED", "$199/mo", "$299/mo", "Results guarantee with money back"],
            ].map(([name, sema, tirz, model], i) => (
              <tr key={name} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
                <td className="px-4 py-3 align-top font-medium text-[#191919]">{name}</td>
                <td className="px-4 py-3 align-top text-gray-600">{sema}</td>
                <td className="px-4 py-3 align-top text-gray-600">{tirz}</td>
                <td className="px-4 py-3 align-top text-gray-600">{model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-8 text-[13.5px] text-gray-500">
        Prices as published and verified on October 16, 2026. Check current pricing on each provider&apos;s site before
        you sign up. For yearly totals and a closer look at the budget options, see the{" "}
        <Link href="/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
          cheapest verified GLP-1 comparison
        </Link>
        .
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How Do You Choose a GLP-1 Telehealth Provider?
      </h2>
      <p className="mb-3">
        Start with the one thing every legitimate online weight loss clinic has in common: a licensed
        clinician reviews your health intake before anything is prescribed. After that, five checks
        set the strongest telehealth weight loss providers apart:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>
          <strong>An all-inclusive price, published up front:</strong> a real monthly figure on the
          site, not a &quot;from&quot; price that climbs at checkout
        </li>
        <li>
          <strong>Genuine prescriber review:</strong> a licensed clinician, and a provider prepared
          to turn down treatment when it is not appropriate
        </li>
        <li>
          <strong>Clear pharmacy sourcing:</strong> US-licensed 503A compounding pharmacies that are
          named or can be verified
        </li>
        <li>
          <strong>Support you can reach:</strong> help with dose changes and side effects, and a
          real person to contact
        </li>
        <li>
          <strong>Shipping suited to the medication:</strong> tracked, insured and kept cold where
          required
        </li>
      </ul>
      <p className="mb-8">
        Our{" "}
        <Link href="/how-we-rank" className="font-semibold text-[#0C4B75] hover:underline">
          full ranking methodology
        </Link>{" "}
        shows how each check is scored. Short on time? The{" "}
        <Link href="/find-your-match" className="font-semibold text-[#0C4B75] hover:underline">
          60-second matching quiz
        </Link>{" "}
        factors in your budget and priorities, and our step-by-step{" "}
        <Link href="/articles/choosing-telehealth-weight-loss-provider" className="font-semibold text-[#0C4B75] hover:underline">
          guide to choosing a telehealth weight loss provider
        </Link>{" "}
        walks through the whole decision.
      </p>

      {/* Editorial callout */}
      <div className="mb-8 overflow-hidden rounded-xl bg-transparent">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 py-6 pr-6 sm:py-8 sm:pr-8">
            <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#0C4B75] sm:text-[20px]">
              What Should You Know Before Starting a GLP-1?
            </h3>
            <p className="mb-3 text-[16px] leading-[1.75] text-gray-600">
              GLP-1 medications need a prescription from a licensed clinician, and they are not right for everyone. Side effects can occur, most often during the first few weeks while the body adjusts.
            </p>
            <p className="mb-3 text-[16px] leading-[1.75] text-gray-600">
              These medications generally work best alongside everyday habits such as balanced eating and regular physical activity.
            </p>
            <p className="text-[16px] leading-[1.75] text-gray-600">
              For both safety and lasting results, choose a provider that screens you properly before prescribing and follows up with you throughout treatment.
            </p>
          </div>
          <div className="flex items-center justify-center sm:w-[260px] sm:shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/editorial-injection.png"
              alt="A woman getting a GLP-1 weight loss injection ready"
              className="h-[200px] w-full object-cover sm:h-full sm:rounded-r-xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        What Should You Weigh Before Picking a Program?
      </h2>
      <p className="mb-3">
        Six factors deserve a look before you commit to any weight loss provider. Our guide to{" "}
        <Link href="/articles/first-month-weight-loss-medication" className="font-semibold text-[#0C4B75] hover:underline">
          your first month on weight loss medication
        </Link>{" "}
        explains what to expect once you start:
      </p>
      <ul className="mb-8 list-disc space-y-1 pl-6">
        <li>Which medications are offered</li>
        <li>Who qualifies medically</li>
        <li>Possible side effects</li>
        <li>How much support the provider gives</li>
        <li>How flexible the plan is</li>
        <li>The total cost of treatment</li>
      </ul>
      <p className="mb-8">
        Side-by-side comparisons such as{" "}
        <Link href="/compare/altrx-vs-ro" className="font-semibold text-[#0C4B75] hover:underline">
          altRx vs ro
        </Link>,{" "}
        <Link href="/compare/altrx-vs-trimrx" className="font-semibold text-[#0C4B75] hover:underline">
          altRx vs TrimRx
        </Link>{" "}and{" "}
        <Link href="/compare/embody-vs-ro" className="font-semibold text-[#0C4B75] hover:underline">
          embody vs ro
        </Link>{" "}
        make the differences easier to see before you decide.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Which GLP-1 Medications Do Online Programs Prescribe?
      </h2>
      <p className="mb-3">
        Most online weight loss programs prescribe GLP-1 receptor agonists. The common options are listed below, and our explainer on{" "}
        <Link href="/articles/how-glp1-medications-work" className="font-semibold text-[#0C4B75] hover:underline">
          how GLP-1 medications work
        </Link>{" "}
        covers the mechanism in detail:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Semaglutide</li>
        <li>Tirzepatide</li>
        <li>Liraglutide</li>
      </ul>
      <p className="mb-8">
        Which medication you can get depends on where you live, your medical history and the provider&apos;s
        own policies. Would you rather avoid injections? Read our guide to{" "}
        <Link href="/weight-loss-pills" className="font-semibold text-[#0C4B75] hover:underline">
          weight loss pills
        </Link>.
      </p>

      {/* Mid-content slot - the product carousel lands here, mid-text below
          the ranking, without this static editorial knowing about catalogs. */}
      {midSlot && <div className="mb-8">{midSlot}</div>}

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        GLP-1 Weight Loss Medications by the Numbers (2026)
      </h2>
      <p className="mb-4">
        Published clinical trial data shows that GLP-1 medications are the most effective
        prescription weight loss treatments available today. The table sums up the headline
        results from the major trials.
      </p>

      {/* GEO-optimized comparison table */}
      <div className="mb-8 overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-bold text-[#191919]">Medication</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Average Weight Loss</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Trial Length</th>
              <th className="hidden sm:table-cell px-4 py-3 font-bold text-[#191919]">Compounded Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3 font-medium">Semaglutide (Wegovy)</td>
              <td className="px-4 py-3">~15% of body weight</td>
              <td className="px-4 py-3">68 weeks (STEP trials)</td>
              <td className="hidden sm:table-cell px-4 py-3">From $49/month</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 font-medium">Tirzepatide (Zepbound)</td>
              <td className="px-4 py-3">Up to 20.9% average (22.5% on treatment)</td>
              <td className="px-4 py-3">72 weeks (SURMOUNT trials)</td>
              <td className="hidden sm:table-cell px-4 py-3">From $89/month</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Liraglutide (Saxenda)</td>
              <td className="px-4 py-3">~5-8% of body weight</td>
              <td className="px-4 py-3">56 weeks</td>
              <td className="hidden sm:table-cell px-4 py-3">$1,300+/month (brand only)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-[13px] text-gray-400">
        Sources: published results of the STEP (semaglutide), SURMOUNT (tirzepatide) and SCALE (liraglutide)
        clinical trials. Individual results vary. Compounded prices reflect typical telehealth provider
        rates as of October 2026.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">
        Tirzepatide vs Semaglutide: How Do They Differ?
      </h3>
      <p className="mb-4">
        Tirzepatide produced greater average weight loss than semaglutide in clinical trials, and the two are
        the most effective GLP-1 medications for weight loss. Both are weekly injections that work in similar
        ways, but they differ in trial results, approvals and insurance coverage. Compare{" "}
        <Link href="/tirzepatide" className="font-semibold text-[#0C4B75] hover:underline">tirzepatide providers</Link>{" "}
        and{" "}
        <Link href="/semaglutide" className="font-semibold text-[#0C4B75] hover:underline">semaglutide providers</Link>{" "}
        to find the one that suits your goals.
      </p>
      <ComparisonTable colA="Tirzepatide" colB="Semaglutide" rows={tirzVsSemaRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">
        Wegovy vs Ozempic: What Is the Difference?
      </h3>
      <p className="mb-4">
        Wegovy and Ozempic contain the same drug, semaglutide; they differ in dose and approved use. Wegovy
        is made for weight management, while Ozempic was developed for type 2 diabetes and is often
        prescribed off-label for weight loss. Our{" "}
        <Link href="/wegovy-providers" className="font-semibold text-[#0C4B75] hover:underline">Wegovy providers</Link>{" "}
        and{" "}
        <Link href="/ozempic-for-weight-loss" className="font-semibold text-[#0C4B75] hover:underline">Ozempic for weight loss</Link>{" "}
        guides cover each one in more depth.
      </p>
      <ComparisonTable colA="Wegovy" colB="Ozempic" rows={wegovyVsOzempicRows} />
      <p className="mb-8 text-[13px] text-gray-400">
        Sources: STEP-1 (semaglutide) and SURMOUNT (tirzepatide) clinical trial data. Zepbound®, Mounjaro®,
        Wegovy® and Ozempic® are trademarks of their respective manufacturers. Individual results vary, and
        each of these medications requires a prescription from a licensed clinician.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        How Much Does GLP-1 Weight Loss Medication Cost?
      </h3>
      <p className="mb-3">
        Without insurance, brand-name GLP-1 medications cost $900-$1,400 a month at retail. Licensed
        telehealth providers offer compounded semaglutide and tirzepatide for much less, typically
        $49-$299 a month with physician consultations, medication and home delivery included. Our{" "}
        <Link href="/articles/glp1-cost-2026-how-to-pay-less" className="font-semibold text-[#0C4B75] hover:underline">
          GLP-1 cost guide
        </Link>{" "}breaks the numbers down.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        How Long Does GLP-1 Medication Take to Work?
      </h3>
      <p className="mb-3">
        Most people notice a smaller appetite within the first 1-2 weeks on a GLP-1 medication.
        Visible weight loss usually starts around weeks 4-8, and clinical trials recorded peak
        weight loss at 68-72 weeks of treatment. See our{" "}
        <Link href="/articles/how-long-for-semaglutide-to-work" className="font-semibold text-[#0C4B75] hover:underline">
          semaglutide timeline guide
        </Link>{" "}for more detail.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        Can You Get GLP-1 Medication Online?
      </h3>
      <p className="mb-8">
        Yes. Licensed telehealth providers can prescribe GLP-1 medications after a fully online
        medical evaluation, and it typically takes 1-5 days from sign-up to delivery. Every provider
        featured on Top Weight Loss uses licensed physicians to prescribe and includes ongoing medical
        oversight. Our{" "}
        <Link href="/articles/how-to-get-ozempic-online" className="font-semibold text-[#0C4B75] hover:underline">
          guide to getting GLP-1 medication online
        </Link>{" "}explains each step.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How Did We Evaluate These Providers?
      </h2>
      <p className="mb-3">Each provider&apos;s place in the ranking reflects six factors:</p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>How transparent the pricing is</li>
        <li>Which medications are available</li>
        <li>The level of clinical oversight</li>
        <li>Customer experience</li>
        <li>Plan flexibility</li>
        <li>Overall value</li>
      </ul>
      <p>
        Recommendations are reviewed and updated on an ongoing basis so you can{" "}
        <Link href="/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          compare weight loss providers
        </Link>{" "}
        with confidence. For more research, browse all of our{" "}
        <Link href="/articles" className="font-semibold text-[#0C4B75] hover:underline">
          weight loss guides and articles
        </Link>
        .
      </p>
    </div>
  );
}
