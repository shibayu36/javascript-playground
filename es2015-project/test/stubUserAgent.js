const $ = require('jquery');
const assert = require('assert');

function stubUserAgent(userAgent) {
    let origDescriptor = Object.getOwnPropertyDescriptor(
        navigator, 'userAgent'
    );

    Object.defineProperty(navigator, 'userAgent', {
        get: function () { return userAgent },
        enumerable: true,
        configurable: true,
    });

    return {
        restore() {
            if (origDescriptor) {
                Object.defineProperty(navigator, 'userAgent', origDescriptor);
            }
            else {
                delete navigator.userAgent;
            }
        },
    };
}

// お構いなしにdefinePropertyし直すパターン
function stubUserAgent2(userAgent) {
    let origUserAgent = navigator.userAgent;

    Object.defineProperty(navigator, 'userAgent', {
        get: function () { return userAgent },
        enumerable: true,
        configurable: true,
    });

    return {
        restore() {
            Object.defineProperty(navigator, 'userAgent', {
                get: function () { return origUserAgent; },
                enumerable: true,
                configurable: true,
            });
        }
    };
}

// navigator自体を取っておいてそっちで復帰するパターン
// これはうまくいかなかった
function stubUserAgent3(userAgent) {
    let navigatorDescriptor = Object.getOwnPropertyDescriptor(
        window, 'navigator'
    );

    Object.defineProperty(navigator, 'userAgent', {
        get: function () { return userAgent },
        enumerable: true,
        configurable: true,
    });

    return {
        restore() {
            Object.defineProperty(window, 'navigator', navigatorDescriptor);
        },
    };
}

// prototype継承してnavigatorを置き換えるパターン
// うまく行かなかった
function stubUserAgent4(userAgent) {
    let origNavigator = window.navigator;

    let fakeNavigator = {};
    fakeNavigator.prototype = origNavigator;
    Object.defineProperty(window.navigator, 'userAgent', {
        get() { return userAgent }
    });

    Object.defineProperty(window, 'navigator', {
        get() { return fakeNavigator },
        enumerable: true,
        configurable: true,
    });

    return {
        restore() {
            Object.defineProperty(window, 'navigator', {
                get() { return origNavigator },
                enumerable: true,
                configurable: true,
            });
        }
    };
}

describe('stubUserAgent', () => {
    it('can stub userAgent', () => {
        let defaultUserAgent = navigator.userAgent;

        let stub = stubUserAgent4('StubbedAgent/1.0');
        assert.equal(navigator.userAgent, 'StubbedAgent/1.0');

        stub.restore();
        assert.equal(navigator.userAgent, defaultUserAgent);
    });
});
