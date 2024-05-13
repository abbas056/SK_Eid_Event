import React, { useEffect } from "react";
import SVGA from "svgaplayerweb";

function Svga({ cssClass, src, id, playerRef }) {
  useEffect(() => {
    if (id) {
      var player = new SVGA.Player(`#${id}`);
      var parser = new SVGA.Parser(`#${id}`);
      parser.load(src, function (videoItem) {
        player?.setVideoItem(videoItem);
        player?.startAnimation();
        playerRef.current = player;
      });
    }
    return () => {
      player?.clear();
    };
  }, [src, id]);

  return <div className={cssClass} id={id}></div>;
}

export default Svga;
