function convertCurrency() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            if (exchangeRate) {
                const result = (amount * exchangeRate).toFixed(2);
                document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
            } else {
                alert("Exchange rate not available for selected currencies.");
            }
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
            alert("Error fetching exchange rates. Please try again later.");
        });
}
