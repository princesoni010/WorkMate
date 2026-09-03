export const formatCurrency = (amount) => {
  if (amount == null) return '';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatAllocation = (payment) => {
  if (!payment) return {};
  
  return {
    total: formatCurrency(payment.totalAmount),
    workerShare: formatCurrency(payment.workerShare),
    platformShare: formatCurrency(payment.platformShare),
    welfareFund: formatCurrency(payment.welfareFundShare),
  };
};
