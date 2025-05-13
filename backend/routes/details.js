const { Router } = require('express');
const detailModel = require('../models/importantInfo');
const router = Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/docImages`));
  },
  filename: function (req, file, cb) {
    const date = Date.now();
    const filename = `${date}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.post('/send', upload.fields([
  { name: 'adharCard', maxCount: 1 },
  { name: 'drivingLicence', maxCount: 1 }
]), async (req, res) => {
  try {
    const adharCard = req.files['adharCard']?.[0];
    const drivingLicence = req.files['drivingLicence']?.[0];
    const { firstName, lastName, phNumber, email, startDate, endDate } = req.body;

    if (!firstName || !lastName || !phNumber || !email || !adharCard || !drivingLicence || !startDate || !endDate) {
      return res.status(404).send({
        message: 'All fields and documents are required.'
      });
    }

    const details = await detailModel.create({
      firstName,
      lastName,
      phNumber,
      email,
      adharCard: adharCard.filename,
      drivingLicence: drivingLicence.filename,
      startDate,
      endDate
    });

    return res.status(200).send({
      message: 'Details created successfully',
      details
    });

  } catch (error) {
    return res.status(500).send({
      message: 'Server error',
      error
    });
  }
});

router.get('/detail', async (req, res) => {
  try {
    const allDetails = await detailModel.find();
    if (!allDetails.length) {
      return res.status(404).send({
        message: 'Data not found'
      });
    }
    return res.status(200).send({
      message: 'Successfully fetched data',
      detail: allDetails
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Server error',
      error
    });
  }
});

module.exports = router;
