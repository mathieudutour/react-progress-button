# react-progress-button

> Simple [React](http://facebook.github.io/react/index.html) component for a circular Progress Button.

### [Demo](https://mathieudutour.github.io/react-progress-button)

[![Demo](https://cdn.rawgit.com/mathieudutour/react-progress-button/master/example/demo.gif "Demo")](https://github.com/mathieudutour/react-progress-button/blob/master/example/index.html)

## Install

```bash
npm install react-progress-button --save
```

or

```bash
bower install react-progress-button --save
```

## Example

Controlled usage:

```javascript
var ProgressButton = require('react-progress-button');

var App = React.createClass({
  render() {
    return (
      <div>
        <ProgressButton ref='button' onClick={this.handleClick}>
          Go!
        </ProgressButton>
      </div>
    );
  },
  
  handleClick() {
    this.refs.button.loading();
    //make asynchronious call
    setTimeout(function() {
      this.refs.button.success();
    }.bind(this), 3000);
  }
});
```

## API

### Props

All props are optional.

##### classNamespace

Namespace for CSS classes, default is `pb-` i.e CSS classes are `pb-button`.

##### durationError

Duration (ms) before going back to normal state when an error occurs,
default is 1200

##### durationSuccess

Duration (ms) before going back to normal state when an success occurs,
default is 500

##### onClick

Function to call onClick on the button

##### onError

Function to call when going back to the normal state after an error

##### onSuccess

Function to call when going back to the normal state after a success

##### state

State of the button if you do not want to use the functions. Can be '', 'loading', 'success' or 'error'.



### Methods

##### loading()

Put the button in the loading state.

##### notLoading()

Put the button in the normal state.

##### success([callback, dontGoBackToNormal])

Put the button in the success state. Call the callback or the onSuccess prop when going back to the normal state.

##### error([callback])

Put the button in the error state. Call the callback or the onSuccess prop when going back to the normal state.

## Styles

Look at [react-progress-button.css](https://github.com/mathieudutour/react-progress-button/blob/master/react-progress-button.css) for an idea on how to style this component.

---

MIT Licensed



