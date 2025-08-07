import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Bell, Bolt, BookOpen, FileUser, Folder, LayoutGrid, Library, PenSquare, Power, Rss, School, School2, Upload, User } from 'lucide-react';
import AppLogo from './app-logo';
import { Arrow } from '@radix-ui/react-tooltip';

const mainNavItems: NavItem[] = [
    
    {
        title: 'Annonces',
        href: route('announcements.index'),
        icon: Bell,
    },

     {
        title: 'Bibliothèque',
        href: route('fichier.index'),
        icon: Library,
    },



    {
        title: 'Gestion des filières',
        href: route('filiere.create'),
        icon: School2,
    },

    {
        title: 'Filières',
        href: route('filiere.index'),
        icon: School,
    },


    {
        title: 'Soumettre',
        href: route('fichier.create'),
        icon:Upload,
    },

    {
        title: 'Publier',
        href: route('announcements.create'),
        icon:PenSquare,
    },
 /* {
        title:'Mes fichiers',
        href: route('mesFichiers'),
        icon:FileUser,
    }*/

   {
        title:'Mes contributions',
        href:route('fichier.index',{version:'mesFichiers'}),
        icon:FileUser
   }


];

const footerNavItems: NavItem[] = [
    
   
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
