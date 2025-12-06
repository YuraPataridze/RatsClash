interface HeaderProps {
    userName: string;
}

export default function Header({userName}: HeaderProps) {
    return (
        <>
        {userName}
        </>
    )
}