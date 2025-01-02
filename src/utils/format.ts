export const shortenInvoice = (invoice: string): string => {
  if (!invoice) return '';
  if (invoice.length <= 25) return invoice;
  return `${invoice.slice(0, 15)}...${invoice.slice(-10)}`;
};