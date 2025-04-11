const asyncHandler = require('express-async-handler');
const Admin = require('../../model/staff/Admin');
const AcademicYear = require('../../model/academic/AcademicYear');
const YearGroup = require('../../model/academic/YearGroup');


exports.createYearGroupCtrl = asyncHandler(async (req, res) => {
  const {name, academicYear} = req.body;

  const admin = await Admin.findById(req.user._id);
  if (!admin) {
    throw new Error('Admin not found');
  }

  //check if academic year exists
  const existingAcademicYear = await AcademicYear.findById(academicYear);
  if (!existingAcademicYear) {
    throw new Error('Academic year not found');
  }

  //check if year group already exists
  const existingYearGroup = await YearGroup.findOne({ name });
  if (existingYearGroup) {
    throw new Error('Year group already exists');
  }  
  
  const yearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: admin._id,
  });

  //push year group to admin
  admin.yearGroups.push(yearGroup._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    data: yearGroup,  
    message: 'Year group created successfully',
  });
  
});


exports.getYearGroupsCtrl = asyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find().select('name academicYear').populate('academicYear');
  res.status(201).json({
    status: 'success',
    data: yearGroups,
    message: 'Year groups fetched successfully',
  });
});

exports.getYearGroupCtrl = asyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id).select('name academicYear').populate('academicYear');
  if (!yearGroup) {
    throw new Error('Year group not found');
  }
  res.status(201).json({
    status: 'success',
    data: yearGroup,
    message: 'Year group fetched successfully',
  });
});

exports.updateYearGroupCtrl = asyncHandler(async (req, res) => {
  
  //check if year group already exists by name
  const existingYearGroup = await YearGroup.findOne({ name: req.body.name });
  if (existingYearGroup) {
    throw new Error('Year group already exists');
  }

  const updatedYearGroup = await YearGroup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('name academicYear');
  res.status(201).json({
    status: 'success',
    data: updatedYearGroup,
    message: 'Year group updated successfully',
  });
});

exports.deleteYearGroupCtrl = asyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    message: 'Year group deleted successfully',
  });
});