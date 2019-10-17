import React, { Component } from 'react';

import AppIcon from 'components/AppIcon/AppIcon';
import Clock from 'components/Clock/Clock';
import DateTime from 'components/DateTime/DateTime';
import Text from 'components/Text/Text';

class Homescreen extends Component {
  get calculatorIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient
            id="calculator"
            x1="59.25"
            x2="60.76"
            y1="119.1"
            y2="-.16"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#d4d4d2" />
            <stop offset="1" stopColor="#d4d4d2" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" fill="url(#calculator)" rx="26" />
        <rect width="62" height="90" x="29" y="15" fill="#1c1c1c" rx="8" />
        <rect width="50" height="21" x="35" y="21" fill="#505050" rx="4" />
        <circle cx="41" cy="55" r="6" fill="#d4d4d2" />
        <circle cx="60" cy="55" r="6" fill="#d4d4d2" />
        <circle cx="79" cy="55" r="6" fill="#fe9500" />
        <circle cx="41" cy="74" r="6" fill="#d4d4d2" />
        <circle cx="60" cy="74" r="6" fill="#d4d4d2" />
        <circle cx="79" cy="74" r="6" fill="#fe9500" />
        <path fill="#d4d4d2" d="M41 99a6 6 0 010-12h19a6 6 0 010 12z" />
        <circle cx="79" cy="93" r="6" fill="#fe9500" />
      </svg>
    );
  }

  get calendarIcon() {
    return (
      <AppIcon name="Calendar">
        <Text className="ui-app-icon-weekday">
          <DateTime format="dddd" />
        </Text>
        <Text className="ui-app-icon-day">
          <DateTime format="D" />
        </Text>
      </AppIcon>
    );
  }

  get clockIcon() {
    return (
      <AppIcon name="Clock">
        <Clock />
      </AppIcon>
    );
  }

  get dock() {
    return (
      <div className="iportfolio-dock">
        <AppIcon name="phone" noLabel>
          {this.phoneIcon}
        </AppIcon>
        <AppIcon name="safari" noLabel>
          {this.safariIcon}
        </AppIcon>
        <AppIcon name="mail" noLabel>
          {this.mailIcon}
        </AppIcon>
        <AppIcon name="messages" noLabel>
          {this.messengerIcon}
        </AppIcon>
      </div>
    );
  }

  get grid() {
    return (
      <div className="iportfolio-grid">
        {this.calendarIcon}
        {this.clockIcon}
        <AppIcon name="Google Maps">{this.mapIcon}</AppIcon>
        <AppIcon name="Weather">{this.weatherIcon}</AppIcon>
        <AppIcon name="Reminders">{this.remindersIcon}</AppIcon>
        <AppIcon name="Notes">{this.notesIcon}</AppIcon>
        <AppIcon name="Calculator">{this.calculatorIcon}</AppIcon>
        <AppIcon name="Stocks">{this.stocksIcon}</AppIcon>
        <AppIcon name="Settings">{this.settingsIcon}</AppIcon>
      </div>
    );
  }

  get mailIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient
            id="mail"
            x1="60"
            x2="60"
            y1="-.84"
            y2="119.16"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#1d70f2" />
            <stop offset="1" stopColor="#1ac7fb" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" fill="url(#mail)" rx="26" />
        <path
          fill="#fff"
          d="M67.06 65.1l31.51-31.51A6 6 0 0096 33H24a6 6 0 00-2.58.59l31.5 31.51a10 10 0 0014.14 0z"
        />
        <path
          fill="#fff"
          d="M24 87h72a6 6 0 002.56-.58L75 62.85l-5.08 5.08a14 14 0 01-19.8 0L45 62.85 21.43 86.42A5.93 5.93 0 0024 87zm77.39-3.39A6 6 0 00102 81V39a6 6 0 00-.59-2.58L77.8 60zM42.18 60l-23.6-23.6A5.86 5.86 0 0018 39v42a6 6 0 00.6 2.61z"
        />
      </svg>
    );
  }

  get mapIcon() {
    return (
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <g fillRule="nonzero">
          <path
            d="M94.474.395A7.459 7.459 0 0092.105 0H7.895C3.553 0 0 3.553 0 7.895v84.21c0 .79.132 1.579.395 2.369L94.474.395z"
            fill="#0f9d58"
          />
          <path
            d="M50 50L5.526 99.605c.79.263 1.579.395 2.369.395h84.21c.79 0 1.579-.132 2.369-.395L50 50z"
            fill="#4285f4"
          />
          <path
            d="M50 50l49.605 44.474c.263-.79.395-1.448.395-2.369V7.895c0-.79-.132-1.579-.395-2.369L50 50z"
            fill="#e1e1e1"
          />
          <path
            d="M50 50l49.605 44.474c.263-.79.395-1.448.395-2.369V7.895c0-.79-.132-1.579-.395-2.369L50 50z"
            fill="#c2c2c2"
            fillOpacity=".5"
          />
          <path
            d="M100 92.105L52.632 44.737l-9.211 7.895L90.789 100h1.316c4.342 0 7.895-3.553 7.895-7.895z"
            fill="#f1f1f1"
          />
          <path
            d="M92.105 0L0 92.105C0 96.447 3.553 100 7.895 100h1.316L100 9.211V7.895C100 3.553 96.447 0 92.105 0z"
            fill="#ffeb3b"
          />
          <path
            d="M92.105 0L0 92.105C0 96.447 3.553 100 7.895 100h1.316L100 9.211V7.895C100 3.553 96.447 0 92.105 0z"
            fill="#ffcd40"
            fillOpacity=".5"
          />
          <path
            d="M92.105 0H7.895C3.553 0 0 3.553 0 7.895v.658C0 4.211 3.553.658 7.895.658h84.21C96.447.658 100 4.211 100 8.553v-.658C100 3.553 96.447 0 92.105 0z"
            fill="#fff"
            fillOpacity=".2"
          />
          <path
            d="M92.105 99.342H7.895C3.553 99.342 0 95.789 0 91.447v.658C0 96.447 3.553 100 7.895 100h84.21c4.342 0 7.895-3.553 7.895-7.895v-.658c0 4.342-3.553 7.895-7.895 7.895z"
            fill="#263238"
            fillOpacity=".1"
          />
          <path
            d="M22.368 19.737v5.658h7.764c-.658 3.289-3.553 5.789-7.764 5.789-4.736 0-8.552-3.947-8.552-8.684 0-4.737 3.816-8.684 8.552-8.684 2.106 0 4.079.789 5.527 2.105l4.21-4.079c-2.5-2.5-5.789-3.947-9.737-3.947A14.431 14.431 0 007.895 22.368a14.431 14.431 0 0014.473 14.474c8.29 0 13.948-5.921 13.948-14.21 0-1.053-.132-1.974-.263-2.895H22.368z"
            fill="#eee"
          />
        </g>
        <path
          d="M78.626 0C66.87 0 57.252 9.511 57.252 21.374c0 16.137 17.954 24.473 20.092 47.45.106.642.641 1.176 1.282 1.176s1.176-.534 1.282-1.176C82.046 45.847 100 37.511 100 21.374A21.3 21.3 0 0078.626 0z"
          fill="#db4437"
          fillRule="nonzero"
        />
        <circle cx="78.626" cy="21.374" r="7.481" fill="#7b231e" />
        <path
          d="M78.626.534c11.649 0 21.16 9.405 21.374 21.054v-.214A21.3 21.3 0 0078.626 0a21.3 21.3 0 00-21.374 21.374v.214C57.466 9.939 66.87.534 78.626.534z"
          fill="#fff"
          fillOpacity=".2"
          fillRule="nonzero"
        />
        <path
          d="M79.908 68.29c-.106.641-.641 1.176-1.282 1.176s-1.176-.535-1.282-1.176c-2.138-22.87-19.985-31.313-20.092-47.237v.321c0 16.137 17.954 24.473 20.091 47.45.107.642.642 1.176 1.283 1.176.641 0 1.176-.534 1.282-1.176C82.046 45.847 100 37.511 100 21.374v-.321C99.786 36.977 82.046 45.42 79.908 68.29z"
          fill="#3e2723"
          fillOpacity=".2"
          fillRule="nonzero"
        />
        <path
          d="M84.012-10.136c-8.532 0-16.146 4.064-21.003 10.489H7.876C3.544.353 0 3.893 0 8.22v83.913C0 96.46 3.544 100 7.876 100h84.013c4.332 0 7.876-3.54 7.876-7.867V40.736c5.513-7.998 10.501-15.34 10.501-24.649 0-14.423-11.683-26.223-26.254-26.223z"
          fill="url(#_Radial1)"
          fillRule="nonzero"
        />
        <defs>
          <radialGradient
            id="_Radial1"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(134.48 0 0 -134.322 2.737 2.524)"
          >
            <stop offset="0" stopColor="#fff" stopOpacity=".1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  get messengerIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient
            id="messenger"
            x1="60"
            x2="60"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#5cf777" />
            <stop offset="1" stopColor="#0dbc29" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" fill="url(#messenger)" rx="26" />
        <path
          fill="#fefefe"
          d="M60.51 21.51c-24.3 0-44 16.12-44 36 0 12.64 8 23.75 20 30.17a2 2 0 011 2.46 18 18 0 01-5.55 7.3 1 1 0 00.81 1.76 35.84 35.84 0 0014.54-6 3.92 3.92 0 013.07-.71 53.51 53.51 0 0010.15 1c24.3 0 44-16.12 44-36S84.81 21.51 60.51 21.51z"
        />
      </svg>
    );
  }

  get notesIcon() {
    return (
      <svg
        viewBox="0 0 65 65"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <path
          d="M65 14c0-7.727-6.273-14-14-14H14C6.273 0 0 6.273 0 14v37c0 7.727 6.273 14 14 14h37c7.727 0 14-6.273 14-14V14z"
          fill="#fff"
        />
        <clipPath id="notes">
          <path d="M65 14c0-7.727-6.273-14-14-14H14C6.273 0 0 6.273 0 14v37c0 7.727 6.273 14 14 14h37c7.727 0 14-6.273 14-14V14z" />
        </clipPath>
        <g clipPath="url(#notes)">
          <path d="M-4.875 0h74.208v16.25H-4.875z" />
          <path fill="url(#notes-header)" d="M-4.875 0h74.208v16.25H-4.875z" />
        </g>
        <path fill="#c7c5c9" d="M0 31.958h65v1.083H0zM0 48.208h65v1.083H0z" />
        <g fill="#c2c0c4">
          <circle cx="6.229" cy="19.771" r=".813" />
          <circle cx="8.938" cy="19.771" r=".813" />
          <circle cx="11.646" cy="19.771" r=".813" />
          <circle cx="14.354" cy="19.771" r=".813" />
          <circle cx="17.063" cy="19.771" r=".813" />
          <circle cx="19.771" cy="19.771" r=".813" />
          <circle cx="22.479" cy="19.771" r=".813" />
          <circle cx="25.188" cy="19.771" r=".813" />
          <circle cx="27.896" cy="19.771" r=".813" />
          <circle cx="30.604" cy="19.771" r=".813" />
          <circle cx="33.313" cy="19.771" r=".813" />
          <circle cx="36.021" cy="19.771" r=".813" />
          <circle cx="38.729" cy="19.771" r=".813" />
          <circle cx="41.438" cy="19.771" r=".813" />
          <circle cx="44.146" cy="19.771" r=".813" />
          <circle cx="46.854" cy="19.771" r=".813" />
          <circle cx="49.563" cy="19.771" r=".813" />
          <circle cx="52.271" cy="19.771" r=".813" />
          <circle cx="54.979" cy="19.771" r=".813" />
          <circle cx="57.687" cy="19.771" r=".813" />
          <circle cx="60.396" cy="19.771" r=".813" />
          <circle cx="63.104" cy="19.771" r=".813" />
          <circle cx="3.521" cy="19.771" r=".813" />
          <circle cx=".813" cy="19.771" r=".813" />
        </g>
        <defs>
          <linearGradient
            id="notes-header"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0 16.25 -16.25 0 32.23 0)"
          >
            <stop offset="0" stopColor="#f4d87e" />
            <stop offset="1" stopColor="#f5c52c" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  get phoneIcon() {
    return (
      <svg
        viewBox="0 0 65 65"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <path
          d="M65 14c0-7.727-6.273-14-14-14H14C6.273 0 0 6.273 0 14v37c0 7.727 6.273 14 14 14h37c7.727 0 14-6.273 14-14V14z"
          fill="url(#_phone)"
        />
        <path
          d="M24.277 40.351l4.979-4.98 3.83 3.831c2.333 2.332 4.213 3.064 7.661.383.766-.766 2.106-1.724 3.638-.958l7.278 4.979c2.106 1.724 2.278 2.665 1.723 4.022-3.445 8.42-14.363 7.086-29.109-7.277zm0 0C9.914 25.604 8.579 14.686 17 11.241c1.357-.555 2.298-.383 4.021 1.724l4.98 7.277c.766 1.532-.192 2.873-.958 3.639-2.681 3.447-1.95 5.328.383 7.66l3.83 3.83-4.979 4.98z"
          fill="#fff"
        />
        <defs>
          <linearGradient
            id="_phone"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0 65 -65 0 32.5 0)"
          >
            <stop offset="0" stopColor="#91fc8a" />
            <stop offset="1" stopColor="#00dd35" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  get remindersIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient
            id="reminders"
            x1="60.43"
            x2="59.58"
            y1="-.9"
            y2="118.99"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fefefe" />
            <stop offset="1" stopColor="#fefefe" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" fill="url(#reminders)" rx="26" />
        <circle cx="22" cy="30" r="6" fill="#007aff" />
        <path
          fill="#007aff"
          d="M22 40a10 10 0 1110-10 10 10 0 01-10 10zm0-18a8 8 0 108 8 8 8 0 00-8-8z"
        />
        <circle cx="22" cy="60" r="6" fill="#fe3b30" />
        <path
          fill="#fe3b30"
          d="M22 70a10 10 0 1110-10 10 10 0 01-10 10zm0-18a8 8 0 108 8 8 8 0 00-8-8z"
        />
        <circle cx="22" cy="90" r="6" fill="#fe9500" />
        <path
          fill="#fe9500"
          d="M22 100a10 10 0 1110-10 10 10 0 01-10 10zm0-18a8 8 0 108 8 8 8 0 00-8-8z"
        />
        <path
          fill="#c7c7cc"
          d="M45 29h60v2H45zM45 59h60v2H45zM45 89h60v2H45z"
        />
      </svg>
    );
  }

  get safariIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <linearGradient
          id="safari"
          x1="295.835"
          x2="295.835"
          y1="274.049"
          y2="272.933"
          gradientTransform="matrix(112 0 0 -112 -33069.5 30695)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#19D7FF" />
          <stop offset="1" stopColor="#1E64F0" />
        </linearGradient>
        <circle cx="64" cy="64" r="62.5" fill="url(#safari)" />
        <path
          fill="none"
          stroke="#fff"
          d="M64 7.6v9.2M64 110.9v9.2M73.8 8.5l-1.6 9.1M55.8 110.1l-1.6 9.1M83.2 11l-3.1 8.7M47.9 108l-3.1 8.7M54.2 8.5l1.6 9.1M72.2 110.1l1.6 9.1M44.8 11l3.1 8.7M80.1 108l3.1 8.7M35.9 15.2l4.6 8M87.5 104.6l4.6 7.9M27.9 20.8l5.9 7M94.2 99.9l5.9 7M20.9 27.7l7.1 5.9M100 94.1l7.1 5.9M15.3 35.8l8 4.6M104.7 87.4l8 4.6M11.2 44.6l8.6 3.2M108.2 79.9l8.6 3.2M8.6 54.1l9.1 1.6M110.3 72l9.1 1.6M7.8 63.9h9.2M111 63.9h9.2M8.6 73.6l9.1-1.6M110.3 55.7l9.1-1.6M11.2 83.1l8.6-3.2M108.2 47.8l8.6-3.2M15.3 92l8-4.6M104.7 40.4l8-4.6M20.9 100l7.1-5.9M100 33.6l7.1-5.9M27.9 106.9l5.9-7M94.2 27.8l5.9-7M35.9 112.5l4.6-7.9M87.5 23.2l4.6-8M59.1 7.9l.4 5M68.5 114.9l.4 5M49.4 9.6l1.3 4.8M77.3 113.3l1.3 4.9M40.2 12.9l2.1 4.6M85.6 110.3l2.2 4.5M31.7 17.8l2.9 4.1M93.4 105.8l2.9 4.1M24.2 24.1l3.6 3.5M100.2 100.1l3.6 3.5M17.9 31.6l4.2 2.9M105.9 93.2l4.2 2.9M13.1 40.1l4.5 2.1M110.4 85.5l4.5 2.1M9.7 49.3l4.9 1.3M113.4 77.1l4.9 1.3M8 58.9l5 .5M115 68.3l5 .5M8 68.8l5-.5M115 59.4l5-.5M9.7 78.4l4.9-1.3M113.4 50.6l4.9-1.3M13.1 87.6l4.5-2.1M110.4 42.2l4.5-2.1M17.9 96.1l4.2-2.9M105.9 34.5l4.2-2.9M31.7 109.9l2.9-4.1M93.4 21.9l2.9-4.1M40.2 114.8l2.2-4.5M85.6 17.5l2.2-4.6M49.4 118.2l1.3-4.9M77.3 14.4l1.3-4.8M59.1 119.9l.4-5M68.5 12.9l.4-5"
        />
        <path fill="red" d="M106.7 21l-48 37.7 5.2 5.2z" />
        <path fill="#D01414" d="M63.9 63.9l6 6 36.8-48.9z" />
        <path fill="#fff" d="M58.7 58.7l-37.7 48 42.9-42.8z" />
        <path fill="#ACACAC" d="M21 106.7l48.9-36.8-6-6z" />
      </svg>
    );
  }

  get settingsIcon() {
    return (
      <svg
        viewBox="0 0 65 65"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <path
          d="M65 14c0-7.727-6.273-14-14-14H14C6.273 0 0 6.273 0 14v37c0 7.727 6.273 14 14 14h37c7.727 0 14-6.273 14-14V14z"
          fill="url(#settings)"
        />
        <circle cx="32.5" cy="32.5" r="28.708" fill="#302f33" />
        <circle cx="32.5" cy="32.5" r="28.708" />
        <path
          d="M35.421 15.071l.432.069-.009 2.05c.301.065.599.138.893.22l.79-1.858.421.121-.259 2.033c.291.101.578.21.86.327l1.01-1.747.403.171-.505 1.987c.194.096.385.195.574.298l1.188-1.634.383.212-.711 1.925c.26.164.515.335.764.513l1.379-1.478.354.257-.94 1.826c.237.194.469.394.695.601l1.549-1.299.32.298-1.155 1.698c.212.221.418.448.617.681l1.695-1.101.282.336-1.353 1.543c.128.172.254.347.377.524l1.801-.917.244.363-1.507 1.393c.158.262.308.531.45.803l1.898-.691.198.39-1.664 1.199c.125.279.24.563.348.852l1.967-.454.149.412-1.797.986c.089.292.169.589.241.888l2.008-.21.098.426-1.905.76c.036.211.068.425.097.639h2.02l.054.435-1.978.558c.021.303.033.61.035.918l2.008.247v.438l-2.03.312c-.017.308-.042.614-.076.917l1.96.489-.053.435-2.05.062c-.038.213-.081.424-.127.634l1.897.691-.098.427-2.045-.153c-.085.295-.179.588-.281.877l1.798.917-.15.412-2.011-.401c-.121.284-.251.565-.39.842l1.68 1.113-.195.391-1.959-.627c-.108.187-.221.371-.337.552l1.552 1.28-.235.37-1.88-.828c-.181.248-.37.491-.566.728l1.382 1.457-.278.338-1.762-1.048c-.136.145-.276.288-.417.428l1.304 1.864-.325.292-1.759-1.436c-.214.184-.433.364-.658.537l1.067 2.008-.359.25-1.568-1.638c-.196.131-.395.258-.596.381l.894 2.009-.376.225-1.431-1.721c-.258.134-.52.26-.785.38l.639 2.092-.4.178-1.205-1.874c-.188.071-.377.137-.569.199l.416 2.139-.417.135-.999-1.982c-.284.073-.57.138-.857.194l.15 2.165-.429.084-.748-2.083c-.2.026-.401.048-.604.065l-.075 2.164-.437.038-.524-2.143c-.19.004-.38.005-.569.003l-.52 2.126-.436-.038-.075-2.134a17.948 17.948 0 01-.618-.059l-.735 2.046-.43-.083.148-2.117c-.296-.054-.59-.118-.882-.189L27.83 49.7l-.417-.136.402-2.069c-.201-.063-.4-.131-.597-.202L26.055 49.1l-.4-.178.613-2.007a15.417 15.417 0 01-.822-.389l-1.368 1.645-.375-.225.85-1.911a15.917 15.917 0 01-.633-.395l-1.489 1.555-.359-.251 1.009-1.898a16.464 16.464 0 01-.702-.563l-1.656 1.353-.325-.293 1.224-1.749a17.027 17.027 0 01-.463-.468l-1.636.974-.279-.338 1.279-1.349a15.62 15.62 0 01-.608-.772l-1.734.763-.236-.369 1.428-1.177c-.129-.199-.253-.4-.373-.604l-1.798.576-.195-.392 1.537-1.018c-.15-.296-.29-.596-.421-.902l-1.837.365-.15-.411 1.639-.836a15.5 15.5 0 01-.306-.944l-1.861.139-.098-.427 1.725-.628a16.442 16.442 0 01-.141-.702l-1.864-.057-.054-.435 1.782-.444a16.107 16.107 0 01-.082-.99l-1.845-.284v-.437l1.825-.225c.003-.333.016-.664.039-.991l-1.798-.507.053-.435h1.84c.031-.238.068-.473.109-.706l-1.737-.693.098-.427 1.833.192c.078-.322.166-.64.263-.953l-1.645-.903.15-.411 1.804.416c.116-.309.242-.612.377-.911l-1.531-1.102.199-.39 1.751.636c.153-.289.315-.574.485-.852l-1.396-1.289.245-.363 1.674.851c.133-.191.271-.379.412-.564l-1.262-1.438.282-.336 1.587 1.03c.212-.244.431-.482.657-.712l-1.087-1.595.32-.298 1.463 1.226c.239-.215.483-.423.734-.622l-.892-1.732.355-.257 1.314 1.408c.26-.182.527-.357.798-.523l-.68-1.845.383-.213 1.143 1.574c.198-.105.399-.206.601-.303l-.488-1.922.403-.171.982 1.699c.291-.117.585-.225.883-.324l-.253-1.988.421-.121.775 1.827c.299-.079.602-.15.908-.212l-.01-2.027.433-.068.554 1.931c.303-.041.469-.076.778-.099l.241-2.039.437-.015.319 2.008h.365c.137 0 .273.002.41.006l.317-1.998.437.015.242 2.039c.307.027.611.063.913.108l.557-1.942zM32.5 44.958c6.881 0 12.458-5.577 12.458-12.458S39.381 20.042 32.5 20.042 20.042 25.619 20.042 32.5 25.619 44.958 32.5 44.958z"
          fill="url(#_settings2)"
        />
        <path d="M32.332 29.698c.328.582.89 1.265 1.215 1.468.437.274 1.066.438 2.727.438h13.645-2.844c4.334 0 5.146-1.625 5.146-2.979 0-.507-.26-1.486-.781-2.938-2.946-7.583-10.316-12.958-18.94-12.958a20.347 20.347 0 00-5.276.692c-.414.126-.718.247-.914.364-1.16.698-2.134 2.232.097 5.946l-1.469-2.445 7.049 11.731c.01.025.021.049.033.073l.312.608zm1.251 5.239c-.487.305-.754.659-1.625 2.167L24.929 48.77l1.478-2.461c-2.231 3.714-1.257 5.247-.097 5.945.42.252 1.343.523 2.77.814 1.13.191 2.274.287 3.42.286 9.175 0 16.929-6.083 19.45-14.435.182-.741.27-1.324.27-1.627 0-1.355-.812-2.98-5.145-2.98h2.849-13.637c-1.593 0-2.217.321-2.704.625zM22.608 18.666l1.478 2.46c-2.232-3.715-4.043-3.574-5.204-2.877-.464.279-1.546 1.257-2.632 2.605l.046-.062a20.222 20.222 0 00-4.108 12.25 20.23 20.23 0 004.56 12.826l-.498-.683c1.086 1.348 2.168 2.326 2.632 2.606 1.161.697 2.972.837 5.204-2.877l-1.487 2.475 6.705-11.162-.054.065c.722-1.445 1.083-2.618 1.083-3.521 0-.73-.294-1.636-.884-2.72l-6.841-11.385zM36.77 6.578l.642.102-.013 3.044c.447.096.889.205 1.327.326l1.172-2.759.624.18-.384 3.018c.432.15.858.312 1.278.487l1.499-2.595.598.254-.75 2.951c.288.141.572.288.853.441l1.763-2.425.568.315-1.055 2.858c.386.243.764.496 1.134.761l2.047-2.194.526.382-1.396 2.71c.353.288.697.585 1.032.893l2.3-1.929.476.443-1.717 2.521c.316.328.621.665.917 1.01l2.518-1.634.418.498-2.01 2.291c.192.256.378.515.56.779l2.673-1.362.364.539-2.237 2.068c.234.39.456.787.667 1.191l2.817-1.024.295.579-2.47 1.779c.185.415.356.837.517 1.265l2.919-.673.222.611-2.668 1.463c.132.435.251.874.358 1.319l2.98-.312.146.633-2.828 1.129c.054.314.101.63.143.948l3 .001.079.645-2.934.827c.029.451.047.906.051 1.364l2.98.366v.65l-3.013.464c-.025.454-.063.908-.114 1.36l2.911.727-.079.645-3.044.093a23.01 23.01 0 01-.187.941l2.816 1.026-.146.633-3.036-.225c-.126.437-.265.871-.417 1.301l2.669 1.361-.222.611-2.985-.594c-.181.422-.374.839-.58 1.25l2.494 1.651-.291.582-2.907-.931c-.161.277-.328.55-.5.82l2.304 1.9-.349.548-2.791-1.228c-.27.368-.55.728-.841 1.08l2.053 2.164-.414.502-2.616-1.557c-.202.216-.408.428-.618.635l1.936 2.768-.483.435-2.611-2.134c-.318.275-.644.54-.977.798l1.584 2.98-.532.373-2.329-2.432c-.29.195-.585.383-.886.565l1.328 2.982-.558.335-2.124-2.555c-.383.198-.772.386-1.166.564l.948 3.105-.594.265-1.788-2.781c-.279.104-.561.202-.844.295l.616 3.174-.617.202-1.484-2.943c-.42.107-.844.204-1.273.288l.224 3.214-.638.124-1.11-3.091c-.297.037-.596.07-.896.097l-.114 3.212-.647.056-.778-3.182c-.282.007-.564.008-.845.005l-.772 3.156-.648-.057-.111-3.167a23.506 23.506 0 01-.917-.09l-1.091 3.039-.638-.124.219-3.142a22.36 22.36 0 01-1.308-.28l-1.443 2.863-.618-.201.595-3.072a23.66 23.66 0 01-.886-.3l-1.726 2.683-.594-.264.91-2.98a23.818 23.818 0 01-1.22-.577l-2.031 2.443-.558-.336 1.262-2.836a24.55 24.55 0 01-.938-.588l-2.21 2.31-.533-.374 1.497-2.817a23.253 23.253 0 01-1.042-.837l-2.459 2.01-.483-.435 1.818-2.597a23.656 23.656 0 01-.687-.694l-2.43 1.445-.413-.502 1.899-2.001a23.231 23.231 0 01-.904-1.147l-2.574 1.133-.349-.548 2.118-1.748a23.407 23.407 0 01-.553-.896l-2.669.855-.29-.582 2.282-1.511a23.971 23.971 0 01-.626-1.339l-2.727.542-.222-.611 2.433-1.24c-.166-.463-.317-.93-.453-1.402l-2.764.206-.146-.634 2.562-.933a21.818 21.818 0 01-.209-1.042l-2.768-.085-.079-.644 2.645-.661a23.642 23.642 0 01-.122-1.469L6.5 33.291v-.65l2.709-.334c.004-.491.023-.981.058-1.471l-2.671-.753.08-.644 2.732-.002c.046-.352.1-.701.162-1.048L6.991 27.36l.146-.633 2.721.285c.115-.476.245-.948.39-1.416l-2.442-1.339.223-.611 2.678.617c.173-.457.36-.908.56-1.352l-2.273-1.635.296-.58 2.599.946c.227-.43.466-.852.719-1.266l-2.071-1.914.363-.539 2.485 1.264c.198-.283.403-.562.612-.837l-1.873-2.136.418-.498 2.356 1.53c.314-.363.639-.715.975-1.057l-1.613-2.37.475-.443 2.173 1.822a23.37 23.37 0 011.088-.924l-1.324-2.572.525-.382 1.953 2.092c.386-.271.781-.531 1.185-.778l-1.011-2.739.569-.315 1.697 2.337c.294-.157.592-.306.892-.45l-.724-2.853.598-.254 1.457 2.523c.431-.174.868-.335 1.311-.482l-.376-2.951.625-.179 1.152 2.711c.444-.117.893-.222 1.346-.314l-.013-3.009.642-.102.823 2.867c.45-.062.697-.112 1.154-.148l.358-3.026.65-.022.473 2.98h.542c.204 0 .406.003.609.008l.47-2.965.65.023.357 3.026c.457.041.909.095 1.357.161l.827-2.883z" />
        <path
          d="M32.332 29.698c.328.582.89 1.265 1.215 1.468.437.274 1.066.438 2.727.438h13.645-2.844c4.334 0 5.146-1.625 5.146-2.979 0-.507-.26-1.486-.781-2.938-2.946-7.583-10.316-12.958-18.94-12.958a20.347 20.347 0 00-5.276.692c-.414.126-.718.247-.914.364-1.16.698-2.134 2.232.097 5.946l-1.469-2.445 7.049 11.731c.01.025.021.049.033.073l.312.608zm1.251 5.239c-.487.305-.754.659-1.625 2.167L24.929 48.77l1.478-2.461c-2.231 3.714-1.257 5.247-.097 5.945.42.252 1.343.523 2.77.814 1.13.191 2.274.287 3.42.286 9.175 0 16.929-6.083 19.45-14.435.182-.741.27-1.324.27-1.627 0-1.355-.812-2.98-5.145-2.98h2.849-13.637c-1.593 0-2.217.321-2.704.625zM22.608 18.666l1.478 2.46c-2.232-3.715-4.043-3.574-5.204-2.877-.464.279-1.546 1.257-2.632 2.605l.046-.062a20.222 20.222 0 00-4.108 12.25 20.23 20.23 0 004.56 12.826l-.498-.683c1.086 1.348 2.168 2.326 2.632 2.606 1.161.697 2.972.837 5.204-2.877l-1.487 2.475 6.705-11.162-.054.065c.722-1.445 1.083-2.618 1.083-3.521 0-.73-.294-1.636-.884-2.72l-6.841-11.385zM36.77 6.578l.642.102-.013 3.044c.447.096.889.205 1.327.326l1.172-2.759.624.18-.384 3.018c.432.15.858.312 1.278.487l1.499-2.595.598.254-.75 2.951c.288.141.572.288.853.441l1.763-2.425.568.315-1.055 2.858c.386.243.764.496 1.134.761l2.047-2.194.526.382-1.396 2.71c.353.288.697.585 1.032.893l2.3-1.929.476.443-1.717 2.521c.316.328.621.665.917 1.01l2.518-1.634.418.498-2.01 2.291c.192.256.378.515.56.779l2.673-1.362.364.539-2.237 2.068c.234.39.456.787.667 1.191l2.817-1.024.295.579-2.47 1.779c.185.415.356.837.517 1.265l2.919-.673.222.611-2.668 1.463c.132.435.251.874.358 1.319l2.98-.312.146.633-2.828 1.129c.054.314.101.63.143.948l3 .001.079.645-2.934.827c.029.451.047.906.051 1.364l2.98.366v.65l-3.013.464c-.025.454-.063.908-.114 1.36l2.911.727-.079.645-3.044.093a23.01 23.01 0 01-.187.941l2.816 1.026-.146.633-3.036-.225c-.126.437-.265.871-.417 1.301l2.669 1.361-.222.611-2.985-.594c-.181.422-.374.839-.58 1.25l2.494 1.651-.291.582-2.907-.931c-.161.277-.328.55-.5.82l2.304 1.9-.349.548-2.791-1.228c-.27.368-.55.728-.841 1.08l2.053 2.164-.414.502-2.616-1.557c-.202.216-.408.428-.618.635l1.936 2.768-.483.435-2.611-2.134c-.318.275-.644.54-.977.798l1.584 2.98-.532.373-2.329-2.432c-.29.195-.585.383-.886.565l1.328 2.982-.558.335-2.124-2.555c-.383.198-.772.386-1.166.564l.948 3.105-.594.265-1.788-2.781c-.279.104-.561.202-.844.295l.616 3.174-.617.202-1.484-2.943c-.42.107-.844.204-1.273.288l.224 3.214-.638.124-1.11-3.091c-.297.037-.596.07-.896.097l-.114 3.212-.647.056-.778-3.182c-.282.007-.564.008-.845.005l-.772 3.156-.648-.057-.111-3.167a23.506 23.506 0 01-.917-.09l-1.091 3.039-.638-.124.219-3.142a22.36 22.36 0 01-1.308-.28l-1.443 2.863-.618-.201.595-3.072a23.66 23.66 0 01-.886-.3l-1.726 2.683-.594-.264.91-2.98a23.818 23.818 0 01-1.22-.577l-2.031 2.443-.558-.336 1.262-2.836a24.55 24.55 0 01-.938-.588l-2.21 2.31-.533-.374 1.497-2.817a23.253 23.253 0 01-1.042-.837l-2.459 2.01-.483-.435 1.818-2.597a23.656 23.656 0 01-.687-.694l-2.43 1.445-.413-.502 1.899-2.001a23.231 23.231 0 01-.904-1.147l-2.574 1.133-.349-.548 2.118-1.748a23.407 23.407 0 01-.553-.896l-2.669.855-.29-.582 2.282-1.511a23.971 23.971 0 01-.626-1.339l-2.727.542-.222-.611 2.433-1.24c-.166-.463-.317-.93-.453-1.402l-2.764.206-.146-.634 2.562-.933a21.818 21.818 0 01-.209-1.042l-2.768-.085-.079-.644 2.645-.661a23.642 23.642 0 01-.122-1.469L6.5 33.291v-.65l2.709-.334c.004-.491.023-.981.058-1.471l-2.671-.753.08-.644 2.732-.002c.046-.352.1-.701.162-1.048L6.991 27.36l.146-.633 2.721.285c.115-.476.245-.948.39-1.416l-2.442-1.339.223-.611 2.678.617c.173-.457.36-.908.56-1.352l-2.273-1.635.296-.58 2.599.946c.227-.43.466-.852.719-1.266l-2.071-1.914.363-.539 2.485 1.264c.198-.283.403-.562.612-.837l-1.873-2.136.418-.498 2.356 1.53c.314-.363.639-.715.975-1.057l-1.613-2.37.475-.443 2.173 1.822a23.37 23.37 0 011.088-.924l-1.324-2.572.525-.382 1.953 2.092c.386-.271.781-.531 1.185-.778l-1.011-2.739.569-.315 1.697 2.337c.294-.157.592-.306.892-.45l-.724-2.853.598-.254 1.457 2.523c.431-.174.868-.335 1.311-.482l-.376-2.951.625-.179 1.152 2.711c.444-.117.893-.222 1.346-.314l-.013-3.009.642-.102.823 2.867c.45-.062.697-.112 1.154-.148l.358-3.026.65-.022.473 2.98h.542c.204 0 .406.003.609.008l.47-2.965.65.023.357 3.026c.457.041.909.095 1.357.161l.827-2.883z"
          fill="url(#_settings3)"
        />
        <defs>
          <linearGradient
            id="settings"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0 65 -65 0 32.5 0)"
          >
            <stop offset="0" stopColor="#e8e2f0" />
            <stop offset="1" stopColor="#8a8e92" />
          </linearGradient>
          <linearGradient
            id="_settings2"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90 16.42 16.216) scale(65.2209)"
          >
            <stop offset="0" stopColor="#e8e2f0" />
            <stop offset="1" stopColor="#8a8e92" />
          </linearGradient>
          <linearGradient
            id="_settings3"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90 16.663 15.972) scale(65.9475)"
          >
            <stop offset="0" stopColor="#e8e2f0" />
            <stop offset="1" stopColor="#8a8e92" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  get stocksIcon() {
    return (
      <svg
        viewBox="0 0 65 65"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path
          d="M65 14c0-7.727-6.273-14-14-14H14C6.273 0 0 6.273 0 14v37c0 7.727 6.273 14 14 14h37c7.727 0 14-6.273 14-14V14z"
          fill="#1c181b"
        />
        <clipPath id="_stocks">
          <path d="M65 14c0-7.727-6.273-14-14-14H14C6.273 0 0 6.273 0 14v37c0 7.727 6.273 14 14 14h37c7.727 0 14-6.273 14-14V14z" />
        </clipPath>
        <g clipPath="url(#_stocks)">
          <path
            d="M0 35.479h2.979l7.313 4.063 7.312-5.688 3.521 3.521 3.521-9.75 3.25 9.75 3.521 3.521 4.604-7.042 3.521-1.625 3.25-11.104 4.062 9.885 2.979-2.573 4.063 8.938 3.521-8.938 9.208-8.666 5.146 52h-82.063l4.605-36.292H0z"
            fill="url(#_Linear2)"
            stroke="#fff"
            strokeWidth="1.08"
          />
          <path
            fill="#3c3a3e"
            d="M9.208 0h1.625v65H9.208zM20.042 0h1.625v65h-1.625zM30.875 0H32.5v65h-1.625zM53.083 0h1.625v65h-1.625z"
          />
          <path fill="#00b0fc" d="M41.708 0h1.625v65h-1.625z" />
        </g>
        <circle cx="42.792" cy="21.125" r="3.25" fill="#00b3f9" />
        <circle
          cx="42.792"
          cy="21.125"
          r="3.521"
          fill="none"
          stroke="#1c181b"
          strokeWidth=".54"
        />
        <defs>
          <linearGradient
            id="_Linear2"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0 52 -52 0 30.74 19.77)"
          >
            <stop offset="0" stopColor="#eee" stopOpacity=".3" />
            <stop offset="1" stopColor="#d8d8d8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  get weatherIcon() {
    return (
      <svg
        viewBox="0 0 65 65"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <path
          d="M65 14c0-7.727-6.273-14-14-14H14C6.273 0 0 6.273 0 14v37c0 7.727 6.273 14 14 14h37c7.727 0 14-6.273 14-14V14z"
          fill="url(#_weather)"
        />
        <circle cx="21.667" cy="27.083" r="11.917" fill="url(#_sun)" />
        <path
          d="M23.833 48.75h22.75v-.014c5.433-.282 9.75-4.775 9.75-10.278 0-5.683-4.608-10.291-10.291-10.291-.753 0-1.486.081-2.193.234-1.493-4.54-5.768-7.818-10.807-7.818-6.193 0-11.229 4.948-11.372 11.106a8.67 8.67 0 00-6.503 8.394 8.666 8.666 0 008.666 8.667z"
          fill="#fff"
          fillOpacity=".9"
        />
        <defs>
          <linearGradient
            id="_weather"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0 65 -65 0 32.5 0)"
          >
            <stop offset="0" stopColor="#008ee7" />
            <stop offset="1" stopColor="#00d6fa" />
          </linearGradient>
          <linearGradient
            id="_sun"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90 3.25 18.417) scale(23.8333)"
          >
            <stop offset="0" stopColor="#ffcc51" />
            <stop offset="1" stopColor="#f2da48" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  render() {
    return (
      <div className="iportfolio-homescreen">
        {this.grid}
        {this.dock}
      </div>
    );
  }
}

export default Homescreen;
