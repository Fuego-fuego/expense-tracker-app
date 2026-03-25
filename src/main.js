const newTransactionForm = document.querySelector("#newTransactionForm");
const transactionHistoryList = document.querySelector("#transactionHistoryList");
let allTransactions = [];

const totalIncome =  document.querySelector('#totalIncome');
const totalExpense =  document.querySelector('#totalExpense');
const totalBalance =  document.querySelector('#totalBalance');




const updateBalanceSummary = () =>{
    let income = 0;
    let expense = 0;
    let balance = 0;

allTransactions.forEach((transaction)=>{

    if(transaction.type ==='income'){
        income += parseInt(transaction.amount);
        balance += parseInt(transaction.amount);
    }else{
        expense += parseInt(transaction.amount);
        balance -= parseInt(transaction.amount);
    }
})
totalIncome.textContent = income;
totalExpense.textContent = expense;
totalBalance.textContent = balance;

return 0;
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
<div class="delete-icon-wrapper" >
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
const deleteBtn = newTransaction.querySelector(".delete-icon-wrapper");
deleteBtn.addEventListener('click',() => { 
    const currentTransaction = deleteBtn.closest('.transaction');
    const index = Array.from(transactionHistoryList.children).indexOf(currentTransaction);
    allTransactions.splice(index,1);
    updateBalanceSummary();
    currentTransaction.remove();
})
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
    allTransactions.unshift(data);
    updateBalanceSummary();
    newTransactionForm.reset();
});
