document.querySelector('#loan-form').addEventListener('submit', (e) => {
    e.preventDefault()

    //hide results
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'block'
    setTimeout(calculateResults,2000)
})




//calculate button
function calculateResults(){
    
    
    //UI Vars
    const amount = document.getElementById('amount')
    const interests = document.getElementById('interests')
    const years = document.getElementById('years')
    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment')
    const totalIntersts = document.getElementById('total-interests')

    const principal = parseFloat(amount.value)
    const calculatedInterests = parseFloat(interests.value) / 100 / 12
    console.log(calculatedInterests);
    const calculatedPayments =parseFloat(years.value) * 12
    //compute monthly payments
    const x = Math.pow(1 + calculatedInterests, calculatedPayments)
    const monthly = (principal*x*calculatedInterests) / (x - 1)


    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalIntersts.value = ((monthly * calculatedPayments) - principal).toFixed(2)
        //show results and hide loading gif
        document.getElementById('results').style.display = 'block'
        document.getElementById('loading').style.display = 'none'
    }
    else {
        showError(`please check your numbers`)
    }
    
}
function showError(error) {
    //dont display results or loader if there is an error
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'none'
    //create a div
    const  errorDiv = document.createElement('div')
    errorDiv.className = 'alert alert-danger'
    errorDiv.appendChild(document.createTextNode(error))

    //get elements 
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')
    //insert error above heading
    //card is a parent, we insert error div before the heading child
    card.insertBefore(errorDiv, heading)

    //clear error after 3 sec
    setTimeout(clearError, 3000)

    function clearError() {
        document.querySelector('.alert').remove()
    }
}