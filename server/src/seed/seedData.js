const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { readFileSync } = require('fs');
const { join } = require('path');

const User = require('../models/User');
const Worker = require('../models/Worker');
const Cooperative = require('../models/Cooperative');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const WelfareLedger = require('../models/WelfareLedger');
const Rating = require('../models/Rating');
const Grievance = require('../models/Grievance');
const AuditLog = require('../models/AuditLog');

dotenv.config();

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workmate');
    console.log('Connected to DB');

    await Promise.all([
      User.deleteMany({}),
      Worker.deleteMany({}),
      Cooperative.deleteMany({}),
      Booking.deleteMany({}),
      Payment.deleteMany({}),
      WelfareLedger.deleteMany({}),
      Rating.deleteMany({}),
      Grievance.deleteMany({}),
      AuditLog.deleteMany({})
    ]);

    const demoData = JSON.parse(readFileSync(join(__dirname, 'demoData.json'), 'utf-8'));

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Demo@123', salt);

    // 1. Create Core Demo Accounts
    const customerUser = await User.create({
      name: 'Priya Sharma (Customer Demo)',
      email: 'customer.demo@workmate.test',
      phone: '9876543210',
      role: 'customer',
      passwordHash
    });
    
    const workerUser = await User.create({
      name: 'Ramesh Kumar (Worker Demo)',
      email: 'worker.demo@workmate.test',
      phone: '9876543211',
      role: 'worker',
      passwordHash
    });

    const adminUser = await User.create({
      name: 'Rajesh Verma (Admin Demo)',
      email: 'admin.demo@workmate.test',
      phone: '9876543212',
      role: 'society_admin',
      passwordHash
    });

    // 2. Create Cooperatives
    const cooperatives = await Cooperative.insertMany(demoData.cooperatives);
    const primarySociety = cooperatives[1]; // Ranchi Shramik Sahakari Samiti

    // 3. Create Demo Worker Profiles
    const createdWorkers = [];

    // First, link the main demo worker
    const mainWorkerProfile = await Worker.create({
      userId: workerUser._id,
      cooperativeId: primarySociety._id,
      fullName: 'Ramesh Kumar',
      phone: '9876543211',
      status: 'verified',
      skills: [
        { name: 'electrician', experienceYears: 8, skillVerified: true },
        { name: 'technician', experienceYears: 3, skillVerified: true }
      ],
      serviceArea: {
        addressLabel: 'Main Road, Ranchi',
        district: 'Ranchi',
        latitude: 23.3441,
        longitude: 85.3096,
        radiusKm: 15
      },
      availability: {
        isAvailableNow: true,
        slots: [{ day: 'Monday', start: '09:00', end: '18:00' }]
      },
      ratingAverage: 4.8,
      ratingCount: 38,
      completedJobs: 142,
      jobsAssignedThisWeek: 2,
      documents: [
        { type: 'e_shram', url: 'https://placehold.co/400x300?text=e-Shram+Demo+Card', status: 'verified' },
        { type: 'skill_certificate', url: 'https://placehold.co/400x300?text=ITI+Electrical+Certificate', status: 'verified' }
      ],
      isDemoData: true
    });
    createdWorkers.push(mainWorkerProfile);

    // Create 19 additional worker profiles with their own user records
    for (let i = 1; i < demoData.workers.length; i++) {
      const w = demoData.workers[i];
      const user = await User.create({
        name: w.name,
        email: `worker${i}@workmate.test`,
        phone: `98765000${i < 10 ? '0' + i : i}`,
        role: 'worker',
        passwordHash
      });

      const worker = await Worker.create({
        userId: user._id,
        cooperativeId: primarySociety._id,
        fullName: w.name,
        phone: user.phone,
        status: i < 17 ? 'verified' : (i === 17 ? 'pending' : 'draft'),
        skills: [{ name: w.skill, experienceYears: w.experience, skillVerified: true }],
        serviceArea: {
          addressLabel: `${w.district} Central`,
          district: w.district,
          latitude: w.lat,
          longitude: w.lng,
          radiusKm: 12
        },
        availability: { isAvailableNow: true },
        ratingAverage: w.rating,
        ratingCount: Math.floor(w.jobs * 0.4) + 5,
        completedJobs: w.jobs,
        jobsAssignedThisWeek: Math.floor(Math.random() * 5),
        isDemoData: true
      });
      createdWorkers.push(worker);
    }

    // 4. Create Bookings, Payments, WelfareLedger & Ratings
    for (let i = 0; i < demoData.bookings.length; i++) {
      const b = demoData.bookings[i];
      const assignedWorker = createdWorkers.find(w => w.skills.some(s => s.name === b.service)) || createdWorkers[0];
      
      const totalAmount = b.price;
      const workerShare = Math.round(totalAmount * 0.90 * 100) / 100;
      const platformShare = Math.round(totalAmount * 0.08 * 100) / 100;
      const welfareContribution = Math.round(totalAmount * 0.02 * 100) / 100;

      const booking = await Booking.create({
        bookingCode: `WM-${Math.floor(100000 + Math.random() * 900000)}`,
        customerId: customerUser._id,
        workerId: b.status !== 'requested' ? assignedWorker.userId : null,
        cooperativeId: primarySociety._id,
        serviceType: b.service,
        description: b.desc,
        scheduledAt: new Date(Date.now() - (i * 86400000)),
        location: {
          address: 'Flat 402, Shanti Kunj Apartments, Kanke Road',
          locality: 'Ranchi',
          pincode: '834008',
          latitude: 23.3641,
          longitude: 85.3296
        },
        status: b.status,
        matchExplanation: [
          `Exact skill match: ${b.service}`,
          '2.3 km from customer location',
          'Available in requested time slot',
          `Rating ${assignedWorker.ratingAverage} from reviews`,
          'Fair allocation: fewer jobs assigned this week'
        ],
        pricing: {
          serviceAmount: totalAmount - 50,
          travelCharge: 50,
          urgentCharge: 0,
          totalAmount: totalAmount
        },
        timeline: [
          { status: 'requested', at: new Date(Date.now() - (i * 86400000 + 3600000)) },
          { status: b.status, at: new Date(Date.now() - (i * 86400000)) }
        ],
        isDemoData: true
      });

      if (['completed', 'rated'].includes(b.status)) {
        await Payment.create({
          bookingId: booking._id,
          customerId: customerUser._id,
          amount: totalAmount,
          currency: 'INR',
          mode: 'demo_simulation',
          status: 'paid',
          allocation: {
            workerShare,
            platformShare,
            welfareContribution
          },
          paidAt: new Date(),
          isDemoData: true
        });

        await WelfareLedger.create({
          bookingId: booking._id,
          workerId: assignedWorker.userId,
          cooperativeId: primarySociety._id,
          amount: welfareContribution,
          type: 'credit',
          description: `2% Welfare allocation from Booking ${booking.bookingCode}`
        });

        if (b.status === 'rated') {
          await Rating.create({
            bookingId: booking._id,
            workerId: assignedWorker.userId,
            customerId: customerUser._id,
            stars: 5,
            comment: 'Very polite, skilled, arrived on time with proper tools. Highly recommended!',
            moderationStatus: 'active'
          });
        }
      }
    }

    // 5. Create Demo Grievances
    await Grievance.create({
      raisedBy: workerUser._id,
      type: 'payment_dispute',
      description: 'Customer added additional electrical wiring work on site but did not approve revised charges.',
      status: 'in_review',
      assignedAdmin: adminUser._id
    });

    await Grievance.create({
      raisedBy: customerUser._id,
      type: 'safety_issue',
      description: 'Technician left discarded wire cuttings in the corridor.',
      status: 'resolved',
      assignedAdmin: adminUser._id,
      resolutionNote: 'Worker was counseled and safety checklist was confirmed.'
    });

    // 6. Create Audit Logs
    await AuditLog.create({
      actorId: adminUser._id,
      action: 'WORKER_VERIFIED',
      entityType: 'Worker',
      entityId: mainWorkerProfile._id,
      reason: 'Verified ITI certificate & e-Shram credentials through cooperative inspection'
    });

    console.log('✅ Demo data seeded successfully with 3 roles, 20 workers, 12 bookings, payments & ledgers!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedData();
