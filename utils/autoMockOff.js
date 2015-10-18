/*
* Module imports are hoisted, which is why you can’t turn off
* auto-mocking beforehand.
* Work-around: make this module the first import.
* Reference: https://github.com/rauschma/babel-on-node/blob/master/auto_mock_off.js
* */

jest.autoMockOff();

