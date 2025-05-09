// const data = require('../models/cardetails');
// const router = require('express').Router();

// router.get('/browselist', async (req, res)=>{
//     try {
//         const list = await data.find();
//         if(!list){
//             return res.status(404).send({
//                 message: 'Data Not found',
//             })
//         }
//         return res.status(200).json({
//             list,
//             message:'Successfully fetched the data'
//         });
//     } catch (error) {
//             return res.send({
//                 message: 'Server Error',
//                 error
//             })
//     }
// })

// router.get('/list', async (req, res) => {
//   try {
//     const carsData = await data.find();
//     const count = carsData.length;
//     if (!carsData || carsData.length === 0) {
//       return res.status(404).json({ message: 'No cars found.' });
//     }

//     return res.status(200).json({
//       carsData,
//       count
//     });
//   } catch (error) {
//     console.error('Error fetching car data:', error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });


// module.exports = router;