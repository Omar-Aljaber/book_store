import React from "react";
import logo from "../style/imgs/logo.png";
import whatsapp from "../style/imgs/icons/whatsapp.png";
import facebook from "../style/imgs/icons/facebook.png";
import instagram from "../style/imgs/icons/instagram.png";
import linkedin from "../style/imgs/icons/linkedin.png";
import youtube from "../style/imgs/icons/youtube.png";
import telegram from "../style/imgs/icons/telegram.png";
import { FOOTER } from "../constants/Language_de";
import { 
    WHATSAPP_URL, 
    FACEBOOK_URL, 
    INSTAGRAM_URL, 
    LINKEDIN_URL, 
    TELEGRAM_URL, 
    YOUTUBE_URL 
} from "../constants/Constants";

export default function Footer() {

    return (
        <footer>
            <img src={logo} alt="" width={350} />
            <div>{FOOTER.TEXT}</div>
            <div className="social-media">
                <a href={WHATSAPP_URL} target="_blank">
                    <img src={whatsapp} width={28} alt="whatsapp" />
                </a>
                <a href={FACEBOOK_URL} target="_blank">
                    <img src={facebook} width={28} alt="facebook" />
                </a>
                <a href={LINKEDIN_URL} target="_blank">
                    <img src={linkedin} width={28} alt="linkedin" />
                </a>
                <a href={INSTAGRAM_URL} target="_blank">
                    <img src={instagram} width={28} alt="instagram" /> 
                </a>
                <a href={YOUTUBE_URL} target="_blank">
                    <img src={youtube} width={28} alt="youtube" />
                </a>
                <a href={TELEGRAM_URL} target="_blank">
                    <img src={telegram} width={28} alt="telegram" />
                </a>
            </div>
            <div className="all-rights">{FOOTER.ALL_RIGHTS}</div>
        </footer>
    )
}
