import Link from "next/link";
import { ArrowBigUp, MessageSquare } from "lucide-react";

// ───── Verified Reddit community feedback ─────
// Single source of truth for real Reddit material, shared by the review pages
// (stacked thread layout) and the battle pages (carousel). Every field renders
// only when the source screenshot captured it - never estimated. Add a
// provider here only when real source material exists. All excerpts were
// captured against weight-loss offers, so callers gate rendering to that
// vertical.

export type RedditReply = { author: string; body: string };
export type RedditThread = {
  subreddit?: string; // "r/telehealth" - omit if the screenshot didn't show it
  author: string; // reddit username without the u/ prefix
  age?: string; // "6mo ago"
  title?: string; // post title; absent for standalone comments
  upvotes?: number; // only when visible in the source screenshot
  commentCount?: number; // only when visible in the source screenshot
  body: string[]; // real excerpt paragraphs
  replies?: RedditReply[];
  url?: string; // the thread's permalink, only when the operator supplied it
  topic?: string; // why the thread is on the page - derived from its content, e.g. "Fulfillment / pricing"
};

export const REDDIT_COMMUNITY_FEEDBACK: Record<
  string,
  // `themes`: a 1-2 sentence human summary of what keeps coming up in this
  // provider's threads - rendered as the "What we found" synthesis on battle
  // pages. Write it from the displayed threads only, good and bad alike.
  // `vertical`: the vertical the threads were captured for; entries without
  // one are the original weight-loss research. Render sites match it against
  // the page's vertical so an id collision can never surface the wrong data.
  { intro: string; threads: RedditThread[]; takeaway: string; themes?: string; vertical?: string }
