import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { CONFETTI_LOTTIE_URL } from "../../constants";

const ConfettiLottie: React.FC = () => {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(CONFETTI_LOTTIE_URL)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, []);

  if (!animationData) return null;

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100%,177.78vh)] h-[max(100%,56.25vw)]"
        style={{ maxWidth: "none", maxHeight: "none" }}
      >
        <Lottie
          animationData={animationData}
          loop={false}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default ConfettiLottie;
