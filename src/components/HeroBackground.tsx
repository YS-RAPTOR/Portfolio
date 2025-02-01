import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

// TODO: Style All of this better

const ConvertColors = (colors: string[]) => {
    let str = "";

    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const r = parseInt(color.slice(1, 3), 16) / 255;
        const g = parseInt(color.slice(3, 5), 16) / 255;
        const b = parseInt(color.slice(5, 7), 16) / 255;

        str += `vec4(${r.toFixed(2)}, ${g.toFixed(2)}, ${b.toFixed(2)}, 1.0),\n`;
    }
    str = str.slice(0, -2);
    return str;
};

const ConvertGolRules = (rules: string, time: number) => {
    const ruleArray = rules.split("/");
    let birth = "";
    let survive = "";

    if (ruleArray[0][0] === "B" && ruleArray[1][0] === "S") {
        birth = ruleArray[0].slice(1);
        survive = ruleArray[1].slice(1);
    } else if (ruleArray[0][0] === "S" && ruleArray[1][0] === "B") {
        birth = ruleArray[1].slice(1);
        survive = ruleArray[0].slice(1);
    } else {
        throw new Error("Invalid Rule Format");
    }

    const birthRules = new Array<number>(8).fill(0);
    const surviveRules = new Array<number>(8).fill(0);

    for (let i = 0; i < birth.length; i++) {
        birthRules[parseInt(birth[i])] = 1;
    }

    for (let i = 0; i < survive.length; i++) {
        surviveRules[parseInt(survive[i])] = 1;
    }

    return {
        birthRules: birthRules,
        surviveRules: surviveRules,
        time: time * 1000,
    };
};

const GOL_CONSTANTS = {
    SquareSize: 35,
    InnerSize: 15,
    HoverSize: 21,
    MainHoverSize: 31,
    HoverDrawRadius: 100,
    PressedHoverDrawRadius: 125,

    Timing: (1 / 30) * 1000,
    GolRules: [ConvertGolRules("B2468/S012345678", 1)],
    HoverGolRadius: 0.025,
    PressedHoverGolRadius: 0.05,
    GlobalChance: 0.01,
    Colors: [
        "#050505",
        "#3730a3",
        "#7e22ce",
        "#c026d3",
        "#c026d3",
        "#ec4899",
        "#e11d48",
        "#fbbf24",
        "#bef264",
        "#fbbf24",
        "#e11d48",
        "#ec4899",
        "#c026d3",
        "#c026d3",
        "#050505",
        "#7e22ce",
        "#3730a3",
    ],
};

function choice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

const VertSource = `
varying vec2 vUvs;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUvs = uv;
}
`;

const GOLSource = `
precision highp float;

const float randomOccurence = 0.1;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uCanvasResolution;
uniform ivec3 uPointer;
uniform int uFrame;
uniform float uSeed;
uniform bool uGenerate;

uniform int uBirthRules[8];
uniform int uSurviveRules[8];

varying vec2 vUvs;

float getRandom(vec2 pos){
    vec2 nudge = vec2(uFrame) + vec2(uPointer.xy) / uCanvasResolution + uResolution + vec2(uSeed);
    return abs(fract(sin(dot(pos + nudge, vec2(12.9898, 78.233))) * 43758.5453));
}

int getNeighbours(vec2 pos){
    int count = 0;

    for(int i = -1; i <= 1; i++){
        for(int j = -1; j <= 1; j++){
            count += int(texture2D(uTexture, mod(pos + vec2(i, j) / uResolution, vec2(1))).y);
        }
    }

    count -= int(texture2D(uTexture, pos).y);
    return count;
}

float getRandomColor(vec2 pos) {
    float random = getRandom(pos);
    return clamp(floor(random * ${GOL_CONSTANTS.Colors.length}.0), 0.0, ${GOL_CONSTANTS.Colors.length - 1}.0);
}

void main() {
    gl_FragColor = texture2D(uTexture, vUvs);

    if(uGenerate) {
        bool alive = gl_FragColor.y > 0.5;

        gl_FragColor.x -= 1.0;
        gl_FragColor.y = 0.0;

        int n = getNeighbours(vUvs);
        // Birthing rules
        if(!alive && uBirthRules[n] == 1){
            gl_FragColor.x += 1.0;
            gl_FragColor.y = 1.0;
        // Survival rules
        }else if(alive && uSurviveRules[n] == 1){
            gl_FragColor.x += 2.0;
            gl_FragColor.y = 1.0;
        }
    }

    // Hover Behaviour
    if(uPointer.x != -1 && uPointer.y != -1){
        vec2 aspect = vec2(uCanvasResolution.x / uCanvasResolution.y, 1.0);
        vec2 diff = vUvs - vec2(uPointer.xy) / uCanvasResolution;
        vec2 wrappDif = min(abs(diff), vec2(1.0) - abs(diff));
        wrappDif *= aspect;
        
        float distanceFromPointer = length(wrappDif);
        float dist = float(uPointer.z) * ${GOL_CONSTANTS.PressedHoverGolRadius} + float(1 - uPointer.z) * ${GOL_CONSTANTS.HoverGolRadius};

        if(distanceFromPointer < dist){
            gl_FragColor.x = getRandomColor(vUvs);
            gl_FragColor.y = 1.0;
        }
    }

    if(uFrame == 0){
        gl_FragColor.x = getRandomColor(vUvs);
    };

    gl_FragColor.x = clamp(gl_FragColor.x, 0.0, ${GOL_CONSTANTS.Colors.length - 1}.0);
}
`;

