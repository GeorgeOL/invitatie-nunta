import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
    const [opened, setOpened] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (opened && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, [opened]);

    // Responsive dimensions
    const getEnvelopeSize = () => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            // Telefoane mici
            if (width < 360) {
                return { width: "80vw", height: "50vh" };
            }
            // Telefoane
            else if (width < 480) {
                return { width: "85vw", height: "55vh" };
            }
            // Telefoane mari
            else if (width < 600) {
                return { width: "75vw", height: "50vh" };
            }
            // Tablet
            else if (width < 768) {
                return { width: "60vw", height: "50vh" };
            }
            // Tablet mare / Laptop mic
            else if (width < 1024) {
                return { width: "50vw", height: "45vh" };
            }
            // Desktop
            else if (width < 1440) {
                return { width: "35vw", height: "45vh" };
            }
            // Desktop mare
            else {
                return { width: "30vw", height: "40vh" };
            }
        }
        return { width: "50vw", height: "45vh" };
    };

    const [envelopeSize, setEnvelopeSize] = useState(getEnvelopeSize());

    // Update size on window resize
    useEffect(() => {
        const handleResize = () => {
            setEnvelopeSize(getEnvelopeSize());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            margin: 0,
            padding: 0,
            backgroundColor: "#111"
        }}>
            {/* VIDEOUL - în afara containerului cu perspective */}
            {opened && (
                <motion.div
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 100,
                        backgroundColor: "#000",
                    }}
                >
                    <video
                        ref={videoRef}
                        onEnded={() => setVideoEnded(true)}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    >
                        <source src="/invitatieBUN.mp4" type="video/mp4" />
                    </video>
                    {videoEnded && (
                        <button
                            onClick={() => {
                                setVideoEnded(false);
                                setOpened(false);
                                setTimeout(() => setOpened(true), 50);
                            }}
                            style={{
                                position: "absolute",
                                bottom: "10%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontSize: "1.4rem",
                                fontFamily: "Amoresa, cursive",
                                background: "none",
                                color: "white",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                                padding: 0,
                                whiteSpace: "nowrap"
                            }}
                        >
                            ▶ Vizioneaza din nou
                        </button>
                    )}
                </motion.div>
            )}

            {/* Container principal */}
            <div style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: "20px",
                boxSizing: "border-box"
            }}>
                {/* PLICUL - Container */}
                <div style={{
                    position: "relative",
                    width: envelopeSize.width,
                    height: envelopeSize.height,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    perspective: "1000px"
                }}>
                    {/* BAZA PLICULUI */}
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, #000000 0%, #808080 100%)",
                        borderRadius: "8px",
                        zIndex: 2,
                        top: 0,
                        left: 0
                    }} />


                    {/* TRIUNGHI STÂNGA */}
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, #000000 0%, #606060 100%)",
                        clipPath: "polygon(0 0, 0 100%, 50% 50%)",
                        zIndex: 3,
                        top: 0,
                        left: 0,
                        opacity: 0.85
                    }} />

                    {/* TRIUNGHI DREAPTA */}
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, #404040 0%, #808080 100%)",
                        clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
                        zIndex: 3,
                        top: 0,
                        left: 0,
                        opacity: 0.85
                    }} />

                    {/* TRIUNGHI JOS */}
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, #1a1a1a 0%, #707070 100%)",
                        clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
                        zIndex: 3,
                        top: 0,
                        left: 0
                    }} />

                    {/* CLAPETA (ANIMATĂ) */}
                    <motion.div
                        onClick={() => setOpened(true)}
                        initial={{ rotateX: 0 }}
                        animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, #000000 0%, #808080 100%)",
                            clipPath: "polygon(0 0, 50% 60%, 100% 0)",
                            transformOrigin: "top",
                            zIndex: 3,
                            cursor: "pointer",
                            top: 0,
                            left: 0
                        }}
                    />

                    {/* SIGILIU - BUTON INIMA */}
                    {!opened && (
                        <motion.button
                            onClick={() => setOpened(true)}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "clamp(50px, 15vw, 100px)",
                                height: "clamp(50px, 15vw, 100px)",
                                borderRadius: "50%",
                                background: "#8B0000",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "clamp(24px, 8vw, 50px)",
                                zIndex: 4,
                                cursor: "pointer",
                                boxShadow: "0 4px 15px rgba(139, 0, 0, 0.4)"
                            }}
                        >
                            ❤️
                        </motion.button>
                    )}
                </div>

            </div>
        </div>
    );
}