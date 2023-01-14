var grossSalary = document.querySelector('.grossSalaryInput');
var bonusAmt = document.querySelector('.bonusAmtInput');
var extraAmt = document.querySelector('.extraAmtInput');

var input80C = document.querySelector('.input80C');
var input80D = document.querySelector('.input80D');
var otherDeductions = document.querySelector('.otherDeductions');

var hra = document.querySelector('.hra');
var lta = document.querySelector('.lta');
var otherExemption = document.querySelector('.otherExemption');

var standardDeduction = 50000;

grossSalary.addEventListener('input', calculateTax);
bonusAmt.addEventListener('input', calculateTax);
extraAmt.addEventListener('input', calculateTax);

input80C.addEventListener('input', calculateTax);
input80D.addEventListener('input', calculateTax);
otherDeductions.addEventListener('input', calculateTax);

hra.addEventListener('input', calculateTax);
lta.addEventListener('input', calculateTax);
otherExemption.addEventListener('input', calculateTax);


function calculateTax() {
    var totalIncome = Number(grossSalary.value) + Number(bonusAmt.value) + Number(extraAmt.value);
    var totalDeductions = Number(input80C.value) + Number(input80D.value) + Number(otherDeductions.value);
    var totalExemption = Number(hra.value) + Number(lta.value) + Number(otherExemption.value);
    
    console.log(totalIncome, totalDeductions, totalExemption); 
    
    console.log(totalIncome, totalIncome > 500000);
    if(totalIncome > 500000) {
        console.log('HI');
        // 1. Remove all Exemption from total Income
        var taxableIncome = totalIncome  - totalExemption;
        // 2. Remove all deductions from taxable Income
        var netTaxableIncome = taxableIncome - totalDeductions - standardDeduction;
        netTaxableIncome > 0 ? netTaxableIncome : 0;        

        // OLD Tax Regime 5% (Rs. 2.5L to Rs. 5L)
        // OLD Tax Regime 20% (Rs. 5L to Rs. 10L)
        // OLD Tax Regime 30% (>Rs. 10L)
             
        // calculate 5% slab       
        var slab5 = netTaxableIncome > 250000 ? netTaxableIncome > 500000 ? (500000-250000)*5/100 : (netTaxableIncome-250000)*5/100 : 0;
        // calculate 20% slab
        var slab20 = netTaxableIncome > 500000 ? netTaxableIncome > 1000000 ? (1000000-500000)*20/100 : (netTaxableIncome-500000)*20/100 : 0; 
        // calculate 30% slab
        var slab30 = netTaxableIncome > 1000000 ? (netTaxableIncome-1000000)*30/100 : 0;   
        // calcculate Tax Rebate
        var taxRebate = slab20 > 0 ? 0 : slab5;
        // calculate Surcharge 10%
        var surcharge10 = netTaxableIncome > 5000000 ? netTaxableIncome > 10000000 ? (10000000-5000000)*10/100 : (netTaxableIncome - 5000000)*10/100 : 0;
        // calculate Surcharge 15%
        var surcharge15 = netTaxableIncome > 10000000 ? netTaxableIncome > 20000000 ? (20000000-10000000)*10/100 : (netTaxableIncome - 10000000)*15/100 : 0;
        // calculate Cess 4%
        var cess = ((slab5 + slab20 + slab30 + surcharge10 + surcharge15) - taxRebate)*4/100;        
        // calculate total income Tax
        var incomTax = ((slab5 + slab20 + slab30 + surcharge10 + surcharge15 + cess) - taxRebate).toFixed();
        
        document.querySelector('.finalAmt span').textContent = incomTax > 0 ? incomTax : 0;
    } else {
        document.querySelector('.finalAmt span').textContent = 0;
    } 
    allDetail = {
        grossSalary: grossSalary.value,
        bonus: bonusAmt.value,
        extraAmt: extraAmt.value,
        totalIncome: totalIncome,
        HRA: hra.value,
        LTA: lta.value,
        otherExemption: otherExemption.value,
        totalExemption: totalExemption,
        section80c: input80C.value,
        section80d: input80D.value,
        otherDeductions: otherDeductions.value,
        totalDeductions: totalDeductions,
        taxableIncome: taxableIncome,
        netTaxableIncome: netTaxableIncome,
        slab5: slab5,
        slab20: slab20,
        slab30: slab30,
        surcharge10: surcharge10,
        surcharge15: surcharge15,
        cess:cess,
        incomTax: incomTax
    }
    return allDetail;
}