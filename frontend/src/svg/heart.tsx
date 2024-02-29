import { svgType } from "./svg-type";

export const Heart = (props: svgType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-heart"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#2c3e50"
    fill="transparent"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  </svg>
);
