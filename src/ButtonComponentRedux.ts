const Redux = require('redux');
const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

namespace IIIFComponents {
    export class ButtonComponentRedux extends _Components.BaseComponent {

        public options: IButtonComponentReduxOptions;
        public rootNode: any;
        public tree: any;
        private _store: any;

        constructor(options: IButtonComponentReduxOptions) {
            super(options);

            this._init();
            this._resize();
        }

        // events
        public stateChanged(new_state): void {
            this._emit(ButtonComponentRedux.Events.STATECHANGED, new_state);
        }

        protected _init(): boolean {
            var success: boolean = super._init();

            if (!success){
                console.error("Button Component failed to initialise");
            }

            // Initialise the state and document/view
            const initialState = { selected: this.options.selected };
            this.tree = this._render(initialState);      // We need an initial tree
            this.rootNode = createElement(this.tree);    // Create an initial root DOM node ...
            this._$element.append(this.rootNode);

            // main reducer
            function app(state = initialState, action) {
                return {
                  selected: selected(state.selected, action)
                }
            }

            this._store = Redux.createStore(app);

            let unsubscribe = this._store.subscribe(() =>
              this._updateView()
            );

            // Add Event Listeners
            // Note: The only way to mutate the internal state is to dispatch an action.
            var that = this;
            $(this._$element).click(() => this._store.dispatch(toggle()));
            $('#deselect-all').click(() => this._store.dispatch(deselect()));
            $('#select-all').click(() => this._store.dispatch(select()));
            
            return success;
        }

        public getState(): any {
            return this._store.getState();
        }

        // Create a function that declares what the DOM should look like
        private _render(state: any)  {
          return h('button.btn', {
             style: {
                 textAlign: 'center'
             }
         }, [String(state.selected)]);
        }

        // where we update the template
        private _updateView(): void {
            var newState = this._store.getState();
            var newTree = this._render(newState);
            var patches = diff(this.tree, newTree);
            this.rootNode = patch(this.rootNode, patches);
            this.tree = newTree;
            this.stateChanged(newState); //fire event
        }

        protected _getDefaultOptions(): IButtonComponentReduxOptions {
            return <IButtonComponentReduxOptions>{
                selected: false
            }
        }

        protected _resize(): void {

        }
    }
}

namespace IIIFComponents.ButtonComponentRedux {
    export class Events {
        static STATECHANGED: string = 'stateChanged';
    }
}

(function(g) {
    if (!g.IIIFComponents){
        g.IIIFComponents = IIIFComponents;
    } else {
        g.IIIFComponents.ButtonComponentRedux = IIIFComponents.ButtonComponentRedux;
    }
})(global);
