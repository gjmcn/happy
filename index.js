import { h as _h, text as _text, app as _app, memo } from "./node_modules/hyperapp/index.js";
export { h, app, memo, u };

function applyText(children) {
  if (typeof children === 'string') {
    return _text(children);
  }
  if (Array.isArray(children)) {
    return children.map(c => typeof c === 'string' ? _text(c) : c);
  }
  return children;
}

function h(...args) {
  if (args.length > 2) {
    return _h(args[0], args[1], applyText(args[2]));
  }
  if (args.length === 2) {
    if (typeof args[1] === 'string' || Array.isArray(args[1])) {
      return _h(args[0], {}, applyText(args[1]));
    }
    return _h(...args);
  }
  return _h(args[0], {});
}

function u(...args) {
  const propNames = [];
  let i = 0;
  while (typeof args[i] === 'string') {
    propNames.push(args[i++]);
  }
  const f = args[i++];
  if (typeof f !== 'function') {
    throw Error('function expected');
  }
  let eff = [];
  while (i < args.length) {
    let e = args[i++]; 
    if (typeof e === 'function') {
      eff.push([e]);
    }
    else if (Array.isArray(e) && e.length === 2 && typeof e[0] === 'function') {
      eff.push(e);
    }
    else {
      throw Error('function or [function, options] array expected');
    }
  }
  return function(state, payload) {
    state = {...state};
    for (let name of propNames) {
      const prop = state[name];
      state[name] = Array.isArray(prop) ? [...prop] : {...prop};
    }
    f(state, payload);
    if (eff.length) {
      eff.unshift(state);
      return eff;
    }
    return state;
  };
}

function app(options) {
  if (!options.node) {
    const cont = document.createElement('div');
    document.body.append(cont);
    return _app({...options, node: cont});
  }
  if (typeof options.node === 'string') {
    return _app({...options, node: document.querySelector(options.node)});  
  }
  return _app(options);
}


// ========== convenience element functions ==========
// (there is probably a better way to do this!)

function cef(elmName) {
  return h.bind(null, elmName);
}

