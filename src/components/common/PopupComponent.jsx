import React from "react";
import GuidePopup from "./../popups/GuidePopup";
import EventGifting from "./../popups/EventGifting";
import DetailsPopup from "./../popups/DetailsPopup";
import RecordsPopup from "./../popups/RecordsPopup";

function PopupComponent({ popup, close, language, tab1, tab2, tab3, tab4, loadMore, isLoading, gameRecord }) {
  return (
    <>
      <div className="overlay" style={{ visibility: popup.guide ? "visible" : "hidden" }}>
        {popup.guide ? <GuidePopup close={close} language={language} /> : null}
      </div>
      <div className="overlay" style={{ visibility: popup.eventGifting ? "visible" : "hidden" }}>
        {popup.eventGifting ? <EventGifting close={close} eventGifting={popup.eventGifting} /> : null}
      </div>
      <div className="overlay" style={{ visibility: popup.details ? "visible" : "hidden" }}>
        {popup.details ? <DetailsPopup close={close} tab1={tab1} tab2={tab2} tab3={tab3} tab4={tab4} /> : null}
      </div>
      <div className="overlay" style={{ visibility: popup.records ? "visible" : "hidden" }}>
        {popup.records ? (
          <RecordsPopup
            tab1={tab1}
            tab2={tab2}
            tab3={tab3}
            tab4={tab4}
            close={close}
            loadMore={loadMore}
            isLoading={isLoading}
            gameRecord={gameRecord}
          />
        ) : null}
      </div>
    </>
  );
}

export default PopupComponent;
