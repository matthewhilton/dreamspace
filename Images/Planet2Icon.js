import React from 'react';
import { Circle, Defs, G, Mask, Path, Svg } from 'react-native-svg'

function Planet2Icon() {
return (
  <Svg width="100%" height="100%"><Defs><Mask maskUnits="userSpaceOnUse" id="c"><Circle cx="-105.455" cy="-133.336" r="42.333" transform="scale(-1)" fill="#ffbc9b" strokeWidth="1.4"/></Mask><Mask maskUnits="userSpaceOnUse" id="b"><Circle cx="-105.455" cy="-133.336" r="42.333" transform="scale(-1)" fill="#ffbc9b" strokeWidth="1.4"/></Mask><Mask maskUnits="userSpaceOnUse" id="a"><Circle cx="-105.455" cy="-133.336" r="42.333" transform="scale(-1)" fill="#ffbc9b" strokeWidth="1.4"/></Mask></Defs><Circle cx="-90.336" cy="-167.732" r="42.333" transform="rotate(180 -24.001 -62.7)" fill="#ffbc9b"/><G fill="#ffceb2"><Path d="M41.955 126.533s32.884-6.426 55.94-16.631c23.057-10.206 45.736-32.884 45.736-32.884l-56.319-.378z" mask="url(#a)" transform="translate(-63.122 -90.625)"/><Path d="M44.601 150.723s37.042-5.67 59.72-19.655C127 117.083 146.277 98.94 152.324 92.893c6.048-6.048 13.608 10.961 13.608 10.961l-16.253 9.45s-24.569 22.3-40.066 31.372c-15.497 9.071-51.783 18.898-51.783 18.898l-14.363-14.363 13.985 35.53z" mask="url(#b)" transform="translate(-63.122 -90.625)"/><Path d="M70.304 196.08s33.261-20.032 54.806-39.31c21.545-19.276 28.726-28.347 28.726-28.347s4.536 27.214 4.158 29.104c-.378 1.89-45.735 28.348-45.735 28.348z" mask="url(#c)" transform="translate(-63.122 -90.625)"/></G></Svg>
);
}

export default Planet2Icon;