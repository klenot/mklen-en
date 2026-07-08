export type PathConfig = {
  d: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  viewBox: { w: number; h: number };
};

export const PATH_HORIZONTAL: PathConfig = {
  d: "M 95,68 C 55,175 95,300 205,335 C 335,375 330,205 460,240 C 545,263 585,150 670,135 C 775,117 800,300 850,410",
  start: { x: 95, y: 68 },
  end: { x: 850, y: 410 },
  viewBox: { w: 1006, h: 505 },
};

export const PATH_VERTICAL: PathConfig = {
  d: "M 252,45 C 395,90 440,175 235,245 C 55,310 75,410 305,455 C 470,510 35,610 248,705 C 165,775 420,855 225,910 C 245,952 252,982 252,1000",
  start: { x: 252, y: 45 },
  end: { x: 252, y: 1000 },
  viewBox: { w: 505, h: 1006 },
};

// Legacy exports used by CircleField
export const PATH_START = PATH_HORIZONTAL.start;
export const PATH_END = PATH_HORIZONTAL.end;
export const VIEWBOX = PATH_HORIZONTAL.viewBox;
