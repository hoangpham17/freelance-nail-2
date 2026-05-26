import React from "react";
import { directUrl, googlemapUrl, salonAddress } from "./data";

const FooterLocationColumn: React.FC = () => {
  return (
    <div
      data-footer-location
      className="flex w-full flex-col gap-3 md:gap-4"
    >
      <h4 className="madison-footer-info__heading m-0 shrink-0">Location</h4>

      <a
        href={googlemapUrl}
        target="_blank"
        rel="noreferrer"
        className="madison-footer-info__address shrink-0 font-montserrat text-base leading-relaxed text-[#e5e7eb] uppercase no-underline hover:text-madison-gold md:text-lg"
      >
        {salonAddress}
      </a>

      <a
        href={directUrl}
        target="_blank"
        rel="noreferrer"
        className="madison-footer-info__direction shrink-0 font-montserrat text-base leading-relaxed text-[#e5e7eb] uppercase underline underline-offset-4 hover:text-madison-gold md:text-lg"
      >
        Show Direction
      </a>

      <a
        href={googlemapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-1 block w-full shrink-0 transition-opacity hover:opacity-90"
      >
        <div className="relative aspect-[1288/658] w-full max-h-[220px] overflow-hidden rounded-xl bg-madison-surface lg:max-h-[280px]">
          <img
            src="/assets/images/Footer/map.jpg"
            alt="Madison Nail Lounge location"
            className="size-full object-cover"
          />
        </div>
      </a>
    </div>
  );
};

export default FooterLocationColumn;