const DrawSource = `
precision mediump float;

uniform sampler2D uTexture; 
uniform sampler2D uSquareSizes;

varying vec2 vUvs;

vec4 colors[${GOL_CONSTANTS.Colors.length}] = vec4[](${ConvertColors(GOL_CONSTANTS.Colors)});
const float squareSize = ${GOL_CONSTANTS.SquareSize}.0;

vec2 getClosestSquareCenter(vec2 pos) {
    vec2 index = vec2(floor(pos.x / squareSize), floor(pos.y / squareSize));
    return index.xy * vec2(squareSize) + vec2(squareSize / 2.0);
}

void main() {
    float square = texture2D(uSquareSizes, vUvs).x;
    vec4 color = colors[int(texture2D(uTexture, vUvs).x)];
    vec2 center = getClosestSquareCenter(gl_FragCoord.xy);

    vec2 delta = abs(center - gl_FragCoord.xy);
    float inside = step(delta.x, square/ 2.0) * step(delta.y, square/ 2.0);

    gl_FragColor = color*vec4(inside) + colors[0]*vec4(1.0-inside);
}
`;

class GOL {
    numberHorizontally = 0;
    numberVertically = 0;
    pointer = {
        x: 0,
        y: 0,
        pressDown: false,
        isOver: false,
    };
    canvas: HTMLCanvasElement;
    squareSizes: { size: number }[] = [];
    squareGsapHandlers: (gsap.QuickToFunc | null)[] = [];
    gsap: gsap.Context;
    initAnimationDone = false;
    resizeCommand: {
        x: number;
        y: number;
        yes: boolean;
    } = {
        x: 0,
        y: 0,
        yes: false,
    };

    // NOTE: Shader variables
    buffers: [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget];
    golScene: THREE.Scene;
    drawScene: THREE.Scene;
    drawMaterial: THREE.ShaderMaterial;
    GolMaterial: THREE.ShaderMaterial;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    // NOTE: x = -1, y = -1 means not over
    // z = pressed status | xy = position
    squareSizesArray: Float32Array = undefined!;
    squareSizesTexture: THREE.DataTexture = undefined!;
    nextFrame = 0;
    refreshCommand = false;
    nextRuleSwap: number;

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas;
        this.resize(width, height, true);

        this.gsap = gsap.context(() => {
            gsap.fromTo(
                this.squareSizes,
                {
                    size: 0,
                },
                {
                    ease: "power1.inOut",
                    size: GOL_CONSTANTS.InnerSize,
                    duration: 1,
                    stagger: {
                        grid: [this.numberVertically, this.numberHorizontally],
                        amount: 1.5,
                        from: "center",
                    },
                    onComplete: () => {
                        this.refreshGsap();
                        this.initAnimationDone = true;
                    },
                },
            );
        });

        const bufferOptions: THREE.RenderTargetOptions = {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGFormat,
            type: THREE.FloatType,
            stencilBuffer: false,
            depthBuffer: false,
            generateMipmaps: false,
            resolveDepthBuffer: false,
            resolveStencilBuffer: false,
        };

