const asyncHandler = require('express-async-handler');
const AcademicTerm = require('../../model/academic/AcademicTerm');
const Admin = require('../../model/staff/Admin');


exports.createAcademicTermCtrl = asyncHandler(async (req, res) => {
  const {name, description, duration} = req.body;

  const admin = await Admin.findById(req.user._id);
  if (!admin) {
    throw new Error('Admin not found');
  }

  //check if academic Term already exists
  const existingAcademicTerm = await AcademicTerm.findOne({ name });
  if (existingAcademicTerm) {
    throw new Error('Academic Term already exists');
  }
  
  const academicTerm = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: admin._id,
  });

  //push academic Term to admin
  admin.academicTerms.push(academicTerm._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    data: academicTerm,
    message: 'Academic Term created successfully',
  });
  
});


exports.getAcademicTermsCtrl = asyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find().select('name description duration');
  res.status(201).json({
    status: 'success',
    data: academicTerms,
    message: 'Academic Terms fetched successfully',
  });
});

exports.getAcademicTermCtrl = asyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id).select('name description duration');
  if (!academicTerm) {
    throw new Error('Academic Term not found');
  }
  res.status(201).json({
    status: 'success',
    data: academicTerm,
    message: 'Academic Term fetched successfully',
  });
})

exports.updateAcademicTermCtrl = asyncHandler(async (req, res) => {
  
  //check if academic Term already exists by name
  const existingAcademicTerm = await AcademicTerm.findOne({ name: req.body.name });
  if (existingAcademicTerm) {
    throw new Error('Academic Term already exists');
  }

  const updatedAcademicTerm = await AcademicTerm.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('name description duration');
  res.status(201).json({
    status: 'success',
    data: updatedAcademicTerm,
    message: 'Academic Term updated successfully',
  });
});

exports.deleteAcademicTermCtrl = asyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    message: 'Academic Term deleted successfully',
  });
});