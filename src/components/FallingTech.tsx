import { useRef, useEffect } from "react";
import { type SvgData } from "../utils/lib.ts";
import RAPIER from "@dimforge/rapier2d-compat";
import * as THREE from "three";

const FallingConstants = {
    BlockHeight: 0.125,
    VerticalSpacing: 0.2,
    VerticalStartLocation: 1.5,
    RotationRange: (60 * Math.PI) / 180,
    HorizontalRange: 0.5,
    ImpulseForce: 0.4,
    MaxDistance: 1,
    FlipBounds: Math.PI / 2 + 0.1,
};

const randomColor = () => {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
};

const checkEqual = (a: number, b: number, percentage: number = 0.1) => {
    const absDiff = Math.abs(a - b);
    const average = (Math.abs(a) + Math.abs(b)) / 2;

    if (average === 0) return absDiff < 1e-9;

    const relativeDiff = absDiff / average;
    return relativeDiff < percentage;
};

type SVG = SvgData & {
    widthPx: number;
    heightPx: number;
};

class Falling {
    renderer: THREE.WebGLRenderer;
    camera: THREE.OrthographicCamera;
    scene: THREE.Scene;
    world: RAPIER.World;
    objects: { mesh: THREE.Mesh; collider: RAPIER.RigidBody; svg: SVG }[] = [];
    width: number;
    height: number;

    constructor(
        canvas: HTMLCanvasElement,
        svgs: SvgData[],
        width: number,
        height: number,
    ) {
        // Intersection Observer
        new IntersectionObserver(
            (entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        this.render();
                        observer.disconnect();
                    }
                }
            },
            {
                threshold: 0.8,
            },
        ).observe(canvas);

        // Renderer
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        this.renderer.setSize(width, height);
        this.width = width;
        this.height = height;
        this.renderer.setPixelRatio(window.devicePixelRatio * 1.5);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x09090b);

        // Physics

        const gravity = { x: 0.0, y: -0.8 };
        this.world = new RAPIER.World(gravity);

        const floor = RAPIER.ColliderDesc.cuboid(1000, 1000).setTranslation(
            0,
            -1001,
        );
        const leftWall = RAPIER.ColliderDesc.cuboid(1000, 1000).setTranslation(
            -1001,
            0,
        );
        const rightWall = RAPIER.ColliderDesc.cuboid(1000, 1000).setTranslation(
            1001,
            0,
        );

        this.world.createCollider(floor);
        this.world.createCollider(leftWall);
        this.world.createCollider(rightWall);

        for (let i = 0; i < svgs.length; i++) {
            const y =
                FallingConstants.VerticalStartLocation +
                i * FallingConstants.VerticalSpacing;
            const x =
                Math.random() * FallingConstants.HorizontalRange * 2 -
                FallingConstants.HorizontalRange;
            const rotation =
                Math.random() * FallingConstants.RotationRange * 2 -
                FallingConstants.RotationRange;

            this.spawn(svgs[i], { x, y }, rotation);
        }
        for (let i = 0; i < svgs.length; i++) {
            const y =
                FallingConstants.VerticalStartLocation +
                (i + svgs.length) * FallingConstants.VerticalSpacing;
            const x =
                Math.random() * FallingConstants.HorizontalRange * 2 -
                FallingConstants.HorizontalRange;
            const rotation =
                Math.random() * FallingConstants.RotationRange * 2 -
                FallingConstants.RotationRange;

            this.spawn(svgs[i], { x, y }, rotation);
        }
    }

    getSvgDim(svg: { width: number; height: number }) {
        const heightThree = FallingConstants.BlockHeight;
        const widthThree = heightThree * (svg.width / svg.height);

        const maxDim = Math.min(this.width, this.height);

        const widthPx = widthThree * maxDim * window.devicePixelRatio;
        const heightPx = heightThree * maxDim * window.devicePixelRatio;

        return {
            widthPx,
            heightPx,
            widthThree,
            heightThree,
        };
    }

    svgToTexture(svg: SVG) {
        return new Promise<THREE.Texture>((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = svg.widthPx;
                canvas.height = svg.heightPx;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, svg.widthPx, svg.heightPx);

                const texture = new THREE.CanvasTexture(canvas);
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.needsUpdate = true;
                URL.revokeObjectURL(img.src);
                resolve(texture);
            };

            img.onerror = (err) => {
                URL.revokeObjectURL(img.src);
                reject(err);
            };

            const svgBlob = new Blob([svg.svg], { type: "image/svg+xml" });
            img.src = URL.createObjectURL(svgBlob);
        });
    }

    spawn(svg: SvgData, pos: { x: number; y: number }, rotation: number) {
        const { widthPx, heightPx, widthThree, heightThree } =
            this.getSvgDim(svg);

        const newSvg: SVG = {
            svg: svg.svg,
            width: svg.width,
            height: svg.height,
            widthPx,
            heightPx,
        };

        this.svgToTexture(newSvg)
            .then((texture) => {
                const geometry = new THREE.PlaneGeometry(
                    widthThree,
                    heightThree,
                );
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide,
                });
                const mesh = new THREE.Mesh(geometry, material);

                mesh.position.set(pos.x, pos.y, 0);
                mesh.rotation.set(0, 0, rotation);
                this.scene.add(mesh);

                const colliderDesc = RAPIER.ColliderDesc.cuboid(
                    widthThree * 0.5,
                    heightThree * 0.5,
                );
                const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
                    .setTranslation(pos.x, pos.y)
                    .setRotation(rotation);
                const rigidBody = this.world.createRigidBody(rigidBodyDesc);
                const collider = this.world.createCollider(
                    colliderDesc,
                    rigidBody,
                );
                collider.setRestitution(0.5);
                collider.setDensity(1.0);

                this.objects.push({
                    mesh,
                    collider: rigidBody,
                    svg: newSvg,
                });
            })
            .catch((err) => {
                console.error("Failed to create Texture: ", err);
            });
    }

    click(x: number, y: number) {
        const clickPos = new THREE.Vector2(x, y);

        for (let i = 0; i < this.objects.length; i++) {
            const { collider } = this.objects[i];
            const pos = collider.translation();
            const vec = new THREE.Vector2(pos.x, pos.y);

            const distance = clickPos.distanceTo(vec);
            if (distance > FallingConstants.MaxDistance) continue;

            const direction = vec.sub(clickPos).normalize();
            const impulseForce =
                (1 - distance / FallingConstants.MaxDistance) *
                FallingConstants.ImpulseForce;

            collider.applyImpulse(direction.multiplyScalar(impulseForce), true);
        }
    }

    handleResize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.renderer.setSize(width, height);

        for (let i = 0; i < this.objects.length; i++) {
            const { widthPx, heightPx } = this.getSvgDim(this.objects[i].svg);
            this.objects[i].svg.widthPx = widthPx;
            this.objects[i].svg.heightPx = heightPx;
        }
    }

    update() {
        for (let i = 0; i < this.objects.length; i++) {
            const { mesh, collider } = this.objects[i];
            const pos = collider.translation();
            let rot = collider.rotation();
            // Check if upright

            if (
                !(
                    rot < FallingConstants.FlipBounds &&
                    rot > -FallingConstants.FlipBounds
                )
            ) {
                rot -= Math.PI;
            }

            mesh.position.set(pos.x, pos.y, 0);
            mesh.rotation.set(0, 0, rot);
        }
    }

    render() {
        this.world.step();
        this.update();
        this.renderer.render(this.scene, this.camera);

        for (let i = 0; i < this.objects.length; i++) {
            const { svg, mesh } = this.objects[i];

            if (
                !checkEqual(
                    svg.widthPx,
                    // @ts-ignore
                    mesh.material.map.source.data.width,
                    0.01,
                ) ||
                !checkEqual(
                    svg.heightPx,
                    // @ts-ignore
                    mesh.material.map.source.data.height,
                    0.01,
                )
            ) {
                this.svgToTexture(svg)
                    .then((texture) => {
                        // @ts-ignore
                        mesh.material.map = texture;
                    })
                    .catch((err) => {
                        console.error("Failed to update Texture: ", err);
                    });
                break;
            }
        }

        requestAnimationFrame(() => this.render());
    }
}

