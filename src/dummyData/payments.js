export const payments = [
  {
    id: 'm5gr84i9',
    createdDate: '2024-02-22T07:46:13.000Z',
    price: 584555454852,
    status: 'موفق',
    email: 'ken99@yahoo.com',
  },
  {
    id: 'm5gr84i9',
    createdDate: '2024-02-22T07:46:13.000Z',
    price: 317436,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    createdDate: '2024-01-22T07:46:13.000Z',
    price: 38471,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    createdDate: '2023-12-22T07:46:13.000Z',
    price: 3841,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    createdDate: '2024-02-01T07:46:13.000Z',
    price: 2000000,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    createdDate: '2024-02-05T07:46:13.000Z',
    price: 3000000,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
];

// Function to generate random data
function generateRandomPayment() {
  const statuses = ['success', 'failed', 'processing'];
  const emails = ['ken99@yahoo.com', 'Abe45@gmail.com', 'Monserrat44@gmail.com', 'Silas22@gmail.com', 'carmella@hotmail.com'];
  const id = Math.random().toString(36).substr(2, 9);
  const createdDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();
  const price = Math.floor(Math.random() * 10000000);
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const email = emails[Math.floor(Math.random() * emails.length)];

  return { id, createdDate, price, status, email };
}

// Add 20 more items
for (let i = 0; i < 20; i++) {
  payments.push(generateRandomPayment());
}
