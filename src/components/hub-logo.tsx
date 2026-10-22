import { TopWeightLossWordmark } from "@/components/wordmark";

// Site logo for the header and footer. Kept as a component (rather than the
// wordmark inline) so a designed image lockup can replace it in one place.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HubLogo({ vertical }: { vertical?: string }) {
  return <TopWeightLossWordmark />;
}
