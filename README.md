# Задание 1
## 1. Знакомство с проектом
### 1.1 Структура проекта

[src](frontend/src) содержит несколько папок отвечающие за конкретные цели:

#### Стили организованны в папке [blocks](frontend/src/blocks):

Стили разбиты на дополнительные папки объединяющие их назначение по смыслу и представляющие в конечном этоге
набор стиля для соответствующих целей.

[auth-form](frontend/src/blocks/auth-form) стили формы авторизации, регистрации используются в компонентах 
[Login.js](frontend/src/components/Login.js), 
[Register.js](frontend/src/components/Register.js)

[card](frontend/src/blocks/card) стили карточки изображения в списке изображений, используется в компоненте
[Card.js](frontend/src/components/Card.js)

[content](frontend/src/blocks/content) стили для отображения контента компонента 
[Main.js](frontend/src/components/Main.js)

[footer](frontend/src/blocks/footer) стили для отображения футера компонента 
[Footer.js](frontend/src/components/Footer.js)

[header](frontend/src/blocks/header) стили для отображения хедера компонента 
[Header.js](frontend/src/components/Header.js)

[login](frontend/src/blocks/login) стили для отображения входа компонента [Login.js](frontend/src/components/Login.js), однако сам файл 
[login.css](frontend/src/blocks/login/login.css) почему-то пустой, но его импорт используется.

[page](frontend/src/blocks/page) стили пагинации компонентов [Main.js](frontend/src/components/Main.js), 
[Footer.js](frontend/src/components/Footer.js),
[Header.js](frontend/src/components/Header.js)

[places](frontend/src/blocks/places) стили мест компонентов 
[Main.js](frontend/src/components/Main.js),
[Card.js](frontend/src/components/Card.js)

[popup](frontend/src/blocks/popup): стили всплывающих элементов используются в компонентах
[ImagePopup.js](frontend/src/components/ImagePopup.js),
[PopupWithForm.js](frontend/src/components/PopupWithForm.js),
[InfoTooltip.js](frontend/src/components/InfoTooltip.js),
[AddPlacePopup.js](frontend/src/components/AddPlacePopup.js),
[EditAvatarPopup.js](frontend/src/components/EditAvatarPopup.js),
[EditProfilePopup.js](frontend/src/components/EditProfilePopup.js)

[profile](frontend/src/blocks/profile) стили профиля используются в компоненте [Main.js](frontend/src/components/Main.js)

#### Компоненты организованны в папке [components](frontend/src/components):

[App.js](frontend/src/components/App.js) основной компонент приложения,
использует несколько компонентов:

[Header.js](frontend/src/components/Header.js) верхний колонтитул главной страницы, 
в основном взаимодействует с регистрацией/авторизацией/выходом профиля пользователя.
Отображает email и основной заголовок сайта. Используется как для зарегистрированных, так и для
незарегистрированных пользователей

[Main.js](frontend/src/components/Main.js) основная часть страницы, отображающая контент.
В основном это только 2 блока управление профилем текущего пользователя и управление списком мест.
Блок актуален только для зарегистрированных пользователей.

[Footer.js](frontend/src/components/Footer.js) нижний колонтитул страницы, не несет какой-либо логики,
актуален для всех пользователей, отображает информацию о годе ресурса.

Про компонент [App.js](frontend/src/components/App.js) следует отметить, что он использует так же несколько 
api сервера. При монтировании компонента выполняются 2 функции из папки 
[utils](frontend/src/utils)

**getAppInfo()** из [api.js](frontend/src/utils/api.js), которая получает информацию о карточках мест из сервера
и информацию о пользователе.

**checkToken()** из [auth.js](frontend/src/utils/auth.js) проверяет пользователя по jwt из сохранённого в браузере
если jwt валиден то заполняет email и идентифицирует пользователя как вошедшего,
если нет то чистит jwt из localstorage.

Следует отметить так же использование [CurrentUserContext.js](frontend/src/contexts/CurrentUserContext.js)
это глобальный контекст в рамках которого может работать компонент, используется в совокупности с
**<CurrentUserContext.Provider value={currentUser}>**

В целом при инициализации компонента, происходят запросы к api получить текущего пользователя, и список карточек.
По умолчанию пользователь не определен, в зависимости от состояния, происходит переключение
между регистрацией/авторизацией и управлением контентом мест, далее происходит подключение уже основного компонента
с использованием контекста **CurrentUserContext** что позволяет глобально управлять состоянием сразу между несколькими компонентами.

