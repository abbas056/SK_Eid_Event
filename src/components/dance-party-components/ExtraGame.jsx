import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import unknownUser from "../../assets/unknown.png";
import { ApiContext } from "../../services/Api";
import { TweenMax, Power0 } from "gsap";
export default function ExtraGame() {
  // const { danceParty } = useContext(RankContext);
  const { dancePartyWinners } = useContext(ApiContext);
  const danceParty = dancePartyWinners?.list;

  const [dots, setDots] = useState([]);
  const [PROJECTION_CENTER, setPROJECTION_CENTER] = useState({
    x: "",
    y: "",
  });
  const [canvass, setConvass] = useState();
  const [avatarImageData, setavatarImageData] = useState([]);
  const [GLOBE_RADIUS, setGLOBE_RADIUS] = useState();
  const [PERSPECTIVE, setPERSPECTIVE] = useState();
  const [ctx, setCtx] = useState();
  const [DOT_RADIUS, setDOT_RADIUS] = useState();

  const canvasRef = React.createRef();

  let resizeTimeout;
  const DOTS_AMOUNT = 100; // Amount of dots on the screen

  useEffect(() => {
    if (avatarImageData?.length > 0) {
      createDots();
    }
  }, [avatarImageData]);
  useEffect(() => {
    if (danceParty?.length > 0) {
      setavatarImageData(danceParty);
    }
  }, [danceParty]);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    setConvass(canvas);
    setCtx(canvas.getContext("2d"));
    setPROJECTION_CENTER({
      x: canvas.offsetWidth / 2,
      y: canvas.offsetHeight / 2,
    });
    setPERSPECTIVE(canvas.offsetWidth * 2);
    setGLOBE_RADIUS(canvas.offsetWidth / 2);

    // Calculate DOT_RADIUS based on canvas size
    const minCanvasSize = Math.min(canvas.offsetWidth, canvas.offsetHeight);
    const maxDotRadius = minCanvasSize / 20; // Adjust this factor as needed
    setDOT_RADIUS(maxDotRadius);
  }, [PERSPECTIVE]);

  useEffect(() => {
    if (dots.length > 0) {
      let width = canvass.offsetWidth; // Width of the canvass
      let height = canvass.offsetHeight; // Height of the canvass
      const canvassClientWidth = canvass.clientWidth;
      const canvassClientHeight = canvass.clientHeight;
      const canvassDevicePixelRatio = window.devicePixelRatio || 1;
      // Get the canvas element from the DOM
      canvass.width = canvassClientWidth * canvassDevicePixelRatio;
      canvass.height = canvassClientHeight * canvassDevicePixelRatio;
      ctx.scale(canvassDevicePixelRatio, canvassDevicePixelRatio);
      const render = () => {
        // Clear the scene
        ctx.clearRect(0, 0, canvass.width, canvass.height);
        // Loop through the dots array and draw every dot
        for (let i = 0; i < dots.length; i++) {
          dots[i].draw();
        }
        window.requestAnimationFrame(render);
      };

      const afterResize = () => {
        width = canvass.offsetWidth;
        height = canvass.offsetHeight;
        const newCanvassClientWidth = canvass.clientWidth;
        const newCanvassClientHeight = canvass.clientHeight;

        canvass.width = newCanvassClientWidth * canvassDevicePixelRatio;
        canvass.height = newCanvassClientHeight * canvassDevicePixelRatio;

        ctx.scale(canvassDevicePixelRatio, canvassDevicePixelRatio);

        setPROJECTION_CENTER({ x: width / 2, y: height / 2 });
        setPERSPECTIVE(width * 2.7);
        setGLOBE_RADIUS(width / 2.7);

        createDots(); // Reset all dots
      };
      const onResize = () => {
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(afterResize, 900);
      };
      window.addEventListener("resize", onResize);
      // Render the scene
      window.requestAnimationFrame(render);
    }

    return () => {};
  }, [dots, PERSPECTIVE]);

  var counter = 0;
  const getRandomImageSource = () => {
    // Implement this function to get a random image source.
    counter = counter + 1;
    if (counter === danceParty.length) {
      counter = 0;
    }
    return avatarImageData[counter];
  };

  const createDots = () => {
    // Empty the array of dots
    setDots([]);

    const dotCount = DOTS_AMOUNT;
    const radius = GLOBE_RADIUS - DOT_RADIUS; // Adjust radius if needed
    const thetaSpacing = (2 * Math.PI) / dotCount;
    const phiSpacing = Math.PI / dotCount;

    // Create dots along the surface of the sphere
    for (let i = 0; i < dotCount; i++) {
      const theta = i * thetaSpacing;
      const phi = i * phiSpacing;

      // Calculate the [x, y, z] coordinates of the dot on the sphere
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Calculate the 2D position on the canvas
      const xProjected = x + PROJECTION_CENTER.x;
      const yProjected = y + PROJECTION_CENTER.y;

      setDots((prevDots) => [...prevDots, new Dot(i, { x: xProjected, y: yProjected })]);
    }
  };
  class Dot {
    constructor(index, position) {
      const dotSpacing = 2 * DOT_RADIUS;
      const x = position ? position.x : PROJECTION_CENTER.x - DOTS_AMOUNT * 1 * dotSpacing + index * dotSpacing;
      const y = position ? position.y : PROJECTION_CENTER.y;

      this.theta = Math.random() * 4 * Math.PI; // Random value between [0, 2Pi]
      this.phi = Math.acos(Math.random() * 2 - 1); // Random value between [0, Pi]

      // Calculate the [x, y, z] coordinates of the dot along the globe
      this.z = 0;
      this.xProjected = x;
      this.yProjected = y;
      this.scaleProjected = 0;

      // Create a new image element and set its source to a random image
      let user = getRandomImageSource();
      this.image = new Image();
      let actualimage = user?.portrait;
      this.image.src = actualimage ? actualimage : unknownUser;
      this.name = user?.nickname;

      // Animation
      TweenMax.to(this, 20, {
        theta: this.theta + Math.PI * 2,
        repeat: -1,
        ease: Power0.easeNone,
      });
    }
    // Do some math to project the 3D position into the 2D canvas
    project() {
      this.x = GLOBE_RADIUS * Math.sin(this.phi) * Math.cos(this.theta);
      this.y = GLOBE_RADIUS * Math.cos(this.phi);
      this.z = GLOBE_RADIUS * Math.sin(this.phi) * Math.sin(this.theta) + GLOBE_RADIUS;

      this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z);
      this.xProjected = this.x * this.scaleProjected + PROJECTION_CENTER.x + 2;
      this.yProjected = this.y * this.scaleProjected + PROJECTION_CENTER.y + 2;
    }
    // Draw the dot on the canvas
    draw() {
      this.project();
      ctx.globalAlpha = (this.scaleProjected - 0.45) * 3;

      // Calculate the position for centering
      const radius = DOT_RADIUS * this.scaleProjected;
      const xCenter = this.xProjected;
      const yCenter = this.yProjected;
      const xImage = xCenter - radius;
      const yImage = yCenter - radius;

      // Draw the image as a circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(xCenter, yCenter, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip(); // Clip the drawing to the circle
      ctx.drawImage(this.image, xImage, yImage, radius * 2, radius * 2);
      ctx.restore(); // Restore the context to its previous state

      if (this.name) {
        const text = this.name?.slice(0, 6); // Get the text to display
        const textWidth = ctx.measureText(text).width;
        const padding = 2; // Adjust this value to control the padding around the text
        const cornerRadius = 4; // Adjust this value to control the roundness of the corners

        // Calculate the dimensions of the background rectangle
        const rectWidth = textWidth + 2 * padding;
        const rectHeight = 10 + 2 * padding;

        // Calculate the position of the text within the rectangle
        const textX = xCenter - rectWidth / 1.8 + padding;
        const textY = yImage + radius * 2 + padding; // Adjust the Y position for padding

        ctx.fillStyle = "#fece19"; // Set the background color

        // Draw the rounded rectangle with padding
        ctx.beginPath();
        ctx.moveTo(textX + cornerRadius, textY);
        ctx.lineTo(textX + rectWidth - cornerRadius, textY);
        ctx.arc(textX + rectWidth - cornerRadius, textY + cornerRadius, cornerRadius, -Math.PI / 2, 0);
        ctx.lineTo(textX + rectWidth, textY + rectHeight - cornerRadius);
        ctx.arc(textX + rectWidth - cornerRadius, textY + rectHeight - cornerRadius, cornerRadius, 0, Math.PI / 2);
        ctx.lineTo(textX + cornerRadius, textY + rectHeight);
        ctx.arc(textX + cornerRadius, textY + rectHeight - cornerRadius, cornerRadius, Math.PI / 2, Math.PI);
        ctx.lineTo(textX, textY + cornerRadius);
        ctx.arc(textX + cornerRadius, textY + cornerRadius, cornerRadius, Math.PI, -Math.PI / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "black"; // Set text color to white
        ctx.font = "1.6vw Arial"; // Set the font style
        ctx.textAlign = "center"; // Center the text horizontally
        ctx.fillText(text, xCenter, yImage + radius * 2 + 8 + padding); // Draw the name with padding below the image
      }
    }
  }

  return (
    <div className="extra-game">
      <div className="extra-game-container">
        <canvas id="scene" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