        this.buffers = [
            new THREE.WebGLRenderTarget(
                this.numberHorizontally,
                this.numberVertically,
                bufferOptions,
            ),
            new THREE.WebGLRenderTarget(
                this.numberHorizontally,
                this.numberVertically,
                bufferOptions,
            ),
        ];

        // All of the needed uniforms

        const initialTexture = this.createTexture(0);
        this.golScene = new THREE.Scene();
        this.drawScene = new THREE.Scene();

        const drawGeometry = new THREE.PlaneGeometry(2, 2);
        this.drawMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: initialTexture.clone() },
                uSquareSizes: { value: this.squareSizesTexture },
            },
            vertexShader: VertSource,
            fragmentShader: DrawSource,
        });

        const rule = choice(GOL_CONSTANTS.GolRules);
        this.nextRuleSwap = Date.now() + rule.time;
        this.GolMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: initialTexture },
                uResolution: {
                    value: new THREE.Vector2(
                        this.numberHorizontally,
                        this.numberVertically,
                    ),
                },
                uCanvasResolution: {
                    value: new THREE.Vector2(
                        this.canvas.width,
                        this.canvas.height,
                    ),
                },
                uPointer: { value: new THREE.Vector3(-1, -1, 0) },
                uFrame: { value: 0 },
                uGenerate: { value: 0 },
                uSeed: { value: Math.random() },
                uBirthRules: { value: rule.birthRules },
                uSurviveRules: { value: rule.surviveRules },
            },
            vertexShader: VertSource,
            fragmentShader: GOLSource,
        });

        const drawMesh = new THREE.Mesh(drawGeometry, this.drawMaterial);
        const GolMesh = new THREE.Mesh(drawGeometry, this.GolMaterial);
        this.drawScene.add(drawMesh);
        this.golScene.add(GolMesh);

        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setPixelRatio(1);
        this.renderer.setSize(this.canvas.width, this.canvas.height);
    }

    createTexture = (n: number | "random") => {
        const array = new Float32Array(
            this.numberHorizontally * this.numberVertically * 2,
        );

        if (n === "random") {
            for (let i = 0; i < array.length; i += 2) {
                if (Math.random() < 0.5) {
                    array[i] = Math.floor(
                        Math.random() * GOL_CONSTANTS.Colors.length,
                    );
                    array[i + 1] = 1;
                } else {
                    array[i] = 0;
                    array[i + 1] = 0;
                }
            }
        } else {
            const alive = n == 0 ? 0 : 1;
            for (let i = 0; i < array.length; i += 2) {
                array[i] = n;
                array[i + 1] = alive;
            }
        }

        return new THREE.DataTexture(
            array,
            this.numberHorizontally,
            this.numberVertically,
            THREE.RGFormat,
            THREE.FloatType,
        );
    };

    resize = (width: number, height: number, init = false) => {
        if (!this.initAnimationDone && !init) {
            this.resizeCommand = {
                x: width,
                y: height,
                yes: true,
            };
            return;
        }

        const numberHorizontally = Math.floor(width / GOL_CONSTANTS.SquareSize);
        const numberVertically = Math.floor(height / GOL_CONSTANTS.SquareSize);

        if (
            numberHorizontally === this.numberHorizontally &&
            numberVertically === this.numberVertically
        ) {
            return;
        }

        const totalDifference =
            numberHorizontally * numberVertically -
            this.numberHorizontally * this.numberVertically;
        if (totalDifference > 0) {
            for (let i = 0; i < totalDifference; i++) {
                this.squareSizes.push({ size: GOL_CONSTANTS.InnerSize });
                this.squareGsapHandlers.push(null);
            }
        } else if (totalDifference < 0) {
            this.squareSizes.splice(0, Math.abs(totalDifference));
            this.squareGsapHandlers.splice(0, Math.abs(totalDifference));
        }

        this.numberHorizontally = numberHorizontally;
        this.numberVertically = numberVertically;

        this.canvas.width = numberHorizontally * GOL_CONSTANTS.SquareSize;
        this.canvas.height = numberVertically * GOL_CONSTANTS.SquareSize;

        this.squareSizesArray = new Float32Array(
            this.numberHorizontally * this.numberVertically,
        );
        for (let i = 0; i < this.squareSizes.length; i++) {
            this.squareSizesArray[i] = this.squareSizes[i].size;
        }
        this.squareSizesTexture = new THREE.DataTexture(
            this.squareSizesArray,
            this.numberHorizontally,
            this.numberVertically,
            THREE.RedFormat,
            THREE.FloatType,
        );

        if (!init) {
            this.renderer.setSize(this.canvas.width, this.canvas.height);
            this.drawMaterial.uniforms.uSquareSizes!.value =
                this.squareSizesTexture;

            this.buffers[0].setSize(
                this.numberHorizontally,
                this.numberVertically,
            );
            this.buffers[1].setSize(
                this.numberHorizontally,
                this.numberVertically,
            );

            const texture = this.createTexture("random");
            this.GolMaterial.uniforms.uTexture!.value = texture;
            this.drawMaterial.uniforms.uTexture!.value = texture.clone();
            this.GolMaterial.uniforms.uCanvasResolution!.value.set(
                this.canvas.width,
                this.canvas.height,
            );

            if (this.initAnimationDone) this.refreshGsap();
        }

        this.resizeCommand.yes = false;
    };

    refreshGsap = () => {
        this.gsap.revert();
        this.gsap.add(() => {
            for (let i = 0; i < this.squareSizes.length; i++) {
                this.squareGsapHandlers[i] = gsap.quickTo(
                    this.squareSizes[i],
                    "size",
                    {
                        ease: "power3",
                        duration: 0.2,
                    },
                );
            }
        });
    };

    updatePointerMove = (x: number, y: number, pressDown: boolean) => {
        this.pointer.x = Math.floor(x);
        this.pointer.y = this.canvas.height - Math.floor(y);
        this.pointer.pressDown = pressDown;
        this.pointer.isOver = true;
    };

    updatePointerOver = (isOver: boolean) => {
        this.pointer.isOver = isOver;
    };

    getHoverIndices = (): [number, number[]] => {
        if (!this.pointer.isOver) {
            return [-1, []];
        }

        let indices: number[] = [];
        const mainX = Math.trunc(
            (this.pointer.x - 0.1) / GOL_CONSTANTS.SquareSize,
        );
        const mainY = Math.trunc(
            (this.pointer.y - 0.1) / GOL_CONSTANTS.SquareSize,
        );

        const mainIndex = mainX + mainY * this.numberHorizontally;

        const radius = this.pointer.pressDown
            ? GOL_CONSTANTS.PressedHoverDrawRadius
            : GOL_CONSTANTS.HoverDrawRadius;
        const n = Math.floor(radius / GOL_CONSTANTS.SquareSize);

        for (let i = -n + mainX; i <= n + mainX; i++) {
            const ii =
                ((i % this.numberHorizontally) + this.numberHorizontally) %
                this.numberHorizontally;
            const x =
                i * GOL_CONSTANTS.SquareSize + GOL_CONSTANTS.SquareSize / 2;
            const dx =
                mainX * GOL_CONSTANTS.SquareSize +
                GOL_CONSTANTS.SquareSize / 2 -
                x;
            const dx2 = dx * dx;

            for (let j = -n + mainY; j <= n + mainY; j++) {
                const jj =
                    ((j % this.numberVertically) + this.numberVertically) %
                    this.numberVertically;
                const y =
                    j * GOL_CONSTANTS.SquareSize + GOL_CONSTANTS.SquareSize / 2;

                const dy =
                    mainY * GOL_CONSTANTS.SquareSize +
                    GOL_CONSTANTS.SquareSize / 2 -
                    y;

                if (Math.sqrt(dx2 + dy * dy) <= radius) {
                    indices.push(ii + jj * this.numberHorizontally);
                }
            }
        }

        return [mainIndex, indices];
    };

    update = () => {
        // Timings
        if (this.nextFrame <= Date.now()) {
            this.nextFrame = Date.now() + GOL_CONSTANTS.Timing;

            if (this.initAnimationDone) {
                this.GolMaterial.uniforms.uGenerate!.value = 1;
            }
        }

        // Rule Swap
        if (this.nextRuleSwap <= Date.now()) {
            const rule = choice(GOL_CONSTANTS.GolRules);
            this.nextRuleSwap = Date.now() + rule.time;
            this.GolMaterial.uniforms.uBirthRules!.value = rule.birthRules;
            this.GolMaterial.uniforms.uSurviveRules!.value = rule.surviveRules;
        }

        if (this.initAnimationDone && this.resizeCommand.yes) {
            this.resize(this.resizeCommand.x, this.resizeCommand.y);
        }

        // Check for hover
        const [mainIndex, hoverIndices] = this.getHoverIndices();
        if (this.initAnimationDone) {
            // Update once initAnimationDone
            for (let i = 0; i < this.squareSizes.length; i++) {
                if (i === mainIndex) {
                    this.squareGsapHandlers[i]!(GOL_CONSTANTS.MainHoverSize);
                    continue;
                }

                if (this.pointer.isOver && hoverIndices.includes(i)) {
                    this.squareGsapHandlers[i]!(GOL_CONSTANTS.HoverSize);
                    continue;
                }

                if (this.squareSizes[i].size === GOL_CONSTANTS.InnerSize) {
                    continue;
                }

                this.squareGsapHandlers[i]!(GOL_CONSTANTS.InnerSize);
            }
        }

        // Pointer Information
        if (this.pointer.isOver) {
            this.GolMaterial.uniforms.uPointer!.value.set(
                this.pointer.x,
                this.pointer.y,
                this.pointer.pressDown ? 1 : 0,
            );
        } else {
            if (Math.random() < GOL_CONSTANTS.GlobalChance) {
                this.GolMaterial.uniforms.uPointer!.value.set(
                    Math.floor(Math.random() * this.canvas.width),
                    Math.floor(Math.random() * this.canvas.height),
                    Math.random() < 0.5 ? 1 : 0,
                );
            } else {
                this.GolMaterial.uniforms.uPointer!.value.set(-1, -1, 0);
            }
        }

        for (let i = 0; i < this.squareSizes.length; i++) {
            this.squareSizesArray[i] = this.squareSizes[i].size;
        }
        this.squareSizesTexture.needsUpdate = true;

        // Render to Front Buffer
        this.renderer.setRenderTarget(this.buffers[0]);
        this.renderer.render(this.golScene, this.camera);

        // Render to Screen
        this.drawMaterial.uniforms.uTexture!.value = this.buffers[0].texture;
        this.renderer.setRenderTarget(null);
        this.renderer.render(this.drawScene, this.camera);

        // Swap Buffers
        const temp = this.buffers[0];
        this.buffers[0] = this.buffers[1];
        this.buffers[1] = temp;

        // Update GOL Material
        this.GolMaterial.uniforms.uTexture!.value = this.buffers[1].texture;
        this.GolMaterial.uniforms.uGenerate!.value = 0;
        this.GolMaterial.uniforms.uFrame!.value += 1;
        this.GolMaterial.uniforms.uSeed!.value = Math.random();
        requestAnimationFrame(this.update);
    };
}

