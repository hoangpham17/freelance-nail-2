import { Flex, Skeleton } from "antd";
import clsx from "clsx";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

interface ImageCardProps {
  imageUrl?: string;
  note?: string;
  isLoading?: boolean;
  notePosition?: "top" | "bottom";
  align?: "start" | "end";
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  note,
  isLoading = false,
  notePosition = "bottom",
  align = "start",
}) => {
  const imageElement = (
    <div
      className={clsx(
        "w-full max-w-[545px] h-[220px] md:h-[300px] lg:h-[320px] rounded-2xl shadow-sm overflow-hidden group/img bg-[#F5F5F5]",
        align === "end" && "self-end",
      )}
    >
      {isLoading ? (
        <Skeleton.Image active className="!w-full !h-full" />
      ) : (
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover/img:scale-105"
          style={{
            backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
          }}
        />
      )}
    </div>
  );

  const noteElement = note && (
    <div
      dangerouslySetInnerHTML={{
        __html: parseAirtableRichtext(note),
      }}
      className={clsx(
        "text-[#8A6A4F] font-extralight",
        notePosition === "top" ? "mb-6" : "mt-6",
        align === "end" && "pr-4 text-right",
        responsiveFontSizeArray(14, 18),
      )}
    />
  );

  const skeletonElement = isLoading && (
    <div className={clsx(notePosition === "top" ? "mb-6" : "mt-6", align === "end" && "pr-4")}>
      <Skeleton
        active
        paragraph={{ rows: 2 }}
        title={false}
        className={align === "end" ? "text-right" : ""}
      />
    </div>
  );

  return (
    <Flex vertical className="flex-1 w-full" justify={align === "end" ? "end" : "start"}>
      {notePosition === "top" && (noteElement || skeletonElement)}
      {imageElement}
      {notePosition === "bottom" && (noteElement || skeletonElement)}
    </Flex>
  );
};

export default ImageCard;

