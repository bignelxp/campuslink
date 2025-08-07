import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title:'Annonces',
        href:route('announcements.index')
    },
];
interface Announcement {
    id: number;
    title: string;
    type: 'automatique' | 'manuel';
    content: string;
    created_at: string;
    created_by: string;
    related_file_id: number;
    related_user_id: number;
}
interface Fichier {
    id: number;
    nom_file: string;	
    type_file: string;	
    description_file: string;	
    url_file: string;	
    user_id: number;	
    matiere_id:	number|null;
    created_at: string;
    updated_at: string;
}
interface User {
    id: number;
    nom: string;
    prenoms: string;
    tel: number;
    sex: string;
    date_naissance: string;
    lieu_naissance: string;

}
interface AnnouncementsProps {
    announcements: Announcement[];
    fichiers: Fichier[];
    users: User[];
}
export default function Announcements({ announcements, fichiers, users }: AnnouncementsProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Annonces" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap" rel="stylesheet" />
            <div className="w-full flex-1 min-h-[calc(100vh-100px)] bg-mistyrose">
                <div className="max-w-6xl mx-auto px-6 py-10 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl">
                    <h1 className="text-3sm font-bold mb-8 text-gray-800 text-center">🔔 Fil d'annonces</h1>
                    {announcements.length === 0 ? (
                        <p className="text-gray-500 text-center"> Aucune annonce en ce moment.</p>
                    ) : (
                    <div className="space-y-6">
        {announcements.map(a => {
            const fichier = fichiers.find(f => f.id === a.related_file_id);
            return (
                <div key={a.id} className="rounded-xl border bg-white dark:bg-neutral-900 shadow p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-semibold">{a.title}</span>

                        {a.type === 'automatique' && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Automatique</span>
                        )}
                        {a.type === 'manuel' && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Manuel</span>
                            
                        )}
                    </div>
                    <div className=" mb-2">{a.content}</div>
        {a.type === 'manuel' && a.created_by && (
        <span className="text-xs bg--100 text-teal-500 rounded italic ">
            Annonce de {a.created_by}
        </span>
        )}
                    <div className="text-xs text-gray-500">
                        
                        {new Date(a.created_at).toLocaleString('fr-FR')}
                    </div>

                                {a.type === 'automatique' && fichier && (
                        <div className="text-sm text--600 mt-3">

                            <a
                                href={`/uploads/${fichier.url_file}`}

                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 text-xs bg-purple-100 text-red-700 rounded "
                            >
                                consultable ici📄
                            </a> 
                        </div>
                    )}
                </div>
            );
        })}
                    </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}