const newTransactionForm = document.querySelector("#newTransactionForm");
const transactionHistoryList = document.querySelector("#transactionHistoryList");
let allTransactions = [];



const updateBalanceSummary = () =>{


}

const creteNewTransaction = (transaction) => {
    const { type, amount, date, category } = transaction;
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const newTransaction = document.createElement("li");
    newTransaction.classList = "transaction";

    if (type === "income") {
        newTransaction.setAttribute("data-type", "income");
        newTransaction.innerHTML = `              
<div>
    <h3 class="text-clr-900 capitalize fs-secondry-heading fw-semi-bold">${category}</h3>
    <p>${formattedDate}</p>
</div>
<p class="amount | fw-bold">+${amount}/=</p>
<div class="delete-icon-wrapper">
    <svg class="delete-icon">
        <use xlink:href="../src/assets/images/misc/delete.svg#delete-icon"></use>
    </svg>
</div>`;
    } else {
        newTransaction.setAttribute("data-type", "expense");
        newTransaction.innerHTML = `
    <div>
        <h3 class="text-clr-900 capitalize fs-secondry-heading fw-semi-bold">${category}</h3>
        <p>${formattedDate}</p>
    </div>
    <p class="amount | fw-bold">-${amount}/=</p>
    <div class="delete-icon-wrapper">
        <svg class="delete-icon">
            <use xlink:href="../src/assets/images/misc/delete.svg#delete-icon"></use>
        </svg>
    </div>
    `;
    }
    return newTransaction;
};

newTransactionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        type: e.target.type.value.toLowerCase(),
        amount: e.target.amount.value,
        date: e.target.date.value,
        category: e.target.category.value,
    };
    transactionHistoryList.prepend(creteNewTransaction(data));
    newTransactionForm.reset();
});
