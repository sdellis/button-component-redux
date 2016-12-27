// button-component-redux v1.0.0 https://github.com/viewdir/component-boilerplate#readme
declare namespace IIIFComponents {
    function select(): {
        type: string;
    };
    function deselect(): {
        type: string;
    };
    function toggle(): {
        type: string;
    };
}

declare namespace IIIFComponents {
    const SELECT: string;
    const DESELECT: string;
    const TOGGLE: string;
}

declare const Redux: any;
declare const h: any;
declare const diff: any;
declare const patch: any;
declare const createElement: any;
declare namespace IIIFComponents {
    class ButtonComponentRedux extends _Components.BaseComponent {
        options: IButtonComponentReduxOptions;
        rootNode: any;
        tree: any;
        private _store;
        constructor(options: IButtonComponentReduxOptions);
        stateChanged(new_state: any): void;
        protected _init(): boolean;
        getState(): any;
        private _render(state);
        private _updateView();
        protected _getDefaultOptions(): IButtonComponentReduxOptions;
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.ButtonComponentRedux {
    class Events {
        static STATECHANGED: string;
    }
}

declare namespace IIIFComponents {
    interface IButtonComponentReduxOptions extends _Components.IBaseComponentOptions {
        selected?: boolean;
    }
}

declare namespace IIIFComponents {
    function selected(state: boolean, action: any): boolean;
}
