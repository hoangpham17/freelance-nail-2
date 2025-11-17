import React from "react";
import { PromotionData } from "../../types";
import "./style.css";

interface PromotionProps {
  promotion?: PromotionData;
  promotionText: string;
  showCampaignBar: boolean;
  isCampaignDismissed: boolean;
  isPopupOpen: boolean;
  onCloseCampaign: () => void;
  onClosePopup: () => void;
}

const Promotion: React.FC<PromotionProps> = ({
  promotion,
  showCampaignBar,
  promotionText,
  isCampaignDismissed,
  isPopupOpen,
  onCloseCampaign,
  onClosePopup,
}) => {
  const campaignClassNames = [
    "campaign-block",
    "bg-black",
    showCampaignBar ? "" : "hide",
    isCampaignDismissed ? "close" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const imageSrc =
    promotion?.icon ||
    promotion?.image ||
    "/assets/images/Background/home-1.jpg";

  return (
    <>
      <div className={campaignClassNames} data-campaign>
        <div className="container">
          <div className="inner">
            <div className="campaign-block__content" id="campaign">
              <button
                className="campaign-block__btn-close"
                data-close-campaign
                onClick={onCloseCampaign}
                aria-label="Close campaign"
              >
                <img
                  src="/assets/images/Icons/icon-close-x.svg"
                  alt="Close"
                  className="icon"
                />
              </button>
              <div className="campaign-block__text" data-campaign-text>
                {promotionText}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div
          className="popup-modal popup-campaign"
          data-popup
          data-campaign-popup
        >
          <div
            className="overlay"
            data-popup-close
            onClick={onClosePopup}
          ></div>
          <div className="popup-inner">
            <button
              className="popup-btn-close"
              data-popup-close
              onClick={onClosePopup}
            >
              <img
                src="/assets/images/Icons/icon-close.svg"
                alt="Close promotion"
                className="icon"
              />
            </button>
            <div className="thumbail-wrapper inner-img">
              <img src={imageSrc} alt="Promotion" className="img" />
              <div className="popup-campaign__text">{promotionText}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Promotion;
