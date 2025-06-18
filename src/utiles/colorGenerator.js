const colors = {
  a: "bg-orange-100",
  b: "bg-rose-200",
  c: "bg-rose-700",
  d: "bg-yellow-900",
  e: "bg-lime-600",
  f: "bg-emerald-300",
  g: "bg-orange-100",
  h: "bg-green-600",
  i: "bg-pink-300",
  j: "bg-sky-200",
  k: "bg-indigo-500",
  l: "bg-orange-700",
  m: "bg-red-900",
  n: "bg-sky-700",
  o: "bg-amber-500",
  p: "bg-purple-700",
  q: "bg-amber-200",
  r: "bg-cyan-800",
  s: "bg-indigo-700",
  t: "bg-green-200",
  u: "bg-green-100",
  v: "bg-cyan-300",
  w: "bg-red-600",
  x: "bg-emerald-700",
  y: "bg-green-400",
  z: "bg-rose-900",
};

export const getColor = (name) => {
  // const lastWord = name.slice(name.length - 2, name.length);
  const lastWord = name.slice(0, 1).toLowerCase();

  return colors[lastWord];
};
