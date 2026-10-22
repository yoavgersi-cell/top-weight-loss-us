import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GLP-1 Provider Match Quiz: Find Your Best Fit (Free)",
  description:
    "Five short questions on your goal, budget, priorities and state, then a matched GLP-1 provider with verified prices. Free, no email needed.",
  alternates: {
    canonical: "https://www.topweightloss.us/find-your-match",
  },
  openGraph: {
    title: "GLP-1 Provider Match Quiz",
    description:
      "Answer five short questions and see which online GLP-1 provider fits your goal, budget and state.",
    url: "https://www.topweightloss.us/find-your-match",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">GLP-1 Provider Match Quiz</h1>
      {children}
    </>
  );
}
