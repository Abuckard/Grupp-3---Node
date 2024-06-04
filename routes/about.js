import { Router } from 'express';
import nedb from 'nedb-promises';

const aboutDB = new nedb({ filename: 'about.db', autoload: true });


const router = Router();

// const aboutUs = [
//   {"_id":1,"text":"Airbean delivers coffee with drones"},
 
  
//   ]
//   aboutDB.insert(aboutUs)

// Route to get all menu items
router.get('/', async (req, res) => {
  try {
    const aboutText = await aboutDB.find({});
    console.log("Temp text", aboutText);
    res.json(aboutText);
  } catch (error) {
    console.error("Error fetching about info:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
export { aboutDB };