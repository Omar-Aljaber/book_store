import React, { useEffect, useState, useRef } from "react";
import home_1 from "../style/imgs/home_1.jpg";
import home_2 from "../style/imgs/home_2.jpg";
import home_3 from "../style/imgs/home_3.jpg";
import pay_easy from "../style/imgs/pay_easy.png";
import fast_delivery from "../style/imgs/fast_delivery.svg";
import secure_payment from "../style/imgs/secure_payment.svg";
import best_deal from "../style/imgs/best_deal.png";
import { HEADER } from "../constants/Language_de";

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
const images = [home_1, home_2, home_3];
  const delay = 4000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
    
  // eslint-disable-next-line
  }, [index]);

  return (
    <main className="slideshow">
      <section
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="slide"
            alt=""
          />
        ))}
      </section>
      <section className="properties">
        <div className="block quick">
          <img src={fast_delivery} width={50} alt=""/>
          <div>{HEADER.DELIVERY}</div>
        </div>
        <div className="block">
          <img src={pay_easy} width={50} alt=""/>
          <div>{HEADER.PAY_EASY}</div>
        </div>
        <div className="block">
          <img src={best_deal} width={50} alt=""/>
          <div>{HEADER.BEST_DEAL}</div>
        </div>
        <div className="block">
          <img src={secure_payment} className="secure_payment" width={50} alt=""/>
          <div>{HEADER.PAYMENT}</div>
        </div>
      </section>

      {/* <section className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </section> */}
    </main>
  );
}

