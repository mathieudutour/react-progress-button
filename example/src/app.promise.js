import React from 'react'
import ReactDOM from 'react-dom'
import ProgressButton from '../../lib/index'
import createReactClass from 'create-react-class'

const App = createReactClass({
  render () {
    return (
      <div>
        <div id='button-success'>
          <ProgressButton state={this.state.button1State} onClick={this.handleClick1}>
            Go!
          </ProgressButton>
        </div>
        <div id='button-error'>
          <ProgressButton state={this.state.button2State} onClick={this.handleClick2}>
            Go!
          </ProgressButton>
        </div>
        <div id='button-disabled'>
          <ProgressButton state={this.state.button3State}>
            Don't Go!
          </ProgressButton>
        </div>
      </div>
    )
  },

  handleClick1 () {
    return new Promise(resolve => {
      // make asynchronous call
      setTimeout(resolve, 3000)
    })
  },

  handleClick2 () {
    return new Promise((resolve, reject) => {
      // make asynchronous call
      setTimeout(reject, 3000)
    })
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