Из [App.js](frontend/src/components/App.js) происходит старт компонента [Main.js](frontend/src/components/Main.js)
к которому передаются состояния компонентов отвечающие за редактирование в виде всплывающих окон,
переменные типа
_isEditProfilePopupOpen_,
_isAddPlacePopupOpen_,
_isEditAvatarPopupOpen_,
_isInfoToolTipOpen_,
_setSelectedCard_.
При старте основного компонента они инициализируются дефолтные значения.
Затем при нажатии происходит инициализация компонента в контексте пользователя,
какое-то действие, затем закрытие, которое снова возвращает все переменные в дефолтное состояние
через вызов **closeAllPopups()**.
Компоненты, которые вызываются при определенных действиях:

[EditAvatarPopup.js](frontend/src/components/EditAvatarPopup.js) - используется для редактирования аватара профиля.
[EditProfilePopup.js](frontend/src/components/EditProfilePopup.js) - используется для редактирования профиля пользователя.
[AddPlacePopup.js](frontend/src/components/AddPlacePopup.js) - используется для добавления нового места.
[PopupWithForm.js](frontend/src/components/PopupWithForm.js) - общая форма сохранения изменений.
[ImagePopup.js](frontend/src/components/ImagePopup.js) - используется для просмотра изображения.
[InfoTooltip.js](frontend/src/components/InfoTooltip.js) - используется отображения статуса регистрации пользователя.

Компонент [Main.js](frontend/src/components/Main.js) использует компонент
[Card.js](frontend/src/components/Card.js) для управления списком карточек пользователей.

В компоненте [Card.js](frontend/src/components/Card.js) пробрасываются действия из [App.js](frontend/src/components/App.js)
через [Main.js](frontend/src/components/Main.js)
на действия удаление(api.removeCard(cardID)), лайк(api.changeLikeCardStatus(cardID, like)) и нажатие на изображение([ImagePopup.js](frontend/src/components/ImagePopup.js)).

#### Маршрутизация проекта имеет следующую структуру
Маршруты заданы в двух вариантах:
1. Обычная маршрутизация происходит когда пользователь не авторизован, или loggedIn = false,
возможные маршруты: 

    /signup - подключение компонента [Register.js](frontend/src/components/Register.js) регистрация нового пользователя.

    /signin - подключение компонента [Login.js](frontend/src/components/Login.js) вход зарегистрированного пользователя.

   В [Header.js](frontend/src/components/Header.js) так же происходит маршрутизация, помимо первых уже перечисленных
   /signup, /signin добавляется путь / который отождествляет выход пользователя.
2. Защищенные пути, доступные после регистрации [ProtectedRoute.js](frontend/src/components/ProtectedRoute.js),
подключение [Main.js](frontend/src/components/Main.js) и прочих обработчиков, loggedIn = false то вернет в пункт 1.

#### Зависимости проекта
Модули для тестирования:

    "@testing-library/jest-dom": "^5.11.4"
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",

Версии react и работы с DOM:

    "react": "^17.0.2",
    "react-dom": "^17.0.2",

Версия библиотеки маршрутизации между страницами без перезагрузки страницы:

    "react-router-dom": "^5.2.0",

Сборщик:

    "react-scripts": "4.0.3",

Метрики:

    "web-vitals": "^1.0.1"

Нет библиотек, для управления состоянием.

#### Для взаимодействия с backend используется 2 инструмента [utils](frontend/src/utils)
[api.js](frontend/src/utils/api.js) используется для:
1. Получения списка карточек
2. Добавления карточки
3. Удаления карточки
4. Изменения состояния лайка карточки.
5. Получения информации пользователя
6. Установки информации пользователя
7. Установки аватара пользователя

[auth.js](frontend/src/utils/auth.js) используется для:
1. Регистрации пользователя
2. Входа пользователя
3. Проверки токена пользователя.

## 2. Проектирование
### Уровень 1
Нужно обосновать выбор технологии Single SPA или Module federation, для этого потребовалось изучить предметную область.

Начнем с module federation:
   Технология деления на модули(микрофронетенды), когда создаётся основное приложение, 
например хост, а к нему уже подключаются другие модули отвечающие, 
за свою логику(header, auth, places для примера) с использованием lazy load.
Такой подход позволяет решать сразу несколько проблем:
1. Создавать независимые приложения которые делятся своими ресурсами(remotes/exposes)
2. Делится зависимостями, ресурсами чтобы не загружать лишний код на клиента.
3. Управлять отдельно приложениями host/remotes(имею ввиду независимый деплой)
4. Уменьшает начальное количество кода передаваемого клиенту за счет использования lazy load, однако код все так же мое
   однако код все так же может перегружать клиента.

