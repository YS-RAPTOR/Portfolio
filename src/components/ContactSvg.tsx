import type { RefObject } from "react";

//TODO: Test discord Link
export const ContactSvg = (props: { ref: RefObject<SVGSVGElement | null> }) => {
    return (
        <svg
            ref={props.ref}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1920 1080"
        >
            <defs>
                <linearGradient
                    id="lg1"
                    x1="960"
                    x2="960"
                    y1="440"
                    y2="420"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#6f7074" />
                    <stop offset=".27" stopColor="#b5b7b9" />
                    <stop offset=".33" stopColor="#adaeb0" />
                    <stop offset=".42" stopColor="#97989a" />
                    <stop offset=".55" stopColor="#737375" />
                    <stop offset=".68" stopColor="#424142" />
                    <stop offset=".76" stopColor="#232122" />
                    <stop offset=".96" stopColor="#3d3e3f" />
                    <stop offset="1" stopColor="#454647" />
                </linearGradient>
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg2"
                    x1="960"
                    x2="960"
                    y1="640"
                    y2="660"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg3"
                    x1="1600"
                    x2="1600"
                    y1="700"
                    y2="720"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg4"
                    x1="1600"
                    x2="1600"
                    y1="500"
                    y2="480"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg5"
                    x1="1700"
                    x2="1720"
                    y1="600"
                    y2="600"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg6"
                    x1="1500"
                    x2="1480"
                    y1="600"
                    y2="600"
                />
                <linearGradient
                    id="lg7"
                    x1="1500"
                    x2="1700"
                    y1="600"
                    y2="600"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#fff" stopOpacity=".05" />
                    <stop offset=".33" stopColor="#fff" stopOpacity=".05" />
                    <stop offset=".66" stopOpacity=".05" />
                    <stop offset="1" stopOpacity=".05" />
                </linearGradient>
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg8"
                    x1="1100"
                    x2="1100"
                    y1="300"
                    y2="320"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg9"
                    x1="1100"
                    x2="1100"
                    y1="100"
                    y2="80"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg10"
                    x1="1200"
                    x2="1220"
                    y1="200"
                    y2="200"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg11"
                    x1="1000"
                    x2="980"
                    y1="200"
                    y2="200"
                />
                <linearGradient
                    xlinkHref="#lg7"
                    id="lg12"
                    x1="1000"
                    x2="1200"
                    y1="200"
                    y2="200"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg13"
                    x1="400"
                    x2="400"
                    y1="400"
                    y2="420"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg14"
                    x1="400"
                    x2="400"
                    y1="200"
                    y2="180"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg15"
                    x1="500"
                    x2="520"
                    y1="300"
                    y2="300"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg16"
                    x1="300"
                    x2="280"
                    y1="300"
                    y2="300"
                />
                <linearGradient
                    xlinkHref="#lg7"
                    id="lg17"
                    x1="300"
                    x2="500"
                    y1="300"
                    y2="300"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg18"
                    x1="970"
                    x2="970"
                    y1="800"
                    y2="780"
                />
                <linearGradient
                    xlinkHref="#lg1"
                    id="lg19"
                    x1="970"
                    x2="970"
                    y1="900"
                    y2="920"
                />
                <linearGradient
                    xlinkHref="#lg7"
                    id="lg20"
                    x1="995.9"
                    x2="944.1"
                    y1="753.35"
                    y2="946.65"
                />
                <radialGradient
                    id="radial-gradient"
                    cx="960"
                    cy="540"
                    r="298.41"
                    fx="960"
                    fy="540"
                    gradientTransform="matrix(1 0 0 4.1 0 -1674)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#fff" stopOpacity=".05" />
                    <stop offset=".68" stopColor="#d9d9d9" stopOpacity=".05" />
                    <stop offset=".92" stopColor="#525252" stopOpacity=".05" />
                    <stop offset="1" stopOpacity=".05" />
                </radialGradient>
                {/* mail: [ */}
                {/*     "#c5211f", */}
                {/*     "#ea4235", */}
                {/*     "#fabd03", */}
                {/*     "#34a853", */}
                {/*     "#000000", */}
                {/* ] as GradientDefinition, */}
                {/* linkedin: [ */}
                {/*     { color: "#0077b5", stop: 0 }, */}
                {/*     { color: "#cfedfb", stop: 0.8 }, */}
                {/*     { color: "#ffffff", stop: 1 }, */}
                {/* ] as GradientDefinition, */}
                {/* discord: ["#5865f2", "#1a1b1e"] as GradientDefinition, */}
                {/* github: [ */}
                {/*     { color: "#8250df", stop: 0 }, */}
                {/*     { color: "#000aff", stop: 0.3 }, */}
                {/*     { color: "#0d1117", stop: 1 }, */}
                {/* ] as GradientDefinition, */}
                <radialGradient id="GR">
                    <stop offset="0" stopColor="#0d1117" />
                    <stop offset="0.3" stopColor="#000aff" />
                    <stop offset="1" stopColor="#8250df" />
                </radialGradient>
                <radialGradient id="LR">
                    <stop offset="0" stopColor="#0077b5" />
                    <stop offset="0.8" stopColor="#cfedfb" />
                    <stop offset="1" stopColor="#ffffff" />
                </radialGradient>
                <radialGradient id="MR">
                    <stop offset="0" stopColor="#000000" />
                    <stop offset="0.25" stopColor="#34a853" />
                    <stop offset="0.5" stopColor="#fabd03" />
                    <stop offset="0.75" stopColor="#ea4235" />
                    <stop offset="1" stopColor="#c5211f" />
                </radialGradient>
                <radialGradient id="DR">
                    <stop offset="0" stopColor="#1a1b1e" />
                    <stop offset="1" stopColor="#5865f2" />
                </radialGradient>

                <style>
                    {`
                        .bg {
                            fill: #09090b;
                        }
                        .low-opacity {
                            opacity: 0.25;
                        }
                        .text {
                            fill: #c6c6c6;
                        }
                        .board {
                            fill: #222;
                        }
                        .notch {
                            fill: #fff;
                            opacity: 0.1;
                        }
                        .trace {
                            fill: none;
                            stroke: rgba(250, 250, 250, 0.15);
                            stroke-linejoin: round;
                            stroke-width: 2px;
                        }
                        .pulse {
                            fill: none;
                            stroke: rgba(250, 250, 250, 0);
                            stroke-linejoin: round;
                            stroke-width: 2px;
                            stroke-linecap: round;
                        }
                    `}
                </style>
            </defs>
            <g id="Ends">
                <circle cx="1240" cy="70" r="5" />
                <circle cx="1260" cy="70" r="5" />
                <circle cx="1280" cy="200" r="5" />
                <circle cx="1280" cy="240" r="5" />
                <circle cx="1240" cy="280" r="5" />
                <circle cx="1140" cy="360" r="5" />
                <circle cx="1020" cy="390" r="5" />
                <circle cx="1060" cy="700" r="5" />
                <circle cx="1020" cy="700" r="5" />
                <circle cx="1040" cy="740" r="5" />
                <circle cx="1250" cy="850" r="5" />
                <circle cx="1520" cy="770" r="5" />
                <circle cx="1560" cy="770" r="5" />
                <circle cx="1680" cy="780" r="5" />
                <circle cx="1680" cy="760" r="5" />
                <circle cx="1680" cy="740" r="5" />
                <circle cx="1740" cy="720" r="5" />
                <circle cx="1760" cy="720" r="5" />
                <circle cx="1780" cy="490" r="5" />
                <circle cx="1780" cy="470" r="5" />
                <circle cx="1770" cy="500" r="5" />
                <circle cx="1750" cy="500" r="5" />
                <circle cx="1240" cy="870" r="5" />
                <circle cx="1220" cy="870" r="5" />
                <circle cx="1030" cy="940" r="5" />
                <circle cx="1030" cy="980" r="5" />
                <circle cx="950" cy="940" r="5" />
                <circle cx="910" cy="980" r="5" />
                <circle cx="870" cy="980" r="5" />
                <circle cx="750" cy="940" r="5" />
                <circle cx="730" cy="940" r="5" />
                <circle cx="920" cy="740" r="5" />
                <circle cx="910" cy="760" r="5" />
                <circle cx="870" cy="760" r="5" />
                <circle cx="900" cy="720" r="5" />
                <circle cx="1000" cy="360" r="5" />
                <circle cx="980" cy="390" r="5" />
                <circle cx="1230" cy="60" r="5" />
                <circle cx="1230" cy="40" r="5" />
                <circle cx="900" cy="50" r="5" />
                <circle cx="880" cy="50" r="5" />
                <circle cx="610" cy="120" r="5" />
                <circle cx="630" cy="120" r="5" />
                <circle cx="650" cy="120" r="5" />
                <circle cx="550" cy="240" r="5" />
                <circle cx="550" cy="260" r="5" />
                <circle cx="550" cy="280" r="5" />
                <circle cx="190" cy="490" r="5" />
                <circle cx="190" cy="510" r="5" />
                <circle cx="190" cy="530" r="5" />
                <circle cx="190" cy="550" r="5" />
                <circle cx="190" cy="470" r="5" />
            </g>
            <g id="Traces">
                <g id="G-1">
                    <path
                        className="pulse"
                        d="M1600,490v-30c-11.72-11.72-18.28-18.28-30-30h-110c-7.81-7.81-12.19-12.19-20-20v-20c-11.72-11.72-18.28-18.28-30-30h-120c-11.72,11.72-18.28,18.28-30,30v40"
                    />
                    <path
                        className="pulse"
                        d="M1640,490v-30c-15.62-15.62-24.38-24.38-40-40h-140c-3.91-3.91-6.09-6.09-10-10v-20c-15.62-15.62-24.38-24.38-40-40h-150c-15.62,15.62-24.38,24.38-40,40v40"
                    />
                    <path
                        className="pulse"
                        d="M1520,490v-30c-3.91-3.91-6.09-6.09-10-10h-50l-40-40v-20c-3.91-3.91-6.09-6.09-10-10h-60c-3.91,3.91-6.09,6.09-10,10v40"
                    />
                    <path
                        className="pulse"
                        d="M1560,490v-30c-7.81-7.81-12.19-12.19-20-20h-80c-11.72-11.72-18.28-18.28-30-30v-20c-7.81-7.81-12.19-12.19-20-20h-90c-7.81,7.81-12.19,12.19-20,20v40"
                    />
                    <path
                        className="trace"
                        d="M1600,490v-30c-11.72-11.72-18.28-18.28-30-30h-110c-7.81-7.81-12.19-12.19-20-20v-20c-11.72-11.72-18.28-18.28-30-30h-120c-11.72,11.72-18.28,18.28-30,30v40"
                    />
                    <path
                        className="trace"
                        d="M1640,490v-30c-15.62-15.62-24.38-24.38-40-40h-140c-3.91-3.91-6.09-6.09-10-10v-20c-15.62-15.62-24.38-24.38-40-40h-150c-15.62,15.62-24.38,24.38-40,40v40"
                    />
                    <path
                        className="trace"
                        d="M1520,490v-30c-3.91-3.91-6.09-6.09-10-10h-50l-40-40v-20c-3.91-3.91-6.09-6.09-10-10h-60c-3.91,3.91-6.09,6.09-10,10v40"
                    />
                    <path
                        className="trace"
                        d="M1560,490v-30c-7.81-7.81-12.19-12.19-20-20h-80c-11.72-11.72-18.28-18.28-30-30v-20c-7.81-7.81-12.19-12.19-20-20h-90c-7.81,7.81-12.19,12.19-20,20v40"
                    />
                </g>
                <g id="G-2">
                    <path
                        className="pulse"
                        d="M1490,520h-20.19c-19.53,19.53-30.47,30.47-50,50v129.96c-3.91,3.91-6.09,6.09-10,10h-59.81c-3.91-3.91-6.09-6.09-10-10v-49.96"
                    />
                    <path
                        className="pulse"
                        d="M1490,600h-19.85c-11.72,11.72-18.28,18.28-30,30v69.77c-11.72,11.72-18.28,18.28-30,30h-120.15c-11.72-11.72-18.28-18.28-30-30v-49.77"
                    />
                    <path
                        className="pulse"
                        d="M1490,680h-20.15c-3.91,3.91-6.09,6.09-10,10v10.11c-19.53,19.53-30.47,30.47-50,50h-179.85c-19.53-19.53-30.47-30.47-50-50v-50.11"
                    />
                    <path
                        className="pulse"
                        d="M1490,640h-20.19c-7.81,7.81-12.19,12.19-20,20v40.06c-15.62,15.62-24.38,24.38-40,40h-149.81l-40-40v-50.06"
                    />
                    <path
                        className="pulse"
                        d="M1490,560h-20.15l-40,40v99.98c-7.81,7.81-12.19,12.19-20,20h-89.85c-7.81-7.81-12.19-12.19-20-20v-49.98"
                    />

                    <path
                        className="trace"
                        d="M1490,520h-20.19c-19.53,19.53-30.47,30.47-50,50v129.96c-3.91,3.91-6.09,6.09-10,10h-59.81c-3.91-3.91-6.09-6.09-10-10v-49.96"
                    />
                    <path
                        className="trace"
                        d="M1490,600h-19.85c-11.72,11.72-18.28,18.28-30,30v69.77c-11.72,11.72-18.28,18.28-30,30h-120.15c-11.72-11.72-18.28-18.28-30-30v-49.77"
                    />
                    <path
                        className="trace"
                        d="M1490,680h-20.15c-3.91,3.91-6.09,6.09-10,10v10.11c-19.53,19.53-30.47,30.47-50,50h-179.85c-19.53-19.53-30.47-30.47-50-50v-50.11"
                    />
                    <path
                        className="trace"
                        d="M1490,640h-20.19c-7.81,7.81-12.19,12.19-20,20v40.06c-15.62,15.62-24.38,24.38-40,40h-149.81l-40-40v-50.06"
                    />
                    <path
                        className="trace"
                        d="M1490,560h-20.15l-40,40v99.98c-7.81,7.81-12.19,12.19-20,20h-89.85c-7.81-7.81-12.19-12.19-20-20v-49.98"
                    />
                </g>
                <g id="L">
                    <path
                        className="pulse"
                        d="M1150,790v-65c-1.95-1.95-3.05-3.05-5-5h0c-1.95-1.95-3.05-3.05-5-5v-65"
                    />
                    <path
                        className="pulse"
                        d="M1110,790v-65c-1.95-1.95-3.05-3.05-5-5h0c-1.95-1.95-3.05-3.05-5-5v-65"
                    />
                    <polyline
                        className="pulse"
                        points="1030 790 1030 760 1030 750 980 700 980 650"
                    />
                    <polyline
                        className="pulse"
                        points="990 790 990 750 940 700 940 650"
                    />
                    <path
                        className="pulse"
                        d="M830,790v-55c5.86-5.86,9.14-9.14,15-15h0c5.86-5.86,9.14-9.14,15-15v-55"
                    />
                    <path
                        className="pulse"
                        d="M790,790v-55c5.86-5.86,9.14-9.14,15-15h0c5.86-5.86,9.14-9.14,15-15v-55"
                    />

                    <path
                        className="trace"
                        d="M1150,790v-65c-1.95-1.95-3.05-3.05-5-5h0c-1.95-1.95-3.05-3.05-5-5v-65"
                    />
                    <path
                        className="trace"
                        d="M1110,790v-65c-1.95-1.95-3.05-3.05-5-5h0c-1.95-1.95-3.05-3.05-5-5v-65"
                    />
                    <polyline
                        className="trace"
                        points="1030 790 1030 760 1030 750 980 700 980 650"
                    />
                    <polyline
                        className="trace"
                        points="990 790 990 750 940 700 940 650"
                    />
                    <path
                        className="trace"
                        d="M830,790v-55c5.86-5.86,9.14-9.14,15-15h0c5.86-5.86,9.14-9.14,15-15v-55"
                    />
                    <path
                        className="trace"
                        d="M790,790v-55c5.86-5.86,9.14-9.14,15-15h0c5.86-5.86,9.14-9.14,15-15v-55"
                    />
                </g>
                <g id="D-2">
                    <line
                        className="pulse"
                        x1="1180"
                        y1="310"
                        x2="1180"
                        y2="430"
                    />
                    <polyline
                        className="pulse"
                        points="1020 310 1020 350 1060 390 1060 430"
                    />
                    <polyline
                        className="pulse"
                        points="1060 310 1060 350 1100 390 1100 430"
                    />
                    <polyline
                        className="pulse"
                        points="1100 310 1100 350 1140 390 1140 430"
                    />
                    <line
                        className="trace"
                        x1="1180"
                        y1="310"
                        x2="1180"
                        y2="430"
                    />
                    <polyline
                        className="trace"
                        points="1020 310 1020 350 1060 390 1060 430"
                    />
                    <polyline
                        className="trace"
                        points="1060 310 1060 350 1100 390 1100 430"
                    />
                    <polyline
                        className="trace"
                        points="1100 310 1100 350 1140 390 1140 430"
                    />
                </g>
                <g id="D-1">
                    <path
                        className="pulse"
                        d="M990,280h-20l-10,10v30c-23.43,23.43-36.57,36.57-60,60h0v50"
                    />
                    <path
                        className="pulse"
                        d="M990,240h-20l-20,20v60c-19.53,19.53-30.47,30.47-50,50h-20l-20,20v40"
                    />
                    <path
                        className="pulse"
                        d="M990,200h-20l-30,30v90l-40,40h-50l-30,30v40"
                    />
                    <path
                        className="pulse"
                        d="M990,160h-20c-15.62,15.62-24.38,24.38-40,40v120l-30,30h-80c-15.62,15.62-24.38,24.38-40,40v40"
                    />
                    <path
                        className="pulse"
                        d="M990,120h-20c-19.53,19.53-30.47,30.47-50,50v150l-20,20h-110c-19.53,19.53-30.47,30.47-50,50v40"
                    />
                    <path
                        className="pulse"
                        d="M1020,90v-20c-3.91-3.91-6.09-6.09-10-10h-40c-23.43,23.43-36.57,36.57-60,60v200l-10,10h-140c-23.43,23.43-36.57,36.57-60,60v40"
                    />

                    <path
                        className="trace"
                        d="M990,280h-20l-10,10v30c-23.43,23.43-36.57,36.57-60,60h0v50"
                    />
                    <path
                        className="trace"
                        d="M990,240h-20l-20,20v60c-19.53,19.53-30.47,30.47-50,50h-20l-20,20v40"
                    />
                    <path
                        className="trace"
                        d="M990,200h-20l-30,30v90l-40,40h-50l-30,30v40"
                    />
                    <path
                        className="trace"
                        d="M990,160h-20c-15.62,15.62-24.38,24.38-40,40v120l-30,30h-80c-15.62,15.62-24.38,24.38-40,40v40"
                    />
                    <path
                        className="trace"
                        d="M990,120h-20c-19.53,19.53-30.47,30.47-50,50v150l-20,20h-110c-19.53,19.53-30.47,30.47-50,50v40"
                    />
                    <path
                        className="trace"
                        d="M1020,90v-20c-3.91-3.91-6.09-6.09-10-10h-40c-23.43,23.43-36.57,36.57-60,60v200l-10,10h-140c-23.43,23.43-36.57,36.57-60,60v40"
                    />
                </g>
                <g id="M-2">
                    <path className="pulse" d="M510,380h50l20,20v30" />
                    <path
                        className="pulse"
                        d="M510,340h70c15.62,15.62,24.38,24.38,40,40v50"
                    />
                    <path
                        className="pulse"
                        d="M480,190v-20l10-10h110l60,60v210"
                    />

                    <path className="trace" d="M510,380h50l20,20v30" />
                    <path
                        className="trace"
                        d="M510,340h70c15.62,15.62,24.38,24.38,40,40v50"
                    />
                    <path
                        className="trace"
                        d="M480,190v-20l10-10h110l60,60v210"
                    />
                </g>
                <g id="M-1">
                    <path
                        className="pulse"
                        d="M480,410v70h0c7.83,7.81,12.17,12.19,20,20l.71,180.26c3.9,3.89,6.1,6.08,10,9.97h60.03c3.91-3.91,6.09-6.09,10-10v-30"
                    />
                    <path
                        className="pulse"
                        d="M440,410v40h0c19.53,19.53,30.47,30.47,50,50v180l20,20h90l20-20v-30"
                    />
                    <path
                        className="pulse"
                        d="M400,410v20l30,30h10l40,40v180c11.72,11.72,18.28,18.28,30,30h120c11.72-11.72,18.28-18.28,30-30v-30"
                    />
                    <path
                        className="pulse"
                        d="M360,410v20l40,40h40l30,30v180c15.62,15.62,24.38,24.38,40,40h150l40-40v-30"
                    />
                    <path
                        className="pulse"
                        d="M320,410v20l50,50h70l20,20v180c19.53,19.53,30.47,30.47,50,50h180c19.53-19.53,30.47-30.47,50-50v-30"
                    />
                    <path
                        className="pulse"
                        d="M290,380h-20l-10,10v40l60,60h120l10,10v180l60,60h210l60-60v-30"
                    />

                    <path
                        className="trace"
                        d="M480,410v70h0c7.83,7.81,12.17,12.19,20,20l.71,180.26c3.9,3.89,6.1,6.08,10,9.97h60.03c3.91-3.91,6.09-6.09,10-10v-30"
                    />
                    <path
                        className="trace"
                        d="M440,410v40h0c19.53,19.53,30.47,30.47,50,50v180l20,20h90l20-20v-30"
                    />
                    <path
                        className="trace"
                        d="M400,410v20l30,30h10l40,40v180c11.72,11.72,18.28,18.28,30,30h120c11.72-11.72,18.28-18.28,30-30v-30"
                    />
                    <path
                        className="trace"
                        d="M360,410v20l40,40h40l30,30v180c15.62,15.62,24.38,24.38,40,40h150l40-40v-30"
                    />
                    <path
                        className="trace"
                        d="M320,410v20l50,50h70l20,20v180c19.53,19.53,30.47,30.47,50,50h180c19.53-19.53,30.47-30.47,50-50v-30"
                    />
                    <path
                        className="trace"
                        d="M290,380h-20l-10,10v40l60,60h120l10,10v180l60,60h210l60-60v-30"
                    />
                </g>
                <g id="ET">
                    <path
                        className="pulse"
                        d="M1680,490v-15l5-5h90M1780,465c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1710,600h40c15.62-15.62,24.38-24.38,40-40v-60l-6.46-6.46M1780,485c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1710,520h30l10-10v-5M1750,495c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1710,560h40l20-20v-35M1770,495c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1680,710v25M1680,735c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1710,680h20l10,10v25M1740,715c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1710,640h20l30,30v45M1760,715c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1640,710v30l20,20h15M1685,760c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5Z"
                    />
                    <path
                        className="pulse"
                        d="M1600,710v30l40,40h35M1685,780c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5Z"
                    />
                    <path
                        className="pulse"
                        d="M1100,90v-20c-11.72-11.72-18.28-18.28-30-30h-180l-6.46,6.46M880,45c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M440,190v-20c7.81-7.81,12.19-12.19,20-20h160l26.46-26.46M650,115c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M510,220h20c6.55,6.55,10.69,10.69,16.46,16.46M550,235c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M510,260h35M550,255c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M510,300h20c6.55-6.55,10.69-10.69,16.46-16.46M555,280c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5Z"
                    />
                    <path
                        className="pulse"
                        d="M320,190v-20l-10-10h-60l-50,50v250c-2.57,2.57-4.4,4.4-6.46,6.46M190,465c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M290,220h-40l-40,40v210c-6.55,6.55-10.69,10.69-16.46,16.46M190,485c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M290,260h-40l-30,30v190l-26.46,26.46M190,505c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M290,300h-40c-7.81,7.81-12.19,12.19-20,20v170c-14.4,14.4-22.97,22.97-36.46,36.46M190,525c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M290,340h-40l-10,10v150c-18.32,18.32-29.08,29.08-46.46,46.46M190,545c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M400,190v-20l30-30h180c6.55-6.55,10.69-10.69,16.46-16.46M630,115c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M360,190v-20l40-40h200c2.57-2.57,4.4-4.4,6.46-6.46M610,115c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1060,90v-20c-7.81-7.81-12.19-12.19-20-20h-135M900,45c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1140,90v-30c7.81-7.81,12.19-12.19,20-20h65M1230,35c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1180,90v-20l10-10h35M1230,55c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1210,120h20l10-10v-35M1240,65c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1210,160h30c7.81-7.81,12.19-12.19,20-20v-65M1260,65c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1210,280h25M1240,275c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1210,240h65M1280,235c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1210,200h65M1280,195c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M980,430v-35M980,385c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1020,430v-35M1020,385c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1140,310v45M1140,355c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M940,430v-50l30-30h30v5M1000,355c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1070,790v-20l-26.46-26.46M1040,735c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M950,790v-40l-10-10h-15M920,735c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M900,650v65M900,715c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M910,790v-25M910,755c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M870,790v-25M870,755c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1060,650v45M1060,695c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1020,650v45M1020,695c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1520,710v55M1520,765c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1070,910v20l30,30h130l30-30v-70l-6.46-6.46M1250,845c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1110,910v20l20,20h90l20-20v-55M1240,865c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1150,910v20l10,10h50l10-10v-55M1220,865c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1030,910v25M1030,935c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M990,910v30c14.4,14.4,22.97,22.97,36.46,36.46M1035,980c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5Z"
                    />
                    <path
                        className="pulse"
                        d="M950,910v25M950,935c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M910,910v65M910,975c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M870,910v65M870,975c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M790,910v20l-10,10h-25M750,935c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M830,910v20c-7.81,7.81-12.19,12.19-20,20h-70l-6.46-6.46M730,935c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="pulse"
                        d="M1560,710v55M1560,765c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />

                    <path
                        className="trace"
                        d="M1680,490v-15l5-5h90M1780,465c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1710,600h40c15.62-15.62,24.38-24.38,40-40v-60l-6.46-6.46M1780,485c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1710,520h30l10-10v-5M1750,495c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1710,560h40l20-20v-35M1770,495c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1680,710v25M1680,735c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1710,680h20l10,10v25M1740,715c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1710,640h20l30,30v45M1760,715c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1640,710v30l20,20h15M1685,760c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5Z"
                    />
                    <path
                        className="trace"
                        d="M1600,710v30l40,40h35M1685,780c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5Z"
                    />
                    <path
                        className="trace"
                        d="M1100,90v-20c-11.72-11.72-18.28-18.28-30-30h-180l-6.46,6.46M880,45c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M440,190v-20c7.81-7.81,12.19-12.19,20-20h160l26.46-26.46M650,115c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M510,220h20c6.55,6.55,10.69,10.69,16.46,16.46M550,235c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M510,260h35M550,255c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M510,300h20c6.55-6.55,10.69-10.69,16.46-16.46M555,280c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5Z"
                    />
                    <path
                        className="trace"
                        d="M320,190v-20l-10-10h-60l-50,50v250c-2.57,2.57-4.4,4.4-6.46,6.46M190,465c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M290,220h-40l-40,40v210c-6.55,6.55-10.69,10.69-16.46,16.46M190,485c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M290,260h-40l-30,30v190l-26.46,26.46M190,505c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M290,300h-40c-7.81,7.81-12.19,12.19-20,20v170c-14.4,14.4-22.97,22.97-36.46,36.46M190,525c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M290,340h-40l-10,10v150c-18.32,18.32-29.08,29.08-46.46,46.46M190,545c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M400,190v-20l30-30h180c6.55-6.55,10.69-10.69,16.46-16.46M630,115c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M360,190v-20l40-40h200c2.57-2.57,4.4-4.4,6.46-6.46M610,115c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1060,90v-20c-7.81-7.81-12.19-12.19-20-20h-135M900,45c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1140,90v-30c7.81-7.81,12.19-12.19,20-20h65M1230,35c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1180,90v-20l10-10h35M1230,55c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1210,120h20l10-10v-35M1240,65c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1210,160h30c7.81-7.81,12.19-12.19,20-20v-65M1260,65c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1210,280h25M1240,275c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1210,240h65M1280,235c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1210,200h65M1280,195c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M980,430v-35M980,385c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1020,430v-35M1020,385c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1140,310v45M1140,355c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M940,430v-50l30-30h30v5M1000,355c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1070,790v-20l-26.46-26.46M1040,735c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M950,790v-40l-10-10h-15M920,735c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M900,650v65M900,715c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M910,790v-25M910,755c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M870,790v-25M870,755c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1060,650v45M1060,695c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1020,650v45M1020,695c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1520,710v55M1520,765c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1070,910v20l30,30h130l30-30v-70l-6.46-6.46M1250,845c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1110,910v20l20,20h90l20-20v-55M1240,865c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1150,910v20l10,10h50l10-10v-55M1220,865c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1030,910v25M1030,935c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M990,910v30c14.4,14.4,22.97,22.97,36.46,36.46M1035,980c0,2.76-2.24,5-5,5s-5-2.24-5-5,2.24-5,5-5,5,2.24,5,5Z"
                    />
                    <path
                        className="trace"
                        d="M950,910v25M950,935c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M910,910v65M910,975c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M870,910v65M870,975c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                    <path
                        className="trace"
                        d="M790,910v20l-10,10h-25M750,935c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M830,910v20c-7.81,7.81-12.19,12.19-20,20h-70l-6.46-6.46M730,935c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Z"
                    />
                    <path
                        className="trace"
                        d="M1560,710v55M1560,765c2.76,0,5,2.24,5,5s-2.24,5-5,5-5-2.24-5-5,2.24-5,5-5Z"
                    />
                </g>
            </g>
            <g id="Top">
                <g id="Reach_Out">
                    <g id="Top_Leads">
                        <path
                            id="Gradient"
                            d="M570 420h780v20H570z"
                            style={{ fill: "url(#lg1)" }}
                        />
                        <path
                            d="M590 417.5h20v25h-20zM630 417.5h20v25h-20zM670 417.5h20v25h-20zM710 417.5h20v25h-20zM750 417.5h20v25h-20zM790 417.5h20v25h-20zM830 417.5h20v25h-20zM870 417.5h20v25h-20zM910 417.5h20v25h-20zM950 417.5h20v25h-20zM990 417.5h20v25h-20zM1070 417.5h20v25h-20zM1030 417.5h20v25h-20zM1110 417.5h20v25h-20zM1190 417.5h20v25h-20zM1150 417.5h20v25h-20zM1230 417.5h20v25h-20zM1310 417.5h20v25h-20zM1270 417.5h20v25h-20z"
                            className="bg"
                        />
                    </g>
                    <g id="Bot_Leads">
                        <path
                            id="Gradient-2"
                            d="M570 640h780v20H570z"
                            style={{ fill: "url(#lg2)" }}
                        />
                        <path
                            d="M590 637.5h20v25h-20zM630 637.5h20v25h-20zM670 637.5h20v25h-20zM710 637.5h20v25h-20zM750 637.5h20v25h-20zM790 637.5h20v25h-20zM830 637.5h20v25h-20zM870 637.5h20v25h-20zM910 637.5h20v25h-20zM950 637.5h20v25h-20zM1030 637.5h20v25h-20zM990 637.5h20v25h-20zM1070 637.5h20v25h-20zM1150 637.5h20v25h-20zM1110 637.5h20v25h-20zM1190 637.5h20v25h-20zM1270 637.5h20v25h-20zM1310 637.5h20v25h-20zM1230 637.5h20v25h-20z"
                            className="bg"
                        />
                    </g>
                    <g id="Center_Board">
                        <path d="M550 440h820v200H550z" className="board" />
                        <path
                            d="M1365 445v190H555V445zm5-5H550v200h820z"
                            style={{ fill: "url(#radial-gradient)" }}
                        />
                    </g>
                    <circle
                        id="Circle_Right"
                        cx="670"
                        cy="540"
                        r="20"
                        className="low-opacity"
                    />
                    <path
                        id="Notch"
                        d="M570 540c0 11.05-8.95 20-20 20v-40c11.05 0 20 8.95 20 20"
                        className="board"
                    />
                    <path
                        id="Notch-2"
                        d="M570 540c0 11.05-8.95 20-20 20v-40c11.05 0 20 8.95 20 20"
                        className="notch"
                    />
                    <circle
                        id="Circle_Left"
                        cx="1250"
                        cy="540"
                        r="20"
                        className="low-opacity"
                    />
                    <text
                        style={{
                            fill: "#c6c6c6",
                            fontFamily: "Roboto Mono",
                            fontSize: "71.02px",
                            fontWeight: 700,
                        }}
                        transform="translate(770 560.77)"
                    >
                        <tspan x="0" y="0">
                            Reach Out
                        </tspan>
                    </text>
                </g>
                <a
                    className="cursor-pointer"
                    href="https://github.com/YS-RAPTOR"
                    target="_blank"
                >
                    <g id="Github">
                        <g id="Bottom_Leads">
                            <path
                                id="Gradient-3"
                                d="M1510 700h180v20h-180z"
                                style={{ fill: "url(#lg3)" }}
                            />
                            <path
                                d="M1530 697.5h20v25h-20zM1570 697.5h20v25h-20zM1610 697.5h20v25h-20zM1650 697.5h20v25h-20z"
                                className="bg"
                            />
                        </g>
                        <g id="Top_Leads-2">
                            <path
                                id="Gradient-4"
                                d="M1510 480h180v20h-180z"
                                style={{ fill: "url(#lg4)" }}
                            />
                            <path
                                d="M1530 477.5h20v25h-20zM1570 477.5h20v25h-20zM1610 477.5h20v25h-20zM1650 477.5h20v25h-20z"
                                className="bg"
                            />
                        </g>
                        <g id="Right_leads">
                            <path
                                id="Gradient-5"
                                d="M1700 510h20v180h-20z"
                                style={{ fill: "url(#lg5)" }}
                            />
                            <path
                                d="M1697.5 530h25v20h-25zM1697.5 570h25v20h-25zM1697.5 610h25v20h-25zM1697.5 650h25v20h-25z"
                                className="bg"
                            />
                        </g>
                        <g id="Left_Leads">
                            <path
                                id="Gradient-6"
                                d="M1480 510h20v180h-20z"
                                style={{ fill: "url(#lg6)" }}
                            />
                            <path
                                d="M1477.5 530h25v20h-25zM1477.5 570h25v20h-25zM1477.5 610h25v20h-25zM1477.5 650h25v20h-25z"
                                className="bg"
                            />
                        </g>
                        <g id="Center_Board-2">
                            <path
                                d="M1500 500h200v200h-200z"
                                className="board"
                            />
                            <path
                                d="M1695 505v190h-190V505zm5-5h-200v200h200z"
                                style={{ fill: "url(#lg7)" }}
                            />
                        </g>
                        <circle
                            id="Notch-3"
                            cx="1510"
                            cy="510"
                            r="2.5"
                            className="notch"
                        />
                        <path
                            id="Icon"
                            d="M1588.12 621.36c0 .29-.33.52-.75.52-.48.04-.81-.19-.81-.52 0-.29.33-.52.75-.52.43-.04.81.19.81.52m-4.51-.65c-.1.29.19.62.62.71.38.14.81 0 .9-.29s-.19-.62-.62-.75c-.38-.1-.8.04-.9.33m6.4-.24c-.42.1-.71.38-.67.71.04.29.42.48.85.38.42-.1.71-.38.67-.67-.04-.28-.43-.46-.85-.42m9.53-55.47c-20.08 0-35.43 15.24-35.43 35.32 0 16.05 10.1 29.79 24.53 34.62 1.85.33 2.5-.81 2.5-1.75s-.04-5.85-.04-8.89c0 0-10.13 2.17-12.26-4.31 0 0-1.65-4.21-4.02-5.3 0 0-3.31-2.27.23-2.23 0 0 3.6.29 5.59 3.73 3.17 5.59 8.48 3.98 10.55 3.03.33-2.32 1.27-3.92 2.32-4.88-8.09-.9-16.25-2.07-16.25-15.99 0-3.98 1.1-5.98 3.42-8.53-.38-.94-1.61-4.82.38-9.83 3.03-.94 9.99 3.91 9.99 3.91 2.89-.81 6.01-1.23 9.09-1.23s6.2.42 9.09 1.23c0 0 6.96-4.86 9.99-3.91 1.98 5.02.75 8.89.38 9.83 2.32 2.56 3.73 4.56 3.73 8.53 0 13.97-8.53 15.08-16.62 15.99 1.33 1.14 2.46 3.31 2.46 6.72 0 4.88-.04 10.91-.04 12.1 0 .94.67 2.08 2.5 1.75 14.47-4.81 24.29-18.54 24.29-34.59 0-20.08-16.28-35.32-36.36-35.32Zm-21.37 49.92c-.19.14-.14.48.1.75.23.23.56.33.75.14.19-.14.14-.48-.1-.75-.23-.23-.56-.33-.75-.14m-1.56-1.17c-.1.19.04.42.33.56.23.14.52.1.62-.1.1-.19-.04-.42-.33-.56-.29-.09-.52-.04-.62.1m4.69 5.15c-.23.19-.14.62.19.9.33.33.75.38.94.14.19-.19.1-.62-.19-.9-.32-.33-.75-.38-.94-.14m-1.65-2.12c-.23.14-.23.52 0 .85s.62.48.81.33c.23-.19.23-.56 0-.9-.2-.33-.58-.48-.81-.29Z"
                            className="text"
                        />
                    </g>
                </a>
                <a
                    className="cursor-pointer"
                    target="_blank"
                    href="discord://user?id=365336776283389952"
                >
                    <g id="Discord">
                        <g id="Bottom_Leads-2">
                            <path
                                id="Gradient-7"
                                d="M1010 300h180v20h-180z"
                                style={{ fill: "url(#lg8)" }}
                            />
                            <path
                                d="M1030 297.5h20v25h-20zM1070 297.5h20v25h-20zM1110 297.5h20v25h-20zM1150 297.5h20v25h-20z"
                                className="bg"
                            />
                        </g>
                        <g id="Top_Leads-3">
                            <path
                                id="Gradient-8"
                                d="M1010 80h180v20h-180z"
                                style={{ fill: "url(#lg9)" }}
                            />
                            <path
                                d="M1030 77.5h20v25h-20zM1070 77.5h20v25h-20zM1110 77.5h20v25h-20zM1150 77.5h20v25h-20z"
                                className="bg"
                            />
                        </g>
                        <g id="Right_leads-2">
                            <path
                                id="Gradient-9"
                                d="M1200 110h20v180h-20z"
                                style={{ fill: "url(#lg10)" }}
                            />
                            <path
                                d="M1197.5 130h25v20h-25zM1197.5 170h25v20h-25zM1197.5 210h25v20h-25zM1197.5 250h25v20h-25z"
                                className="bg"
                            />
                        </g>
                        <g id="Left_Leads-2">
                            <path
                                id="Gradient-10"
                                d="M980 110h20v180h-20z"
                                style={{ fill: "url(#lg11)" }}
                            />
                            <path
                                d="M977.5 130h25v20h-25zM977.5 170h25v20h-25zM977.5 210h25v20h-25zM977.5 250h25v20h-25z"
                                className="bg"
                            />
                        </g>
                        <g id="Center_Board-3">
                            <path
                                d="M1000 100h200v200h-200z"
                                className="board"
                            />
                            <path
                                d="M1195 105v190h-190V105zm5-5h-200v200h200z"
                                style={{ fill: "url(#lg12)" }}
                            />
                        </g>
                        <circle
                            id="Notch-4"
                            cx="1010"
                            cy="110"
                            r="2.5"
                            className="notch"
                        />
                        <path
                            id="Icon-2"
                            d="M1127.39 175.07s-.06-.08-.11-.09a65.2 65.2 0 0 0-16.02-4.97c-.1-.02-.2.03-.25.12-.73 1.33-1.4 2.7-2 4.1-5.97-.91-12.03-.91-18 0-.6-1.4-1.27-2.77-2.02-4.1a.235.235 0 0 0-.25-.12c-5.54.95-10.93 2.62-16.04 4.97-.04.02-.08.05-.11.09-10.21 15.25-13 30.12-11.64 44.81 0 .07.05.14.11.19 5.94 4.4 12.59 7.75 19.66 9.92.1.03.22 0 .28-.09a46 46 0 0 0 4.02-6.54.26.26 0 0 0-.12-.34h-.02a43 43 0 0 1-6.15-2.93.247.247 0 0 1-.08-.35c.02-.02.03-.05.06-.07.42-.31.83-.63 1.22-.95.07-.06.17-.08.25-.04 12.88 5.88 26.84 5.88 39.57 0a.23.23 0 0 1 .25.03c.39.32.8.66 1.22.96.11.09.13.25.04.36-.02.02-.04.04-.07.06a41 41 0 0 1-6.15 2.92c-.13.05-.19.2-.14.33v.02a53 53 0 0 0 4.02 6.54c.06.09.18.13.28.09a65 65 0 0 0 19.71-9.92c.06-.04.1-.11.11-.19 1.63-16.97-2.76-31.71-11.65-44.8Zm-40.45 35.86c-3.88 0-7.07-3.56-7.07-7.93s3.13-7.94 7.07-7.94 7.14 3.59 7.07 7.93c0 4.38-3.13 7.94-7.07 7.94m26.17 0c-3.88 0-7.07-3.56-7.07-7.93s3.12-7.94 7.07-7.94 7.14 3.59 7.07 7.93c0 4.38-3.11 7.94-7.07 7.94"
                            className="text"
                        />
                    </g>
                </a>
                <a
                    className="cursor-pointer"
                    href="mailto:yashan.sumanaratne@gmail.com"
                >
                    <g id="Mail">
                        <g id="Bottom_Leads-3">
                            <path
                                id="Gradient-11"
                                d="M310 400h180v20H310z"
                                style={{ fill: "url(#lg13)" }}
                            />
                            <path
                                d="M330 397.5h20v25h-20zM370 397.5h20v25h-20zM410 397.5h20v25h-20zM450 397.5h20v25h-20z"
                                className="bg"
                            />
                        </g>
                        <g id="Top_Leads-4">
                            <path
                                id="Gradient-12"
                                d="M310 180h180v20H310z"
                                style={{ fill: "url(#lg14)" }}
                            />
                            <path
                                d="M330 177.5h20v25h-20zM370 177.5h20v25h-20zM410 177.5h20v25h-20zM450 177.5h20v25h-20z"
                                className="bg"
                            />
                        </g>
                        <g id="Right_leads-3">
                            <path
                                id="Gradient-13"
                                d="M500 210h20v180h-20z"
                                style={{ fill: "url(#lg15)" }}
                            />
                            <path
                                d="M497.5 230h25v20h-25zM497.5 270h25v20h-25zM497.5 310h25v20h-25zM497.5 350h25v20h-25z"
                                className="bg"
                            />
                        </g>
                        <g id="Left_Leads-3">
                            <path
                                id="Gradient-14"
                                d="M280 210h20v180h-20z"
                                style={{ fill: "url(#lg16)" }}
                            />
                            <path
                                d="M277.5 230h25v20h-25zM277.5 270h25v20h-25zM277.5 310h25v20h-25zM277.5 350h25v20h-25z"
                                className="bg"
                            />
                        </g>
                        <g id="Center_Board-4">
                            <path d="M300 200h200v200H300z" className="board" />
                            <path
                                d="M495 205v190H305V205zm5-5H300v200h200z"
                                style={{ fill: "url(#lg17)" }}
                            />
                        </g>
                        <circle
                            id="Notch-5"
                            cx="310"
                            cy="210"
                            r="2.5"
                            className="notch"
                        />
                        <g id="Icon-3">
                            <path
                                d="M440 270v12.97l-40 27.34-40-27.34V270z"
                                className="text"
                            />
                            <path
                                d="m400 316.36 40-27.33V330h-80v-40.97z"
                                className="text"
                            />
                        </g>
                    </g>
                </a>
                <a
                    className="cursor-pointer"
                    href="https://www.linkedin.com/in/ysraptor"
                    target="_blank"
                >
                    <g id="Linkedin">
                        <g id="Bot_Leads-2">
                            <path
                                id="Gradient-15"
                                d="M780 780h380v20H780z"
                                style={{ fill: "url(#lg18)" }}
                            />
                            <path
                                d="M800 777.59h20v24.72h-20zM840 777.59h20v24.72h-20zM880 777.59h20v24.72h-20zM920 777.65h20v24.85h-20zM960 777.59h20v24.72h-20zM1000 777.59h20v24.72h-20zM1040 777.59h20v24.72h-20zM1080.56 778.15h18.89v23.61h-18.89z"
                                className="bg"
                            />
                            <path
                                d="M1098.89 778.7v22.5h-17.78v-22.5zm1.11-1.11h-20v24.72h20zM1120.56 778.06h18.88v23.79h-18.88z"
                                className="bg"
                            />
                            <path
                                d="M1138.88 778.62v22.68h-17.77v-22.68zm1.12-1.12h-20v24.91h20z"
                                className="bg"
                            />
                        </g>
                        <g id="Top_Leads-5">
                            <path
                                id="Gradient-16"
                                d="M780 900h380v20H780z"
                                style={{ fill: "url(#lg19)" }}
                            />
                            <path
                                d="M800 897.59h20v24.72h-20zM840 897.59h20v24.72h-20zM880 897.59h20v24.72h-20zM920 897.65h20v24.85h-20zM960 897.59h20v24.72h-20zM1000 897.59h20v24.72h-20zM1040 897.59h20v24.72h-20zM1080.56 898.15h18.89v23.61h-18.89z"
                                className="bg"
                            />
                            <path
                                d="M1098.89 898.7v22.5h-17.78v-22.5zm1.11-1.11h-20v24.72h20zM1120.56 898.06h18.88v23.79h-18.88z"
                                className="bg"
                            />
                            <path
                                d="M1138.88 898.62v22.68h-17.77v-22.68zm1.12-1.12h-20v24.91h20z"
                                className="bg"
                            />
                        </g>
                        <g id="Center_Board-5">
                            <path d="M770 800h400v100H770z" className="board" />
                            <path
                                d="M1165 805v90H775v-90zm5-5H770v100h400z"
                                style={{ fill: "url(#lg20)" }}
                            />
                        </g>
                        <path
                            id="Notch-6"
                            d="M780 850c0 5.52-4.48 10-10 10v-20c5.52 0 10 4.48 10 10"
                            className="board"
                        />
                        <path
                            id="Notch-7"
                            d="M780 850c0 5.52-4.48 10-10 10v-20c5.52 0 10 4.48 10 10"
                            className="notch"
                        />
                        <g id="Icon-4">
                            <path
                                d="M1045.8 832.7h-33.88c-1.63 0-2.93 1.28-2.93 2.86v34.28c0 1.58 1.31 2.86 2.93 2.86h33.88c1.62 0 2.93-1.28 2.93-2.86v-34.28c0-1.58-1.32-2.86-2.93-2.86m-24.77 33.48h-6v-18.06h6zm-3-20.52h-.04c-2.02 0-3.32-1.39-3.32-3.12s1.34-3.13 3.4-3.13 3.32 1.35 3.35 3.13c0 1.73-1.3 3.12-3.4 3.12Zm24.65 20.52h-6v-9.66c0-2.43-.87-4.09-3.04-4.09-1.66 0-2.65 1.12-3.08 2.2-.16.39-.2.92-.2 1.47v10.09h-6s.08-16.36 0-18.06h6v2.62c.79-1.24 2.17-3.05 5.41-3.05 3.95 0 6.91 2.59 6.91 8.13v10.36Z"
                                className="text"
                            />
                            <path
                                id="path16"
                                d="M897.72 866.21h16.59v-5.45h-10.58v-20.78h-6v26.22Z"
                                className="text"
                            />
                            <path
                                id="path18"
                                d="M922.7 866.21v-18.06h-6v18.06zm-3-20.53c2.09 0 3.4-1.39 3.4-3.12-.04-1.77-1.3-3.12-3.36-3.12s-3.4 1.35-3.4 3.12 1.3 3.12 3.32 3.12z"
                                className="text"
                            />
                            <path
                                id="path20"
                                d="M925.49 866.21h6v-10.09c0-.54.04-1.08.2-1.47.43-1.08 1.42-2.2 3.08-2.2 2.17 0 3.04 1.66 3.04 4.08v9.66h6v-10.36c0-5.55-2.96-8.13-6.91-8.13-3.24 0-4.66 1.81-5.45 3.04h.04v-2.62h-6c.08 1.69 0 18.06 0 18.06Z"
                                className="text"
                            />
                            <path
                                id="path22"
                                d="M952.29 839.98h-6v26.22h6v-5.86l1.5-1.89 4.7 7.74h7.39l-7.9-11.21 6.91-7.63h-7.23s-4.94 6.82-5.37 7.63v-15.02Z"
                                className="text"
                            />
                            <path
                                id="path24"
                                d="M981.93 858.67c.08-.46.2-1.35.2-2.36 0-4.67-2.37-9.41-8.61-9.41-6.68 0-9.76 5.28-9.76 10.07 0 5.92 3.75 9.62 10.31 9.62 2.61 0 5.02-.38 6.99-1.19l-.79-3.96c-1.62.54-3.28.81-5.33.81-2.8 0-5.25-1.15-5.45-3.6l12.44.04Zm-12.48-4.06c.16-1.54 1.18-3.82 3.75-3.82 2.72 0 3.36 2.43 3.36 3.82z"
                                className="text"
                            />
                            <path
                                id="path26"
                                d="M996.94 839.98v9.08h-.08c-.87-1.27-2.69-2.12-5.09-2.12-4.62 0-8.69 3.7-8.65 10.02 0 5.86 3.67 9.67 8.25 9.67 2.49 0 4.86-1.08 6.04-3.16h.12l.24 2.74h5.33c-.08-1.27-.16-3.47-.16-5.62v-20.6h-6Zm0 17.87c0 .46-.04.92-.12 1.31-.35 1.66-1.78 2.81-3.51 2.81-2.49 0-4.11-2-4.11-5.16 0-2.97 1.38-5.35 4.15-5.35 1.86 0 3.16 1.27 3.52 2.85.08.35.08.73.08 1.08v2.47Z"
                                className="text"
                            />
                        </g>
                    </g>
                </a>
            </g>
        </svg>
    );
};
