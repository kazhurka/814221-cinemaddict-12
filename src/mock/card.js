const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElFromArr = (array) => {
  let randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const getRandomElsFromArr = (array, randomMin, randomMax) => {
  let sortedEls = new Set();
  let elsQuantity = getRandomInteger(randomMin, randomMax);
  for (let i = 0; i < elsQuantity; i++) {
    let randomIndex = getRandomInteger(0, array.length - 1);
    sortedEls.add(array[randomIndex]);
  }
  return Array.from(sortedEls);
};

const generateRandomDate = (start, end) => {
  let date = new Date(start + Math.random() * (end - start));
  return date;
};

const generateDirector = () => {
  const directors = [
    `Крис Коламбус`,
    `Альфонсо Куарон`,
    `Майк Ньюэлл`
  ];
  return getRandomElFromArr(directors);
};
const generateNames = () => {
  const names = [
    `Дэниэл Рэдклифф`,
    `Руперт Гринт`,
    `Эмма Уотсон`,
    `Мэгги Смит`,
    `Робби Колтрейн`,
    `Том Фелтон`,
    `Мэттью Льюис`,
    `Джеймс Фелпс`,
    `Фиона Шоу`,
    `Ричард Гриффитс`,
    `Бонни Райт`,
  ];
  return getRandomElsFromArr(names, 5, 8);
};

const generateDuration = () => {
  return `1h ${getRandomInteger(0, 59)}m`;
};

const generateTitle = () => {
  const titles = [
    `Гарри Поттер и Философский камень`,
    `Гарри Поттер и узник Азкабана`,
    `Гарри Поттер и Орден феникса`,
    `Гарри Поттер и Кубок огня`,
    `Гарри Поттер и Дары смерти`,
    `Гарри Поттер и Тайная комната`,
    `Гарри Поттер и Принц-полукровка`,
  ];

  return getRandomElFromArr(titles);
};

const generateDateRealease = () => {
  return generateRandomDate(0, 1262293200000);
};

const generateCountry = () => {
  const countries = [
    `США`,
    `Аргентина`,
    `Великобритания`,
  ];
  return getRandomElFromArr(countries);
};

const generateDescription = () => {
  const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    ` Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit,eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    ` Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  return getRandomElsFromArr(descriptions, 1, 5).join(` `);
};

const generatePoster = () => {
  const posters = [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ];

  return getRandomElFromArr(posters);
};

const generateGenres = () => {
  const genres = [
    `фэнтези`,
    `боевик`,
    `комедия`,
  ];

  return getRandomElsFromArr(genres, 1, genres.length);
};

const generateEmotion = () => {
  const emotions = [
    `./images/emoji/angry.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/smile.png`,
  ];
  return getRandomElFromArr(emotions);
};

const generateText = () => {
  const texts = [
    `Booooooooooring`,
    `Almost two hours? Seriously?`,
    `Interesting setting and a good cast`,
    `Very very old. Meh`,
  ];
  return getRandomElFromArr(texts);
};

const generateAuthor = () => {
  const authors = [
    `John Doe`,
    `Tim Macoveev`,
    `Harry Potter`,
    `Tarzan`,
  ];

  return getRandomElFromArr(authors);
};
const generateDateOfComment = () => {
  const dates = [
    `2 days ago`,
    `Today`,
    `3 days ago`,
  ];
  return getRandomElFromArr(dates);
};
const generateComment = () => {
  return {
    emotion: generateEmotion(),
    text: generateText(),
    author: generateAuthor(),
    date: generateDateOfComment(),
  };
};

const generateComments = () => {
  let quantity = getRandomInteger(2, 5);
  let comments = [];
  for (let i = 0; i < quantity; i++) {
    comments.push(generateComment());
  }
  return comments;
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateCard = () => {
  let title = generateTitle();
  let commentsData = generateComments();
  return {
    id: generateId(),
    cover: generatePoster(),
    name: title,
    originalName: title,
    rate: getRandomInteger(5, 10),
    director: generateDirector(),
    actors: generateNames(),
    writers: generateNames(),
    dateRelease: generateDateRealease(),
    duration: generateDuration(),
    country: generateCountry(),
    genre: generateGenres(),
    description: generateDescription(),
    comments: commentsData,
    numberOfComments: commentsData.length,
  };
};
