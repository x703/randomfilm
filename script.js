document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate-movie');
    const movieIdeaParagraph = document.getElementById('movie-idea');
    const searchLink = document.getElementById('search-link');
    const likeButton = document.getElementById('like-button');
    const dislikeButton = document.getElementById('dislike-button');
    const likeCountSpan = document.getElementById('like-count');
    const dislikeCountSpan = document.getElementById('dislike-count');
    const commentText = document.getElementById('comment-text');
    const addCommentButton = document.getElementById('add-comment-button');
    const commentsList = document.getElementById('comments-list');
    const loginButton = document.getElementById('login-button');
    const loginForm = document.getElementById('login-form');
    const submitLoginButton = document.getElementById('submit-login');
    const registerButton = document.getElementById('register-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const movieDetailsDiv = document.getElementById('movie-details');
    const movieYearP = document.getElementById('movie-year');
    const movieGenreP = document.getElementById('movie-genre');
    const tvScreen = document.querySelector('.tv-screen'); // Получаем элемент экрана
    const clickSound = document.getElementById('click-sound');
    const staticSound = document.getElementById('static-sound');

    // Загружаем данные из localStorage
    let appData = JSON.parse(localStorage.getItem('appData')) || {
        sovietMovies: [
            { title: "Ирония судьбы, или С лёгким паром!", genre: "Комедия, Мелодрама", year: 1975, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Бриллиантовая рука", genre: "Комедия, Криминал", year: 1969, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Кавказская пленница, или Новые приключения Шурика", genre: "Комедия", year: 1967, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Операция «Ы» и другие приключения Шурика", genre: "Комедия", year: 1965, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Джентльмены удачи", genre: "Комедия, Криминал", year: 1971, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Служебный роман", genre: "Комедия, Мелодрама", year: 1977, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Москва слезам не верит", genre: "Мелодрама, Драма", year: 1979, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Любовь и голуби", genre: "Комедия, Мелодрама", year: 1984, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Покровские ворота", genre: "Комедия, Мелодрама", year: 1982, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Собачье сердце", genre: "Фантастика, Комедия", year: 1988, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "12 стульев", genre: "Комедия, Приключения", year: 1971, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Сталкер", genre: "Фантастика, Драма", year: 1979, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Кин-дза-дза!", genre: "Фантастика, Комедия", year: 1986, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Мимино", genre: "Комедия, Драма", year: 1977, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Афоня", genre: "Комедия", year: 1975, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Белое солнце пустыни", genre: "Боевик, Драма, Приключения", year: 1970, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Гусарская баллада", genre: "Комедия, Мелодрама, Военный", year: 1962, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Обыкновенное чудо", genre: "Сказка, Мелодрама, Комедия", year: 1978, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Три плюс два", genre: "Комедия, Мелодрама", year: 1963, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Весна на Заречной улице", genre: "Драма, Мелодрама", year: 1956, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Летят журавли", genre: "Драма, Военный, Мелодрама", year: 1957, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Баллада о солдате", genre: "Военный, Драма, Мелодрама", year: 1959, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Тихий Дон", genre: "Драма, Мелодрама, Исторический", year: 1957, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Андрей Рублёв", genre: "Драма, Биография, Исторический", year: 1966, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Солярис", genre: "Фантастика, Драма, Детектив", year: 1972, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Экипаж", genre: "Драма, Катастрофа", year: 1979, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Гараж", genre: "Комедия", year: 1979, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Вокзал для двоих", genre: "Драма, Мелодрама, Комедия", year: 1982, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Самая обаятельная и привлекательная", genre: "Комедия, Мелодрама", year: 1985, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Чародеи", genre: "Фантастика, Мюзикл, Комедия", year: 1982, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] }
        ],
        users: [],
        loggedInUser: null
    };

    let sovietMovies = appData.sovietMovies;
    let users = appData.users;
    let loggedInUser = appData.loggedInUser;

     function playSound(sound) {
        sound.currentTime = 0; // Сбрасываем время воспроизведения на начало
        sound.play();
    }

    // Функция для сохранения данных в localStorage
    function updateLocalStorage() {
        appData.sovietMovies = sovietMovies;
        appData.users = users;
        appData.loggedInUser = loggedInUser;
        localStorage.setItem('appData', JSON.stringify(appData));
    }

    let currentMovieIndex = -1;

    function displayMovie(movieIndex) {
        if (movieIndex >= 0 && movieIndex < sovietMovies.length) {
            const movie = sovietMovies[movieIndex];
            movieIdeaParagraph.textContent = `Название: ${movie.title}`;
            movieYearP.textContent = `Год: ${movie.year}`;
            movieGenreP.textContent = `Жанр: ${movie.genre}`;
            likeCountSpan.textContent = movie.likes;
            dislikeCountSpan.textContent = movie.dislikes;
            currentMovieIndex = movieIndex;

            updateLikeDislikeButtons(movieIndex);
            displayComments(movieIndex);
        } else {
            movieIdeaParagraph.textContent = "Фильмы не найдены.";
            movieYearP.textContent = "";
            movieGenreP.textContent = "";
            likeCountSpan.textContent = "0";
            dislikeCountSpan.textContent = "0";
            commentsList.innerHTML = "";
            currentMovieIndex = -1;
        }
    }

    function displayComments(movieIndex) {
        commentsList.innerHTML = "";

        if (movieIndex >= 0 && movieIndex < sovietMovies.length) {
            const movie = sovietMovies[movieIndex];
            movie.comments.forEach(comment => {
                const li = document.createElement("li");
                li.textContent = comment.text + " (" + comment.author + ")";
                commentsList.appendChild(li);
            });
        }
    }

    function updateLikeDislikeButtons(movieIndex) {
        if (movieIndex >= 0 && loggedInUser) {
            const movie = sovietMovies[movieIndex];
            likeButton.disabled = movie.likedBy.includes(loggedInUser.username);
            dislikeButton.disabled = movie.dislikedBy.includes(loggedInUser.username);
        } else {
            likeButton.disabled = false;
            dislikeButton.disabled = false;
        }
    }

    function getRandomMovieIndex() {
        return Math.floor(Math.random() * sovietMovies.length);
    }

    // Функция для анимации случайного выбора фильма
    function animateRandomMovie(duration = 2000) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            movieIdeaParagraph.textContent = sovietMovies[getRandomMovieIndex()].title;
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    generateButton.addEventListener('click', function() {
        playSound(staticSound);
        tvScreen.classList.add('generating'); // Добавляем класс generating

        // Анимация случайного выбора
        animateRandomMovie(1500); // Уменьшаем время анимации для большей динамики

        // Запускаем функцию displayMovie через некоторое время
        setTimeout(() => {
            const randomIndex = getRandomMovieIndex();
            displayMovie(randomIndex);
            tvScreen.classList.remove('generating'); // Убираем класс generating
        }, 2000);
    });

     likeButton.addEventListener('click', function() {
        playSound(clickSound); // Воспроизводим звук клика

        if (currentMovieIndex >= 0 && loggedInUser) {
            const movie = sovietMovies[currentMovieIndex];
            if (!movie.likedBy.includes(loggedInUser.username)) {
                movie.likes++;
                movie.likedBy.push(loggedInUser.username);
                movie.dislikedBy = movie.dislikedBy.filter(user => user !== loggedInUser.username);
                updateLocalStorage();
                updateLikeDislikeButtons(currentMovieIndex);
                likeCountSpan.textContent = movie.likes;
            }
        } else {
            alert("Пожалуйста, войдите в систему, чтобы поставить лайк.");
        }
    });

    dislikeButton.addEventListener('click', function() {
        playSound(clickSound); // Воспроизводим звук клика

         if (currentMovieIndex >= 0 && loggedInUser) {
            const movie = sovietMovies[currentMovieIndex];
            if (!movie.dislikedBy.includes(loggedInUser.username)) {
                movie.dislikes++;
                movie.dislikedBy.push(loggedInUser.username);
                movie.likedBy = movie.likedBy.filter(user => user !== loggedInUser.username);
                updateLocalStorage();
                updateLikeDislikeButtons(currentMovieIndex);
                 dislikeCountSpan.textContent = movie.dislikes;
            }
        } else {
            alert("Пожалуйста, войдите в систему, чтобы поставить дизлайк.");
        }
    });

     addCommentButton.addEventListener('click', function() {
        playSound(clickSound); // Воспроизводим звук клика

        if (currentMovieIndex >= 0 && loggedInUser) {
            const commentTextValue = commentText.value.trim();
            if (commentTextValue !== "") {
                const comment = {text: commentTextValue, author: loggedInUser.username };
                sovietMovies[currentMovieIndex].comments.push(comment);
                updateLocalStorage();
                displayComments(currentMovieIndex);
                commentText.value = "";
            }
        } else {
            alert("Пожалуйста, войдите в систему, чтобы оставить комментарий.");
        }
    });

    searchLink.addEventListener('click', function(event) {
        playSound(clickSound); // Воспроизводим звук клика

        if (currentMovieIndex >= 0) {
            event.preventDefault();
            const movie = sovietMovies[currentMovieIndex];
            searchLink.href = `https://www.google.com/search?q=${encodeURIComponent(movie.title + " фильм")}`;
            window.open(searchLink.href, '_blank');
        }
    });

    registerButton.addEventListener('click', function() {
        playSound(clickSound); // Воспроизводим звук клика

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && password) {
            if (users.some(user => user.username === username)) {
                alert("Пользователь с таким именем уже существует.");
            } else {
                const newUser = { username: username, password: password };
                users.push(newUser);
                updateLocalStorage();
                alert("Регистрация успешна! Теперь вы можете войти.");
            }
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    });

    loginButton.addEventListener('click', function() {
        playSound(clickSound); // Воспроизводим звук клика

        loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    });

    submitLoginButton.addEventListener('click', function() {
        playSound(clickSound); // Воспроизводим звук клика

        const username = usernameInput.value;
        const password = passwordInput.value;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            loggedInUser = user;
            loginForm.style.display = "none";
            loginButton.textContent = `Выйти (${loggedInUser.username})`;
            alert(`Добро пожаловать, ${loggedInUser.username}!`);
            updateLocalStorage();
            updateLikeDislikeButtons(currentMovieIndex);
            displayComments(currentMovieIndex);
        } else {
            alert("Неверный логин или пароль.");
        }
    });

    // Обработчик для выхода
    loginButton.addEventListener('click', function() {
        playSound(clickSound); // Воспроизводим звук клика

        if (loggedInUser) {
            loggedInUser = null;
            updateLocalStorage();
            loginButton.textContent = "Логин";
            alert("Вы вышли из системы.");
            updateLikeDislikeButtons(currentMovieIndex);
        }
    });

    // Инициализация
    if (sovietMovies.length > 0) {
        const randomIndex = getRandomMovieIndex();
        displayMovie(randomIndex);
    }
});