const $ = require('jquery');
const assert = require('assert');
const appendList = require('../src/appendList');

describe("appendList default function", () => {
    it("append list to container", () => {
        document.body.innerHTML = __html__['test/appendList.html'];

        let $container = $(".js-list");

        assert.equal($container.find('li').length, 0, "最初は0件");

        appendList($container);
        assert.equal($container.find('li').length, 1, "追加したので1件増える");

        appendList($container);
        assert.equal($container.find('li').length, 2, "追加したので2件に増える");
    });
});
