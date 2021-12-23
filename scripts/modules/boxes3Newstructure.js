const Interface = class {


    constructor() {

        // constructor met alle variabelen voor de functies

        this.$title = $("#title");
        this.$amount = $(".box1 #budget");
        this.TotalBudget = $("#number");
        this.table_content = $(".content");
        this.$expense_title = $("#text");
        this.$expense_amount = $("#expense_value");
        this.TotalExpense = $("#expense_number");
        this.expense_content = $(".content2");
        this.limit = $(".box3 #Limit");
        this.LimitAmount = $(".box3 #limit_number");
        this.balance_amount = $(".balance .balance_amount");
        this.checkbox = $(".check");
        this.deleteButton = $(".delete");
        this.modifyText = $(".budget_title");
        this.modifyAmount = $(".budget_amount");

    }

    createBudget() { // methode voor een budget aan te maken zowel het getal toe te voegen als in dashboard

        // values van input ophalen

        this.$title = $("#title").val();
        this.$amount = $(".box1 #budget").val();

        if (this.$title != "" && this.$amount != 0) { //  controle inputs

            //set new budget 

            this.TotalBudget = $("#number").html(); //total ophalen

            let number = parseInt(this.$amount); // transform to a number
            let total = parseInt(this.TotalBudget); // transform to a number
            let newBudget = number + total; // total = ...
            $(".budget p").children("span").text(newBudget); // nieuw totaal vervangen met het vorige

            // create a new line into budget dashboard

            this.table_content = $(".content").contents().clone();
            this.table_content.find(".budget_title").text(this.$title);
            this.table_content.find(".budget_amount .dash_amount").text(this.$amount);
            this.table_content.appendTo(".budget_table");

            // reset the input fields after submit

            this.$title = $("#title").val('');
            this.$amount = $(".box1 #budget").val('');

        } else { // bericht als inputs niet correct zijn 

            alert("sorry but try again a value is empty or null")
        }

    }

    createExpense() { // methode voor een expense uit te maken

        // values van input ophalen

        this.$expense_title = $("#text").val();
        this.$expense_amount = $("#expense_value").val();

        if (this.$expense_title != "" && this.$expense_amount != 0) { // controle voor de inputs

            this.TotalExpense = $("#expense_number").html(); // total ophalen



            let amount = parseInt(this.$expense_amount); // transform to a number
            let totalExpense = parseInt(this.TotalExpense); // transform to a number 

            let newExpense = amount + totalExpense; // total = ...

            $(".expence p").children("span").text(newExpense);

            // create a new line into budget dashboard

            this.expense_content = $(".content2").contents().clone();
            this.expense_content.find(".exepense_title").text(this.$expense_title);
            this.expense_content.find(".expense_number .dash_amount2").text(this.$expense_amount);
            this.expense_content.appendTo(".expense_table");

            // reset the input fields after submit

            this.$expense_title = $("#text").val('');
            this.$expense_amount = $("#expense_value").val('');

        } else {

            alert("sorry but try again a value is empty or null");
        }



    }
    calculateBalance() { // verschil tussen budget en uitgaven berekenen

        // getal ophalen en parsen

        let totalBudget = $("#number").html();
        totalBudget = parseInt(totalBudget);

        let totalExpense = $("#expense_number").html();
        totalExpense = parseInt(totalExpense);

        let balance = totalBudget - totalExpense;

        // nieuw totaal gaan weergeven op de juiste plaats

        $(".balance p").children("span").text(balance);

    }

    setLimit() { // limiet instellen



        let value = this.limit = $(".box3 #Limit").val();
        $(".box3 h5").children("span").text(value);
        this.limit = $(".box3 #Limit").val('');

    }

    checkLimit() { // kijken of we niet over de limiet gaan → error message laten zien 

        let number = $("#limit_number").text(); // value ophalen limiet 

        number = parseInt(number); // parsen

        let balanceNum = this.balance_amount = $(".balance .balance_amount").text(); // balance ophalen om te vergelijken


        if (number >= balanceNum) { // vergelijking twee values  = controle 

            alert("warning limit");
        }
    }

    calculateProgress() { // de progression bar berekenen op basis van de balance

        // waarden ophalen en parsen

        let balance = $(".balance .balance_amount").text();
        let budget = $("#number").text();
        balance = parseInt(balance);
        budget = parseInt(budget);

        // procent berekening voor de width te bepalen dat onze bar moet hebben 
        let result = (balance * 100) / budget;

        // switch cases voor de kleur te bepalen afhankelijk van percentage

        switch (true) {

            case result <= 20:

                $(".progress-bar").attr("style", "width:" + result + "%");
                $(".progress-bar").css("background-color", "red");

                break;

            case (result > 25 && result <= 50): // controle van onze percentage

                $(".progress-bar").attr("style", "width:" + result + "%"); // juiste width meegeven
                $(".progress-bar").css("background-color", "orange"); // css kleur aanpassen

                break;

            case (result > 50 && result <= 75):

                $(".progress-bar").attr("style", "width:" + result + "%");
                $(".progress-bar").css("background-color", "yellow");

                break;

            case result > 75 && result <= 100:

                $(".progress-bar").attr("style", "width:" + result + "%");
                $(".progress-bar").css("background-color", "green");

                break;
        }

    }
    deleteRow() { // functie voor een rij van dashboard te verwijderen

        $(".delete").unbind("click").click(function () { // 
            $(this).closest("tr").remove(); // dichtbijzijnde rij waar men klikt verwijderen 
            this.money = $(this).closest("tr").children(".money_amount").children("span").text(); // getal van geklikte rij ophalen
            this.budget = $("#number").text(); // total ophalen 
            this.amount = $("#expense_number").text(); // total opaheln
            this.moneyint = parseInt(this.money); // getallen parsen 
            this.budgetint = parseInt(this.budget);
            this.amountint = parseInt(this.amount);
            if ($(this).attr("id") == "test1") { // controle van welke template er gebruikt is
                this.budget = this.budgetint - this.moneyint;
                $("#number").text(this.budget); // nieuw totaal gebruiken 
            } else {
                this.amount = this.amountint - this.moneyint;
                $("#expense_number").text(this.amount);
            }
        });
        $(".delete").on("click", () => { // functies voor de bar en de balanse te updaten
            this.calculateBalance();
            this.calculateProgress();
            this.checkLimit();
        })
    }

    modifyRow() { // functie om titels van rijen te kunnen aanpassen

        $(".edit").unbind("click").click(function () {

            this.modifyText = $(this).closest("tr").children(".budget_title , .exepense_title").attr("contenteditable", true);
        });
    }
    checkboxRow() { // functie om ee rij te kunnen aan en uitzetten

        $(".checkbox").unbind("click").click(function () {

            let checked = $(this).prop("checked"); // de prop van huidige box in een variabele zetten


            // ophalen van verschillende waardes
            this.money = $(this).closest("tr").children(".money_amount").children("span").text();
            this.budget = $("#number").text(); // total budget
            this.amount = $("#expense_number").text(); // total expense

            // parsen van alle waardes
            let moneyInt = parseInt(this.money); // gekregen number
            let budgetInt = parseInt(this.budget); // total budget 
            let amountInt = parseInt(this.amount); // total amount



            switch (true) { // switch om te checken als er moet toegevoegd worden of verwijderen 
                // alsook een controle om te zien in welk gedeelde er iets gebeurt
                case checked == false && $(this).closest("tbody").attr("id") == "check":

                    // box is uncheck and in budget 

                    this.budget = budgetInt - moneyInt;

                    this.budget = $("#number").text(this.budget);

                    break;

                case checked == false && $(this).closest("tbody").attr("id") == "check2":

                    // box is uncheck and in expense 

                    this.amount = amountInt - moneyInt;

                    this.amount = $("#expense_number").text(this.amount);

                    break;

                case checked == true && $(this).closest("tbody").attr("id") == "check":

                    // bos is checked and in budget 

                    this.budget = budgetInt + moneyInt;

                    this.budget = $("#number").text(this.budget);

                    break;

                case checked == true && $(this).closest("tbody").attr("id") == "check2":

                    this.amount = amountInt + moneyInt;

                    this.amount = $("#expense_number").text(this.amount);

                    // box is checked and in expense 

                    break;

                default:

                    console.log("error cases not found");

                    break;

            }

        });
        $(".checkbox").on("click", () => {
            this.calculateBalance();
            this.calculateProgress();
            this.checkLimit();
        })
    }
}
export default Interface;