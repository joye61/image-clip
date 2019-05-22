import React from "react";

interface ClipAreaOption {
  rect: Rect;
  editWidth: number;
  editHeight: number;
  imageUrl: string;
}

export function ClipArea(props: ClipAreaOption) {
  return (
    <div
      className="ImageClip-area"
      style={{
        transform: `translate3d(${props.rect.x}px, ${props.rect.y}px, 0)`,
        width: `${props.rect.width}px`,
        height: `${props.rect.height}px`
      }}
    >
      <img
        src={props.imageUrl}
        alt=""
        draggable={false}
        style={{
          transform: `translate3d(-${props.rect.x}px, -${props.rect.y}px, 0)`,
          width: `${props.editWidth}px`,
          height: `${props.editHeight}px`
        }}
      />
    </div>
  );
}