К недостаткам можно отнести:
1. Не умеет работать с разными фреймворками.
2. Необходимо настроить роуты для взаимодействия с микрофронтендами.
   Module federation изначально разрабатывался для сборщика webpack,
но в данный момент имеет поддержку сборщиков, vite/rspack.
   
Теперь о Single SPA:
   Технология для деления на микрофронтенды, с использованием общей оболочки для вызова
микрофронтендов. В такой концепции можно использовать различные фреймворки, Vue, React, Angular
в одном приложении, их подключение отдельных микрофронтендов происходит за счёт монтирования 
и демонтирования приложений динамически. Монтаж/демонтаж происходит для определенных роутов.
Другими словами Single SPA это оркестратор над фреймворками.
Такой подход позволяет решить следующие проблемы:
1. Поддержка нескольких фреймворков.
2. Создавать независимые приложения на любом стеке (Vue, React, Angular). 
3. Управлять приложениями независимо(опять-таки деплой).
4. lazy loading загружать, только то что требуется.

К недостаткам можно отнести:
1. Загрузка множества фронтендов на различных фреймворка увеличивает количество загружаемого кода.
2. Не может делиться зависимостями между приложениями, что тоже может приводить к передаче большого количества кода на клиента.

Следует отметить что эти технологии могут использоваться вместе:
Single SPA используется как оркестратор для приложений на различных фреймворках, в то время
для управления компонентами и уменьшения зависимостей может использоваться
Module Federation уже внутри фреймворка одного фреймворка.

   Касательно текущего проекта, я остановился бы на module federation,
поскольку мне не требуется использовать оркестрацию между различными фреймворками,
приложение достаточно простое, над ним работаю только я, фреймворк я буду использовать один React.
   Разбивка текущего проекта на микрофронтенды возможна делением на модули, 
   и настройки взаимодействия между host и remotes внутри module-federation, например:
- модуль авторизации/регистрации(remotes)
- модуль управления профилем(remotes)
- модуль управления местами(remotes)
- модуль управления контекстом и общими формами(remotes)
- основное приложение(host)

С таким подходом, я могу разбить проект на 5 микрофронтенда и запускать и управлять ими отдельно.
Необходимость загрузки компонентов настрою с помощью lazy load. Зависимости будут общие не будет 
оверхэда(как это могло бы быть при Single SPA) передаваемых данных на клиента. 

### Уровень 2

Я разделил фронтенд на модули отвечающие за свои функции:

[auth](frontend/microfrontend/auth) модуль авторизации, включает в себя стили
работы с Авторизацей/Регистрацией, компоненты:
[Login.js](frontend/microfrontend/auth/src/components/Login.js) и [Register.js](frontend/microfrontend/auth/src/components/Register.js)
так же в этот компонент забрал [Header.js](frontend/microfrontend/auth/src/components/Header.js)
поскольку он как раз и взаимодействует с маршрутами регистрации и авторизации, и вообще проверки состояния авторизации. А так же делает выход.
В этих же компонентах окно оповещения об ошибках и успехах регистрации/авторизации [InfoTooltip.js](frontend/microfrontend/auth/src/components/InfoTooltip.js)
В этом модуле используется api для взаимодействия с бэкендом, касающееся авторизации 
это функции регистрация, авторизация, валидация.

[host](frontend/microfrontend/host) модуль работы с карточками включает в себя все взаимодействие с карточками.
Загрузка списка, просмотр отдельной картинки, установка/снятие лайка, удаление и добавление.
Включает в себя стили работы с местами и компоненты:
[AddPlacePopup.js](frontend/microfrontend/places/src/components/AddPlacePopup.js) окно добавления нового места.
[Card.js](frontend/microfrontend/places/src/components/Card.js) Работа с карточкой удление лайк просмотр.
[ImagePopup.js](frontend/microfrontend/places/src/components/ImagePopup.js) Окно в котором открывается просмотр.
[Places.js](frontend/microfrontend/places/src/components/Places.js) список всех мест.
[api.js](frontend/microfrontend/places/src/utils/api.js) взаимодействие бэкендом, все что касается работы с карточками:
загрузка списка, лак, добавление, удаление, просмотр.

