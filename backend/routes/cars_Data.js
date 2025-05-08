const multer = require('multer');
const express = require('express');
const route = express.Router();
const path = require('path');
const data = require('../models/cardetails');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/carImages`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) cb(null, true);
      else cb(new Error('Only image files are allowed!'), false);
    }
});

route.post('/addcar', upload.single('carImage'), async(req, res)=>{
    const { name, typeofCar, engineType, colorOfCar } = req.body;

    try {
      const cars = await data.create({
        name,
        typeofCar,
        engineType,
        colorOfCar,
        carImage: `/carImages/${req.file.filename}`,
      })
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).send({
        message: 'Some unwanted thing happened here',
        error
      })
    }
});

// route.get('/:engineType', async (req, res) => {
//   try {
//     const SearchCarByEngine = await data.find({ engineType: req.params.engineType });

//     if (!SearchCarByEngine || SearchCarByEngine.length === 0) {
//       // Main fix here: checking if the array is empty
//       return res.status(404).send({
//         message: 'No car found with this engine type',
//       });
//     }

//     return res.status(200).send({
//       message: 'Successfully found cars',
//       cars: SearchCarByEngine,  // renamed key to 'cars' for clarity
//     });
//   } catch (error) {
//     return res.status(500).send({
//       message: 'Something went wrong in this API',
//       error,
//     });
//   }
// });

route.get('/CarsData', async (req, res) => {
  try {
    const carsData = await data.find();
    const count = carsData.length;
    if (!carsData || carsData.length === 0) {
      return res.status(404).json({ message: 'No cars found.' });
    }

    return res.status(200).json({
      carsData,
      count
    });
  } catch (error) {
    console.error('Error fetching car data:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = route;