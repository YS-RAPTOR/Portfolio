import * as THREE from "three";

// RGB Channel contain 1 if alive and 0 if dead
// Alpha Channel Contains Health of Cell

// Color Scheme 1
const Colors = [
    new THREE.Color(0x000309), // Dead Color
    new THREE.Color(0x001f54),
    new THREE.Color(0x001f54),
    new THREE.Color(0x0e7490),
    new THREE.Color(0x0d9488),
    new THREE.Color(0x0d9488),
    new THREE.Color(0x22c55e),
    new THREE.Color(0xbef264),
    new THREE.Color(0xfecdd3),
    new THREE.Color(0xbef264),
    new THREE.Color(0x22c55e),
    new THREE.Color(0x0d9488),
    new THREE.Color(0x0d9488),
    new THREE.Color(0x0e7490),
    new THREE.Color(0x001f54),
    new THREE.Color(0x001f54),
    new THREE.Color(0x000309), // Static Color
];

const numOfColors = Colors.length;
const mouseMoveDistance = 15;
const clickDistance = 25;
const chance = 0.15;

const vertSource = `
varying vec2 vUvs;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUvs = uv;
}
`;

const GOLSource = `
precision highp float;
const float chanceToAccept = ${chance};

uniform sampler2D uTexture; 
uniform vec2 uResolution;
uniform ivec3 uMouse;
uniform int uScale;
uniform float uSeed;
varying vec2 vUvs;
uniform bool uGenerate;

int getNeighbors(vec2 start){
    int neighbors = 0;

    for(int i = -1; i <= 1; i++){
        for(int j = -1; j <= 1; j++){
            neighbors += int(texture2D(uTexture, mod((start + (vec2(i, j) / uResolution)), vec2(1.0))).r);
        }
    }
    
    neighbors -= int(texture2D(uTexture, start).r);
    return neighbors;
}

float getRandom(vec2 pos){
    return fract(sin(dot(pos + vec2(uSeed), vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    gl_FragColor = texture2D(uTexture, vUvs);
    if(uGenerate){
        int neighbors = getNeighbors(vUvs);
        bool alive = gl_FragColor.r > 0.5;
        float health = gl_FragColor.a;
        health -= 1.0;
        vec4 status = vec4(0.0, 0.0, 0.0, 0.0);
    
        // Alive Conditions
        if(alive && (neighbors == 2 || neighbors == 3)){
            // Perfect Population
            health += 2.0;
            status = vec4(1.0);
        } else if(!alive && neighbors == 3){
            // Reproduction
            health += 1.0;
            status = vec4(1.0);
        }
        status.a = clamp(health, 0.0, ${numOfColors - 1}.0);
        gl_FragColor = status;
    }

    // If the Mouse is Near by Spawn Life
    vec2 mouse = vec2(uMouse.xy) / vec2(uScale) / uResolution;
    mouse.x *= uResolution.x / uResolution.y;
    float dist = uMouse.z > 0 ? float(${clickDistance}) : float(${mouseMoveDistance});
    // Account for the scale/Aspect Ratio and the Resolution
    dist /= float(uScale);
    dist /= uResolution.x;
    dist *= uResolution.x / uResolution.y;

    vec2 loc = vec2(vUvs.x * uResolution.x/uResolution.y,vUvs.y);

    if(distance (loc, mouse) < dist && getRandom(vUvs) <= chanceToAccept){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
}
`;

const drawSource = `
precision mediump float;

uniform sampler2D uTexture; 
uniform vec3 uColor[${numOfColors}];
varying vec2 vUvs;

void main() {
    gl_FragColor = vec4(uColor[int(texture2D(uTexture, vUvs).a)], 1.0);
}
`;

export default class GOLRender {
    // Variables
    size: { height: number; width: number };
    canvas: HTMLCanvasElement;
    scale: number;
    timing: number;
    nextFrame: number = 0;

    // Scenes
    drawScene: THREE.Scene;
    GOLScene: THREE.Scene;

    // Textures
    initialTexture: THREE.DataTexture;

    // Uniforms
    resolution: THREE.Vector2;
    mouse: THREE.Vector3;

    // Geometry and Materials
    geometry: THREE.PlaneGeometry;
    quadMaterial: THREE.ShaderMaterial;
    GOLMaterial: THREE.ShaderMaterial;
    quad: THREE.Mesh;
    GOLMesh: THREE.Mesh;

    // Camera
    camera: THREE.OrthographicCamera;

    // Renderer
    renderer: THREE.WebGLRenderer;

    // Buffers
    frontBuffer: THREE.WebGLRenderTarget;
    backBuffer: THREE.WebGLRenderTarget;