> = {
  altrx: {
    themes:
      "Both r/tirzdeals threads describe the same altRx process: an asynchronous sign-up with no video visit, approval in about 4 hours to one day, a nurse practitioner's portal message listing the approved doses, and vials shipped in a cooler by UPS Next Day Air. One poster rated altRx 10/10; the other, who paid $780 for six months through AfterPay, called it 'probably the best deal I've seen.' The downsides come from the same threads: one customer had dehydration and arthritis-type pain from the compounded glycine/B12 blend that faded as levels dropped, a new signup still had no prescription a day after ordering, one cooler arrived with melted ice packs, and the six-month poster says the concern she sees most from others is protecting your payment method.",
    intro:
      "What do altRx customers say on Reddit? Most altRx discussion in GLP-1 forums centers on its first-month tirzepatide offers and the compounding pharmacies that fill them. Below, real users describe sign-up, approval, shipping and their first injections, including the problems they ran into.",
    threads: [
      // Operator-supplied screenshots, Oct 22, 2026 (r/tirzdeals, "3mo ago" as
      // displayed). Post and replies transcribed verbatim; the post's upvote
      // count was not in the capture, so it is omitted.
      {
        subreddit: "r/tirzdeals",
        author: "nurse-emc4527",
        topic: "Sign-up, approval and delivery",
        age: "3mo ago",
        title: "AltRx Experience :)",
        body: [
          "Okay, so I am new to GLP and was really just waiting to find a more affordable option to start and AltRx came up. I have never posted a Reddit thread until now and I felt the need to share my experience because I know there's a lot of negative reviews about this telehealth platform and wanted to give other people hope!! Lol. So I live in Ohio and everything was asynchronous meaning no video appointment was needed. I signed up and requested treatment 7/11 (chose 6 month option and paid with AfterPay with my first payment not being due until August which was great!! Total was $780 so payments with a little interest comes out to ~$140 a month for 6 months) and got approved next day 7/12. The NP sent a long message thru my portal including what she approved me for (three month supply of Tirz/b12 2.5 mg, 5 mg, and 7.5 mg increasing dose every 4 weeks from Evoluciona) and risks/benefits which I appreciated. After three months I am expected to check in and request a refill for another 3 months that I paid for. Anyway, I didn't get shipping notification until Friday that same week 7/17 and it was by UPS Next Day Air Saver. Being that it was the weekend, it arrived 7/20 which I'm not mad about because I've read that 3-day shipping is standard. I received my package in a cooler with ice packs which were melted and meds were room temperature but I'm assuming not for too long. Everything was well-packaged!! Placed them in the fridge right away and waiting until tonight to administer first dose! I'll continue posting my updates on this thread :)",
        ],
        replies: [
          {
            author: "Goats-n-Hens",
            body: "Yes, AltRX has been good to deal with every single time. I like them!!!",
          },
          {
            author: "nurse-emc4527",
            body: "I really hope I do well with it because, if so, I'm sticking with them! It's probably the best deal I've seen.",
          },
          {
            author: "Particular_Baby_2081",
            body: "Thank you for the update I'm thinking of placing an order but was worried.",
          },
          {
            author: "nurse-emc4527",
            body: "No I get it. I think the main concern I'm noticing from everyone with altrx is having to protect your payment method. Otherwise, I've had a great experience so far and I've read some good things about Evoluciona",
          },
        ],
      },
      {
        author: "Any_Style_4939",
        topic: "Delivery speed and first-month price",
        age: "3mo ago",
        title: "MY ALTRX EXPERIENCE!!",
        body: [
          "On June 1st I signed up with AltRX for their 1st month offer of $129. I was approved for highest dose of 15mg about 4 hours after filling out the form. I was prescribed Tirzepatide with Glycine & B12. It was sent to Strive Pharmacy the same day (Monday). Yesterday (Tuesday June 2) it shipped with UPS Next Day Air Delivery!! I received it this morning!! It came in a cooler with 4 frozen ice packs. I got 2 30mg vials for a total of 60mg!! The BUD on both is August 9, 2026. I'm so happy with this order!! I wish their monthly price was cheaper!! I give them a 10/10 for sure!!",
        ],
        replies: [
          {
            author: "Spawnofkitty",
            body: "Awww some strive i love that for you! Glad it went well 💪",
          },
          {
            author: "Western_Silver2004",
            body: "I placed an order with AltRX yesterday and got a message this morning saying that a medical provider was assigned. How long has it taken from this point? Still no updates",
          },
          {
            author: "Any_Style_4939",
            body: "I signed up June 1st Monday morning at 8am. Monday afternoon about 12:30pm I had a medical provider. Monday around 1-1:30pm my script was sent to the pharmacy. So for me everything took about 5 1/2 hours. My medication shipped out June 2nd Tuesday. It arrived the next day.",
          },
          {
            author: "IndicationBrave8817",
            body: "Tell me how you like Strive once you try them. I got the same deal from ALTRx! I tried my first shot the previous week and unfortunately for me it dehydrated me so bad even after having electrolytes & caused arthritis type of pains which went away as the medication levels dropped over the week. I was excited about Strive but looks like my body can't do additives! Would love to hear your experience with strive.",
          },
        ],
      },
    ],
    takeaway:
      "Reddit users mostly credit altRx with fast, careful fulfillment. Prescriptions arrived within hours or by the next day, a clinician's message spelled out the approved doses, and medication came cold-packed in a cooler with ice packs via UPS Next Day Air. One poster gave altRx a 10/10, and another, on a six-month AfterPay plan, called it 'probably the best deal I've seen.' The caveats are equally specific. One user reacted badly to the compounded additive blend (dehydration and joint pain that eased as levels dropped). One new signup was still waiting on a prescription a day after ordering. One cooler arrived with its ice packs melted. And protecting your payment method is the worry commenters raise most often. These are real, checkable accounts on both sides.",
  },
  embody: {
    themes:
      "Speed is the first pattern in these embody threads: same-day approval, a vial within one week, and a switcher whose order was approved the next day, shipped two days later and matched their previous dose. The second pattern is a self-serve model one user called 'autopilot,' which keeps the price low but leaves little human contact. The complaints are concrete: one user could not find the refill option in the dashboard, another said support replies read as AI-generated, and some waited between approval and the first shipment. The $129 price users cite is embody's regular tirzepatide price.",
    intro:
      "What do embody users say on Reddit? Recent Reddit comments back up embody's Trustpilot record and add blunt detail on approval speed, dosing and support. Every excerpt below comes from a real public comment:",
    threads: [
      {
        subreddit: "r/compoundedtirzepatide",
        url: "https://www.reddit.com/r/compoundedtirzepatide/comments/1utd6g7/has_anyone_tried_em_ie_embody_the_price_is_good/",
        author: "thegoldstandard55",
        topic: "Dose increases and clinician contact",
        age: "13d ago",
        upvotes: 4,
        body: [
          "Embody is great if you don't need to actually talk to anyone. But if you are okay getting the default and starting from the beginning they are great. I used to get Sema from OrderlyMeds and after 1 year and stalling and feeling not so well I quit, then over 5 months I balooned up 20. So I found embody and their new low price for triz and was okay with starting at the 2.5 (or slightly lower because of the b12).",
          "The med check was quick and I was approved same day, got my vial in just one week. Now 3 weeks in they bumped my dose to 5 (or 4.2) and shipped it out already. When I do the check in they will decide if I stick with 5 or go to 7.5 following month. But yeah if I wanted to get 10 from the start that may not have been possible. Everything is on autopilot, that's how they keep costs low.",
        ],
      },
      {
        subreddit: "r/compoundedtirzepatide",
        url: "https://www.reddit.com/r/compoundedtirzepatide/comments/1utd6g7/has_anyone_tried_em_ie_embody_the_price_is_good/",
        author: "MsButterflyStarr",
        topic: "Switching to embody and delivery",
        age: "6d ago",
        upvotes: 2,
        body: [
          "I just switched to Embody from NativeMed. I haven't received my scrip yet but the process has been good so far. I placed my order on Monday, dr approved it Tuesday, it shipped today (Thursday) and scheduled to arrive tomorrow. And they matched my last dosage.",
        ],
        replies: [
          {
            author: "dreamy-lover",
            body: "Hi, do you have an update you can share? I was planning on purchasing, but decided to look on Reddit first. Do they send the vial with liquid already mixed in? Also do they send needles?",
          },
          {
            author: "MsButterflyStarr",
            body: "They sent two small vials and 6 needles with alcohol wipes. Everything is ready to go, I just pull 98 units, so almost a full syringe (15mg)",
          },
        ],
      },
      {
        author: "Comfortable_Whole343",
        topic: "Price, refills and support",
        age: "2mo ago",
        upvotes: 5,
        body: [
          "I started about a month ago and so far so good. I think they revamped their program cause web med is sponsoring them from what I read. $129 for all levels of tri and no contract and I already moved up my dosages with no issues or kick back. They have been very prompt with responses and mail. My promotion also says if I lose nothing or not satisfied that refund is given.",
        ],
        replies: [
          {
            author: "ArtisticSalamander16",
            body: "How do you submit a refill. I just did my third shot and was told to reach out to them for my next fill once I hit the third. My dashboard doesn't show me a message option though or refill request option. So I'm confused.",
          },
          {
            author: "Comfortable_Whole343",
            body: "Try texting this number [support line] this is how I ask questions and complete my monthly check-ins for refills.",
          },
          {
            author: "Cherryvanillas",
            body: "You can email them [support address] or text [support line]. Let them know why you're reaching out and they'll help you from there. They've always been quick to respond to me and very kind and helpful. You can schedule appointments with providers through email or text too if you need your dose increased. There should be a monthly check in form in your portal as well that you fill out at the end of each month regarding how everything's going with your GLP1.",
          },
          {
            author: "Comfortable-Song8606",
            body: "The kind and helpful responses are AI. No ability to help. Just nice words like “I understand your frustration.”",
          },
        ],
      },
      {
        author: "SaltAvocado9500",
        topic: "Follow-up after the first dose",
        body: [
          "“Nurse called me today asking have I taken the shot and if yes have I experienced any symptoms.”",
          "Ordered on 8/6, medication delivered 8/14 - with a clinical follow-up call after the first dose.",
        ],
      },
      {
        author: "Next_Sector_7726",
        topic: "Delivery time",
        age: "6d ago",
        upvotes: 1,
        body: [
          "“I got Sema from Embody. I got my order within a week of being approved. They did overnight shipping.”",
        ],
      },
      {
        author: "Comfortable_Whole343",
        topic: "Flat price across doses",
        body: [
          "“$129 for all levels of tri and no contract - I already moved up my dosages with no issues or kick back.”",
        ],
      },
      {
        author: "LondyRocks",
        topic: "Shipping wait and price",
        body: [
          "“Arrived the next day from the pharmacy. Packaged nicely with ice packs.”",
          "Three vials at $129 each; the honest catch: about two weeks between approval and the medication actually shipping - transit itself was next-day.",
        ],
      },
      {
        author: "TheseFrosting6548",
        topic: "Pharmacy delay and billing",
        body: [
          "Order sat at the pharmacy for a couple of days - then, after a comment on embody's Facebook post: “they contacted me right away... rushed my order. I had it next day.”",
          "“They just billed for the 2nd month - the amount is correct.” Gripes: the pharmacy premixed an anti-nausea ingredient without asking, and the 50-unit doses were larger than expected.",
        ],
      },
      {
        author: "Maybee77",
        topic: "Overall verdict",
        body: ["“No complaints.”"],
      },
    ],
    takeaway:
      "Reddit and Trustpilot agree on embody: medication arrives quickly once it ships, dose increases go through without pushback, and the service is self-serve by design. As one user put it, 'everything is on autopilot, that's how they keep costs low'. The trade-offs follow from that model: little human contact, a refill process one user had to ask Reddit about, and a gap between approval and shipment. If timing matters, reorder well before your current supply runs out. The $129 figure Reddit users quote matches embody's regular tirzepatide price ($119 promotional / $129 regular).",
  },
  medvi: {
    themes:
      "These Medvi threads are full-year accounts rather than first impressions: steady results (just under 15% of body weight in one case, 40 pounds in another), a dose adjustment when progress stalled, and support that responded. The drawback the posters name themselves is the ongoing monthly cost.",
    intro:
      "What do Medvi patients say on Reddit after a full year? Alongside Medvi's 14,987 Trustpilot reviews, its most-upvoted recent Reddit threads are year-long write-ups, not first-week reactions. Excerpts from the actual posts:",
    threads: [
      {
        subreddit: "r/telehealth",
        author: "marlsygarlsy",
        topic: "Results, provider messaging and cost",
        age: "6mo ago",
        title: "Medvi GLP-1 telehealth experience breakdown",
        upvotes: 55,
        commentCount: 8,
        body: [
          "“Within a few days, I heard back from a licensed provider... Most of the communication happened through secure messaging.”",
          "“I did have some mild nausea when my dose increased, but it was manageable and improved after a short time... Around the middle of the year, progress slowed and I hit a plateau. I reached out through the messaging system, and my provider adjusted my dose, which helped me start moving again.”",
          "“After about 12 months, I had lost just under 15 percent of my starting body weight... There were a couple times where replies took longer than expected, but nothing major. The main factor to consider is cost since it is an ongoing monthly expense.”",
          "“It has not been effortless, but it has felt sustainable, which is something I had not experienced before.”",
        ],
        replies: [
          {
            author: "Canadian_Insulin",
            body: "“Clinically speaking, losing around 10 to 15 percent of starting body weight over a year is very much within the expected and healthy range for semaglutide treatment.”",
          },
        ],
      },
      {
        subreddit: "r/productreview",
        author: "External-Neck-7278",
        topic: "One-year results",
        age: "6mo ago",
        title: "My 2026 MEDVI review after using it for a full year",
        upvotes: 55,
        commentCount: 31,
        body: [
          "“The first thing I noticed was that my appetite felt different in a calm manageable way rather than feeling like I was constantly fighting hunger.”",
          "“Over the course of the year I lost just over 40 pounds and more importantly I've been able to maintain that loss without feeling burnt out.”",
          "“After a full year I'd say Medvi was worth it for me. Not because it was a miracle solution but because it helped make sustainable weight loss feel possible again.”",
        ],
        replies: [
          {
            author: "Decent_Feature_9060",
            body: "“medvi is the best triz provider i ever had (changed 3 providers so far)”",
          },
          {
            author: "DebuggingDave",
            body: "“I've been using Medvi too and the biggest thing for me was exactly what you said, it quieted the food noise instead of turning weight loss into a daily mental fight.”",
          },
        ],
      },
    ],
    takeaway:
      "Reddit tells the same story about Medvi as Trustpilot, from a longer view. The caveat the posters raise is the ongoing monthly cost, which Medvi's current $99/month semaglutide promotion (regularly $199) softens considerably. In exchange, the year-long accounts describe medical oversight, dose adjustments when progress stalled, and weight loss in the 10-15% range over a year that one poster called “sustainable, which is something I had not experienced before.” Individual results vary.",
  },
  ro: {
    themes:
      "Weight-loss numbers run through these ro threads, from 22 to 60 pounds, and starting treatment gets consistent praise. Cost is the recurring friction: the most-upvoted commenter left ro over price despite a great experience, another found the cost breakdown confusing, and a Zepbound user reported losing 1 pound in two months and called it expensive.",
    intro:
      "What do ro patients say on Reddit? Recent ro threads are full of concrete numbers: starting weights, pounds lost and what people actually pay. Excerpts from the real public comments:",
    threads: [
      {
        author: "Opposite_You3133",
        topic: "Results and price",
        age: "5mo ago",
        upvotes: 11,
        body: [
          "“I used Ro for 3 months and dropped 25 lbs. (sw: 180lbs) I personally had a great experience with Ro and they were seamless throughout the whole process.”",
          "“The pricing ended up being the deciding factor for me after those few months, I started with another provider and lost another 30 lbs... my other provider has been great and no shipping issues.”",
        ],
      },
      {
        author: "Upstairs_Procedure33",
        topic: "Results with Wegovy through insurance",
        age: "5mo ago",
        upvotes: 1,
        body: [
          "“I have been a member of Ro since Jan 2024, and I am loyal because they delivered what was promised and paid for. I've lost 50-60 lbs. I get my Wegovy shots through insurance and Walgreens.”",
        ],
      },
      {
        author: "Thick_Ad_2011",
        topic: "Three-month results",
        age: "5mo ago",
        body: ["“I've been on Ro for 3 months and have lost 22 pounds! Extremely happy!”"],
      },
      {
        author: "PrestigiousRest7476",
        topic: "Slow start and cost",
        age: "5mo ago",
        upvotes: 1,
        body: [
          "“I have been on Zepbound 2.5mg vials for two months. I've lost 1 pound. Just one... I'm taking my first 5mg dose today. Hopefully, things will start changing for me soon. It's been expensive and frustrating.”",
        ],
      },
      {
        author: "KitchenYam8596",
        topic: "Understanding the cost",
        age: "4mo ago",
        upvotes: 1,
        body: [
          "“My insurance no longer covers and I had a friend who has great success with Ro!... Could someone explain the cost breakdown to me? It's somewhat confusing.”",
        ],
      },
    ],
    takeaway:
      "ro's Reddit results are real and sizable, 22 to 60 pounds across the positive accounts, and the service itself draws little criticism. The friction is the same thing ro's own pricing pages show: a membership fee plus a separate medication cost. One highly upvoted commenter left over price after a great experience, and another called the cost breakdown \"somewhat confusing.\" ro works best for patients getting brand-name medication through insurance; if you are paying cash, run the numbers carefully first.",
  },
  wellmedr: {
    themes:
      "Most welludr comments here are short and positive: \"legit,\" a named pharmacy, annual plans at $88-$99/month in line with the published rates, and one long-term user paying $129 month to month. The exception is one detailed account of fast shipping and good service but almost no weight loss after 8 weeks.",
    intro:
      "What do welludr customers say on Reddit? welludr shows up in short, recent comments rather than long write-ups, mostly from people who bought annual plans. Excerpts from the real public comments:",
    threads: [
      {
        author: "GiraffeNo9896",
        topic: "Month-to-month price and pharmacy",
        age: "16d ago",
        upvotes: 1,
        body: [
          "“I love Wellmedr personally. Amazing results, paying $129 month to month been using them since April. Have tried a few others but always go back personally”",
          "Asked by a reply whether “the $129 the only thing you pay?”: “Yes”. Asked which pharmacy fills the orders: “Logos (503a)”.",
        ],
      },
      {
        author: "Fun-Violinist-6449",
        topic: "Pharmacy and annual price",
        age: "2mo ago",
        upvotes: 2,
        body: [
          "“They are legit with their pharmacy in Florida. I did a ton of research and ended up paying for a whole year at 88 a month. I am going on my 3rd month and so far they are great! I'm happy”",
        ],
      },
      {
        author: "Ok_Rub4064",
        topic: "Annual plan price",
        age: "11d ago",
        upvotes: 1,
        body: [
          "“I am seriously considering switching to Wellmedr. I can get a whole year for $99/month. That's the lowest I've seen.”",
        ],
      },
      {
        author: "Useful-Commercial-49",
        topic: "Switching providers and slow results",
        age: "4mo ago",
        upvotes: 1,
        body: [
          "“I received it right away. They kept me on the 15mg of Tirz I was already on. Very responsive customer service.”",
          "The honest catch, after leaving a previous provider (RemedyMeds) over refill delays: “I've been in it for 8 weeks and I'm only down 1 pound... I ordered a 6 month supply for $1143 from WellMedr trying to avoid the shipping delays of monthly refills but I'm currently looking for another company because I'm not wasting my time for no results.”",
        ],
      },
      {
        author: "Fun-Violinist-6449",
        topic: "Two months in",
        age: "2mo ago",
        upvotes: 2,
        body: [
          "“I have been with them 2 months and so far no complaints. I paid for a whole year.”",
        ],
      },
      {
        author: "GlippyApp",
        topic: "Feedback from other members",
        age: "16d ago",
        upvotes: 2,
        body: ["“We have some members using them and they like them.”"],
      },
      {
        author: "Professional_Tree843",
        topic: "Is welludr legit?",
        age: "1mo ago",
        upvotes: 1,
        body: ["“They are legit”"],
      },
    ],
    takeaway:
      "Reddit comments on welludr are mostly positive: users call it “legit,” name the pharmacy (one says Florida, another names Logos, a 503A compounder), and describe fast delivery and responsive service. The $88-$99/month that commenters paid on annual plans lines up with welludr's published pricing ($49/month semaglutide on the 12-month plan, $89/month tirzepatide). One long-term user pays $129 month to month and says that is the only charge. The counterpoint is a detailed account of losing just 1 pound in 8 weeks on tirzepatide despite good service. Response to GLP-1 medication varies from person to person, and no provider can guarantee results.",
  },
};

