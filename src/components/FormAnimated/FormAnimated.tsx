import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import "./FormAnimated.scss";

const FormAnimated: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Create refs for each corner box
  const topLeftRef = useRef(null);
  const topRightRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);

  const handleLoginSuccess = () => {
    // Success animation: move, zoom, rotate, and turn green
    const duration = 0.8; // Duration for each part of the animation
    const ease = "power1.inOut";
    const successColor = "#00ff00"; // Green color for success

    gsap.to(topLeftRef.current, {
      y: "+=350",
      scale: 2, // Zoom in
      rotation: 360, // Rotate
      backgroundColor: successColor, // Turn green
      duration: duration,
      yoyo: true,
      repeat: 1,
      ease: ease
    });
    gsap.to(topRightRef.current, {
      x: "-=350",
      scale: 2,
      rotation: 360,
      backgroundColor: successColor, // Turn green
      duration: duration,
      yoyo: true,
      repeat: 1,
      ease: ease
    });
    gsap.to(bottomLeftRef.current, {
      x: "+=350",
      scale: 2,
      rotation: 360,
      backgroundColor: successColor, // Turn green
      duration: duration,
      yoyo: true,
      repeat: 1,
      ease: ease
    });
    gsap.to(bottomRightRef.current, {
      y: "-=350",
      scale: 2,
      rotation: 360,
      backgroundColor: successColor, // Turn green
      duration: duration,
      yoyo: true,
      repeat: 1,
      ease: ease
    });
  };

  const handleLoginFailure = () => {
    // Failure animation: move by 200, turn red, shake, then revert
    const moveDistance = 250;
    const shakeAmount = 15; // Pixels to shake
    const shakeDuration = 0.1; // Duration for each shake movement
    const shakeRepeat = 3; // Number of shakes
    const moveColorDuration = 0.3; // Duration for the move and color change
    const ease = "bouce.inOut";
    const failureColor = "#ff0000"; // Red color for failure
    const originalColor = "#0056b3"; // Original blue color from SCSS

    const tl = gsap.timeline({
      onComplete: () => {
        // Revert color and position after animation
        gsap.to([topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current], {
          backgroundColor: originalColor,
          x: 0, // Revert x position
          y: 0, // Revert y position
          duration: 0.3,
          ease: ease
        });
      }
    });

    // Step 1: Move by 200 and turn red
    tl.to(topLeftRef.current, { y: `+=${moveDistance}`, backgroundColor: failureColor, duration: moveColorDuration, ease: ease }) // Down
      .to(topRightRef.current, { x: `-=${moveDistance}`, backgroundColor: failureColor, duration: moveColorDuration, ease: ease }, "<") // Left
      .to(bottomLeftRef.current, { x: `+=${moveDistance}`, backgroundColor: failureColor, duration: moveColorDuration, ease: ease }, "<") // Up
      .to(bottomRightRef.current, { y: `-=${moveDistance}`, backgroundColor: failureColor, duration: moveColorDuration, ease: ease }, "<"); // Right

    // Step 2: Add shake animation (relative to current position)
    // Start this sequence after the move/color tween finishes
    const shakeStartTime = `+=${moveColorDuration}`;

    tl.to([topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current], {
      x: shakeAmount, // Shake right
      duration: shakeDuration,
      repeat: shakeRepeat,
      yoyo: true,
      ease: ease
    }, shakeStartTime)
    .to([topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current], {
        x: -shakeAmount, // Shake left
        duration: shakeDuration,
        repeat: shakeRepeat,
        yoyo: true,
        ease: ease
    }, "<") // Start at the same time as the previous shake
    .to([topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current], {
        y: shakeAmount, // Shake down
        duration: shakeDuration,
        repeat: shakeRepeat,
        yoyo: true,
        ease: ease
    }, "<") // Start at the same time
    .to([topLeftRef.current, topRightRef.current, bottomLeftRef.current, bottomRightRef.current], {
        y: -shakeAmount, // Shake up
        duration: shakeDuration,
        repeat: shakeRepeat,
        yoyo: true,
        ease: ease
    }, "<"); // Start at the same time
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "Usuario" && password === "Contraseña") {
      handleLoginSuccess();
      // You might want to add navigation or other success logic here later
    } else {
      handleLoginFailure();
      // You might want to add error handling logic here later
    }
  };

  return (
    <div className="form-container">
      <div className="corner-box top-left" ref={topLeftRef}></div>
      <div className="corner-box top-right" ref={topRightRef}></div>
      <div className="corner-box bottom-left" ref={bottomLeftRef}></div>
      <div className="corner-box bottom-right" ref={bottomRightRef}></div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Removed the error message display */}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default FormAnimated;
