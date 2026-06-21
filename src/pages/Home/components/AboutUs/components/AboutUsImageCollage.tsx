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
        "relative w-full max-w-[640px] aspect-[480/520] shrink-0",
        className,
      )}
    >
      {/* Decorative outline — behind photos (Figma 70:201) */}
      <div
        className="about-collage-frame absolute z-0 rounded-xl border-[3px] border-solid pointer-events-none"
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
        style={{ width: "66%", height: "64%" }}
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
          left: "45%",
          top: "44%",
          width: "55%",
          height: "56%",
        }}
      >
        {isLoading ? (
          <Skeleton.Image active className="!w-full !h-full" />
        ) : (
          <div
            className="size-full bg-cover bg-center bg-no-repeat"
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
