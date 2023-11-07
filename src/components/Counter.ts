import * as m from 'mithril';
import './Counter.scss';

interface Attrs {
    name: string;
    initialValue: number;
    total?: any
}

export default function CounterComponent(): m.Component<Attrs> {
    let count = 0;
    function increment() {
        count++;
    }
    function decrement() {
        count--;
    }
    return {
        oninit(vnode) {
            count = vnode.attrs.initialValue;
        },
        view({ attrs }) {
            return m('.counter',
                m('button', { onclick: decrement }, '-'),
                m('span.value', `${count}`),
                m('button', { onclick: increment }, '+')
            );
        }
    };
}
