const questions = [
    {
        question: "Qui est l'auteur de la saga 'Harry Potter' ?",
        choix: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin"],
        correct: "J.K. Rowling"
    },
    {
        question: "Quel film a remporté l'Oscar du meilleur film en 1994 ?",
        choix: ["Forrest Gump", "Titanic", "The Shawshank Redemption"],
        correct: "Forrest Gump"
    },
    {
        question: "Quel super-héros est surnommé 'L'homme d'acier' ?",
        choix: ["Iron Man", "Superman", "Thor"],
        correct: "Superman"
    },
    {
        question: "Quel est le nom du robot dans 'Star Wars' qui parle en binaire ?",
        choix: ["C-3PO", "R2-D2", "BB-8"],
        correct: "R2-D2"
    },
    {
        question: "Dans quelle ville se déroule l'univers de 'Stranger Things' ?",
        choix: ["Hawkins", "Springfield", "Sunnydale"],
        correct: "Hawkins"
    },
    {
        question: "Quel acteur incarne 'Jack Sparrow' dans 'Pirates of the Caribbean' ?",
        choix: ["Johnny Depp", "Orlando Bloom", "Brad Pitt"],
        correct: "Johnny Depp"
    },
    {
        question: "Quel est le titre de la chanson phare de la série 'Friends' ?",
        choix: ["I'll Be There for You", "With a Little Help from My Friends", "Don't Stop Believin'"],
        correct: "I'll Be There for You"
    },
    {
        question: "Quel personnage principal de Marvel porte un gant avec des pierres infinies ?",
        choix: ["Iron Man", "Thanos", "Loki"],
        correct: "Thanos"
    },
    {
        question: "Qui a joué le rôle de 'Sherlock Holmes' dans le film de 2009 ?",
        choix: ["Robert Downey Jr.", "Benedict Cumberbatch", "Matt Damon"],
        correct: "Robert Downey Jr."
    },
    {
        question: "Quel groupe a chanté 'Bohemian Rhapsody' ?",
        choix: ["The Beatles", "Led Zeppelin", "Queen"],
        correct: "Queen"
    },
];

//toutes les variables (constantes et modifiables)
const questionElement = document.querySelector('.question');
const choixContainer = document.querySelector('.choix');
const boutonSuivant = document.getElementById('bouton-suivant');
const resultatElement = document.getElementById('resultat');
const compteurQuestionElement = document.getElementById('compteur-question');

let questionActuelle = 0;
let score = 0;

// c'est la fonction qui permet d'afficher les questions
// Cette fonction affiche le nombre de questions avec celle actuelle et les réponses possibles
function afficherQuestion() {
    let questionCourante = questions[questionActuelle];

    questionElement.textContent = questionCourante.question;
    compteurQuestionElement.textContent = `Question ${questionActuelle + 1} / ${questions.length}`;

    choixContainer.innerHTML = "";
    questionCourante.choix.forEach(choix => {
        let bouton = document.createElement("button");
        bouton.textContent = choix;
        bouton.addEventListener("click", () => selectionnerReponse(choix, bouton));
        choixContainer.appendChild(bouton);
    });
}

// c'est la fonction qui permet de choisir une des réponses proposée, si la réponse
// est bonne le bouton devient vert et à l'inverse il devient rouge (il affiche aussi
// le bouton "bouton suivant" après avoir choisi une réponse)
function selectionnerReponse(choix, bouton) {
    let reponseCorrecte = questions[questionActuelle].correct;

    if (choix === reponseCorrecte) {
        bouton.style.backgroundColor = "green";
        score++;
    } else {
        bouton.style.backgroundColor = "red";
    }

    document.querySelectorAll('.choix button').forEach(btn => btn.disabled = true);
    boutonSuivant.style.display = "block";
}

// c'est l'événement qui définie la fin du jeu, s'il reste des questions,
// il fais disparaitre le bouton "question suivante" le temps de répondre et
// rajoute 1 à questionActuelle. À l'inverse il affiche les résultats
boutonSuivant.addEventListener("click", () => {
    questionActuelle++;
    if (questionActuelle < questions.length) {
        afficherQuestion();
        boutonSuivant.style.display = "none";
    } else {
        afficherResultat();
    }
});

// c'est la fonction qui permet d'attribuer un commentaire au score
// ici on voit toutes les possibilités de score avec leur commentaire
// on utilise les conditions
function obtenirCommentaire(score) {
    if (score === 0) return "Tu vis dans une grotte ?";
    if (score >= 2 && score <= 4) return "Un score vraiment proutesque...";
    if (score === 5) return "Tu peux mieux faire quand même !";
    if (score >= 6 && score <= 7) return "C'est pas mal, mais j'ai vu mieux.";
    if (score >= 8 && score <= 9) return "On y est presque mon gros !";
    if (score === 10) return "Le GOAT ! 🐐🔥";
    return "";
}

// c'est la fonction qui permet d'afficher le résultat du quizz
// on "return" tout les éléments de fin de quizz (score, commentaire ...)
function afficherResultat() {
    questionElement.textContent = "Quiz terminé !";
    choixContainer.innerHTML = "";
    boutonSuivant.style.display = "none";

    let commentaire = obtenirCommentaire(score);
    resultatElement.textContent = `Votre score : ${score} / ${questions.length}  ${commentaire}`;
}

afficherQuestion();