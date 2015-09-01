;(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("react"));
  } else if (typeof define === "function" && define.amd) {
    define(["react"], factory);
  } else {
    root.ProgressButton = factory(root.React);
  }
})(this, function (React) {
  "use strict";

  var ProgressButton = React.createClass({displayName: "ProgressButton",
    propTypes: {
      classNamespace: React.PropTypes.string,
      durationError: React.PropTypes.number,
      durationSuccess: React.PropTypes.number,
      form: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onError: React.PropTypes.func,
      onSuccess: React.PropTypes.func,
      state: React.PropTypes.string,
      type: React.PropTypes.string,
      shouldAllowClickOnLoading: React.PropTypes.bool,
    },

    getDefaultProps: function() {
      return {
        classNamespace: 'pb-',
        durationError: 1200,
        durationSuccess: 500,
        onClick: function() {},
        onError: function() {},
        onSuccess: function() {},
        shouldAllowClickOnLoading: false,
      };
    },

    getInitialState: function() {
      return {
        currentState: this.props.state || ''
      };
    },

    render: function() {
      return (
        React.createElement("div", {className: this.props.classNamespace + "container " + this.state.currentState,
          onClick: this.handleClick},
          React.createElement("button", {type: this.props.type, form: this.props.form,
            className: this.props.classNamespace + "button"},
            React.createElement("span", null, this.props.children),
            React.createElement("svg", {className: this.props.classNamespace + "progress-circle",
              viewBox: "0 0 41 41"},
              React.createElement("path", {d: "M38,20.5 C38,30.1685093 30.1685093,38 20.5,38"})
            ),
            React.createElement("svg", {className: this.props.classNamespace + "checkmark",
              viewBox: "0 0 70 70"},
              React.createElement("path", {d: "m31.5,46.5l15.3,-23.2"}),
              React.createElement("path", {d: "m31.5,46.5l-8.5,-7.1"})
            ),
            React.createElement("svg", {className: this.props.classNamespace + "cross",
              viewBox: "0 0 70 70"},
              React.createElement("path", {d: "m35,35l-9.3,-9.3"}),
              React.createElement("path", {d: "m35,35l9.3,9.3"}),
              React.createElement("path", {d: "m35,35l-9.3,9.3"}),
              React.createElement("path", {d: "m35,35l9.3,-9.3"})
            )
          )
        )
      );
    },

    handleClick: function(e) {
      if (shouldAllowClickOnLoading || this.state.currentState !== 'loading') {
        this.props.onClick(e);
      }
    },

    loading: function() {
      this.setState({currentState: 'loading'});
    },

    notLoading: function() {
      this.setState({currentState: ''});
    },

    success: function(callback, dontRemove) {
      this.setState({currentState: 'success'});
      this._timeout = setTimeout(function() {
        callback = callback || this.props.onSuccess;
        callback();
        if (dontRemove === true) { return; }
        this.setState({currentState: ''});
      }.bind(this), this.props.durationSuccess);
    },

    error: function(callback) {
      this.setState({currentState: 'error'});
      this._timeout = setTimeout(function() {
        callback = callback || this.props.onError;
        callback();
        this.setState({currentState: ''});
      }.bind(this), this.props.durationError);
    },

    componentWillReceiveProps: function(nextProps) {
      switch(nextProps.state) {
        case 'success':
          this.success();
          return;
        case 'error':
          this.error();
          return;
        case 'loading':
          this.loading();
          return;
        case '':
          this.notLoading();
          return;
        default:
          return;
      }
    },

    componentWillUnmount: function() {
      clearTimeout(this._timeout);
    }
  });

  return ProgressButton;
});
