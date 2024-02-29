import { SVGProps } from "react";

export type svgType = {
  width?: number;
  height?: number;
  hidden?: boolean;
} & SVGProps<SVGSVGElement>;
