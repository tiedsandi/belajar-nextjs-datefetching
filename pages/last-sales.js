import { useEffect, useState } from "react"
import useSWR from 'swr';

function LastSalesPage() {
    const [sales, setSales] = useState();

    const { data, error } = useSWR('https://nextjs-course-58ffc-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json');

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
        return <p>Failed to Load</p>
    }

    if (!data || !sales) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    )

}

export default LastSalesPage