import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { technologies, getTechName, type Technology } from "../utils/lib.ts";
import RAPIER from "@dimforge/rapier2d-compat";
import * as THREE from "three";

// TODO:
// Spawn falling squares with collision.
// Ability to move the collisions using mouse/pointer and dragging them.
// Create a physics force that pushes out blocks when click on location.
// Pick what I like.
// Add text/SVG to the blocks

const FallingConstants = {
    VerticalSpacing: 0.05,
    VerticalStartLocation: 0,
    RotationRange: (60 * Math.PI) / 180,
    HorizontalRange: 0.5,
};

class Falling {
    canvas: HTMLCanvasElement;
    renderer: THREE.WebGLRenderer;
    camera: THREE.OrthographicCamera;
    scene: THREE.Scene;
    physicsWorld: RAPIER.World;
    objects: { mesh: THREE.Mesh; collider: RAPIER.RigidBodyHandle }[] = [];

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas;
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x09090b);

        for (let i = 0; i < technologies.length; i++) {
            const y =
                FallingConstants.VerticalStartLocation +
                i * FallingConstants.VerticalSpacing;
            const x =
                Math.random() * FallingConstants.HorizontalRange * 2 -
                FallingConstants.HorizontalRange;
            const rotation =
                Math.random() * FallingConstants.RotationRange * 2 -
                FallingConstants.RotationRange;

            this.spawn(technologies[i], { x, y }, rotation);
        }

        // TODO: Move
        this.render();
    }

    spawn(tech: Technology, pos: { x: number; y: number }, rotation: number) {
        // TODO: Calculate using tech
        const width = 0.3;
        const height = 0.1;

        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(pos.x, pos.y, 0);
        mesh.rotation.set(0, 0, rotation);
        this.scene.add(mesh);
    }

    handleResize(width: number, height: number) {
        this.renderer.setSize(width, height);
    }

    render(t: number = 0) {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }
}

export const FallingTech = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || !container.current) return;
        const falling = new Falling(
            ref.current,
            container.current.clientWidth,
            container.current.clientHeight,
        );

        const handleResize = () => {
            falling.handleResize(
                container.current!.clientWidth,
                container.current!.clientHeight,
            );
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div ref={container} className="relative aspect-video w-full bg-none">
            <canvas ref={ref} className="absolute inset-0" />
        </div>
    );
};
