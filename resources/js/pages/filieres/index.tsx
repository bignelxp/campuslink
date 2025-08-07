import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface Semestre {
  id: number;
  nom_semestre: string;
  cycle: string;
}

interface Matiere {
  ue_id: number;
  nom_mat: string;
  description_mat: string;
  utilite: string;
  credit: number;
}

interface UE {
  id: number;
  nom_ue: string;
  credits: string;
  matieres: Matiere[];
  semestre_id: number;
}

interface Filiere {
  id: number;
  nom_filiere: string;
  description_filiere: string;
  cycle: string;
  annee: string;
  semestre: string;
  ues: UE[];
}

interface Props {
  filieres: Filiere[];
  ues: UE[];
  matieres: Matiere[];
  semestres: Semestre[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Filières', href: route('filiere.index') },
];

export default function IndexFiliere({ filieres, ues, matieres, semestres }: Props) {
  const [niveaux] = useState<string[]>(['L1', 'L2', 'L3', 'M1', 'M2']);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Liste des Filières" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full flex-1 min-h-[calc(100vh-100px)] bg-mistyrose">
        <div className="max-w-6xl mx-auto px-6 py-10 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl">
          <h1 className="text-3sm font-bold mb-8 text-gray-800 text-center">
            📚 Liste des Filières
          </h1>

          {filieres.length === 0 ? (
            <p className="text-gray-500 text-center">Aucune filière disponible.</p>
          ) : (
            filieres.map((filiere) => (
              <div
                key={filiere.id}
                className="mb-10 p-6 border border-gray-200 rounded-2xl bg-white shadow-sm"
              >
                <h2 className="text-1xl font-semibold text-rose-900 mb-2">{filiere.nom_filiere}</h2>
                <p className="text-sm mb-5">Description : {filiere.description_filiere}</p>

               {/*} {niveaux.map((niveau) => (
                  <Collapsible key={niveau}>
                    <CollapsibleTrigger className="w-full p-3 rounded-md bg-rose-100 text-rose-900 mb-3 flex justify-between items-center hover:bg-rose-200 transition">
                      <span className="font-medium">{niveau}</span>
                      <ChevronDown />
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pl-4 space-y-4">
                      {semestres
                        .filter((s) =>
                          s.cycle.toLowerCase().includes(niveau.toLowerCase())
                        )
                        .map((semestre) => (
                          <Collapsible key={semestre.id}>
                            <CollapsibleTrigger className="w-full p-3 ml-4 rounded-md bg-gray-100 text-gray-800 flex justify-between items-center hover:bg-gray-200 transition">
                              <span>{semestre.nom_semestre}</span>
                              <ChevronDown />
                            </CollapsibleTrigger>

                            <CollapsibleContent className="pl-6 space-y-4">
                              {ues
                                .filter((ue) => ue.semestre_id === semestre.id)
                                .map((ue) => (
                                  <Collapsible key={ue.id}>
                                    <CollapsibleTrigger className="w-full p-3 ml-4 rounded-md bg-gray-50 text-gray-700 flex justify-between items-center hover:bg-gray-100 transition">
                                      <span className="text-sm">{ue.nom_ue}</span>
                                      <ChevronDown />
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="pl-6 space-y-3">
                                      {matieres
                                        .filter((m) => m.ue_id === ue.id)
                                        .map((matiere) => (
                                          <Collapsible key={matiere.nom_mat}>
                                            <CollapsibleTrigger className="w-full p-3 ml-4 rounded-md bg-white text-gray-700 flex justify-between items-center hover:bg-gray-100 border transition">
                                              <span className="text-sm">{matiere.nom_mat}</span>
                                              <ChevronDown />
                                            </CollapsibleTrigger>

                                            <CollapsibleContent className="ml-4 p-4 bg-gray-50 border-l-4 border-rose-300 rounded-md">
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                <span className="font-medium text-gray-600">Description :</span>
                                                <span className="text-gray-700">{matiere.description_mat}</span>
                                              </div>
                                            </CollapsibleContent>
                                          </Collapsible>
                                        ))}
                                    </CollapsibleContent>
                                  </Collapsible>
                                ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}*/}
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
