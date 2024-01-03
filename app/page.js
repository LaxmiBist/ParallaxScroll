// Import necessary dependencies and styles
"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion } from "framer-motion";

// Define Images data
const images = [
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "9.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "10.jpg",
    "11.jpg",
    "9.jpg",
];

// Define column
const Column = ({ images, y }) => {
    // Render each image within a motion.div with y-axis motion
    return (
        <motion.div className={styles.column} style={{ y }}>
            {images.map((src, i) => {
                return (
                    <div key={i} className={styles.imageContainer}>
                        <Image src={`/img/${src}`} alt="image" fill />
                    </div>
                );
            })}
        </motion.div>
    );
};

// Define Parallax scroll
const ParallaxScroll = () => {
    // Create a reference for the gallery div
    const gallery = useRef(null);
    // Create state for storing the dimensions of the window
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    // Destructure properties from the useScroll hook
    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    });

    // Destructure the height property from the dimension state
    const { height } = dimension;

    // Create motion values for animation based on scrollYProgress
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

    // useEffect hook for initializing Lenis, handling resize, and cleanup
    useEffect(() => {
        // Create a new Lenis instance
        const lenis = new Lenis();

        // Define a RAF function for animation
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        // Define a resize function to update dimensions on window resize
        const resize = () => {
            setDimension({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listeners for resize and initial resize
        window.addEventListener("resize", resize);
        requestAnimationFrame(raf);
        resize();

        // Cleanup function to remove event listener on component unmount
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.spacer}></div>
            <div ref={gallery} className={styles.gallery}>
                <Column images={[images[0], images[1], images[2]]} y={y} />
                <Column images={[images[3], images[4], images[5]]} y={y2} />
                <Column images={[images[6], images[7], images[8]]} y={y3} />
                <Column images={[images[9], images[10], images[11]]} y={y4} />
            </div>
            <div className={styles.spacer}></div>
        </main>
    );
};

export default ParallaxScroll;
