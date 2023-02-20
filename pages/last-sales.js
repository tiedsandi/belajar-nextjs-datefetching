import { useEffect, useState } from "react"
import useSWR from 'swr';

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);

    const { data, error } = useSWR('https://nextjs-course-58ffc-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json', (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        if (data) {
            const transforemedSales = []
            for (const key in data) {
                transforemedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
            }
            setSales(transforemedSales)
        }
    }, [data])

    if (error) {
        return <p>Failed to load.</p>;
    }

    if (!data && !sales) {
        return <p>Loading...</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
    const response = await fetch(
        'https://nextjs-course-58ffc-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
    );
    const data = await response.json();

    const transformedSales = [];

    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return { props: { sales: transformedSales } };
}

export default LastSalesPage