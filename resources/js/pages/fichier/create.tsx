import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Soumission',
    href: route('fichier.create'),
  },
];

type FichierForm = {
  nom_file: string;
  type_file: string;
  description_file: string;
  url_file: File | null;
};

export default function FichierCreate() {
  const { data, setData, post, processing, errors, reset } = useForm<FichierForm>({
    nom_file: '',
    type_file: '',
    description_file: '',
    url_file: null,
  });

  const enregisterFichier = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setData('nom_file', file.name);
      setData('type_file', file.name.split('.').pop() || '');
      setData('url_file', file);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('fichier.store'), {
      onFinish: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Soumettre un fichier" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap" rel="stylesheet" />

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-mistyrose shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Soumettre un fichier 📁</h1>

        <form onSubmit={submit} className="space-y-6">
          {/* Champ de sélection de fichier */}
          <div>
            <label htmlFor="fichier" className="block text-sm font-medium text-gray-700 mb-1">
              Sélection du fichier
            </label>
            <input
              id="fichier"
              name="url_file"
              type="file"
              onChange={enregisterFichier}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.url_file ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.url_file && <p className="text-red-600 text-sm mt-1">{errors.url_file}</p>}
          </div>

          {/* Champ de description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description_file"
              placeholder="Décris brièvement le contenu ou l’objectif du fichier..."
              value={data.description_file}
              onChange={(e) => setData('description_file', e.target.value)}
              className={`w-full h-32 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 ${
                errors.description_file ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.description_file && (
              <p className="text-red-600 text-sm mt-1">{errors.description_file}</p>
            )}
          </div>

          {/* Bouton de soumission */}
          <div className="text-right">
            <button
              type="submit"
              disabled={processing}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
