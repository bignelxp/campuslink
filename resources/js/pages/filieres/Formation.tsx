import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem } from '@/types';

type Matiere = {
  id: number;
  nom: string;
  description: string;
};

type Ue = {
  id: number;
  nom: string;
  credits: number;
  matieres: Matiere[];
};

type FormationProps = {
  filiere: {
    id: number;
    nom: string;
  };
  ueParNiveau: {
    [niveau: string]: Ue[];
  };
};

export default function Formation({ filiere, ueParNiveau }: FormationProps) {
  const niveaux = Object.keys(ueParNiveau).sort();
  const [niveauActif, setNiveauActif] = useState(niveaux[0] || '');

  // Breadcrumbs pour navigation
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Liste filières', href: route('filiere.index') },
    { title: filiere.nom, href: route('filieres.show', filiere.id) },
    { title: 'Formation', href: '#' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Formation - ${filiere.nom}`} />

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Formation de la filière : {filiere.nom}</h1>

        {/* Bouton retour */}
        <div className="mb-6">
          <Link
            href={route('filiere.index')}
            className="inline-block text-blue-600 hover:underline"
          >
            ← Retour à la liste des filières
          </Link>
        </div>

        {/* Onglets des niveaux */}
        <div className="flex space-x-3 mb-6 border-b border-gray-300">
          {niveaux.map((niveau) => (
            <button
              key={niveau}
              onClick={() => setNiveauActif(niveau)}
              className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
                niveau === niveauActif
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              {niveau}
            </button>
          ))}
        </div>

        {/* Liste des UE du niveau actif */}
        <div>
          {ueParNiveau[niveauActif]?.length ? (
            ueParNiveau[niveauActif].map((ue) => (
              <div key={ue.id} className="mb-8 p-4 border rounded shadow-sm">
                <h2 className="text-xl font-semibold mb-2">
                  {ue.nom} ({ue.credits} crédits)
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {ue.matieres.map((matiere) => (
                    <li key={matiere.id}>
                      <strong>{matiere.nom}</strong>: {matiere.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucune UE pour ce niveau.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
