import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setOrders(data);
    }
    load();
  }, []);

  return (
    <div>
      {orders.map(o => (
        <div key={o.id}>
          {o.filename} – {o.pages} pages – {o.status}
        </div>
      ))}
    </div>
  );
}
