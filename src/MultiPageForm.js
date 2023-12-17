import React, { useState } from 'react';
import InputPage from './components/InputPage';
import OutputPage from './components/OutputPage';
import { Button } from 'react-bootstrap'

const MultiPageForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    annualIncome:'',
    taxRate: '',
    monthlyRent: '',
    monthlyUtility: '',
    monthlyGroceries: '',
    monthlyVehicle: '',
    monthlySubscriptions: '',
    monthlyMisc: '',
    monthlyRetirementInvestment: '',
    retirementROI: '',
    dateOfRetirement: '',
    studentLoanTotal: '',
    studentLoanInterest: '',
    otherLoanTotal: '',
    otherLoanInterest: '',

    yearsUntilRetirement: 0,
    monthlyExpenses: 0,
    retirementSavings: [],
    studentLoanPayments: 0,
    otherLoanPayments: 0,
  });

  const pageComponents = [InputPage, OutputPage]; //list of all the pages
  const totalPages = pageComponents.length; //gets the number of pages

  const [currentPage, setCurrentPage] = useState(1); //sets the current page to 1

  const handleNext = () => { //handles next button and goes to next page
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => { //handles prev button and goes to prev page
    setCurrentPage(currentPage - 1);
  };

  const updateFormData = (newData) => { //updates all form data
    setFormData({ ...formData, ...newData });
  }

  return (
    <div>
      {React.createElement(pageComponents[currentPage - 1], {
        formData,
        setFormData: updateFormData,
      })}

      <div style={{backgroundColor: "black"}} 
      //className="mt-4 flex gap-4"
      >
        <Button 
          variant="primary" type="submit" 
          onClick={handlePrev} disabled={currentPage == 1} 
          //px-4 py-2 border rounded ${(currentPage === 1 || currentPage === 4 )? 'opacity-50 cursor-not-allowed hidden' : 'bg-gray-200 hover:bg-gray-300'}}}
          >
            Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          //className={`px-4 py-2 border rounded text-black ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed hidden' : 'bg-gray-500 hover:bg-gray-600'}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MultiPageForm;
