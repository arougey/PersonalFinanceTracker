import React from 'react';
//import { Form, Button, FormGroup, FormControl, ControlLabel, Label } from 'react-bootstrap';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'


export default function OutputPage({formData, setFormData}){
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
  let monthlyExpensesValue = monthlyRent + monthlyUtility + monthlyGroceries + monthlyVehicle + monthlySubscriptions + monthlyMisc;
  //calculate savings until retirement
  const dt1 = new Date(formData.dateOfBirth);
  const dt2 = new Date(formData.dateOfRetirement);
  const differenceInTime = dt2.getTime() - dt1.getTime();
  const differenceInYears = differenceInTime / (1000 * 3600 * 24 * 30.437 * 12);
  let yearsUntilRetirementValue = Math.ceil(Math.abs(differenceInYears));

  let retirementSavingsValue = []
  for(let i=1;i<=formData.yearsuntilretirement;i++){
    //calculates the amount saved every year using FV of annuity formula
    let amountSaved = (monthlyRetirementInvestment*12/retirementROI)*(Math.pow(1+retirementROI,i)-1) 
    retirementSavingsValue.push({year: i, amountSaved});
  }

  //calculate student loans
  let studentLoanPaymentsValue = 0 //change

  const expensesData1 = [
    {name: 'monthlyRent', value: monthlyRent},
    {name: 'monthlyUtility', value: monthlyUtility},
    {name: 'monthlyGroceries', value: monthlyGroceries},
    {name: 'monthlyVehicle', value: monthlyVehicle},
    {name: 'monthlySubscriptions', value: monthlySubscriptions},
    {name: 'monthlyMisc', value: monthlyMisc},
  ]

  const expensesData2 = [
    { name: 'Monthly Expenses', value: monthlyExpensesValue},
    { name: 'Monthly Retirement', value: monthlyRetirementInvestment }
  ]
  return (
    <div style={{backgroundColor: "grey"}}>
      <div style={{maxWidth: "75%", paddingLeft: "25%"}}>
        <h1>Monthly Expense Information</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <PieChart width={500} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={expensesData2}
            cx={300}
            cy={200}
            outerRadius={150}
            fill="#82ca9d"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
            width={1000}
            height={300}
            data={expensesData1}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" type='category'/>
            <YAxis type='number'/>
            <Tooltip />
            <Bar fill="#8884d8" dataKey="value"/>
          </BarChart>
        </div>
      <div style={{maxWidth: "75%", paddingLeft: "25%"}}>
        <h1>Retirement Information</h1>
      </div>

    </div>
  )
  }