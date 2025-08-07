// Dashboard.tsx

import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tableau de bord', href: '/dashboard' },
];

export default function Dashboard() {
  const { userCount, fileCount, announcements, filesByDay, auth, announcementCount, announcementsByDay } = usePage().props as unknown as {
    userCount: number;
    fileCount: number;
    announcements: any[];
    filesByDay: { day: string; total: number }[];
    announcementsByDay: { day: string; total: number }[];
    auth: { user: { name: string; prenoms: string } };
    announcementCount: number;
  };

  const cumulativeFilesByDay = filesByDay.reduce(
    (acc: { day: string; total: number }[], curr, i) => {
      const previousTotal = acc[i - 1]?.total ?? 0;
      acc.push({ day: curr.day, total: previousTotal + curr.total });
      return acc;
    },
    []
  );

  const cumulativeAnnouncementsByDay = announcementsByDay.reduce(
    (acc: { day: string; total: number }[], curr, i) => {
      const previousTotal = acc[i - 1]?.total ?? 0;
      acc.push({ day: curr.day, total: previousTotal + curr.total });
      return acc;
    },
    []
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap" rel="stylesheet" />

      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-4">
          Bienvenue, {auth.user.prenoms} ! 🧑‍🎓
        </h1>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border p-4 text-center">
            <h3 className="text-lg font-semibold">Utilisateurs</h3>
            <p className="text-3xl text-purple-700">{userCount}</p>
          </div>
          <div className="rounded-xl border p-4 text-center">
            <h3 className="text-lg font-semibold">Fichiers</h3>
            <p className="text-3xl text-orange-600">{fileCount}</p>
          </div>
          <div className="rounded-xl border p-4 text-center">
            <h3 className="text-lg font-semibold">Annonces</h3>
            <p className="text-3xl text-emerald-500">{announcementCount}</p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="flex flex-wrap gap-4">
          <Link href="/fichier/create" className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-blue-700">🤲 Contribuer</Link>
          <Link href="/fichier" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">👀 Consulter la bibliothèque</Link>
          <Link href="/announcements/create" className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">📣 Publier une annonce</Link>
        </div>

        {/* Graphique des fichiers */}
        <div className="bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 Fichiers ajoutés sur 7 jours</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cumulativeFilesByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3cccc" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#fff0f0', borderColor: '#fca5a5' }} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#dc2626' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique des annonces */}
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📢 Annonces publiées sur 7 jours</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cumulativeAnnouncementsByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#f0fff4', borderColor: '#34d399' }} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#059669' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Dernières annonces */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">📰 Dernières annonces</h2>
          <ul className="space-y-2">
            {announcements.map((a, index) => (
              <li key={index} className="border-b pb-2">
                <p className="font-semibold">{a.title ?? "Sans titre"}</p>
                <p className="text-sm text-gray-500">{new Date(a.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Section À venir */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">🛠️ Fonctionnalités à venir</h2>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            <li>Statistiques des utilisateurs actifs</li>
            <li>Classement des contributeurs</li>
            <li>Évaluation des fichiers</li>
            <li>Notifications en temps réel</li>
            <li>Recensement des modules par filière</li>
          </ul>
        </div>

      </div>
    </AppLayout>
  );
}
