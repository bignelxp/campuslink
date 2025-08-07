import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { log } from 'console';
import { Value } from '@radix-ui/react-select';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Filières',
    href: route('filiere.create'),
  },
];

type semestre={
  id:number
  nom_semestre:string,
  cycle:string,
}
interface CreateFiliereProps{
  Semestres:semestre[]
}




export default function CreateFiliere({Semestres}:CreateFiliereProps) {
  const { data, setData, post, processing, errors } = useForm({
    nom_filiere: '',
    description_filiere: '',
    cycle: 'Licence',
    annee: 'L1',
    semestre: 0,
    ues: [] as {
      nom_ue: string;
      credits: string;
      matieres: {
        nom_matiere: string;
        description: string;
        utilite: string;
      }[];
    }[],
  });

  const handleAddUE = () => {
    setData('ues', [
      ...data.ues,
      {
        nom_ue: '',
        credits: '',
        matieres: [],
      },
    ]);
  };

  const handleUEChange = (index: number, field: 'nom_ue' | 'credits', value: string) => {
    const updated = [...data.ues];
    updated[index][field] = value;
    setData('ues', updated);
  };
  const handleAddMatiere = (ueIndex: number) => {
    const updated = [...data.ues];
    updated[ueIndex].matieres.push({
      nom_matiere: '',
      description: '',
      utilite: '',
    });
    setData('ues', updated);
  };
  

  const handleMatiereChange = (
    ueIndex: number,
    matiereIndex: number,
    field: 'nom_matiere' | 'description' | 'utilite',
    value: string
  ) => {
    const updated = [...data.ues];
    updated[ueIndex].matieres[matiereIndex][field] = value;
    setData('ues', updated);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('filiere.store'));
  };

  const years = Array.from({length:10},(_,i)=>new Date().getFullYear()-i+7)
  const[SelectedYear,setSelectedYear]=useState<number|null>(null)
  const [SelectedNiveau,setSelectedNiveau] =useState<string>('L1')
  const niveaux = ['L1', 'L2', 'L3','M1', 'M2']
  const[FilteredSemestre,setFilteredSemestre]=useState<semestre[]>([])
  const [SelectedSemestre,setSelectedSemestre] =useState<semestre|null>(null)
  useEffect(()=>{
     if(SelectedNiveau){
      const semestreFilter=Semestres.filter(semestre=>semestre.cycle.toLowerCase().includes(SelectedNiveau.toLowerCase()))
      setFilteredSemestre(semestreFilter)
     }
   },[SelectedNiveau])
    const handleSemestreChange = (value: string) => {

      const selected = FilteredSemestre.find(s => s.nom_semestre === value) || null;      
      setSelectedSemestre(selected);
    };

useEffect(()=>{
  if (SelectedSemestre) {
    console.log(SelectedSemestre);
    setData('semestre', SelectedSemestre?.id ?? 0)
  }
},[SelectedSemestre])

  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Créer une Filière" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap" rel="stylesheet" />

      {Object.values(errors).map((error, idx) => (
        <div key={idx} className="text-red-600 mb-2">{error}</div>
      ))}

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-mistyrose shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Créer une nouvelle filière 🏫</h1>

        <form onSubmit={submit} className="space-y-6">
          {/* Nom de la filière */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la filière</label>
            <input
              type="text"
              value={data.nom_filiere}
              onChange={(e) => setData('nom_filiere', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.nom_filiere ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="Ex: Informatique de gestion"
            />
            {errors.nom_filiere && <p className="text-red-600 text-sm mt-1">{errors.nom_filiere}</p>}
          </div>

          {/* Description de la filière */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={data.description_filiere}
              onChange={(e) => setData('description_filiere', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.description_filiere ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="Décrivez brièvement la filière..."
            />
            {errors.description_filiere && <p className="text-red-600 text-sm mt-1">{errors.description_filiere}</p>}
          </div>

           
{/*
          <div className="flex gap-4">
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sélection de cycle</label>
              <Select value={SelectedNiveau} onValueChange={setSelectedNiveau}>
                <SelectTrigger className="w-[180px] shadow-sm">
                  <SelectValue placeholder="Cycle"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cycle</SelectLabel>
                    {niveaux.map((niveau)=>(
                      <SelectItem key={niveau} value={niveau}>{niveau}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
                
            </div>

          
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-1">Sélection de semestre</label>
              <Select value={SelectedSemestre?.nom_semestre ?? ''} onValueChange={handleSemestreChange} >
                <SelectTrigger className="w-[180px] shadow-sm">
                  <SelectValue placeholder="Semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Semestre</SelectLabel>
                      {FilteredSemestre.map((semestre)=>(
                        <SelectItem value={semestre.nom_semestre} key={semestre.nom_semestre}>{semestre.nom_semestre}</SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sélection d'une année</label>
              <Popover>
                <PopoverTrigger asChild>
                  
                 
                  <button
                    className='w-[180px] flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  text-gray-500 shadow-sm' 
                  >
                    {SelectedYear ?? "Année"}
                    <ChevronDown className='ml-2 h-4 w-4 opacity-50'/>
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandGroup>
                      {years.map((year)=>(
                        <CommandItem 
                          key={year}
                          onSelect={()=>setSelectedYear(year)}
                        >
                          {year}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {errors.semestre && <p className="text-red-600 text-sm mt-1">{errors.semestre}</p>}
            </div>
          </div>

          
          <div>
            <button
              type="button"
              onClick={handleAddUE}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Ajouter une UE
            </button>

            {data.ues.map((ue, ueIndex) => (
              <div key={ueIndex} className="mt-6 p-4 border rounded-md bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">UE {ueIndex + 1}</h2>

                <input
                  type="text"
                  value={ue.nom_ue}
                  onChange={(e) => handleUEChange(ueIndex, 'nom_ue', e.target.value)}
                  placeholder="Nom de l’UE"
                  className="w-full mb-3 px-4 py-2 border rounded-md"
                />
                <input
                  type="number"
                  value={ue.credits}
                  onChange={(e) => handleUEChange(ueIndex, 'credits', e.target.value)}
                  placeholder="Crédits"
                  className="w-full mb-3 px-4 py-2 border rounded-md"
                />

                <button
                  type="button"
                  onClick={() => handleAddMatiere(ueIndex)}
                  className="mb-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-blue-700"
                >
                  Ajouter une matière
                </button>

                {ue.matieres.map((matiere, matiereIndex) => (
                  <div key={matiereIndex} className="p-3 mb-4 bg-white border rounded-md">
                    <h3 className="font-medium text-gray-600 mb-2">Matière {matiereIndex + 1}</h3>
                    <input
                      type="text"
                      value={matiere.nom_matiere}
                      onChange={(e) =>
                        handleMatiereChange(ueIndex, matiereIndex, 'nom_matiere', e.target.value)
                      }
                      placeholder="Nom de la matière"
                      className="w-full mb-2 px-3 py-2 border rounded-md"
                    />
                    <textarea
                      value={matiere.description}
                      onChange={(e) =>
                        handleMatiereChange(ueIndex, matiereIndex, 'description', e.target.value)
                      }
                      placeholder="Description"
                      className="w-full mb-2 px-3 py-2 border rounded-md"
                    />
                    
                  </div>
                ))}
              </div>
            ))}
          </div>
*/}
          {/* Bouton de soumission */}
          <div className="text-right">
            <button
              type="submit"
              disabled={processing}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              ☑️ Enregistrer la filière
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}