// A minimal Snoo-style mark drawn inline (no external assets) - used to give
// the community section an unmistakable Reddit identity.
export function RedditMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#FF4500" />
      <g fill="#fff">
        <ellipse cx="20" cy="23.5" rx="10.5" ry="7" />
        <circle cx="8.8" cy="21" r="2.6" />
        <circle cx="31.2" cy="21" r="2.6" />
        <circle cx="26.5" cy="9.5" r="2.2" />
        <path d="M20.6 16.9l1.2-6.6 5.3 1.1-.4 1.6-3.8-.8-1 5z" />
      </g>
      <g fill="#FF4500">
        <circle cx="15.8" cy="22.3" r="1.7" />
        <circle cx="24.2" cy="22.3" r="1.7" />
      </g>
      <path d="M15.5 26.6c1.3 1.1 2.8 1.6 4.5 1.6s3.2-.5 4.5-1.6" stroke="#FF4500" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ───── Reddit thread carousel (battle pages) ─────
// One thread per scroll-snap card, styled like the Reddit post it excerpts:
// r/ identity line, title, body excerpt, top reply, vote/comment footer. On a
// two-provider page each card is tagged with the provider it's about. Cards
// keep to the first two excerpt paragraphs - the full threads live on each
// provider's review page, which the section links to.

