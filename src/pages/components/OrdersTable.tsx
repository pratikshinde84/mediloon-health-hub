import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ChevronDown } from "lucide-react"

export function OrdersTable() {
    const orders = [
        { id: '#MED-4821', customer: 'Aarav Sharma', amount: '₹435', status: 'Delivered', time: '10 min ago', items: 3 },
        { id: '#MED-4820', customer: 'Priya Patel', amount: '₹1,280', status: 'Processing', time: '25 min ago', items: 5 },
        { id: '#MED-4819', customer: 'Rahul Singh', amount: '₹650', status: 'Shipped', time: '1 hr ago', items: 2 },
        { id: '#MED-4818', customer: 'Neha Gupta', amount: '₹320', status: 'Delivered', time: '2 hr ago', items: 1 },
        { id: '#MED-4817', customer: 'Vikram Das', amount: '₹890', status: 'Processing', time: '3 hr ago', items: 4 },
        { id: '#MED-4816', customer: 'Anjali Desai', amount: '₹1,450', status: 'Cancelled', time: '4 hr ago', items: 6 }
    ]

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
            case 'Processing': return 'bg-amber-50 text-amber-700 border-amber-200'
            case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200'
            case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200'
            default: return 'bg-slate-100 text-slate-800 border-slate-200'
        }
    }

    return (
        <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden mt-4">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-semibold text-slate-800">Recent Orders</h3>
                <Button variant="outline" size="sm" className="hidden sm:flex text-slate-600">
                    Filter by Status <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="font-semibold text-slate-600">Order ID</TableHead>
                            <TableHead className="font-semibold text-slate-600">Customer</TableHead>
                            <TableHead className="font-semibold text-slate-600">Items</TableHead>
                            <TableHead className="font-semibold text-slate-600">Total Amount</TableHead>
                            <TableHead className="font-semibold text-slate-600">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600">Time</TableHead>
                            <TableHead className="text-right font-semibold text-slate-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="font-medium font-mono text-slate-600 text-xs">{order.id}</TableCell>
                                <TableCell className="font-medium text-slate-800">{order.customer}</TableCell>
                                <TableCell className="text-slate-600">{order.items} items</TableCell>
                                <TableCell className="font-semibold text-slate-800">{order.amount}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={getStatusStyle(order.status)}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-500 text-sm whitespace-nowrap">{order.time}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                                        <Eye className="w-4 h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Details</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
