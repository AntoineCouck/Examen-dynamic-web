import Interface from "./modules/boxes3Newstructure.js";

let test = new Interface();

$(".js-budget_button").on("click", function () {
    test.createBudget();
});

$(".js-expense_button").on("click", function () {
    test.createExpense();
});

$(".js-expense_button ,.js-budget_button").on("click", () => {
    test.calculateBalance();
    test.deleteRow();
    test.modifyRow();
    test.checkboxRow();
});

$(".js-expense_button").on("click", function () {
    test.checkLimit();
});

$(".box3 button").on("click", function () {
    test.setLimit();
});

$(".js-expense_button , .js-budget_button").on("click", function () {
    test.calculateProgress();
});