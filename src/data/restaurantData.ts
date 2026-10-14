import { DishItem, GalleryItem } from '../types';

export const SIGNATURE_DISHES: DishItem[] = [
  {
    id: 'veloute-de-champignons',
    name: 'Velouté de Champignons',
    frenchCategory: 'Entrée',
    categoryKey: 'entree',
    description: 'Velouté onctueux de champignons des bois sauvages, lamelles de truffe noire du Périgord et perles d’huile de ciboulette.',
    price: '€28',
    demoNote: 'Prix indicatif (Démo)',
    image: '/images/dishes/veloute-de-champignons.jpg',
    dietary: ['Végétarien', 'Sans gluten disponible'],
    pairing: 'Chablis Premier Cru 2020'
  },
  {
    id: 'filet-de-bar',
    name: 'Filet de Bar Sauvage',
    frenchCategory: 'Plat',
    categoryKey: 'plat',
    description: 'Filet de bar doré à la plancha, émulsion soyeuse au safran d’Iran et agrumes doux, salicornes croquantes et touche d’or fin.',
    price: '€32',
    demoNote: 'Prix indicatif (Démo)',
    image: '/images/dishes/filet-de-bar.jpg',
    dietary: ['Pêche durable', 'Sans gluten'],
    pairing: 'Meursault Domaine Roulot 2019'
  },
  {
    id: 'boeuf-bourguignon',
    name: 'Bœuf Bourguignon de Charolais',
    frenchCategory: 'Plat',
    categoryKey: 'plat',
    description: 'Joue de bœuf charolais confite douze heures dans une réduction de vin de Bourgogne, petits oignons glacés et girolles dorées.',
    price: '€30',
    demoNote: 'Prix indicatif (Démo)',
    image: '/images/dishes/boeuf-bourguignon.jpg',
    dietary: ['Terroir Français'],
    pairing: 'Gevrey-Chambertin Vieilles Vignes 2018'
  },
  {
    id: 'tarte-tatin',
    name: 'Tarte Tatin Caramélisée',
    frenchCategory: 'Dessert',
    categoryKey: 'dessert',
    description: 'Pommes confites lentement au caramel beurre salé, pâte feuilletée croustillante et quenelle de crème fraîche de Normandie à la vanille de Madagascar.',
    price: '€14',
    demoNote: 'Prix indicatif (Démo)',
    image: '/images/dishes/tarte-tatin.jpg',
    dietary: ['Végétarien'],
    pairing: 'Sauternes Château d’Yquem 2016'
  }
];

export const ALL_MENU_ITEMS: DishItem[] = [
  ...SIGNATURE_DISHES,
  {
    id: 'foie-gras-poele',
    name: 'Foie Gras de Canard Poêlé',
    frenchCategory: 'Entrée',
    categoryKey: 'entree',
    description: 'Pain brioché toasté, compotée de figues violettes au porto et fleur de sel de Guérande.',
    price: '€26',
    demoNote: 'Prix indicatif (Démo)',
    image: '/images/hero/hero-cinematic.jpg',
    dietary: ['Spécialité Maison'],
    pairing: 'Monbazillac Domaine de l’Ancienne Cure'
  },
  {
    id: 'souffle-grand-marnier',
    name: 'Soufflé Chaud au Grand Marnier',
    frenchCategory: 'Dessert',
    categoryKey: 'dessert',
    description: 'Soufflé aérien doré minute, sorbet mandarine sanguine et zeste d’orange confit.',
    price: '€16',
    demoNote: 'Prix indicatif (Démo)',
    image: '/images/gallery/gallery-chef.jpg',
    dietary: ['Végétarien'],
    pairing: 'Grand Marnier Cuvée du Centenaire'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'wine-service',
    title: 'L’Art de la Sommellerie',
    caption: 'Notre chef sommelier sélectionne les plus prestigieux millésimes de Bordeaux, Bourgogne et Champagne pour sublimer votre dégustation.',
    image: '/images/gallery/gallery-wine.jpg',
    aspectRatio: 'landscape'
  },
  {
    id: 'paris-dusk',
    title: 'Vue Panoramique sur Paris',
    caption: 'Un crépuscule d’or et de velours bleu sur la Seine et la silhouette étincelante de la Tour Eiffel.',
    image: '/images/gallery/gallery-paris.jpg',
    aspectRatio: 'landscape'
  },
  {
    id: 'candlelit-tables',
    title: 'Intimité & Chandelles',
    caption: 'Un cadre feutré baigné de lueurs chaudes, pensé pour des tête-à-tête romantiques et des conversations inoubliables.',
    image: '/images/gallery/gallery-table.jpg',
    aspectRatio: 'landscape'
  },
  {
    id: 'culinary-art',
    title: 'Précision Culinaires & Passion',
    caption: 'Chaque assiette est une composition artistique façonnée avec rigueur et passion par notre brigade étoilée.',
    image: '/images/gallery/gallery-chef.jpg',
    aspectRatio: 'landscape'
  },
  {
    id: 'grand-dining-room',
    title: 'Le Grand Salon Étoile',
    caption: 'Boulures dorées, lustres de cristal de Bohême et boiseries séculaires au cœur de la Ville Lumière.',
    image: '/images/story/story-interior.jpg',
    aspectRatio: 'landscape'
  },
  {
    id: 'hero-creation',
    title: 'La Création Gastronomique',
    caption: 'L’alliance parfaite entre tradition séculaire et vision contemporaine de la haute cuisine française.',
    image: '/images/hero/hero-cinematic.jpg',
    aspectRatio: 'landscape'
  }
];
