import './title.css'

export default function Title({ children, Title}) {
    return (
        <div className="title">
            {children}
            <span>{Title}</span>
        </div>
    )
}