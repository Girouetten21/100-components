import manga01 from './img/Reading/manga01.webp';
import manga02 from './img/Reading/manga02.webp';
import manga03 from './img/Reading/manga03.webp';
import manga04 from './img/Reading/manga04.webp';
import manga05 from './img/Reading/manga05.webp';
import manga06 from './img/Reading/manga06.webp';
import manga07 from './img/Reading/manga07.webp';
import manga08 from './img/Reading/manga08.webp';

import manga11 from './img/Completed/manga11.webp';
import manga12 from './img/Completed/manga12.webp';
import manga13 from './img/Completed/manga13.webp';
import manga14 from './img/Completed/manga14.webp';
import manga15 from './img/Completed/manga15.webp';

import manga21 from './img/Maybe/manga21.webp';
import manga22 from './img/Maybe/manga22.webp';
import manga23 from './img/Maybe/manga23.webp';
import manga24 from './img/Maybe/manga24.webp';
import manga25 from './img/Maybe/manga25.webp';
import manga26 from './img/Maybe/manga26.webp';
import manga27 from './img/Maybe/manga27.webp';

const readingMangaData = [
  { id: 1, title: 'Shinmai Ossan Bokensha', imageUrl: manga01 },
  { id: 2, title: 'Sotaisei Rabu', imageUrl: manga02 },
  { id: 3, title: 'Dai Jukai', imageUrl: manga03 },
  { id: 4, title: 'Saikyo Juzoku Tensei', imageUrl: manga04 },
  { id: 5, title: 'Dainamaito', imageUrl: manga05 },
  { id: 6, title: 'Makai Toshi Burusu', imageUrl: manga06 },
  { id: 7, title: 'Rettoshoku no Saikyo', imageUrl: manga07 },
  { id: 8, title: 'Meitantei Hokenshitsu', imageUrl: manga08 },
];

const completedMangaData = [
  { id: 11, title: 'Gedo Kikka', imageUrl: manga11 },
  { id: 12, title: 'Tanemaki Yosei', imageUrl: manga12 },
  { id: 13, title: 'Shachiku Danjon', imageUrl: manga13 },
  { id: 14, title: 'Odoru Mizu no Kenchikushi!', imageUrl: manga14 },
  { id: 15, title: 'Gyakusatsu Happi Endo', imageUrl: manga15 },
];

const maybeMangaData = [
  { id: 21, title: 'Jujutsu Kaisen', imageUrl: manga21 },
  { id: 22, title: 'Sayonara', imageUrl: manga22 },
  { id: 23, title: 'Kotatsu Uchu', imageUrl: manga23 },
  { id: 24, title: 'Isekai Kagishi', imageUrl: manga24 },
  { id: 25, title: 'Shojo Shumatsu Ryoko', imageUrl: manga25 },
  { id: 26, title: 'Ha + Benky', imageUrl: manga26 },
  { id: 27, title: 'Urobuchi Gen', imageUrl: manga27 },
];

// Exportar como objeto nombrado
export {
  readingMangaData as readingManga,
  completedMangaData as completedManga,
  maybeMangaData as maybeManga
};