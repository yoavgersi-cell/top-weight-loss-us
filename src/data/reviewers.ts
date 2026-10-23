// ───── Medical reviewers ─────
// Code-authoritative reviewer profiles and the page review log. Lives in code,
// not the CMS blob, so a CMS save can never blank a byline, and so the same
// Person entity (same @id) is emitted on every page that names the reviewer.
//
// House rules:
//   - Every credential, degree and employer is as supplied by the reviewer.
//     Nothing is added, upgraded or inferred. No credential letters that the
//     person does not hold.
//   - A page says "reviewed" and emits `reviewedBy` / `lastReviewed` ONLY when
//     REVIEW_LOG has an entry for it. Pages without an entry name the site's
//     medical reviewer as staff - never as having reviewed that page.
//   - The byline wording is "Reviewed for medical accuracy by", not "Medically
//     reviewed by a doctor": our reviewer is a medical laboratory scientist
//     with an MPH, and the wording must not imply a prescribing clinician.

import { reviews as launchReviews } from "./reviews";
import { battles as launchBattles } from "./battles";
import { landingPages as launchLandingPages } from "./landing-pages";
import { articles as launchArticles } from "./articles";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";

export const HUB_ORIGIN = "https://www.topweightloss.us";

export interface ReviewerCredential {
  title: string;
  issuer: string;
  detail?: string;
}

export interface ReviewerEducation {
  degree: string;
  school: string;
  location?: string;
  detail: string;
}

export interface ReviewerExperienceGroup {
  area: string;
  items: string[];
}

export interface ReviewerWork {
  title: string;
  outlet: string;
  url: string;
}

export interface Reviewer {
  slug: string;
  /** Plain name, no suffixes. */
  name: string;
  /** Full legal/profile name when it differs from `name` (schema alternateName). */
  fullName?: string;
  /** Post-nominal letters, in display order. */
  credentials: string[];
  /** Role as shown in bylines and schema jobTitle. */
  jobTitle: string;
  /** One line under the name: what the person is, in plain words. */
  headline: string;
  /** 40-60 words, third person. */
  shortBio: string;
  /** Long bio, one paragraph per entry. */
  longBio: string[];
  image: { src: string; webp: string; thumb: string; width: number; height: number };
  licensure: ReviewerCredential[];
  education: ReviewerEducation[];
  experience: ReviewerExperienceGroup[];
  specialties: string[];
  selectedWork: ReviewerWork[];
  /** Public profile URLs (LinkedIn etc.). Only real, supplied URLs. */
  sameAs: string[];
  linkedin?: string;
  /** What this reviewer checks on a page, in the reviewer's scope statement. */
  scope: string;
  /** Verticals this reviewer covers. */
  verticals: string[];
  /** Month the reviewer joined, YYYY-MM. */
  since: string;
}

