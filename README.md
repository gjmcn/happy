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
import {h, u, ur, app, memo} from 'https://cdn.skypack.dev/@gjmcn/happy';
```

## Example

The To Do app from the Hyperapp README using Happy functions:

```html
<script type="module">
  import {u, app, main, h1, input, ul, li, button} from "https://cdn.skypack.dev/@gjmcn/happy";
    
  const AddTodo = u('todos', s => {
    s.todos.push(s.value);
    s.value = '';
  });

  const NewValue = u((s, event) => {
    s.value = event.target.value;
  });

  app({
    init: {todos: [], value: ''},
    view: s => main(
      h1('To do list'),
      input({type: 'text', oninput: NewValue, value: s.value}),
      ul(s.todos.map(todo => li(todo))),
      button({onclick: AddTodo}, 'New!'),
    )
  })
</script>
```

## Usage

### Elements

The virtual node function `h` has parameters `tag`, `props`, `child_0`, `child_1`, `child_2`, ...&ensp;However:

* If `props` is a string, array, or virtual node, it is actually used as `child_0` and an empty object is used for `props`.

* `child_` arguments that are arrays are flattened (nesting is removed) and spread into separate arguments.

* Only `tag` is required.

Happy also includes _element functions_ for most HTML and SVG elements (see `index.js` for the full list). These functions are like `h` without the `tag` parameter:

```js
p('Some text');
p({class: 'some-class'}, 'Some text');
input({type: 'range'});
```

Import element functions along with other Happy functions. E.g.

```js
import {u, app, div, p, span} from 'happy';
```

### Text

`h` automatically applies Hyperapp's `text` function to child elements that are strings, so the `text` function is not used explicitly: 

```js
// hyperapp
h('div', {}, text('Hello'));

// happy
div('Hello');
```

### Updates

The `u` function creates an _update_: an action where we mutate the state directly. `u` is passed a function `f` which has `state` and (optionally) `payload` parameters. `u` returns a new function which also has `state` and `payload` parameters. The new function shallow copies the state, calls `f` with the copied state and payload, and returns the copied state.

For brevity, we call the state parameter `s` rather than `state`, and typically use `s` explicitly when accessing state properties (rather than destructuring).


```js
// hyperapp (increase count property by 1)
const Increment = state => ({...state, count: state.count + 1});

// happy
const Increment = u(s => s.count++);

// hyperapp (set user property to name)
const SetUser = (state, name) => ({...state, user: name});

// happy
const SetUser = u((s, name) => s.user = name);
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

The `ur` function is the same as `u` except that the new function returns whatever `f` (the passed function) returns. Use `ur` for an action that modifies the state and returns `[ModifiedState, ...Effects]`. 

__Notes__:

* When using `u`, no special action is required when the state is an array &mdash; [unlike with standard actions](https://github.com/jorgebucaran/hyperapp/blob/main/docs/architecture/actions.md#transitioning-array-state). (There is no reason to use `ur` to only return the modified state, but if this is done and the state is an array, the state must be wrapped in another array.)

* `u` and `ur` only shallow copy the state and the specified top-level properties. If any other properties are to be mutated, manually shallow copy them inside `f`.

* `u` and `ur` are just convenience functions for creating actions. Standard actions can be used as normal.

### The `app` Function

`app` is used as in Hyperapp except that: 

* The `node` property can be a DOM element (as in Hyperapp) or a CSS query string &mdash; the app is inserted into the first corresponding element. If the node property is absent or falsy, the app is appended to the end of the document body.

* The `init` option is not required: if `init` is omitted, `null` or `undefined`, the initial state is an empty object. (As normal with Hyperapp, if the initial state is an array, it must be wrapped in another array, e.g. `[[4, 5, 6]]` or `[[4, 5, 6], someEffect]`.)