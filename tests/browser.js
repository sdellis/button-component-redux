var expect = require('chai').expect;
var should = require('chai').should();
var path = require("path");
var html = path.join(__dirname,'../examples/index.html');
var jsdom = require("jsdom");

// this is an example of testing the component in the "browser"
describe('buttonRedux browser tests', function() {
    this.timeout(15000);
    // outline our tests
    var foo = false, // just a test var to make sure jsdom callback works
        selected, // var to determine if options can be set in config object
        //label, // var to determine if options can be set in config object
        initialState, // var to determine if intial state is set by options
        toggleDiv, // var to determine if component TOGGLE Action affects DOM
        toggleState, // var to determine if component TOGGLE Action affects State
        selectState, // var to determine if component SELECT Action works
        deselectState, // var to determine if component DESELECT Action works
        mountsDOM; // var to determine if component mounts on DOM

    beforeEach(function(done){

        jsdom.env({
          file: html,
          features: {
                FetchExternalResources: ["script"],
                ProcessExternalResources: ["script"],
                SkipExternalResources: false,
                MutationEvents           : '2.0'
            },
          done: function (err, window) {
            var $ = window.$;

            var buttonRedux = new window.IIIFComponents.ButtonComponentRedux({
                    element: "#button-component-redux",
                    selected: false
                });

            foo = true;
            selected = buttonRedux.options.selected;
            //label = buttonRedux.options.label;
            initialState = buttonRedux.getState();

            mountsDOM = $( "#button-component-redux > button" ).length;

            $( "#button-component-redux" ).trigger( "click" );
            toggleState = buttonRedux.getState();
            toggleDiv = $( "#button-component-redux > button" ).text();

            $( "#select-all" ).trigger( "click" );
            selectState = buttonRedux.getState();
            $( "#deselect-all" ).trigger( "click" );
            deselectState = buttonRedux.getState();

            done();
          }
        });

    });

    /*//////////
    // tests
    *///////////

    it('mounts on DOM element', function() {
        expect(mountsDOM).to.equal(1);
    });

    it('has a selected option of false', function() {
        expect(selected).to.be.false;
    });

    // it('has a label of "foo"', function() {
    //     expect(label).to.equal("foo");
    // });

    it('has an initial state determined by options', function() {
        //expect(initialState.label).to.equal("foo");
        expect(initialState.selected).to.be.false;
    });

    it('selected toggles when TOGGLE Action is dispatched', function() {
        expect(toggleState.selected).to.be.true;
        expect(toggleDiv).to.equal("true");
    });

    it('selected is true when SELECT Action is dispatched', function() {
        expect(selectState.selected).to.be.true;
    });

    it('selected is false when DESELECT Action is dispatched', function() {
        expect(deselectState.selected).to.be.false;
    });

    it('foo should be true', function() {
        expect(foo).to.be.true; // <-- passes
    });

});