export let
  a = cef('a'),
  abbr = cef('abbr'),
  address = cef('address'),
  area = cef('area'),
  article = cef('article'),
  aside = cef('aside'),
  audio = cef('audio'),
  b = cef('b'),
  base = cef('base'),
  bdi = cef('bdi'),
  bdo = cef('bdo'),
  blockquote = cef('blockquote'),
  body = cef('body'),
  br = cef('br'),
  button = cef('button'),
  canvas = cef('canvas'),
  caption = cef('caption'),
  cite = cef('cite'),
  code = cef('code'),
  col = cef('col'),
  colgroup = cef('colgroup'),
  data = cef('data'),
  datalist = cef('datalist'),
  dd = cef('dd'),
  del = cef('del'),
  details = cef('details'),
  dfn = cef('dfn'),
  dialog = cef('dialog'),
  div = cef('div'),
  dl = cef('dl'),
  dt = cef('dt'),
  em = cef('em'),
  embed = cef('embed'),
  fieldset = cef('fieldset'),
  figcaption = cef('figcaption'),
  figure = cef('figure'),
  footer = cef('footer'),
  form = cef('form'),
  head = cef('head'),
  header = cef('header'),
  h1 = cef('h1'),
  h2 = cef('h2'),
  h3 = cef('h3'),
  h4 = cef('h4'),
  h5 = cef('h5'),
  h6 = cef('h6'),
  hr = cef('hr'),
  html = cef('html'),
  i = cef('i'),
  iframe = cef('iframe'),
  img = cef('img'),
  input = cef('input'),
  ins = cef('ins'),
  kbd = cef('kbd'),
  label = cef('label'),
  legend = cef('legend'),
  li = cef('li'),
  link = cef('link'),
  main = cef('main'),
  map = cef('map'),
  mark = cef('mark'),
  menu = cef('menu'),
  meta = cef('meta'),
  meter = cef('meter'),
  nav = cef('nav'),
  noscript = cef('noscript'),
  object = cef('object'),
  ol = cef('ol'),
  optgroup = cef('optgroup'),
  option = cef('option'),
  output = cef('output'),
  p = cef('p'),
  param = cef('param'),
  picture = cef('picture'),
  portal = cef('portal'),
  pre = cef('pre'),
  progress = cef('progress'),
  q = cef('q'),
  rb = cef('rb'),
  rt = cef('rt'),
  ruby = cef('ruby'),
  s = cef('s'),
  samp = cef('samp'),
  script = cef('script'),
  section = cef('section'),
  select = cef('select'),
  slot = cef('slot'),
  small = cef('small'),
  source = cef('source'),
  span = cef('span'),
  strong = cef('strong'),
  style = cef('style'),
  sub = cef('sub'),
  summary = cef('summary'),
  sup = cef('sup'),
  table = cef('table'),
  tbody = cef('tbody'),
  td = cef('td'),
  template = cef('template'),
  textarea = cef('textarea'),
  tfoot = cef('tfoot'),
  th = cef('th'),
  thead = cef('thead'),
  time = cef('time'),
  title = cef('title'),
  tr = cef('tr'),
  track = cef('track'),
  ul = cef('ul'),
  video = cef('video'),
  wbr = cef('wbr'),
  animate = cef('animate'),
  animateMotion = cef('animateMotion'),
  animateTransform = cef('animateTransform'),
  circle = cef('circle'),
  clipPath = cef('clipPath'),
  defs = cef('defs'),
  desc = cef('desc'),
  discard = cef('discard'),
  ellipse = cef('ellipse'),
  feBlend = cef('feBlend'),
  feColorMatrix = cef('feColorMatrix'),
  feComponentTransfer = cef('feComponentTransfer'),
  feComposite = cef('feComposite'),
  feConvolveMatrix = cef('feConvolveMatrix'),
  feDiffuseLighting = cef('feDiffuseLighting'),
  feDisplacementMap = cef('feDisplacementMap'),
  feDistantLight = cef('feDistantLight'),
  feDropShadow = cef('feDropShadow'),
  feFlood = cef('feFlood'),
  feFuncA = cef('feFuncA'),
  feFuncB = cef('feFuncB'),
  feFuncG = cef('feFuncG'),
  feFuncR = cef('feFuncR'),
  feGaussianBlur = cef('feGaussianBlur'),
  feImage = cef('feImage'),
  feMerge = cef('feMerge'),
  feMergeNode = cef('feMergeNode'),
  feMorphology = cef('feMorphology'),
  feOffset = cef('feOffset'),
  fePointLight = cef('fePointLight'),
  feSpecularLighting = cef('feSpecularLighting'),
  feSpotLight = cef('feSpotLight'),
  feTile = cef('feTile'),
  feTurbulence = cef('feTurbulence'),
  filter = cef('filter'),
  foreignObject = cef('foreignObject'),
  g = cef('g'),
  hatch = cef('hatch'),
  hatchpath = cef('hatchpath'),
  image = cef('image'),
  line = cef('line'),
  linearGradient = cef('linearGradient'),
  marker = cef('marker'),
  mask = cef('mask'),
  mesh = cef('mesh'),
  meshgradient = cef('meshgradient'),
  meshpatch = cef('meshpatch'),
  meshrow = cef('meshrow'),
  metadata = cef('metadata'),
  mpath = cef('mpath'),
  path = cef('path'),
  pattern = cef('pattern'),
  polygon = cef('polygon'),
  polyline = cef('polyline'),
  radialGradient = cef('radialGradient'),
  rect = cef('rect'),
  set = cef('set'),
  stop = cef('stop'),
  svg = cef('svg'),
  symbol = cef('symbol'),
  text = cef('text'),
  textPath = cef('textPath'),
  tspan = cef('tspan'),
  unknown = cef('unknown'),
  use = cef('use'),
  view = cef('view');