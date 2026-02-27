import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ProductDialog } from "./ProductDialog"
import { DeleteConfirmDialog } from "./DeleteConfirmDialog"
import { MoreHorizontal, Pencil, Trash, Copy, Eye, Plus, Search, Filter } from "lucide-react"

// Mock internal data for CRUD demonstration
const initialProducts = [
    { id: 'PRD-001', name: 'Paracetamol 500mg', brand: 'GSK', price: 9.99, stock: 450, active: true, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80' },
    { id: 'PRD-002', name: 'Vitamin C 1000mg', brand: 'HealthVit', price: 15.50, stock: 120, active: true, image: 'https://images.unsplash.com/photo-1640530739943-ab304ccad018?w=300&q=80' },
    { id: 'PRD-003', name: 'Amoxicillin 250mg', brand: 'Cipla', price: 24.00, stock: 12, active: true, image: 'https://images.unsplash.com/photo-1550572017-edb7336181b4?w=300&q=80' },
    { id: 'PRD-004', name: 'Cough Syrup 100ml', brand: 'Dabur', price: 8.50, stock: 5, active: false, image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&q=80' },
    { id: 'PRD-005', name: 'Ibuprofen 400mg', brand: 'Abbott', price: 12.00, stock: 320, active: true, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80' },
]

export function ProductsTable() {
    const [products, setProducts] = useState<any[]>(initialProducts)
    const [search, setSearch] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const handleAdd = () => {
        setSelectedProduct(null)
        setDialogOpen(true)
    }

    const handleEdit = (product: any) => {
        setSelectedProduct(product)
        setDialogOpen(true)
    }

    const handleDelete = (product: any) => {
        setSelectedProduct(product)
        setDeleteDialogOpen(true)
    }

    const handleSave = (productData: any) => {
        if (selectedProduct) {
            setProducts(products.map(p => p.id === selectedProduct.id ? { ...p, ...productData } : p))
        } else {
            setProducts([{ id: `PRD-${Math.floor(Math.random() * 1000)}`, ...productData }, ...products])
        }
        setDialogOpen(false)
    }

    const handleConfirmDelete = () => {
        setProducts(products.filter(p => p.id !== selectedProduct.id))
        setDeleteDialogOpen(false)
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search products by name or brand..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 w-full"
                    />
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                    <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add New Product
                    </Button>
                </div>
            </div>

            <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="font-semibold text-slate-600">ID</TableHead>
                            <TableHead className="font-semibold text-slate-600">Image</TableHead>
                            <TableHead className="font-semibold text-slate-600">Product Name</TableHead>
                            <TableHead className="font-semibold text-slate-600">Brand</TableHead>
                            <TableHead className="font-semibold text-slate-600">Price</TableHead>
                            <TableHead className="font-semibold text-slate-600">Stock</TableHead>
                            <TableHead className="font-semibold text-slate-600">Status</TableHead>
                            <TableHead className="text-right font-semibold text-slate-600 pr-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="text-slate-500 text-xs font-mono">{product.id}</TableCell>
                                <TableCell>
                                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                </TableCell>
                                <TableCell className="font-medium text-slate-800">{product.name}</TableCell>
                                <TableCell className="text-slate-600">{product.brand}</TableCell>
                                <TableCell className="font-medium text-slate-800">₹{Number(product.price).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={product.stock > 20 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                                        className={
                                            product.stock > 20 ? "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200" :
                                                product.stock > 0 ? "bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200" :
                                                    "bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
                                        }
                                    >
                                        {product.stock} units
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={product.active ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"}>
                                        {product.active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right pr-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-slate-100">
                                                <MoreHorizontal className="h-4 w-4 text-slate-500" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                            <DropdownMenuItem onClick={() => handleEdit(product)} className="cursor-pointer">
                                                <Pencil className="mr-2 h-4 w-4 text-blue-500" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Eye className="mr-2 h-4 w-4 text-slate-500" /> View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Copy className="mr-2 h-4 w-4 text-slate-500" /> Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(product)} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50">
                                                <Trash className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredProducts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-12 text-slate-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search className="h-8 w-8 text-slate-300" />
                                        <p>No products found matching "{search}"</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <ProductDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                product={selectedProduct}
                onSave={handleSave}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
                itemName={selectedProduct?.name}
            />
        </div>
    )
}
