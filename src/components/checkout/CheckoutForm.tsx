
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { useCart } from '../../contexts/CartContext';
import { CreditCard, IndianRupee, PackageCheck } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  postalCode: z.string().min(6, { message: "Postal code is required" }),
  paymentMethod: z.enum(["card", "upi", "cod"], { 
    required_error: "Please select a payment method" 
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutForm = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Calculate order totals
  const subtotal = cartTotal;
  const tax = subtotal * 0.18; // 18% GST
  const shippingCost = subtotal > 10000 ? 0 : 500;
  const total = subtotal + tax + shippingCost;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      paymentMethod: "card",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log('Form submitted:', values);
      console.log('Order details:', { cart, subtotal, tax, shipping: shippingCost, total });
      
      // Show success message
      toast.success("Payment successful! Your order has been placed.");
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');
      
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="9876543210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="123 Main Street, Apartment 4B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Mumbai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Maharashtra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="400001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <FormLabel htmlFor="card" className="flex-1 cursor-pointer flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit/Debit Card
                      </FormLabel>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="upi" id="upi" />
                      <FormLabel htmlFor="upi" className="flex-1 cursor-pointer flex items-center">
                        <IndianRupee className="mr-2 h-4 w-4" />
                        UPI Payment
                      </FormLabel>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="cod" id="cod" />
                      <FormLabel htmlFor="cod" className="flex-1 cursor-pointer flex items-center">
                        <PackageCheck className="mr-2 h-4 w-4" />
                        Cash on Delivery
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isProcessing || cart.length === 0}
        >
          {isProcessing ? "Processing..." : `Pay ₹${total.toLocaleString('en-IN')}`}
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
