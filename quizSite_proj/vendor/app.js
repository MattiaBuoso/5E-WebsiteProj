// Global Correct Answers
const correctAnswers = {
    q1_mcq: 'JavaScript',
    q2_mcq: 'CSS',
    q3_mcq: 'Browse websites'
};

// Function to Disable Inputs After Quiz Submission
function disableInputs() {
    const inputs = document.querySelectorAll('input[type="radio"], input[type="text"]');
    inputs.forEach(input => input.disabled = true);
}

// Function to Submit Quiz
function submitQuiz() {
    const form = document.getElementById('quizForm');
    let score = 0;
    let userAnswers = '';

    // Loop through questions and check the answers
    Object.keys(correctAnswers).forEach((q) => {
        const selectedAnswer = form[q] ? form[q].value : '';
        const isCorrect = selectedAnswer === correctAnswers[q];
        const resultClass = isCorrect ? 'text-success' : 'text-danger';

        userAnswers += `
            <p class="${resultClass}">
                <strong>${q}:</strong> ${isCorrect ? 'Correct' : 'Incorrect'} - Correct answer: ${correctAnswers[q]}
            </p>`;
        if (isCorrect) score++;
    });

    // Display results and show options to download answers
    document.getElementById('result').innerHTML = `
        <h3>Your Score: ${score}/3</h3>
        ${userAnswers}
        <h4>Thanks for playing!</h4>
        <button class="btn btn-primary" onclick="goBackHome()">Go Back Home</button>
        <button class="btn btn-success" onclick="downloadAnswers()">Download Answers</button>
    `;

    // Disable inputs after submission
    disableInputs();
}

// Function to Download Answers as a .txt file
function downloadAnswers() {
    let answers = '';
    const form = document.getElementById('quizForm');

    // Collect answers from form inputs
    Object.keys(correctAnswers).forEach(q => {
        const selectedAnswer = form[q] ? form[q].value : '';
        answers += `Q: ${q} - Your answer: ${selectedAnswer} - Correct answer: ${correctAnswers[q]}\n`;
    });

    // Create a blob and trigger download
    const blob = new Blob([answers], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'answers.txt';
    link.click();
}

// Go back to the home page (index.html)
function goBackHome() {
    window.location.href = 'index.html';
}
