import React, {Fragment, useEffect, useRef} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/* Home page */
export const HomePage = () => {
  const DOM = {
    class: {
      transition: (element, name, duration, delay) => {
        const doTransition = () => {
          if(element.classList.contains(name)) {
            element.classList.remove(name);
          }

          element.classList.add(name)

          setTimeout(() => element.classList.remove(name), duration);
        }

        if(delay) {
          setTimeout(doTransition, delay);
        } else {
          doTransition();
        }
      }
    }
  }

  const N = {
    clamp: (min, value, max) => Math.min(Math.max(min, value), max)
  }

  const Transform = {
    rangify: (value, percent) => {
      const numerator = percent >= 0.5
        ? (percent - 0.5)
        : (0.5 - percent) * -1;

      const adjustedPercent = (numerator / 0.5);

      return value * adjustedPercent;
    }
  }

  const cardDisplay = useRef(null);

  // useEffect(() => {
  //   if (cardDisplay) {
  //     cardDisplay.current.onmousemove = e => {
  //       const rect = cardDisplay.current.getBoundingClientRect();
  //
  //       const mouseX = e.clientX - rect.left,
  //         mouseY = e.clientY - rect.top;
  //
  //       const xPercent = mouseX / rect.width,
  //         yPercent = mouseY / rect.height;
  //
  //       const xDeg = Transform.rangify(10, yPercent),
  //         yDeg = Transform.rangify(-10, xPercent);
  //
  //       cardDisplay.current.style.transform = `perspective(1200px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  //     };
  //
  //     cardDisplay.current.onmouseleave = e => {
  //       DOM.class.transition(cardDisplay.current, "transition", 500);
  //
  //       cardDisplay.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
  //     };
  //
  //   }
  // }, [cardDisplay]);

  const moveChef = (e, card) => {
    const cardRect = card.getBoundingClientRect();

    const chef = card.getElementsByClassName("card-chef")[0];

    const mouseX = e.clientX - cardRect.left,
      minX = chef.offsetWidth / 2,
      maxX = card.offsetWidth - (chef.offsetWidth * 1.5),
      translateX = N.clamp(minX, mouseX, maxX);

    chef.style.transform = `translateX(${translateX}px)`;
  }

  const releaseCard = element => {
    if(
      !element.classList.contains("selected") &&
      !element.classList.contains("chef-reappear")
    ) {
      DOM.class.transition(element, "selected", 1000);

      DOM.class.transition(element, "chef-reappear", 250, 1000);
    }
  }

  for(const card of document.querySelectorAll(".card-wrapper")) {
    if (card) {
      card.onmousemove = e => moveChef(e, card);

      card.onmouseup = () => releaseCard(card);
    }
  }

  return (
    <Fragment>
      <div id="card-display-background" className="background-image"></div>
      <div id="card-display" ref={cardDisplay}>
        <button className="card-wrapper" type="button">
          <div className="card">
            <div className="card-svgs">
              <svg className="svg svg-left" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F2F4F8"
                      d="M28.2,-44.5C36.5,-38.6,43,-30.6,41.6,-22.4C40.1,-14.1,30.6,-5.5,27.8,2.9C24.9,11.4,28.6,19.7,28.5,30.9C28.5,42.1,24.5,56.1,18.3,54.3C12.1,52.4,3.6,34.7,-7.9,29.9C-19.3,25.2,-33.7,33.4,-41.9,31.9C-50,30.4,-51.8,19,-54,7.5C-56.1,-4.1,-58.4,-15.9,-56.9,-28.7C-55.3,-41.5,-49.9,-55.3,-39.7,-60.3C-29.6,-65.4,-14.8,-61.6,-2.4,-57.9C10,-54.1,20,-50.3,28.2,-44.5Z"
                      transform="translate(100 100)"/>
              </svg>
              <svg className="svg svg-right" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F2F4F8"
                      d="M26.4,-42.2C35.7,-35.1,45.9,-30.3,57.4,-21.4C69,-12.5,82,0.6,83.7,14.4C85.4,28.2,75.8,42.8,63.3,52C50.9,61.3,35.6,65.2,21.7,65.3C7.8,65.4,-4.6,61.7,-12.2,53.9C-19.8,46,-22.7,34.1,-29.7,25.8C-36.7,17.5,-47.9,13,-50,6.4C-52.1,-0.1,-45.2,-8.8,-40.7,-18.6C-36.3,-28.5,-34.4,-39.6,-28.1,-48C-21.7,-56.4,-10.8,-62.2,-1.2,-60.4C8.5,-58.6,17.1,-49.2,26.4,-42.2Z"
                      transform="translate(100 100)"/>
              </svg>
            </div>
            <span className="card-amount roboto-mono">Figma</span>

            {/*<FontAwesomeIcon  icon="fa-sharp fa-solid fa-fork-knife" />*/}
            <svg viewBox="0 0 512 512" className="card-brand" width="25px" height="25px" fill="#fff">
              <path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/>
            </svg>
            <svg viewBox="0 0 384 512" className="card-icon" width="120px" height="120px" fill="#fff">
              <path d="M14 95.7924C14 42.8877 56.8878 0 109.793 0H274.161C327.066 0 369.954 42.8877 369.954 95.7924C369.954 129.292 352.758 158.776 326.711 175.897C352.758 193.019 369.954 222.502 369.954 256.002C369.954 308.907 327.066 351.795 274.161 351.795H272.081C247.279 351.795 224.678 342.369 207.666 326.904V415.167C207.666 468.777 163.657 512 110.309 512C57.5361 512 14 469.243 14 416.207C14 382.709 31.1945 353.227 57.2392 336.105C31.1945 318.983 14 289.5 14 256.002C14 222.502 31.196 193.019 57.2425 175.897C31.196 158.776 14 129.292 14 95.7924ZM176.288 191.587H109.793C74.2172 191.587 45.3778 220.427 45.3778 256.002C45.3778 291.44 73.9948 320.194 109.381 320.416C109.518 320.415 109.655 320.415 109.793 320.415H176.288V191.587ZM207.666 256.002C207.666 291.577 236.505 320.417 272.081 320.417H274.161C309.737 320.417 338.576 291.577 338.576 256.002C338.576 220.427 309.737 191.587 274.161 191.587H272.081C236.505 191.587 207.666 220.427 207.666 256.002ZM109.793 351.795C109.655 351.795 109.518 351.794 109.381 351.794C73.9948 352.015 45.3778 380.769 45.3778 416.207C45.3778 451.652 74.6025 480.622 110.309 480.622C146.591 480.622 176.288 451.186 176.288 415.167V351.795H109.793ZM109.793 31.3778C74.2172 31.3778 45.3778 60.2173 45.3778 95.7924C45.3778 131.368 74.2172 160.207 109.793 160.207H176.288V31.3778H109.793ZM207.666 160.207H274.161C309.737 160.207 338.576 131.368 338.576 95.7924C338.576 60.2173 309.737 31.3778 274.161 31.3778H207.666V160.207Z"/>
            </svg>
          </div>
          {/*<div className="card-chef">*/}
          {/*  <i className="fa-solid fa-user-chef"></i>*/}
          {/*  <i className="fa-regular fa-fire"></i>*/}
          {/*</div>*/}
        </button>
        <button className="card-wrapper" type="button">
          <div className="card">
            <div className="card-svgs">
              <svg className="svg svg-left" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F2F4F8"
                      d="M38.4,-55.8C50.9,-51.7,63,-43,61.2,-32.2C59.4,-21.5,43.8,-8.7,41.7,6C39.7,20.8,51.1,37.5,48.4,43.5C45.7,49.6,28.8,45,15.7,44.9C2.6,44.9,-6.6,49.4,-20.9,53.4C-35.2,57.3,-54.5,60.7,-61.1,53C-67.6,45.3,-61.4,26.6,-60.3,10.8C-59.3,-5,-63.4,-17.9,-57.3,-23.9C-51.1,-30,-34.6,-29.1,-23.3,-33.7C-12.1,-38.4,-6,-48.7,3.5,-54.1C12.9,-59.4,25.9,-59.9,38.4,-55.8Z"
                      transform="translate(100 100)"/>
              </svg>
              <svg className="svg svg-right" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F2F4F8"
                      d="M26.7,-42.6C39.8,-33.1,59.2,-34.5,70.1,-27.2C81,-19.8,83.4,-3.7,73.2,4.8C63.1,13.3,40.4,14.3,28.2,19.4C16,24.4,14.2,33.5,9.2,37.9C4.2,42.4,-4,42.2,-10.3,38.7C-16.6,35.2,-20.8,28.5,-32.1,23.4C-43.3,18.3,-61.5,14.9,-61.1,9.5C-60.8,4.2,-41.8,-3.1,-31.7,-10C-21.6,-16.9,-20.3,-23.3,-16.5,-37C-12.7,-50.8,-6.4,-72,0.2,-72.3C6.8,-72.6,13.6,-52.2,26.7,-42.6Z"
                      transform="translate(100 100)"/>
              </svg>
            </div>
            <span className="card-amount roboto-mono">GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"  className="card-brand" width="25px" height="25px" fill="#fff">
              <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"  className="card-icon" width="120px" height="120px" fill="#fff">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
            </svg>
          </div>
          <div className="card-chef">
            <i className="fa-solid fa-user-chef"></i>
            <i className="fa-regular fa-fire"></i>
          </div>
        </button>
        {/*<button className="card-wrapper" type="button">*/}
        {/*  <div className="card">*/}
        {/*    <div className="card-svgs">*/}
        {/*      <svg className="svg svg-left" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">*/}
        {/*        <path fill="#F2F4F8"*/}
        {/*              d="M14.8,-26.2C19.7,-19.9,24.6,-16.7,34.9,-11C45.3,-5.3,61.1,2.9,61.1,9.4C61,15.8,45.1,20.5,35.9,31.1C26.7,41.7,24.3,58.2,15.9,66C7.5,73.9,-6.8,73,-18.8,67.8C-30.7,62.5,-40.2,52.8,-45.9,42.1C-51.7,31.4,-53.7,19.7,-48.8,10.9C-44,2.2,-32.3,-3.6,-29.9,-15.5C-27.4,-27.4,-34.1,-45.4,-30.6,-52.4C-27.2,-59.3,-13.6,-55.1,-4.3,-48.4C5,-41.7,9.9,-32.4,14.8,-26.2Z"*/}
        {/*              transform="translate(100 100)"/>*/}
        {/*      </svg>*/}
        {/*      <svg className="svg svg-right" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">*/}
        {/*        <path fill="#F2F4F8"*/}
        {/*              d="M16.5,-31.8C25.4,-20,39.3,-22.2,53.7,-16.8C68.1,-11.5,83,1.3,79.3,9.8C75.6,18.3,53.2,22.5,39.4,28.9C25.6,35.3,20.5,43.9,12.9,48.1C5.2,52.4,-5,52.2,-19,53.3C-33,54.4,-50.8,56.9,-58.1,49.7C-65.3,42.4,-62.2,25.4,-57.1,12.7C-52,-0.1,-44.9,-8.7,-43,-22.5C-41.1,-36.2,-44.3,-55.1,-38,-68C-31.7,-80.9,-15.9,-87.8,-6,-78.5C3.8,-69.1,7.7,-43.5,16.5,-31.8Z"*/}
        {/*              transform="translate(100 100)"/>*/}
        {/*      </svg>*/}
        {/*    </div>*/}
        {/*    <span className="card-amount roboto-mono">Portfolio</span>*/}
        {/*    <i className="card-brand fa-solid fa-fork-knife"></i>*/}
        {/*    <i className="card-icon fa-duotone fa-donut"></i>*/}
        {/*  </div>*/}
        {/*  <div className="card-chef">*/}
        {/*    <i className="fa-solid fa-user-chef"></i>*/}
        {/*    <i className="fa-regular fa-fire"></i>*/}
        {/*  </div>*/}
        {/*</button>*/}
      </div>
    </Fragment>
  )
}
