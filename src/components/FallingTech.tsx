import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { technologies, getTechName, type Technology } from "../utils/lib.ts";
import RAPIER from "@dimforge/rapier2d-compat";
import * as THREE from "three";

// TODO:
// Add text/SVG to the blocks

const FallingConstants = {
    VerticalSpacing: 0.2,
    VerticalStartLocation: 1.5,
    RotationRange: (60 * Math.PI) / 180,
    HorizontalRange: 0.5,
    ImpulseForce: 0.05,
    TorqueRange: 0.001,
    MaxDistance: 1,
};

const randomColor = () => {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
};

class Falling {
    renderer: THREE.WebGLRenderer;
    camera: THREE.OrthographicCamera;
    scene: THREE.Scene;
    world: RAPIER.World;
    objects: { mesh: THREE.Mesh; collider: RAPIER.RigidBody }[] = [];

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
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

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x09090b);

        // Physics
        const gravity = { x: 0.0, y: -0.8 };
        this.world = new RAPIER.World(gravity);

        const floor = RAPIER.ColliderDesc.cuboid(10, 0.1).setTranslation(
            0,
            -1.1,
        );
        const leftWall = RAPIER.ColliderDesc.cuboid(0.1, 100).setTranslation(
            -1.1,
            0,
        );
        const rightWall = RAPIER.ColliderDesc.cuboid(0.1, 100).setTranslation(
            1.1,
            0,
        );

        this.world.createCollider(floor);
        this.world.createCollider(leftWall);
        this.world.createCollider(rightWall);

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
    }

    spawn(tech: Technology, pos: { x: number; y: number }, rotation: number) {
        // TODO: Calculate using tech
        const width = 0.3;
        const height = 0.1;

        const geometry = new THREE.PlaneGeometry(width, height);

        const material = new THREE.MeshBasicMaterial({ color: randomColor() });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(pos.x, pos.y, 0);
        mesh.rotation.set(0, 0, rotation);
        this.scene.add(mesh);

        const colliderDesc = RAPIER.ColliderDesc.cuboid(
            width * 0.5,
            height * 0.5,
        );
        const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(pos.x, pos.y)
            .setRotation(rotation);
        const rigidBody = this.world.createRigidBody(rigidBodyDesc);
        rigidBody.addTorque(
            Math.random() * FallingConstants.TorqueRange * 2 -
                FallingConstants.TorqueRange,
            true,
        );

        const collider = this.world.createCollider(colliderDesc, rigidBody);
        collider.setRestitution(0.5);
        collider.setDensity(1.0);

        this.objects.push({ mesh, collider: rigidBody });
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
        this.renderer.setSize(width, height);
    }

    update() {
        // TODO: Always upright
        for (let i = 0; i < this.objects.length; i++) {
            const { mesh, collider } = this.objects[i];
            const pos = collider.translation();
            const rot = collider.rotation();
            mesh.position.set(pos.x, pos.y, 0);
            mesh.rotation.set(0, 0, rot);
        }
    }

    render() {
        this.world.step();
        this.update();
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

        const handlePointerDown = (e: PointerEvent) => {
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
