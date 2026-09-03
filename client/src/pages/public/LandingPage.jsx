import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '../../components/common';
import { Navbar } from '../../components/layout';

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar mode="public" />
      
      <main className="flex-grow">
        <section className="bg-blue-900 text-white py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cooperative-Owned. Worker-Empowered. Community-Driven.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              India's first fair-wage gig marketplace for skilled workers
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="primary" 
                size="large" 
                className="bg-orange-500 hover:bg-orange-600 text-white min-w-[200px]"
                onClick={() => navigate('/register?role=customer')}
              >
                Book a Service
              </Button>
              <Button 
                variant="secondary" 
                size="large" 
                className="bg-green-600 hover:bg-green-700 text-white min-w-[200px]"
                onClick={() => navigate('/register?role=worker')}
              >
                Join as Worker
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-900">50,000+</div>
                <div className="text-gray-600 mt-2">Workers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">100,000+</div>
                <div className="text-gray-600 mt-2">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">24</div>
                <div className="text-gray-600 mt-2">Districts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900">₹5 Cr+</div>
                <div className="text-gray-600 mt-2">Worker Earnings <span className="text-xs text-orange-500 block">(Demo Data)</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason', 'Cleaner', 'Mechanic', 'Gardener', 'Appliance Repair', 'Tailor'].slice(0, 9).map(service => (
                <Card key={service} className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/register')}>
                  <div className="h-16 w-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-900 font-bold text-xl">
                    {service[0]}
                  </div>
                  <h3 className="font-semibold text-gray-800">{service}</h3>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => navigate('/register')}>View All Services</Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-2xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Search</h3>
                <p className="text-gray-600">Find verified local workers with transparent pricing.</p>
              </div>
              <div>
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Book</h3>
                <p className="text-gray-600">Schedule your service instantly online.</p>
              </div>
              <div>
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-900 text-2xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Service Done</h3>
                <p className="text-gray-600">Pay directly and rate your experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose WorkMate?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2 text-blue-900">Verified Workers</h3>
                <p className="text-gray-600 text-sm">Background checked and skill certified.</p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2 text-green-600">Fair Wages</h3>
                <p className="text-gray-600 text-sm">90% of your payment goes directly to workers.</p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2 text-orange-500">Welfare Benefits</h3>
                <p className="text-gray-600 text-sm">2% contributes to worker cooperative welfare funds.</p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2 text-blue-900">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Local cooperative support teams ready to help.</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What People Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <p className="italic text-gray-600 mb-4">"Finally a platform where I know the person fixing my home is getting paid fairly. The service was excellent!"</p>
                <div className="font-semibold">- Rahul K., Customer</div>
              </Card>
              <Card className="p-8">
                <p className="italic text-gray-600 mb-4">"WorkMate and our cooperative have given me dignity and consistent income. I earn 40% more than before."</p>
                <div className="font-semibold">- Sunita M., Electrician</div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>Built for SIH 2026. Demo Application.</p>
        <p className="text-gray-400 text-sm mt-2">&copy; 2026 WorkMate Cooperative.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
