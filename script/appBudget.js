class BudgetApp {
    constructor(outputLargeDisplay, budgetOuputDisplay, expenseOutputDisplay){
        this.outputLargeDisplay = outputLargeDisplay;
        this.budgetOuputDisplay = budgetOuputDisplay;
        this.expenseOutputDisplay = expenseOutputDisplay;
        this.operationQuery     = '+';
        this.eraseAll()
    }
    eraseAll(){
        this.incomeDetail       = '';
        this.expenseDetail      = '';
        this.budgetAmount       = '';
        this.expenseAmount      = '';
        this.budgetObj          = [];
        this.expenseObj         = [];
        this.inputErase();
    } 
    inputErase(){
        this.itemsValue         = '';
        this.genDetails         = '';

    }
    updateAmount(number){
        if(number === '.' && this.itemsValue.includes('.')) return this.itemsValue =  number.toString();
        // this.itemsValue = this.itemsValue.toString() + number.toString();
        this.itemsValue =  number.toString();
    }

    //i ma yet to codet the name details
    // ------------------------------------------------
    updateDesc(letterInput){
        this.genDetails = letterInput.toString();
    }
    
    deleteObj(tagName){
        for(let i = 0; i < this.budgetObj.length; i++){
            if(this.budgetObj.indexOf(this.budgetObj[i]) == tagName){
                this.budgetObj.splice(i,1)
                // console.log('i am here')
                this.getBalance()
            }
        }
        
    }

    // --------------------------------.
    getOperaion(optionSet){
        if(optionSet ==='exp'){
            return this.operationQuery = '-'// expense 
        }
        if(optionSet === 'budget'){
            return this.operationQuery = '+'//budget
        }
    }
    displayOperation(abcObj){
        if(this.operationQuery === '+'){
            tagCreate(abcObj[abcObj.length -1])
            this.inputErase();
        }else if(this.operationQuery === '-'){
            tagExpenseCreate(abcObj[abcObj.length -1])
            this.inputErase();
        }
        this.getBalance()
    }
    
    getBalance(){
        let totalBudgetAmount = 0
        let totalExpenseAmount  = 0
        for(let i = 0; i < this.budgetObj.length; i++){
            if(this.budgetObj.length === 0) return totalBudgetAmount = 0
            totalBudgetAmount += parseFloat(this.budgetObj[i].valueDetails)
        }
        for(let i = 0; i < this.expenseObj.length; i++){
            if(this.expenseObj.length === 0) return totalExpenseAmount
            totalExpenseAmount += parseFloat(this.expenseObj[i].valueDetails)
        }
        this.budgetOuputDisplay.textContent = totalBudgetAmount
        this.expenseOutputDisplay.textContent = totalExpenseAmount;
        this.outputLargeDisplay.textContent =  totalBudgetAmount - totalExpenseAmount
    }
    demAuthentication(detailsVal, valAmount){
        if(detailsVal === '' || valAmount === ''){
            alert('field can not be empty')
            return false;
        } else if(isNaN(valAmount)){
            alert('the amount must be a valid number')
            return false;
        }else{
            return true;
        }
    }
    postOperation(){
        let idObj
        let obj     = {
            id:             '0',
            nameDetails:    this.genDetails,
            valueDetails:   this.itemsValue
        }
        if (this.demAuthentication(this.genDetails, this.itemsValue)){
            if(this.operationQuery === '+'){    // to post the budget detail
                if(this.budgetObj.length === 0){
                    obj.id = '0' 
                }else{
                    obj.id = (parseFloat(this.budgetObj[this.budgetObj.length-1].id) + 1).toString()
                }
                this.budgetAmount       = this.itemsValue;
                this.budgetObj.push(obj)
                return this.displayOperation(this.budgetObj)
            }
            if(this.operationQuery === '-'){        // to post the expense details
                if(this.expenseObj.length === 0){
                    obj.id = (0).toString() 
                }else{
                    obj.id = (parseFloat(this.expenseObj[this.expenseObj.length-1].id) + 1).toString()
                }
                this.expenseAmount      = this.itemsValue;
                this.expenseObj.push(obj)
                return this.displayOperation(this.expenseObj);
            }
        }
        return alert('your data are not properly filled')
    }

}

const DomVariables = {
    inputMonth:             '.today_date',
    budget_expenseDisplay:  '.budget-expense-display',
    incomeValue:            '.budget_income-value',
    expenseValue:           '.expense_value',
    expensePercentage:      '.expense_spent_percentage',
    optionQuery:            '#budget_expense_logic',
    budgetExpenseInput:     '.expense_budget_name_input',
    itemsValueInput:        '.expense_budget_value_input',
    expBudInputSubmit:      '.input_submit',
    budgetListDisplay:      '.budget__list_display',
    expenseListDisplay:     '.expense__list_display',
    deleteButton:           '.delete_items_icon'
}

