function Pine({ x, y, width, height, fill, duration }) {
  const trunkWidth = width * 0.12;
  const trunkX = x + width / 2 - trunkWidth / 2;
  const base = y + height;

  return (
    <g
      className="pine"
      style={{ "--duration": duration }}
      fill={fill}
      aria-hidden="true"
    >
      <rect
        x={trunkX}
        y={base - height * 0.25}
        width={trunkWidth}
        height={height * 0.25}
      />
      <path
        d={`M ${x + width / 2} ${y} L ${x} ${base - height * 0.15} L ${
          x + width
        } ${base - height * 0.15} Z`}
      />
      <path
        d={`M ${x + width / 2} ${y + height * 0.2} L ${x + width * 0.08} ${
          base - height * 0.02
        } L ${x + width * 0.92} ${base - height * 0.02} Z`}
      />
      <path
        d={`M ${x + width / 2} ${y + height * 0.4} L ${x + width * 0.18} ${
          base
        } L ${x + width * 0.82} ${base} Z`}
      />
    </g>
  );
}

function TreeLine({ className, trees }) {
  return (
    <svg
      className={`tree-line ${className}`}
      viewBox="0 0 1040 300"
      preserveAspectRatio="xMidYMax slice"
      role="presentation"
    >
      {trees.map((tree) => (
        <Pine key={`${tree.x}-${tree.height}-${tree.fill}`} {...tree} />
      ))}
    </svg>
  );
}

export default function ForestBackground() {
  const farTrees = [
    { x: 26, y: 88, width: 70, height: 172, fill: "#141814", duration: "12s" },
    { x: 154, y: 104, width: 62, height: 156, fill: "#1b211c", duration: "10s" },
    { x: 310, y: 72, width: 78, height: 188, fill: "#141814", duration: "11s" },
    { x: 558, y: 98, width: 68, height: 162, fill: "#1b211c", duration: "9s" },
    { x: 810, y: 76, width: 78, height: 184, fill: "#141814", duration: "12s" },
    { x: 952, y: 110, width: 58, height: 150, fill: "#1b211c", duration: "10s" },
  ];

  const middleTrees = [
    { x: 48, y: 54, width: 92, height: 206, fill: "#141814", duration: "11s" },
    { x: 170, y: 94, width: 72, height: 166, fill: "#1a201b", duration: "9s" },
    { x: 300, y: 30, width: 112, height: 230, fill: "#141814", duration: "12s" },
    { x: 520, y: 82, width: 82, height: 178, fill: "#1a201b", duration: "8.5s" },
    { x: 720, y: 46, width: 102, height: 214, fill: "#141814", duration: "10s" },
    { x: 914, y: 100, width: 78, height: 160, fill: "#1a201b", duration: "9.8s" },
  ];

  const nearTrees = [
    { x: 8, y: 50, width: 122, height: 250, fill: "#111511", duration: "10s" },
    { x: 130, y: 120, width: 80, height: 180, fill: "#172018", duration: "8s" },
    { x: 344, y: 12, width: 136, height: 288, fill: "#111511", duration: "12s" },
    { x: 650, y: 86, width: 100, height: 214, fill: "#172018", duration: "9s" },
    { x: 846, y: 38, width: 124, height: 262, fill: "#111511", duration: "11s" },
  ];

  return (
    <div className="forest-background" aria-hidden="true">
      <div className="fog-layer fog-layer--high" />
      <div className="fog-layer fog-layer--middle" />
      <svg
        className="forest-road"
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        role="presentation"
      >
        <path d="M520 420 L610 116 L690 420 Z" fill="#1b211c" />
      </svg>
      <TreeLine className="tree-line--far" trees={farTrees} />
      <TreeLine className="tree-line--middle" trees={middleTrees} />
      <TreeLine className="tree-line--near" trees={nearTrees} />
    </div>
  );
}
