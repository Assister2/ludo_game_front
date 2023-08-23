import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../styles/style.css";

const SwipeableContainer = ({ is_open, handleGuide2 }) => {
  const handleClose = () => handleGuide2(false);
  return (
    <div className="partials">
      <Offcanvas
        className={"h-50"}
        show={is_open}
        onHide={handleClose}
        placement="bottom"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
            Updated Game Rules (from 12th June 2023)
          </Offcanvas.Title>
          {/* <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
            onClick={handleClose}
          ></button> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group mb-3">
            <li className="list-group-item text-start">
              यदि गेम Join करने के बाद Opponent का एक भी टोकन ओपन हो जाता है और
              आप किसी भी कारण से तुरंत लेफ्ट करते है तो आपको{" "}
              <span style={{ color: "red" }}>30% loss</span>
              कर दिया जायेगा ! यदि आप जान भुजकर Autoexit करते है तो भी आपको 100%
              Loss कर दिया जायेगा ! यदि दोनों प्लेयर में किसी की काटी खुली नहीं
              तो उसे हम कैंसिल कर सकते है
            </li>
            <li className="list-group-item text-start">
              यदि एक टोकन बाहर है और घर के पास है तो{" "}
              <span style={{ color: "red" }}>30% loss</span>
              दिया जायेगा लेकिन यदि गेम खेला गया है और 2 काटी बहार आयी हो तो गेम
              को लेफ्ट करने वाले को 100% Loss कर दिया जायेगा !
            </li>
            <li className="list-group-item text-start">
              Autoexit में यदि 1 टोकन बाहर है तो गेम कैंसिल किया जा सकता है
              लेकिन यदि आपने गेम जान भुजकर में छोड़ा होगा तो आपको Loss ही दिया
              जायेगा इसमें अंतिम निर्णय Admin का होगा !
            </li>
            <li className="list-group-item text-start">
              यदि आपको लगता है की Opponent ने जानभूझकर गेम को Autoexit में छोड़ा
              है लेकिन Admin ने कैंसिल कर दिया है तो आपसे वीडियो प्रूफ माँगा
              जायेगा इसलिए हर गेम को रिकॉर्ड करना जरुरी है ! यदि आप वीडियो प्रूफ
              नहीं देते है तो गेम रिजल्ट एडमिन के अनुसार ही अपडेट किया जायेगा
              चाहे आप विन हो या गेम कैंसिल हो !
            </li>
            <li className="list-group-item text-start">
              Game समाप्त होने के 15 मिनट के अंदर रिजल्ट डालना आवश्यक है अन्यथा
              Opponent के रिजल्ट के आधार पर गेम अपडेट कर दिया जायेगा चाहे आप
              जीते या हारे और इसमें पूरी ज़िम्मेदारी आपकी होगी इसमें बाद में कोई
              बदलाव नहीं किया जा सकता है !
            </li>
          </ul>

          <ul className="list-group mb-3">
            <li className="list-group-item text-start">
              Win होने के बाद आप गलत स्क्रीनशॉट डालते है तो गेम को सीधा Cancel
              कर दिया जायेगा इसलिए यदि आप स्क्रीनशॉट लेना भूल गए है तो पहले Live
              Chat में एडमिन को संपर्क करे उसके बाद ही उनके बताये अनुसार रिजल्ट
              पोस्ट करे !
            </li>
            <li className="list-group-item text-start">
              दोनों प्लेयर की टोकन (काटी) घर से बाहर न आयी हो तो लेफ्ट होकर गेम
              कैंसिल किया जा सकता है ! [कैंसिल प्रूफ करने के लिए वीडियो आवश्यक
              होगा]
            </li>
            <li className="list-group-item text-start">
              'कैंसिल' रिजल्ट डालने के बाद गेम प्ले करके जीत जाते है तो उसमे
              हमारी कोई ज़िम्मेदारी नहीं होगी अतः गेम कैंसिल करने के बाद स्टार्ट
              न करे अन्यथा वो कैंसिल ही माना जायेगा
            </li>
            <li className="list-group-item text-start">
              एक बार रिजल्ट डालने के बाद बदला नहीं जा सकता है इसलिए सोच समझकर
              रिजल्ट पोस्ट करे गलत रिजल्ट डालने पर पेनल्टी भी लगायी जाएगी चाहे
              आपने वो गलती से डाला हो या जान भुजकर !
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default SwipeableContainer;