function ThreadCard({
  thread,
  providerName,
  reviewHref,
}: {
  thread: RedditThread;
  providerName: string;
  reviewHref: string;
}) {
  return (
    <div className="flex w-[320px] shrink-0 snap-start flex-col rounded-xl border border-gray-200 bg-[#FCFCFC] p-4 sm:w-[350px]">
      {/* Identity line - nowrap with a truncating author so the provider tag
          never drops to a second row on long usernames */}
      <div className="mb-2 flex items-center gap-x-1.5 text-[12px]">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D93A00] text-[10px] font-bold text-white">
          r/
        </span>
        <span className="shrink-0 font-bold text-[#191919]">{thread.subreddit ?? "Reddit"}</span>
        <span className="text-gray-400">·</span>
        <span className="min-w-0 truncate text-gray-500">u/{thread.author}</span>
        {thread.age && (
          <>
            <span className="text-gray-400">·</span>
            <span className="shrink-0 text-gray-500">{thread.age}</span>
          </>
        )}
        <span className="ml-auto shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10.5px] font-semibold text-gray-500">
          about {providerName}
        </span>
      </div>

      {thread.topic && (
        <p className="mb-2 text-[11.5px] text-gray-500">
          <span className="font-semibold text-[#191919]">Topic:</span> {thread.topic}
        </p>
      )}

      {thread.title && (
        <p className="mb-1.5 text-[14px] font-bold leading-snug text-[#191919]">{thread.title}</p>
      )}

      <div className="space-y-2">
        {thread.body.slice(0, 2).map((p, i) => (
          <p key={i} className="text-[13px] leading-relaxed text-gray-800">
            {p}
          </p>
        ))}
      </div>

      {thread.replies && thread.replies.length > 0 && (
        <div className="mt-3 border-l-2 border-gray-200 pl-3">
          <p className="text-[11.5px] font-semibold text-gray-500">u/{thread.replies[0].author}</p>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-gray-700">{thread.replies[0].body}</p>
        </div>
      )}

      {/* Footer - counts only when the screenshot captured them */}
      <div className="mt-auto flex items-center gap-4 pt-3 text-[12px] font-semibold text-gray-500">
        {typeof thread.upvotes === "number" && (
          <span className="flex items-center gap-1">
            <ArrowBigUp className="h-4 w-4 text-[#FF4500]" strokeWidth={2} />
            {thread.upvotes}
          </span>
        )}
        {typeof thread.commentCount === "number" && (
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" strokeWidth={2} />
            {thread.commentCount}
          </span>
        )}
        <span className="ml-auto flex items-center gap-3">
          {thread.url && (
            <a href={thread.url} target="_blank" rel="nofollow noopener" className="font-semibold text-gray-500 hover:underline">
              Source
            </a>
          )}
          <Link href={reviewHref} className="font-semibold text-[#0C4B75] hover:underline">
            All threads in our review
          </Link>
        </span>
      </div>
    </div>
  );
}

