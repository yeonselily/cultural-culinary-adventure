import React, { useEffect, useState } from 'react';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost/your-php-project/api/customers.php')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Error fetching customers:', err));
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.CustomerNumber}>
            <a href={`/show_customer/${customer.CustomerNumber}`}>
              {customer.CustomerName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