export const FallingTech = (props: { svgs: SvgData[] }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || !container.current) return;

        let falling: Falling | undefined = undefined;

        RAPIER.init().then(() => {
            falling = new Falling(
                ref.current!,
                props.svgs,
                container.current!.clientWidth,
                container.current!.clientHeight,
            );
        });

        const handleResize = () => {
            if (!falling) return;

            falling.handleResize(
                container.current!.clientWidth,
                container.current!.clientHeight,
            );
        };

        const handlePointerDown = (e: PointerEvent) => {
            if (!falling) return;
            if (e.target === null) return;
            const target = e.target as HTMLElement;

            falling.click(
                (e.offsetX / target.clientWidth) * 2 - 1,
                (1 - e.offsetY / target.clientHeight) * 2 - 1,
            );
        };

        window.addEventListener("resize", handleResize);
        ref.current.addEventListener("pointerdown", handlePointerDown);

        return () => {
            window.removeEventListener("resize", handleResize);
            ref.current?.removeEventListener("pointerdown", handlePointerDown);
        };
    }, []);

    return (
        <div ref={container} className="relative aspect-video w-full bg-none">
            <p className="absolute left-0 top-0 z-10 p-1 text-2xs font-light opacity-30">
                Click On the Canvas
            </p>
            <canvas ref={ref} className="absolute inset-0" />
        </div>
    );
};
