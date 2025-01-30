import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const GOL_CONSTANTS = {
    SquareSize: 32,
    InnerSize: 16,
    InnerHoverSize: 10,
    FpsTarget: 60,
    hoverRadius: 2,
    pressedHoverRadius: 4,
    hoverChance: 0.15,
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
    squareGsapHandlers: (gsap.core.Tween | null)[] = [];
    gsap: gsap.Context;

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas;
        this.resize(width, height);
        this.gsap = gsap.context(() => {
            gsap.fromTo(
                this.squareSizes,
                {
                    size: 0,
                },
                {
                    size: GOL_CONSTANTS.InnerSize,
                    stagger: {
                        grid: [this.numberHorizontally, this.numberVertically],
                        amount: 2,
                        ease: "power2.out",
                        from: "center",
                    },
                    onComplete: () => {
                        this.refreshGsap();
                    },
                },
            );
        });
    }

    resize = (width: number, height: number) => {
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
    };

    refreshGsap = () => {
        this.gsap.revert();
        this.gsap.add(() => {
            for (let i = 0; i < this.squareSizes.length; i++) {
                this.squareGsapHandlers[i] = gsap.fromTo(
                    this.squareSizes[i],
                    {
                        size: GOL_CONSTANTS.InnerSize,
                        ease: "power1.inOut",
                        duration: 0.5,
                        paused: true,
                    },
                    {
                        size: GOL_CONSTANTS.InnerHoverSize,
                        ease: "power1.inOut",
                        duration: 0.5,
                        paused: true,
                    },
                );
            }
        });
    };

    gsapSquaresHasNull = () => {
        if (this.squareGsapHandlers.length === 0) return true;

        for (let i = 0; i < this.squareGsapHandlers.length; i++) {
            if (this.squareGsapHandlers[i] === null) return true;
        }
        return false;
    };

    updatePointerMove = (x: number, y: number, pressDown: boolean) => {
        this.pointer.x = Math.floor(x);
        this.pointer.y = Math.floor(y);
        this.pointer.pressDown = pressDown;
    };

    updatePointerOver = (isOver: boolean) => {
        this.pointer.isOver = isOver;
    };

    update = () => {
        // requestAnimationFrame(this.update);
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

        const pointerEnter = () => {
            gol.updatePointerOver(true);
        };

        const pointerLeave = () => {
            gol.updatePointerOver(false);
        };

        const resize = () => {
            gol.resize(div.current!.clientWidth, div.current!.clientHeight);
            gol.refreshGsap();
        };

        div.current.addEventListener("pointermove", pointerMove);
        div.current.addEventListener("pointerenter", pointerEnter);
        div.current.addEventListener("pointerleave", pointerLeave);
        window.addEventListener("resize", resize);

        requestAnimationFrame(gol.update);

        return () => {
            div.current?.removeEventListener("pointermove", pointerMove);
            div.current?.removeEventListener("pointerenter", pointerEnter);
            div.current?.removeEventListener("pointerleave", pointerLeave);
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
