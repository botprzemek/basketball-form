export default {
    nuxtSiteConfig: {
        name: "3X3 Knury Knurów",
        description:
            "Już 1 czerwca organizujemy dla was kolejną edycję Knurowskiego Streetballa! Jak co roku zobaczymy się na kompleksie sportowym ORLIK ul. Ułanów 8 w Knurowie. Aby zapisać swoją drużynę na turniej koszykówki ulicznej Knurowski Streetball 2025 kapitan musi wypełnienić poniższy formularz.",
    },
    components: {
        button: {
            start: "Rozpocznij",
            next: "Dalej",
            previous: "Cofnij",
            submit: "Zatwierdź",
            back: "Strona główna",
        },
        input: {
            fill: "Uzupełnij",
            add: "Dodaj",
            submit: "Zatwierdzając akceptujesz {regulations}",
            team: {
                name: "Nazwa drużyny",
                email: "Adres e-mail",
                phone: "Numer telefonu",
            },
            player: {
                label: "Dane zawodnika",
                first_name: "Imię",
                last_name: "Nazwisko",
                age: "Wiek",
            },
        },
        icon: {
            logo: {
                title: "Knury Knurów",
                description: "Logo drużyny koszykarskiej Knury Knurów",
            },
        },
        select: {
            category: {
                "0": "Kategoria rozgrywek",
                "1": "Amatorska",
                "2": "Profesjonalna",
            },
        },
    },
    pages: {
        "404": {
            title: "Wystąpił błąd! (404)",
            description:
                "Strona, którą próbujesz otworzyć nie istnieje, sprawdź dokładnie adres WWW! Jeśli myślisz, że to błąd aplikacji, skontakuj się z nami na {messenger} lub {instagram}",
        },
        "500": {
            title: "Wystąpił błąd! (500)",
            description:
                "Serwer strony WWW nie odpowiada, spróbuj ponownie za chwilę! Jeśli myślisz, że to błąd aplikacji, skontakuj się z nami na {messenger} lub {instagram}",
        },
        regulations: {
            title: "Regulamin",
            description: "Regulamin turnieju.",
        },
        index: {
            title: "Rejestracja",
            description:
                "Już 1 Czerwca organizujemy dla was kolejną edycję Knurowskiego Streetballa! Jak co roku zobaczymy się na kompleksie sportowym ORLIK ul. Ułanów 8 w Knurowie. Aby zapisać swoją drużynę na turniej koszykówki ulicznej Knurowski Streetball 2025 kapitan musi wypełnienić poniższy formularz.",
            content: {
                start: {
                    title: "Rejestracja 3X3",
                    description:
                        "Aby zapisać swoją drużynę na turniej koszykówki ulicznej 3X3 Knurowski Streetball 2025 kapitan zespołu musi zaakceptować {regulations} oraz wypełnienić poniższy formularz! Więcej szczegółów o imprezie znajdziecie {about}",
                    regulations: "regulamin uczestnictwa",
                    about: "tutaj.",
                },
                team: {
                    title: "Dane drużyny",
                    description:
                        "Zgodnie z regulaminem tegoroczny turniej podzielony będzie na kategorie Pro i Amator, bez względu na podział wiekowy.{br} Kategoria {pro} - mogą zapisać się wszyscy chętni gracze (z naciskiem na świadomość wyboru), natomiast {amateur} pozwala na grę dla świeżych zespołów z osób grających rekreacyjnie lub aktywnych maksymalnie (niezrzeszonych w PZKosz).",
                },
                players: {
                    title: "Dane zawodników",
                    bench: "(Rezerwa)",
                },
                summary: {
                    title: "Podsumowanie",
                    description:
                        "Sprawdź poprawność podanych danych przed wysłaniem formularza, pamiętaj o zapoznaniu się z regulaminem! Potwierdzenie o akceptacji do turnieju wysyłane będzie na podany adres e-mail do kilku dni roboczych po zatwierdzeniu przez organizatorów. Jeśli napotkałeś problem skontakuj się z nami na {messenger} lub {instagram}",
                    messenger: "Messengerze",
                    instagram: "Instagramie!",
                    bench: "Brak rezerwowego",
                    subtitle: {
                        team: "Drużyna",
                        players: "Zawodnicy",
                    },
                    team: {
                        title: "Dane drużyny",
                    },
                    players: {
                        title: "Dane zawodników",
                    },
                },
                sent: {
                    title: "Zgłoszenie wysłane!",
                    description:
                        "Wygląda na to, że poprawnie wypełniliście formularz swojej drużyny, wkrótce poinformujemy o potwierdzeniu danych {additional_info}, widzimy się na turnieju już 1 czerwca! Więcej szczegółów o imprezie znajdziecie {about}",
                    additional_info:
                        "(UWAGA! Nie oznacza to zapewnionego miejsca na turnieju, sprawdźcie również SPAM poczty)",
                },
            },
        },
        admin: {
            title: "Lista drużyn",
            description:
                "Pozwala na zarządzanie zapisanymi drużynami, dodawanie zatwierdzień lub usuwanie.",
            content: {},
        },
        about: {
            title: "O turnieju",
            description:
                "O {hour} zapraszamy wszystkich miłośników koszykówki ulicznej na wyjątkowe sportowe wydarzenie – {event} w formacie FIBA 3X3 organizowanym na odnowionym  kompleksie sportowym {address} w Knurowie.",
            content: {
                hour: "9:00",
                eventname: "Knurowski Streetball 2025",
                address: "ORLIK, ul. Ułanów 8",
                p1: {
                    titlefull: "Faza zasadnicza (mecze w grupach)",
                    content:
                        "Około {hour} ruszy faza zasadnicza turnieju, zespoły zostaną przydzielone losowo do grup, z których wychodzą dwie zwycięskie.",
                    hour: "9:30",
                    title: "Faza zasadnicza",
                    descshort: "Losowe grupy, wychodzą dwie drużyny",
                },

                p2: {
                    title: "Przewidziane atrakcje",
                    hour: "13:00",
                    list: {
                        item1: {
                            label: "Dunk Contest",
                            description:
                                "{label} pokaz wsadów do kosza, który rozgrzeje publiczność!",
                        },
                        item2: {
                            label: "Konkurs rzutów za 3 punkty",
                            description:
                                "{label} prawdzenie celności i precyzji najlepszych strzelców",
                        },
                        item3: {
                            label: "Występ taneczny grupy EXTERIA",
                            description:
                                "{label} energiczny pokaz w wykonaniu lokalnej grupy tanecznej",
                        },
                    },
                    descshort: "Dunk Contest, 3 Point Contest, Grupa EXTERIA",
                },

                p3: {
                    title: "Zbiórka charytatywna",
                    content:
                        "Podczas wydarzenia prowadzona będzie zbiórka na rzecz podopiecznego {organization}. Zachęcamy wszystkich uczestników do wsparcia tej inicjatywy – każda złotówka ma znaczenie.",
                    organization: "Stowarzyszenia Cała Naprzód",
                    hour: "Całość",
                    descshort: "Zbiórka na rzecz podopiecznego Całej Naprzód",
                },
                p4: {
                    title: "Strefa gastronomiczna",
                    hour: "Całość",
                    descshort: "Za dowolną dopłatą zjedz coś pysznego!",
                    beforeList:
                        "Na terenie wydarzenia będzie funkcjonować {zone}, w której w zamian za {donation} będzie można otrzymać:",
                    zone: "strefa gastronomiczna",
                    donation: "dobrowolną wpłatę",
                    list: {
                        item1: "dania z grilla",
                        item2: "świeżo parzoną kawę i herbatę",
                        item3: "orzeźwiającą lemoniadę",
                        item4: "domowe ciasta",
                    },
                    afterList:
                        "Całkowity dochód ze zbiórki zasili {goal} – wsparcie podopiecznego Stowarzyszenia Cała Naprzód.",
                    goal: "cel charytatywny",
                },
                p5: {
                    title: "Strefa dla dzieci",
                    content:
                        "Dla najmłodszych przygotowaliśmy specjalną {zone}, gdzie pod okiem animatora najmłodsi uczestnicy będą mogli aktywnie i bezpiecznie spędzić czas.",
                    zone: "strefę dziecięcą",
                    hour: "całość",
                    descshort: "Strefa dla najmłodszych z animatorami",
                },
                p6: {
                    title: "Bezpieczeństwo",
                    content:
                        "Nad bezpieczeństwem wszystkich obecnych będzie czuwać {group}, zapewniająca pełną opiekę medyczną podczas całego wydarzenia.",
                    group: "Grupa Ratownicza SAFETY Gliwice",
                    hour: "całość",
                    descshort: "Grupa Ratowniczna SAFETY Gliwice",
                },
                p7: {
                    title: "Nagrody",
                    content:
                        "Dla zwycięzców turnieju przewidziane są {prizes}.",
                    prizes: "nagrody",
                    hour: "16:00",
                    descshort: "Nagrody dla zwycięzców turnieju!",
                },
                p8: {
                    title: "Informacje dodatkowe",
                    content:
                        "Każdy zawodnik otrzyma {water}, aby zadbać o odpowiednie nawodnienie w trakcie rozgrywek.",
                    water: "wodę mineralną",
                    hour: "całość",
                    descshort: "Woda dla uczestników oraz fotografowie",
                },
                p9: {
                    content:
                        "Całe wydarzenie będzie {photo}, aby każdy mógł odnaleźć swoje sportowe chwile.",
                    photo: "profesjonalnie dokumentowane przez fotografów",
                },
                p10: {
                    title: "Zakończenie",
                    content:
                        "Zakończenie wydarzenia przewidziane jest na godzinę {hour}.",
                    hour: "około 17:00",
                    descshort: "Zakończenie całego wydarzenia",
                },
                p11: {
                    content:
                        "{eventname} to nie tylko sportowa rywalizacja, ale także dzień pełen dobrej zabawy, pozytywnych emocji i integracji społeczności lokalnej. Zapraszamy wszystkich – zawodników, kibiców, rodziny i przyjaciół – do wspólnego świętowania pasji do koszykówki.",
                    eventname: "Knurowski Streetball",
                },
            },
        },
    },
    requirements: {
        field: "Pole jest wymagane.",
        email: "Podaj poprawny adres e-mail.",
        phone: "Podaj poprawny numer telefonu (min. 9 cyfr).",
        age: "Wiek musi być liczbą od 10 do 99.",
        regulations: "Musisz zaakceptować regulamin, aby kontynuować.",
        category: "Wybierz kategorię.",
    },
} satisfies Locale;
