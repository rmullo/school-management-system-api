const asyncHandler = require('express-async-handler');
const Program = require('../../model/academic/Program');
const Admin = require('../../model/staff/Admin');


exports.createProgramCtrl = asyncHandler(async (req, res) => {
  const {name, description} = req.body;

  const admin = await Admin.findById(req.user._id);

  //check if program already exists
  const existingProgram = await Program.findOne({ name });
  if (existingProgram) {
    throw new Error('Program already exists');
  }
  
  const program = await Program.create({
    name,
    description,
    createdBy: admin._id,
  });

  //push program to admin
  admin.programs.push(program._id);
  await admin.save();

  res.status(201).json({  
    status: 'success',
    data: program,
    message: 'Program created successfully',
  });
 
});


exports.getProgramsCtrl = asyncHandler(async (req, res) => {
  const programs = await Program.find().select('name description subjects').populate('subjects');
  res.status(201).json({
    status: 'success',
    data: programs,
    message: 'Programs fetched successfully',
  });
});

exports.getProgramCtrl = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id).select('name description subjects').populate('subjects');
  if (!program) {
    throw new Error('Program not found');
  }
  res.status(201).json({
    status: 'success',
    data: program,
    message: 'Program fetched successfully',
  });
});

exports.updateProgramCtrl = asyncHandler(async (req, res) => {
  
  //check if program already exists by name
  const existingProgram = await Program.findOne({ name: req.body.name });
  if (existingProgram) {
    throw new Error('Program already exists');
  }

  const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('name description subjects').populate('subjects');
  res.status(201).json({
    status: 'success',
    data: updatedProgram,
    message: 'Program updated successfully',
  });
});

exports.deleteProgramCtrl = asyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    message: 'Program deleted successfully',
  }) 
});