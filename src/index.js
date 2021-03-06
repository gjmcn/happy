import { h as _h, text as _text, app as _app, memo } from 'hyperapp';
export { h, app, memo, u, ur };

function h(...args) {
  const a1 = args[1];
  const props = typeof a1 === 'string' || Array.isArray(a1) ||
      (a1 &&
       a1.hasOwnProperty('tag') &&
       a1.hasOwnProperty('props') && 
       a1.hasOwnProperty('children'))
    ? null : a1;
  const elmts = [];
  for (let i = props === null ? 1 : 2; i < args.length; i++) {
    const ai = args[i];
    if (typeof ai === 'string') {
      elmts.push(_text(ai));
    }
    else if (Array.isArray(ai)) {
      for (let e of ai.flat(Infinity)) {        
        elmts.push(typeof e === 'string' ? _text(e) : e);
      }
    }
    else {
      elmts.push(ai);
    }
  }
  return _h(args[0], props ?? {}, elmts);
}

function copy(q) {
  return Array.isArray(q) ? [...q] : {...q};
} 

function copyState(state, propNames) {
  state = copy(state);
  for (let name of propNames) {
    state[name] = copy(state[name]);
  }
  return state;
}

function u(...args) {
  return function(state, payload) {
    state = copyState(state, args.slice(0, -1));
    args[args.length - 1](state, payload);
    return Array.isArray(state) ? [state] : state;
  }
}

function ur(...args) {
  return function(state, payload) {
    state = copyState(state, args.slice(0, -1));
    return args[args.length - 1](state, payload);
  }
}

function app(options) {
  const ops = {...options};
  ops.init = ops.init ?? {};
  if (!ops.node) {
    ops.node = document.createElement('div');
    document.body.append(ops.node);
  }
  else if (typeof ops.node === 'string') {
    ops.node = document.querySelector(ops.node);
  }
  return _app(ops);
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