export const REVIEWERS: Reviewer[] = [
  {
    slug: "francheska-capistrano",
    name: "Francheska Capistrano",
    fullName: "Francheska Lynn Capistrano",
    credentials: ["RMT", "MPH"],
    jobTitle: "Medical Content Reviewer",
    headline: "Licensed Medical Laboratory Scientist (Registered Medical Technologist) and Master of Public Health graduate",
    shortBio:
      "Francheska Capistrano is a licensed Medical Laboratory Scientist with a Master of Public Health degree. She has coordinated international clinical trials, with a focus on protocol compliance, clinical documentation and data review, and writes and reviews evidence-based health content for patient and physician audiences.",
    longBio: [
      "Francheska Capistrano is a licensed Medical Laboratory Scientist (Registered Medical Technologist) with a Master of Public Health degree. She has experience coordinating international clinical trials, with a focus on protocol compliance, study documentation, protocol-related workflows and clinical research systems, and she is building experience in eSource implementation: translating trial protocols, schedules of events, assessments and documentation requirements into accurate, compliant electronic workflows.",
      "As a content curator for health, medical and wellness businesses, she translates evidence-based knowledge into accessible formats for wider audiences, with a particular interest in sleep science, sleep health and sleep hygiene. Her writing includes evidence-based health articles, patient education materials, research summaries and clinical research content. As a medical content reviewer, she combines scientific accuracy, critical appraisal and clear communication to ensure content is credible and easy to understand.",
      "At Top Weight Loss she reviews the medical and scientific statements in our guides, reviews and comparisons: how GLP-1 and other treatments work, what the cited trials and regulators actually say, and whether the terminology and claims match the evidence. She does not choose providers, set prices or rankings, or take part in commercial partnerships.",
    ],
    image: {
      src: "/reviewers/francheska-capistrano.jpg",
      webp: "/reviewers/francheska-capistrano.webp",
      thumb: "/reviewers/francheska-capistrano-160.webp",
      width: 800,
      height: 800,
    },
    licensure: [
      {
        title: "Licensed Medical Laboratory Scientist (Registered Medical Technologist)",
        issuer: "Professional licensure, Philippines",
        detail: "Formal training in clinical laboratory medicine, diagnostic testing, microbiology, hematology, immunology, clinical chemistry, pathology and disease processes.",
      },
    ],
    education: [
      {
        degree: "Master of Public Health (MPH)",
        school: "University of Essex",
        location: "United Kingdom",
        detail: "Advanced training in epidemiology, public health research, health promotion, biostatistics, disease prevention and evidence-based healthcare practice.",
      },
      {
        degree: "Bachelor of Science in Medical Laboratory Science",
        school: "Saint Louis University",
        location: "Baguio City, Philippines",
        detail: "Clinical laboratory medicine, diagnostic testing, microbiology, hematology, immunology, clinical chemistry and pathology.",
      },
    ],
    experience: [
      {
        area: "Clinical research",
        items: [
          "Supporting international clinical trials: protocol compliance monitoring, clinical documentation review, source data verification and data quality checks",
          "Clinical trial coordination, study documentation and protocol-related workflows in clinical research systems",
          "eSource implementation: translating protocols, schedules of events and assessments into compliant electronic workflows",
          "Regulatory and ethics documentation support; clinical data review and reconciliation",
          "Good Clinical Practice (GCP)-aligned research processes",
        ],
      },
      {
        area: "Medical writing and content review",
        items: [
          "Evidence-based health articles, patient education materials and clinical research summaries",
          "Content curation for health, medical and wellness businesses: translating evidence into accessible formats",
          "Medical blogs, healthcare content and SEO/AEO medical content",
          "Physician- and patient-facing educational materials",
        ],
      },
      {
        area: "Medical fact-checking and evidence appraisal",
        items: [
          "Evaluating health information for scientific accuracy, evidence alignment, clinical relevance and correct terminology",
          "Reviewing scientific literature, clinical studies and medical references to assess evidence quality and identify unsupported or outdated claims",
          "Consistency with published research and clinical guidelines; clear communication of complex concepts for general audiences",
        ],
      },
      {
        area: "Healthcare and digital health",
        items: [
          "Work with clinical research teams, telehealth platforms, digital health companies and healthcare content teams",
          "Collaboration with physicians, clinical researchers, healthcare providers, research coordinators and medical content teams",
        ],
      },
    ],
    specialties: [
      "Clinical trial coordination and GCP",
      "Clinical laboratory medicine",
      "Epidemiology and biostatistics",
      "Evidence appraisal and medical fact-checking",
      "Patient education and health communication",
      "Sleep science and sleep health",
    ],
    selectedWork: [
      { title: "The gap your recruitment forecast can't see", outlet: "83bar", url: "https://www.83bar.com/the-gap-your-recruitment-forecast-cant-see/" },
      { title: "Can AI accelerate patient recruitment?", outlet: "83bar", url: "https://www.83bar.com/can-ai-accelerate-patient-recruitment/" },
      { title: "Why are so many referrals lost before screening really begins?", outlet: "Antidote", url: "https://www.antidote.me/blog/why-are-so-many-referrals-lost-before-screening-really-begins" },
      { title: "Neurology enrollment: why sites miss dates even when willing patients are willing to enroll", outlet: "Antidote", url: "https://www.antidote.me/blog/neurology-enrollment-why-sites-miss-dates-even-if-willing-patients-are-willing-to-enroll" },
    ],
    sameAs: ["https://www.linkedin.com/in/francheskacapistrano/"],
    linkedin: "https://www.linkedin.com/in/francheskacapistrano/",
    scope:
      "Reviews the medical and scientific statements on a page: mechanism of action, clinical-trial figures, regulatory status, contraindications, side effects and terminology. Does not review prices, rankings, partner selection or provider descriptions, which are editorial.",
    verticals: ["weight-loss"],
    since: "2026-10",
  },
];

/** The reviewer named sitewide as the site's medical reviewer. */
export const SITE_REVIEWER_SLUG = "francheska-capistrano";

// ───── Review log ─────
// Keyed by the hub's content path (e.g. "/articles/is-medvi-legit").
// An entry means the named reviewer actually reviewed that page on that date.
// Add entries only when a review happened; never backfill dates.
export interface PageReview {
  reviewer: string; // Reviewer.slug
  reviewedAt: string; // YYYY-MM-DD
}