    constructor(canvas: HTMLCanvasElement, scale = 5, fps = 24) {
        // Setting up size and resolution
        this.canvas = canvas;
        this.scale = scale;
        this.timing = (1 / fps) * 1000;
        this.size = {
            height: canvas.height / this.scale,
            width: canvas.width / this.scale,
        };

        this.resolution = new THREE.Vector2(this.size.width, this.size.height);

        // Setting up Buffers
        this.frontBuffer = new THREE.WebGLRenderTarget(
            this.size.width,
            this.size.height,
            {
                minFilter: THREE.NearestFilter,
                magFilter: THREE.NearestFilter,
                format: THREE.RGBAFormat,
                type: THREE.FloatType,
                stencilBuffer: false,
            }
        );

        this.backBuffer = new THREE.WebGLRenderTarget(
            this.size.width,
            this.size.height,
            {
                minFilter: THREE.NearestFilter,
                magFilter: THREE.NearestFilter,
                format: THREE.RGBAFormat,
                type: THREE.FloatType,
                stencilBuffer: false,
            }
        );

        // setting up scenes
        this.drawScene = new THREE.Scene();
        this.GOLScene = new THREE.Scene();

        // Setting up initial random state
        this.initialTexture = this.createRandomTexture();

        // Setting up mouse
        this.mouse = new THREE.Vector3(-100, -100, 0);

        // Setting up geometry and materials
        this.geometry = new THREE.PlaneGeometry(2, 2);

        this.quadMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: null },
                uColor: { value: Colors },
            },
            vertexShader: vertSource,
            fragmentShader: drawSource,
        });

        this.GOLMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: this.initialTexture },
                uResolution: { value: this.resolution },
                uMouse: { value: this.mouse },
                uScale: { value: this.scale },
                uSeed: { value: 0 },
                uGenerate: { value: 1 },
            },
            vertexShader: vertSource,
            fragmentShader: GOLSource,
        });

        this.quad = new THREE.Mesh(this.geometry, this.quadMaterial);
        this.drawScene.add(this.quad);

        this.GOLMesh = new THREE.Mesh(this.geometry, this.GOLMaterial);
        this.GOLScene.add(this.GOLMesh);

        // Setting up Camera
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Setting up Renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
        this.renderer.setPixelRatio(1);
        this.renderer.setSize(
            this.size.width * this.scale,
            this.size.height * this.scale
        );
    }

    createRandomTexture = (chance = 0.3): THREE.DataTexture => {
        const data = new Uint8Array(this.size.width * this.size.height * 4);

        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() > chance) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;
            } else {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 0;
            }
        }

        const texture = new THREE.DataTexture(
            data,
            this.size.width,
            this.size.height,
            THREE.RGBAFormat,
            THREE.UnsignedByteType
        );
        texture.needsUpdate = true;
        return texture;
    };

    onMouseMove = (event: MouseEvent) => {
        this.mouse.x = event.pageX;
        // Invert Y
        this.mouse.y = this.size.height * this.scale - event.pageY;

        this.mouse.z = event.buttons == 1 ? 1 : 0;
    };

    onTouch = (event: TouchEvent) => {
        if (event.touches.length < 1 || !event.touches[0]) {
            this.mouse.x = -100;
            this.mouse.y = -100;
            return;
        }
        this.mouse.x = event.touches[0].clientX;
        // Invert Y
        this.mouse.y = this.size.height * this.scale - event.touches[0].clientY;

        this.mouse.z = 1;
    };

    onTouchEnd = () => {
        this.mouse.x = -100;
        this.mouse.y = -100;
        this.mouse.z = 0;
    };

    resize = () => {
        // Change the Variables
        this.size = {
            height: this.canvas.height / this.scale,
            width: this.canvas.width / this.scale,
        };

        this.resolution = new THREE.Vector2(this.size.width, this.size.height);

        // Resize the Buffers without losing data
        this.frontBuffer.setSize(this.size.width, this.size.height);
        this.backBuffer.setSize(this.size.width, this.size.height);

        const tex = this.createRandomTexture(0.3);
        this.GOLMaterial.uniforms.uTexture!.value = tex;
        this.quadMaterial.uniforms.uTexture!.value = tex;

        // Resize the Renderer
        this.renderer.setSize(
            this.size.width * this.scale,
            this.size.height * this.scale
        );

        // Update Uniforms
        this.GOLMaterial.uniforms.uResolution!.value = this.resolution;
    };

    render = () => {
        if (this.nextFrame < Date.now()) {
            this.GOLMaterial.uniforms.uGenerate!.value = 1;
            this.nextFrame = Date.now() + this.timing;
        }

        // Update Uniforms
        this.GOLMaterial.uniforms.uSeed!.value += 0.001;
        this.GOLMaterial.uniforms.uMouse!.value = this.mouse;

        // Render to Front Buffer
        this.renderer.setRenderTarget(this.frontBuffer);
        this.renderer.render(this.GOLScene, this.camera);

        // Render to Screen
        this.quadMaterial.uniforms.uTexture!.value = this.frontBuffer.texture;
        this.renderer.setRenderTarget(null);
        this.renderer.render(this.drawScene, this.camera);

        // Swap Buffers
        const temp = this.frontBuffer;
        this.frontBuffer = this.backBuffer;
        this.backBuffer = temp;

        // Update GOL Material
        this.GOLMaterial.uniforms.uTexture!.value = this.backBuffer.texture;
        this.GOLMaterial.uniforms.uGenerate!.value = 0;

        requestAnimationFrame(this.render);
    };
}
