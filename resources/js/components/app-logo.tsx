import AppLogoIcon from './app-logo-icon';

function getGreeting() {
    const hour = new Date().getHours();
    return hour >= 15 || hour < 6 ? " 🌝Bonsoir !" : " 🌞Bonjour !";
}

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img src="/logo.svg" alt="Logo" className="size-8" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-lg">{getGreeting()}</span>
            </div>
        </>
    );
}
