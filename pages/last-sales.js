import { useEffect, useState } from "react"
// client side data fetching

function LastSalesPage() {
    const [sales, setSales] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://nextjs-course-58ffc-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
            .then(res => res.json())
            .then(data => {
                const transforemedSales = []

                for (const key in data) {
                    transforemedSales.push({
                        id: key,
                        username: data[key].username, volume: data[key].volume
                    })
                }

                setSales(transforemedSales)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!sales) {
        return <p>No Data</p>
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