// Oct 22, 2026: Francheska Capistrano reviewed the medical and scientific
// statements across the launch content of topweightloss.us (operator-confirmed).
// The log covers every content page that exists in code at launch: the home
// ranking, provider reviews, comparisons, keyword landing pages, articles and
// the standalone guides. A page added later gets its own entry only when she
// signs it off; dates are never backfilled.
const LAUNCH_REVIEW_DATE = "2026-10-22";

const LAUNCH_STATIC_PATHS = [
  "/",
  "/reviews",
  "/articles",
  "/glp1-provider-support",
  "/glp1-shipping-times",
  "/glp1-price-changes",
  "/glp1-provider-comparison",
  "/weight-loss-pills",
  "/glp1-pills-vs-injections",
  "/retatrutide-weight-loss",
  "/ozempic-alternatives",
  "/cheapest-glp1",
  "/switch-from-ozempic",
  "/glp1-weight-loss-statistics",
  "/how-to-choose-a-glp1-provider",
  "/how-we-rank",
  "/compare",
];

const LAUNCH_REVIEWED_PATHS = [
  ...LAUNCH_STATIC_PATHS,
  ...launchReviews.map((r) => `/reviews/${r.slug}`),
  ...launchBattles.map((b) => `/compare/${b.slug}`),
  ...launchLandingPages.map((l) => `/${l.slug}`),
  ...THREE_WAY_COMPARISONS.map((t) => `/compare/${t.slug}`),
  ...launchArticles.map((a) => `/articles/${a.slug}`),
];

export const REVIEW_LOG: Record<string, PageReview> = Object.fromEntries(
  LAUNCH_REVIEWED_PATHS.map((p) => [p, { reviewer: "francheska-capistrano", reviewedAt: LAUNCH_REVIEW_DATE }]),
);

export function getReviewer(slug: string = SITE_REVIEWER_SLUG): Reviewer | undefined {
  return REVIEWERS.find((r) => r.slug === slug);
}

export function reviewerDisplayName(r: Reviewer): string {
  return r.credentials.length ? `${r.name}, ${r.credentials.join(", ")}` : r.name;
}

export function reviewerUrl(r: Reviewer): string {
  return `${HUB_ORIGIN}/reviewers/${r.slug}`;
}

export function reviewerPath(r: Reviewer): string {
  return `/reviewers/${r.slug}`;
}

/** Normalize a path for the log: strip origin, query, trailing slash. */
function logKey(path: string): string {
  let p = path.replace(/^https?:\/\/[^/]+/, "").split("?")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

export function getPageReview(path: string): (PageReview & { reviewerProfile: Reviewer }) | null {
  const entry = REVIEW_LOG[logKey(path)];
  if (!entry) return null;
  const reviewerProfile = getReviewer(entry.reviewer);
  if (!reviewerProfile) return null;
  return { ...entry, reviewerProfile };
}

/** Schema.org Person for a reviewer, with a stable @id reused on every page. */
export function reviewerPersonSchema(r: Reviewer) {
  const schema: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${reviewerUrl(r)}#person`,
    name: r.name,
    honorificSuffix: r.credentials.join(", "),
    jobTitle: r.jobTitle,
    description: r.shortBio,
    url: reviewerUrl(r),
    image: `${HUB_ORIGIN}${r.image.src}`,
    worksFor: { "@type": "Organization", name: "Top Weight Loss", url: HUB_ORIGIN },
    knowsAbout: r.specialties,
    alumniOf: r.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    hasCredential: [
      ...r.licensure.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: c.title,
        recognizedBy: { "@type": "Organization", name: c.issuer },
      })),
      ...r.education.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: e.degree,
        recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
      })),
    ],
  };
  if (r.fullName && r.fullName !== r.name) schema.alternateName = r.fullName;
  if (r.sameAs.length) schema.sameAs = r.sameAs;
  return schema;
}

/**
 * Schema fragment for a content page: `reviewedBy` + `lastReviewed` when the
 * page is in the review log, nothing otherwise. Spread into Article/WebPage.
 */
export function pageReviewSchema(path: string): Record<string, unknown> {
  const review = getPageReview(path);
  if (!review) return {};
  // A compact Person node (same @id as the profile page's full node) rather
  // than a bare @id reference: Google parses JSON-LD per page and does not
  // fetch the profile, so a reference alone carried no reviewer identity.
  const r = review.reviewerProfile;
  return {
    reviewedBy: {
      "@type": "Person",
      "@id": `${reviewerUrl(r)}#person`,
      name: r.name,
      honorificSuffix: r.credentials.join(", "),
      jobTitle: r.jobTitle,
      url: reviewerUrl(r),
      image: `${HUB_ORIGIN}${r.image.src}`,
      ...(r.sameAs.length && { sameAs: r.sameAs }),
    },
    lastReviewed: review.reviewedAt,
  };
}
