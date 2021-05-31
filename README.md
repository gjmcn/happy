# Happy

A few helper/wrapper functions to simplify [Hyperapp](https://github.com/jorgebucaran/hyperapp) code.

## Install

```
npm install --save @gjmcn/happy
```

Hyperapp is included in Happy.

## Import

E.g. from CDN:

```js
import {h, u, app} from 'https://cdn.skypack.dev/@gjmcn/happy';
```

The `memo` Hyperapp functions can also be imported from `happy`.

## Example

To Do app from the Hyperapp README using Happy functions:

```html
<script type="module">
  import {u, app, main, h1, input, ul, li, button} from "https://cdn.skypack.dev/@gjmcn/happy";
    
  const AddTodo = u('todos', s => {
    s.todos.push(s.value);
    s.value = '';
  });

  const NewValue = u((s, event) => s.value = event.target.value);

  app({
    init: {todos: [], value: ''},
    view: s => main([
      h1('To do list'),
      input({type: 'text', oninput: NewValue, value: s.value}),
      ul(s.todos.map(todo => li(todo))),
      button({onclick: AddTodo}, 'New!'),
    ])
  })
</script>
```

## Usage

### Elements

The virtual node function `h` has parameters `tag`, `props` and `children`, just as in Hyperapp. However, if called with only two arguments, the behavior of `h` depends on the second argument: if it is a string or an array, the second argument is the `children` and the `props` is `{}`; otherwise, the second argument is `props` (which should be an object) and `children` is not used. `h` can also be called with just a `tag` argument.

Happy also includes _element functions_ for most HTML and SVG elements (see `index.js` for the full list). These functions are used like `h`, but no element name is passed:

```js
p('Some text');
p({class: 'some-class'}, 'Some text');
input({type: 'range'});
```

The required element functions are imported along with other Happy functions. E.g.

```js
import {h, u, app, div, p, span} from 'happy';
```

### Text

The `text` Hyperapp function is not used. When the `children` argument of `h` or an element function is a string, it is automatically passed to `text`. When `children` is an array, elements of the array that are strings are automatically passed to `text`.

```js
// hyperapp
h('div', {}, text('Hello'));

// happy
div('Hello');
```

### Updates

The `u` function creates an _update_: an action where we mutate the state directly. `u` is passed a function `f` with parameters for the state and (optionally) payload. `u` returns a new function with the same parameters as `f`. The new function shallow copies the state, calls `f` with the copied state and payload, and returns the copied state.

__Note__ For brevity, call the state parameter `s` rather than `state`. We typically use `s` explicitly when accessing state properties (rather than destructuring).


```js
// hyperapp (set user property to name)
const SetUser = (state, name) => ({...state, user: name});

// happy
const SetUser = u((s, name) => s.user = name);

// hyperapp (increase count property by 1)
const Increment = state => ({...state, count: state.count + 1});

// happy
const Increment = u(s => s.count++);
```

When updating one or more properties that are themselves objects or arrays, we can tell `u` to shallow copy these properties (as well as the state) by passing the property names as arguments. The function is passed after the property names:

```js
// hyperapp (toggle element of highlight property)
const ToggleHighlight = (state, index) => {
  const highlight = [...state.highlight];
  highlight[index] = !highlight[index];
  return {...state, highlight};
};

// happy
const ToggleHighlight = u('highlight', (s, index) => {
  s.highlight[index] = !s.highlight[index];
})
```

__Note__: `u` only shallow copies the state and the specified top-level properties. If any other properties are to be mutated, manually shallow copy them first.

Effecters/effects can be passed to `u` as additional arguments &mdash; a function is an effecter, an array (`[effecter, options]`) is an effect:

```js
// hyperapp
const Select = (state, someValue) => [
  {...state, someProperty: someValue},
  [ dispatch => /* effecter body */ ],
  [
    (dispatch, options) =>  /* effecter body */,
    optionsObject    
  ],
];

// happy
const Select = u(
  (s, someValue) => s.someProperty = someValue,
  dispatch => /* effecter body */,
  [
    (dispatch, options) =>  /* effecter body */,
    optionsObject    
  ],
);
```

### Node

The `node` property that specifies where the app is inserted can be a DOM element (as in Hyperapp) or a CSS query string &mdash; the app is inserted into the first corresponding element. If the node property is absent or falsy, the app is appended to the end of the document body. 

### Notes

* Only use `u` for actions that change the state and return the state. Use normal functions for other actions, such as when an action returns another action:

  ```js
  // hyperapp and happy
  (_, event) => {
    event.stopPropagation();
    return someAction;
  };
  ```

* Use a normal object for state, not an array. (When a state array is used in Hyperapp, actions must wrap the returned state array in another array. The Happy function `u` does not do this.)

* Hyperapp concepts that are not discussed here (e.g. effect creators and subscriptions) are used as normal.