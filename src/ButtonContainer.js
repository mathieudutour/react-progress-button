import styled from 'styled-components';

const ButContainer = styled.div`
  display: inline-block;
  text-align: center;

  .pb-button {
    background: transparent;
    border: 2px solid;
    border-color: ${props => props.theme || 'currentColor'};
    border-radius: ${props => props.radius || '37px'};
    color: ${props => props.theme || 'currentColor'};
    cursor: pointer;
    padding: 0 3rem;
    text-decoration: none;
    text-align: center;
    height: ${props => props.size || '54px'};
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition: background-color 0.3s, width 0.3s, border-width 0.3s,
      border-color 0.3s, border-radius 0.3s;
  }

  span {
    display: inherit;
    transition: opacity 0.3s 0.1s;
    font-size: ${props => props.fontSize || '2em'};
    font-weight: 100;
  }
  svg {
    height: ${props => props.size || '54px'};
    width: ${props => props.size || '54px'};
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  svg path {
    opacity: 0;
    fill: none;
  }
  svg.pb-progress-circle {
    animation: spin 0.9s infinite cubic-bezier(0.085, 0.26, 0.935, 0.71);
  }
  svg.pb-progress-circle path {
    stroke: ${props => props.theme || 'currentColor'};
    stroke-width: 5;
  }
  svg.pb-checkmark path,
  svg.pb-cross path {
    stroke: #fff;
    stroke-linecap: round;
    stroke-width: 4;
  }
  .disabled .pb-button {
    cursor: not-allowed;
  }
  .loading .pb-button {
    width: ${props => props.size || '54px'};
    border-width: 6.5px;
    border-color: #ddd;
    cursor: wait;
    background-color: transparent;
    padding: 0;
  }
  .loading .pb-button span {
    transition: all 0.15s;
    opacity: 0;
    display: none;
  }
  .loading .pb-button .pb-progress-circle > path {
    transition: opacity 0.15s 0.3s;
    opacity: 1;
  }
  .success .pb-button {
    border-color: #a0d468;
    background-color: #a0d468;
  }
  .success .pb-button span {
    transition: all 0.15s;
    opacity: 0;
    display: none;
  }
  .success .pb-button .pb-checkmark > path {
    opacity: 1;
  }
  .error .pb-button {
    border-color: #ed5565;
    background-color: #ed5565;
  }
  .error .pb-button span {
    transition: all 0.15s;
    opacity: 0;
    display: none;
  }
  .error .pb-button .pb-cross > path {
    opacity: 1;
  }
  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
      transform-origin: center center;
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
      transform-origin: center center;
    }
  }
`;

export default ButContainer;
