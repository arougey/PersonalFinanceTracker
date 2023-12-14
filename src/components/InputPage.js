import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Label } from 'react-bootstrap';


export default function InputPage({formData,setFormData}){
  //function to convert strings into ints
  //does all of the math once the submit button is pressed and sends it using states.
  const handleSubmit = (event) => {
    //error handling
    event.preventDefault();
    //turn all strings into float values
    let annualIncome = parseFloat(formData.annualIncome)
    let taxRate = parseFloat(formData.taxRate) / 100
    let monthlyRent = parseFloat(formData.monthlyRent)
    let monthlyUtility = parseFloat(formData.monthlyUtility)
    let monthlyGroceries = parseFloat(formData.monthlyGroceries)
    let monthlyVehicle = parseFloat(formData.monthlyVehicle)
    let monthlySubscriptions = parseFloat(formData.monthlySubscriptions)
    let monthlyMisc = parseFloat(formData.monthlyMisc)
    let monthlyRetirementInvestment = parseFloat(formData.monthlyRetirementInvestment)
    let retirementROI = parseFloat(formData.retirementROI) / 100
    let studentLoanTotal = parseFloat(formData.studentLoanTotal)
    let studentLoanInterest = parseFloat(formData.studentLoanInterest) / 100
    let otherLoanTotal = parseFloat(formData.otherLoanTotal)
    let otherLoanInterest = parseFloat(formData.otherLoanInterest) / 100
    //calculate total monthly expenses
    let monthlyExpensesValue = monthlyRent + monthlyUtility + monthlyGroceries + monthlyVehicle + monthlySubscriptions + monthlyMisc + monthlyRetirementInvestment;
    //calculate savings until retirement
    const dt1 = formData.dateOfBirth;
    const dt2 = formData.dateOfRetirement;
    const differenceInTime = dt2.getTime() - dt1.getTime();
    const differenceInMonths = differenceInTime / (1000 * 3600 * 24 * 30.437);
    let yearsUntilRetirementValue = Math.abs(differenceInMonths);
    console.log(formData.dateOfBirth)
    console.log(formData.dateOfRetirement)
    console.log(yearsUntilRetirementValue)
    const retirementSavingsValue = []
    for(let i=1;i<=yearsUntilRetirementValue;i++){
      let amountSaved = (monthlyRetirementInvestment*12/retirementROI)*(Math.pow(1+retirementROI,i)-1) //calculates the amount saved every year using FV of annuity formula
      retirementSavingsValue.push({year: i, amountSaved});
    }
    //calculate student loans
    let studentLoanPaymentsValue = 0 //change

    setFormData( {retirementSavings: retirementSavingsValue} )
    setFormData( {monthlyExpenses: monthlyExpensesValue} )
  }
  //handles the onchange of every form control
  const handleChange = (event) => {
    const statevar = event.target.name;
    const inputvar = event.target.value;
    setFormData({[statevar]: inputvar})
  };
    
  //types of form.control inputs are: text, email, password, number, checkbox, radio, range, time, dropdown (as="select") <options>
  return (
    <div style={{backgroundColor: "grey"}}>
      <div style={{maxWidth: "75%", paddingLeft: "25%"}}>
        <h1>Personal Information</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control name="fullName" value={formData.fullName} type="text" placeholder="Enter Full Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control name="dateOfBirth" value={formData.dateOfBirth} type="date" placeholder="Enter DOB" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Annual Income</Form.Label>
          <Form.Control name="annualIncome" value={formData.annualIncome} type="number" placeholder="Enter Annual Income" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Tax Rate (whole number %)</Form.Label>
          <Form.Control name="taxRate" value={formData.taxRate} type="number" placeholder="Enter Tax Rate" onChange={handleChange}/>
        </Form.Group>
          <h1>Expenses</h1>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Monthly Rent</Form.Label>
          <Form.Control name="monthlyRent" value={formData.monthlyRent} type="number" placeholder="Enter Monthly Rent" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Monthly Utility</Form.Label>
          <Form.Control name="monthlyUtility" value={formData.monthlyUtility} type="number" placeholder="Enter Monthly Utility Bills" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Groceries and Food</Form.Label>
          <Form.Control name="monthlyGroceries" value={formData.monthlyGroceries} type="number" placeholder="Enter Monthly Grocery Costs" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Vehicle Maintenance</Form.Label>
          <Form.Control name="monthlyVehicle" value={formData.monthlyVehicle} type="number" placeholder="Enter Monthly Vehicle Costs" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Subscriptions</Form.Label>
          <Form.Control name="monthlySubscriptions" value={formData.monthlySubscriptions} type="number" placeholder="Enter Monthly Subscription Costs" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Miscellaneous Costs</Form.Label>
          <Form.Control name="monthlyMisc" value={formData.monthlyMisc} type="number" placeholder="Enter Monthly Misc Costs" onChange={handleChange}/>
        </Form.Group>
        <h1>Savings</h1>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Monthly Retirement Savings</Form.Label>
          <Form.Control name="monthlyRetirementInvestment" value={formData.monthlyRetirementInvestment} type="number" placeholder="Enter Monthly Retirement Savings" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Expected Growth Rate (whole number%)</Form.Label>
          <Form.Control name="retirementROI" value={formData.retirementROI} type="number" placeholder="Enter Expected Growth Rate" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Expected Date of Retirement</Form.Label>
          <Form.Control name="dateOfRetirement" value={formData.dateOfRetirement} type="date" placeholder="Enter Expected Date of Retirement" onChange={handleChange}/>
        </Form.Group>
        <h1>Loans & Debts</h1>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Student Loan Amount</Form.Label>
          <Form.Control name="studentLoanTotal" value={formData.studentLoanTotal} type="number" placeholder="Enter Total Student Loan Amount" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Student Loan Interest</Form.Label>
          <Form.Control name="studentLoanInterest" value={formData.studentLoanInterest} type="number" placeholder="Enter Student Loan Interest" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Other Loan Amounts (personal,car,e.t.c.)</Form.Label>
          <Form.Control name="otherLoanTotal" value={formData.otherLoanTotal} type="number" placeholder="Enter Total Other Loan Amount" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Other Loan Interest (whole number%)</Form.Label>
          <Form.Control name="otherLoanInterest" value={formData.otherLoanInterest} type="number" placeholder="Enter Other Loan Interest" onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </div>
  )
}