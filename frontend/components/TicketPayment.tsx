import React, { useState } from 'react';
import { Minus, Plus, CreditCard, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface Ticket {
  id: string;
  category: string;
  code: string;
  name: string;
  description: string;
  priceNGN: number;
  priceUSD: number;
  image: string;
  features: string[];
}

const tickets: Ticket[] = [
  {
    id: '1',
    category: 'Workshop',
    code: 'WRK',
    name: 'Workshop Pass',
    description: 'Access to all workshops and hands-on sessions',
    priceNGN: 45000,
    priceUSD: 55,
    image: '🛠️',
    features: ['All Workshop Sessions', 'Materials Included', 'Certificate']
  },
  {
    id: '2',
    category: 'Standard',
    code: 'STD',
    name: 'Standard Pass',
    description: 'Full conference access with networking opportunities',
    priceNGN: 85000,
    priceUSD: 105,
    image: '🎫',
    features: ['All Sessions', 'Networking Events', 'Conference Materials', 'Lunch Included']
  },
  {
    id: '3',
    category: 'Premium',
    code: 'PRM',
    name: 'Premium Pass',
    description: 'VIP experience with exclusive speaker access',
    priceNGN: 150000,
    priceUSD: 185,
    image: '⭐',
    features: ['All Standard Features', 'VIP Lounge Access', 'Speaker Meet & Greet', 'Premium Swag']
  },
  {
    id: '4',
    category: 'Enterprise',
    code: 'ENT',
    name: 'Enterprise Pass',
    description: 'Ultimate package for corporate teams',
    priceNGN: 250000,
    priceUSD: 305,
    image: '🏢',
    features: ['All Premium Features', 'Private Networking', 'Custom Branding', 'Dedicated Support']
  }
];

export default function TicketPayment() {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const updateQuantity = (ticketId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [ticketId]: Math.max(0, (prev[ticketId] || 0) + change)
    }));
  };

  const getTotalPrice = () => {
    return tickets.reduce((total, ticket) => {
      const quantity = quantities[ticket.id] || 0;
      const price = currency === 'NGN' ? ticket.priceNGN : ticket.priceUSD;
      return total + (price * quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const generateTicketNumber = (ticketCode: string) => {
    const randomNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `${ticketCode}-${randomNum}`;
  };

  const handlePayment = async () => {
    const totalItems = getTotalItems();
    if (totalItems === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate tickets for successful payment
      const purchasedTickets = tickets
        .filter(ticket => quantities[ticket.id] > 0)
        .map(ticket => ({
          ...ticket,
          quantity: quantities[ticket.id],
          ticketNumber: generateTicketNumber(ticket.code),
          eventLocation: 'Lagos Continental Hotel, Victoria Island',
          eventDate: '2024-02-15 - 2024-02-17'
        }));

      toast({
        title: "Payment Successful!",
        description: `${totalItems} ticket(s) purchased successfully. Check your email for details.`,
      });

      // Reset quantities
      setQuantities({});

      console.log('Generated tickets:', purchasedTickets);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    if (currency === 'NGN') {
      return `₦${price.toLocaleString()}`;
    }
    return `$${price}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">Conference Tickets</h1>
        <p className="text-green-100 mt-1">Choose your conference experience</p>
        
        {/* Currency Toggle */}
        <div className="mt-4 flex space-x-2">
          <Button
            variant={currency === 'NGN' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setCurrency('NGN')}
            className="text-black hover:bg-white/20"
          >
            NGN (₦)
          </Button>
          <Button
            variant={currency === 'USD' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setCurrency('USD')}
            className="text-black hover:bg-white/20"
          >
            USD ($)
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Event Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="text-blue-600" size={20} />
              <div>
                <h3 className="font-semibold">Tech Innovation Summit 2024</h3>
                <p className="text-sm text-gray-600">February 15-17, 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-green-600" size={20} />
              <p className="text-sm text-gray-600">Lagos Continental Hotel, Victoria Island</p>
            </div>
          </CardContent>
        </Card>

        {/* Tickets */}
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{ticket.image}</div>
                  <div>
                    <CardTitle className="text-lg">{ticket.name}</CardTitle>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                    <Badge variant="outline" className="mt-1">{ticket.category}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPrice(currency === 'NGN' ? ticket.priceNGN : ticket.priceUSD)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Features */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(ticket.id, -1)}
                    disabled={!quantities[ticket.id]}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantities[ticket.id] || 0}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(ticket.id, 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Total and Checkout */}
        {getTotalItems() > 0 && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">Total ({getTotalItems()} tickets)</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPrice(getTotalPrice())}
                  </p>
                </div>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CreditCard className="mr-2" size={16} />
                  {isProcessing ? 'Processing...' : 'Pay with Flutterwave'}
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                Secure payment powered by Flutterwave. You'll receive your tickets via email.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
