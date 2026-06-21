import React from "react";
import { directUrl, googlemapUrl, salonAddress } from "./data";

const FooterLocationColumn: React.FC = () => {
  return (
    <div
      data-footer-location
      className="flex w-full flex-col gap-3 md:gap-4"
    >
      <h4 className="madison-footer-info__heading m-0 shrink-0">Location</h4>

      <div className="flex w-fit flex-col gap-3 md:gap-4">
        <a
          href={googlemapUrl}
          target="_blank"
          rel="noreferrer"
          className="madison-footer-info__address block w-fit shrink-0 whitespace-nowrap font-montserrat !text-[15px] !leading-snug text-[#e5e7eb] uppercase no-underline hover:text-madison-gold md:!text-[16px]"
        >
          {salonAddress}
        </a>

        <div className="relative w-full shrink-0">
          <a
            href={googlemapUrl}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-xl bg-madison-surface transition-opacity hover:opacity-90"
          >
            <div className="relative aspect-[1288/658] max-h-[150px] w-full lg:max-h-[170px]">
              <img
                src="/assets/images/Footer/map.jpg"
                alt="Madison Nail Lounge location"
                className="size-full object-cover"
              />
            </div>
          </a>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-3 pt-10">
            <a
              href={directUrl}
              target="_blank"
              rel="noreferrer"
              className="madison-footer-info__direction pointer-events-auto font-montserrat !text-[13px] !leading-snug text-[#e5e7eb] uppercase underline underline-offset-4 hover:text-madison-gold md:!text-[14px]"
            >
              Show Direction
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLocationColumn;