const   inputMonthDisplay   = document.querySelector(DomVariables.inputMonth),
        bEDisplay           = document.querySelector(DomVariables.budget_expenseDisplay),
        incValue            = document.querySelector(DomVariables.incomeValue),
        expValue            = document.querySelector(DomVariables.expenseValue),
        expensePercentageBt = document.querySelector(DomVariables.expensePercentage),
        queryOptionField    = document.querySelector(DomVariables.optionQuery),
        budgetExpenseValue  = document.querySelector(DomVariables.budgetExpenseInput),
        itemsAmount         = document.querySelector(DomVariables.itemsValueInput),
        expBudSubmit        = document.querySelector(DomVariables.expBudInputSubmit),
        budListDisplay      = document.querySelector(DomVariables.budgetListDisplay),
        expListDisplay      = document.querySelector(DomVariables.expenseListDisplay),
        deleteItemButton    = document.querySelectorAll(DomVariables.deleteButton)


const budgetApp = new BudgetApp(bEDisplay, incValue, expValue);

document.addEventListener('DOMcontentLoaded', () => todayDate())
function todayDate() {
    let now, day1, year, month, months;

    now = new Date(); 
    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    day1 = now.getDay();
    month = now.getMonth();
    year = now.getFullYear();
    inputMonthDisplay.textContent = day1 + ' ' + months[month] + ' ' + year;
}
queryOptionField.addEventListener('change', (event)=>{
    budgetApp.getOperaion(event.target.value)
})
expBudSubmit.addEventListener('click', () =>{
    budgetApp.updateAmount((itemsAmount.value))
    budgetApp.updateDesc(budgetExpenseValue.value)
    budgetApp.postOperation();
    itemsAmount.value = ""
    budgetExpenseValue.value = ""
    
    // tagCreate({nameDetails: 'kayode', valueDetails: '677'})
})
$('.budget__list_display').on('click', '.delete_items_icon', function(evt){
    $(this).parent().parent().fadeOut(800,function(){
        // budgetApp.removeField($(this))
        budgetApp.deleteObj($(this).index())
        $(this).remove();
    });
    evt.stopPropagation();
})
$('.expense__list_display').on('click', '.delete_items_icon', function(evt){
    $(this).parent().parent().fadeOut(800,function(){
        // budgetApp.removeField($(this))
        // console.log($('.expense__list_display').children().index($(this)))
        budgetApp.deleteObj($(this).index())
        $(this).remove();
    });
    evt.stopPropagation();
})



function tagCreate(detail_budget){
    let newDiv      = document.createElement('div'),
        deleteDiv   = document.createElement('div'),
        ivDiv       = document.createElement('div'),
        detailDiv   = document.createElement('div'),
        descDiv     = document.createElement('div'),
        fieldDiv    = document.createElement('div'),
        newButton   = document.createElement('button'),
        newI        = document.createElement('i')


        let totalDiv = budListDisplay.length
    //    console.log(budListDisplay.childNodes.getAttribute('class'))

    deleteDiv.classList.add('delete_items_icon')
    ivDiv.classList.add('item_value')
    detailDiv.classList.add('items_details')
    descDiv.classList.add('item__description')
    fieldDiv.classList.add('items_fields')
    fieldDiv.setAttribute('id', `${detail_budget.id}`)
    newI.classList.add('ion-ios-close-outline');
    newButton.appendChild(newI)
    ivDiv.textContent   = `${detail_budget.valueDetails}`
    descDiv.textContent = `${detail_budget.nameDetails}`
    deleteDiv.appendChild(newButton)
    detailDiv.append(ivDiv, deleteDiv)
    fieldDiv.append(descDiv, detailDiv)
    budListDisplay.appendChild(fieldDiv)
}


function tagExpenseCreate(detail_budget){
    let newDiv      = document.createElement('div'),
        deleteDiv   = document.createElement('div'),
        percentDiv  = document.createElement('div'),
        ivDiv       = document.createElement('div'),
        detailDiv   = document.createElement('div'),
        descDiv     = document.createElement('div'),
        fieldDiv    = document.createElement('div'),
        newButton   = document.createElement('button'),
        newI        = document.createElement('i')


    deleteDiv.classList.add('delete_items_icon')
    percentDiv.classList.add('item_percentage')
    ivDiv.classList.add('item_value')
    detailDiv.classList.add('items_details')
    descDiv.classList.add('item__description')
    fieldDiv.classList.add('items_fields')
    fieldDiv.setAttribute('id', `${detail_budget.id}`)
    newI.classList.add('ion-ios-close-outline');
    newButton.appendChild(newI)
    ivDiv.textContent   = `${detail_budget.valueDetails}`
    descDiv.textContent = `${detail_budget.nameDetails}`
    deleteDiv.appendChild(newButton)
    detailDiv.append(ivDiv, deleteDiv)
    fieldDiv.append(descDiv, detailDiv)
    expListDisplay.appendChild(fieldDiv)
}


// deleteItemButton.forEach(deleteBtn => {
//     deleteBtn.addEventListener('click', ()=>{
//         alert()
//     })
// })
// itemsAmount.addEventListener('keypress', (event)=>{
//         budgetApp.updateAmount(Number(itemsAmount.value))
// })
// budgetExpenseValue.addEventListener('keypress', () =>{
//     // console.log(budgetExpenseValue.value)
//     budgetApp.updateDesc(budgetExpenseValue.value)
// })
// budListDisplay.addEventListener('click', ()=>{
//     buttonDetails = document.querySelectorAll('.items_fields')
//     buttonDetails.forEach(button => {
//         budgetApp.removeTagg(budListDisplay, button)
//     })
// })