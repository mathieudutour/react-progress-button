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
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
      var className = this.props.className;
      var classNamespace = this.props.classNamespace;
      var children = this.props.children;
      var type = this.props.type;
      var form = this.props.form;

      var containerProps = _objectWithoutProperties(this.props, ["classNamespace", "children", "type", "form", "durationError", "durationSuccess", "onClick", "onError", "state", "shouldAllowClickOnLoading"]);
      containerProps.className = classNamespace + "container " + this.state.currentState + ' ' + className;
      containerProps.onClick = this.handleClick;
      return (
        React.createElement("div", containerProps,
          React.createElement("button", {type: type, form: form, className: classNamespace + "button"},
            React.createElement("span", null, children),
            React.createElement("svg", {className: classNamespace + "progress-circle",
              viewBox: "0 0 41 41"},
              React.createElement("path", {d: "M38,20.5 C38,30.1685093 30.1685093,38 20.5,38"})
            ),
            React.createElement("svg", {className: classNamespace + "checkmark",
              viewBox: "0 0 70 70"},
              React.createElement("path", {d: "m31.5,46.5l15.3,-23.2"}),
              React.createElement("path", {d: "m31.5,46.5l-8.5,-7.1"})
            ),
            React.createElement("svg", {className: classNamespace + "cross",
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
      if ((this.props.shouldAllowClickOnLoading ||
          this.state.currentState !== 'loading') &&
          this.state.currentState !== 'disabled'
      ) {
        var ret = this.props.onClick(e);
        this.loading(ret);
      } else {
        e.preventDefault();
      }
    },

    loading: function(promise) {
      this.setState({currentState: 'loading'});
      if (promise && promise.then && promise.catch) {
        promise
          .then(function() {
            this.success();
          }.bind(this))
          .catch(function() {
            this.error();
          }.bind(this));
      }
    },

    notLoading: function() {
      this.setState({currentState: ''});
    },

    enable: function() {
      this.setState({currentState: ''});
    },

    disable: function() {
      this.setState({currentState: 'disabled'});
    },

    success: function(callback, dontRemove) {
      this.setState({currentState: 'success'});
      this._timeout = setTimeout(function() {
        callback = callback || this.props.onSuccess;
        if (typeof callback === 'function') { callback(); }
        if (dontRemove === true) { return; }
        this.setState({currentState: ''});
      }.bind(this), this.props.durationSuccess);
    },

    error: function(callback) {
      this.setState({currentState: 'error'});
      this._timeout = setTimeout(function() {
        callback = callback || this.props.onError;
        if (typeof callback === 'function') { callback(); }
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
        case 'disabled':
          this.disable();
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
