<h1>MetFlisc</h1>

Ce petit projet a deux but, s'exercer sur des concepts comme typescript/styledcomponent ou encore du mobile first. Mais également à servire de base de départ.

# Exercice

L’objectif de cet exercice est de créer une application permettant de rechercher des films. L’attention sera portée sur la qualité du découpage, de l’architecture ainsi que sur les outils mis en place afin d’assurer un code propre et maintenable.

# L’application

L’application devra contenir les fonctionnalités suivantes :

- Affichage des films les plus populaires par défaut quand le champ de recherche est vide [TMDB - Documentation - Get popular movies](https://developers.themoviedb.org/3/movies/get-popular-movies)
- Pouvoir rechercher un film via la barre de recherche ​[TMDB - Documentation - Search movies](https://developers.themoviedb.org/3/search/search-movies)
- Pouvoir vider le champ de recherche à l’aide d’une croix dans l’input
- Pouvoir naviguer vers la page d’un film en cliquant sur son affiche. Cette dernière
  contiendra des informations complémentaires [​TMDB - Documentation - Get movie details](https://developers.themoviedb.org/3/movies/get-movie-details)
- Pouvoir revenir sur la home via un bouton retour dans le header
- Au hover d’un film, afficher son titre
- Mettre en place un toggle dans le header afin de permettre la bascule entre un
  thème light et un thème dark (bonus si sans rafraîchissement)

Des screenshots sont disponibles en annexe de ce document.
Remarque: le design doit être ressemblant mais nous ne nous attendons pas à du pixel-perfect.

# Contraintes

Les contraintes pour cet exercice sont les suivantes :

- Faire une SPA à l’aide de React
- Utilisation de Typescript
- Utilisation de styled-components
- L’application doit être responsive
