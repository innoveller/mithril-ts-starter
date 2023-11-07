import * as m from 'mithril';
import CounterComponent from "./components/Counter"
//import './theme.scss';
import './app.scss';

function RootComponent(): m.Component<{}> {
    return {
        view(vnode) {
            return m(CounterComponent, {name:"hi", initialValue: 1});
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){ 
    let appRootElement = document.getElementById("app")!;
    console.log("App element", appRootElement);
    m.mount(appRootElement, RootComponent)
});
