import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const GOL_CONSTANTS = {
    SquareSize: 55,
    InnerSize: 9,
    InnerHoverSize: 15,
    InnerHoverSizeMain: 30,
    timing: (1 / 60) * 1000,
    hoverRadius: 2,
    pressedHoverRadius: 56,
    hoverChance: 0.15,
    backgroundColor: "9, 9, 11",
    Colors: [
        new THREE.Color(0x050505), // Dead Color
        new THREE.Color(0x3730a3),
        new THREE.Color(0x7e22ce),
        new THREE.Color(0xc026d3),
        new THREE.Color(0xc026d3),
        new THREE.Color(0xec4899),
        new THREE.Color(0xe11d48),
        new THREE.Color(0xfbbf24),
        new THREE.Color(0xbef264),
        new THREE.Color(0xfbbf24),
        new THREE.Color(0xe11d48),
        new THREE.Color(0xec4899),
        new THREE.Color(0xc026d3),
        new THREE.Color(0xc026d3),
        new THREE.Color(0x7e22ce),
        new THREE.Color(0x3730a3),
        new THREE.Color(0x050505), // Static Color
    ],
};

const VertSource = `
varying vec2 vUvs;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUvs = uv;
}
`;

const GOLSource = `
precision mediump float;

const float randomOccurence = 0.1;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform ivec3 uPointer;
uniform float uSeed;
uniform bool uGenerate;
varying vec2 vUvs;


float getRandom(vec2 pos){
    return abs(fract(sin(dot(pos + vec2(uSeed), vec2(12.9898, 78.233))) * 43758.5453));
}


void main() {
    gl_FragColor = 1;
}
`;

