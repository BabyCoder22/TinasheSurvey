document.getElementById('surveyForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const name = document.getElementById('email').value
    const age = document.getElementById('age').value;
    const date = document.getElementById('date').value;
    const food = Array.from(document.querySelectorAll('input[name="food"]:checked')).map(el => el.value);
    const movies = document.querySelector('input[name="movies"]:checked')?.value;
    const radio = document.querySelector('input[name="radio"]:checked')?.value;
    const eatout = document.querySelector('input[name="eatout"]:checked')?.value;
    const tv = document.querySelector('input[name="tv"]:checked')?.value;

    if (!name || !email || !age || !date || food.length === 0 || !movies || !radio || !eatout || !tv) {
        alert('Please fill out all fields.');
        return;
    }

    const surveyData = {
        name,
        email,
        age: Number(age),
        date,
        food,
        movies,
        radio,
        eatout,
        tv
    };

    // Save surveyData to localStorage
    let surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    surveys.push(surveyData);
    localStorage.setItem('surveys', JSON.stringify(surveys));

    alert('Survey submitted successfully!');
    document.getElementById('surveyForm').reset();
});
