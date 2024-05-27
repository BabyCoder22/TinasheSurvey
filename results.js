document.addEventListener('DOMContentLoaded', function () {
    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    if (surveys.length === 0) {
        document.getElementById('no-data').style.display = 'block';
        return;
    }

    document.getElementById('no-data').style.display = 'none';

    const totalSurveys = surveys.length;
    const ages = surveys.map(survey => survey.age);
    const averageAge = (ages.reduce((a, b) => a + b, 0) / totalSurveys).toFixed(1);
    const oldestAge = Math.max(...ages);
    const youngestAge = Math.min(...ages);

    const calculateAverage = (surveys, question) => {
        const ratings = {
            "Strongly Agree": 0,
            "Agree": 0,
            "Neutral": 0,
            "Disagree": 0,
            "Strongly Disagree": 0
        };

        surveys.forEach(survey => {
            ratings[survey[question]]++;
        });

        const totalResponses = Object.values(ratings).reduce((a, b) => a + b, 0);

        for (let key in ratings) {
            ratings[key] = ((ratings[key] / totalResponses) * 100).toFixed(1);
        }

        return ratings;
    };

    const calculatePercentage = (surveys, foodItem) => {
        const count = surveys.filter(survey => survey.food.includes(foodItem)).length;
        return ((count / totalSurveys) * 100).toFixed(1);
    };

    const moviesRatings = calculateAverage(surveys, 'movies');
    const radioRatings = calculateAverage(surveys, 'radio');
    const eatoutRatings = calculateAverage(surveys, 'eatout');
    const tvRatings = calculateAverage(surveys, 'tv');

    const pizzaPercentage = calculatePercentage(surveys, 'Pizza');
    const pastaPercentage = calculatePercentage(surveys, 'Pasta');
    const papWorsPercentage = calculatePercentage(surveys, 'Pap and Wors');

    document.getElementById('total-surveys').textContent = `Total number of surveys completed: ${totalSurveys}`;
    document.getElementById('average-age').textContent = `Average age of participants: ${averageAge}`;
    document.getElementById('oldest-age').textContent = `Oldest person participated: ${oldestAge}`;
    document.getElementById('youngest-age').textContent = `Youngest person participated: ${youngestAge}`;

    const displayRatings = (ratings, elementId) => {
        document.getElementById(elementId).innerHTML = `
            Strongly Agree: ${ratings["Strongly Agree"]}%<br>
            Agree: ${ratings["Agree"]}%<br>
            Neutral: ${ratings["Neutral"]}%<br>
            Disagree: ${ratings["Disagree"]}%<br>
            Strongly Disagree: ${ratings["Strongly Disagree"]}%<br>
        `;
    };

    displayRatings(moviesRatings, 'movies-rating');
    displayRatings(radioRatings, 'radio-rating');
    displayRatings(eatoutRatings, 'eatout-rating');
    displayRatings(tvRatings, 'tv-rating');

    document.getElementById('pizza-percentage').textContent = `Percentage of people who like Pizza: ${pizzaPercentage}%`;
    document.getElementById('pasta-percentage').textContent = `Percentage of people who like Pasta: ${pastaPercentage}%`;
    document.getElementById('pap-wors-percentage').textContent = `Percentage of people who like Pap and Wors: ${papWorsPercentage}%`;
});
