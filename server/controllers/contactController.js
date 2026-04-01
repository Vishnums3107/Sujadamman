import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Thank you for contacting us! We will get back to you soon.',
    data: contact,
  });
});

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Filter by status
  const query = {};
  if (req.query.status) {
    query.status = req.query.status;
  }

  const contacts = await Contact.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Contact.countDocuments(query);

  res.json({
    success: true,
    data: contacts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    // Mark as read
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.json({
      success: true,
      data: contact,
    });
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    contact.status = req.body.status || contact.status;
    const updatedContact = await contact.save();

    res.json({
      success: true,
      data: updatedContact,
    });
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});