const DrawSource = `
precision mediump float;

uniform sampler2D uTexture; 
uniform sampler2D uSquareSizes;

varying vec2 vUvs;

const float squareSize = ${GOL_CONSTANTS.SquareSize}.0;
const vec4 backgroundColor = vec4(${GOL_CONSTANTS.backgroundColor},0);

vec2 getClosestSquareCenter(vec2 pos) {

    vec2 index = vec2(floor(pos.x / squareSize), floor(pos.y / squareSize));
    return index.xy * vec2(squareSize) + vec2(squareSize / 2.0);
}

void main() {

    float square = texture2D(uSquareSizes, vUvs).x;
    vec4 color = texture2D(uTexture, vUvs);

    vec2 center = getClosestSquareCenter(gl_FragCoord.xy);

    vec2 delta = abs(center - gl_FragCoord.xy);
    float inside = step(delta.x, square/ 2.0) * step(delta.y, square/ 2.0);

    gl_FragColor = vec4(inside,0,0,1);
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
            format: THREE.RedFormat,
            type: THREE.UnsignedByteType,
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
        const initialTexture = new THREE.DataTexture(
            new Uint8Array(this.numberHorizontally * this.numberVertically),
            this.numberHorizontally,
            this.numberVertically,
            THREE.RedFormat,
            THREE.UnsignedByteType,
        );

        // TODO: Move to resize function

        this.golScene = new THREE.Scene();
        this.drawScene = new THREE.Scene();

        const drawGeometry = new THREE.PlaneGeometry(2, 2);
        this.drawMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: null },
                uSquareSizes: { value: this.squareSizesTexture },
            },
            vertexShader: VertSource,
            fragmentShader: DrawSource,
        });

        this.GolMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: initialTexture },
                uResolution: {
                    value: new THREE.Vector2(
                        this.numberHorizontally,
                        this.numberVertically,
                    ),
                },
                uPointer: { value: new THREE.Vector3(-1, -1, 0) },
                uSeed: { value: 0 },
                uGenerate: { value: 0 },
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

        // TODO: Update this array more intelligently
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

        if (!init) {
            if (this.initAnimationDone) this.refreshGsap();
            this.renderer.setSize(this.canvas.width, this.canvas.height);
        }

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
        this.pointer.y = Math.floor(y);
        this.pointer.pressDown = pressDown;
    };

    updatePointerOver = (isOver: boolean) => {
        this.pointer.isOver = isOver;
    };

    getHoverIndices = (): [number, number[]] => {
        if (!this.pointer.isOver) {
            return [-1, []];
        }

        let indices: number[] = [];
        const mainX = Math.floor(this.pointer.x / GOL_CONSTANTS.SquareSize);
        const mainY =
            this.numberVertically -
            Math.floor(this.pointer.y / GOL_CONSTANTS.SquareSize) -
            1;
        const mainIndex = mainX + mainY * this.numberHorizontally;

        const n = Math.floor(
            GOL_CONSTANTS.hoverRadius / GOL_CONSTANTS.SquareSize,
        );

        for (let i = -n + mainX; i <= n + mainX; i++) {
            const x =
                i * GOL_CONSTANTS.SquareSize + GOL_CONSTANTS.SquareSize / 2;
            const dx = mainX - x;
            const dx2 = dx * dx;

            for (let j = -n + mainY; j <= n + mainY; j++) {
                const y =
                    j * GOL_CONSTANTS.SquareSize + GOL_CONSTANTS.SquareSize / 2;
                const dy = mainY - y;

                if (Math.sqrt(dx2 + dy) <= GOL_CONSTANTS.hoverRadius) {
                    indices.push(i + j * this.numberHorizontally);
                }
            }
        }

        return [mainIndex, indices];
    };

    update = () => {
        // Timings
        if (this.nextFrame <= Date.now()) {
            this.nextFrame = Date.now() + GOL_CONSTANTS.timing;

            if (this.initAnimationDone) {
                this.GolMaterial.uniforms.uGenerate!.value = 1;
            }
        }

        if (this.initAnimationDone && this.resizeCommand.yes) {
            this.resize(this.resizeCommand.x, this.resizeCommand.y);
        }

        // Check for hover
        const [mainIndex, hoverIndices] = this.getHoverIndices();
        if (this.initAnimationDone) {
            // console.log(this.squareGsapHandlers);
            // TODO: Update hover region

            for (let i = 0; i < this.squareSizes.length; i++) {
                if (i === mainIndex) {
                    this.squareGsapHandlers[i]!(
                        GOL_CONSTANTS.InnerHoverSizeMain,
                    );
                    continue;
                }

                if (this.pointer.isOver && hoverIndices.includes(i)) {
                    this.squareGsapHandlers[i]!(GOL_CONSTANTS.InnerHoverSize);
                    continue;
                }

                if (this.squareSizes[i].size === GOL_CONSTANTS.InnerSize) {
                    continue;
                }

                this.squareGsapHandlers[i]!(GOL_CONSTANTS.InnerSize);
            }
        }

        // Always should change
        this.GolMaterial.uniforms.uSeed!.value += 0.0001;

        // Pointer Information
        if (this.pointer.isOver) {
            this.GolMaterial.uniforms.uPointer!.value.set(
                this.pointer.x,
                this.pointer.y,
                this.pointer.pressDown ? 1 : 0,
            );
        } else {
            this.GolMaterial.uniforms.uPointer!.value.set(-1, -1, 0);
        }

        for (let i = 0; i < this.squareSizes.length; i++) {
            this.squareSizesArray[i] = this.squareSizes[i].size;

            if (i === mainIndex) {
                console.log(mainIndex, this.squareSizes[i].size);
            }
        }

        this.squareSizesTexture.needsUpdate = true;

        this.renderer.setRenderTarget(null);
        this.renderer.render(this.drawScene, this.camera);

        this.GolMaterial.uniforms.uGenerate!.value = 0;
        requestAnimationFrame(this.update);
    };
}

export const HeroBackground = () => {
    const div = useRef<HTMLDivElement | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvas.current || !div.current) return;

        // TODO FIX THIS
        const gol = new GOL(
            canvas.current,
            div.current.clientWidth,
            div.current.clientHeight,
        );

        const pointerMove = (e: PointerEvent) => {
            gol.updatePointerMove(e.offsetX, e.offsetY, e.buttons > 0);
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
        canvas.current.addEventListener("pointerenter", pointerEnter);
        canvas.current.addEventListener("pointerleave", pointerLeave);
        window.addEventListener("resize", resize);

        requestAnimationFrame(gol.update);

        return () => {
            canvas.current?.removeEventListener("pointermove", pointerMove);
            canvas.current?.removeEventListener("pointerenter", pointerEnter);
            canvas.current?.removeEventListener("pointerleave", pointerLeave);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div
            ref={div}
            className="relative flex h-fit min-h-[80vh] w-full items-center justify-center bg-red-600"
        >
            <canvas ref={canvas} className="absolute z-10"></canvas>
        </div>
    );
};