export function RedditThreadCarousel({
  providers,
  reviewHrefFor,
  title,
  intro,
}: {
  providers: { id: string; name: string }[];
  reviewHrefFor: (providerId: string) => string;
  /** Override the default "What Reddit says about X and Y" heading. */
  title?: string;
  /** Override the default one-line intro (e.g. with a methodology note). */
  intro?: React.ReactNode;
}) {
  const withData = providers.filter((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]);
  if (withData.length === 0) return null;

  // Interleave the providers' threads so both brands appear within the first
  // couple of cards instead of one provider's whole list running first.
  const lists = withData.map((p) =>
    REDDIT_COMMUNITY_FEEDBACK[p.id].threads.map((t) => ({ provider: p, thread: t }))
  );
  const cards: { provider: { id: string; name: string }; thread: RedditThread }[] = [];
  for (let i = 0; lists.some((l) => i < l.length); i++) {
    for (const l of lists) if (i < l.length) cards.push(l[i]);
  }
  const names = withData.map((p) => p.name).join(" and ");

  return (
    <div className="mb-14">
      <div className="mb-2 flex items-center gap-2.5">
        <RedditMark className="h-7 w-7 shrink-0" />
        <h2 className="text-[20px] font-bold text-[#191919]">{title ?? `What do Reddit users say about ${names}?`}</h2>
      </div>
      {intro ? (
        <div className="mb-5 max-w-[720px] text-[14.5px] leading-relaxed text-gray-700">{intro}</div>
      ) : (
        <p className="mb-5 max-w-[640px] text-[14.5px] leading-relaxed text-gray-700">
          Real public Reddit posts and comments, quoted in each user&rsquo;s own words, covering
          what went well and what did not.
          {withData.length < providers.length &&
            " Only providers with verified Reddit material are included, so some contenders do not appear."}
        </p>
      )}

      <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
        {cards.map(({ provider, thread }, i) => (
          <ThreadCard
            key={i}
            thread={thread}
            providerName={provider.name}
            reviewHref={reviewHrefFor(provider.id)}
          />
        ))}
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-gray-400">
        Excerpts come from public Reddit posts and are trimmed for length; vote and comment counts
        are as they stood when we reviewed each thread. Every post is one person&rsquo;s experience,
        so any weight-loss result mentioned is individual, not typical, and yours may differ. Reddit
        is a trademark of Reddit, Inc., which has no affiliation with Top Weight Loss.
      </p>
    </div>
  );
}
