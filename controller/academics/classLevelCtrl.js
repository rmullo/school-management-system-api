const asyncHandler = require('express-async-handler');
const ClassLevel = require('../../model/academic/ClassLevel');
const Admin = require('../../model/staff/Admin');


exports.createClassLevelCtrl = asyncHandler(async (req, res) => {
  const {name, description} = req.body;

  const admin = await Admin.findById(req.user._id);
  if (!admin) {
    throw new Error('Admin not found');
  }

  //check if class level already exists
  const existingClassLevel = await ClassLevel.findOne({ name });
  if (existingClassLevel) {
    throw new Error('Class level already exists');
  }
  
  const classLevel = await ClassLevel.create({
    name,
    description,
    createdBy: admin._id,
  });

  //push class level to admin
  admin.classLevels.push(classLevel._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    data: classLevel,
    message: 'Class level created successfully',
  });
  
});


exports.getClassLevelsCtrl = asyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find().select('name description');
  res.status(201).json({
    status: 'success',
    data: classLevels,
    message: 'Class levels fetched successfully',
  });
});

exports.getClassLevelCtrl = asyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id).select('name description');
  if (!classLevel) {
    throw new Error('Class level not found');
  }
  res.status(201).json({
    status: 'success',
    data: classLevel,
    message: 'Class level fetched successfully',
  });
})

exports.updateClassLevelCtrl = asyncHandler(async (req, res) => {
  
  //check if class level already exists by name
  const existingClassLevel = await ClassLevel.findOne({ name: req.body.name });
  if (existingClassLevel) {
    throw new Error('Class level already exists');
  }

  const updatedClassLevel = await ClassLevel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('name description');
  res.status(201).json({
    status: 'success',
    data: updatedClassLevel,
    message: 'Class level updated successfully',
  });
});

exports.deleteClassLevelCtrl = asyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    message: 'Class level deleted successfully',
  }); 
});