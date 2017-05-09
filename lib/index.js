'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var STATE = exports.STATE = {
  LOADING: 'loading',
  DISABLED: 'disabled',
  SUCCESS: 'success',
  ERROR: 'error',
  NOTHING: ''
};

var ProgressButton = (0, _createReactClass2.default)({
  propTypes: {
    classNamespace: _propTypes2.default.string,
    controlled: _propTypes2.default.bool,
    durationError: _propTypes2.default.number,
    durationSuccess: _propTypes2.default.number,
    form: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    onSuccess: _propTypes2.default.func,
    state: _propTypes2.default.oneOf(Object.keys(STATE).map(function (k) {
      return STATE[k];
    })),
    type: _propTypes2.default.string,
    shouldAllowClickOnLoading: _propTypes2.default.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classNamespace: 'pb-',
      controlled: false,
      durationError: 1200,
      durationSuccess: 500,
      onClick: function onClick() {},
      onError: function onError() {},
      onSuccess: function onSuccess() {},

      shouldAllowClickOnLoading: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      currentState: this.props.state || STATE.NOTHING
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.state === this.props.state) {
      return;
    }
    switch (nextProps.state) {
      case STATE.SUCCESS:
        this.success();
        return;
      case STATE.ERROR:
        this.error();
        return;
      case STATE.LOADING:
        this.loading();
        return;
      case STATE.DISABLED:
        this.disable();
        return;
      case STATE.NOTHING:
        this.notLoading();
        return;
      default:
        return;
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._timeout);
  },
  render: function render() {
    var _props = this.props,
        className = _props.className,
        classNamespace = _props.classNamespace,
        children = _props.children,
        type = _props.type,
        form = _props.form,
        durationError = _props.durationError,
        durationSuccess = _props.durationSuccess,
        onClick = _props.onClick,
        onError = _props.onError,
        onSuccess = _props.onSuccess,
        state = _props.state,
        shouldAllowClickOnLoading = _props.shouldAllowClickOnLoading,
        controlled = _props.controlled,
        containerProps = _objectWithoutProperties(_props, ['className', 'classNamespace', 'children', 'type', 'form', 'durationError', 'durationSuccess', 'onClick', 'onError', 'onSuccess', 'state', 'shouldAllowClickOnLoading', 'controlled']);

    containerProps.className = classNamespace + 'container ' + this.state.currentState + ' ' + className;
    containerProps.onClick = this.handleClick;
    return _react2.default.createElement(
      'div',
      containerProps,
      _react2.default.createElement(
        'button',
        { type: type, form: form, className: classNamespace + 'button' },
        _react2.default.createElement(
          'span',
          null,
          children
        ),
        _react2.default.createElement(
          'svg',
          { className: classNamespace + 'progress-circle', viewBox: '0 0 41 41' },
          _react2.default.createElement('path', { d: 'M38,20.5 C38,30.1685093 30.1685093,38 20.5,38' })
        ),
        _react2.default.createElement(
          'svg',
          { className: classNamespace + 'checkmark', viewBox: '0 0 70 70' },
          _react2.default.createElement('path', { d: 'm31.5,46.5l15.3,-23.2' }),
          _react2.default.createElement('path', { d: 'm31.5,46.5l-8.5,-7.1' })
        ),
        _react2.default.createElement(
          'svg',
          { className: classNamespace + 'cross', viewBox: '0 0 70 70' },
          _react2.default.createElement('path', { d: 'm35,35l-9.3,-9.3' }),
          _react2.default.createElement('path', { d: 'm35,35l9.3,9.3' }),
          _react2.default.createElement('path', { d: 'm35,35l-9.3,9.3' }),
          _react2.default.createElement('path', { d: 'm35,35l9.3,-9.3' })
        )
      )
    );
  },
  handleClick: function handleClick(e) {
    if (this.props.controlled) {
      return true;
    }

    if ((this.props.shouldAllowClickOnLoading || this.state.currentState !== STATE.LOADING) && this.state.currentState !== STATE.DISABLED) {
      this.loading();
      var ret = this.props.onClick(e);
      this.handlePromise(ret);
    } else {
      e.preventDefault();
    }
  },
  handlePromise: function handlePromise(promise) {
    var _this = this;

    if (promise && promise.then && promise.catch) {
      promise.then(function () {
        _this.success();
      }).catch(function (err) {
        _this.error(null, err);
      });
    }
  },
  loading: function loading() {
    this.setState({ currentState: STATE.LOADING });
  },
  notLoading: function notLoading() {
    this.setState({ currentState: STATE.NOTHING });
  },
  enable: function enable() {
    this.setState({ currentState: STATE.NOTHING });
  },
  disable: function disable() {
    this.setState({ currentState: STATE.DISABLED });
  },
  success: function success(callback, dontRemove) {
    var _this2 = this;

    this.setState({ currentState: STATE.SUCCESS });
    this._timeout = setTimeout(function () {
      if (!dontRemove) {
        _this2.setState({ currentState: STATE.NOTHING });
      }
      callback = callback || _this2.props.onSuccess;
      if (typeof callback === 'function') {
        callback();
      }
    }, this.props.durationSuccess);
  },
  error: function error(callback, err) {
    var _this3 = this;

    this.setState({ currentState: STATE.ERROR });
    this._timeout = setTimeout(function () {
      _this3.setState({ currentState: STATE.NOTHING });
      callback = callback || _this3.props.onError;
      if (typeof callback === 'function') {
        callback(err);
      }
    }, this.props.durationError);
  }
});

exports.default = ProgressButton;