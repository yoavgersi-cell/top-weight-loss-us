import { cn } from "@/lib/utils";

// Top Weight Loss logotype, set in text so it stays crisp at any size and
// needs no image asset: "TopWeight" in navy, "Loss" in blue and a smaller navy
// ".us". Scales with the wrapping font-size.
export function TopWeightLossWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-extrabold leading-none tracking-[-0.02em] text-[20px] sm:text-[23px]",
        className
      )}
    >
      <span className="text-[#0A1E3C]">TopWeight</span>
      <span className="text-[#3B7CE0]">Loss</span>
      <span className="ml-[0.06em] text-[0.58em] font-bold text-[#0A1E3C]">.us</span>
    </span>
  );
}
