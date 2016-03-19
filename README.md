# react-progress-button

[![build status](https://img.shields.io/travis/mathieudutour/react-progress-button/master.svg?style=flat-square)](https://travis-ci.org/mathieudutour/react-progress-button)
[![npm version](https://img.shields.io/npm/v/react-progress-button.svg?style=flat-square)](https://www.npmjs.com/package/react-progress-button)
[![Dependency Status](https://david-dm.org/mathieudutour/react-progress-button.svg)](https://david-dm.org/mathieudutour/react-progress-button)
[![devDependency Status](https://david-dm.org/mathieudutour/react-progress-button/dev-status.svg)](https://david-dm.org/mathieudutour/react-progress-button#info=devDependencies)

> Simple [React](http://facebook.github.io/react/index.html) component for a circular Progress Button.

### [Demo](https://mathieudutour.github.io/react-progress-button)

[![Demo](https://cdn.rawgit.com/mathieudutour/react-progress-button/master/example/demo.gif "Demo")](https://github.com/mathieudutour/react-progress-button/blob/master/example/index.html)

## Install

```bash
npm install react-progress-button --save
```

## Example

### Controlled usage:

```javascript
import ProgressButton from 'react-progress-button'

const App = React.createClass({
  getInitialState () {
    return {
      buttonState: ''
    }
  },

  render () {
    return (
      <div>
        <ProgressButton onClick={this.handleClick} state={this.state.buttonState}>
          Go!
        </ProgressButton>
      </div>
    )
  },

  handleClick () {
    this.setState({buttonState: 'loading'})
    // make asynchronous call
    setTimeout(function() {
      this.setState({buttonState: 'success'})
    }.bind(this), 3000)
  }
})
```

[Source](https://github.com/mathieudutour/react-progress-button/blob/master/example/index.html)

### Using Promises:

If the function passed in via the `onClick` prop return a Promise or if a promise
is passed as an argument of the `loading` method,
the component will automatically transition to its success or error
states based on the outcome of the Promise without the need for
external manipulation of state using a ref.

```javascript
import ProgressButton from 'react-progress-button'

const App = React.createClass({
  render () {
    return (
      <div>
        <ProgressButton onClick={this.handleClick}>
          Go!
        </ProgressButton>
      </div>
    )
  },

  handleClick() {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, 3000)
    })
  }
});
```

[Source](https://github.com/mathieudutour/react-progress-button/blob/master/example/index-promises.html)

## API

### Props

All props are optional. All props other than that will be passed to the top element.

##### classNamespace

Namespace for CSS classes, default is `pb-` i.e CSS classes are `pb-button`.

##### durationError

Duration (ms) before going back to normal state when an error occurs,
default is 1200

##### durationSuccess

Duration (ms) before going back to normal state when an success occurs,
default is 500

##### onClick

Function to call when the button is clicked; if it returns a Promise
then the component will transition to the success/error state based on
the outcome of the Promise

##### onError

Function to call when going back to the normal state after an error

##### onSuccess

Function to call when going back to the normal state after a success

##### state

State of the button if you do not want to use the functions. Can be `''`, `loading`, `success`, `error` or `disabled`.

##### type

Type of the button (can be 'submit' for example).

##### form

Id of the form to submit (useful if the button is not directly inside the form).

##### shouldAllowClickOnLoading

Whether click event should bubble when in loading state

### Methods

##### loading()

Put the button in the loading state.

##### disable()

Put the button in the disabled state.

##### notLoading(), enable()

Put the button in the normal state.

##### success([callback, dontGoBackToNormal])

Put the button in the success state. Call the callback or the onSuccess prop when going back to the normal state.

##### error([callback])

Put the button in the error state. Call the callback or the onSuccess prop when going back to the normal state.

## Styles

Look at [react-progress-button.css](https://github.com/mathieudutour/react-progress-button/blob/master/react-progress-button.css) for an idea on how to style this component.

## License

  MIT