[profile](frontend/microfrontend/profile) модуль работы с профилем пользователя,
обеспечивает просмотр профиля авторизованного пользователя, изменение аватара и информации о себе.
включает в себя стили и компоненты:
[ProfileInfo.js](frontend/microfrontend/profile/src/components/ProfileInfo.js) просмотр профиля.
[EditProfilePopup.js](frontend/microfrontend/profile/src/components/EditProfilePopup.js) изменение профиля.
[EditAvatarPopup.js](frontend/microfrontend/profile/src/components/EditAvatarPopup.js) изменение аватара.
[api.js](frontend/microfrontend/profile/src/utils/api.js) взаимодействие бэкендом, все что касается работы с профилем:
получение тек информации о пользователе, изменение аватара и текста профиля.

[host](frontend/microfrontend/host) основное приложение к которому подключаются все перечисленные модули.
По факту в этом модуле все что осталось это стили компоненты:
[Footer.js](frontend/microfrontend/host/src/components/Footer.js) нижний колонтитул.
[Main.js](frontend/microfrontend/host/src/components/Main.js) этот раздел разделился на 2 модуля на
[Places.js](frontend/microfrontend/places/src/components/Places.js) и на [ProfileInfo.js](frontend/microfrontend/profile/src/components/ProfileInfo.js)
[ProtectedRoute.js](frontend/microfrontend/host/src/components/ProtectedRoute.js) работа с маршрутами, в том числе защищенными и нет.
В целом маршруты разбивают приложение на пути, либо в [Header.js](frontend/microfrontend/auth/src/components/Header.js)
либо в [Header.js](frontend/microfrontend/auth/src/components/Header.js) и в [Main.js](frontend/microfrontend/host/src/components/Main.js).

Следует отметить еще один служебный компонент:
[context](frontend/microfrontend/context) в нем происходит управление состоянием 
[CurrentUserContext.js](frontend/microfrontend/context/src/contexts/CurrentUserContext.js) и компонент общей формы
[PopupWithForm.js](frontend/microfrontend/context/src/components/PopupWithForm.js)

Логически, я конечно вынес это в отдельный компонент, но следует отметить, в этом случае, это зависимость,
каждого модуля от этого компонента, и с ним что-то пойдёт не так, откажет работа состояний всей системы,
возможно этот компонент, не нужно было выносить и оставить всю логику в [host](frontend/microfrontend/host)
Но мне показалось что это концептуально, не верно, и логику работы с состоянием нужно вынести.
Следует отметить, что в целом возможно, есть реализация передачи большого количества параметров и хуков,
чтобы обойтись без общих состояний между модулями, так же отмечу что возможно было использовать какие-либо 
библиотеки состояния для управления, взаимодействием между модулями. Выбрал такой путь потому что нет опыта на фронте,
но кажется правильным использовать библиотеки состояний.

[CurrentUserContext.js](frontend/microfrontend/context/src/contexts/CurrentUserContext.js) вынос общего компонента в отдельный
фронтенд тоже еще одна точка отказа, возможно имело место быть добавить эту форму в каждом проекте, однако я решил,
что в любой момент во фронтендах можно отказаться от загрузки этой формы и перейти на свою.

Таким образом фронтенд разбился на 5 маленьких:
1. основной [host](frontend/microfrontend/host)
2. служебный [context](frontend/microfrontend/context)
3. работа с авторизацией [auth](frontend/microfrontend/auth) по соображениям безопасности следует от профиля.
4. работа с местами [places](frontend/microfrontend/places)
5. работа с профилем [profile](frontend/microfrontend/profile)

### Уровень 3
Запуск, нужно скачать папку [microfrontend](frontend/microfrontend) из удаленного репозитория, либо
выкачать весь репозиторий и перейти в папку [microfrontend](frontend/microfrontend).

Далее запустить поочереди микрофронтенды:

Общий смысл такой сначала запустить [context](frontend/microfrontend/context)
затем в любой последовательности 

[auth](frontend/microfrontend/auth)

[places](frontend/microfrontend/places)

[profile](frontend/microfrontend/profile)

В конце запустить основное приложение [host](frontend/microfrontend/host)

Запустить ```docker-compose up --build -d``` из корня проекта [microfrontend](frontend/microfrontend)

или же руками

Пример:

1. ```cd context``` 

   ```npm install```

   ```npm start```

2. ```cd auth```

   ```npm install```

   ```npm start```

3. ```cd profile```

   ```npm install```

   ```npm start```

4. ```cd places```

   ```npm install```

   ```npm start```

5. ```cd host```

   ```npm install```

   ```npm start```

PS: Никогда в жизни не работал с фронтендом. 
Потратил очень много времени на запуск, основные мысли описал, код работает, времени переписать все заново нет, не судите строго;)