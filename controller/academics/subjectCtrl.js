const asyncHandler = require('express-async-handler');
const Subject = require('../../model/academic/Subject');
const Admin = require('../../model/staff/Admin');
const AcademicTerm = require('../../model/academic/AcademicTerm');
const Program = require('../../model/academic/Program');


exports.createSubjectCtrl = asyncHandler(async (req, res) => {
  const {name, description, academicTerm} = req.body;

  const admin = await Admin.findById(req.user._id);
  if (!admin) {
    throw new Error('Admin not found');
  }

  //check if academic Term exists
  const existingAcademicTerm = await AcademicTerm.findById(academicTerm);
  if (!existingAcademicTerm) {
    throw new Error('Academic Term not found');
  }

  //check if subject already exists
  const existingSubject = await Subject.findOne({ name });
  if (existingSubject) {
    throw new Error('Subject already exists');
  }
  
  const subject = await Subject.create({
    name,
    description,
    createdBy: admin._id,
    academicTerm: existingAcademicTerm._id
  });

  //push subject to program with params id
  const program = await Program.findById(req.params.id);
  program.subjects.push(subject._id);
  await program.save();

  //push subject to admin
  admin.subjects.push(subject._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    data: subject,
    message: 'Subject created successfully',  
  });
});


exports.getSubjectsCtrl = asyncHandler(async (req, res) => {
  const subjects = await Subject.find().select('name description').populate('academicTerm');
  res.status(201).json({
    status: 'success',
    data: subjects,
    message: 'Subjects fetched successfully',
  });
});

exports.getSubjectCtrl = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id).select('name description').populate('academicTerm');
  if (!subject) {
    throw new Error('Subject not found');
  }
  res.status(201).json({
    status: 'success',
    data: subject,
    message: 'Subject fetched successfully',
  });
});

exports.updateSubjectCtrl = asyncHandler(async (req, res) => {
  
  //check if subject already exists by name
  const existingSubject = await Subject.findOne({ name: req.body.name });
  if (existingSubject) {
    throw new Error('Subject already exists');
  }

  const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('name description');
  res.status(201).json({
    status: 'success',
    data: updatedSubject,
    message: 'Subject updated successfully',
  });
});

exports.deleteSubjectCtrl = asyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    message: 'Subject deleted successfully',
  }) 
});