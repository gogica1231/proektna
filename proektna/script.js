'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);



/**
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);





const googleTranslateConfig = {
   /* Original language */
   lang: "mk",
  
   
  };
  
  document.addEventListener("DOMContentLoaded", (event) => {
  
   let script = document.createElement("script");
   script.src = `//translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
   document.getElementsByTagName("head")[0].appendChild(script);
  });
  
  function TranslateWidgetIsLoaded() {
   TranslateInit(googleTranslateConfig);
  }
  
  function TranslateInit(config) {
   if (config.langFirstVisit && !Cookies.get("googtrans")) {
   TranslateCookieHandler("/auto/" + config.langFirstVisit);
   }
  
   let code = TranslateGetCode(config);

  TranslateHtmlHandler(code);
  
   if (code == config.lang) {
   TranslateCookieHandler(null, config.domain);
  }
  
   new google.translate.TranslateElement({
   pageLanguage: config.lang,
   });
  
   TranslateEventHandler("click", "[data-google-lang]", function (e) {
   TranslateCookieHandler(
   "/" + config.lang + "/" + e.getAttribute("data-google-lang"),
   config.domain
  );
   /* Reloading the page */
  window.location.reload();
   });
  }
  
  function TranslateGetCode(config) {
  
  let lang =
  Cookies.get("googtrans") != undefined && Cookies.get("googtrans") != "null"
  ? Cookies.get("googtrans")
  : config.lang;
   return lang.match(/(?!^\/)[^\/]*$/gm)[0];
  }
  
  function TranslateCookieHandler(val, domain) {
  
   Cookies.set("googtrans", val);
   Cookies.set("googtrans", val, {
  domain: "." + document.domain,
   });
  
   if (domain == "undefined") return;
  
   Cookies.set("googtrans", val, {
   domain: domain,
   });
  
   Cookies.set("googtrans", val, {
  domain: "." + domain,
   });
  }
  
  function TranslateEventHandler(event, selector, handler) {
   document.addEventListener(event, function (e) {
   let el = e.target.closest(selector);
   if (el) handler(el);
 });
  }
  
  function TranslateHtmlHandler(code) {
   /* We get the language to which we translate and produce the necessary manipulations with DOM */
   if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
   document
   .querySelector('[data-google-lang="' + code + '"]')
   .classList.add("language__img_active");
   }
  }