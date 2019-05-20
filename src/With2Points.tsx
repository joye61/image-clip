import React from "react";

function ControllPoint({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <>
      <span
        className="ImageEditor-2p ImageEditor-2p-x"
        style={{ left: `${x}px` }}
      />
      <span
        className="ImageEditor-2p ImageEditor-2p-y"
        style={{ top: `${y}px` }}
      />
      <span
        className="ImageEditor-2p ImageEditor-2p-center"
        style={{
          top: `${y - size / 2}px`,
          left: `${x - size / 2}px`,
          width: `${size}px`,
          height: `${size}px`
        }}
      />
    </>
  );
}

export class With2Points extends React.Component {
  render() {
    return (
      <>
        <ControllPoint x={32} y={99} size={10} />
        <ControllPoint x={324} y={240} size={10} />
      </>
    );
  }
}
