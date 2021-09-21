let apiQuotes = [];
// consts
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const newQuote = document.querySelector("#new-quote");
const quoteContainer = document.querySelector("#quote-container");
const twitter = document.querySelector("#twitter");
const loader = document.querySelector(".loader");

// Quote func
const NewQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check author is blank

  if (quote.author) {
    authorText.textContent = quote.author;
  } else {
    authorText.textContent = "Unknown";
  }
  // checking quote length
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
};

const getQuote = async () => {
  loading();
  const res = await axios.get("https://type.fit/api/quotes");
  try {
    apiQuotes = res.data;
    NewQuote();
  } catch (e) {
    return `Error is detected ${e}`;
  }
};

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// onload
getQuote();

newQuote.addEventListener("click", getQuote);
twitter.addEventListener("click", tweetQuote);
