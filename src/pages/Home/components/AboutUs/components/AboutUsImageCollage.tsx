import { Skeleton } from "antd";

/** Figma Home — About Us info frame (node 70:200) */
const COLLAGE_WIDTH = 413;
const COLLAGE_HEIGHT = 524;

interface AboutUsImageCollageProps {
  primaryImageUrl?: string;
  secondaryImageUrl?: string;
  isLoading?: boolean;
}

const AboutUsImageCollage: React.FC<AboutUsImageCollageProps> = ({
  primaryImageUrl,
  secondaryImageUrl,
  isLoading = false,
}) => {
  return (
    <div
      className="relative shrink-0 mx-auto lg:mx-0 scale-[0.82] lg:scale-90 xl:scale-100"
      style={{ width: COLLAGE_WIDTH, height: COLLAGE_HEIGHT }}
    >
      {/* Decorative outline — behind photos (Figma 70:201) */}
      <div
        className="absolute z-0 rounded-xl border-[3px] border-solid border-[#984121] pointer-events-none"
        style={{ left: 120, top: 127, width: 249, height: 327 }}
        aria-hidden
      />

      {/* Soft shadow between stacks (Figma 70:203) */}
      <div
        className="absolute z-[1] rounded-xl bg-black/30 blur-[50px] pointer-events-none"
        style={{ left: 120, top: 183, width: 196, height: 231 }}
        aria-hidden
      />

      {/* Primary image (Figma 70:202) */}
      <div
        className="absolute left-0 top-0 z-[2] overflow-hidden rounded-xl bg-[#252525]"
        style={{ width: 313, height: 405 }}
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
        style={{ left: 151, top: 216, width: 262, height: 308 }}
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
