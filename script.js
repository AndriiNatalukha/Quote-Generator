const quoteContainer = document.getElementById('quote-container');
const quoteText      = document.getElementById('quote');
const authorText     = document.getElementById('author');
const twitterBtn     = document.getElementById('twitter');
const newQuoteBtn    = document.getElementById('new-quote');
const loader         = document.getElementById('loader');

let apiQuotes = [];

// Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;

}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
    
}

// Show new Quote
function newQuote() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknow';
    } else {
        authorText.textContent = quote.author; 
    }
if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
    // Set quote, Hide Loader
    quoteText.textContent = quote.text;
 complete();
 
 
 
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes/';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote()


    } catch (error) {
        // Catch here
    }
}

// Tweet Quete
function tweetQuete() {
    const twiterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twiterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuete);

// On load
getQuotes();

