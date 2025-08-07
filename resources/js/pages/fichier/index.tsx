import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { ReactNode, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Bibliothèque',
    href: route('fichier.index'),
  },
];

export interface Fichier {
  description_file: ReactNode;
  created_at: string | number | Date;
  id: number;
  nom_file: string;
  url_file: string;
  user_id: number;
}

interface FichierIndexProps {
  fichiers: Fichier[];
}

function fichierIndex({ fichiers }: FichierIndexProps) {
  const { auth, flash } = usePage().props as any;
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDelete = (fichierId: number) => {
    if (confirm("Confirmez-vous la suppression de ce fichier ?")) {
      setLoadingId(fichierId);
      router.delete(route("fichier.destroy", fichierId), {
        onFinish: () => setLoadingId(null),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Fichiers" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap" rel="stylesheet" />      
      <div className="w-full flex-1 min-h-[calc(100vh-100px)] bg-mistyrose">
        <div className="max-w-6xl mx-auto px-6 py-10 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl">
          <h1 className="text-3sm font-bold mb-8 text-gray-800 text-center">📃 Liste des fichiers</h1>

          {flash?.success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{flash.success}</div>
          )}

          {fichiers.length === 0 ? (
            <p className="text-gray-500 text-center">Aucun fichier disponible.</p>
          ) : (
            <ul className="space-y-4">
              {fichiers.map((fichier) => {
                const fileUrl = `/uploads/${fichier.url_file}`;
                const userRoles = auth.user.roles || []; // Assurez-vous que les rôles sont bien passés dans les props
                const isOwner = auth.user.id === fichier.user_id;
                const isAdminOrCoord = userRoles.includes('coordonnateur') || userRoles.includes('Administration');
                const canDelete = isOwner || isAdminOrCoord;

                return (
                  <li key={fichier.id} className="border p-4 rounded shadow bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p><strong>Description :</strong> {fichier.description_file}</p>
                        <p><strong>Utilisateur :</strong> {fichier.user_id}</p>
                        <p><strong>Soumis le :</strong> {new Date(fichier.created_at).toLocaleString()}</p>
                      </div>
                      {canDelete && (
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(fichier.id)}
                          disabled={loadingId === fichier.id}
                        >
                          {loadingId === fichier.id ? "Suppression..." : "Supprimer"}
                        </Button>
                      )}
                    </div>

                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 text-xs bg-emerald-100 rounded"
                    >
                      Ouvrir 📄
                    </a>

                    <div className="mt-3">
                      {fileUrl.endsWith('.pdf') && (
                        <embed src={fileUrl} type="application/pdf" width="100%" height="400px" />
                      )}
                      {(fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') || fileUrl.endsWith('.png')) && (
                        <img src={fileUrl} alt={fichier.nom_file} className="w-64 h-auto mt-2 rounded border" />
                      )}
                      {!fileUrl.match(/\.(pdf|jpg|jpeg|png)$/) && (
                        <p className="text-gray-500 italic">Aperçu non disponible pour ce type de fichier</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default fichierIndex;