export const HeroBackground = () => {
    const div = useRef<HTMLDivElement | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvas.current || !div.current) return;

        const gol = new GOL(
            canvas.current,
            div.current.clientWidth,
            div.current.clientHeight,
        );

        const pointerMove = (e: PointerEvent) => {
            gol.updatePointerMove(e.offsetX, e.offsetY, e.buttons > 0);
        };

        const pointerDown = (e: PointerEvent) => {
            gol.updatePointerMove(e.offsetX, e.offsetY, true);
        };

        const pointerUp = (e: PointerEvent) => {
            gol.updatePointerMove(e.offsetX, e.offsetY, false);
        };

        const pointerEnter = () => {
            gol.updatePointerOver(true);
        };

        const pointerLeave = () => {
            gol.updatePointerOver(false);
        };

        const resize = () => {
            gol.resize(div.current!.clientWidth, div.current!.clientHeight);
        };

        canvas.current.addEventListener("pointermove", pointerMove);
        canvas.current.addEventListener("pointerdown", pointerDown);
        canvas.current.addEventListener("pointerup", pointerUp);
        canvas.current.addEventListener("pointerenter", pointerEnter);
        canvas.current.addEventListener("pointerleave", pointerLeave);
        window.addEventListener("resize", resize);

        requestAnimationFrame(gol.update);

        return () => {
            canvas.current?.removeEventListener("pointermove", pointerMove);
            canvas.current?.removeEventListener("pointerdown", pointerDown);
            canvas.current?.removeEventListener("pointerup", pointerUp);
            canvas.current?.removeEventListener("pointerenter", pointerEnter);
            canvas.current?.removeEventListener("pointerleave", pointerLeave);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div
            ref={div}
            className="relative flex h-fit min-h-[80vh] w-full items-center justify-center"
        >
            <canvas ref={canvas} className="absolute z-10"></canvas>
        </div>
    );
};
