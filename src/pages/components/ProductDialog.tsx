import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"

export function ProductDialog({ open, onOpenChange, product, onSave }: any) {
    const [formData, setFormData] = useState<any>({
        name: '',
        description: '',
        price: '',
        stock: '',
        brand: '',
        form: '',
        dosage: '',
        prescriptionRequired: false,
        image: null,
        active: true
    })

    useEffect(() => {
        if (product) {
            setFormData(product)
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                brand: '',
                form: '',
                dosage: '',
                prescriptionRequired: false,
                image: null,
                active: true
            })
        }
    }, [product, open])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Product Name *</Label>
                            <Input
                                required
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Paracetamol 500mg"
                            />
                        </div>



                        <div className="space-y-2">
                            <Label>Price (₹) *</Label>
                            <Input
                                type="number"
                                step="0.01"
                                required
                                value={formData.price || ''}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Stock Quantity *</Label>
                            <Input
                                type="number"
                                required
                                value={formData.stock || ''}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Brand</Label>
                            <Input
                                value={formData.brand || ''}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                placeholder="e.g. Cipla, Sun Pharma"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Form</Label>
                            <Input
                                value={formData.form || ''}
                                onChange={(e) => setFormData({ ...formData, form: e.target.value })}
                                placeholder="Active ingredients"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Dosage Information</Label>
                            <Input
                                value={formData.dosage || ''}
                                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                                placeholder="e.g. 1 tablet twice a day"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Status *</Label>
                            <Select
                                value={formData.active ? "active" : "inactive"}
                                onValueChange={(value) => setFormData({ ...formData, active: value === "active" })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Product Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFormData({ ...formData, image: URL.createObjectURL(file) as any })
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            rows={3}
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Detailed product description..."
                        />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="prescription"
                                checked={formData.prescriptionRequired}
                                onCheckedChange={(checked) => setFormData({ ...formData, prescriptionRequired: !!checked })}
                            />
                            <Label htmlFor="prescription" className="cursor-pointer">Prescription Required</Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            {product ? 'Update Product' : 'Save Product'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
