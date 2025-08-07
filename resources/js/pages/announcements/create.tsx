import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Publication',
        href: route('announcements.create'),
    },
];
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: ''
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('announcements.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Soumettre">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="max-w-2xl mx-auto mt-10 p-6 bg- shadow-lg rounded-2xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Faire une annonce 📣</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Champ Titre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                errors.title ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                            }`}
                            placeholder="De quoi veux-tu parler ?"
                        />
                        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
                        <textarea
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            className={`w-full h-32 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 ${
                                errors.content ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                            }`}
                            placeholder="Écris ici le contenu de ton annonce..."
                        />
                        {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                        >
                            Publier l’annonce
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
