import clsx from "clsx";
import { Skeleton } from "antd";

interface AboutUsImageCollageProps {
  primaryImageUrl?: string;
  secondaryImageUrl?: string;
  isLoading?: boolean;
  className?: string;
}

const AboutUsImageCollage: React.FC<AboutUsImageCollageProps> = ({
  primaryImageUrl,
  secondaryImageUrl,
  isLoading = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        "relative w-full max-w-[413px] aspect-[413/524] shrink-0",
        className,
      )}
    >
      {/* Decorative outline — behind photos (Figma 70:201) */}
      <div
        className="absolute z-0 rounded-xl border-[3px] border-solid border-[#984121] pointer-events-none"
        style={{
          left: "29.06%",
          top: "24.24%",
          width: "60.29%",
          height: "62.40%",
        }}
        aria-hidden
      />

      {/* Soft shadow between stacks (Figma 70:203) */}
      <div
        className="absolute z-[1] rounded-xl bg-black/30 blur-[50px] pointer-events-none"
        style={{
          left: "29.06%",
          top: "34.92%",
          width: "47.46%",
          height: "44.08%",
        }}
        aria-hidden
      />

      {/* Primary image (Figma 70:202) */}
      <div
        className="absolute left-0 top-0 z-[2] overflow-hidden rounded-xl bg-[#252525]"
        style={{ width: "75.79%", height: "77.29%" }}
      >
        {isLoading ? (
          <Skeleton.Image active className="!w-full !h-full" />
        ) : (
          <div
            className="size-full bg-cover bg-center"
            style={{
              backgroundImage: primaryImageUrl
                ? `url('${primaryImageUrl}')`
                : "none",
            }}
            role="img"
            aria-label="Madison Nail Lounge"
          />
        )}
      </div>

      {/* Secondary image — overlaps primary, no border (Figma 70:204) */}
      <div
        className="absolute z-[3] overflow-hidden rounded-xl bg-[#252525]"
        style={{
          left: "36.56%",
          top: "41.22%",
          width: "63.44%",
          height: "58.78%",
        }}
      >
        {isLoading ? (
          <Skeleton.Image active className="!w-full !h-full" />
        ) : (
          <div
            className="size-full bg-cover bg-center"
            style={{
              backgroundImage: secondaryImageUrl
                ? `url('${secondaryImageUrl}')`
                : "none",
            }}
            role="img"
            aria-label="Madison Nail Lounge services"
          />
        )}
      </div>
    </div>
  );
};

export default AboutUsImageCollage;
