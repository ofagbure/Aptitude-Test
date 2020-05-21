export default function Link(Props) {

    const onClick = (event)=> {
        event.preventDefault();
        window.history.pushState(null, null, props.to);
        window.dispatchEvent(new window.PopStateEvent('popstate'));
    };

    return <a href={props.to} onClick={onClick}>{props.children}</a>
}