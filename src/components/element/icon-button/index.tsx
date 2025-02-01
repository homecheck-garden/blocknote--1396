


export default function IconButton({
    icon, 
    onClick, 
    className = '', 
    style} : {icon : React.ReactNode, onClick : ()=>void, className? : string, style? : React.CSSProperties}) {
    return (
    <div className={className + ' element-icon-button'} 
        onClick={onClick}
        style={style}>
        {icon}
    </div>)

}
