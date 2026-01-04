import { useMemo } from "react";
import { BannerItem, BannerRecord } from "../../types";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";

export const useBannerItems = (): {
  bannerItems: BannerItem[];
  loading: boolean;
} => {
  const { data: bannerRecords, loading } = useAirtable<BannerRecord>(
    AIRTABLE_ENDPOINTS.banner
  );

  const bannerItems: BannerItem[] = useMemo(() => {
    if (!bannerRecords || bannerRecords.length === 0) {
      return [];
    }

    return bannerRecords
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((record) => {
        const desktopUrl =
          Array.isArray(record.desktop) &&
          record.desktop.length > 0 &&
          record.desktop[0]?.url
            ? record.desktop[0].url
            : undefined;
        const mobileUrl =
          Array.isArray(record.mobile) &&
          record.mobile.length > 0 &&
          record.mobile[0]?.url
            ? record.mobile[0].url
            : undefined;
        const tabletUrl =
          Array.isArray(record.tablet) &&
          record.tablet.length > 0 &&
          record.tablet[0]?.url
            ? record.tablet[0].url
            : undefined;

        return {
          id: record.id,
          desktop: desktopUrl,
          mobile: mobileUrl,
          tablet: tabletUrl,
        };
      })
      .filter((item) => item.desktop || item.mobile || item.tablet);
  }, [bannerRecords]);

  return { bannerItems, loading };
};
