const asyncHandler = require('express-async-handler');
const AcademicYear = require('../../model/academic/AcademicYear');
const Admin = require('../../model/staff/Admin');


exports.createAcademicYearCtrl = asyncHandler(async (req, res) => {
  const {name, fromYear, toYear, isCurrent} = req.body;

  const admin = await Admin.findById(req.user._id);
  if (!admin) {
    throw new Error('Admin not found');
  }

  //check if academic year already exists
  const existingAcademicYear = await AcademicYear.findOne({ name });
  if (existingAcademicYear) {
    throw new Error('Academic year already exists');
  }
  
  const academicYear = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    isCurrent,
    createdBy: admin._id,
  });

  //push academic year to admin
  admin.academicYears.push(academicYear._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    data: academicYear,
    message: 'Academic year created successfully',
  });
});


exports.getAllAcademicYearsCtrl = asyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find().select('name fromYear toYear isCurrent');
  res.status(201).json({
    status: 'success',
    data: academicYears,
    message: 'Academic years fetched successfully',
  });
});

exports.getAcademicYearCtrl = asyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id).select('name fromYear toYear isCurrent');
  if (!academicYear) {
    throw new Error('Academic year not found');
  }
  res.status(201).json({
    status: 'success',
    data: academicYear,
    message: 'Academic year fetched successfully',
  });
})

exports.updateAcademicYearCtrl = asyncHandler(async (req, res) => {
  
  //check if academic year already exists by name
  const existingAcademicYear = await AcademicYear.findOne({ name: req.body.name });
  if (existingAcademicYear) {
    throw new Error('Academic year already exists');
  }

  const updatedAcademicYear = await AcademicYear.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('name fromYear toYear isCurrent');
  res.status(201).json({
    status: 'success',
    data: updatedAcademicYear,
    message: 'Academic year updated successfully',
  });
});

exports.deleteAcademicYearCtrl = asyncHandler(async (req, res) => {
  await AcademicYear.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: 'success',
    data: 'Academic year deleted successfully',
  });
});