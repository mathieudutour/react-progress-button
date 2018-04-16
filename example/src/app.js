import React from 'react'
import ReactDOM from 'react-dom'
import ProgressButton, {STATE} from '../../lib/index'
import createReactClass from 'create-react-class'

const App = createReactClass({
  getInitialState () {
    return {
      button1State: STATE.NOTHING,
      button2State: STATE.NOTHING,
      button3State: STATE.DISABLED
    }
  },

  render () {
    return (
      <div>
        <div id='button-success'>
          <ProgressButton state={this.state.button1State} onClick={this.handleClick1} size="44px" radius="47px" fontSize="12px" theme="#daa521">
            Go!
          </ProgressButton>
        </div>
        <div id='button-error'>
          <ProgressButton state={this.state.button2State} onClick={this.handleClick2} theme="purple">
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
    this.setState({button1State: STATE.LOADING})
    // make asynchronous call
    setTimeout(() => {
      this.setState({button1State: STATE.SUCCESS})
    }, 3000)
  },

  handleClick2 () {
    this.setState({button2State: STATE.LOADING})
    // make asynchronous call
    setTimeout(() => {
      this.setState({button2State: STATE.ERROR})
    }, 3000)
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
