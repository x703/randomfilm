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
    const adminPanel = document.getElementById('admin-panel');
    const addTitleInput = document.getElementById('add-title');
    const addGenreInput = document.getElementById('add-genre');
    const addYearInput = document.getElementById('add-year');
    const addMovieButton = document.getElementById('add-movie-button');

    // Загружаем данные из localStorage
    let appData = JSON.parse(localStorage.getItem('appData')) || {
        sovietMovies: [
            { title: "Холоп 2", genre: "Комедия, Семейный", year: 2024, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Мастер и Маргарита", genre: "Фэнтези, Драма, Мелодрама", year: 2024, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] },
            { title: "Лед 3", genre: "Мелодрама, Спорт", year: 2024, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] }
        ],
        users: [],
        loggedInUser: null,
        isAdmin: false // Добавляем флаг для проверки администратора
    };

    let sovietMovies = appData.sovietMovies;
    let users = appData.users;
    let loggedInUser = appData.loggedInUser;
    let isAdmin = appData.isAdmin;

    // Функция для сохранения данных в localStorage
    function updateLocalStorage() {
        appData.sovietMovies = sovietMovies;
        appData.users = users;
        appData.loggedInUser = loggedInUser;
        appData.isAdmin = isAdmin; // Сохраняем статус администратора
        localStorage.setItem('appData', JSON.stringify(appData));
    }

    function playSound(sound) {
        sound.currentTime = 0;
        sound.play();
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
            commentsList.innerHTML = "";
            currentMovieIndex = -1;
        }
    }

    function displayComments(movieIndex) {
        commentsList.innerHTML = "";

        if (movieIndex >= 0 && movieIndex < sovietMovies.length) {
            const movie = sovietMovies[movieIndex];
            movie.comments.forEach((comment, index) => { // Передаем index
                const li = document.createElement("li");
                li.textContent = comment.text + " (" + comment.author + ")";
                if (isAdmin) {
                    const deleteButton = document.createElement("button");
                    deleteButton.classList.add("delete-comment");
                    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Иконка Font Awesome
                    deleteButton.addEventListener("click", function() {
                        // Удаляем комментарий
                        sovietMovies[movieIndex].comments.splice(index, 1);
                        updateLocalStorage();
                        displayComments(movieIndex);
                    });
                    li.appendChild(deleteButton);
                }
                commentsList.appendChild(li);
            });
        }
    }

    function updateLikeDislikeButtons(movieIndex) {
        if (loggedInUser && movieIndex >= 0) {
            const movie = sovietMovies[movieIndex];
            likeButton.disabled = movie.likedBy.includes(loggedInUser.username);
            dislikeButton.disabled = movie.dislikedBy.includes(loggedInUser.username);
        } else {
            likeButton.disabled = true;
            dislikeButton.disabled = true;
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
        tvScreen.classList.add('generating');

        // Анимация случайного выбора
        animateRandomMovie(1500);

        setTimeout(() => {
            const randomIndex = getRandomMovieIndex();
            displayMovie(randomIndex);
            tvScreen.classList.remove('generating');
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

        if (username === "admin" && password === "admin123") {
            isAdmin = true;
            loggedInUser = { username: "admin" };
            adminPanel.style.display = "block";
            updateLocalStorage();
            loginForm.style.display = "none";
            loginButton.textContent = `Выйти (${loggedInUser.username})`;
            alert("Вы вошли как администратор!");
        }
        else {
            const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            loggedInUser = user;
            loginForm.style.display = "none";
            loginButton.textContent = `Выйти (${loggedInUser.username})`;
            alert(`Добро пожаловать, ${loggedInUser.username}!`);
            updateLocalStorage();
            updateLikeDislikeButtons(currentMovieIndex);
        } else {
            alert("Неверный логин или пароль.");
        }
        }

        displayComments(currentMovieIndex);
    });

    // Обработчик для выхода
    loginButton.addEventListener('click', function() {
        playSound(clickSound); // Воспроизводим звук клика

        if (loggedInUser) {
            loggedInUser = null;
            isAdmin = false; // Выходим из режима администратора
            adminPanel.style.display = "none"; // Скрываем панель администратора
            updateLocalStorage();
            loginButton.textContent = "Логин";
            alert("Вы вышли из системы.");
            updateLikeDislikeButtons(currentMovieIndex);
        } else {
            loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
        }
         displayComments(currentMovieIndex);
    });

     // Добавление фильма (только для администратора)
    addMovieButton.addEventListener('click', function() {
        if (isAdmin) {
            const title = addTitleInput.value.trim();
            const genre = addGenreInput.value.trim();
            const year = parseInt(addYearInput.value);

            if (title && genre && year) {
                const newMovie = { title: title, genre: genre, year: year, likes: 0, dislikes: 0, comments: [], likedBy: [], dislikedBy: [] };
                sovietMovies.push(newMovie);
                updateLocalStorage();
                addTitleInput.value = "";
                addGenreInput.value = "";
                addYearInput.value = "";
                alert("Фильм добавлен!");
            } else {
                alert("Пожалуйста, заполните все поля.");
            }
        } else {
            alert("У вас нет прав на добавление фильмов.");
        }
    });

    // Инициализация
    if (sovietMovies.length > 0) {
        const randomIndex = getRandomMovieIndex();
        displayMovie(randomIndex);
    }

    //Проверка админа
     if (isAdmin) {
            adminPanel.style.display = "block";
            loginButton.textContent = `Выйти (${loggedInUser.username})`;
        }
});
