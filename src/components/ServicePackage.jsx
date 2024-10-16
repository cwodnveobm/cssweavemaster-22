import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ServicePackage = ({ title, details, images, buttonText, isReversed }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    date: '',
    budget: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `New booking request:\nService: ${title}\nName: ${formData.name}\nNumber: ${formData.number}\nAddress: ${formData.address}\nDate: ${formData.date}\nBudget: ${formData.budget}`;
    const whatsappUrl = `https://wa.me/918086647124?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsDialogOpen(false);
    toast.success("Request sent successfully!");
    setFormData({ name: '', number: '', address: '', date: '', budget: '' });
  };

  return (
    <motion.div 
      className={`mb-8 sm:mb-12 flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`md:w-1/2 ${isReversed ? 'md:pl-4 sm:pl-8' : 'md:pr-4 sm:pr-8'}`}>
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-green-800">{title}</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="text-sm sm:text-base text-gray-700">{detail}</li>
          ))}
        </ul>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-green-800 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105">
              {buttonText}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request to Book - {title}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="number">Phone Number</Label>
                <Input id="number" name="number" value={formData.number} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" name="budget" value={formData.budget} onChange={handleInputChange} required />
              </div>
              <Button type="submit" className="w-full">Submit Request</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 md:mt-0">
        {images.map((src, index) => (
          <motion.img 
            key={index} 
            src={src} 
            alt={`${title} - Image ${index + 1}`} 
            className="w-full h-40 sm:h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ServicePackage;