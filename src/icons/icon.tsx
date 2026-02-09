import type { ReactNode } from "react";

type IconName = keyof typeof icons;

interface IconSetProps {
  iconName: IconName;
  size: number
  children?: ReactNode
}
const size: string = "100%"
const icons = {
  barleft: (
 

  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 20V4M9 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2837 19.7822 18.9074C20 18.48 20 17.921 20 16.8031V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H9M9 20H7.19692C6.07901 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2837 4.21799 18.9074C4 18.4796 4 17.9203 4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>


  ),
  sun: (
    <svg width={size} height={size}viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.99984 3.33333V1.66666M9.99984 16.6667V18.3333M5.34502 5.34518L4.1665 4.16666M14.7732 14.7734L15.9517 15.9519M3.33317 10H1.6665M16.6665 10H18.3332M14.7736 5.34518L15.9521 4.16666M5.34542 14.7734L4.16691 15.9519M9.99984 14.1667C7.69865 14.1667 5.83317 12.3012 5.83317 10C5.83317 7.69881 7.69865 5.83333 9.99984 5.83333C12.301 5.83333 14.1665 7.69881 14.1665 10C14.1665 12.3012 12.301 14.1667 9.99984 14.1667Z" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  moon: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6C9 10.9706 13.0294 15 18 15C18.9093 15 19.787 14.8655 20.6144 14.6147C19.4943 18.3103 16.0613 20.9999 12 20.9999C7.02944 20.9999 3 16.9707 3 12.0001C3 7.93883 5.69007 4.50583 9.38561 3.38574C9.13484 4.21311 9 5.09074 9 6Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  user: (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.0832 12.25C11.0832 9.99484 9.255 8.16667 6.99984 8.16667C4.74467 8.16667 2.9165 9.99484 2.9165 12.25M6.99984 6.41667C5.71117 6.41667 4.6665 5.372 4.6665 4.08333C4.6665 2.79467 5.71117 1.75 6.99984 1.75C8.2885 1.75 9.33317 2.79467 9.33317 4.08333C9.33317 5.372 8.2885 6.41667 6.99984 6.41667Z" stroke="#000000" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  money: (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.12733 2.33333C8.60183 2.3338 9.05677 2.5225 9.3923 2.85803C9.72783 3.19355 9.91653 3.64849 9.91699 4.123C9.91699 4.27771 9.97845 4.42608 10.0878 4.53548C10.1972 4.64488 10.3456 4.70633 10.5003 4.70633C10.655 4.70633 10.8034 4.64488 10.9128 4.53548C11.0222 4.42608 11.0837 4.27771 11.0837 4.123V4.08333C11.0837 4.07225 11.0837 4.06233 11.0837 4.05125C11.0642 3.27993 10.7442 2.54671 10.192 2.00787C9.63975 1.46903 8.8989 1.16718 8.12733 1.16667H7.58366V0.583333C7.58366 0.428624 7.5222 0.280251 7.4128 0.170854C7.30341 0.0614582 7.15504 0 7.00033 0C6.84562 0 6.69724 0.0614582 6.58785 0.170854C6.47845 0.280251 6.41699 0.428624 6.41699 0.583333V1.16667H5.87333C5.17176 1.16742 4.49333 1.41764 3.95929 1.8726C3.42525 2.32757 3.07041 2.95763 2.95821 3.65016C2.846 4.3427 2.98373 5.05257 3.34679 5.65288C3.70984 6.2532 4.27456 6.70485 4.93999 6.92708L6.41699 7.42V11.6667H5.87333C5.39882 11.6662 4.94388 11.4775 4.60835 11.142C4.27282 10.8064 4.08412 10.3515 4.08366 9.877C4.08366 9.72229 4.0222 9.57392 3.9128 9.46452C3.80341 9.35513 3.65504 9.29367 3.50033 9.29367C3.34562 9.29367 3.19724 9.35513 3.08785 9.46452C2.97845 9.57392 2.91699 9.72229 2.91699 9.877V9.91667C2.91699 9.92775 2.91699 9.93767 2.91699 9.94875C2.93646 10.7201 3.25641 11.4533 3.80865 11.9921C4.3609 12.531 5.10176 12.8328 5.87333 12.8333H6.41699V13.4167C6.41699 13.5714 6.47845 13.7198 6.58785 13.8291C6.69724 13.9385 6.84562 14 7.00033 14C7.15504 14 7.30341 13.9385 7.4128 13.8291C7.5222 13.7198 7.58366 13.5714 7.58366 13.4167V12.8333H8.12733C8.82889 12.8326 9.50732 12.5824 10.0414 12.1274C10.5754 11.6724 10.9302 11.0424 11.0424 10.3498C11.1547 9.6573 11.0169 8.94744 10.6539 8.34712C10.2908 7.7468 9.72609 7.29515 9.06066 7.07292L7.58366 6.58V2.33333H8.12733ZM8.69316 8.17892C9.09649 8.31316 9.43887 8.58658 9.659 8.95023C9.87913 9.31387 9.96263 9.744 9.89456 10.1636C9.82648 10.5832 9.61128 10.9649 9.28747 11.2403C8.96367 11.5157 8.55241 11.6668 8.12733 11.6667H7.58366V7.80908L8.69316 8.17892ZM6.41699 6.19092L5.30866 5.82108C4.90542 5.68688 4.56311 5.41355 4.34297 5.05002C4.12283 4.6865 4.03925 4.2565 4.10717 3.83698C4.17509 3.41746 4.39008 3.0358 4.71368 2.7603C5.03727 2.4848 5.44834 2.33345 5.87333 2.33333H6.41699V6.19092Z" fill="#000000"/>
    </svg>
  ),
  calender: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cheveronDown: (
   
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 9L12 16L5 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  ),
  cheveronUp: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16L12 9L19 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  plus: (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

  ),
  moreHorizontal: (    
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  tags: (    
  



<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_1_19818)">
<path d="M12.5858 4.58579C12.2107 4.21071 11.702 4 11.1716 4H4V11.1716C4 11.702 4.21071 12.2107 4.58579 12.5858L11.5858 19.5858C12.3668 20.3668 13.6332 20.3668 14.4142 19.5858L19.5858 14.4142C20.3668 13.6332 20.3668 12.3668 19.5858 11.5858L12.5858 4.58579Z" stroke="#292929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<rect x="9" y="9" width="0.01" height="0.01" stroke="#292929" strokeWidth="3" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1_19818">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>




  ),
  clock: ( 
  

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M21.8569 11.8212C21.8569 17.3452 17.3799 21.8212 11.8569 21.8212C6.33393 21.8212 1.85693 17.3452 1.85693 11.8212C1.85693 6.29917 6.33393 1.82117 11.8569 1.82117C17.3799 1.82117 21.8569 6.29917 21.8569 11.8212Z" fill="#56555C"/>
<path d="M15.4309 15.6356C15.2999 15.6356 15.1679 15.6016 15.0469 15.5306L11.1209 13.1886C10.8949 13.0526 10.7559 12.8076 10.7559 12.5436V7.49664C10.7559 7.08264 11.0919 6.74664 11.5059 6.74664C11.9199 6.74664 12.2559 7.08264 12.2559 7.49664V12.1176L15.8159 14.2406C16.1709 14.4536 16.2879 14.9136 16.0759 15.2696C15.9349 15.5046 15.6859 15.6356 15.4309 15.6356Z" fill="#56555C"/>
</svg>


  ),

  track: (
    
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_406_4015)">
      <path d="M21.0166 13.4249C20.2065 13.4252 19.4317 13.7564 18.8716 14.3417L16.5974 13.3752C16.7528 12.9101 16.8347 12.4236 16.84 11.9332C16.8345 9.29934 14.7007 7.16545 12.0668 7.16001C11.6686 7.16498 11.2726 7.22043 10.8884 7.3251L9.5807 4.99715C10.6879 3.7837 10.6017 1.90242 9.38827 0.795229C8.17482 -0.311958 6.29354 -0.225802 5.18635 0.987651C4.07916 2.2011 4.16532 4.08239 5.37877 5.18957C5.92913 5.69174 6.64792 5.96906 7.39299 5.96671C7.53601 5.96264 7.6786 5.94834 7.8196 5.92396L9.10538 8.21114C7.17413 9.71498 6.7157 12.447 8.05027 14.4989L4.28738 18.1395C2.74768 17.4564 0.945759 18.1509 0.262697 19.6906C-0.420366 21.2303 0.274087 23.0322 1.81379 23.7153C3.35349 24.3983 5.15542 23.7039 5.83848 22.1642C6.2184 21.3078 6.18367 20.3243 5.74421 19.4969L9.44448 15.917C11.4104 17.2251 14.04 16.8816 15.6039 15.1124L18.0582 16.1546C18.0512 16.2391 18.0333 16.3207 18.0333 16.4062C18.0333 18.0538 19.369 19.3895 21.0166 19.3895C22.6642 19.3895 23.9999 18.0538 23.9999 16.4062C23.9999 14.7585 22.6642 13.4229 21.0166 13.4229V13.4249Z" fill="#374957"/>
      </g>
      <defs>
      <clipPath id="clip0_406_4015">
      <rect width="24" height="24" fill="white"/>
      </clipPath>
      </defs>
    </svg>

  ),

  more: (
    
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 14C13 14.5523 13.4477 15 14 15C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13C13.4477 13 13 13.4477 13 14Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14C7 14.5523 7.44772 15 8 15C8.55228 15 9 14.5523 9 14C9 13.4477 8.55228 13 8 13C7.44772 13 7 13.4477 7 14Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 14C1 14.5523 1.44772 15 2 15C2.55228 15 3 14.5523 3 14C3 13.4477 2.55228 13 2 13C1.44772 13 1 13.4477 1 14Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 8C13 8.55228 13.4477 9 14 9C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44772 13 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7C1.44772 7 1 7.44772 1 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 2C13 2.55228 13.4477 3 14 3C14.5523 3 15 2.55228 15 2C15 1.44772 14.5523 1 14 1C13.4477 1 13 1.44772 13 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 2C7 2.55228 7.44772 3 8 3C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  ),
  edit: (

      
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.25 5.39581V5.36665C12.25 4.71325 12.25 4.38656 12.1228 4.13699C12.011 3.91747 11.8325 3.73899 11.613 3.62714C11.3634 3.49998 11.0367 3.49998 10.3833 3.49998L1.75 3.49998M1.75 3.49998L1.75 9.79998C1.75 10.4534 1.75 10.7801 1.87716 11.0296C1.98901 11.2492 2.16749 11.4276 2.38701 11.5395C2.63657 11.6666 2.96327 11.6666 3.61667 11.6666H4.08333M1.75 3.49998L1.75 3.26665C1.75 2.93995 1.75 2.7766 1.81358 2.65182C1.86951 2.54206 1.95875 2.45282 2.06851 2.39689C2.19329 2.33331 2.35664 2.33331 2.68333 2.33331H5.44674C5.58941 2.33331 5.66075 2.33331 5.72789 2.34943C5.78741 2.36372 5.84431 2.38729 5.8965 2.41927C5.95537 2.45535 6.00581 2.50579 6.1067 2.60668L7 3.49998M9.33334 8.16665L10.5 9.33331M6.41667 12.25V10.7916L10.7917 6.41665L12.25 7.87498L7.875 12.25H6.41667Z" stroke="#414148" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

  ),
  close: (
    
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  ),
  calender2: (


<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_1_20458)">
<path d="M4 4H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V4Z" stroke="#292929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4 8H20" stroke="#292929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 3V5" stroke="#292929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8 3V5" stroke="#292929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1_20458">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

   
  ),
    editPencil: (
    
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  ),
  loading: (
    <svg width={size} height={size} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#484D63FF"><g fill="none" fillRule="evenodd"><g transform="translate(1 1)" strokeWidth="2"><circle strokeOpacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>
  ),
  sparkle: (
<svg fill="#000000" width={size}  height={size}  viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">


<g data-name="Layer 2" id="Layer_2">

<path d="M18,11a1,1,0,0,1-1,1,5,5,0,0,0-5,5,1,1,0,0,1-2,0,5,5,0,0,0-5-5,1,1,0,0,1,0-2,5,5,0,0,0,5-5,1,1,0,0,1,2,0,5,5,0,0,0,5,5A1,1,0,0,1,18,11Z"/>

<path d="M19,24a1,1,0,0,1-1,1,2,2,0,0,0-2,2,1,1,0,0,1-2,0,2,2,0,0,0-2-2,1,1,0,0,1,0-2,2,2,0,0,0,2-2,1,1,0,0,1,2,0,2,2,0,0,0,2,2A1,1,0,0,1,19,24Z"/>

<path d="M28,17a1,1,0,0,1-1,1,4,4,0,0,0-4,4,1,1,0,0,1-2,0,4,4,0,0,0-4-4,1,1,0,0,1,0-2,4,4,0,0,0,4-4,1,1,0,0,1,2,0,4,4,0,0,0,4,4A1,1,0,0,1,28,17Z"/>

</g>

</svg>),
briefcase: (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_1_20454)">
<path d="M5 16H19V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V16Z" stroke="#292929" strokeWidth="2" strokeLinejoin="round"/>
<path d="M4 7H20V14C20 15.1046 19.1046 16 18 16H6C4.89543 16 4 15.1046 4 14V7Z" stroke="#292929" strokeWidth="2" strokeLinejoin="round"/>
<rect x="12" y="12" width="0.01" height="0.01" stroke="#292929" strokeWidth="3" strokeLinejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#292929" strokeWidth="2" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1_20454">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
),
edit2: (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2839 19.7822 18.9076C20 18.4802 20 17.921 20 16.8031V14M16 5L10 11V14H13L19 8M16 5L19 2L22 5L19 8M16 5L19 8" stroke="#252626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
),
delete: (
<svg width={size}height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#B50000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
),
send: (
  
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3078 13.6923L15.1539 8.84619M20.1113 5.88867L16.0207 19.1833C15.6541 20.3747 15.4706 20.9707 15.1544 21.1683C14.8802 21.3396 14.5406 21.3683 14.2419 21.2443C13.8975 21.1014 13.618 20.5433 13.0603 19.428L10.4694 14.2461C10.3809 14.0691 10.3366 13.981 10.2775 13.9043C10.225 13.8363 10.1645 13.7749 10.0965 13.7225C10.0215 13.6647 9.93486 13.6214 9.76577 13.5369L4.57192 10.9399C3.45662 10.3823 2.89892 10.1032 2.75601 9.75879C2.63207 9.4601 2.66033 9.12023 2.83169 8.84597C3.02928 8.52974 3.62523 8.34603 4.81704 7.97932L18.1116 3.88867C19.0486 3.60038 19.5173 3.45635 19.8337 3.57253C20.1094 3.67373 20.3267 3.89084 20.4279 4.16651C20.544 4.48283 20.3999 4.95126 20.1119 5.88729L20.1113 5.88867Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

)
  

};



const IconSet = ({ iconName, size, children }: IconSetProps) => {
  return (
    <div className="flex items-center gap-1">
      <div style={{width: size, height: size,}}>
        {icons[iconName]}
      </div>
        {children}
  
    </div>
  );
};

export  { IconSet, icons }