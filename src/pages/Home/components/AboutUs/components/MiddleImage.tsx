import { Skeleton } from "antd";

interface MiddleImageProps {
  imageUrl?: string;
  isLoading?: boolean;
}

const MiddleImage: React.FC<MiddleImageProps> = ({
  imageUrl,
  isLoading = false,
}) => {
  return (
    <div className="flex-1 flex justify-center w-full">
      <div className="w-full max-w-[400px] h-[350px] md:h-[450px] lg:h-[545px] rounded-t-[200px] rounded-b-2xl shadow-sm overflow-hidden group/img text-center bg-[#F5F5F5]">
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
    </div>
  );
};

export default MiddleImage;

