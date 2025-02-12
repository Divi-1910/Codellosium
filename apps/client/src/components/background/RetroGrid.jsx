import { cn } from "../../utils/cn";

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  ...props
}) {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
        className
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid relative [background-image:linear-gradient(to_right,rgba(99,102,241,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(99,102,241,0.3)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]">
          <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-t from-transparent via-white/5 to-transparent" />
        </div>
      </div>
    </div>
  );
}
