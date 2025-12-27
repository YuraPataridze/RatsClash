import './Header.css'

interface HeaderProps {
    userName: string;
    level: string;
}

export default function Header({userName, level}: HeaderProps) {
    return (
        <div className='Header'>
            <div className="header-content">
                <p>{userName}</p>
                <p>{level}</p>
            </div>
        </div>
    )
}